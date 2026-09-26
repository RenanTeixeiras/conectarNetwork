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

  const { hasTargetSegments, opportunities } = await getOpportunities(event.id, session.profileId);
  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Oportunidades para você</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Pessoas presentes que correspondem ao público que você quer atender.</p>
        {!hasTargetSegments && <div className="mt-6 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><p className="font-semibold text-conectar-ink">Dados insuficientes para sugerir oportunidades.</p><p className="mt-1">Defina os segmentos do seu cliente ideal para receber sugestões mais precisas.</p></div>}
        {hasTargetSegments && !opportunities.length && <div className="mt-6 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><p className="font-semibold text-conectar-ink">Nenhuma correspondência no momento.</p><p className="mt-1">Ainda não há pessoas presentes que correspondam ao seu público-alvo.</p></div>}
        <div className="mt-6 space-y-3">{opportunities.map((opportunity) => <MatchCard key={opportunity.profile.id} eventSlug={event.slug} label={opportunity.label} profile={opportunity.profile} reason={opportunity.reason} />)}</div>
      </div>
      <BottomNavigation eventSlug={eventSlug} active="oportunidades" />
    </MobileShell>
  );
}
