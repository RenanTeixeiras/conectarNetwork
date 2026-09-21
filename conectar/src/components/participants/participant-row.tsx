import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Profile } from "@/data/mock-event";
import { Avatar } from "@/components/ui/primitives";

export function ParticipantRow({ eventSlug, profile }: { eventSlug: string; profile: Profile }) {
  return (
    <Link href={`/e/${eventSlug}/pessoas/${profile.id}`} className="flex min-h-[72px] items-center gap-3 py-3 transition-colors hover:bg-conectar-green-50">
      <Avatar name={profile.name} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-conectar-ink">{profile.name}</p>
        <p className="truncate text-sm text-conectar-ink-soft">{profile.profession}</p>
        {profile.company && <p className="truncate text-sm text-conectar-muted">{profile.company}</p>}
      </div>
      <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-conectar-muted" />
    </Link>
  );
}
