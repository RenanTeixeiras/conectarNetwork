"use client";

import { useId, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { compressProfilePhoto } from "@/lib/photos/compress";
import { Avatar } from "@/components/ui/primitives";

export function PhotoPicker({ name, profileName, photoUrl }: { name: string; photoUrl?: string | null; profileName: string }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !inputRef.current) return;

    setError("");
    setProcessing(true);
    try {
      const compressed = await compressProfilePhoto(file);
      const files = new DataTransfer();
      files.items.add(compressed);
      inputRef.current.files = files.files;
      setPreviewUrl(URL.createObjectURL(compressed));
    } catch (error) {
      inputRef.current.value = "";
      setError(error instanceof Error ? error.message : "Não foi possível preparar a foto.");
    } finally {
      setProcessing(false);
    }
  }

  return <div className="flex items-center gap-4"><Avatar name={profileName} photoUrl={previewUrl ?? photoUrl} size="lg" /><div><input ref={inputRef} id={id} className="sr-only" name={name} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} /><label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-conectar-green-800"><Camera className="size-5" />{processing ? "Preparando foto..." : photoUrl || previewUrl ? "Trocar foto" : "Adicionar foto"}</label><p className="text-xs leading-4 text-conectar-muted">JPEG, PNG ou WebP. Máximo de 300 KB.</p>{error && <p role="alert" className="mt-1 text-xs text-[#b94a48]">{error}</p>}</div></div>;
}
