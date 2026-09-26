"use client";

import Link from "next/link";
import { useActionState } from "react";
import { identifyGuest, selectExistingGuest, type GuestEntryState } from "@/actions/guest.actions";
import { Button, TextField } from "@/components/ui/primitives";

const initialState: GuestEntryState = {};

export function GuestEntryForm({ eventSlug }: { eventSlug: string }) {
  const [state, formAction, isPending] = useActionState(identifyGuest, initialState);

  if (state.candidates?.length) {
    const onboardingUrl = `/e/${eventSlug}/onboarding?nome=${encodeURIComponent(state.firstName ?? "")}&sobrenome=${encodeURIComponent(state.lastName ?? "")}`;
    return (
      <div className="mt-9 space-y-4">
        <div>
          <h2 className="font-editorial text-2xl font-semibold text-conectar-ink">Qual destas pessoas é você?</h2>
          <p className="mt-2 text-sm leading-5 text-conectar-muted">Encontramos mais de um perfil com este nome.</p>
        </div>
        <form action={selectExistingGuest} className="space-y-3">
          <input type="hidden" name="eventSlug" value={eventSlug} />
          <input type="hidden" name="firstName" value={state.firstName} />
          <input type="hidden" name="lastName" value={state.lastName} />
          {state.candidates.map((candidate) => (
            <button key={candidate.id} type="submit" name="profileId" value={candidate.id} className="w-full rounded-xl border border-conectar-border-soft bg-white p-4 text-left transition-colors hover:border-conectar-green-700 hover:bg-conectar-green-50">
              <span className="block font-semibold text-conectar-ink">{candidate.firstName} {candidate.lastName}</span>
              <span className="mt-1 block text-sm text-conectar-muted">{[candidate.profession, candidate.company].filter(Boolean).join(" • ") || "Perfil profissional"}</span>
            </button>
          ))}
        </form>
        <Link href={onboardingUrl} className="flex h-12 items-center justify-center rounded-xl border border-conectar-green-800 text-sm font-semibold text-conectar-green-800">Sou outra pessoa</Link>
      </div>
    );
  }

  return (
    <form className="mt-9 space-y-5" action={formAction}>
      <input type="hidden" name="eventSlug" value={eventSlug} />
      <TextField label="Nome" name="firstName" placeholder="Seu nome" autoComplete="given-name" required />
      <TextField label="Sobrenome" name="lastName" placeholder="Seu sobrenome" autoComplete="family-name" required />
      {state.error && <p role="alert" className="text-sm text-[#b94a48]">{state.error}</p>}
      <Button type="submit" disabled={isPending}>Entrar no Conectar</Button>
    </form>
  );
}
