// hooks/useUrlDuplicateCheck.ts
import { normalizeUrl } from "@/lib/helpers/nomalize-url";
import { findToolByNormalizedUrl } from "@/lib/queries/tools/queries";
import { useEffect, useState } from "react";

export function useUrlDuplicateCheck(url: string, currentToolId?: string) {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [duplicateName, setDuplicateName] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!url) {
      setIsDuplicate(false);
      setDuplicateName(null);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        // Bail early if URL is not parseable yet
        new URL(url);
      } catch {
        setIsDuplicate(false);
        setDuplicateName(null);
        return;
      }

      setIsChecking(true);
      try {
        const { normalizedUrl } = normalizeUrl(url);
        const existing = await findToolByNormalizedUrl(normalizedUrl);

        if (!cancelled) {
          // Ignore match if it's the same tool being edited
          if (existing && existing.id !== currentToolId) {
            setIsDuplicate(true);
            setDuplicateName(existing.name);
          } else {
            setIsDuplicate(false);
            setDuplicateName(null);
          }
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }, 400); // 400ms debounce

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [url, currentToolId]);

  return { isDuplicate, duplicateName, isChecking };
}
