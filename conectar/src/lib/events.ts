import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getEventBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("events")
    .select("id, name, slug, description, starts_at, ends_at, timezone, status, venue_name")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error("Não foi possível carregar o encontro.");
  return data;
}
