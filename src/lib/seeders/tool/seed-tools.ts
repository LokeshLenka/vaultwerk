import {
  createTool,
  deleteTool,
  listTools,
} from "../../services/tool-service";
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
    const existing = await listTools();
    await Promise.all(existing.map((tool) => deleteTool(tool.id)));
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

    // The API normalizes, dedupes, and attaches site grouping.
    const result = await createTool({
      name: template.name,
      url: template.url,
      category: template.category,
    });
    if (!result.created) {
      skipped.push(result.tool.normalizedUrl);
      continue;
    }
    inserted.push(result.tool);
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
  const existing = await listTools();
  await Promise.all(existing.map((tool) => deleteTool(tool.id)));
}
