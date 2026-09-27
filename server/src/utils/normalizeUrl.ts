/**
 * URL normalization — server-side twin of the client's
 * `src/lib/helpers/nomalize-url.ts`.
 *
 * The server owns canonicalization so duplicate detection can't be
 * bypassed by a client sending pre-normalized fields. Keep both copies
 * in sync; the shared vitest suite documents the contract.
 */
export function normalizeUrl(raw: string): {
  url: string;
  normalizedUrl: string;
  domain: string;
} {
  const input = raw.trim();
  const parsed = new URL(input);

  parsed.hash = "";
  parsed.hostname = parsed.hostname.toLowerCase();

  if (
    (parsed.protocol === "https:" && parsed.port === "443") ||
    (parsed.protocol === "http:" && parsed.port === "80")
  ) {
    parsed.port = "";
  }

  const trackingParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
    "source",
  ];

  for (const key of [...parsed.searchParams.keys()]) {
    if (trackingParams.includes(key)) {
      parsed.searchParams.delete(key);
    }
  }

  if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  const normalizedUrl = parsed.toString();
  const domain = parsed.hostname.replace(/^www\./, "");

  return { url: input, normalizedUrl, domain };
}
