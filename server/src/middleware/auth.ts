import type { NextFunction, Request, Response } from "express";
import { Types, type HydratedDocument, type Model } from "mongoose";
import { z } from "zod";
import { ApiKey } from "../models/core.js";
import { hashToken, verifyAccessToken } from "../auth/tokens.js";
import { HttpError, forbidden, notFound } from "../errors.js";

export interface AuthUser {
  id: string;
  role: "user" | "admin";
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
      apiKeyId?: string;
    }
  }
}

function bearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim() || null;
}

/**
 * Authenticates via short-lived JWT **or** a long-lived `vwk_` API key.
 * Attaches `req.user`; API-key calls are scoped to the key owner exactly
 * like password sessions (ownership checks downstream don't care how
 * the user authenticated).
 */
export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const token = bearerToken(req);
  if (!token) {
    return next(new HttpError(401, "Authentication required"));
  }

  if (!token.startsWith("vwk_")) {
    try {
      const claims = verifyAccessToken(token);
      req.user = { id: claims.sub, role: claims.role };
      return next();
    } catch {
      return next(new HttpError(401, "Invalid or expired access token"));
    }
  }

  const record = await ApiKey.findOne({ keyHash: hashToken(token) }).select(
    "+keyHash userId revokedAt expiresAt",
  );
  if (
    !record ||
    record.revokedAt ||
    (record.expiresAt && record.expiresAt < new Date())
  ) {
    return next(new HttpError(401, "Invalid or revoked API key"));
  }
  const user = await userRoleOf(String(record.userId));
  req.user = { id: String(record.userId), role: user };
  req.apiKeyId = String(record._id);
  // Fire-and-forget usage stamp; never fail a request over telemetry.
  void ApiKey.updateOne(
    { _id: record._id },
    { lastUsedAt: new Date() },
  ).exec();
  return next();
}

async function userRoleOf(userId: string): Promise<"user" | "admin"> {
  const { User } = await import("../models/core.js");
  const user = await User.findById(userId).select("role");
  return user?.role === "admin" ? "admin" : "user";
}

export function requireUser(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(new HttpError(401, "Authentication required"));
  return next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(new HttpError(401, "Authentication required"));
  if (req.user.role !== "admin") return next(forbidden("Admin role required"));
  return next();
}

interface OwnedDoc {
  ownerId: Types.ObjectId;
}

/**
 * Loads `:id` and enforces ownership: the owner or an admin may proceed,
 * everyone else gets 404 (not 403 — resource existence is not leaked).
 * Malformed ids are 404s too.
 */
export function owned<T extends OwnedDoc>(
  model: Model<T>,
  resource = "Resource",
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (typeof id !== "string") return next(notFound(resource));
    if (!Types.ObjectId.isValid(id)) return next(notFound(resource));
    const doc = await model.findById(id);
    if (!doc) return next(notFound(resource));
    if (req.user?.role !== "admin" && String(doc.ownerId) !== req.user?.id) {
      return next(notFound(resource));
    }
    (req as Request & { doc: HydratedDocument<T> }).doc = doc;
    return next();
  };
}

export function docOf<T>(req: Request): HydratedDocument<T> {
  return (req as Request & { doc: HydratedDocument<T> }).doc;
}

type Schemas = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
};

/** Zod-validates body/query/params; 400s carry field-level details. */
export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) {
        Object.assign(
          req.query,
          (schemas.query as z.ZodTypeAny).parse(req.query),
        );
      }
      if (schemas.params) {
        Object.assign(req.params, schemas.params.parse(req.params));
      }
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(
          new HttpError(400, "Invalid request", error.flatten().fieldErrors),
        );
      }
      return next(error);
    }
  };
}
