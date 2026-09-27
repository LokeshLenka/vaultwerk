import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";
import type { SiteRecord } from "../types/site";

/**
 * Site maintenance now runs inline on the API (every tool write attaches
 * its site grouping), so these are administrative entry points rather than
 * per-write hooks. `syncTool`/`removeToolFromSite` are kept as no-ops for
 * existing callers; `syncAllSites` triggers a full rebuild + prune.
 */

export async function syncTool(_toolId: string): Promise<void> {
  // Handled server-side on every tool write.
  void _toolId;
}

export async function removeToolFromSite(_toolId: string): Promise<void> {
  // Handled server-side on tool delete / domain change.
  void _toolId;
}

export async function syncAllSites(): Promise<SiteRecord[]> {
  const { sites } = await apiFetch<{ sites: SiteRecord[] }>("/api/sites/sync", {
    method: "POST",
  });
  notifyDataChanged();
  return sites;
}

export async function cleanupOrphanedSites(): Promise<void> {
  await syncAllSites();
}
