/**
 * Page metadata extraction — fetches a public web page server-side (so the
 * browser never fights CORS) and pulls title, description, and favicon out
 * of its <head>. Used by the "paste a URL, we fill the form" flow.
 *
 * Zero dependencies: parsing is regex over the head section, which is where
 * title/meta/link tags always live. Bodies are truncated before parsing.
 */

import { suggestCategory, suggestTags } from "./suggest.js";

export type PageMetadata = {
  title: string | null;
  description: string | null;
  /** Absolute http(s) favicon URL, falling back to the Google favicon service. */
  faviconUrl: string;
  siteName: string | null;
  /** Rule-based category guess; null means "no confident suggestion". */
  suggestedCategory: string | null;
  /** Topical keyword tags, most relevant first. */
  suggestedTags: string[];
};

const FETCH_TIMEOUT_MS = 8000;
const MAX_BODY_BYTES = 2_000_000;
const PARSE_SLICE_BYTES = 512_000;

function googleFavicon(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

/** Reject targets that point at the server itself or the local network. */
function hostIsBlocked(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h === "0.0.0.0"
  ) {
    return true;
  }
  const v4 = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [, a, b] = v4.map(Number);
    if (a === 10 || a === 127) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }
  // IPv6 loopback / link-local / unique-local.
  if (h === "::1" || h.startsWith("fe80:") || h.startsWith("fc") || h.startsWith("fd")) {
    return true;
  }
  // Single-label hosts (intranet names) never resolve publicly.
  if (!h.includes(".") && !h.includes(":")) return true;
  return false;
}

/** Assert a user-supplied URL is safe to fetch server-side. Returns the parsed URL. */
export function assertFetchableUrl(raw: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    throw new Error("URL must be a valid absolute URL");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https URLs can be fetched");
  }
  if (parsed.username || parsed.password) {
    throw new Error("URLs with embedded credentials cannot be fetched");
  }
  if (hostIsBlocked(parsed.hostname)) {
    throw new Error("That address is not publicly reachable");
  }
  return parsed;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function clean(text: string | null, max: number): string | null {
  if (!text) return null;
  const collapsed = decodeEntities(text).replace(/\s+/g, " ").trim();
  if (!collapsed) return null;
  return collapsed.length > max ? `${collapsed.slice(0, max - 1)}…` : collapsed;
}

type Attrs = Record<string, string>;

function parseAttrs(tag: string): Attrs {
  const attrs: Attrs = {};
  const re = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(tag)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";
    attrs[name] = value;
  }
  return attrs;
}

/**
 * Pure parser: extract metadata from raw HTML. `pageUrl` is the final URL
 * (after redirects) and is used to resolve relative icon/image URLs.
 */
export function extractMetadata(html: string, pageUrl: string): PageMetadata {
  const head = html.slice(0, PARSE_SLICE_BYTES);
  let page: URL;
  try {
    page = new URL(pageUrl);
  } catch {
    throw new Error("URL must be a valid absolute URL");
  }
  const domain = page.hostname.replace(/^www\./, "");

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "") : null;

  const metas: Attrs[] = [];
  const metaRe = /<meta\s+[^>]*>/gi;
  let metaMatch: RegExpExecArray | null;
  while ((metaMatch = metaRe.exec(head)) !== null) {
    metas.push(parseAttrs(metaMatch[0]));
  }
  const metaContent = (...keys: string[]): string | null => {
    for (const key of keys) {
      const [attr, value] = key.split("=", 2);
      const found = metas.find((m) => m[attr] === value);
      if (found?.content) return found.content;
    }
    return null;
  };

  const icons: { rel: string; href: string }[] = [];
  const linkRe = /<link\s+[^>]*>/gi;
  let linkMatch: RegExpExecArray | null;
  while ((linkMatch = linkRe.exec(head)) !== null) {
    const attrs = parseAttrs(linkMatch[0]);
    if (attrs.rel && attrs.href && attrs.rel.toLowerCase().includes("icon")) {
      icons.push({ rel: attrs.rel.toLowerCase(), href: attrs.href });
    }
  }

  const resolveHttp = (href: string): string | null => {
    try {
      const absolute = new URL(href, page);
      if (absolute.protocol !== "http:" && absolute.protocol !== "https:") {
        return null;
      }
      return absolute.toString();
    } catch {
      return null;
    }
  };

  const appleTouch = icons.find((i) => i.rel.includes("apple-touch-icon"));
  const regular = icons.find((i) => i.rel === "icon" || i.rel === "shortcut icon");
  const iconHref = appleTouch?.href ?? regular?.href ?? icons[0]?.href ?? null;

  const title = clean(
    metaContent("property=og:title", "name=twitter:title") ?? rawTitle,
    200,
  );
  const description = clean(
    metaContent(
      "name=description",
      "property=og:description",
      "name=twitter:description",
    ),
    500,
  );
  const siteName = clean(
    metaContent("property=og:site_name") ?? (title ? null : domain),
    120,
  );

  return {
    title,
    description,
    faviconUrl: (iconHref && resolveHttp(iconHref)) || googleFavicon(domain),
    siteName,
    suggestedCategory: suggestCategory({
      title,
      description,
      url: pageUrl,
    }),
    suggestedTags: suggestTags({ title, description, url: pageUrl }),
  };
}

/** Fetch a page and extract its metadata. Throws with a user-safe message. */
export async function fetchPageMetadata(rawUrl: string): Promise<PageMetadata> {
  const target = assertFetchableUrl(rawUrl);

  let res: Response;
  try {
    res = await fetch(target.toString(), {
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en",
        "User-Agent": "VaultWerk/1.0 (+metadata-preview)",
      },
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "TimeoutError"
        ? "timed out"
        : "could not be reached";
    throw new Error(`That page ${reason} — fill the details manually`, {
      cause: error,
    });
  }

  // Redirects can land somewhere private; re-check the final host.
  const finalHost = ((): string | null => {
    try {
      return new URL(res.url).hostname;
    } catch {
      return null;
    }
  })();
  if (!finalHost || hostIsBlocked(finalHost)) {
    throw new Error("That address is not publicly reachable");
  }

  if (!res.ok) {
    throw new Error(`That page returned ${res.status} — fill the details manually`);
  }
  const contentType = res.headers.get("content-type") ?? "";
  if (!/text\/html|application\/xhtml/i.test(contentType)) {
    throw new Error("That URL is not a web page — fill the details manually");
  }
  const length = Number(res.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    throw new Error("That page is too large to preview");
  }

  const html = await res.text();
  return extractMetadata(html.slice(0, PARSE_SLICE_BYTES), res.url || target.toString());
}
