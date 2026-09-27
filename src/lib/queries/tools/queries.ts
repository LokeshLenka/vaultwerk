/**
 * Query helpers for the VaultWerk tool library (HTTP implementation).
 *
 * Read-focused utilities — duplicate lookup, recents, favorites,
 * forgotten tools, search, related discovery — served by the API's
 * Mongo indexes instead of IndexedDB cursors.
 */
import { apiFetch } from "../../api/client";
import type { ToolRecord } from "../../types/tool";

export async function findToolByNormalizedUrl(
  normalizedUrl: string,
): Promise<ToolRecord | undefined> {
  try {
    const { tool } = await apiFetch<{ tool: ToolRecord | null }>(
      `/api/tools/lookup?normalizedUrl=${encodeURIComponent(normalizedUrl)}`,
    );
    return tool ?? undefined;
  } catch {
    return undefined;
  }
}

export async function getRecentTools(limit = 10): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      "/api/tools/recent",
    );
    return tools.slice(0, limit);
  } catch {
    return [];
  }
}

export async function getFavoriteTools(): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      "/api/tools/favorites",
    );
    return tools;
  } catch {
    return [];
  }
}

export async function getForgottenTools(days = 90): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      `/api/tools/forgotten?days=${days}`,
    );
    return tools;
  } catch {
    return [];
  }
}

export async function searchTools(query: string): Promise<ToolRecord[]> {
  const q = query.trim();
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      q ? `/api/tools?q=${encodeURIComponent(q)}` : "/api/tools",
    );
    return tools;
  } catch {
    return [];
  }
}

export async function getRelatedTools(
  toolId: string,
  minSharedTags = 2,
): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      `/api/tools/${encodeURIComponent(toolId)}/related?minSharedTags=${minSharedTags}`,
    );
    return tools;
  } catch {
    return [];
  }
}
