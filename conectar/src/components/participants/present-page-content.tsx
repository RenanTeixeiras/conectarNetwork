"use client";

import { useDeferredValue, useState } from "react";
import { Search } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ParticipantRow } from "@/components/participants/participant-row";
import { Divider } from "@/components/ui/primitives";
import type { ParticipantProfile } from "@/types/profiles";

export function PresentPageContent({ eventSlug, firstName, participants }: { eventSlug: string; firstName: string; participants: ParticipantProfile[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("pt-BR"));
  const visibleProfiles = participants.filter((profile) => [profile.name, profile.profession, profile.company, profile.segment].filter(Boolean).join(" ").toLocaleLowerCase("pt-BR").includes(deferredQuery));
  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Olá, {firstName}! <span className="font-sans text-xl">👋</span></h1>
        <p className="mt-1 text-sm text-conectar-muted">{participants.length} {participants.length === 1 ? "pessoa está" : "pessoas estão"} presentes no encontro.</p>
        <label className="relative mt-6 block" htmlFor="participant-search"><Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 size-5 text-conectar-muted" /><input id="participant-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, profissão ou segmento..." className="h-12 w-full rounded-xl border border-conectar-border-soft bg-white pl-11 pr-3 text-base outline-none placeholder:text-sm placeholder:text-conectar-muted focus:border-conectar-green-700 focus:ring-2 focus:ring-conectar-green-100" /></label>
        <section className="mt-5" aria-label="Participantes presentes">
          {visibleProfiles.length ? visibleProfiles.map((profile, index) => <div key={profile.id}>{index > 0 && <Divider />}<ParticipantRow eventSlug={eventSlug} profile={profile} /></div>) : <div className="py-14 text-center"><p className="font-semibold text-conectar-ink">Nenhuma pessoa encontrada.</p><p className="mt-2 text-sm leading-5 text-conectar-muted">Tente outro nome, profissão ou segmento.</p></div>}
        </section>
      </div>
      <BottomNavigation eventSlug={eventSlug} active="presentes" />
    </MobileShell>
  );
}
