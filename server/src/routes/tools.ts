import { Router } from "express";
import { HttpError, asyncHandler } from "../errors.js";
import {
  authenticate,
  docOf,
  owned,
  requireUser,
  validate,
} from "../middleware/auth.js";
import { Tool, type ToolDoc } from "../models/library.js";
import {
  attachToolToSite,
  detachToolFromSite,
} from "../services/siteSync.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";
import {
  forgottenQuerySchema,
  relatedQuerySchema,
  toolCreateSchema,
  toolUpdateSchema,
  toolsQuerySchema,
} from "../validation.js";

const router = Router();
router.use(authenticate, requireUser);

const SORT_NEWEST: Record<string, -1> = { createdAt: -1 };

router.get(
  "/",
  validate({ query: toolsQuerySchema }),
  asyncHandler(async (req, res) => {
    const { q, favorite, limit } = req.query as {
      q?: string;
      favorite?: string;
      limit?: number;
    };
    const filter: Record<string, unknown> = { ownerId: req.user!.id };
    if (favorite !== undefined) filter.isFavorite = favorite === "true";
    if (q) filter.$text = { $search: q };
    const tools = await Tool.find(filter)
      .sort(SORT_NEWEST)
      .limit(limit ?? 200);
    res.json({ tools });
  }),
);

router.post(
  "/",
  validate({ body: toolCreateSchema }),
  asyncHandler(async (req, res) => {
    const ownerId = req.user!.id;
    const input = req.body as {
      name: string;
      url: string;
      category?: string | null;
      description?: string | null;
      notes?: string | null;
      tags?: string[];
      isFavorite?: boolean;
    };

    let normalized: ReturnType<typeof normalizeUrl>;
    try {
      normalized = normalizeUrl(input.url);
    } catch {
      throw new HttpError(400, "URL must be a valid absolute URL");
    }

    const existing = await Tool.findOne({
      ownerId,
      normalizedUrl: normalized.normalizedUrl,
    });
    if (existing) {
      return res.json({ tool: existing, created: false, reason: "duplicate" });
    }

    const tool = await Tool.create({
      ownerId,
      name: input.name,
      url: normalized.url,
      normalizedUrl: normalized.normalizedUrl,
      domain: normalized.domain,
      category: input.category ?? null,
      description: input.description ?? null,
      notes: input.notes ?? null,
      tags: input.tags ?? [],
      isFavorite: input.isFavorite ?? false,
      siteId: null,
    });
    await attachToolToSite(String(tool._id), ownerId);
    const fresh = await Tool.findById(tool._id);
    return res.status(201).json({ tool: fresh, created: true });
  }),
);

/** Duplicate-check probe used by the editor while typing. */
router.get(
  "/lookup",
  asyncHandler(async (req, res) => {
    const normalizedUrl =
      typeof req.query.normalizedUrl === "string"
        ? req.query.normalizedUrl
        : "";
    if (!normalizedUrl) return res.json({ tool: null });
    const tool = await Tool.findOne({ ownerId: req.user!.id, normalizedUrl });
    return res.json({ tool });
  }),
);

router.get("/recent", asyncHandler(async (req, res) => {
  const tools = await Tool.find({ ownerId: req.user!.id })
    .sort(SORT_NEWEST)
    .limit(10);
  res.json({ tools });
}));

router.get("/favorites", asyncHandler(async (req, res) => {
  const tools = await Tool.find({ ownerId: req.user!.id, isFavorite: true }).sort(
    SORT_NEWEST,
  );
  res.json({ tools });
}));

router.get(
  "/forgotten",
  validate({ query: forgottenQuerySchema }),
  asyncHandler(async (req, res) => {
    const days = (req.query as { days?: number }).days ?? 90;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const tools = await Tool.find({
      ownerId: req.user!.id,
      $or: [{ lastUsedAt: null }, { lastUsedAt: { $lt: cutoff } }],
    }).sort(SORT_NEWEST);
    res.json({ tools });
  }),
);

router.get(
  "/:id",
  owned(Tool, "Tool"),
  asyncHandler(async (req, res) => {
    res.json({ tool: docOf<ToolDoc>(req) });
  }),
);

router.patch(
  "/:id",
  owned(Tool, "Tool"),
  validate({ body: toolUpdateSchema }),
  asyncHandler(async (req, res) => {
    const tool = docOf<ToolDoc>(req);
    const updates = req.body as Partial<ToolDoc> & { url?: string };
    const domainChanged =
      typeof updates.url === "string" && updates.url !== tool.url;

    if (updates.url !== undefined) {
      try {
        const normalized = normalizeUrl(updates.url);
        const clash = await Tool.findOne({
          ownerId: req.user!.id,
          normalizedUrl: normalized.normalizedUrl,
          _id: { $ne: tool._id },
        });
        if (clash) throw new HttpError(409, "Another tool already uses this URL");
        tool.url = normalized.url;
        tool.normalizedUrl = normalized.normalizedUrl;
        tool.domain = normalized.domain;
      } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError(400, "URL must be a valid absolute URL");
      }
    }
    if (updates.name !== undefined) tool.name = updates.name;
    if (updates.category !== undefined) tool.category = updates.category;
    if (updates.description !== undefined) tool.description = updates.description;
    if (updates.notes !== undefined) tool.notes = updates.notes;
    if (updates.tags !== undefined) tool.tags = updates.tags;
    if (updates.isFavorite !== undefined) tool.isFavorite = updates.isFavorite;
    await tool.save();

    if (domainChanged) {
      await attachToolToSite(String(tool._id), req.user!.id);
    }
    const fresh = await Tool.findById(tool._id);
    res.json({ tool: fresh });
  }),
);

router.delete(
  "/:id",
  owned(Tool, "Tool"),
  asyncHandler(async (req, res) => {
    const tool = docOf<ToolDoc>(req);
    const toolId = String(tool._id);
    await detachToolFromSite(toolId, req.user!.id);
    // Remove from every collection that references it (no dangling ids).
    const { Collection } = await import("../models/library.js");
    await Collection.updateMany(
      { ownerId: req.user!.id },
      { $pull: { toolIds: toolId } },
    );
    await Tool.deleteOne({ _id: toolId });
    res.status(204).end();
  }),
);

router.post(
  "/:id/favorite",
  owned(Tool, "Tool"),
  asyncHandler(async (req, res) => {
    const tool = docOf<ToolDoc>(req);
    tool.isFavorite = !tool.isFavorite;
    await tool.save();
    res.json({ tool });
  }),
);

router.post(
  "/:id/used",
  owned(Tool, "Tool"),
  asyncHandler(async (req, res) => {
    const tool = docOf<ToolDoc>(req);
    tool.lastUsedAt = new Date();
    await tool.save();
    res.json({ tool });
  }),
);

router.get(
  "/:id/related",
  owned(Tool, "Tool"),
  validate({ query: relatedQuerySchema }),
  asyncHandler(async (req, res) => {
    const source = docOf<ToolDoc>(req);
    const minSharedTags =
      (req.query as { minSharedTags?: number }).minSharedTags ?? 2;
    const sourceId = String(source._id);
    const candidates = await Tool.find({
      ownerId: req.user!.id,
      _id: { $ne: sourceId },
      $or: [
        { category: source.category },
        { tags: { $in: source.tags } },
      ],
    });
    const sourceTags = new Set(source.tags);
    const related = candidates.filter((candidate) => {
      const shared = candidate.tags.filter((tag) => sourceTags.has(tag)).length;
      const sameCategory =
        source.category !== null && source.category === candidate.category;
      return shared >= minSharedTags || sameCategory;
    });
    res.json({ tools: related });
  }),
);

export default router;
