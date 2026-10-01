"use server";

import { redirect } from "next/navigation";
import { createGuestSession, getGuestSession } from "@/lib/auth/guest-session";
import { checkInExistingGuest, createGuestParticipant, findActiveProfilesByNormalizedName, getActiveTags, getOpenEventBySlug, updateGuestProfile, type GuestCandidate } from "@/lib/guest";
import { normalizeName } from "@/lib/normalization/name";
import { removeProfilePhoto, saveProfilePhoto } from "@/lib/profile-photo";
import { guestNameSchema, guestOnboardingSchema, profileUpdateSchema } from "@/lib/validation/guest";

export type GuestEntryState = {
  candidates?: GuestCandidate[];
  error?: string;
  firstName?: string;
  lastName?: string;
};

export type GuestOnboardingState = { error?: string };
export type ProfileUpdateState = { error?: string };
export type ProfilePhotoState = { error?: string };

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
  redirect(`/e/${event.slug}/${event.networking_released ? "presentes" : "aguarde"}`);
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
  const photo = formData.get("photo");
  let photoFailed = false;
  if (photo instanceof File && photo.size) {
    try {
      await saveProfilePhoto(profileId, photo);
    } catch {
      photoFailed = true;
    }
  }

  await createGuestSession(event.id, profileId);
  redirect(`/e/${event.slug}/${event.networking_released ? "presentes" : "aguarde"}${photoFailed ? "?foto=erro" : ""}`);
}

export async function completeGuestOnboarding(_: GuestOnboardingState, formData: FormData): Promise<GuestOnboardingState> {
  const parsed = guestOnboardingSchema.safeParse({
    city: present(formData.get("city")),
    company: present(formData.get("company")),
    firstName: present(formData.get("firstName")),
    instagram: present(formData.get("instagram")),
    lastName: present(formData.get("lastName")),
    linkedin: present(formData.get("linkedin")),
    profession: present(formData.get("profession")),
    segment: present(formData.get("segment")),
    shareContacts: formData.get("shareContacts") === "on",
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
  const activeTags = await getActiveTags();
  if (!input.targetTagIds.every((tagId) => activeTags.some((tag) => tag.id === tagId && tag.category === "segmento"))) {
    return { error: "Selecione segmentos válidos dos clientes que você atende." };
  }
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
  redirect(`/e/${event.slug}/${event.networking_released ? "presentes" : "aguarde"}`);
}

export async function updateMyProfile(_: ProfileUpdateState, formData: FormData): Promise<ProfileUpdateState> {
  const session = await getGuestSession();
  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!session || !event || session.eventId !== event.id) return { error: "Sua sessão não é válida para este encontro." };

  const parsed = profileUpdateSchema.safeParse({
    city: present(formData.get("city")),
    company: present(formData.get("company")),
    instagram: present(formData.get("instagram")),
    linkedin: present(formData.get("linkedin")),
    profession: present(formData.get("profession")),
    segment: present(formData.get("segment")),
    shareContacts: formData.get("shareContacts") === "on",
    targetTagIds: formData.getAll("targetTagIds"),
    whatsapp: present(formData.get("whatsapp")),
    whatIDo: present(formData.get("whatIDo")),
    whatIOffer: present(formData.get("whatIOffer")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const input = parsed.data;
  const activeTags = await getActiveTags();
  if (!input.targetTagIds.every((tagId) => activeTags.some((tag) => tag.id === tagId && tag.category === "segmento"))) {
    return { error: "Selecione segmentos válidos dos clientes que você atende." };
  }

  try {
    await updateGuestProfile(event.id, session.profileId, {
      ...input,
      shareInstagram: input.shareContacts && Boolean(input.instagram),
      shareLinkedin: input.shareContacts && Boolean(input.linkedin),
      shareWhatsapp: input.shareContacts && Boolean(input.whatsapp),
    });
  } catch {
    return { error: "Não foi possível atualizar seu perfil. Tente novamente." };
  }

  redirect(`/e/${event.slug}/meu-perfil`);
}

export async function uploadMyProfilePhoto(_: ProfilePhotoState, formData: FormData): Promise<ProfilePhotoState> {
  const session = await getGuestSession();
  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!session || !event || session.eventId !== event.id) return { error: "Sua sessão não é válida para este encontro." };

  const photo = formData.get("photo");
  if (!(photo instanceof File)) return { error: "Escolha uma foto para enviar." };
  try {
    await saveProfilePhoto(session.profileId, photo);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível enviar sua foto." };
  }

  redirect(`/e/${event.slug}/meu-perfil`);
}

export async function removeMyProfilePhoto(formData: FormData) {
  const session = await getGuestSession();
  const eventSlug = present(formData.get("eventSlug"));
  const event = await getOpenEventBySlug(eventSlug);
  if (!session || !event || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);

  await removeProfilePhoto(session.profileId);
  redirect(`/e/${event.slug}/meu-perfil`);
}
