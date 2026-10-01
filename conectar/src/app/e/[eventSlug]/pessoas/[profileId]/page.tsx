import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getActiveProfileById, getOpenEventBySlug } from "@/lib/guest";
import { getCheckedInPublicProfile } from "@/lib/participants";

export default async function PersonPage({ params }: PageProps<"/e/[eventSlug]/pessoas/[profileId]">) {
  const { eventSlug, profileId } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);
  if (!event.networking_released) redirect(`/e/${event.slug}/aguarde`);

  const contactProfile = await getActiveProfileById(session.profileId);
  if (!contactProfile) redirect(`/e/${eventSlug}/entrar`);

  const description = contactProfile.what_i_do_and_offer?.trim();
  const contactMessage = description
    ? `Olá, vi você no grupo Conectar, trabalho com ${description} e queria bater um papo.`
    : "Olá, vi você no grupo Conectar e queria bater um papo.";
  const profile = await getCheckedInPublicProfile(event.id, profileId, contactMessage);
  if (!profile) notFound();
  return <MobileShell className="px-5 pb-10 pt-[max(16px,env(safe-area-inset-top))]"><Link href={`/e/${eventSlug}/presentes`} aria-label="Voltar para presentes" className="grid size-11 place-items-center rounded-lg"><ArrowLeft className="size-5" /></Link><div className="pt-4"><ProfileView profile={profile} /></div></MobileShell>;
}
