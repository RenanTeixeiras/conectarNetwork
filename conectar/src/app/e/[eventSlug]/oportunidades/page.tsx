import { redirect } from "next/navigation";
import { getOpenEventBySlug } from "@/lib/guest";

export default async function OpportunitiesPage({ params }: PageProps<"/e/[eventSlug]/oportunidades">) {
  const { eventSlug } = await params;
  const event = await getOpenEventBySlug(eventSlug);
  redirect(`/e/${event?.slug ?? eventSlug}/presentes`);
}
