import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  for (const name of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    if (!process.env[name]) {
      throw new Error(`${name} must be set in production`);
    }
  }
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/vaultwerk"),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  accessSecret: required("JWT_ACCESS_SECRET", "dev-access-secret"),
  refreshSecret: required("JWT_REFRESH_SECRET", "dev-refresh-secret"),
  accessTtlSeconds: 15 * 60,
  refreshTtlDays: 7,
  allowSeed: process.env.ALLOW_SEED === "true" || !isProd,
  isProd,
};
