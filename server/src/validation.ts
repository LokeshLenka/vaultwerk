import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(160);
const password = z.string().min(8).max(128);
const objectName = (max: number) => z.string().trim().min(1).max(max);
const nullableText = z.string().trim().max(5000).nullable().optional();
const tags = z.array(z.string().trim().min(1).max(40)).max(30).optional();

export const registerSchema = z.object({
  name: objectName(80),
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(128),
});

export const toolCreateSchema = z.object({
  name: objectName(200),
  url: z.string().trim().min(1).max(2048),
  category: z.string().trim().max(60).nullable().optional(),
  description: nullableText,
  notes: nullableText,
  tags,
  isFavorite: z.boolean().optional(),
});

export const toolUpdateSchema = z
  .object({
    name: objectName(200).optional(),
    url: z.string().trim().min(1).max(2048).optional(),
    category: z.string().trim().max(60).nullable().optional(),
    description: z.string().trim().max(5000).nullable().optional(),
    notes: z.string().trim().max(5000).nullable().optional(),
    tags: z.array(z.string().trim().min(1).max(40)).max(30).optional(),
    isFavorite: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });

export const toolsQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  favorite: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

export const collectionCreateSchema = z.object({
  name: objectName(50),
  description: z.string().trim().max(300).nullable().optional(),
});

export const collectionUpdateSchema = z
  .object({
    name: objectName(50).optional(),
    description: z.string().trim().max(300).nullable().optional(),
    toolIds: z.array(z.string().min(1)).max(500).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });

export const collectionAddToolSchema = z.object({
  toolId: z.string().min(1),
});

export const settingPutSchema = z.object({
  value: z.unknown(),
});

export const jobCreateSchema = z.object({
  type: z.string().trim().min(1).max(60),
  entityType: z.enum(["tool", "collection", "system"]),
  entityId: z.string().min(1).nullable().optional(),
  payload: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const jobUpdateSchema = z
  .object({
    status: z.enum(["queued", "running", "done", "failed"]).optional(),
    errorMessage: z.string().max(2000).nullable().optional(),
    attempts: z.number().int().min(0).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });

export const jobsQuerySchema = z.object({
  status: z.enum(["queued", "running", "done", "failed"]).optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

export const apiKeyCreateSchema = z.object({
  name: objectName(60),
  expiresInDays: z.number().int().min(1).max(365).nullable().optional(),
});

export const adminRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

export const forgottenQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(3650).optional(),
});

export const relatedQuerySchema = z.object({
  minSharedTags: z.coerce.number().int().min(1).max(10).optional(),
});
