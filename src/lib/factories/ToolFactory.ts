import type { ToolCategory, ToolSource, ToolType } from "../enums";
import type { ToolRecord } from "../types/tool";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomBool(probability = 0.5) {
  return Math.random() < probability;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateWithinDays(days: number) {
  const now = Date.now();
  const offset = randomInt(0, days) * 24 * 60 * 60 * 1000;
  return new Date(now - offset).toISOString();
}

function pickTags(name: string, category?: ToolCategory, toolType?: ToolType) {
  const pool = [
    "ai",
    "search",
    "research",
    "writing",
    "design",
    "productivity",
    "automation",
    "developer",
    "analytics",
    "notes",
    "database",
    "ui",
    "testing",
    "api",
    "chrome",
    "workflow",
  ];

  const base = new Set<string>();

  if (category) base.add(String(category));
  if (toolType) base.add(String(toolType));

  if (/figma/i.test(name)) {
    base.add("design");
    base.add("ui");
  }

  if (/notion/i.test(name)) {
    base.add("notes");
    base.add("productivity");
  }

  if (/perplexity|chatgpt|claude/i.test(name)) {
    base.add("ai");
    base.add("research");
  }

  while (base.size < randomInt(2, 5)) {
    base.add(randomItem(pool));
  }

  return Array.from(base).slice(0, 5);
}

function buildDescription(name: string, category?: ToolCategory) {
  const templates = [
    `${name} is a useful tool for daily workflows and quick execution.`,
    `${name} helps streamline tasks across teams and individual work.`,
    `${name} is commonly used for faster delivery and better organization.`,
    `${name} fits well into a ${category ?? "general"} workflow.`,
  ];

  return randomItem(templates);
}

function buildNotes(name: string) {
  const templates = [
    `Saved for testing and future exploration of ${name}.`,
    `Looks promising for regular use; revisit after more hands-on testing.`,
    `Potential fit for library organization and quick-access workflows.`,
    `Add better metadata later after validating real usage.`,
  ];

  return randomItem(templates);
}

export function createToolRecord(input: {
  id: string;
  name: string;
  url: string;
  normalizedUrl: string;
  domain: string;
  category?: ToolCategory;
  toolType?: ToolType;
  source?: ToolSource;
  seed?: boolean;
}): ToolRecord {
  const now = new Date().toISOString();
  const useSeed = !!input.seed;

  const createdAt = useSeed ? randomDateWithinDays(180) : now;
  const updatedAt = useSeed ? randomDateWithinDays(60) : now;
  const wasUsed = useSeed ? randomBool(0.8) : false;
  const isArchived = useSeed ? randomBool(0.15) : false;

  return {
    id: input.id,
    name: input.name,
    url: input.url,
    normalizedUrl: input.normalizedUrl,
    domain: input.domain,

    // logoUrl: useSeed
    //   ? `https://www.google.com/s2/favicons?domain=${input.domain}&sz=128`
    //   : null,
    // faviconUrl: useSeed
    //   ? `https://www.google.com/s2/favicons?domain=${input.domain}&sz=64`
    //   : null,
    // ogImageUrl: null,

    description: useSeed ? buildDescription(input.name, input.category) : null,
    category: input.category ?? "other",

    tags: useSeed ? pickTags(input.name, input.category, input.toolType) : [],

    // notes: useSeed ? buildNotes(input.name) : null,
    isFavorite: useSeed ? randomBool(0.3) : false,
    lastUsedAt: useSeed && wasUsed ? randomDateWithinDays(45) : null,

    createdAt,
    updatedAt,
  };
}
