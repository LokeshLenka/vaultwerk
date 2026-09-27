import { useEffect, useState } from "react";

/**
 * Replaces Dexie's live queries. Mutating services call
 * `notifyDataChanged()` after writes; every `useDataVersion()` subscriber
 * re-fetches. Coarse-grained (whole-app refetch per write) but correct,
 * simple, and fine at VaultWerk's data scale.
 */

let version = 0;
const listeners = new Set<() => void>();

export function notifyDataChanged() {
  version += 1;
  for (const listener of listeners) listener();
}

/** Re-renders the caller on every data mutation. Returns a version stamp. */
export function useDataVersion(): number {
  const [current, setCurrent] = useState(version);
  useEffect(() => {
    const sync = () => setCurrent(version);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  return current;
}
