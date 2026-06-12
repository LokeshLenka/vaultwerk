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

    this.version(1).stores({
      tools: [
        "id",
        "&normalizedUrl",
        "name",
        "domain",
        "category",
        "subcategory",
        "*tags",
        "toolType",
        "isFavorite",
        "source",
        "metadataStatus",
        "aiStatus",
        "createdAt",
        "updatedAt",
        "lastUsedAt",
        "archivedAt",
        "syncState",
        "version",
        "[isFavorite+archivedAt]",
        "[category+archivedAt]",
        "[syncState+updatedAt]",
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

/* ---------------------------------- */
/* URL normalization                  */
/* ---------------------------------- */

export function normalizeUrl(raw: string): {
  url: string;
  normalizedUrl: string;
  domain: string;
} {
  const input = raw.trim();
  const parsed = new URL(input);

  parsed.hash = "";
  parsed.hostname = parsed.hostname.toLowerCase();

  if (
    (parsed.protocol === "https:" && parsed.port === "443") ||
    (parsed.protocol === "http:" && parsed.port === "80")
  ) {
    parsed.port = "";
  }

  const trackingParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
    "source",
  ];

  for (const key of [...parsed.searchParams.keys()]) {
    if (trackingParams.includes(key)) {
      parsed.searchParams.delete(key);
    }
  }

  if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  const normalizedUrl = parsed.toString();
  const domain = parsed.hostname.replace(/^www\./, "");

  return {
    url: input,
    normalizedUrl,
    domain,
  };
}
