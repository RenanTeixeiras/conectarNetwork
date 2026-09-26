import { notFound, redirect } from "next/navigation";
import { GuestOnboardingForm } from "@/components/guest/guest-onboarding-form";
import { MobileShell } from "@/components/layout/mobile-shell";
import { getActiveTags, getOpenEventBySlug } from "@/lib/guest";
import { guestNameSchema } from "@/lib/validation/guest";

type SearchValues = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function OnboardingPage({ params, searchParams }: PageProps<"/e/[eventSlug]/onboarding">) {
  const { eventSlug } = await params;
  const values = (await searchParams) as SearchValues;
  const name = guestNameSchema.safeParse({ firstName: firstValue(values.nome), lastName: firstValue(values.sobrenome) });
  if (!name.success) redirect(`/e/${eventSlug}/entrar`);

  const event = await getOpenEventBySlug(eventSlug);
  if (!event) notFound();
  const tags = await getActiveTags();

  return <MobileShell className="bg-conectar-canvas"><GuestOnboardingForm eventSlug={event.slug} firstName={name.data.firstName} lastName={name.data.lastName} tags={tags} /></MobileShell>;
}
