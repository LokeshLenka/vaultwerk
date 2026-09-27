import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export interface AccessClaims {
  sub: string;
  role: "user" | "admin";
}

export function signAccessToken(userId: string, role: "user" | "admin") {
  return jwt.sign({ sub: userId, role } satisfies AccessClaims, config.accessSecret, {
    expiresIn: config.accessTtlSeconds,
  });
}

export function verifyAccessToken(token: string): AccessClaims {
  const decoded = jwt.verify(token, config.accessSecret);
  if (typeof decoded === "string" || !decoded.sub) {
    throw new Error("Invalid access token");
  }
  return { sub: String(decoded.sub), role: decoded.role === "admin" ? "admin" : "user" };
}

/** Opaque refresh tokens (revocable, hashed at rest) — never JWTs. */
export function newRefreshToken(): string {
  return randomBytes(48).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** `vwk_` prefixed secrets for programmatic (extension/CLI) access. */
export function newApiKeySecret(): string {
  return `vwk_${randomBytes(32).toString("base64url")}`;
}
