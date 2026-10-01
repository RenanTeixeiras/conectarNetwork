import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY são obrigatórios.");

const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: profileFolders, error: foldersError } = await supabase.storage.from("profile-photos").list("profiles", { limit: 1000 });
if (foldersError) throw foldersError;

const photoPaths = [];
for (const folder of profileFolders) {
  const { data: files, error: filesError } = await supabase.storage.from("profile-photos").list(`profiles/${folder.name}`, { limit: 1000 });
  if (filesError) throw filesError;
  photoPaths.push(...files.map((file) => `profiles/${folder.name}/${file.name}`));
}

if (photoPaths.length) {
  const { error } = await supabase.storage.from("profile-photos").remove(photoPaths);
  if (error) throw error;
}

console.log(`${photoPaths.length} foto(s) de perfil removida(s).`);
