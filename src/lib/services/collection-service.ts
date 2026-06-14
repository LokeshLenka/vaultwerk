import { db } from "../db";
import type { CollectionRecord } from "../types/collection";

type CreateCollectionInput = {
  id: string;
  name: string;
  description?: string | null;
};

type UpdateCollectionInput = {
  name?: string;
  description?: string | null;
  toolIds?: string[];
};

function createRecord(input: CreateCollectionInput): CollectionRecord {
  const now = new Date().toISOString();
  return {
    id: input.id,
    name: input.name,
    description: input.description ?? null,
    toolIds: [],
    createdAt: now,
    updatedAt: now,
  };
}

export async function createCollection(input: CreateCollectionInput) {
  const record = createRecord(input);
  await db.collections.add(record);
  return record;
}

export async function getCollectionById(id: string) {
  return db.collections.get(id);
}

export async function listCollections() {
  return db.collections.orderBy("createdAt").reverse().toArray();
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
    toolIds: updates.toolIds ? [...new Set(updates.toolIds)] : current.toolIds,
    updatedAt: new Date().toISOString(),
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
  const collection = await db.collections.get(collectionId);
  if (!collection) return null;
  if (collection.toolIds.includes(toolId)) return collection;

  const next: CollectionRecord = {
    ...collection,
    toolIds: [...collection.toolIds, toolId],
    updatedAt: new Date().toISOString(),
  };

  await db.collections.put(next);
  return next;
}

export async function removeToolFromCollection(
  collectionId: string,
  toolId: string,
) {
  const collection = await db.collections.get(collectionId);
  if (!collection) return null;

  const next: CollectionRecord = {
    ...collection,
    toolIds: collection.toolIds.filter((id) => id !== toolId),
    updatedAt: new Date().toISOString(),
  };

  await db.collections.put(next);
  return next;
}

export async function getCollectionTools(collectionId: string) {
  const collection = await db.collections.get(collectionId);
  if (!collection) return [];

  const tools = await db.tools.bulkGet(collection.toolIds);
  return tools.filter(Boolean);
}

export type { CreateCollectionInput, UpdateCollectionInput };
