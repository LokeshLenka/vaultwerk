// hooks/useUrlDuplicateCheck.ts
import { normalizeUrl } from "@/lib/helpers/nomalize-url";
import { findToolByNormalizedUrl } from "@/lib/queries/tools/queries";
import { useEffect, useState } from "react";

interface DuplicateCheckState {
  isDuplicate: boolean;
  duplicateName: string | null;
  isChecking: boolean;
}

const IDLE_STATE: DuplicateCheckState = {
  isDuplicate: false,
  duplicateName: null,
  isChecking: false,
};

export function useUrlDuplicateCheck(url: string, currentToolId?: string) {
  const [state, setState] = useState<DuplicateCheckState>(IDLE_STATE);
  const trimmed = url.trim();

  useEffect(() => {
    if (!trimmed) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        // Bail early if URL is not parseable yet
        new URL(trimmed);
      } catch {
        if (!cancelled) setState(IDLE_STATE);
        return;
      }

      setState((prev) => ({ ...prev, isChecking: true }));
      try {
        const { normalizedUrl } = normalizeUrl(trimmed);
        const existing = await findToolByNormalizedUrl(normalizedUrl);

        if (!cancelled) {
          // Ignore match if it's the same tool being edited
          if (existing && existing.id !== currentToolId) {
            setState({
              isDuplicate: true,
              duplicateName: existing.name,
              isChecking: false,
            });
          } else {
            setState(IDLE_STATE);
          }
        }
      } finally {
        if (!cancelled) {
          setState((prev) => ({ ...prev, isChecking: false }));
        }
      }
    }, 400); // 400ms debounce

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, currentToolId]);

  // Empty input short-circuits to idle without touching state: an empty
  // field is never a duplicate, and there is nothing to check. Placed after
  // all hooks so hook order stays stable.
  if (!trimmed) {
    return IDLE_STATE;
  }

  return state;
}
