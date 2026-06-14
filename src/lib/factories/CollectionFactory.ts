import type { CollectionRecord } from "../types/collection";

export type CreateCollectionRecordInput = {
  id: string;
  name: string;
  description?: string | null;
  toolIds?: string[];
};

export function createCollectionRecord(
  input: CreateCollectionRecordInput,
): CollectionRecord {
  const now = new Date().toISOString();
  return {
    id: input.id,
    name: input.name,
    description: input.description?.trim() || null,
    toolIds: [...new Set(input.toolIds ?? [])],
    createdAt: now,
    updatedAt: now,
  };
}
