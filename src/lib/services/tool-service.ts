import { db, normalizeUrl } from "../db";
import type { ToolCategory, ToolSource, ToolType } from "../enums";
import { createToolRecord } from "../factories/ToolFactory";
import {
  findToolByNormalizedUrl,
  getFavoriteTools,
  getForgottenTools,
  getRecentTools,
  getRelatedTools,
  searchTools,
} from "../queries/queries";
import type { ToolRecord } from "../types/tool";

export type CreateToolInput = {
  id: string;
  name: string;
  url: string;
  category?: ToolCategory;
  toolType?: ToolType;
  source?: ToolSource;
};

export type UpdateToolInput = Partial<
  Omit<ToolRecord, "id" | "createdAt" | "normalizedUrl" | "domain">
>;

export async function createTool(input: CreateToolInput) {
  const normalized = normalizeUrl(input.url);
  const existing = await findToolByNormalizedUrl(normalized.normalizedUrl);

  if (existing) {
    return { tool: existing, created: false, reason: "duplicate" as const };
  }

  const record = createToolRecord({
    id: input.id,
    name: input.name,
    url: normalized.url,
    normalizedUrl: normalized.normalizedUrl,
    domain: normalized.domain,
    category: input.category,
    toolType: input.toolType,
    source: input.source,
  });

  await db.tools.add(record);

  return { tool: record, created: true as const };
}

export async function getToolById(id: string) {
  return db.tools.get(id);
}

export async function listTools() {
  return db.tools
    .filter((tool) => tool.archivedAt === null)
    .sortBy("createdAt")
    .then((rows) => rows.reverse());
}

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
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.tools.put(nextRecord);
  return nextRecord;
}

export async function toggleFavoriteTool(id: string) {
  const current = await db.tools.get(id);
  if (!current) return null;

  const next = {
    ...current,
    isFavorite: !current.isFavorite,
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.tools.put(next);
  return next;
}

export async function markToolUsed(id: string) {
  const current = await db.tools.get(id);
  if (!current) return null;

  const next = {
    ...current,
    usageCount: current.usageCount + 1,
    lastUsedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.tools.put(next);
  return next;
}

export async function archiveTool(id: string) {
  const current = await db.tools.get(id);
  if (!current) return null;

  const next = {
    ...current,
    archivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.tools.put(next);
  return next;
}

export async function restoreTool(id: string) {
  const current = await db.tools.get(id);
  if (!current) return null;

  const next = {
    ...current,
    archivedAt: null,
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.tools.put(next);
  return next;
}

export async function deleteTool(id: string) {
  await db.transaction("rw", db.tools, db.collections, async () => {
    await db.tools.delete(id);

    const collections = await db.collections
      .filter((collection) => collection.toolIds.includes(id))
      .toArray();

    for (const collection of collections) {
      await db.collections.put({
        ...collection,
        toolIds: collection.toolIds.filter((toolId) => toolId !== id),
        updatedAt: new Date().toISOString(),
        version: collection.version + 1,
        syncState:
          collection.syncState === "synced" ? "modified" : collection.syncState,
      });
    }
  });
}

export async function searchToolLibrary(query: string) {
  return searchTools(query);
}

export async function getRecentToolList(limit = 10) {
  return getRecentTools(limit);
}

export async function getFavoriteToolList() {
  return getFavoriteTools();
}

export async function getForgottenToolList(days = 90) {
  return getForgottenTools(days);
}

export async function getRelatedToolList(toolId: string, minSharedTags = 2) {
  return getRelatedTools(toolId, minSharedTags);
}
