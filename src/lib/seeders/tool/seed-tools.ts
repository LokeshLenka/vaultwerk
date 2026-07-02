import { db } from "../../db";
import { createToolRecord } from "../../factories/ToolFactory";
import type { ToolCategory, ToolType, ToolSource } from "../../enums";
import { findToolByNormalizedUrl } from "../../queries/tools/queries";
import { normalizeUrl } from "@/lib/helpers/nomalize-url";
import { syncAllSites } from "../../services/site-sync-service";

type SeedToolTemplate = {
  name: string;
  url: string;
  category?: ToolCategory;
  toolType?: ToolType;
  source?: ToolSource;
};

const TOOL_SEED_TEMPLATES: SeedToolTemplate[] = [
 
];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function seedTools(options?: {
  count?: number;
  clearExisting?: boolean;
  skipDuplicates?: boolean;
}) {
  const count = options?.count ?? 30;
  const clearExisting = options?.clearExisting ?? false;
  const skipDuplicates = options?.skipDuplicates ?? true;

  if (clearExisting) {
    await db.tools.clear();
  }

  const selectedTemplates = shuffle(TOOL_SEED_TEMPLATES).slice(
    0,
    Math.min(count, TOOL_SEED_TEMPLATES.length),
  );

  const inserted = [];
  const skipped = [];

  for (const template of selectedTemplates) {
    const normalized = normalizeUrl(template.url);

    if (skipDuplicates) {
      const existing = await findToolByNormalizedUrl(normalized.normalizedUrl);
      if (existing) {
        skipped.push(existing.normalizedUrl);
        continue;
      }
    }

    const record = createToolRecord({
      id: crypto.randomUUID(),
      name: template.name,
      url: normalized.url,
      normalizedUrl: normalized.normalizedUrl,
      domain: normalized.domain,
      category: template.category,
      toolType: template.toolType,
      source: template.source ?? "manual",
      seed: true,
    });

    await db.tools.add(record);
    inserted.push(record);
  }

  await syncAllSites();

  return {
    insertedCount: inserted.length,
    skippedCount: skipped.length,
    inserted,
    skipped,
  };
}

export async function clearSeedTools() {
  await db.tools.clear();
  await db.sites.clear();
}
