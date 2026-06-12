import type { JobStatus, JobType } from "../enums";

export interface JobRecord {
  id: string;
  type: JobType;
  status: JobStatus;
  entityType: "tool" | "collection" | "system";
  entityId: string | null;
  payload: Record<string, unknown> | null;
  errorMessage: string | null;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}
