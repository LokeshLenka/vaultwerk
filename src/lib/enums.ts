/* ---------------------------------- */
/* Enums / constants                  */
/* ---------------------------------- */

export const TOOL_CATEGORIES = [
  "frontend",
  "backend",
  "devops-infra",
  "database",
  "ai-ml",
  "design-ui",
  "testing-qa",
  "security",
  "productivity",
  "apis-services",
  "automation",
  "learning-docs",
  "deployment",
  "monitoring",
  "cli-terminal",
  "ai",
  "design",
  "development",
  "productivity",
  "notes",
  "research",
  "communication",
  "developer-tools",
  "knowledge",
  "collaboration",
  "other",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export const TOOL_TYPES = [
  "website",
  "library",
  "api",
  "saas",
  "extension",
  "github",
  "desktop-app",
  "mobile-app",
  "cli",
  "other",
] as const;

export type ToolType = (typeof TOOL_TYPES)[number];

export const TOOL_SOURCES = ["manual", "extension", "import", "seed"] as const;

export type ToolSource = (typeof TOOL_SOURCES)[number];

export const COLLECTION_SOURCES = ["user", "seed", "import", "cloned"] as const;

export type CollectionSource = (typeof COLLECTION_SOURCES)[number];

export const JOB_TYPES = [
  "metadata_fetch",
  "ai_enrich",
  "import_json",
  "import_bookmarks",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const JOB_STATUS = ["queued", "running", "done", "failed"] as const;

export type JobStatus = (typeof JOB_STATUS)[number];

export const SYNC_STATES = [
  "local-only",
  "synced",
  "modified",
  "deleted",
] as const;

export type SyncState = (typeof SYNC_STATES)[number];
