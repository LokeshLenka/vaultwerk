import { db } from "../../db";
import { normalizeUrl } from "../../helpers/nomalize-url";
import { syncAllSites } from "../../services/site-sync-service";

type Page = {
  name: string;
  path: string;
};

type SeedDomain = {
  name: string;
  baseUrl: string;
  pages: Page[];
};

const SEED_DOMAINS: SeedDomain[] = [
  {
    name: "reactbits.dev",
    baseUrl: "https://reactbits.dev",
    pages: [
      { name: "Homepage", path: "/" },
      { name: "Introduction", path: "/get-started/introduction" },
      { name: "Shape Magic", path: "/tools/shape-magic" },
      { name: "Strands", path: "/animations/strands" },
      { name: "Text Animations", path: "/animations/text" },
      { name: "Components", path: "/components" },
      { name: "API Reference", path: "/api" },
      { name: "Playground", path: "/playground" },
      { name: "Guides", path: "/guide/getting-started" },
      { name: "Theme Editor", path: "/editor/theme" },
    ],
  },
  {
    name: "github.com",
    baseUrl: "https://github.com",
    pages: [
      { name: "Repository", path: "/vaultwerk" },
      { name: "Issues", path: "/vaultwerk/issues" },
      { name: "Pull Requests", path: "/vaultwerk/pulls" },
      { name: "Actions", path: "/vaultwerk/actions" },
      { name: "Projects", path: "/vaultwerk/projects" },
      { name: "Wiki", path: "/vaultwerk/wiki" },
      { name: "Security", path: "/vaultwerk/security" },
      { name: "Insights", path: "/vaultwerk/pulse" },
    ],
  },
  {
    name: "vercel.com",
    baseUrl: "https://vercel.com",
    pages: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Deployments", path: "/deployments" },
      { name: "Domains", path: "/domains" },
      { name: "Analytics", path: "/analytics" },
      { name: "Logs", path: "/logs" },
      { name: "Storage", path: "/storage" },
      { name: "Settings", path: "/settings" },
    ],
  },
  {
    name: "nextjs.org",
    baseUrl: "https://nextjs.org",
    pages: [
      { name: "Docs", path: "/docs" },
      { name: "Learn", path: "/learn" },
      { name: "Showcase", path: "/showcase" },
      { name: "Blog", path: "/blog" },
      { name: "Templates", path: "/templates" },
      { name: "API Reference", path: "/docs/api-reference" },
    ],
  },
  {
    name: "openai.com",
    baseUrl: "https://openai.com",
    pages: [
      { name: "ChatGPT", path: "/chatgpt" },
      { name: "API", path: "/api" },
      { name: "Docs", path: "/docs" },
      { name: "Playground", path: "/playground" },
      { name: "Research", path: "/research" },
    ],
  },
  {
    name: "developer.mozilla.org",
    baseUrl: "https://developer.mozilla.org",
    pages: [
      { name: "HTML Reference", path: "/en-US/docs/Web/HTML" },
      { name: "CSS Reference", path: "/en-US/docs/Web/CSS" },
      { name: "JavaScript Guide", path: "/en-US/docs/Web/JavaScript/Guide" },
      { name: "API Docs", path: "/en-US/docs/Web/API" },
    ],
  },
];

function randomDateWithinDays(days: number) {
  const now = Date.now();
  const offset = Math.floor(Math.random() * days) * 24 * 60 * 60 * 1000;
  return new Date(now - offset).toISOString();
}

export async function seedSites(options?: { clearExisting?: boolean }) {
  if (options?.clearExisting) {
    await db.tools.clear();
    await db.sites.clear();
  }

  const inserted: string[] = [];

  for (const domain of SEED_DOMAINS) {
    for (const page of domain.pages) {
      const url = domain.baseUrl + page.path;
      const normalized = normalizeUrl(url);

      const record = {
        id: crypto.randomUUID(),
        name: page.name,
        url: normalized.url,
        normalizedUrl: normalized.normalizedUrl,
        domain: normalized.domain,
        faviconUrl: null,
        category: "other" as const,
        tags: [] as string[],
        description: `${page.name} page on ${domain.name}`,
        notes: null,
        siteId: null,
        isFavorite: false,
        createdAt: randomDateWithinDays(180),
        updatedAt: randomDateWithinDays(30),
        lastUsedAt: Math.random() > 0.3 ? randomDateWithinDays(45) : null,
      };

      await db.tools.add(record);
      inserted.push(record.id);
    }
  }

  await syncAllSites();

  return { insertedCount: inserted.length };
}
