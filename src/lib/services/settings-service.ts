import { db } from "../db";
import { createSettingRecord } from "../factories/SettingFactory";

export async function setSetting<T>(key: string, value: T) {
  const record = createSettingRecord(key, value);
  await db.settings.put(record);
  return record;
}

export async function getSetting<T>(key: string) {
  const record = await db.settings.get(key);
  return (record?.value as T | undefined) ?? null;
}

export async function getSettingRecord<T>(key: string) {
  return db.settings.get(key) as Promise<
    | {
        key: string;
        value: T;
        updatedAt: string;
      }
    | undefined
  >;
}

export async function removeSetting(key: string) {
  await db.settings.delete(key);
}

export async function listSettings() {
  return db.settings.toArray();
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
