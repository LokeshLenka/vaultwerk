import { db } from "../db";
import type { SiteRecord } from "../types/site";

export async function listSites(): Promise<SiteRecord[]> {
  return db.sites.orderBy("updatedAt").reverse().toArray();
}

export async function getSiteById(id: string): Promise<SiteRecord | undefined> {
  return db.sites.get(id);
}

export async function getSiteTools(siteId: string) {
  return db.tools.where("siteId").equals(siteId).toArray();
}
