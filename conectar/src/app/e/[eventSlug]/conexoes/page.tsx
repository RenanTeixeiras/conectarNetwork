import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { MatchCard } from "@/components/matching/match-card";
import { profiles } from "@/data/mock-event";

const matches = [
  { profile: profiles[1], score: 92, reason: "Carlos procura automação e você atua com esse tipo de solução." },
  { profile: profiles[0], score: 87, reason: "Marina procura tecnologia e você pode ajudar com automação." },
  { profile: profiles[4], score: 78, reason: "Vocês têm interesses em comum em tecnologia e parcerias." },
];

export default async function ConnectionsPage({ params }: PageProps<"/e/[eventSlug]/conexoes">) {
  const { eventSlug } = await params;
  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Conexões para você</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Pessoas que podem fazer sentido para o que você procura.</p>
        <div className="mt-6 space-y-3">{matches.map((match) => <MatchCard key={match.profile.id} eventSlug={eventSlug} {...match} />)}</div>
      </div>
      <BottomNavigation eventSlug={eventSlug} active="conexoes" />
    </MobileShell>
  );
}
