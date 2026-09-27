import { Schema, model, type Types } from "mongoose";
import { withClientShape } from "../db.js";

const owner = {
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
} as const;

export interface ToolDoc {
  ownerId: Types.ObjectId;
  url: string;
  normalizedUrl: string;
  name: string;
  domain: string;
  faviconUrl: string | null;
  category: string | null;
  tags: string[];
  description: string | null;
  notes: string | null;
  siteId: string | null;
  isFavorite: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const toolSchema = new Schema<ToolDoc>(
  {
    ...owner,
    url: { type: String, required: true },
    normalizedUrl: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    domain: { type: String, required: true, index: true },
    faviconUrl: { type: String, default: null },
    category: { type: String, default: null },
    tags: { type: [String], default: [] },
    description: { type: String, default: null },
    notes: { type: String, default: null },
    siteId: { type: String, default: null, index: true },
    isFavorite: { type: Boolean, default: false },
    lastUsedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
// One user can save a URL only once — the duplicate guard, enforced by the DB.
toolSchema.index({ ownerId: 1, normalizedUrl: 1 }, { unique: true });
// Server-side full-text search across the library.
toolSchema.index({
  name: "text",
  description: "text",
  notes: "text",
  tags: "text",
  domain: "text",
  category: "text",
});
withClientShape(toolSchema);
export const Tool = model<ToolDoc>("Tool", toolSchema);

export interface CollectionDoc {
  ownerId: Types.ObjectId;
  name: string;
  description: string | null;
  toolIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<CollectionDoc>(
  {
    ...owner,
    name: { type: String, required: true, trim: true, maxlength: 50 },
    description: { type: String, default: null },
    toolIds: { type: [String], default: [] },
  },
  { timestamps: true },
);
withClientShape(collectionSchema);
export const Collection = model<CollectionDoc>("Collection", collectionSchema);

export interface SiteDoc {
  ownerId: Types.ObjectId;
  domain: string;
  displayName: string;
  faviconUrl: string | null;
  toolCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const siteSchema = new Schema<SiteDoc>(
  {
    ...owner,
    domain: { type: String, required: true },
    displayName: { type: String, required: true },
    faviconUrl: { type: String, default: null },
    toolCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);
siteSchema.index({ ownerId: 1, domain: 1 }, { unique: true });
withClientShape(siteSchema);
export const Site = model<SiteDoc>("Site", siteSchema);

export interface SettingDoc {
  ownerId: Types.ObjectId;
  key: string;
  value: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const settingSchema = new Schema<SettingDoc>(
  {
    ...owner,
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);
settingSchema.index({ ownerId: 1, key: 1 }, { unique: true });
withClientShape(settingSchema);
export const Setting = model<SettingDoc>("Setting", settingSchema);

export interface JobDoc {
  ownerId: Types.ObjectId;
  type: string;
  status: string;
  entityType: string;
  entityId: string | null;
  payload: Record<string, unknown> | null;
  errorMessage: string | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDoc>(
  {
    ...owner,
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["queued", "running", "done", "failed"],
      default: "queued",
      index: true,
    },
    entityType: { type: String, required: true },
    entityId: { type: String, default: null },
    payload: { type: Schema.Types.Mixed, default: null },
    errorMessage: { type: String, default: null },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);
withClientShape(jobSchema);
export const Job = model<JobDoc>("Job", jobSchema);
