import type { CollectionSource } from "../enums";
import type { CollectionRecord } from "../types/collection";

export function createCollectionRecord(input: {
  id: string;
  name: string;
  description?: string | null;
  toolIds?: string[];
  source?: CollectionSource;
}): CollectionRecord {
  const now = new Date().toISOString();

  return {
    id: input.id,
    name: input.name,
    slug: null,
    description: input.description ?? null,
    toolIds: input.toolIds ?? [],

    isPublic: false,
    creatorId: null,
    coverColor: null,
    icon: null,

    source: input.source ?? "user",

    createdAt: now,
    updatedAt: now,
    archivedAt: null,

    syncState: "local-only",
    version: 1,
  };
}
