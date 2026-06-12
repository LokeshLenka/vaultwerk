import type { CollectionSource, SyncState } from "../enums";

export interface CollectionRecord {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  toolIds: string[];

  isPublic: boolean;
  creatorId: string | null;
  coverColor: string | null;
  icon: string | null;

  source: CollectionSource;

  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;

  syncState: SyncState;
  version: number;
}
