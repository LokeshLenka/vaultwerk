/**
 * Tool service for VaultWerk Phase 1.
 *
 * This module owns the core CRUD operations for saved tools:
 * - create
 * - read
 * - update
 * - delete
 * - favorite toggle
 * - mark as used
 *
 * It also handles URL normalization and duplicate prevention.
 */

import { db } from "../db";
import { normalizeUrl } from "../helpers/nomalize-url";
import { findToolByNormalizedUrl } from "../queries/tools/queries";
import type { ToolRecord } from "../types/tool";
import { syncTool, removeToolFromSite } from "./site-sync-service";

/**
 * Input used to create a new tool in the local VaultWerk library.
 *
 * `url` is required because the service derives:
 * - normalizedUrl
 * - domain
 *
 * Optional fields are designed for a quick-save workflow:
 * the user can save first and enrich metadata later.
 */
export type CreateToolInput = {
  id?: string;
  name: string;
  url: string;
  category?: string | null;
  description?: string | null;
  notes?: string | null;
  tags?: string[];
  isFavorite?: boolean;
};

/**
 * Returns all tools ordered from newest to oldest by creation date.
 *
 * Used by the main library view where recency helps rediscovery.
 */
export async function listTools() {
  return db.tools.orderBy("createdAt").reverse().toArray();
}

/**
 * Fetches a single tool by its unique id.
 *
 * Returns `undefined` if the tool does not exist.
 */
export async function getToolById(id: string) {
  return db.tools.get(id);
}

/**
 * Creates a new tool record.
 *
 * Behavior:
 * - normalizes the incoming URL
 * - checks for duplicates using normalizedUrl
 * - returns the existing tool instead of creating a duplicate
 * - fills derived fields like `domain`
 *
 * Return shape:
 * - `{ tool, created: true }` when inserted
 * - `{ tool, created: false, reason: "duplicate" }` when a match already exists
 */
export async function createTool(input: CreateToolInput) {
  const normalized = normalizeUrl(input.url);

  const existing = await findToolByNormalizedUrl(normalized.normalizedUrl);

  if (existing) {
    return {
      tool: existing,
      created: false,
      reason: "duplicate" as const,
    };
  }

  const now = new Date().toISOString();

  const record: ToolRecord = {
    id: input.id ?? crypto.randomUUID(),

    name: input.name,

    url: normalized.url,
    normalizedUrl: normalized.normalizedUrl,
    domain: normalized.domain,

    category: input.category ?? null,

    tags: input.tags ?? [],

    description: input.description ?? null,
    notes: input.notes ?? null,

    isFavorite: input.isFavorite ?? false,
    siteId: null,

    createdAt: now,
    updatedAt: now,
    lastUsedAt: null,
  };

  await db.tools.add(record);
  await syncTool(record.id);

  return {
    tool: record,
    created: true as const,
  };
}

/**
 * Fields that may be updated after creation.
 *
 * The following fields are intentionally excluded:
 * - id
 * - createdAt
 * - normalizedUrl
 * - domain
 *
 * `normalizedUrl` and `domain` are derived automatically from `url`
 * when the URL changes.
 */
export type UpdateToolInput = Partial<
  Omit<ToolRecord, "id" | "createdAt" | "normalizedUrl" | "domain">
>;

/**
 * Updates an existing tool.
 *
 * Behavior:
 * - returns `null` if the tool does not exist
 * - re-normalizes URL-related fields when `url` changes
 * - always refreshes `updatedAt`
 */
export async function updateTool(id: string, updates: UpdateToolInput) {
  const current = await db.tools.get(id);

  if (!current) return null;

  const nextUrl = updates.url ?? current.url;

  let normalizedPatch: Partial<ToolRecord> = {};

  if (nextUrl !== current.url) {
    const normalized = normalizeUrl(nextUrl);

    normalizedPatch = {
      url: normalized.url,
      normalizedUrl: normalized.normalizedUrl,
      domain: normalized.domain,
    };
  }

  const nextRecord: ToolRecord = {
    ...current,
    ...updates,
    ...normalizedPatch,
    updatedAt: new Date().toISOString(),
  };

  await db.tools.put(nextRecord);

  if (nextUrl !== current.url) {
    await syncTool(id);
  }

  return nextRecord;
}

/**
 * Permanently deletes a tool by id.
 *
 * This is a hard delete from the local database.
 */
export async function deleteTool(id: string) {
  await removeToolFromSite(id);
  await db.tools.delete(id);
}

/**
 * Toggles the favorite state of a tool.
 *
 * Useful for lightweight bookmarking inside the library.
 * Returns the updated record, or `null` if the tool does not exist.
 */
export async function toggleFavoriteTool(id: string) {
  const current = await db.tools.get(id);

  if (!current) return null;

  const next: ToolRecord = {
    ...current,
    isFavorite: !current.isFavorite,
    updatedAt: new Date().toISOString(),
  };

  await db.tools.put(next);

  return next;
}

/**
 * Marks a tool as used "now".
 *
 * Updates:
 * - lastUsedAt
 * - updatedAt
 *
 * This supports future rediscovery features like
 * "recently revisited" or "forgotten tools".
 */
export async function markToolUsed(id: string) {
  const current = await db.tools.get(id);

  if (!current) return null;

  const now = new Date().toISOString();

  const next: ToolRecord = {
    ...current,
    lastUsedAt: now,
    updatedAt: now,
  };

  await db.tools.put(next);

  return next;
}
