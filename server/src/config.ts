import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnvFile } from "dotenv";
import { checkLane, LANES, type Lane } from "./env-check.js";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// Deployment lane: local (laptop + local Mongo), preview (Atlas preview
// DB, prod-like settings), production. Preview runs with NODE_ENV=production
// on hosts (secure cookies, required secrets) but keeps demo seeding on.
const isProd = process.env.NODE_ENV === "production";

// Env files are lane-scoped: local → .env.local, preview → .env.preview,
// production → .env.production. `.env` loads first as shared defaults, then
// the lane file overrides it — so `npm run dev:api` picks up the local lane
// without needing an explicit --env-file, and hosts that inject real env
// vars keep them unless a lane file on disk says otherwise.
loadEnvFile({ path: resolve(process.cwd(), ".env") });
const appEnv = (process.env.APP_ENV ??
  (isProd ? "production" : "local")) as Lane;
if (!LANES.includes(appEnv)) {
  throw new Error(`Invalid APP_ENV: ${process.env.APP_ENV}`);
}
const laneFile = resolve(process.cwd(), `.env.${appEnv}`);
if (existsSync(laneFile)) loadEnvFile({ path: laneFile, override: true });

if (isProd) {
  for (const name of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    if (!process.env[name]) {
      throw new Error(`${name} must be set in production`);
    }
  }
}

// Lane contract guard: production refuses to boot on a broken contract (test
// Clerk keys against live data, a localhost Mongo URI, placeholder secrets).
// Preview only warns, so a demo deploy never hard-fails on a cosmetic gap.
const laneReport = checkLane(appEnv, process.env);
if (laneReport.problems.length > 0) {
  const detail = laneReport.problems.map((p) => `  - ${p}`).join("\n");
  if (appEnv === "production") {
    throw new Error(`Invalid production lane configuration:\n${detail}`);
  }
  console.warn(`[config] ${appEnv} lane warnings:\n${detail}`);
}

export const config = {
  env: appEnv,
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/vaultwerk"),
  // Single origin (legacy) or comma-separated allow-list for cloud deploys
  // where the SPA lives on Vercel / a custom domain, e.g.
  // CLIENT_URLS=https://vaultwerk.vercel.app,https://vaultwerk.example.com
  clientUrls: (process.env.CLIENT_URLS ?? process.env.CLIENT_URL ?? "http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  // Cross-site refresh cookie for the split deploy (SPA on Vercel,
  // API on Render/Fly): browsers only send third-party cookies with
  // SameSite=None + Secure. Single-origin local dev keeps Lax.
  cookieSameSite: (process.env.COOKIE_SAMESITE ??
    (process.env.NODE_ENV === "production" ? "none" : "lax")) as
    | "lax"
    | "strict"
    | "none",
  // Clerk cloud auth. When both keys are set, API requests bearing a
  // Clerk session token authenticate via Clerk; the legacy JWT + API-key
  // paths stay as a fallback (local dev, scripts, existing sessions).
  // The publishable key accepts the Vite name so one value serves both.
  clerkSecretKey: process.env.CLERK_SECRET_KEY ?? null,
  clerkPublishableKey:
    process.env.CLERK_PUBLISHABLE_KEY ??
    process.env.VITE_CLERK_PUBLISHABLE_KEY ??
    null,
  accessSecret: required("JWT_ACCESS_SECRET", "dev-access-secret"),
  refreshSecret: required("JWT_REFRESH_SECRET", "dev-refresh-secret"),
  accessTtlSeconds: 15 * 60,
  refreshTtlDays: 7,
  // Demo seeding stays on everywhere except production, where it needs an
  // explicit opt-in (preview mirrors production but keeps seeding on).
  allowSeed: appEnv !== "production" || process.env.ALLOW_SEED === "true",
  isProd,
};
