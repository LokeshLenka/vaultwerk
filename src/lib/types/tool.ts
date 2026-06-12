import type { SyncState, ToolCategory, ToolSource, ToolType } from "../enums";

export interface ToolRecord {
  id: string;
  name: string;
  url: string;
  normalizedUrl: string;
  domain: string;

  logoUrl: string | null;
  faviconUrl: string | null;
  ogImageUrl: string | null;

  description: string | null;
  category: ToolCategory;
  subcategory: string | null;
  tags: string[];
  toolType: ToolType;

  notes: string | null;
  isFavorite: boolean;
  usageCount: number;
  lastUsedAt: string | null;

  source: ToolSource;

  metadataStatus: "pending" | "complete" | "failed";
  aiStatus: "pending" | "complete" | "failed" | "skipped";

  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;

  syncState: SyncState;
  version: number;
}
