import { db } from "../../db";
import { createToolRecord } from "../../factories/ToolFactory";
import type { ToolCategory, ToolType, ToolSource } from "../../enums";
import { findToolByNormalizedUrl } from "../../queries/tools/queries";
import { normalizeUrl } from "@/lib/helpers/nomalize-url";

type SeedToolTemplate = {
  name: string;
  url: string;
  category?: ToolCategory;
  toolType?: ToolType;
  source?: ToolSource;
};

const TOOL_SEED_TEMPLATES: SeedToolTemplate[] = [
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    category: "ai",
    toolType: "website",
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    category: "ai",
    toolType: "website",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    category: "ai",
    toolType: "website",
  },
  {
    name: "Notion",
    url: "https://www.notion.so",
    category: "productivity",
    toolType: "website",
  },
  {
    name: "Figma",
    url: "https://www.figma.com",
    category: "design",
    toolType: "website",
  },
  {
    name: "Linear",
    url: "https://linear.app",
    category: "productivity",
    toolType: "website",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    category: "development",
    toolType: "website",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    category: "database",
    toolType: "website",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    category: "development",
    toolType: "website",
  },
  {
    name: "Raycast",
    url: "https://www.raycast.com",
    category: "productivity",
    toolType: "desktop-app",
  },
  {
    name: "Obsidian",
    url: "https://obsidian.md",
    category: "notes",
    toolType: "desktop-app",
  },
  {
    name: "Framer",
    url: "https://www.framer.com",
    category: "design",
    toolType: "website",
  },
  {
    name: "Airtable",
    url: "https://www.airtable.com",
    category: "productivity",
    toolType: "website",
  },
  {
    name: "Slack",
    url: "https://slack.com",
    category: "communication",
    toolType: "website",
  },
  {
    name: "Discord",
    url: "https://discord.com",
    category: "communication",
    toolType: "website",
  },
  {
    name: "Postman",
    url: "https://www.postman.com",
    category: "development",
    toolType: "desktop-app",
  },
  {
    name: "Canva",
    url: "https://www.canva.com",
    category: "design",
    toolType: "website",
  },
  {
    name: "Resend",
    url: "https://resend.com",
    category: "developer-tools",
    toolType: "api",
  },
  {
    name: "Neon",
    url: "https://neon.tech",
    category: "database",
    toolType: "website",
  },
  {
    name: "Trello",
    url: "https://trello.com",
    category: "productivity",
    toolType: "website",
  },
  {
    name: "Zapier",
    url: "https://zapier.com",
    category: "automation",
    toolType: "website",
  },
  {
    name: "n8n",
    url: "https://n8n.io",
    category: "automation",
    toolType: "website",
  },
  {
    name: "Readwise",
    url: "https://readwise.io",
    category: "knowledge",
    toolType: "website",
  },
  {
    name: "Loom",
    url: "https://www.loom.com",
    category: "communication",
    toolType: "website",
  },
  {
    name: "Cursor",
    url: "https://www.cursor.com",
    category: "development",
    toolType: "desktop-app",
  },
  {
    name: "Replit",
    url: "https://replit.com",
    category: "development",
    toolType: "website",
  },
  {
    name: "TablePlus",
    url: "https://tableplus.com",
    category: "database",
    toolType: "desktop-app",
  },
  {
    name: "Bruno",
    url: "https://www.usebruno.com",
    category: "developer-tools",
    toolType: "desktop-app",
  },
  {
    name: "Miro",
    url: "https://miro.com",
    category: "collaboration",
    toolType: "website",
  },
  {
    name: "Todoist",
    url: "https://todoist.com",
    category: "productivity",
    toolType: "website",
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

export async function seedTools(options?: {
  count?: number;
  clearExisting?: boolean;
  skipDuplicates?: boolean;
}) {
  const count = options?.count ?? 20;
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

  return {
    insertedCount: inserted.length,
    skippedCount: skipped.length,
    inserted,
    skipped,
  };
}

export async function clearSeedTools() {
  await db.tools.clear();
}
