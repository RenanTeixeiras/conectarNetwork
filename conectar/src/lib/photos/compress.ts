"use client";

import { MAX_PROFILE_PHOTO_BYTES } from "@/lib/photos/validation";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

export async function compressProfilePhoto(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error("Escolha uma foto JPEG, PNG ou WebP.");

  const source = await createImageBitmap(file);
  try {
    let longestSide = Math.min(Math.max(source.width, source.height), 512);
    while (longestSide >= 128) {
      const scale = longestSide / Math.max(source.width, source.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(source.width * scale));
      canvas.height = Math.max(1, Math.round(source.height * scale));
      canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.86, 0.76, 0.66, 0.56, 0.46]) {
        const blob = await toBlob(canvas, quality);
        if (blob && blob.size <= MAX_PROFILE_PHOTO_BYTES) {
          return new File([blob], "avatar.jpg", { type: "image/jpeg" });
        }
      }
      longestSide = Math.floor(longestSide * 0.75);
    }
  } finally {
    source.close();
  }

  throw new Error("Não foi possível comprimir a foto para 300 KB. Escolha outra imagem.");
}
