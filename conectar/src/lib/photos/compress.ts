"use client";

import { MAX_PROFILE_PHOTO_BYTES } from "./validation";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ProfilePhotoCrop = {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

type DecodedImage = {
  height: number;
  release: () => void;
  source: CanvasImageSource;
  width: number;
};

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

async function decodeWithImageElement(file: File): Promise<DecodedImage> {
  const url = URL.createObjectURL(file);
  const image = new Image();
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Não foi possível decodificar a foto. Escolha uma imagem JPEG, PNG ou WebP diferente."));
      image.src = url;
    });
    return { height: image.naturalHeight, release: () => URL.revokeObjectURL(url), source: image, width: image.naturalWidth };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function decodeProfilePhoto(file: File): Promise<DecodedImage> {
  try {
    const image = await createImageBitmap(file);
    return { height: image.height, release: () => image.close(), source: image, width: image.width };
  } catch {
    return decodeWithImageElement(file);
  }
}

export async function cropAndCompressProfilePhoto(file: File, crop: ProfilePhotoCrop, preview?: HTMLImageElement) {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error("Escolha uma foto JPEG, PNG ou WebP.");

  const source: DecodedImage = preview
    ? { height: preview.naturalHeight, width: preview.naturalWidth, source: preview, release: () => {} }
    : await decodeProfilePhoto(file);
  try {
    if (!source.width || !source.height) throw new Error("Aguarde a foto carregar antes de confirmar.");
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
      context.drawImage(source.source, x, y, width, height);

      for (const quality of [0.86, 0.76, 0.66, 0.56, 0.46]) {
        const blob = await toBlob(canvas, quality);
        if (blob && blob.size <= MAX_PROFILE_PHOTO_BYTES) {
          return new File([blob], "avatar.jpg", { type: "image/jpeg" });
        }
      }
      size = Math.floor(size * 0.75);
    }
  } finally {
    source.release();
  }

  throw new Error("Não foi possível comprimir a foto para 300 KB. Escolha outra imagem.");
}
