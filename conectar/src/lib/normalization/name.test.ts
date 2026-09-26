import { describe, expect, it } from "vitest";
import { normalizeName } from "./name";

describe("normalizeName", () => {
  it("normalizes casing, accents, and repeated whitespace", () => {
    expect(normalizeName("  JOÃO", "  da   SIlva ")).toBe("joao da silva");
  });
});
