import type { ToolCategory, ToolSource, ToolType } from "../enums";
import type { ToolRecord } from "../types/tool";

export function createToolRecord(input: {
  id: string;
  name: string;
  url: string;
  normalizedUrl: string;
  domain: string;
  category?: ToolCategory;
  toolType?: ToolType;
  source?: ToolSource;
}): ToolRecord {
  const now = new Date().toISOString();

  return {
    id: input.id,
    name: input.name,
    url: input.url,
    normalizedUrl: input.normalizedUrl,
    domain: input.domain,

    logoUrl: null,
    faviconUrl: null,
    ogImageUrl: null,

    description: null,
    category: input.category ?? "other",
    subcategory: null,
    tags: [],
    toolType: input.toolType ?? "website",

    notes: null,
    isFavorite: false,
    usageCount: 0,
    lastUsedAt: null,

    source: input.source ?? "manual",

    metadataStatus: "pending",
    aiStatus: "pending",

    createdAt: now,
    updatedAt: now,
    archivedAt: null,

    syncState: "local-only",
    version: 1,
  };
}
