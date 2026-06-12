import type { JobType } from "../enums";
import type { JobRecord } from "../types/job";

export function createJobRecord(input: {
  id: string;
  type: JobType;
  entityType: "tool" | "collection" | "system";
  entityId?: string | null;
  payload?: Record<string, unknown> | null;
}): JobRecord {
  const now = new Date().toISOString();

  return {
    id: input.id,
    type: input.type,
    status: "queued",
    entityType: input.entityType,
    entityId: input.entityId ?? null,
    payload: input.payload ?? null,
    errorMessage: null,
    attempts: 0,
    createdAt: now,
    updatedAt: now,
  };
}
