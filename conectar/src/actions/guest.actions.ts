"use server";

import { redirect } from "next/navigation";
import { createGuestSession } from "@/lib/auth/guest-session";
import { checkInExistingGuest, createGuestParticipant, findActiveProfilesByNormalizedName, getOpenEventBySlug, type GuestCandidate } from "@/lib/guest";
import { normalizeName } from "@/lib/normalization/name";
import { guestNameSchema, guestOnboardingSchema } from "@/lib/validation/guest";

export type GuestEntryState = {
  candidates?: GuestCandidate[];
  error?: string;
  firstName?: string;
  lastName?: string;
};

export type GuestOnboardingState = { error?: string };

function present(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

export async function identifyGuest(_: GuestEntryState, formData: FormData): Promise<GuestEntryState> {
  const parsed = guestNameSchema.safeParse({
    firstName: present(formData.get("firstName")),
    lastName: present(formData.get("lastName")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!event) return { error: "Este encontro não está disponível." };

  const normalizedName = normalizeName(parsed.data.firstName, parsed.data.lastName);
  const candidates = await findActiveProfilesByNormalizedName(normalizedName);
  if (!candidates.length) {
    redirect(`/e/${event.slug}/onboarding?nome=${encodeURIComponent(parsed.data.firstName)}&sobrenome=${encodeURIComponent(parsed.data.lastName)}`);
  }

  if (candidates.length > 1) {
    return { candidates, firstName: parsed.data.firstName, lastName: parsed.data.lastName };
  }

  const profileId = candidates[0]?.id;
  if (!profileId) return { error: "Não foi possível identificar seu perfil." };
  await checkInExistingGuest(event.id, profileId);
  await createGuestSession(event.id, profileId);
  redirect(`/e/${event.slug}/presentes`);
}

export async function selectExistingGuest(formData: FormData) {
  const parsed = guestNameSchema.safeParse({
    firstName: present(formData.get("firstName")),
    lastName: present(formData.get("lastName")),
  });
  if (!parsed.success) redirect(`/e/${present(formData.get("eventSlug"))}/entrar`);

  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!event) redirect(`/e/${eventSlug}`);

  const normalizedName = normalizeName(parsed.data.firstName, parsed.data.lastName);
  const candidates = await findActiveProfilesByNormalizedName(normalizedName);
  const profileId = present(formData.get("profileId"));
  if (!candidates.some((candidate) => candidate.id === profileId)) redirect(`/e/${event.slug}/entrar`);

  await checkInExistingGuest(event.id, profileId);
  await createGuestSession(event.id, profileId);
  redirect(`/e/${event.slug}/presentes`);
}

export async function completeGuestOnboarding(_: GuestOnboardingState, formData: FormData): Promise<GuestOnboardingState> {
  const parsed = guestOnboardingSchema.safeParse({
    city: present(formData.get("city")),
    company: present(formData.get("company")),
    firstName: present(formData.get("firstName")),
    instagram: present(formData.get("instagram")),
    lastName: present(formData.get("lastName")),
    linkedin: present(formData.get("linkedin")),
    offerTagIds: formData.getAll("offerTagIds"),
    profession: present(formData.get("profession")),
    segment: present(formData.get("segment")),
    shareContacts: formData.get("shareContacts") === "on",
    targetAudience: present(formData.get("targetAudience")),
    targetTagIds: formData.getAll("targetTagIds"),
    whatsapp: present(formData.get("whatsapp")),
    whatIDo: present(formData.get("whatIDo")),
    whatIOffer: present(formData.get("whatIOffer")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!event) return { error: "Este encontro não está disponível." };

  const input = parsed.data;
  let profileId: string;
  try {
    profileId = await createGuestParticipant(event.id, {
      ...input,
      normalizedName: normalizeName(input.firstName, input.lastName),
      shareInstagram: input.shareContacts && Boolean(input.instagram),
      shareLinkedin: input.shareContacts && Boolean(input.linkedin),
      shareWhatsapp: input.shareContacts && Boolean(input.whatsapp),
    });
  } catch {
    return { error: "Não foi possível concluir seu cadastro. Tente novamente." };
  }

  await createGuestSession(event.id, profileId);
  redirect(`/e/${event.slug}/presentes`);
}
