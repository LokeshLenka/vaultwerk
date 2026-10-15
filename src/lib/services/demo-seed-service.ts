import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";

export interface DemoSeedSummary {
  toolsInserted: number;
  toolsSkipped: number;
  collectionsInserted: number;
}

/**
 * One-shot demo library backed by the server's bulk seeder
 * (`POST /api/seed/demo`) — a single request instead of the old
 * per-tool client loop.
 */
export async function seedDemoLibrary(options?: {
  count?: number;
  includeCollections?: boolean;
}): Promise<DemoSeedSummary> {
  const { summary } = await apiFetch<{ summary: DemoSeedSummary }>(
    "/api/seed/demo",
    { method: "POST", body: options ?? {} },
  );
  notifyDataChanged();
  return summary;
}
