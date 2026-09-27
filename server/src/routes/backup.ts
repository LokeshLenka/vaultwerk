import { Router } from "express";
import { Types } from "mongoose";
import { HttpError, asyncHandler } from "../errors.js";
import { authenticate, requireUser } from "../middleware/auth.js";
import {
  Collection,
  Job,
  Setting,
  Site,
  Tool,
} from "../models/library.js";
import { syncAllSites } from "../services/siteSync.js";

const router = Router();
router.use(authenticate, requireUser);

router.get(
  "/export",
  asyncHandler(async (req, res) => {
    const ownerId = req.user!.id;
    const [tools, collections, sites, settings, jobs] = await Promise.all([
      Tool.find({ ownerId }),
      Collection.find({ ownerId }),
      Site.find({ ownerId }),
      Setting.find({ ownerId }),
      Job.find({ ownerId }),
    ]);
    res.json({
      app: "vaultwerk",
      version: 2,
      exportedAt: new Date().toISOString(),
      tables: { tools, collections, sites, settings, jobs },
    });
  }),
);

interface LegacyRow {
  id?: string;
  toolIds?: string[];
  siteId?: string | null;
  [key: string]: unknown;
}

function withoutId<T extends LegacyRow>(row: T): Omit<T, "id"> {
  const rest = { ...row };
  delete rest.id;
  return rest;
}

/**
 * Restores a backup (v1 IndexedDB exports or v2 API exports).
 * Old string ids (uuids or ObjectIds from another instance) are remapped
 * to fresh ids so imports never collide, and collection membership plus
 * site links are rewired through the map. Sites are then re-synced so
 * counts are exact even if the file's site table is stale.
 */
router.post(
  "/import",
  asyncHandler(async (req, res) => {
    const ownerId = req.user!.id;
    const body = req.body as {
      app?: string;
      tables?: Record<string, LegacyRow[] | undefined>;
    };
    if (body?.app !== "vaultwerk" || typeof body.tables !== "object") {
      throw new HttpError(400, "Not a VaultWerk backup file");
    }
    const tables = body.tables;

    const idMap = new Map<string, string>();
    const remap = (oldId: string | undefined): string | null => {
      if (!oldId) return null;
      let fresh = idMap.get(oldId);
      if (!fresh) {
        // Fresh ObjectId hex without a round-trip.
        fresh = new Types.ObjectId().toHexString();
        idMap.set(oldId, fresh);
      }
      return fresh;
    };

    const tools = Array.isArray(tables.tools) ? tables.tools : [];
    const toolDocs = tools.map((row) => {
      const freshId = remap(row.id);
      return { ...withoutId(row), _id: freshId, ownerId, siteId: null };
    });
    if (toolDocs.length > 0) await Tool.insertMany(toolDocs);

    const collections = Array.isArray(tables.collections)
      ? tables.collections
      : [];
    const collectionDocs = collections.map((row) => ({
      ...withoutId(row),
      _id: remap(row.id),
      ownerId,
      toolIds: (row.toolIds ?? [])
        .map((old) => idMap.get(old))
        .filter((v): v is string => typeof v === "string"),
    }));
    if (collectionDocs.length > 0) await Collection.insertMany(collectionDocs);

    const settings = Array.isArray(tables.settings) ? tables.settings : [];
    for (const row of settings) {
      if (typeof row.key !== "string") continue;
      await Setting.findOneAndUpdate(
        { ownerId, key: row.key },
        { value: row.value ?? null },
        { upsert: true },
      );
    }

    const jobs = Array.isArray(tables.jobs) ? tables.jobs : [];
    const jobDocs = jobs.map((row) => ({
      ...withoutId(row),
      _id: remap(row.id),
      ownerId,
    }));
    if (jobDocs.length > 0) await Job.insertMany(jobDocs);

    // Rebuild site grouping from the imported tools (never trust file sites).
    await syncAllSites(ownerId);

    res.json({
      imported: {
        tools: toolDocs.length,
        collections: collectionDocs.length,
        settings: settings.length,
        jobs: jobDocs.length,
      },
    });
  }),
);

export default router;
