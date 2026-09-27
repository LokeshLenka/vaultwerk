import { Router } from "express";
import { asyncHandler } from "../errors.js";
import {
  authenticate,
  docOf,
  owned,
  requireUser,
} from "../middleware/auth.js";
import { Site, Tool, type SiteDoc } from "../models/library.js";
import { syncAllSites } from "../services/siteSync.js";

const router = Router();
router.use(authenticate, requireUser);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sites = await Site.find({ ownerId: req.user!.id }).sort({
      updatedAt: -1,
    });
    res.json({ sites });
  }),
);

router.post(
  "/sync",
  asyncHandler(async (req, res) => {
    await syncAllSites(req.user!.id);
    const sites = await Site.find({ ownerId: req.user!.id }).sort({
      updatedAt: -1,
    });
    res.json({ sites });
  }),
);

router.get(
  "/:id",
  owned(Site, "Site"),
  asyncHandler(async (req, res) => {
    res.json({ site: docOf<SiteDoc>(req) });
  }),
);

router.get(
  "/:id/tools",
  owned(Site, "Site"),
  asyncHandler(async (req, res) => {
    const site = docOf<SiteDoc>(req);
    const tools = await Tool.find({
      ownerId: req.user!.id,
      siteId: String(site._id),
    }).sort({ createdAt: -1 });
    res.json({ tools });
  }),
);

export default router;
