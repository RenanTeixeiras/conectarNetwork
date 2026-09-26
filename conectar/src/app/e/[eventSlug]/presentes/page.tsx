import { redirect } from "next/navigation";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getActiveProfileById, getOpenEventBySlug } from "@/lib/guest";
import { PresentPageContent } from "@/components/participants/present-page-content";

export default async function PresentPage({ params }: PageProps<"/e/[eventSlug]/presentes">) {
  const { eventSlug } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);

  const profile = await getActiveProfileById(session.profileId);
  if (!profile) redirect(`/e/${eventSlug}/entrar`);

  return <PresentPageContent eventSlug={event.slug} firstName={profile.first_name} />;
}
