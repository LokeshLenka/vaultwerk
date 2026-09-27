import { Router } from "express";
import { asyncHandler } from "../errors.js";
import {
  authenticate,
  docOf,
  owned,
  requireUser,
  validate,
} from "../middleware/auth.js";
import { Job, type JobDoc } from "../models/library.js";
import { jobCreateSchema, jobUpdateSchema, jobsQuerySchema } from "../validation.js";

const router = Router();
router.use(authenticate, requireUser);

router.get(
  "/",
  validate({ query: jobsQuerySchema }),
  asyncHandler(async (req, res) => {
    const { status, limit } = req.query as { status?: string; limit?: number };
    const filter: Record<string, unknown> = { ownerId: req.user!.id };
    if (status) filter.status = status;
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit ?? 100);
    res.json({ jobs });
  }),
);

router.post(
  "/",
  validate({ body: jobCreateSchema }),
  asyncHandler(async (req, res) => {
    const input = req.body as {
      type: string;
      entityType: string;
      entityId?: string | null;
      payload?: Record<string, unknown> | null;
    };
    const job = await Job.create({
      ownerId: req.user!.id,
      type: input.type,
      status: "queued",
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      payload: input.payload ?? null,
      errorMessage: null,
      attempts: 0,
    });
    res.status(201).json({ job });
  }),
);

router.get(
  "/:id",
  owned(Job, "Job"),
  asyncHandler(async (req, res) => {
    res.json({ job: docOf<JobDoc>(req) });
  }),
);

router.patch(
  "/:id",
  owned(Job, "Job"),
  validate({ body: jobUpdateSchema }),
  asyncHandler(async (req, res) => {
    const job = docOf<JobDoc>(req);
    const updates = req.body as {
      status?: JobDoc["status"];
      errorMessage?: string | null;
      attempts?: number;
    };
    if (updates.status !== undefined) job.status = updates.status;
    if (updates.errorMessage !== undefined) {
      job.errorMessage = updates.errorMessage;
    }
    if (updates.attempts !== undefined) job.attempts = updates.attempts;
    await job.save();
    res.json({ job });
  }),
);

router.delete(
  "/:id",
  owned(Job, "Job"),
  asyncHandler(async (req, res) => {
    await Job.deleteOne({ _id: docOf<JobDoc>(req)._id });
    res.status(204).end();
  }),
);

/** Clears finished (done/failed) jobs — the queue hygiene action. */
router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const result = await Job.deleteMany({
      ownerId: req.user!.id,
      status: { $in: ["done", "failed"] },
    });
    res.json({ deleted: result.deletedCount });
  }),
);

export default router;
