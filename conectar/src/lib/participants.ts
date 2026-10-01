import "server-only";
import type { EditableProfile, ParticipantProfile, PublicProfile } from "@/types/profiles";
import { getSignedProfilePhotoUrls } from "@/lib/profile-photo";
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

function safeWhatsApp(value: string | null, message: string) {
  const phone = value?.replace(/\D/g, "");
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : undefined;
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
    .select("id, first_name, last_name, profession, company, segment, photo_url")
    .in("id", profileIds)
    .eq("is_active", true)
    .order("first_name", { ascending: true })
    .order("last_name", { ascending: true });
  if (profileError) throw new Error("Não foi possível carregar os participantes.");

  const photoUrls = await getSignedProfilePhotoUrls(profiles.map((profile) => profile.photo_url));
  return profiles.map((profile) => ({
    company: profile.company,
    id: profile.id,
    name: displayName(profile.first_name, profile.last_name),
    photoUrl: profile.photo_url ? photoUrls.get(profile.photo_url) ?? null : null,
    profession: profile.profession,
    segment: profile.segment,
  }));
}

export async function getCheckedInPublicProfile(eventId: string, profileId: string, contactMessage: string): Promise<PublicProfile | null> {
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

  const [{ data: profile, error: profileError }, { data: preferences, error: preferencesError }] = await Promise.all([
    supabase.from("profiles").select("id, first_name, last_name, profession, company, segment, bio, what_i_do_and_offer, whatsapp_phone, linkedin_url, instagram_url, photo_url").eq("id", profileId).eq("is_active", true).maybeSingle(),
    supabase.from("event_contact_preferences").select("share_whatsapp, share_linkedin, share_instagram").eq("event_id", eventId).eq("profile_id", profileId).maybeSingle(),
  ]);
  if (profileError || preferencesError) throw new Error("Não foi possível carregar o perfil.");
  if (!profile) return null;

  const contact = {
    ...(preferences?.share_whatsapp ? { whatsapp: safeWhatsApp(profile.whatsapp_phone, contactMessage) } : {}),
    ...(preferences?.share_linkedin ? { linkedin: safeHttpUrl(profile.linkedin_url) } : {}),
    ...(preferences?.share_instagram ? { instagram: safeHttpUrl(profile.instagram_url) } : {}),
  };

  const photoUrls = await getSignedProfilePhotoUrls([profile.photo_url]);
  return {
    bio: profile.bio,
    company: profile.company,
    contact,
    id: profile.id,
    name: displayName(profile.first_name, profile.last_name),
    photoUrl: profile.photo_url ? photoUrls.get(profile.photo_url) ?? null : null,
    profession: profile.profession,
    segment: profile.segment,
    whatIDoAndOffer: profile.what_i_do_and_offer,
  };
}

export async function getEditableProfile(eventId: string, profileId: string): Promise<EditableProfile | null> {
  const supabase = createServerSupabaseClient();
  const { data: participation, error: participationError } = await supabase
    .from("event_participants")
    .select("profile_id")
    .eq("event_id", eventId)
    .eq("profile_id", profileId)
    .maybeSingle();
  if (participationError) throw new Error("Não foi possível carregar seu perfil.");
  if (!participation) return null;

  const [{ data: profile, error: profileError }, { data: preferences, error: preferencesError }] = await Promise.all([
    supabase.from("profiles").select("id, first_name, last_name, profession, company, segment, city, what_i_do_and_offer, whatsapp_phone, linkedin_url, instagram_url, photo_url").eq("id", profileId).eq("is_active", true).maybeSingle(),
    supabase.from("event_contact_preferences").select("share_whatsapp, share_linkedin, share_instagram").eq("event_id", eventId).eq("profile_id", profileId).maybeSingle(),
  ]);
  if (profileError || preferencesError) throw new Error("Não foi possível carregar seu perfil.");
  if (!profile) return null;

  const photoUrls = await getSignedProfilePhotoUrls([profile.photo_url]);
  return {
    city: profile.city ?? "",
    company: profile.company ?? "",
    firstName: profile.first_name,
    id: profile.id,
    instagram: profile.instagram_url ?? "",
    lastName: profile.last_name,
    linkedin: profile.linkedin_url ?? "",
    photoUrl: profile.photo_url ? photoUrls.get(profile.photo_url) ?? null : null,
    profession: profile.profession ?? "",
    segment: profile.segment ?? "",
    shareContacts: Boolean(preferences?.share_whatsapp || preferences?.share_linkedin || preferences?.share_instagram),
    whatsapp: profile.whatsapp_phone ?? "",
    whatIDoAndOffer: profile.what_i_do_and_offer,
  };
}
