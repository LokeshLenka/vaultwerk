import { Router } from "express";
import { HttpError, asyncHandler } from "../errors.js";
import {
  authenticate,
  requireAdmin,
  validate,
} from "../middleware/auth.js";
import { User } from "../models/core.js";
import { adminRoleSchema } from "../validation.js";

const router = Router();
router.use(authenticate, requireAdmin);

/** Minimal admin surface: user list + role management. */
router.get(
  "/users",
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).limit(200);
    res.json({ users });
  }),
);

router.patch(
  "/users/:id/role",
  validate({ body: adminRoleSchema }),
  asyncHandler(async (req, res) => {
    const { role } = req.body as { role: "user" | "admin" };
    const user = await User.findById(req.params.id);
    if (!user) throw new HttpError(404, "User not found");
    // Never lock yourself out of the last admin seat.
    if (user.role === "admin" && role !== "admin") {
      const admins = await User.countDocuments({ role: "admin" });
      if (admins <= 1) {
        throw new HttpError(409, "Cannot demote the last admin");
      }
    }
    user.role = role;
    await user.save();
    res.json({ user });
  }),
);

export default router;
