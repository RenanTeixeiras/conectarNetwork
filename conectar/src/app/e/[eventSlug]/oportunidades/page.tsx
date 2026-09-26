import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { MatchCard } from "@/components/matching/match-card";
import { profiles } from "@/data/mock-event";

const opportunities = [
  { profile: profiles[1], score: 92, reason: "Carlos trabalha com empresas em crescimento que podem se beneficiar de automação e sistemas." },
  { profile: profiles[0], score: 87, reason: "Marina conduz projetos e obras que podem ganhar eficiência com soluções digitais." },
  { profile: profiles[4], score: 78, reason: "Rafael desenvolve negócios e pode se beneficiar de processos e ferramentas digitais." },
];

export default async function OpportunitiesPage({ params }: PageProps<"/e/[eventSlug]/oportunidades">) {
  const { eventSlug } = await params;
  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Oportunidades para você</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Pessoas presentes que podem se beneficiar do que você oferece.</p>
        <div className="mt-6 space-y-3">{opportunities.map((opportunity) => <MatchCard key={opportunity.profile.id} eventSlug={eventSlug} {...opportunity} />)}</div>
      </div>
      <BottomNavigation eventSlug={eventSlug} active="oportunidades" />
    </MobileShell>
  );
}
