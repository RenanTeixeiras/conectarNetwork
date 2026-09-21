import { describe, expect, it } from "vitest";
import { initials } from "./utils";

describe("initials", () => {
  it("uses the first two names", () => {
    expect(initials("Renan Teixeira")).toBe("RT");
  });

  it("ignores repeated spaces", () => {
    expect(initials("  Ana   Lima ")).toBe("AL");
  });
});
