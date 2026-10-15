import { describe, expect, it } from "vitest";
import { checkLane, type Lane } from "./env-check.js";

/**
 * The lane contract is the guard that keeps Clerk instances and Mongo
 * clusters from crossing lanes, so the guard itself needs tests: each lane
 * accepts a correct config and rejects the ways lanes get mixed up.
 */
const VALID: Record<Lane, NodeJS.ProcessEnv> = {
  local: {
    MONGODB_URI: "mongodb://127.0.0.1:27017/vaultwerk",
    CLERK_SECRET_KEY: "sk_test_abc",
    VITE_CLERK_PUBLISHABLE_KEY: "pk_test_abc",
  },
  preview: {
    MONGODB_URI: "mongodb+srv://u:p@preview.abc.mongodb.net/vaultwerk",
    CLIENT_URLS: "https://preview.vaultwerk.app",
    JWT_ACCESS_SECRET: "a".repeat(48),
    JWT_REFRESH_SECRET: "b".repeat(48),
    CLERK_SECRET_KEY: "sk_test_abc",
    VITE_CLERK_PUBLISHABLE_KEY: "pk_test_abc",
  },
  production: {
    MONGODB_URI: "mongodb+srv://u:p@prod.abc.mongodb.net/vaultwerk",
    CLIENT_URLS: "https://vaultwerk.app",
    JWT_ACCESS_SECRET: "a".repeat(48),
    JWT_REFRESH_SECRET: "b".repeat(48),
    CLERK_SECRET_KEY: "sk_live_abc",
    VITE_CLERK_PUBLISHABLE_KEY: "pk_live_abc",
  },
};

const clone = (lane: Lane, patch: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv => ({
  ...VALID[lane],
  ...patch,
});

describe("checkLane", () => {
  it("accepts a valid config for every lane", () => {
    for (const lane of ["local", "preview", "production"] as Lane[]) {
      expect(checkLane(lane, VALID[lane]).problems).toEqual([]);
    }
  });

  it("accepts the publishable key under either name", () => {
    const env = clone("local");
    delete env.VITE_CLERK_PUBLISHABLE_KEY;
    env.CLERK_PUBLISHABLE_KEY = "pk_test_abc";
    expect(checkLane("local", env).problems).toEqual([]);
  });

  it("rejects live Clerk keys on the local lane", () => {
    const { problems } = checkLane(
      "local",
      clone("local", {
        CLERK_SECRET_KEY: "sk_live_abc",
        VITE_CLERK_PUBLISHABLE_KEY: "pk_live_abc",
      }),
    );
    expect(problems.join(" ")).toContain("sk_test_");
    expect(problems.join(" ")).toContain("pk_test_");
  });

  it("rejects test Clerk keys on the production lane", () => {
    const { problems } = checkLane(
      "production",
      clone("production", {
        CLERK_SECRET_KEY: "sk_test_abc",
        VITE_CLERK_PUBLISHABLE_KEY: "pk_test_abc",
      }),
    );
    expect(problems).toHaveLength(2);
  });

  it("rejects test Clerk keys on the preview lane", () => {
    const { problems } = checkLane("preview", clone("preview", {
      CLERK_SECRET_KEY: "sk_live_abc",
      VITE_CLERK_PUBLISHABLE_KEY: "pk_live_abc",
    }));
    expect(problems).toHaveLength(2);
  });

  it("rejects a localhost Mongo URI on the production lane", () => {
    const { problems } = checkLane(
      "production",
      clone("production", {
        MONGODB_URI: "mongodb://127.0.0.1:27017/vaultwerk",
      }),
    );
    expect(problems.join(" ")).toContain("127.0.0.1");
  });

  it("rejects the preview cluster on the production lane", () => {
    const { problems } = checkLane(
      "production",
      clone("production", {
        MONGODB_URI: "mongodb+srv://u:p@preview.abc.mongodb.net/vaultwerk",
      }),
    );
    expect(problems.join(" ")).toContain("preview");
  });

  it("rejects the default dev JWT secrets outside local", () => {
    for (const lane of ["preview", "production"] as Lane[]) {
      const { problems } = checkLane(
        lane,
        clone(lane, {
          JWT_ACCESS_SECRET: "dev-access-secret",
          JWT_REFRESH_SECRET: "dev-refresh-secret",
        }),
      );
      expect(problems.join(" ")).toContain("placeholder");
    }
  });

  it("rejects short JWT secrets outside local", () => {
    const { problems } = checkLane(
      "production",
      clone("production", { JWT_ACCESS_SECRET: "too-short" }),
    );
    expect(problems.join(" ")).toContain("32 characters");
  });

  it("reports every missing key a host lane needs", () => {
    const { problems } = checkLane("production", {});
    expect(problems).toHaveLength(6);
  });

  it("allows any Mongo target on the local lane", () => {
    const { problems } = checkLane(
      "local",
      clone("local", {
        MONGODB_URI: "mongodb+srv://u:p@devbox.abc.mongodb.net/vaultwerk",
      }),
    );
    expect(problems).toEqual([]);
  });

  it("allows a localhost origin on the local lane only", () => {
    expect(
      checkLane("local", clone("local", { CLIENT_URL: "http://localhost:5173" }))
        .problems,
    ).toEqual([]);
    for (const lane of ["preview", "production"] as Lane[]) {
      const { problems } = checkLane(
        lane,
        clone(lane, { CLIENT_URLS: "http://localhost:5173" }),
      );
      expect(problems.join(" ")).toContain("localhost");
    }
  });

  it("rejects a leftover scaffold origin", () => {
    const { problems } = checkLane(
      "production",
      clone("production", { CLIENT_URLS: "https://TODO.vaultwerk.app" }),
    );
    expect(problems.join(" ")).toContain("scaffold");
  });

  it("rejects an unfilled VITE_API_URL", () => {
    const { problems } = checkLane(
      "preview",
      clone("preview", { VITE_API_URL: "https://TODO-api-host" }),
    );
    expect(problems.join(" ")).toContain("VITE_API_URL");
  });
});
