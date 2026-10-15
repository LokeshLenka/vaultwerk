import rateLimit from "express-rate-limit";
import { Router } from "express";
import { z } from "zod";
import { config } from "../config.js";
import { HttpError, asyncHandler } from "../errors.js";
import { authenticate, requireUser, validate } from "../middleware/auth.js";
import { seedDemoLibrary } from "./demo.js";

const router = Router();
router.use(authenticate, requireUser);

const demoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-7",
  message: { error: "Demo seeding is rate-limited — try again later" },
});

const demoSchema = z.object({
  count: z.coerce.number().int().min(1).max(50).optional(),
  includeCollections: z.boolean().optional(),
});

/**
 * One-shot demo library for new accounts. Gated by ALLOW_SEED in
 * production so hosted instances can't be farmed for junk rows.
 */
router.post(
  "/demo",
  demoLimiter,
  validate({ body: demoSchema }),
  asyncHandler(async (req, res) => {
    if (!config.allowSeed) {
      throw new HttpError(403, "Demo seeding is disabled on this instance");
    }
    const { count, includeCollections } = req.body as {
      count?: number;
      includeCollections?: boolean;
    };
    const summary = await seedDemoLibrary(req.user!.id, {
      count,
      includeCollections,
    });
    res.status(201).json({ summary });
  }),
);

export default router;
