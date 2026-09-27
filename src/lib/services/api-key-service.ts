import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";

export interface ApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function listApiKeys(): Promise<ApiKeyRecord[]> {
  const { apiKeys } = await apiFetch<{ apiKeys: ApiKeyRecord[] }>("/api/keys");
  return apiKeys;
}

export async function createApiKey(
  name: string,
): Promise<{ apiKey: ApiKeyRecord; secret: string }> {
  const result = await apiFetch<{ apiKey: ApiKeyRecord; secret: string }>(
    "/api/keys",
    { method: "POST", body: { name } },
  );
  notifyDataChanged();
  return result;
}

export async function revokeApiKey(id: string): Promise<void> {
  await apiFetch(`/api/keys/${encodeURIComponent(id)}`, { method: "DELETE" });
  notifyDataChanged();
}
