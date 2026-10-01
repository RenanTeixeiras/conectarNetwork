import { afterEach, describe, expect, it, vi } from "vitest";
import { cropAndCompressProfilePhoto } from "./compress";

afterEach(() => vi.unstubAllGlobals());

describe("cropAndCompressProfilePhoto", () => {
  it("crops the loaded preview without decoding the file again", async () => {
    const decode = vi.fn().mockRejectedValue(new Error("Android decoder failure"));
    vi.stubGlobal("createImageBitmap", decode);
    const drawImage = vi.fn();
    vi.stubGlobal("document", {
      createElement: () => ({
        getContext: () => ({ drawImage }),
        toBlob: (callback: (blob: Blob) => void) => callback(new Blob(["jpeg"], { type: "image/jpeg" })),
      }),
    });
    const preview = { naturalWidth: 1200, naturalHeight: 1600 } as HTMLImageElement;
    const result = await cropAndCompressProfilePhoto(new File(["source"], "photo.jpg", { type: "image/jpeg" }), { offsetX: 0.1, offsetY: 0, zoom: 1.5 }, preview);

    expect(decode).not.toHaveBeenCalled();
    expect(drawImage).toHaveBeenCalledWith(preview, -76.8, -256, 768, 1024);
    expect(result.type).toBe("image/jpeg");
    expect(result.name).toBe("avatar.jpg");
  });
});
