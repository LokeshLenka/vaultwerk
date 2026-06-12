import {
  db,
} from "../db";
import type { CollectionSource } from "../enums";
import { createCollectionRecord } from "../factories/CollectionFactory";
import type { CollectionRecord } from "../types/collection";

export type CreateCollectionInput = {
  id: string;
  name: string;
  description?: string | null;
  toolIds?: string[];
  source?: CollectionSource;
};

export type UpdateCollectionInput = Partial<
  Omit<CollectionRecord, "id" | "createdAt">
>;

export async function createCollection(input: CreateCollectionInput) {
  const record = createCollectionRecord({
    id: input.id,
    name: input.name,
    description: input.description,
    toolIds: input.toolIds,
    source: input.source,
  });

  await db.collections.add(record);
  return record;
}

export async function getCollectionById(id: string) {
  return db.collections.get(id);
}

export async function listCollections() {
  return db.collections
    .filter((collection) => collection.archivedAt === null)
    .sortBy("createdAt")
    .then((rows) => rows.reverse());
}

export async function updateCollection(
  id: string,
  updates: UpdateCollectionInput,
) {
  const current = await db.collections.get(id);
  if (!current) return null;

  const next: CollectionRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.collections.put(next);
  return next;
}

export async function archiveCollection(id: string) {
  const current = await db.collections.get(id);
  if (!current) return null;

  const next = {
    ...current,
    archivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.collections.put(next);
  return next;
}

export async function restoreCollection(id: string) {
  const current = await db.collections.get(id);
  if (!current) return null;

  const next = {
    ...current,
    archivedAt: null,
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.collections.put(next);
  return next;
}

export async function deleteCollection(id: string) {
  await db.collections.delete(id);
}

export async function addToolToCollection(
  collectionId: string,
  toolId: string,
) {
  const current = await db.collections.get(collectionId);
  if (!current) return null;

  if (current.toolIds.includes(toolId)) {
    return current;
  }

  const next = {
    ...current,
    toolIds: [...current.toolIds, toolId],
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.collections.put(next);
  return next;
}

export async function removeToolFromCollection(
  collectionId: string,
  toolId: string,
) {
  const current = await db.collections.get(collectionId);
  if (!current) return null;

  const next = {
    ...current,
    toolIds: current.toolIds.filter((id) => id !== toolId),
    updatedAt: new Date().toISOString(),
    version: current.version + 1,
    syncState: current.syncState === "synced" ? "modified" : current.syncState,
  };

  await db.collections.put(next);
  return next;
}

export async function getCollectionTools(collectionId: string) {
  const collection = await db.collections.get(collectionId);
  if (!collection) return [];

  const tools = await db.tools.bulkGet(collection.toolIds);
  return tools.filter((tool): tool is NonNullable<typeof tool> =>
    Boolean(tool),
  );
}
