/**
 * Lane contract checker.
 *
 *   npm run env:check                    # all lanes, from their .env files
 *   npm run env:check -- --lane preview  # one lane
 *   npm run env:check -- --env-only      # process.env only (CI, no secrets)
 *
 * Loads each lane's `.env.<lane>` file the same way the API server does, so
 * a green run means `npm run dev:api:preview` etc. will actually boot with a
 * valid Clerk instance and Mongo target. Secrets are never printed — only
 * whether they match the lane's expected prefix.
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnvFile } from "dotenv";
import {
  checkLane,
  LANES,
  type Lane,
} from "../server/src/env-check.js";

const argv = process.argv.slice(2);
const envOnly = argv.includes("--env-only");
const laneIdx = argv.indexOf("--lane");
const only = laneIdx === -1 ? undefined : argv[laneIdx + 1];

if (only && !LANES.includes(only as Lane)) {
  console.error(`Unknown lane: ${only}. Expected one of ${LANES.join(", ")}`);
  process.exit(2);
}

const lanes: Lane[] = only ? [only as Lane] : [...LANES];
// dotenv mutates process.env, so each lane must start from the same baseline
// or one lane's file would satisfy (or break) the next lane's check.
const baseline = { ...process.env };
let failed = 0;

for (const lane of lanes) {
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, baseline);

  // Same precedence as server/src/config.ts: shared `.env` first, then the
  // lane file overriding it.
  if (!envOnly) {
    const base = resolve(process.cwd(), ".env");
    if (existsSync(base)) loadEnvFile({ path: base });
    const laneFile = resolve(process.cwd(), `.env.${lane}`);
    if (existsSync(laneFile)) loadEnvFile({ path: laneFile, override: true });
  }

  const { problems } = checkLane(lane, process.env);
  if (problems.length === 0) {
    console.log(`✓ ${lane}`);
  } else {
    failed += 1;
    console.error(`✗ ${lane}`);
    for (const problem of problems) console.error(`    - ${problem}`);
  }
}

if (failed > 0) {
  console.error(
    `\n${failed}/${lanes.length} lane(s) invalid. See .env.example for the lane contract.`,
  );
  process.exit(1);
}
