import { redirect } from "next/navigation";
import { LogOut, SlidersHorizontal } from "lucide-react";
import { logoutAdmin } from "@/actions/admin.actions";
import { ManagedEventCard } from "@/components/admin/managed-event-card";
import { Logo } from "@/components/brand/logo";
import { getActiveAdmin, getManagedEvents } from "@/lib/admin";
import { getAdminSession } from "@/lib/auth/admin-session";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session || !(await getActiveAdmin(session.authUserId, session.username))) redirect("/gerencial/entrar");
  const events = await getManagedEvents();
  return <main className="min-h-dvh bg-conectar-canvas px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(24px,env(safe-area-inset-top))]"><div className="mx-auto max-w-2xl"><header className="flex items-center justify-between"><Logo compact /><form action={logoutAdmin}><button type="submit" className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-conectar-ink-soft transition-colors hover:bg-conectar-green-50"><LogOut aria-hidden="true" className="size-4" />Sair</button></form></header><section className="mt-10"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-conectar-green-100 text-conectar-green-800"><SlidersHorizontal aria-hidden="true" className="size-5" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-conectar-green-700">Organização</p><h1 className="font-editorial text-3xl font-semibold text-conectar-ink">Olá, {session.username}</h1></div></div><p className="mt-5 max-w-xl text-sm leading-5 text-conectar-muted">Acompanhe os eventos e decida quando participantes podem começar a se conectar.</p></section><section className="mt-8 space-y-4" aria-label="Eventos"><h2 className="text-sm font-semibold text-conectar-ink">Eventos</h2>{events.length ? events.map((event) => <ManagedEventCard key={event.id} event={event} />) : <div className="rounded-2xl border border-dashed border-conectar-border bg-white p-6 text-sm leading-5 text-conectar-muted">Nenhum evento cadastrado ainda.</div>}</section></div></main>;
}
