import Link from "next/link";
import { Avatar, Button } from "@/components/ui/primitives";
import type { ParticipantProfile } from "@/types/profiles";

export function MatchCard({ eventSlug, profile, label, reason }: { eventSlug: string; label: string; profile: ParticipantProfile; reason: string }) {
  return (
    <article className="rounded-2xl border bg-white p-4">
      <div className="flex items-start gap-3">
         <Avatar name={profile.name} photoUrl={profile.photoUrl} />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-conectar-ink">{profile.name}</h2>
           {profile.profession && <p className="text-sm text-conectar-ink-soft">{profile.profession}</p>}
           {profile.company && <p className="text-sm text-conectar-muted">{profile.company}</p>}
           <p className="mt-1 text-sm font-semibold text-conectar-green-700">{label}</p>
        </div>
      </div>
       <p className="mt-4 text-sm leading-5 text-conectar-ink-soft">{reason}</p>
      <Link className="mt-4 block" href={`/e/${eventSlug}/pessoas/${profile.id}`}><Button className="h-11" type="button">Ver perfil</Button></Link>
    </article>
  );
}
