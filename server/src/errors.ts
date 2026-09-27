import type { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

type AsyncRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

/** Wraps async routes so rejections reach the central error handler. */
export function asyncHandler(route: AsyncRoute) {
  return (req: Request, res: Response, next: NextFunction) => {
    void Promise.resolve(route(req, res, next)).catch(next);
  };
}

export const notFound = (resource = "Resource") =>
  new HttpError(404, `${resource} not found`);
export const forbidden = (message = "Forbidden") =>
  new HttpError(403, message);
