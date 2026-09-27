import { apiFetch } from "../api/client";
import { notifyDataChanged } from "../data/events";
import type { SettingRecord } from "../types/setting";

export async function setSetting<T>(key: string, value: T) {
  const { setting } = await apiFetch<{ setting: SettingRecord<T> }>(
    `/api/settings/${encodeURIComponent(key)}`,
    { method: "PUT", body: { value } },
  );
  notifyDataChanged();
  return setting;
}

export async function getSetting<T>(key: string): Promise<T | null> {
  try {
    const { setting } = await apiFetch<{ setting: SettingRecord<T> | null }>(
      `/api/settings/${encodeURIComponent(key)}`,
    );
    return (setting?.value as T | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getSettingRecord<T>(key: string) {
  try {
    const { setting } = await apiFetch<{ setting: SettingRecord<T> | null }>(
      `/api/settings/${encodeURIComponent(key)}`,
    );
    return setting;
  } catch {
    return undefined;
  }
}

export async function removeSetting(key: string): Promise<void> {
  await apiFetch(`/api/settings/${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  notifyDataChanged();
}

export async function listSettings(): Promise<SettingRecord[]> {
  const { settings } = await apiFetch<{ settings: SettingRecord[] }>(
    "/api/settings",
  );
  return settings;
}

/* Optional app-specific helpers */

export async function setTheme(theme: "light" | "dark" | "system") {
  return setSetting("theme", theme);
}

export async function getTheme() {
  return getSetting<"light" | "dark" | "system">("theme");
}

export async function setApiKey(provider: string, apiKey: string | null) {
  return setSetting(`api-key:${provider}`, apiKey);
}

export async function getApiKey(provider: string) {
  return getSetting<string | null>(`api-key:${provider}`);
}
