import { describe, expect, it } from "vitest";
import { createId } from "./id";

describe("createId", () => {
  it("returns a non-empty string", () => {
    expect(typeof createId()).toBe("string");
    expect(createId().length).toBeGreaterThan(0);
  });

  it("generates unique ids", () => {
    const ids = new Set(Array.from({ length: 1000 }, () => createId()));
    expect(ids.size).toBe(1000);
  });
});
