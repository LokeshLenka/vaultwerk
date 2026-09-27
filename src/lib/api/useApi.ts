import { useEffect, useState } from "react";
import { useDataVersion } from "@/lib/data/events";

/**
 * Fetches `fetcher()` on mount, on data mutations (see data/events), and
 * when `deps` change. Drop-in shape for the removed `useLiveQuery` calls:
 * `{ data, loading, error }` with a stable empty-array default available
 * via the `fallback` option.
 */
export function useApiList<T>(
  fetcher: () => Promise<T[]>,
  deps: unknown[] = [],
  fallback: T[] = [],
): { data: T[]; loading: boolean; error: string | null } {
  const version = useDataVersion();
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((rows) => {
        // State updates inside async continuations are fine; only
        // synchronous setState-in-effect is a cascading-render hazard.
        if (!cancelled) {
          setData(rows);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, ...deps]);

  return { data: data ?? fallback, loading: data === null, error };
}

/** Single-document variant for breadcrumb/detail lookups. */
export function useApiDoc<T>(
  fetcher: () => Promise<T | null | undefined>,
  deps: unknown[] = [],
): { data: T | undefined; loading: boolean } {
  const version = useDataVersion();
  const [data, setData] = useState<T | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((doc) => {
        if (!cancelled) {
          setData(doc ?? undefined);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, ...deps]);

  return { data, loading: !loaded };
}
