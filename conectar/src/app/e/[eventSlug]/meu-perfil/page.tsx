import { redirect } from "next/navigation";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getActiveTags, getOpenEventBySlug } from "@/lib/guest";
import { getEditableProfile } from "@/lib/participants";
import { MyProfileContent } from "@/components/profile/my-profile-content";

export default async function MyProfilePage({ params }: PageProps<"/e/[eventSlug]/meu-perfil">) {
  const { eventSlug } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);

  const [profile, tags] = await Promise.all([getEditableProfile(event.id, session.profileId), getActiveTags()]);
  if (!profile) redirect(`/e/${eventSlug}/entrar`);

  return <MyProfileContent eventSlug={event.slug} profile={profile} tags={tags} />;
}
