import { Schema, model, type Types } from "mongoose";
import { withClientShape } from "../db.js";

export type Role = "user" | "admin";

export interface UserDoc {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);
// Single transform: shared client shape (id mapping, ISO dates) plus
// credential stripping. Kept in one place because schema.set("toJSON")
// replaces rather than merges option objects.
userSchema.set("toJSON", {
  virtuals: false,
  versionKey: false,
  // Untyped params: Mongoose's transform signature varies per schema type;
  // unknown params keep this assignable while the body stays explicit.
  transform(_doc: unknown, ret: unknown) {
    const out = ret as Record<string, unknown>;
    const id = out._id;
    out.id =
      typeof id === "object" && id !== null && "toString" in id
        ? String(id)
        : id;
    delete out._id;
    delete out.passwordHash;
    for (const [key, value] of Object.entries(out)) {
      if (value instanceof Date) out[key] = value.toISOString();
    }
    return out;
  },
});
export const User = model<UserDoc>("User", userSchema);

export interface RefreshTokenDoc {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
// TTL: expired rows vanish without a sweeper.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
withClientShape(refreshTokenSchema);
export const RefreshToken = model<RefreshTokenDoc>(
  "RefreshToken",
  refreshTokenSchema,
);

export interface ApiKeyDoc {
  userId: Types.ObjectId;
  name: string;
  keyHash: string;
  prefix: string;
  lastUsedAt: Date | null;
  expiresAt: Date | null;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const apiKeySchema = new Schema<ApiKeyDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    keyHash: { type: String, required: true, unique: true, select: false },
    prefix: { type: String, required: true },
    lastUsedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
withClientShape(apiKeySchema);
export const ApiKey = model<ApiKeyDoc>("ApiKey", apiKeySchema);
