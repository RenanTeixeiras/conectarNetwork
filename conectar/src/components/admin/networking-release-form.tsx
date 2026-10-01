"use client";

import { useFormStatus } from "react-dom";
import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { setEventNetworkingRelease } from "@/actions/admin.actions";
import { Button } from "@/components/ui/primitives";

function SubmitButton({ released }: { released: boolean }) {
  const { pending } = useFormStatus();
  const Icon = released ? LockKeyhole : UnlockKeyhole;
  const label = released ? "Bloquear networking" : "Liberar networking";
  return <Button disabled={pending} type="submit" variant={released ? "secondary" : "primary"}>{pending ? "Salvando..." : label}<Icon className="size-5" /></Button>;
}

export function NetworkingReleaseForm({ eventId, released }: { eventId: string; released: boolean }) {
  return <form action={setEventNetworkingRelease} className="mt-4"><input type="hidden" name="eventId" value={eventId} /><input type="hidden" name="released" value={String(!released)} /><SubmitButton released={released} /></form>;
}
