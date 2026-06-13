import Dexie, { type Table } from "dexie";
import type { ToolRecord } from "./types/tool";
import type { CollectionRecord } from "./types/collection";
import type { SettingRecord } from "./types/setting";
import type { JobRecord } from "./types/job";

/* ---------------------------------- */
/* Dexie database                     */
/* ---------------------------------- */

export class VaultWerkDB extends Dexie {
  tools!: Table<ToolRecord, string>;
  collections!: Table<CollectionRecord, string>;
  settings!: Table<SettingRecord, string>;
  jobs!: Table<JobRecord, string>;

  constructor() {
    super("vaultwerk_db");

    this.version(2).stores({
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
        "[isFavorite+updatedAt]",
        "[category+updatedAt]",
      ].join(","),

      collections: [
        "id",
        "name",
        "slug",
        "isPublic",
        "creatorId",
        "source",
        "*toolIds",
        "createdAt",
        "updatedAt",
        "archivedAt",
        "syncState",
        "version",
        "[isPublic+archivedAt]",
        "[syncState+updatedAt]",
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
        "[status+createdAt]",
        "[entityType+entityId]",
      ].join(","),
    });
  }
}

export const db = new VaultWerkDB();

