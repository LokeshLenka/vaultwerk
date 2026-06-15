import { db } from "../../db";
import type { CollectionRecord } from "@/lib/types/collection";

type SeedCollectionTemplate = {
  name: string;
  description: string | null;
};

const COLLECTION_SEED_TEMPLATES: SeedCollectionTemplate[] = [
  {
    name: "AI Tools",
    description: "LLMs, copilots, search, and research tools.",
  },
  {
    name: "Design Stack",
    description: "UI, wireframing, prototyping, and brand exploration.",
  },
  {
    name: "Developer Essentials",
    description: "Code, APIs, deployment, and debugging workflows.",
  },
  {
    name: "Databases",
    description: "Hosted databases, query tools, and local clients.",
  },
  {
    name: "Productivity",
    description: "Planning, writing, task tracking, and organization.",
  },
  {
    name: "Automation",
    description: "Workflows, no-code pipelines, and integrations.",
  },
  {
    name: "Communication",
    description: "Team chat, async video, and collaboration tools.",
  },
  {
    name: "Content Ops",
    description: "Publishing, capture, notes, and idea management.",
  },
  {
    name: "Startup Stack",
    description: "Core tools for building and shipping products.",
  },
  {
    name: "Daily Use",
    description: "Frequently used tools for regular workflows.",
  },
];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeCollectionName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function pickRandomIds(ids: string[], min = 2, max = 6) {
  const shuffled = shuffle(ids);
  const count = Math.min(
    ids.length,
    Math.floor(Math.random() * (max - min + 1)) + min,
  );
  return shuffled.slice(0, count);
}

export async function seedCollections(options?: {
  count?: number;
  clearExisting?: boolean;
  skipDuplicates?: boolean;
}) {
  const count = options?.count ?? 8;
  const clearExisting = options?.clearExisting ?? false;
  const skipDuplicates = options?.skipDuplicates ?? true;

  if (clearExisting) {
    await db.collections.clear();
  }

  const existingCollections = await db.collections.toArray();
  const existingNames = new Set(
    existingCollections.map((collection) =>
      normalizeCollectionName(collection.name),
    ),
  );

  const selectedTemplates = shuffle(COLLECTION_SEED_TEMPLATES).slice(
    0,
    Math.min(count, COLLECTION_SEED_TEMPLATES.length),
  );

  const inserted: CollectionRecord[] = [];
  const skipped: string[] = [];
  const now = new Date().toISOString();

  const tools = await db.tools.toArray();
  const toolIds = pickRandomIds(
    tools.map((tool) => tool.id),
    2,
    6,
  );

  for (const template of selectedTemplates) {
    const normalizedName = normalizeCollectionName(template.name);

    if (skipDuplicates && existingNames.has(normalizedName)) {
      skipped.push(template.name);
      continue;
    }

    const record: CollectionRecord = {
      id: crypto.randomUUID(),
      name: template.name,
      description: template.description,
      toolIds,
      createdAt: now,
      updatedAt: now,
    };

    await db.collections.add(record);
    inserted.push(record);
    existingNames.add(normalizedName);
  }

  return {
    insertedCount: inserted.length,
    skippedCount: skipped.length,
    inserted,
    skipped,
  };
}

export async function clearSeedCollections() {
  await db.collections.clear();
}
