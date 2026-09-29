"use client";

import { MAX_PROFILE_PHOTO_BYTES } from "@/lib/photos/validation";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ProfilePhotoCrop = {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

export async function cropAndCompressProfilePhoto(file: File, crop: ProfilePhotoCrop) {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error("Escolha uma foto JPEG, PNG ou WebP.");

  const source = await createImageBitmap(file);
  try {
    let size = 512;
    while (size >= 128) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Não foi possível preparar a foto.");

      const scale = (size / Math.min(source.width, source.height)) * crop.zoom;
      const width = source.width * scale;
      const height = source.height * scale;
      const x = (size - width) / 2 + crop.offsetX * size;
      const y = (size - height) / 2 + crop.offsetY * size;
      context.drawImage(source, x, y, width, height);

      for (const quality of [0.86, 0.76, 0.66, 0.56, 0.46]) {
        const blob = await toBlob(canvas, quality);
        if (blob && blob.size <= MAX_PROFILE_PHOTO_BYTES) {
          return new File([blob], "avatar.jpg", { type: "image/jpeg" });
        }
      }
      size = Math.floor(size * 0.75);
    }
  } finally {
    source.close();
  }

  throw new Error("Não foi possível comprimir a foto para 300 KB. Escolha outra imagem.");
}
