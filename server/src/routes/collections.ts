import { Router } from "express";
import { HttpError, asyncHandler } from "../errors.js";
import {
  authenticate,
  docOf,
  owned,
  requireUser,
  validate,
} from "../middleware/auth.js";
import { Collection, Tool, type CollectionDoc } from "../models/library.js";
import {
  collectionAddToolSchema,
  collectionCreateSchema,
  collectionUpdateSchema,
} from "../validation.js";

const router = Router();
router.use(authenticate, requireUser);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const collections = await Collection.find({ ownerId: req.user!.id }).sort({
      createdAt: -1,
    });
    res.json({ collections });
  }),
);

router.post(
  "/",
  validate({ body: collectionCreateSchema }),
  asyncHandler(async (req, res) => {
    const input = req.body as { name: string; description?: string | null };
    const collection = await Collection.create({
      ownerId: req.user!.id,
      name: input.name,
      description: input.description ?? null,
      toolIds: [],
    });
    res.status(201).json({ collection });
  }),
);

router.get(
  "/:id",
  owned(Collection, "Collection"),
  asyncHandler(async (req, res) => {
    res.json({ collection: docOf<CollectionDoc>(req) });
  }),
);

router.patch(
  "/:id",
  owned(Collection, "Collection"),
  validate({ body: collectionUpdateSchema }),
  asyncHandler(async (req, res) => {
    const collection = docOf<CollectionDoc>(req);
    const updates = req.body as {
      name?: string;
      description?: string | null;
      toolIds?: string[];
    };
    if (updates.name !== undefined) collection.name = updates.name;
    if (updates.description !== undefined) {
      collection.description = updates.description;
    }
    if (updates.toolIds !== undefined) {
      collection.toolIds = [...new Set(updates.toolIds)];
    }
    await collection.save();
    res.json({ collection });
  }),
);

router.delete(
  "/:id",
  owned(Collection, "Collection"),
  asyncHandler(async (req, res) => {
    await Collection.deleteOne({ _id: docOf<CollectionDoc>(req)._id });
    res.status(204).end();
  }),
);

router.get(
  "/:id/tools",
  owned(Collection, "Collection"),
  asyncHandler(async (req, res) => {
    const collection = docOf<CollectionDoc>(req);
    const tools = await Tool.find({
      ownerId: req.user!.id,
      _id: { $in: collection.toolIds },
    });
    res.json({ tools });
  }),
);

router.post(
  "/:id/tools",
  owned(Collection, "Collection"),
  validate({ body: collectionAddToolSchema }),
  asyncHandler(async (req, res) => {
    const collection = docOf<CollectionDoc>(req);
    const { toolId } = req.body as { toolId: string };
    const tool = await Tool.findOne({ _id: toolId, ownerId: req.user!.id });
    if (!tool) throw new HttpError(404, "Tool not found");
    if (!collection.toolIds.includes(toolId)) {
      collection.toolIds.push(toolId);
      await collection.save();
    }
    res.json({ collection });
  }),
);

router.delete(
  "/:id/tools/:toolId",
  owned(Collection, "Collection"),
  asyncHandler(async (req, res) => {
    const collection = docOf<CollectionDoc>(req);
    collection.toolIds = collection.toolIds.filter(
      (id) => id !== req.params.toolId,
    );
    await collection.save();
    res.json({ collection });
  }),
);

export default router;
