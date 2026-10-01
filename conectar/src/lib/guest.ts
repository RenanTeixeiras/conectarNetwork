import "server-only";
import { getEventBySlug } from "@/lib/events";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type GuestCandidate = {
  company: string | null;
  firstName: string;
  id: string;
  lastName: string;
  profession: string | null;
};

export type GuestOnboardingInput = {
  city: string;
  company: string;
  firstName: string;
  instagram: string;
  lastName: string;
  linkedin: string;
  normalizedName: string;
  profession: string;
  segment: string;
  shareInstagram: boolean;
  shareLinkedin: boolean;
  shareWhatsapp: boolean;
  targetTagIds: string[];
  whatsapp: string;
  whatIDo: string;
  whatIOffer: string;
};

export async function getOpenEventBySlug(slug: string) {
  const event = await getEventBySlug(slug);
  if (!event || event.status !== "OPEN") return null;
  return event;
}

export async function findActiveProfilesByNormalizedName(normalizedName: string): Promise<GuestCandidate[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, profession, company")
    .eq("normalized_name", normalizedName)
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Não foi possível identificar o perfil.");
  return data.map((profile) => ({
    company: profile.company,
    firstName: profile.first_name,
    id: profile.id,
    lastName: profile.last_name,
    profession: profile.profession,
  }));
}

export async function getActiveProfileById(profileId: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name")
    .eq("id", profileId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw new Error("Não foi possível carregar o perfil.");
  return data;
}

export async function checkInExistingGuest(eventId: string, profileId: string) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.rpc("check_in_event_participant", {
    p_event_id: eventId,
    p_profile_id: profileId,
  });
  if (error) throw new Error("Não foi possível registrar sua presença.");
}

export async function createGuestParticipant(eventId: string, input: GuestOnboardingInput) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.rpc("create_guest_participant", {
    p_city: input.city,
    p_company: input.company,
    p_event_id: eventId,
    p_first_name: input.firstName,
    p_instagram_url: input.instagram,
    p_last_name: input.lastName,
    p_linkedin_url: input.linkedin,
    p_normalized_name: input.normalizedName,
    p_offer_tag_ids: [],
    p_profession: input.profession,
    p_segment: input.segment,
    p_share_instagram: input.shareInstagram,
    p_share_linkedin: input.shareLinkedin,
    p_share_whatsapp: input.shareWhatsapp,
    p_target_audience: "",
    p_target_tag_ids: input.targetTagIds,
    p_what_i_do: input.whatIDo,
    p_what_i_offer: input.whatIOffer,
    p_whatsapp_phone: input.whatsapp,
  });
  if (error || !data) throw new Error("Não foi possível concluir seu cadastro.");
  return data;
}

export async function updateGuestProfile(eventId: string, profileId: string, input: Omit<GuestOnboardingInput, "firstName" | "lastName" | "normalizedName">) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.rpc("update_guest_profile", {
    p_city: input.city,
    p_company: input.company,
    p_event_id: eventId,
    p_instagram_url: input.instagram,
    p_linkedin_url: input.linkedin,
    p_offer_tag_ids: [],
    p_profile_id: profileId,
    p_profession: input.profession,
    p_segment: input.segment,
    p_share_instagram: input.shareInstagram,
    p_share_linkedin: input.shareLinkedin,
    p_share_whatsapp: input.shareWhatsapp,
    p_target_audience: "",
    p_target_tag_ids: input.targetTagIds,
    p_what_i_do: input.whatIDo,
    p_what_i_offer: input.whatIOffer,
    p_whatsapp_phone: input.whatsapp,
  });
  if (error) throw new Error("Não foi possível atualizar seu perfil.");
}

export async function getActiveTags() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("tags")
    .select("id, name, category")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw new Error("Não foi possível carregar as tags.");
  return data;
}
