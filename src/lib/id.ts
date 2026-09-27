import { v4 as uuidv4 } from "uuid";

/**
 * Generates a collision-resistant id for local records.
 *
 * Prefers `crypto.randomUUID()` (secure contexts) and falls back to
 * uuid v4 for non-secure contexts (plain-http origins, some webviews)
 * where `crypto.randomUUID` is undefined. Centralizing id creation here
 * keeps id generation testable and avoids scattered `crypto` assumptions
 * across services and seeders.
 */
export function createId(): string {
  const randomUUID = globalThis.crypto?.randomUUID;
  if (typeof randomUUID === "function") {
    try {
      return randomUUID.call(globalThis.crypto);
    } catch {
      return uuidv4();
    }
  }
  return uuidv4();
}
