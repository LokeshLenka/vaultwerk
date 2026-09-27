import { describe, expect, it } from "vitest";
import { normalizeUrl } from "./nomalize-url";

describe("normalizeUrl", () => {
  it("strips tracking params, hash, and default ports", () => {
    const result = normalizeUrl(
      "https://www.Example.com/docs/?utm_source=twitter#intro",
    );
    expect(result).toEqual({
      url: "https://www.Example.com/docs/?utm_source=twitter#intro",
      normalizedUrl: "https://www.example.com/docs",
      domain: "example.com",
    });
  });

  it("removes trailing slashes except for the root path", () => {
    expect(normalizeUrl("https://example.com/docs/").normalizedUrl).toBe(
      "https://example.com/docs",
    );
    expect(normalizeUrl("https://example.com/").normalizedUrl).toBe(
      "https://example.com/",
    );
  });

  it("lowercases the host and strips www for the display domain", () => {
    const result = normalizeUrl("https://WWW.GitHub.com/explore");
    expect(result.normalizedUrl).toBe("https://www.github.com/explore");
    expect(result.domain).toBe("github.com");
  });

  it("preserves non-tracking query params", () => {
    const result = normalizeUrl("https://example.com/search?q=vaultwerk&page=2");
    expect(result.normalizedUrl).toContain("q=vaultwerk");
    expect(result.normalizedUrl).toContain("page=2");
  });

  it("treats http and https default ports as identical", () => {
    expect(normalizeUrl("https://example.com:443/a").normalizedUrl).toBe(
      "https://example.com/a",
    );
    expect(normalizeUrl("http://example.com:80/a").normalizedUrl).toBe(
      "http://example.com/a",
    );
  });

  it("throws on malformed input so callers can bail out early", () => {
    expect(() => normalizeUrl("not a url")).toThrow();
    expect(() => normalizeUrl("")).toThrow();
  });
});
