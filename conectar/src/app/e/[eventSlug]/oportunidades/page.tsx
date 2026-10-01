import { redirect } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { MatchCard } from "@/components/matching/match-card";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getOpenEventBySlug } from "@/lib/guest";
import { getOpportunities } from "@/lib/participants";

export default async function OpportunitiesPage({ params }: PageProps<"/e/[eventSlug]/oportunidades">) {
  const { eventSlug } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);
  if (!event.networking_released) redirect(`/e/${event.slug}/aguarde`);

  const { hasTargetSegments, opportunities } = await getOpportunities(event.id, session.profileId);
  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Oportunidades para você</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Sugestões baseadas nas áreas com as quais você gostaria de se conectar.</p>
        {!hasTargetSegments && <div className="mt-6 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><p className="font-semibold text-conectar-ink">Selecione áreas de interesse no seu perfil.</p><p className="mt-1">Assim, poderemos sugerir participantes que atuam nessas áreas.</p></div>}
        {hasTargetSegments && !opportunities.length && <div className="mt-6 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><p className="font-semibold text-conectar-ink">Nenhuma sugestão no momento.</p><p className="mt-1">Continue explorando a lista de presentes para encontrar novas conexões.</p></div>}
        <div className="mt-6 space-y-3">{opportunities.map((opportunity) => <MatchCard key={opportunity.profile.id} eventSlug={event.slug} label={opportunity.label} profile={opportunity.profile} reason={opportunity.reason} />)}</div>
      </div>
      <BottomNavigation eventSlug={eventSlug} active="oportunidades" />
    </MobileShell>
  );
}
