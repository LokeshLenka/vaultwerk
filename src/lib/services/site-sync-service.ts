import { db } from "../db";
import type { SiteRecord } from "../types/site";

function getFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

async function createSite(domain: string): Promise<SiteRecord> {
  const now = new Date().toISOString();
  const site: SiteRecord = {
    id: crypto.randomUUID(),
    domain,
    displayName: domain,
    faviconUrl: getFaviconUrl(domain),
    toolCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  await db.sites.add(site);
  return site;
}

async function recalcToolCount(siteId: string): Promise<void> {
  const count = await db.tools.where("siteId").equals(siteId).count();
  await db.sites.update(siteId, {
    toolCount: count,
    updatedAt: new Date().toISOString(),
  });
}

async function cleanupSite(siteId: string): Promise<void> {
  const count = await db.tools.where("siteId").equals(siteId).count();
  if (count === 0) {
    await db.sites.delete(siteId);
  }
}

export async function syncTool(toolId: string): Promise<void> {
  const tool = await db.tools.get(toolId);
  if (!tool || !tool.domain) return;

  const { domain } = tool;
  const oldSiteId = tool.siteId;

  let site = await db.sites.where("domain").equals(domain).first();
  if (!site) {
    site = await createSite(domain);
  }

  if (tool.siteId !== site.id) {
    await db.tools.update(toolId, { siteId: site.id });
    await recalcToolCount(site.id);
  }

  if (oldSiteId && oldSiteId !== site.id) {
    await recalcToolCount(oldSiteId);
    await cleanupSite(oldSiteId);
  }
}

export async function removeToolFromSite(toolId: string): Promise<void> {
  const tool = await db.tools.get(toolId);
  if (!tool || !tool.siteId) return;

  const siteId = tool.siteId;
  await db.tools.update(toolId, { siteId: null });
  await recalcToolCount(siteId);
  await cleanupSite(siteId);
}

export async function syncAllSites(): Promise<void> {
  const tools = await db.tools.toArray();
  const domainMap = new Map<string, string[]>();

  for (const tool of tools) {
    if (!tool.domain) continue;
    const ids = domainMap.get(tool.domain) ?? [];
    ids.push(tool.id);
    domainMap.set(tool.domain, ids);
  }

  for (const [domain, toolIds] of domainMap) {
    let site = await db.sites.where("domain").equals(domain).first();
    if (!site) {
      site = await createSite(domain);
    }
    await db.tools.where("id").anyOf(toolIds).modify({ siteId: site.id });
    await recalcToolCount(site.id);
  }

  await cleanupOrphanedSites();
}

export async function cleanupOrphanedSites(): Promise<void> {
  const sites = await db.sites.toArray();
  for (const site of sites) {
    const count = await db.tools.where("siteId").equals(site.id).count();
    if (count === 0) {
      await db.sites.delete(site.id);
    }
  }
}
