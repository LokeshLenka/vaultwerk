export type ToolRecord = {
  id: string;

  url: string;
  normalizedUrl: string;

  name: string;
  domain: string;
  faviconUrl?: string | null;

  category: string | null;
  tags: string[];

  description?: string | null;
  notes?: string | null;

  siteId?: string | null;

  isFavorite: boolean;

  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
};
