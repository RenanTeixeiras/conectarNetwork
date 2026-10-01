import "server-only";
import type { EditableProfile, ParticipantProfile, PublicProfile } from "@/types/profiles";
import { rankOpportunities } from "@/lib/matching/opportunities";
import { getSignedProfilePhotoUrls } from "@/lib/profile-photo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createConnectionMessage } from "@/lib/whatsapp-message";

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
    .select("id, first_name, last_name, profession, company, segment, what_i_do_and_offer, photo_url")
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
    whatIDoAndOffer: profile.what_i_do_and_offer,
  }));
}

export async function getCheckedInPublicProfile(eventId: string, profileId: string, contactContext: { eventName: string; senderCompany: string | null; senderName: string }): Promise<PublicProfile | null> {
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
    supabase.from("profiles").select("id, first_name, last_name, profession, company, segment, bio, what_i_do_and_offer, ideal_audience, whatsapp_phone, linkedin_url, instagram_url, photo_url").eq("id", profileId).eq("is_active", true).maybeSingle(),
    supabase.from("profile_tags").select("tags!inner(name)").eq("profile_id", profileId).eq("type", "TARGET").order("created_at", { ascending: true }),
    supabase.from("event_contact_preferences").select("share_whatsapp, share_linkedin, share_instagram").eq("event_id", eventId).eq("profile_id", profileId).maybeSingle(),
  ]);
  if (profileError || tagsError || preferencesError) throw new Error("Não foi possível carregar o perfil.");
  if (!profile) return null;

  const contact = {
    ...(preferences?.share_whatsapp ? { whatsapp: safeWhatsApp(profile.whatsapp_phone, createConnectionMessage({ ...contactContext, recipientFirstName: profile.first_name, recipientIdealAudience: profile.ideal_audience })) } : {}),
    ...(preferences?.share_linkedin ? { linkedin: safeHttpUrl(profile.linkedin_url) } : {}),
    ...(preferences?.share_instagram ? { instagram: safeHttpUrl(profile.instagram_url) } : {}),
  };

  const photoUrls = await getSignedProfilePhotoUrls([profile.photo_url]);
  return {
    bio: profile.bio,
    company: profile.company,
    contact,
    id: profile.id,
    idealAudience: profile.ideal_audience,
    name: displayName(profile.first_name, profile.last_name),
    photoUrl: profile.photo_url ? photoUrls.get(profile.photo_url) ?? null : null,
    profession: profile.profession,
    segment: profile.segment,
    targetTags: profileTags.map((assignment) => assignment.tags.name),
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

  const [{ data: profile, error: profileError }, { data: assignments, error: assignmentsError }, { data: preferences, error: preferencesError }] = await Promise.all([
    supabase.from("profiles").select("id, first_name, last_name, profession, company, segment, city, what_i_do_and_offer, ideal_audience, whatsapp_phone, linkedin_url, instagram_url, photo_url").eq("id", profileId).eq("is_active", true).maybeSingle(),
    supabase.from("profile_tags").select("tag_id, tags!inner(name)").eq("profile_id", profileId).eq("type", "TARGET").order("created_at", { ascending: true }),
    supabase.from("event_contact_preferences").select("share_whatsapp, share_linkedin, share_instagram").eq("event_id", eventId).eq("profile_id", profileId).maybeSingle(),
  ]);
  if (profileError || assignmentsError || preferencesError) throw new Error("Não foi possível carregar seu perfil.");
  if (!profile) return null;

  const photoUrls = await getSignedProfilePhotoUrls([profile.photo_url]);
  return {
    city: profile.city ?? "",
    company: profile.company ?? "",
    firstName: profile.first_name,
    id: profile.id,
    idealAudience: profile.ideal_audience,
    instagram: profile.instagram_url ?? "",
    lastName: profile.last_name,
    linkedin: profile.linkedin_url ?? "",
    photoUrl: profile.photo_url ? photoUrls.get(profile.photo_url) ?? null : null,
    profession: profile.profession ?? "",
    segment: profile.segment ?? "",
    shareContacts: Boolean(preferences?.share_whatsapp || preferences?.share_linkedin || preferences?.share_instagram),
    targetTagIds: assignments.map((assignment) => assignment.tag_id),
    whatsapp: profile.whatsapp_phone ?? "",
    whatIDoAndOffer: profile.what_i_do_and_offer,
  };
}

export async function getOpportunities(eventId: string, profileId: string) {
  const supabase = createServerSupabaseClient();
  const [{ data: targetTags, error: targetTagsError }, participants] = await Promise.all([
    supabase.from("profile_tags").select("tags!inner(name, category)").eq("profile_id", profileId).eq("type", "TARGET"),
    getCheckedInParticipants(eventId),
  ]);
  if (targetTagsError) throw new Error("Não foi possível carregar suas oportunidades.");

  const targetSegments = targetTags
    .filter((assignment) => assignment.tags.category === "segmento")
    .map((assignment) => assignment.tags.name);
  return {
    hasTargetSegments: targetSegments.length > 0,
    opportunities: rankOpportunities(targetSegments, participants.filter((participant) => participant.id !== profileId)),
  };
}
