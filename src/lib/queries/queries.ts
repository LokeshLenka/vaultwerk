/* ---------------------------------- */
/* Queries                            */
/* ---------------------------------- */

import { db } from "../db";

export async function findToolByNormalizedUrl(normalizedUrl: string) {
  return db.tools.where("normalizedUrl").equals(normalizedUrl).first();
}

export async function getRecentTools(limit = 10) {
  const rows = await db.tools
    .filter((tool) => tool.archivedAt === null)
    .sortBy("createdAt");

  return rows.slice(-limit).reverse();
}

export async function getFavoriteTools() {
  return db.tools
    .where("isFavorite")
    .equals(1)
    .and((tool) => tool.archivedAt === null)
    .toArray();
}

export async function getForgottenTools(days = 90) {
  const cutoff = new Date(
    Date.now() - days * 24 * 60 * 60 * 1000,
  ).toISOString();

  return db.tools
    .filter((tool) => {
      if (tool.archivedAt !== null) return false;
      if (!tool.lastUsedAt) return true;
      return tool.lastUsedAt < cutoff;
    })
    .toArray();
}

export async function searchTools(query: string) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return db.tools.filter((tool) => tool.archivedAt === null).toArray();
  }

  return db.tools
    .filter((tool) => {
      if (tool.archivedAt !== null) return false;

      const haystack = [
        tool.name,
        tool.url,
        tool.domain,
        tool.description ?? "",
        tool.category,
        tool.subcategory ?? "",
        tool.notes ?? "",
        ...(tool.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .toArray();
}

export async function getRelatedTools(toolId: string, minSharedTags = 2) {
  const sourceTool = await db.tools.get(toolId);

  if (!sourceTool || sourceTool.archivedAt !== null) {
    return [];
  }

  const sourceTags = new Set(sourceTool.tags);

  return db.tools
    .filter((tool) => {
      if (tool.id === toolId || tool.archivedAt !== null) return false;

      const sharedTagCount = tool.tags.filter((tag) =>
        sourceTags.has(tag),
      ).length;

      return sharedTagCount >= minSharedTags;
    })
    .toArray();
}
