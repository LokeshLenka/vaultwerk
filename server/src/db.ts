import mongoose, { type Schema } from "mongoose";
import { config } from "./config.js";

/**
 * Serializes documents the way the VaultWerk client expects:
 * - `_id` → string `id` (the client never sees ObjectIds)
 * - `ownerId` ObjectId → string
 * - Dates → ISO strings (matches the previous IndexedDB record shapes,
 *   so frontend types stay untouched)
 * - drops `__v` and secrets handled per-model below
 */
export function withClientShape(schema: Schema) {
  schema.set("toJSON", {
    virtuals: false,
    versionKey: false,
    transform(_doc, ret: Record<string, unknown>) {
      const id = ret._id;
      ret.id =
        typeof id === "object" && id !== null && "toString" in id
          ? String(id)
          : id;
      delete ret._id;
      for (const [key, value] of Object.entries(ret)) {
        if (value instanceof Date) ret[key] = value.toISOString();
        else if (
          key === "ownerId" &&
          typeof value === "object" &&
          value !== null
        ) {
          ret[key] = String(value);
        }
      }
      return ret;
    },
  });
}

export async function connectDb(): Promise<void> {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongoUri);
}

export function dbState(): "connected" | "disconnected" {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
