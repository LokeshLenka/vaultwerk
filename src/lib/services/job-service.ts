import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";
import type { JobType } from "../enums";
import type { JobRecord } from "../types/job";

export async function enqueueJob(input: {
  id: string;
  type: JobType;
  entityType: "tool" | "collection" | "system";
  entityId?: string | null;
  payload?: Record<string, unknown> | null;
}): Promise<JobRecord> {
  const { job } = await apiFetch<{ job: JobRecord }>("/api/jobs", {
    method: "POST",
    body: {
      type: input.type,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      payload: input.payload ?? null,
    },
  });
  notifyDataChanged();
  return job;
}

export async function getJobById(id: string): Promise<JobRecord | undefined> {
  try {
    const { job } = await apiFetch<{ job: JobRecord }>(
      `/api/jobs/${encodeURIComponent(id)}`,
    );
    return job;
  } catch {
    return undefined;
  }
}

export async function listJobs(): Promise<JobRecord[]> {
  const { jobs } = await apiFetch<{ jobs: JobRecord[] }>("/api/jobs");
  return jobs;
}

export async function listQueuedJobs(): Promise<JobRecord[]> {
  const { jobs } = await apiFetch<{ jobs: JobRecord[] }>(
    "/api/jobs?status=queued",
  );
  return jobs;
}

export async function markJobRunning(
  id: string,
): Promise<JobRecord | null> {
  return updateJob(id, { status: "running" });
}

export async function markJobDone(id: string): Promise<JobRecord | null> {
  return updateJob(id, { status: "done", errorMessage: null });
}

export async function markJobFailed(
  id: string,
  errorMessage: string,
): Promise<JobRecord | null> {
  const current = await getJobById(id);
  if (!current) return null;
  return updateJob(id, {
    status: "failed",
    errorMessage,
    attempts: current.attempts + 1,
  });
}

export async function retryJob(id: string): Promise<JobRecord | null> {
  return updateJob(id, { status: "queued", errorMessage: null });
}

export async function deleteJob(id: string): Promise<void> {
  await apiFetch(`/api/jobs/${encodeURIComponent(id)}`, { method: "DELETE" });
  notifyDataChanged();
}

export async function clearFinishedJobs(): Promise<void> {
  await apiFetch("/api/jobs", { method: "DELETE" });
  notifyDataChanged();
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<JobRecord, "id" | "createdAt">>,
): Promise<JobRecord | null> {
  try {
    const { job } = await apiFetch<{ job: JobRecord }>(
      `/api/jobs/${encodeURIComponent(id)}`,
      { method: "PATCH", body: updates },
    );
    notifyDataChanged();
    return job;
  } catch {
    return null;
  }
}
