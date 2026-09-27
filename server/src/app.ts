import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import { dbState } from "./db.js";
import { HttpError } from "./errors.js";
import adminRoutes from "./routes/admin.js";
import apiKeyRoutes from "./routes/apikeys.js";
import authRoutes from "./routes/auth.js";
import backupRoutes from "./routes/backup.js";
import collectionRoutes from "./routes/collections.js";
import jobRoutes from "./routes/jobs.js";
import settingRoutes from "./routes/settings.js";
import siteRoutes from "./routes/sites.js";
import toolRoutes from "./routes/tools.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.clientUrl,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  // Minimal request log (no morgan dependency).
  app.use((req: Request, res: Response, next: NextFunction) => {
    const started = Date.now();
    res.on("finish", () => {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - started}ms`,
      );
    });
    next();
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: "draft-7",
    message: { error: "Too many auth attempts — try again later" },
  });
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 600,
    standardHeaders: "draft-7",
    message: { error: "Rate limit exceeded — try again later" },
  });

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, db: dbState(), time: new Date().toISOString() });
  });

  app.use("/api/auth", authLimiter, authRoutes);
  app.use("/api/tools", apiLimiter, toolRoutes);
  app.use("/api/collections", apiLimiter, collectionRoutes);
  app.use("/api/sites", apiLimiter, siteRoutes);
  app.use("/api/settings", apiLimiter, settingRoutes);
  app.use("/api/jobs", apiLimiter, jobRoutes);
  app.use("/api/keys", apiLimiter, apiKeyRoutes);
  app.use("/api/backup", apiLimiter, backupRoutes);
  app.use("/api/admin", apiLimiter, adminRoutes);

  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Unknown API endpoint" });
  });

  // Central error handler: HttpError → status passthrough, Mongoose
  // validation/cast errors → 400, duplicate keys → 409, else 500.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
      res
        .status(err.status)
        .json({ error: err.message, ...(err.details ? { details: err.details } : {}) });
      return;
    }
    if (err instanceof Error) {
      const code = (err as Error & { code?: unknown }).code;
      if (code === 11000) {
        res.status(409).json({ error: "Duplicate value for a unique field" });
        return;
      }
      if (
        err.name === "ValidationError" ||
        err.name === "CastError" ||
        err.name === "ZodError"
      ) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.error("[api] unhandled error:", err);
    }
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
