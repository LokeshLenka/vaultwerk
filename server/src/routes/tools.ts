import { Router } from "express";
import rateLimit from "express-rate-limit";
import { HttpError, asyncHandler } from "../errors.js";
import {
  authenticate,
  docOf,
  owned,
  requireUser,
  validate,
} from "../middleware/auth.js";
import { Tool, type ToolDoc, Collection } from "../models/library.js";
import {
  attachToolToSite,
  detachToolFromSite,
  syncAllSites,
} from "../services/siteSync.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";
import { suggestCategory, suggestTags } from "../services/suggest.js";
import {
  bookmarkImportSchema,
  forgottenQuerySchema,
  metadataQuerySchema,
  relatedQuerySchema,
  toolCreateSchema,
  toolUpdateSchema,
  toolsQuerySchema,
} from "../validation.js";
import { fetchPageMetadata } from "../services/metadata.js";

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
      faviconUrl?: string | null;
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
      // Auto-fetched page icon; only persisted when it's a sane http(s) URL.
      faviconUrl:
        typeof input.faviconUrl === "string" &&
        /^https?:\/\//i.test(input.faviconUrl)
          ? input.faviconUrl
          : null,
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

// Fetching arbitrary pages is expensive and SSRF-sensitive, so this probe
// gets its own tight budget on top of the general API limiter.
const metadataLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: "draft-7",
  message: { error: "Too many page previews — try again in a minute" },
});

/**
 * Page preview probe: paste a URL, get back its title, description, and
 * favicon so the editor can pre-fill the form. Failures are 422 with a
 * human-readable message — the client just leaves the form manual.
 * Registered before "/:id" so "metadata" isn't treated as a tool id.
 */
router.get(
  "/metadata",
  metadataLimiter,
  validate({ query: metadataQuerySchema }),
  asyncHandler(async (req, res) => {
    const { url } = req.query as { url: string };
    try {
      const metadata = await fetchPageMetadata(url);
      res.json({ metadata });
    } catch (error) {
      throw new HttpError(
        422,
        error instanceof Error ? error.message : "That page could not be read",
      );
    }
  }),
);

/**
 * Browser bookmark import. The client parses the Netscape-format HTML
 * export locally (DOM-free regex pass) and POSTs plain items; the server
 * owns normalization, dedupe, auto-categorization, and collection wiring
 * so a re-import is always safe.
 *
 * Browser-generated root folders ("Bookmarks bar", "Other bookmarks", …)
 * never become collections, even if a client sends them raw.
 */
const ROOT_FOLDERS = new Set([
  "bookmarks bar",
  "other bookmarks",
  "mobile bookmarks",
  "bookmarks",
  "bookmarks menu",
  "favorites bar",
  "other favorites",
  "toolbar",
  "reading list",
]);
router.post(
  "/import-bookmarks",
  validate({ body: bookmarkImportSchema }),
  asyncHandler(async (req, res) => {
    const ownerId = req.user!.id;
    const { items, createCollections } = req.body as {
      items: { url: string; title?: string | null; folder?: string | null }[];
      createCollections?: boolean;
    };

    type Prepared = {
      url: string;
      normalizedUrl: string;
      domain: string;
      name: string;
      category: string | null;
      tags: string[];
      folder: string | null;
    };
    const prepared: Prepared[] = [];
    let invalid = 0;

    for (const item of items) {
      const raw = item.url.trim();
      // Bookmarks carry chrome://, javascript:, place:, data:… — web only.
      if (!/^https?:\/\//i.test(raw)) {
        invalid++;
        continue;
      }
      let normalized: ReturnType<typeof normalizeUrl>;
      try {
        normalized = normalizeUrl(raw);
      } catch {
        invalid++;
        continue;
      }
      const rawTitle = item.title?.trim().replace(/\s+/g, " ").slice(0, 200) ?? "";
      // Suggest from the real title only — the domain fallback below would
      // otherwise leak tokens like "com" into the tags.
      const suggestionInput = { title: rawTitle || null, url: normalized.url };
      // Browser root folders ("Bookmarks bar", …) never become collections.
      const folderRaw = item.folder?.trim().slice(0, 50) ?? "";
      const folder = ROOT_FOLDERS.has(folderRaw.toLowerCase()) ? null : folderRaw || null;
      prepared.push({
        url: normalized.url,
        normalizedUrl: normalized.normalizedUrl,
        domain: normalized.domain,
        name: rawTitle || normalized.domain,
        category: suggestCategory(suggestionInput),
        tags: suggestTags(suggestionInput),
        folder,
      });
    }

    // One query finds every already-saved URL…
    const existing = await Tool.find({
      ownerId,
      normalizedUrl: { $in: prepared.map((p) => p.normalizedUrl) },
    }).select("normalizedUrl");
    const existingSet = new Set(existing.map((t) => t.normalizedUrl));
    // …and a local set catches repeats inside the file itself.
    const seen = new Set<string>();
    const fresh = prepared.filter((p) => {
      if (existingSet.has(p.normalizedUrl) || seen.has(p.normalizedUrl)) {
        return false;
      }
      seen.add(p.normalizedUrl);
      return true;
    });
    const duplicates = prepared.length - fresh.length;

    const created =
      fresh.length > 0
        ? await Tool.insertMany(
            fresh.map((p) => ({
              ownerId,
              url: p.url,
              normalizedUrl: p.normalizedUrl,
              domain: p.domain,
              name: p.name,
              category: p.category,
              description: null,
              notes: null,
              tags: p.tags,
              isFavorite: false,
              faviconUrl: null,
              siteId: null,
            })),
          )
        : [];

    let collectionsCreated = 0;
    let collectionsReused = 0;
    if (createCollections !== false && created.length > 0) {
      const byFolder = new Map<string, string[]>();
      created.forEach((doc, i) => {
        const folder = fresh[i].folder;
        if (!folder) return;
        const ids = byFolder.get(folder) ?? [];
        ids.push(String(doc._id));
        byFolder.set(folder, ids);
      });
      for (const [name, toolIds] of byFolder) {
        let collection = await Collection.findOne({ ownerId, name });
        if (!collection) {
          collection = await Collection.create({
            ownerId,
            name,
            description: "Imported from browser bookmarks",
            toolIds: [],
          });
          collectionsCreated++;
        } else {
          collectionsReused++;
        }
        await Collection.updateOne(
          { _id: collection._id },
          { $addToSet: { toolIds: { $each: toolIds } } },
        );
      }
    }

    // Rebuild site grouping once instead of per-tool.
    await syncAllSites(ownerId);

    res.status(201).json({
      summary: {
        imported: created.length,
        duplicates,
        invalid,
        collectionsCreated,
        collectionsReused,
      },
    });
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
