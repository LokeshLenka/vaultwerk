import { apiFetch } from "../api/client";

/**
 * Database backup service — HTTP implementation.
 *
 * Exports stream from the API (works for accounts created on any device),
 * imports POST the file to the API where old ids are remapped, membership
 * is rewired, and site grouping is rebuilt server-side.
 */

export class BackupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BackupError";
  }
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** Downloads the account's full library as a timestamped JSON file. */
export async function exportBackup(): Promise<string> {
  const payload = await apiFetch<unknown>("/api/backup/export");
  const stamp = new Date().toISOString().slice(0, 10);
  const filename = `vaultwerk-backup-${stamp}.json`;
  downloadJson(filename, payload);
  return filename;
}

export interface ImportSummary {
  tools: number;
  collections: number;
  sites: number;
  settings: number;
  jobs: number;
}

/** Restores a v1 (IndexedDB) or v2 (API) backup file into this account. */
export async function importBackup(file: File): Promise<ImportSummary> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    throw new BackupError("Could not parse backup file as JSON.");
  }
  const body = parsed as { app?: string; tables?: unknown };
  if (body?.app !== "vaultwerk" || typeof body.tables !== "object") {
    throw new BackupError("Not a VaultWerk backup file.");
  }

  try {
    const { imported } = await apiFetch<{
      imported: { tools: number; collections: number; settings: number; jobs: number };
    }>("/api/backup/import", { method: "POST", body: parsed });
    return {
      tools: imported.tools,
      collections: imported.collections,
      sites: 0,
      settings: imported.settings,
      jobs: imported.jobs,
    };
  } catch (error) {
    throw new BackupError(
      error instanceof Error ? error.message : "Could not restore backup.",
    );
  }
}
