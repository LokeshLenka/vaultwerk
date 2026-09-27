import { Router } from "express";
import { asyncHandler } from "../errors.js";
import { authenticate, requireUser, validate } from "../middleware/auth.js";
import { ApiKey } from "../models/core.js";
import { hashToken, newApiKeySecret } from "../auth/tokens.js";
import { apiKeyCreateSchema } from "../validation.js";

const router = Router();
router.use(authenticate, requireUser);

/**
 * Developer API keys — long-lived `vwk_` secrets for the planned browser
 * extension and CLI. The full secret is shown exactly once at creation;
 * only its hash and prefix are stored.
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const keys = await ApiKey.find({ ownerId: req.user!.id }).sort({
      createdAt: -1,
    });
    res.json({ apiKeys: keys });
  }),
);

router.post(
  "/",
  validate({ body: apiKeyCreateSchema }),
  asyncHandler(async (req, res) => {
    const { name, expiresInDays } = req.body as {
      name: string;
      expiresInDays?: string | null;
    };
    const secret = newApiKeySecret();
    const record = await ApiKey.create({
      userId: req.user!.id,
      name,
      keyHash: hashToken(secret),
      prefix: secret.slice(0, 12),
      expiresAt:
        typeof expiresInDays === "number"
          ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
          : null,
    });
    // The only response that ever contains the secret.
    res.status(201).json({ apiKey: record, secret });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await ApiKey.updateOne(
      { _id: req.params.id, ownerId: req.user!.id, revokedAt: null },
      { revokedAt: new Date() },
    );
    res.status(204).end();
  }),
);

export default router;
