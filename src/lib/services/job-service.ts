import { db} from "../db";
import type { JobType } from "../enums";
import { createJobRecord } from "../factories/JobFactory";
import type { JobRecord } from "../types/job";

export async function enqueueJob(input: {
  id: string;
  type: JobType;
  entityType: "tool" | "collection" | "system";
  entityId?: string | null;
  payload?: Record<string, unknown> | null;
}) {
  const record = createJobRecord(input);
  await db.jobs.add(record);
  return record;
}

export async function getJobById(id: string) {
  return db.jobs.get(id);
}

export async function listJobs() {
  return db.jobs.orderBy("createdAt").reverse().toArray();
}

export async function listQueuedJobs() {
  return db.jobs.where("status").equals("queued").toArray();
}

export async function markJobRunning(id: string) {
  return updateJob(id, {
    status: "running",
  });
}

export async function markJobDone(id: string) {
  return updateJob(id, {
    status: "done",
    errorMessage: null,
  });
}

export async function markJobFailed(id: string, errorMessage: string) {
  const current = await db.jobs.get(id);
  if (!current) return null;

  const next: JobRecord = {
    ...current,
    status: "failed",
    errorMessage,
    attempts: current.attempts + 1,
    updatedAt: new Date().toISOString(),
  };

  await db.jobs.put(next);
  return next;
}

export async function retryJob(id: string) {
  const current = await db.jobs.get(id);
  if (!current) return null;

  const next: JobRecord = {
    ...current,
    status: "queued",
    errorMessage: null,
    updatedAt: new Date().toISOString(),
  };

  await db.jobs.put(next);
  return next;
}

export async function deleteJob(id: string) {
  await db.jobs.delete(id);
}

export async function clearFinishedJobs() {
  const finished = await db.jobs
    .filter((job) => job.status === "done" || job.status === "failed")
    .toArray();

  await db.jobs.bulkDelete(finished.map((job) => job.id));
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<JobRecord, "id" | "createdAt">>,
) {
  const current = await db.jobs.get(id);
  if (!current) return null;

  const next: JobRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await db.jobs.put(next);
  return next;
}
