import { describe, expect, it } from "vitest";
import { detectProfilePhotoMimeType } from "./validation";

describe("detectProfilePhotoMimeType", () => {
  it("recognizes JPEG, PNG, and WebP signatures", () => {
    expect(detectProfilePhotoMimeType(new Uint8Array([0xff, 0xd8, 0xff]))).toBe("image/jpeg");
    expect(detectProfilePhotoMimeType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe("image/png");
    expect(detectProfilePhotoMimeType(new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]))).toBe("image/webp");
  });

  it("rejects unsupported file signatures", () => {
    expect(detectProfilePhotoMimeType(new Uint8Array([0x3c, 0x73, 0x76, 0x67]))).toBeNull();
  });
});
