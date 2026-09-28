/**
 * Page-preview client — asks the API to fetch a page's title, description,
 * and favicon so the add-tool form can pre-fill itself.
 */

import { apiFetch } from "../api/client";

export type PageMetadata = {
  title: string | null;
  description: string | null;
  faviconUrl: string | null;
  siteName: string | null;
  suggestedCategory: string | null;
  suggestedTags: string[];
};

/** Probe only; a failed preview is null, never an exception. */
export async function fetchPageMetadata(url: string): Promise<{
  metadata: PageMetadata;
  url: string;
} | null> {
  try {
    const result = await apiFetch<{ metadata: PageMetadata }>(
      `/api/tools/metadata?url=${encodeURIComponent(url)}`,
    );
    return { metadata: result.metadata, url };
  } catch {
    return null;
  }
}
