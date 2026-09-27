import { Site, Tool } from "../models/library.js";

/**
 * Server-side site aggregation — the denormalized "sites" layer.
 * Ported from the former client `site-sync-service`: every tool write
 * maintains its site grouping, counts stay exact, and domains with zero
 * tools are pruned so Sites never accumulates ghosts.
 */

export function faviconUrlFor(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

async function recalcToolCount(siteId: string, ownerId: string) {
  const count = await Tool.countDocuments({ ownerId, siteId });
  await Site.updateOne({ _id: siteId }, { toolCount: count });
}

async function pruneIfEmpty(siteId: string, ownerId: string) {
  const count = await Tool.countDocuments({ ownerId, siteId });
  if (count === 0) await Site.deleteOne({ _id: siteId });
}

export async function attachToolToSite(toolId: string, ownerId: string) {
  const tool = await Tool.findOne({ _id: toolId, ownerId });
  if (!tool?.domain) return;

  let site = await Site.findOne({ ownerId, domain: tool.domain });
  if (!site) {
    site = await Site.create({
      ownerId,
      domain: tool.domain,
      displayName: tool.domain,
      faviconUrl: faviconUrlFor(tool.domain),
      toolCount: 0,
    });
  }

  const siteId = String(site._id);
  const previousSiteId = tool.siteId;
  if (tool.siteId !== siteId) {
    tool.siteId = siteId;
    await tool.save();
  }
  await recalcToolCount(siteId, ownerId);
  if (previousSiteId && previousSiteId !== siteId) {
    await recalcToolCount(previousSiteId, ownerId);
    await pruneIfEmpty(previousSiteId, ownerId);
  }
}

export async function detachToolFromSite(toolId: string, ownerId: string) {
  const tool = await Tool.findOne({ _id: toolId, ownerId });
  if (!tool?.siteId) return;
  const siteId = tool.siteId;
  tool.siteId = null;
  await tool.save();
  await recalcToolCount(siteId, ownerId);
  await pruneIfEmpty(siteId, ownerId);
}

export async function syncAllSites(ownerId: string) {
  const tools = await Tool.find({ ownerId }).select("_id domain siteId");
  const byDomain = new Map<string, string[]>();
  for (const tool of tools) {
    if (!tool.domain) continue;
    const ids = byDomain.get(tool.domain) ?? [];
    ids.push(String(tool._id));
    byDomain.set(tool.domain, ids);
  }

  for (const [domain, toolIds] of byDomain) {
    let site = await Site.findOne({ ownerId, domain });
    if (!site) {
      site = await Site.create({
        ownerId,
        domain,
        displayName: domain,
        faviconUrl: faviconUrlFor(domain),
        toolCount: 0,
      });
    }
    const siteId = String(site._id);
    await Tool.updateMany(
      { _id: { $in: toolIds } },
      { siteId },
    );
    await recalcToolCount(siteId, ownerId);
  }

  const sites = await Site.find({ ownerId }).select("_id");
  for (const site of sites) {
    await pruneIfEmpty(String(site._id), ownerId);
  }
}
