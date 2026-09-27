import { createApp } from "./app.js";
import { config } from "./config.js";
import { connectDb, dbState } from "./db.js";

async function main() {
  try {
    await connectDb();
    console.log(`[api] MongoDB connected (${dbState()})`);
  } catch (error) {
    // Boot anyway so /api/health can report db: disconnected;
    // data routes will fail fast until Mongo is reachable.
    console.error("[api] MongoDB connection failed:", error);
  }

  const app = createApp();
  app.listen(config.port, () => {
    console.log(`[api] VaultWerk API listening on :${config.port}`);
  });
}

process.on("unhandledRejection", (reason) => {
  console.error("[api] unhandled rejection:", reason);
  process.exit(1);
});

void main();
