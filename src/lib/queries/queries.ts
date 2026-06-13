/**
 * Query helpers for the VaultWerk tool library.
 *
 * This module contains read-focused utilities for:
 * - duplicate lookup
 * - recent tools
 * - favorites
 * - forgotten tools
 * - search
 * - related tool discovery
 */
import { db } from "../db";
import type { ToolRecord } from "../types/tool";

/**
 * Finds a tool by its canonical normalized URL.
 *
 * Used primarily to prevent duplicate saves when a user adds
 * the same tool with slightly different URL variants.
 *
 * Returns the first matching tool, or `undefined` if none exists.
 */
export async function findToolByNormalizedUrl(normalizedUrl: string) {
  return db.tools.where("normalizedUrl").equals(normalizedUrl).first();
}

/**
 * Returns the most recently saved tools.
 *
 * Tools are sorted by `createdAt` descending so the newest items
 * appear first in the result.
 */
export async function getRecentTools(limit = 10) {
  return db.tools.orderBy("createdAt").reverse().limit(limit).toArray();
}

/**
 * Returns all tools marked as favorites.
 *
 * Useful for quick-access views and pinned rediscovery flows.
 */
export async function getFavoriteTools() {
  return db.tools.where("isFavorite").equals(1).toArray();
}

/**
 * Returns tools that have not been used recently.
 *
 * A tool is considered "forgotten" when:
 * - it has never been used (`lastUsedAt` is null), or
 * - its `lastUsedAt` is older than the cutoff date
 *
 * The cutoff defaults to 90 days ago.
 */
export async function getForgottenTools(days = 90) {
  const cutoff = new Date(
    Date.now() - days * 24 * 60 * 60 * 1000,
  ).toISOString();

  return db.tools
    .filter((tool) => {
      if (!tool.lastUsedAt) return true;
      return tool.lastUsedAt < cutoff;
    })
    .toArray();
}

/**
 * Performs a lightweight local text search across the tool library.
 *
 * Search fields:
 * - name
 * - url
 * - domain
 * - category
 * - description
 * - notes
 * - tags
 *
 * If the query is empty, all tools are returned.
 */
export async function searchTools(query: string) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return db.tools.toArray();
  }

  return db.tools
    .filter((tool) => {
      const haystack = [
        tool.name,
        tool.url,
        tool.domain,
        tool.category ?? "",
        tool.description ?? "",
        tool.notes ?? "",
        ...(tool.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .toArray();
}

/**
 * Determines whether a candidate tool is related to a source tool.
 *
 * A tool is considered related when either:
 * - it shares at least `minSharedTags` tags, or
 * - it belongs to the same category
 *
 * This helper is intentionally internal to the module.
 */
function isRelatedTool(
  sourceTool: ToolRecord,
  candidateTool: ToolRecord,
  minSharedTags = 2,
) {
  const sourceTags = new Set(sourceTool.tags);

  const sharedTagCount = candidateTool.tags.filter((tag) =>
    sourceTags.has(tag),
  ).length;

  const sameCategory =
    sourceTool.category !== null &&
    sourceTool.category === candidateTool.category;

  return sharedTagCount >= minSharedTags || sameCategory;
}

/**
 * Returns tools related to a given tool.
 *
 * Relatedness is based on shared tags and category similarity.
 * The source tool itself is excluded from the results.
 *
 * Returns an empty array when the source tool does not exist.
 */
export async function getRelatedTools(toolId: string, minSharedTags = 2) {
  const sourceTool = await db.tools.get(toolId);

  if (!sourceTool) {
    return [];
  }

  return db.tools
    .filter(
      (tool) =>
        tool.id !== toolId && isRelatedTool(sourceTool, tool, minSharedTags),
    )
    .toArray();
}
