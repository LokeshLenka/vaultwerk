import type { SettingRecord } from "../types/setting";

export function createSettingRecord<T>(
  key: string,
  value: T,
): SettingRecord<T> {
  return {
    key,
    value,
    updatedAt: new Date().toISOString(),
  };
}
