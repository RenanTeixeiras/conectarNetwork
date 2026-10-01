import { describe, expect, it } from "vitest";
import { instagramProfileUrl, normalizeInstagram } from "./instagram";

describe("Instagram normalization", () => {
  it("accepts handles with and without @ and creates a profile URL", () => {
    expect(normalizeInstagram(" Renan.Teixeira ")).toBe("@renan.teixeira");
    expect(normalizeInstagram("@renan_teixeira")).toBe("@renan_teixeira");
    expect(instagramProfileUrl("@renan.teixeira")).toBe("https://www.instagram.com/renan.teixeira/");
  });

  it("supports existing profile URLs", () => {
    expect(normalizeInstagram("https://www.instagram.com/renan.teixeira/?igsh=123")).toBe("@renan.teixeira");
    expect(instagramProfileUrl("instagram.com/renan_teixeira")).toBe("https://www.instagram.com/renan_teixeira/");
  });

  it("leaves empty contacts empty", () => {
    expect(normalizeInstagram(" ")).toBe("");
    expect(instagramProfileUrl(null)).toBeUndefined();
  });

  it.each(["@@renan", "renan teixeira", "renan/teixeira", "renan..teixeira", "renan.", "a".repeat(31), "https://example.com/renan", "https://instagram.com/p/post/"])("rejects invalid input %s", (value) => {
    expect(normalizeInstagram(value)).toBeNull();
    expect(instagramProfileUrl(value)).toBeUndefined();
  });
});
