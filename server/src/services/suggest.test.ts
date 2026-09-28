import { describe, expect, it } from "vitest";
import { suggestCategory, suggestTags } from "./suggest.js";

describe("suggestCategory", () => {
  it("matches distinctive domains first", () => {
    expect(
      suggestCategory({ url: "https://supabase.com", title: "Supabase" }),
    ).toBe("database");
    expect(
      suggestCategory({ url: "https://figma.com", title: "Figma" }),
    ).toBe("design-ui");
    expect(
      suggestCategory({
        url: "https://github.com",
        title: "GitHub: code hosting",
      }),
    ).toBe("development");
  });

  it("reads the description when the domain is generic", () => {
    expect(
      suggestCategory({
        url: "https://example.com/tool",
        title: "Acme",
        description: "An AI chatbot powered by large language models",
      }),
    ).toBe("ai-ml");
  });

  it("prefers the strongest signal when a page mentions several topics", () => {
    // Figma's real title mentions AI, but design signals dominate.
    expect(
      suggestCategory({
        url: "https://figma.com",
        title: "Figma: The collaborative canvas for design, code, and AI",
      }),
    ).toBe("design-ui");
  });

  it("returns null when nothing matches instead of guessing", () => {
    expect(
      suggestCategory({ url: "https://example.com", title: "Acme" }),
    ).toBeNull();
    expect(suggestCategory({ url: "not a url" })).toBeNull();
  });
});

describe("suggestTags", () => {
  it("extracts topical keywords and boosts the domain name", () => {
    const tags = suggestTags({
      url: "https://supabase.com/docs",
      title: "Supabase documentation for Postgres database",
      description: "Postgres database with realtime APIs",
    });
    expect(tags).toContain("supabase");
    expect(tags).toContain("postgres");
    expect(tags).toContain("database");
    expect(tags.length).toBeLessThanOrEqual(5);
  });

  it("drops stopwords, short tokens, and pure numbers", () => {
    const tags = suggestTags({
      url: "https://example.com",
      title: "The best 2024 tool for you and your team",
    });
    expect(tags).not.toContain("the");
    expect(tags).not.toContain("and");
    expect(tags).not.toContain("2024");
    expect(tags).not.toContain("you");
    expect(tags).toContain("team");
  });

  it("returns an empty list when there is nothing to work with", () => {
    expect(suggestTags({ url: "not a url" })).toEqual([]);
  });
});
