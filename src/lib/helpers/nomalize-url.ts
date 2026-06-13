/* ---------------------------------- */
/* URL normalization                  */
/* ---------------------------------- */

/**
 * Normalizes a raw URL into a canonical form for storage and duplicate detection.
 *
 * Returns three values:
 * - `url`: the original trimmed input as provided by the user
 * - `normalizedUrl`: a cleaned, canonical URL used for comparisons and deduplication
 * - `domain`: a simplified hostname used for display and grouping
 *
 * Normalization rules:
 * - trims surrounding whitespace
 * - removes URL hash fragments
 * - lowercases the hostname
 * - removes default ports (`:443` for HTTPS, `:80` for HTTP)
 * - removes common tracking parameters such as UTM tags
 * - removes a trailing slash from the pathname, except for the root path
 * - strips `www.` from the hostname when deriving `domain`
 *
 * Example:
 * Input:
 * `https://www.Example.com/docs/?utm_source=twitter#intro`
 *
 * Output:
 * {
 *   url: "https://www.Example.com/docs/?utm_source=twitter#intro",
 *   normalizedUrl: "https://www.example.com/docs",
 *   domain: "example.com"
 * }
 *
 * Note:
 * This function expects a valid absolute URL. `new URL(input)` will throw
 * if the input is malformed or missing a protocol.
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

  return {
    url: input,
    normalizedUrl,
    domain,
  };
}
