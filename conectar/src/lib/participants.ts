import "server-only";
import type { ParticipantProfile, PublicProfile } from "@/types/profiles";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function displayName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`;
}

function safeHttpUrl(value: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function safeWhatsApp(value: string | null) {
  const phone = value?.replace(/\D/g, "");
  return phone ? `https://wa.me/${phone}` : undefined;
}

export async function getCheckedInParticipants(eventId: string): Promise<ParticipantProfile[]> {
  const supabase = createServerSupabaseClient();
  const { data: participations, error: participationError } = await supabase
    .from("event_participants")
    .select("profile_id")
    .eq("event_id", eventId)
    .eq("status", "CHECKED_IN");
  if (participationError) throw new Error("Não foi possível carregar os participantes.");

  const profileIds = participations.map((participant) => participant.profile_id);
  if (!profileIds.length) return [];

  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, profession, company, segment")
    .in("id", profileIds)
    .eq("is_active", true)
    .order("first_name", { ascending: true })
    .order("last_name", { ascending: true });
  if (profileError) throw new Error("Não foi possível carregar os participantes.");

  return profiles.map((profile) => ({
    company: profile.company,
    id: profile.id,
    name: displayName(profile.first_name, profile.last_name),
    profession: profile.profession,
    segment: profile.segment,
  }));
}

export async function getCheckedInPublicProfile(eventId: string, profileId: string): Promise<PublicProfile | null> {
  const supabase = createServerSupabaseClient();
  const { data: participation, error: participationError } = await supabase
    .from("event_participants")
    .select("profile_id")
    .eq("event_id", eventId)
    .eq("profile_id", profileId)
    .eq("status", "CHECKED_IN")
    .maybeSingle();
  if (participationError) throw new Error("Não foi possível carregar o perfil.");
  if (!participation) return null;

  const [{ data: profile, error: profileError }, { data: profileTags, error: tagsError }, { data: preferences, error: preferencesError }] = await Promise.all([
    supabase.from("profiles").select("id, first_name, last_name, profession, company, segment, bio, what_i_do, what_i_offer, target_audience, whatsapp_phone, linkedin_url, instagram_url").eq("id", profileId).eq("is_active", true).maybeSingle(),
    supabase.from("profile_tags").select("tags!inner(name)").eq("profile_id", profileId).order("created_at", { ascending: true }),
    supabase.from("event_contact_preferences").select("share_whatsapp, share_linkedin, share_instagram").eq("event_id", eventId).eq("profile_id", profileId).maybeSingle(),
  ]);
  if (profileError || tagsError || preferencesError) throw new Error("Não foi possível carregar o perfil.");
  if (!profile) return null;

  const contact = {
    ...(preferences?.share_whatsapp ? { whatsapp: safeWhatsApp(profile.whatsapp_phone) } : {}),
    ...(preferences?.share_linkedin ? { linkedin: safeHttpUrl(profile.linkedin_url) } : {}),
    ...(preferences?.share_instagram ? { instagram: safeHttpUrl(profile.instagram_url) } : {}),
  };

  return {
    bio: profile.bio,
    company: profile.company,
    contact,
    id: profile.id,
    name: displayName(profile.first_name, profile.last_name),
    profession: profile.profession,
    segment: profile.segment,
    tags: profileTags.map((assignment) => assignment.tags.name),
    targetAudience: profile.target_audience,
    whatIDo: profile.what_i_do,
    whatIOffer: profile.what_i_offer,
  };
}
