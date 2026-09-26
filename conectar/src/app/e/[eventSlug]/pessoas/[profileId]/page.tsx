import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getOpenEventBySlug } from "@/lib/guest";
import { getCheckedInPublicProfile } from "@/lib/participants";

export default async function PersonPage({ params }: PageProps<"/e/[eventSlug]/pessoas/[profileId]">) {
  const { eventSlug, profileId } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);

  const profile = await getCheckedInPublicProfile(event.id, profileId);
  if (!profile) notFound();
  return <MobileShell className="px-5 pb-10 pt-[max(16px,env(safe-area-inset-top))]"><Link href={`/e/${eventSlug}/presentes`} aria-label="Voltar para presentes" className="grid size-11 place-items-center rounded-lg"><ArrowLeft className="size-5" /></Link><div className="pt-4"><ProfileView profile={profile} /></div></MobileShell>;
}
