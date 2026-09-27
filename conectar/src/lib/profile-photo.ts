import "server-only";
import { MAX_PROFILE_PHOTO_BYTES, detectProfilePhotoMimeType } from "@/lib/photos/validation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const BUCKET = "profile-photos";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

function photoPath(profileId: string) {
  return `profiles/${profileId}/avatar`;
}

export async function saveProfilePhoto(profileId: string, file: File) {
  if (!file.size) throw new Error("Escolha uma foto para enviar.");
  if (file.size > MAX_PROFILE_PHOTO_BYTES) throw new Error("A foto deve ter no máximo 300 KB.");

  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentType = detectProfilePhotoMimeType(bytes);
  if (!contentType) throw new Error("Envie uma foto JPEG, PNG ou WebP válida.");

  const supabase = createServerSupabaseClient();
  const path = photoPath(profileId);
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    cacheControl: "3600",
    contentType,
    upsert: true,
  });
  if (uploadError) throw new Error("Não foi possível enviar sua foto.");

  const { error: profileError } = await supabase.from("profiles").update({ photo_url: path }).eq("id", profileId).eq("is_active", true);
  if (profileError) throw new Error("Não foi possível salvar sua foto.");
}

export async function removeProfilePhoto(profileId: string) {
  const supabase = createServerSupabaseClient();
  const path = photoPath(profileId);
  const { error: removeError } = await supabase.storage.from(BUCKET).remove([path]);
  if (removeError) throw new Error("Não foi possível remover sua foto.");

  const { error: profileError } = await supabase.from("profiles").update({ photo_url: null }).eq("id", profileId).eq("is_active", true);
  if (profileError) throw new Error("Não foi possível remover sua foto.");
}

export async function getSignedProfilePhotoUrls(paths: Array<string | null>) {
  const uniquePaths = [...new Set(paths.filter((path): path is string => Boolean(path)))];
  if (!uniquePaths.length) return new Map<string, string>();

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(uniquePaths, SIGNED_URL_TTL_SECONDS);
  if (error) throw new Error("Não foi possível carregar as fotos de perfil.");
  return new Map(data.filter((item) => item.signedUrl).map((item) => [item.path, item.signedUrl]));
}
