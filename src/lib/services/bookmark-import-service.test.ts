import { describe, expect, it } from "vitest";
import { parseBookmarkHtml } from "./bookmark-import-service";

const SAMPLE = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
  <DT><H3 ADD_DATE="1710000000">Bookmarks bar</H3>
  <DD><DL><p>
    <DT><A HREF="https://github.com" ADD_DATE="1710000001">GitHub &amp; Code</A>
    <DT><H3>Dev Tools</H3>
    <DD><DL><p>
      <DT><A HREF="https://supabase.com/docs" ADD_DATE="1710000002">Supabase docs</A>
      <DT><A HREF="javascript:alert(1)">Bad bookmarklet</A>
      <DT><A HREF="chrome://newtab/">New tab</A>
    </DL><p>
    <DT><H3>Empty &amp; Sons</H3>
    <DD><DL><p>
    </DL><p>
  </DL><p>
  <DT><H3>Other bookmarks</H3>
  <DD><DL><p>
    <DT><A HREF="https://example.com">Loose link</A>
  </DL><p>
</DL><p>`;

describe("parseBookmarkHtml", () => {
  it("extracts links with titles, entities decoded", () => {
    const items = parseBookmarkHtml(SAMPLE);
    const urls = items.map((i) => i.url);
    expect(urls).toContain("https://github.com");
    expect(urls).toContain("https://supabase.com/docs");
    expect(urls).toContain("https://example.com");
    expect(items.find((i) => i.url === "https://github.com")?.title).toBe(
      "GitHub & Code",
    );
  });

  it("assigns the innermost meaningful folder", () => {
    const items = parseBookmarkHtml(SAMPLE);
    expect(
      items.find((i) => i.url === "https://supabase.com/docs")?.folder,
    ).toBe("Dev Tools");
    // Direct child of a browser root → no collection folder.
    expect(
      items.find((i) => i.url === "https://github.com")?.folder,
    ).toBeNull();
    expect(
      items.find((i) => i.url === "https://example.com")?.folder,
    ).toBeNull();
  });

  it("skips bookmarklets and browser-internal URLs", () => {
    const items = parseBookmarkHtml(SAMPLE);
    expect(items).toHaveLength(3);
  });

  it("returns an empty list for non-bookmark HTML", () => {
    expect(parseBookmarkHtml("<html><body>hello</body></html>")).toEqual([]);
    expect(parseBookmarkHtml("")).toEqual([]);
  });
});
