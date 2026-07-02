import Dexie, { type Table } from "dexie";
import type { ToolRecord } from "./types/tool";
import type { CollectionRecord } from "./types/collection";
import type { SettingRecord } from "./types/setting";
import type { JobRecord } from "./types/job";
import type { SiteRecord } from "./types/site";

export class VaultWerkDB extends Dexie {
  tools!: Table<ToolRecord, string>;
  collections!: Table<CollectionRecord, string>;
  settings!: Table<SettingRecord, string>;
  jobs!: Table<JobRecord, string>;
  sites!: Table<SiteRecord, string>;

  constructor() {
    super("vaultwerk_db");

    this.version(4).stores({
      tools: [
        "id",
        "&normalizedUrl",
        "name",
        "domain",
        "category",
        "*tags",
        "isFavorite",
        "createdAt",
        "updatedAt",
        "lastUsedAt",
      ].join(","),
      collections: [
        "id",
        "name",
        "description",
        "*toolIds",
        "createdAt",
        "updatedAt",
      ].join(","),
      settings: "&key",
      jobs: [
        "id",
        "type",
        "status",
        "entityType",
        "entityId",
        "attempts",
        "createdAt",
        "updatedAt",
      ].join(","),
    });

    this.version(5).stores({
      tools: [
        "id",
        "&normalizedUrl",
        "siteId",
        "name",
        "domain",
        "category",
        "*tags",
        "isFavorite",
        "createdAt",
        "updatedAt",
        "lastUsedAt",
      ].join(","),
      collections: [
        "id",
        "name",
        "description",
        "*toolIds",
        "createdAt",
        "updatedAt",
      ].join(","),
      settings: "&key",
      jobs: [
        "id",
        "type",
        "status",
        "entityType",
        "entityId",
        "attempts",
        "createdAt",
        "updatedAt",
      ].join(","),
      sites: [
        "id",
        "&domain",
        "toolCount",
        "updatedAt",
      ].join(","),
    });
  }
}

export const db = new VaultWerkDB();
export default db;
