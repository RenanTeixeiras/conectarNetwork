import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY são obrigatórios.");

const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: profiles, error: profileError } = await supabase
  .from("profiles")
  .select("id, first_name, last_name, photo_url")
  .eq("normalized_name", "renan teixeira");

if (profileError) throw profileError;
if (profiles.length !== 1) throw new Error(`Foram encontrados ${profiles.length} perfis para Renan Teixeira. Nenhum dado foi removido.`);

const profile = profiles[0];
if (!profile) throw new Error("Perfil não encontrado.");

if (profile.photo_url) {
  const { error } = await supabase.storage.from("profile-photos").remove([profile.photo_url]);
  if (error) throw error;
}

const { error: preferencesError } = await supabase.from("event_contact_preferences").delete().eq("profile_id", profile.id);
if (preferencesError) throw preferencesError;

const { error: participantsError } = await supabase.from("event_participants").delete().eq("profile_id", profile.id);
if (participantsError) throw participantsError;

const { error: tagsError } = await supabase.from("profile_tags").delete().eq("profile_id", profile.id);
if (tagsError) throw tagsError;

const { error: deleteError } = await supabase.from("profiles").delete().eq("id", profile.id);
if (deleteError) throw deleteError;

console.log(`Perfil de ${profile.first_name} ${profile.last_name} removido.`);
