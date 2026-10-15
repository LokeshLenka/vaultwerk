import { clerkClient, getAuth } from "@clerk/express";
import type { Request } from "express";
import { config } from "../config.js";
import { User } from "../models/core.js";
import type { AuthUser } from "../middleware/auth.js";

export function clerkEnabled(): boolean {
  return Boolean(config.clerkSecretKey);
}

/**
 * Resolves the local VaultWerk user for a Clerk-authenticated request.
 * First sight provisions: a legacy password account with the same email
 * is linked (no duplicate), otherwise a fresh user row is created with
 * no password hash — it can never log in via the password route.
 */
export async function userFromClerk(req: Request): Promise<AuthUser | null> {
  if (!clerkEnabled()) return null;

  let clerkUserId: string | null;
  try {
    clerkUserId = getAuth(req).userId;
  } catch {
    return null;
  }
  if (!clerkUserId) return null;

  const linked = await User.findOne({ clerkId: clerkUserId }).select("role");
  if (linked) {
    return { id: String(linked._id), role: linked.role };
  }

  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email =
    clerkUser.emailAddresses
      .find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress.toLowerCase() ??
    clerkUser.emailAddresses[0]?.emailAddress.toLowerCase();
  if (!email) return null;

  const fullName = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ");
  const name = (fullName || email.split("@")[0] || "VaultWerk user").slice(0, 80);

  const legacy = await User.findOne({ email });
  if (legacy) {
    legacy.clerkId = clerkUserId;
    if (!legacy.name) legacy.name = name;
    await legacy.save();
    return { id: String(legacy._id), role: legacy.role };
  }

  // First-ever account becomes admin so the instance is manageable.
  const isFirst = (await User.estimatedDocumentCount()) === 0;
  const created = await User.create({
    name,
    email,
    passwordHash: null,
    clerkId: clerkUserId,
    role: isFirst ? "admin" : "user",
  });
  return { id: String(created._id), role: created.role };
}
