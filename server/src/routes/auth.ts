import bcrypt from "bcryptjs";
import { Router } from "express";
import { config } from "../config.js";
import { HttpError, asyncHandler } from "../errors.js";
import { authenticate, requireUser, validate } from "../middleware/auth.js";
import { User, RefreshToken, type Role } from "../models/core.js";
import {
  hashToken,
  newRefreshToken,
  signAccessToken,
} from "../auth/tokens.js";
import { loginSchema, registerSchema } from "../validation.js";

const router = Router();

const REFRESH_COOKIE = "vw_refresh";
const refreshCookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: "lax" as const,
  path: "/api/auth",
  maxAge: config.refreshTtlDays * 24 * 60 * 60 * 1000,
};

function publicUser(user: {
  _id: unknown;
  name: string;
  email: string;
  role: Role;
}) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function issueSession(userId: string) {
  const token = newRefreshToken();
  const expiresAt = new Date(
    Date.now() + config.refreshTtlDays * 24 * 60 * 60 * 1000,
  );
  await RefreshToken.create({ userId, tokenHash: hashToken(token), expiresAt });
  return { token, expiresAt };
}

router.post(
  "/register",
  validate({ body: registerSchema }),
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const existing = await User.findOne({ email });
    if (existing) throw new HttpError(409, "An account with this email exists");

    const passwordHash = await bcrypt.hash(password, 10);
    // First-ever account becomes admin so the instance is manageable.
    const isFirst = (await User.estimatedDocumentCount()) === 0;
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: isFirst ? "admin" : "user",
    });

    const accessToken = signAccessToken(String(user._id), user.role);
    const { token } = await issueSession(String(user._id));
    res.cookie(REFRESH_COOKIE, token, refreshCookieOptions);
    res.status(201).json({ user: publicUser(user), accessToken });
  }),
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email }).select("+passwordHash");
    const valid = user && (await bcrypt.compare(password, user.passwordHash));
    if (!user || !valid) {
      throw new HttpError(401, "Invalid email or password");
    }
    const accessToken = signAccessToken(String(user._id), user.role);
    const { token } = await issueSession(String(user._id));
    res.cookie(REFRESH_COOKIE, token, refreshCookieOptions);
    res.json({ user: publicUser(user), accessToken });
  }),
);

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const presented = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    if (!presented) throw new HttpError(401, "No refresh token");

    const record = await RefreshToken.findOne({ tokenHash: hashToken(presented) });
    // Reuse of a rotated/revoked token signals theft: kill every session.
    if (!record) throw new HttpError(401, "Invalid refresh token");
    if (record.revokedAt || record.expiresAt < new Date()) {
      await RefreshToken.updateMany(
        { userId: record.userId, revokedAt: null },
        { revokedAt: new Date() },
      );
      throw new HttpError(401, "Session expired — please sign in again");
    }

    record.revokedAt = new Date();
    await record.save();
    const { token } = await issueSession(String(record.userId));
    const user = await User.findById(record.userId);
    if (!user) throw new HttpError(401, "Account no longer exists");
    res.cookie(REFRESH_COOKIE, token, refreshCookieOptions);
    res.json({ accessToken: signAccessToken(String(user._id), user.role) });
  }),
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const presented = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    if (presented) {
      await RefreshToken.updateOne(
        { tokenHash: hashToken(presented), revokedAt: null },
        { revokedAt: new Date() },
      );
    }
    res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
    res.status(204).end();
  }),
);

router.get(
  "/me",
  authenticate,
  requireUser,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user!.id);
    if (!user) throw new HttpError(401, "Account no longer exists");
    res.json({ user: publicUser(user) });
  }),
);

export default router;
