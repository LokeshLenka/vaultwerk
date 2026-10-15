/**
 * CLI demo seeder: `npm run server:seed -- --email you@example.com [--count 25] [--clear]`.
 * Bulk-inserts curated tools + tag-matched collections for one account.
 */
import { connectDb } from "../db.js";
import { config } from "../config.js";
import { Collection, Tool } from "../models/library.js";
import { User } from "../models/core.js";
import { syncAllSites } from "../services/siteSync.js";
import { seedDemoLibrary } from "./demo.js";
import mongoose from "mongoose";

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx === -1 ? undefined : process.argv[idx + 1];
}

async function main() {
  const email = arg("email");
  if (!email) {
    console.error("Usage: server:seed -- --email you@example.com [--count 25] [--clear]");
    process.exit(1);
  }
  const count = Number(arg("count") ?? 25);
  const clear = process.argv.includes("--clear");

  if (!config.allowSeed) {
    console.error("Refusing: ALLOW_SEED is false in production.");
    process.exit(1);
  }

  await connectDb();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.error(`No account found for ${email}`);
    process.exit(1);
  }
  const ownerId = String(user._id);

  if (clear) {
    await Promise.all([
      Tool.deleteMany({ ownerId }),
      Collection.deleteMany({ ownerId }),
    ]);
    await syncAllSites(ownerId);
  }

  const summary = await seedDemoLibrary(ownerId, { count });
  console.log(`[seed] ${email}:`, summary);
  await mongoose.disconnect();
}

void main().catch(async (error) => {
  console.error("[seed] failed:", error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
