import Link from "next/link";
import type { Profile } from "@/data/mock-event";
import { Avatar, Button, Chip } from "@/components/ui/primitives";

export function MatchCard({ eventSlug, profile, score, reason }: { eventSlug: string; profile: Profile; score: number; reason: string }) {
  return (
    <article className="rounded-2xl border bg-white p-4">
      <div className="flex items-start gap-3">
        <Avatar name={profile.name} />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-conectar-ink">{profile.name}</h2>
          <p className="text-sm text-conectar-ink-soft">{profile.profession}</p>
          {profile.company && <p className="text-sm text-conectar-muted">{profile.company}</p>}
          <p className="mt-1 text-sm font-semibold text-conectar-green-700">{score}% de compatibilidade</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">{profile.tags.slice(0, 3).map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
      <p className="mt-4 text-sm leading-5 text-conectar-ink-soft">{reason}</p>
      <Link className="mt-4 block" href={`/e/${eventSlug}/pessoas/${profile.id}`}><Button className="h-11" type="button">Ver perfil</Button></Link>
    </article>
  );
}
