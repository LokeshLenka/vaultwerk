import { db } from "../db";
import { createToolRecord } from "../factories/ToolFactory";
import type { CollectionRecord } from "../types/collection";
import { findToolByNormalizedUrl } from "../queries/tools/queries";
import { normalizeUrl } from "../helpers/nomalize-url";
import { syncAllSites } from "../services/site-sync-service";
import { TOOL_SEED_DATA } from "./data/tool-data";
import type { ToolSeedEntry } from "./data/tool-data";
import { COLLECTION_SEED_DATA } from "./data/collection-data";
import type { CollectionSeedEntry } from "./data/collection-data";

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomIds(ids: string[], min = 2, max = 8) {
  const shuffled = shuffle(ids);
  const count = Math.min(
    ids.length,
    Math.floor(Math.random() * (max - min + 1)) + min,
  );
  return shuffled.slice(0, count);
}

function matchesCollectionTag(tool: ToolSeedEntry, tag: string): boolean {
  return tool.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
}

function findToolsForCollection(
  tools: ToolSeedEntry[],
  existingIds: Map<string, string>,
  collectionTags: string[],
): string[] {
  const matched = tools.filter((tool) =>
    collectionTags.some((tag) => matchesCollectionTag(tool, tag)),
  );
  const ids = matched
    .map((t) => existingIds.get(t.url))
    .filter(Boolean) as string[];
  return ids.length > 0 ? ids : [];
}

export async function seedAllData(options?: {
  count?: number;
  clearExisting?: boolean;
  skipDuplicates?: boolean;
}) {
  const count = options?.count ?? TOOL_SEED_DATA.length;
  const clearExisting = options?.clearExisting ?? false;
  const skipDuplicates = options?.skipDuplicates ?? true;

  if (clearExisting) {
    await db.tools.clear();
    await db.collections.clear();
    await db.sites.clear();
  }

  const selectedTemplates = shuffle(TOOL_SEED_DATA).slice(
    0,
    Math.min(count, TOOL_SEED_DATA.length),
  );

  const inserted = [];
  const skipped = [];
  const urlToId = new Map<string, string>();

  for (const template of selectedTemplates) {
    try {
      const normalized = normalizeUrl(template.url);

      if (skipDuplicates) {
        const existing = await findToolByNormalizedUrl(normalized.normalizedUrl);
        if (existing) {
          skipped.push(existing.normalizedUrl);
          urlToId.set(template.url, existing.id);
          continue;
        }
      }

      const id = crypto.randomUUID();
      const record = createToolRecord({
        id,
        name: template.name,
        url: normalized.url,
        normalizedUrl: normalized.normalizedUrl,
        domain: normalized.domain,
        category: template.category,
        toolType: template.toolType,
        source: "seed",
        seed: true,
      });

      record.description = template.description;
      record.tags = template.tags;

      await db.tools.add(record);
      inserted.push(record);
      urlToId.set(template.url, id);
    } catch (err) {
      console.warn(`Failed to seed tool "${template.name}":`, err);
      skipped.push(template.name);
    }
  }

  await syncAllSites();

  const toolsFromDb = await db.tools.toArray();

  const collectionInserted = [];
  const collectionSkipped = [];

  for (const template of COLLECTION_SEED_DATA) {
    try {
      const toolIds = findToolsForCollection(
        selectedTemplates,
        urlToId,
        template.tags,
      );

      const finalToolIds =
        toolIds.length >= 2
          ? toolIds
          : pickRandomIds(
              toolsFromDb.map((t) => t.id),
              3,
              8,
            );

      const now = new Date().toISOString();
      const record: CollectionRecord = {
        id: crypto.randomUUID(),
        name: template.name,
        description: template.description,
        toolIds: finalToolIds,
        createdAt: now,
        updatedAt: now,
      };

      await db.collections.add(record);
      collectionInserted.push(record);
    } catch (err) {
      console.warn(`Failed to seed collection "${template.name}":`, err);
      collectionSkipped.push(template.name);
    }
  }

  return {
    toolsInserted: inserted.length,
    toolsSkipped: skipped.length,
    collectionsInserted: collectionInserted.length,
    collectionsSkipped: collectionSkipped.length,
  };
}

export async function clearAllSeedData() {
  await db.tools.clear();
  await db.collections.clear();
  await db.sites.clear();
}
