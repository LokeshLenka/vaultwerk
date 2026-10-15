import { Collection, Tool } from "../models/library.js";
import { syncAllSites } from "../services/siteSync.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";
import { TOOL_SEED_DATA } from "../../../src/lib/seeders/data/tool-data.js";
import { COLLECTION_SEED_DATA } from "../../../src/lib/seeders/data/collection-data.js";

export interface DemoSeedOptions {
  /** Max tools to insert. Defaults to 25, hard-capped at 50. */
  count?: number;
  /** Seed tag-matched collections too. Defaults to true. */
  includeCollections?: boolean;
}

export interface DemoSeedSummary {
  toolsInserted: number;
  toolsSkipped: number;
  collectionsInserted: number;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Inserts curated demo data for one account in bulk: a single duplicate
 * probe, one `insertMany`, and one site-sync pass — instead of the old
 * client loop that fired hundreds of HTTP requests.
 */
export async function seedDemoLibrary(
  ownerId: string,
  options?: DemoSeedOptions,
): Promise<DemoSeedSummary> {
  const count = Math.min(Math.max(options?.count ?? 25, 1), 50);
  const includeCollections = options?.includeCollections ?? true;

  const templates = shuffle(TOOL_SEED_DATA).slice(0, count);

  const existing = await Tool.find({ ownerId }).select("normalizedUrl");
  const known = new Set(existing.map((t) => t.normalizedUrl));

  const docs: {
    ownerId: string;
    url: string;
    normalizedUrl: string;
    name: string;
    domain: string;
    category: string | null;
    description: string | null;
    tags: string[];
  }[] = [];
  const urlToId = new Map<string, string>();
  let toolsSkipped = 0;

  for (const template of templates) {
    let normalized: ReturnType<typeof normalizeUrl>;
    try {
      normalized = normalizeUrl(template.url);
    } catch {
      toolsSkipped += 1;
      continue;
    }
    if (known.has(normalized.normalizedUrl)) {
      toolsSkipped += 1;
      continue;
    }
    known.add(normalized.normalizedUrl);
    docs.push({
      ownerId,
      url: normalized.url,
      normalizedUrl: normalized.normalizedUrl,
      name: template.name,
      domain: normalized.domain,
      category: template.category ?? null,
      description: template.description ?? null,
      tags: template.tags ?? [],
    });
  }

  let toolsInserted = 0;
  if (docs.length > 0) {
    const inserted = await Tool.insertMany(docs);
    toolsInserted = inserted.length;
    const byNormalized = new Map(docs.map((d) => [d.normalizedUrl, d.url]));
    for (const doc of inserted) {
      const normalizedUrl = String(
        (doc as unknown as { normalizedUrl: string }).normalizedUrl,
      );
      const sourceUrl = byNormalized.get(normalizedUrl);
      if (sourceUrl) urlToId.set(sourceUrl, String(doc._id));
    }
    await syncAllSites(ownerId);
  }

  let collectionsInserted = 0;
  if (includeCollections) {
    const tools = await Tool.find({ ownerId }).select("_id");
    const fallbackIds = tools.map((t) => String(t._id));
    for (const template of COLLECTION_SEED_DATA.slice(0, 8)) {
      const matched = templates
        .filter((tool) =>
          template.tags.some((tag) =>
            tool.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
          ),
        )
        .map((t) => urlToId.get(t.url))
        .filter((id): id is string => Boolean(id));
      const toolIds = matched.length >= 2 ? matched : fallbackIds.slice(0, 5);
      const nameTaken = await Collection.findOne({ ownerId, name: template.name });
      if (nameTaken) continue;
      await Collection.create({
        ownerId,
        name: template.name,
        description: template.description ?? null,
        toolIds,
      });
      collectionsInserted += 1;
    }
  }

  return { toolsInserted, toolsSkipped, collectionsInserted };
}
