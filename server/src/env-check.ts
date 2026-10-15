/**
 * Lane contract for the three deployment environments. Each lane pins a
 * Clerk instance and a Mongo target, and mixing them up is the failure mode
 * that leaks dev data into prod (or signs users against the wrong Clerk
 * instance), so the rules live in code and run in CI via `npm run env:check`.
 *
 *   local       Clerk **Development** instance (pk_test/sk_test) + local Mongo
 *   preview     Clerk **Development** instance (pk_test/sk_test) + Atlas preview
 *   production  Clerk **Production** instance (pk_live/sk_live) + Atlas prod
 */
export const LANES = ["local", "preview", "production"] as const;
export type Lane = (typeof LANES)[number];

type Expect = {
  /** Required keys — missing or blank is a failure. */
  required: (string | string[])[];
  /** Clerk secret key prefix the lane must use. */
  clerkSecretPrefix?: string;
  /** Clerk publishable key prefix the lane must use. */
  clerkPublishablePrefix?: string;
  /** Mongo URI must contain at least one of these fragments. */
  mongoContainsAny?: string[];
  /** Mongo URI must never contain any of these fragments. */
  mongoExcludes?: string[];
  /** Deployed origins must never contain any of these fragments. */
  urlsExcludes?: string[];
};

const CLERK_SECRET = "CLERK_SECRET_KEY";
/** The publishable key may arrive under either the server or the Vite name. */
const CLERK_PUBLISHABLE = [
  "CLERK_PUBLISHABLE_KEY",
  "VITE_CLERK_PUBLISHABLE_KEY",
];
/** Atlas connection strings point at <cluster>.mongodb.net. */
const ATLAS = "mongodb.net";

function pick(env: NodeJS.ProcessEnv, names: string[]): string | undefined {
  for (const name of names) {
    const value = env[name];
    if (value) return value;
  }
  return undefined;
}

const EXPECT: Record<Lane, Expect> = {
  local: {
    // Local Mongo is whatever the developer runs (localhost by default), so
    // only the Clerk instance is pinned here: Development, never live.
    required: ["MONGODB_URI", CLERK_SECRET, CLERK_PUBLISHABLE],
    clerkSecretPrefix: "sk_test_",
    clerkPublishablePrefix: "pk_test_",
  },
  preview: {
    required: [
      "MONGODB_URI",
      "CLIENT_URLS",
      "JWT_ACCESS_SECRET",
      "JWT_REFRESH_SECRET",
      CLERK_SECRET,
      CLERK_PUBLISHABLE,
    ],
    // Preview mirrors production hardening but never touches prod data, so
    // it stays on the Clerk Development instance and its own Atlas cluster.
    clerkSecretPrefix: "sk_test_",
    clerkPublishablePrefix: "pk_test_",
    mongoContainsAny: [ATLAS],
    mongoExcludes: ["cluster0"],
    urlsExcludes: ["localhost", "127.0.0.1"],
  },
  production: {
    required: [
      "MONGODB_URI",
      "CLIENT_URLS",
      "JWT_ACCESS_SECRET",
      "JWT_REFRESH_SECRET",
      CLERK_SECRET,
      CLERK_PUBLISHABLE,
    ],
    clerkSecretPrefix: "sk_live_",
    clerkPublishablePrefix: "pk_live_",
    mongoContainsAny: [ATLAS],
    mongoExcludes: ["127.0.0.1", "localhost", "preview"],
    urlsExcludes: ["localhost", "127.0.0.1"],
  },
};

/** Secrets that must never be committed or reused across lanes. */
const PLACEHOLDERS = [
  "change-me",
  "dev-access-secret",
  "dev-refresh-secret",
  "your-",
  "xxx",
];

/**
 * Scaffold values that must never reach a deploy: a leftover `TODO` ships a
 * CORS allow-list or a SPA pointed at nothing.
 */
const URL_PLACEHOLDERS = ["todo", "example.com", "changeme"];
/** Keys holding an origin or endpoint the browser will call. */
const URL_KEYS = ["CLIENT_URLS", "CLIENT_URL", "VITE_API_URL", "VITE_TELEMETRY_ENDPOINT"];

export type LaneReport = { lane: Lane; problems: string[] };

export function checkLane(lane: Lane, env: NodeJS.ProcessEnv): LaneReport {
  const problems: string[] = [];
  const expect = EXPECT[lane];

  for (const key of expect.required) {
    const names = Array.isArray(key) ? key : [key];
    if (!pick(env, names)?.trim()) {
      problems.push(`missing ${names.join(" or ")}`);
    }
  }

  const secret = pick(env, [CLERK_SECRET]);
  if (secret) {
    if (expect.clerkSecretPrefix && !secret.startsWith(expect.clerkSecretPrefix)) {
      problems.push(
        `CLERK_SECRET_KEY must start with ${expect.clerkSecretPrefix} on ${lane} (got ${redact(secret)})`,
      );
    }
  }

  const publishable = pick(env, CLERK_PUBLISHABLE);
  if (publishable) {
    if (
      expect.clerkPublishablePrefix &&
      !publishable.startsWith(expect.clerkPublishablePrefix)
    ) {
      problems.push(
        `CLERK_PUBLISHABLE_KEY must start with ${expect.clerkPublishablePrefix} on ${lane} (got ${redact(publishable)})`,
      );
    }
  }

  const mongo = env.MONGODB_URI;
  if (mongo) {
    const lower = mongo.toLowerCase();
    const wanted = expect.mongoContainsAny ?? [];
    if (wanted.length > 0 && !wanted.some((f) => lower.includes(f.toLowerCase()))) {
      problems.push(
        `MONGODB_URI on ${lane} must contain one of ${wanted.join(", ")}`,
      );
    }
    for (const fragment of expect.mongoExcludes ?? []) {
      if (lower.includes(fragment.toLowerCase())) {
        problems.push(`MONGODB_URI on ${lane} must not contain "${fragment}"`);
      }
    }
  }

  for (const name of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    const value = env[name];
    if (!value) continue;
    const lower = value.toLowerCase();
    if (PLACEHOLDERS.some((p) => lower.includes(p))) {
      problems.push(`${name} on ${lane} is still a placeholder`);
    } else if (lane !== "local" && value.length < 32) {
      problems.push(`${name} on ${lane} must be at least 32 characters`);
    }
  }

  // Origins: a leftover scaffold value silently breaks CORS or points the SPA
  // at nothing, which reads as "the deploy is just flaky".
  for (const name of URL_KEYS) {
    const value = env[name];
    if (!value) continue;
    const lower = value.toLowerCase();
    const hit = URL_PLACEHOLDERS.find((p) => lower.includes(p));
    if (hit) {
      problems.push(`${name} on ${lane} still contains the scaffold value "${hit}"`);
    }
    const local = (expect.urlsExcludes ?? []).find((f) =>
      lower.includes(f.toLowerCase()),
    );
    if (local) {
      problems.push(`${name} on ${lane} must not contain "${local}"`);
    }
  }

  return { lane, problems };
}

function redact(value: string): string {
  return `${value.slice(0, 8)}…`;
}
