/**
 * Browser bookmark import — client half.
 *
 * Chrome/Firefox/Edge/Safari all export Netscape-format HTML. The file is
 * parsed locally with a regex token scan (no DOM needed, works on huge
 * files), then plain items are POSTed to /api/tools/import-bookmarks where
 * the server owns normalization, dedupe, and auto-categorization.
 */

import { apiFetch } from "../api/client";

export type ParsedBookmark = {
  url: string;
  /** Decoded link text; may be empty (server falls back to the domain). */
  title: string;
  /** Innermost meaningful folder, or null for loose/browser-root links. */
  folder: string | null;
};

export type BookmarkImportSummary = {
  imported: number;
  duplicates: number;
  invalid: number;
  collectionsCreated: number;
  collectionsReused: number;
};

export class BookmarkImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookmarkImportError";
  }
}

const MAX_ITEMS = 2000;
const MAX_FILE_BYTES = 5_000_000;

/** Browser-generated root folders never become collections. */
const ROOT_FOLDERS = new Set([
  "bookmarks bar",
  "other bookmarks",
  "mobile bookmarks",
  "bookmarks",
  "bookmarks menu",
  "favorites bar",
  "other favorites",
  "toolbar",
  "reading list",
]);

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

function cleanText(text: string): string {
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

/**
 * Token scan over the export. Tracks <DL> nesting depth for the folder
 * stack: <H3> sets the folder at the current depth, </DL> pops back out,
 * and every <A HREF> inherits the innermost non-root folder.
 */
export function parseBookmarkHtml(html: string): ParsedBookmark[] {
  const items: ParsedBookmark[] = [];
  const stack: string[] = [];
  let depth = 0;

  const token =
    /<dl[^>]*>|<\/dl>|<dt[^>]*>\s*<h3[^>]*>([^<]*)<\/h3>|<a\s+[^>]*?href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>([^<]*)<\/a>/gi;

  let match: RegExpExecArray | null;
  while ((match = token.exec(html)) !== null) {
    if (items.length >= MAX_ITEMS) break;
    const head = match[0].slice(0, 3).toLowerCase();

    if (head === "<dl") {
      depth++;
    } else if (head === "</d") {
      // Closing </DL>: pop folders deeper than the new depth.
      depth = Math.max(0, depth - 1);
      stack.length = Math.min(stack.length, depth);
    } else if (head === "<dt") {
      // <DT><H3>folder</H3> — the folder lives at the current depth.
      const name = cleanText(match[1] ?? "");
      if (name) {
        stack.length = Math.min(stack.length, depth);
        stack[depth] = name;
      }
    } else {
      // <A HREF> — a bookmark.
      const href = (match[2] ?? match[3] ?? "").trim();
      if (!/^https?:\/\//i.test(href)) continue;
      const title = cleanText(match[4] ?? "");
      // Sparse slots (depth jumps past the stack length) read as undefined.
      const folder =
        [...stack]
          .reverse()
          .find(
            (f): f is string =>
              typeof f === "string" && !ROOT_FOLDERS.has(f.toLowerCase()),
          ) ?? null;
      items.push({ url: href, title, folder });
    }
  }

  return items;
}

/** Parse a user-picked export file and import it into this account. */
export async function importBookmarks(
  file: File,
  options?: { createCollections?: boolean },
): Promise<{ summary: BookmarkImportSummary; parsed: number }> {
  if (file.size > MAX_FILE_BYTES) {
    throw new BookmarkImportError(
      "That file is larger than 5 MB — export a smaller folder and retry.",
    );
  }
  const items = parseBookmarkHtml(await file.text());
  if (items.length === 0) {
    throw new BookmarkImportError(
      "No bookmarks found — is that a browser bookmark export (.html)?",
    );
  }
  try {
    const { summary } = await apiFetch<{ summary: BookmarkImportSummary }>(
      "/api/tools/import-bookmarks",
      {
        method: "POST",
        body: {
          items: items.map((item) => ({
            url: item.url,
            title: item.title || null,
            folder: item.folder,
          })),
          createCollections: options?.createCollections ?? true,
        },
      },
    );
    return { summary, parsed: items.length };
  } catch (error) {
    throw new BookmarkImportError(
      error instanceof Error ? error.message : "Could not import bookmarks.",
    );
  }
}
