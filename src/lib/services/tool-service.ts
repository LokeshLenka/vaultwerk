/**
 * Tool service — HTTP implementation backed by MongoDB.
 *
 * Same exported contract as the former Dexie version: URL normalization,
 * duplicate prevention, and site-grouping maintenance now happen
 * server-side so they can't be bypassed by a client.
 */

import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";
import type { ToolRecord } from "../types/tool";

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

export type UpdateToolInput = Partial<
  Omit<ToolRecord, "id" | "createdAt" | "normalizedUrl" | "domain">
>;

export async function listTools(): Promise<ToolRecord[]> {
  const { tools } = await apiFetch<{ tools: ToolRecord[] }>("/api/tools");
  return tools;
}

export async function getToolById(id: string): Promise<ToolRecord | undefined> {
  try {
    const { tool } = await apiFetch<{ tool: ToolRecord }>(
      `/api/tools/${encodeURIComponent(id)}`,
    );
    return tool;
  } catch {
    return undefined;
  }
}

export async function createTool(input: CreateToolInput): Promise<
  | { tool: ToolRecord; created: true }
  | { tool: ToolRecord; created: false; reason: "duplicate" }
> {
  // The server mints ids; a client-supplied id is never trusted.
  const payload = { ...input };
  delete payload.id;
  const result = await apiFetch<{
    tool: ToolRecord;
    created: boolean;
    reason?: "duplicate";
  }>("/api/tools", { method: "POST", body: payload });
  notifyDataChanged();
  if (result.created) return { tool: result.tool, created: true };
  return { tool: result.tool, created: false, reason: "duplicate" };
}

export async function updateTool(
  id: string,
  updates: UpdateToolInput,
): Promise<ToolRecord | null> {
  try {
    const { tool } = await apiFetch<{ tool: ToolRecord }>(
      `/api/tools/${encodeURIComponent(id)}`,
      { method: "PATCH", body: updates },
    );
    notifyDataChanged();
    return tool;
  } catch {
    return null;
  }
}

export async function deleteTool(id: string): Promise<void> {
  await apiFetch(`/api/tools/${encodeURIComponent(id)}`, { method: "DELETE" });
  notifyDataChanged();
}

export async function toggleFavoriteTool(
  id: string,
): Promise<ToolRecord | null> {
  try {
    const { tool } = await apiFetch<{ tool: ToolRecord }>(
      `/api/tools/${encodeURIComponent(id)}/favorite`,
      { method: "POST" },
    );
    notifyDataChanged();
    return tool;
  } catch {
    return null;
  }
}

export async function markToolUsed(id: string): Promise<ToolRecord | null> {
  try {
    const { tool } = await apiFetch<{ tool: ToolRecord }>(
      `/api/tools/${encodeURIComponent(id)}/used`,
      { method: "POST" },
    );
    notifyDataChanged();
    return tool;
  } catch {
    return null;
  }
}
