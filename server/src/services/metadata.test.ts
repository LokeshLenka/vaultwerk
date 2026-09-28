import { describe, expect, it } from "vitest";
import { assertFetchableUrl, extractMetadata } from "./metadata.js";

describe("extractMetadata", () => {
  it("pulls title, description, and icon from a typical page head", () => {
    const html = `<!doctype html><html><head>
      <title>Supabase &amp; Docs</title>
      <meta name="description" content="The open source Firebase alternative." />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
    </head><body></body></html>`;
    const result = extractMetadata(html, "https://supabase.com/docs");
    expect(result.title).toBe("Supabase & Docs");
    expect(result.description).toBe("The open source Firebase alternative.");
    expect(result.faviconUrl).toBe("https://supabase.com/favicon-32x32.png");
  });

  it("prefers Open Graph tags and the apple touch icon", () => {
    const html = `<head>
      <title>Fallback title</title>
      <meta property="og:title" content="OG title" />
      <meta property="og:description" content="OG description" />
      <meta property="og:site_name" content="Example" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="https://cdn.example.com/touch.png" />
    </head>`;
    const result = extractMetadata(html, "https://www.example.com/page");
    expect(result.title).toBe("OG title");
    expect(result.description).toBe("OG description");
    expect(result.siteName).toBe("Example");
    expect(result.faviconUrl).toBe("https://cdn.example.com/touch.png");
  });

  it("falls back to the Google favicon service when no icon is declared", () => {
    const result = extractMetadata("<head><title>No icon</title></head>", "https://example.com");
    expect(result.faviconUrl).toBe(
      "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    );
  });

  it("rejects non-http icon schemes and resolves relative hrefs", () => {
    const html = `<head><link rel="icon" href="data:image/png;base64,AAA" /></head>`;
    const result = extractMetadata(html, "https://example.com");
    expect(result.faviconUrl).toContain("google.com/s2/favicons");
  });

  it("collapses whitespace and truncates long titles", () => {
    const html = `<head><title>  Lots\n   of   space  </title>
      <meta name="description" content="   " /></head>`;
    const result = extractMetadata(html, "https://example.com");
    expect(result.title).toBe("Lots of space");
    expect(result.description).toBeNull();
  });
});

describe("assertFetchableUrl", () => {
  it("accepts public http(s) URLs", () => {
    expect(assertFetchableUrl("https://example.com/x").hostname).toBe(
      "example.com",
    );
  });

  it("rejects non-http protocols, credentials, and local targets", () => {
    expect(() => assertFetchableUrl("not a url")).toThrow();
    expect(() => assertFetchableUrl("file:///etc/passwd")).toThrow();
    expect(() => assertFetchableUrl("https://user:pass@example.com")).toThrow();
    expect(() => assertFetchableUrl("http://localhost:4000/api")).toThrow();
    expect(() => assertFetchableUrl("http://127.0.0.1/")).toThrow();
    expect(() => assertFetchableUrl("http://192.168.1.19:5173/")).toThrow();
    expect(() => assertFetchableUrl("http://intranet/")).toThrow();
  });
});
