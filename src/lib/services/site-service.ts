import { apiFetch } from "../api/client";
import type { SiteRecord } from "../types/site";
import type { ToolRecord } from "../types/tool";

export async function listSites(): Promise<SiteRecord[]> {
  const { sites } = await apiFetch<{ sites: SiteRecord[] }>("/api/sites");
  return sites;
}

export async function getSiteById(id: string): Promise<SiteRecord | undefined> {
  try {
    const { site } = await apiFetch<{ site: SiteRecord }>(
      `/api/sites/${encodeURIComponent(id)}`,
    );
    return site;
  } catch {
    return undefined;
  }
}

export async function getSiteTools(siteId: string): Promise<ToolRecord[]> {
  try {
    const { tools } = await apiFetch<{ tools: ToolRecord[] }>(
      `/api/sites/${encodeURIComponent(siteId)}/tools`,
    );
    return tools;
  } catch {
    return [];
  }
}
