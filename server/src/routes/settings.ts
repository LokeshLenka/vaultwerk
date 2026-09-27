import { Router } from "express";
import { asyncHandler } from "../errors.js";
import { authenticate, requireUser, validate } from "../middleware/auth.js";
import { Setting } from "../models/library.js";
import { settingPutSchema } from "../validation.js";

const router = Router();
router.use(authenticate, requireUser);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const settings = await Setting.find({ ownerId: req.user!.id });
    res.json({ settings });
  }),
);

router.get(
  "/:key",
  asyncHandler(async (req, res) => {
    const record = await Setting.findOne({
      ownerId: req.user!.id,
      key: req.params.key,
    });
    res.json({ setting: record });
  }),
);

router.put(
  "/:key",
  validate({ body: settingPutSchema }),
  asyncHandler(async (req, res) => {
    const { value } = req.body as { value: unknown };
    const record = await Setting.findOneAndUpdate(
      { ownerId: req.user!.id, key: req.params.key },
      { value },
      { upsert: true, new: true },
    );
    res.json({ setting: record });
  }),
);

router.delete(
  "/:key",
  asyncHandler(async (req, res) => {
    await Setting.deleteOne({ ownerId: req.user!.id, key: req.params.key });
    res.status(204).end();
  }),
);

export default router;
