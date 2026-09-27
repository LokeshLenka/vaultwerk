import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";
import type { CollectionRecord } from "../types/collection";
import type { ToolRecord } from "../types/tool";

export type CreateCollectionInput = {
  id: string;
  name: string;
  description?: string | null;
};

export type UpdateCollectionInput = {
  name?: string;
  description?: string | null;
  toolIds?: string[];
};

export async function createCollection(
  input: CreateCollectionInput,
): Promise<CollectionRecord> {
  const { collection } = await apiFetch<{ collection: CollectionRecord }>(
    "/api/collections",
    {
      method: "POST",
      body: { name: input.name, description: input.description ?? null },
    },
  );
  notifyDataChanged();
  return collection;
}

export async function getCollectionById(
  id: string,
): Promise<CollectionRecord | undefined> {
  try {
    const { collection } = await apiFetch<{ collection: CollectionRecord }>(
      `/api/collections/${encodeURIComponent(id)}`,
    );
    return collection;
  } catch {
    return undefined;
  }
}

export async function listCollections(): Promise<CollectionRecord[]> {
  const { collections } = await apiFetch<{ collections: CollectionRecord[] }>(
    "/api/collections",
  );
  return collections;
}

export async function updateCollection(
  id: string,
  updates: UpdateCollectionInput,
): Promise<CollectionRecord | null> {
  try {
    const { collection } = await apiFetch<{ collection: CollectionRecord }>(
      `/api/collections/${encodeURIComponent(id)}`,
      { method: "PATCH", body: updates },
    );
    notifyDataChanged();
    return collection;
  } catch {
    return null;
  }
}

export async function deleteCollection(id: string): Promise<void> {
  await apiFetch(`/api/collections/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  notifyDataChanged();
}

export async function addToolToCollection(
  collectionId: string,
  toolId: string,
): Promise<CollectionRecord | null> {
  try {
    const { collection } = await apiFetch<{ collection: CollectionRecord }>(
      `/api/collections/${encodeURIComponent(collectionId)}/tools`,
      { method: "POST", body: { toolId } },
    );
    notifyDataChanged();
    return collection;
  } catch {
    return null;
  }
}

export async function removeToolFromCollection(
  collectionId: string,
  toolId: string,
): Promise<CollectionRecord | null> {
  try {
    const { collection } = await apiFetch<{ collection: CollectionRecord }>(
      `/api/collections/${encodeURIComponent(collectionId)}/tools/${encodeURIComponent(toolId)}`,
      { method: "DELETE" },
    );
    notifyDataChanged();
    return collection;
  } catch {
    return null;
  }
}

export async function getCollectionTools(
  collectionId: string,
): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      `/api/collections/${encodeURIComponent(collectionId)}/tools`,
    );
    return tools;
  } catch {
    return [];
  }
}

