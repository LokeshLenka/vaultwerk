import { useEffect, useState } from "react";
import {
  fetchPageMetadata,
  type PageMetadata,
} from "@/lib/services/metadata-service";

type MetadataState = {
  metadata: (PageMetadata & { url: string }) | null;
  isFetching: boolean;
};

const IDLE_STATE: MetadataState = { metadata: null, isFetching: false };

/**
 * Debounced page-preview probe for the add-tool form. Fires ~600ms after the
 * user stops typing a URL (slightly after the 400ms duplicate check, so a
 * duplicate never triggers a wasted page fetch).
 *
 * `enabled` should be false in edit mode — existing tools keep their data.
 * Late responses are discarded via the effect cleanup flag; failures
 * resolve to null so the form simply stays manual.
 */
export function useUrlMetadata(url: string, enabled: boolean) {
  const [state, setState] = useState<MetadataState>(IDLE_STATE);
  const trimmed = url.trim();

  useEffect(() => {
    if (!enabled || !trimmed) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        new URL(trimmed);
      } catch {
        if (!cancelled) setState(IDLE_STATE);
        return;
      }
      if (trimmed === "https://" || trimmed === "http://") {
        if (!cancelled) setState(IDLE_STATE);
        return;
      }

      setState((prev) => ({ ...prev, isFetching: true }));
      const result = await fetchPageMetadata(trimmed);
      if (cancelled) return;
      setState({
        metadata: result
          ? { ...result.metadata, url: result.url }
          : null,
        isFetching: false,
      });
    }, 600);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, enabled]);

  // Disabled/empty input short-circuits to idle at render time without
  // touching state (same pattern as useUrlDuplicateCheck): an empty field
  // has no preview, and there is nothing to fetch. Placed after all hooks
  // so hook order stays stable.
  if (!enabled || !trimmed) {
    return IDLE_STATE;
  }

  return state;
}
