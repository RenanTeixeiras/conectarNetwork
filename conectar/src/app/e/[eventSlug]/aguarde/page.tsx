import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock3, UserRound } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { getGuestSession } from "@/lib/auth/guest-session";
import { getActiveProfileById, getOpenEventBySlug } from "@/lib/guest";

export default async function WaitForNetworkingPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  const [event, session] = await Promise.all([getOpenEventBySlug(eventSlug), getGuestSession()]);
  if (!event || !session || session.eventId !== event.id) redirect(`/e/${eventSlug}/entrar`);
  if (event.networking_released) redirect(`/e/${event.slug}/presentes`);
  const profile = await getActiveProfileById(session.profileId);
  if (!profile) redirect(`/e/${eventSlug}/entrar`);
  return <MobileShell className="bg-conectar-warm-canvas"><AppHeader eventSlug={event.slug} name={profile.first_name} /><div className="flex flex-1 items-center px-5 pb-8"><section className="w-full rounded-3xl border border-conectar-border-soft bg-white p-6 shadow-[0_12px_32px_rgba(20,45,30,0.08)]"><span className="grid size-14 place-items-center rounded-2xl bg-conectar-green-100 text-conectar-green-800"><Clock3 aria-hidden="true" className="size-7" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-conectar-green-700">Cadastro concluído</p><h1 className="mt-3 font-editorial text-4xl font-semibold leading-[0.95] text-conectar-ink">Você está na lista.</h1><p className="mt-5 text-base leading-6 text-conectar-ink-soft">A lista de presentes ficará disponível em breve.</p><p className="mt-3 text-sm leading-5 text-conectar-muted">Assim que a organização liberar a rede, você poderá conhecer os participantes e suas oportunidades.</p><Link href={`/e/${event.slug}/meu-perfil`} className="mt-8 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-conectar-green-800 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-conectar-green-900 active:bg-conectar-green-950"><UserRound aria-hidden="true" className="size-5" />Ver meu perfil</Link></section></div><BottomNavigation eventSlug={event.slug} active="aguarde" networkingReleased={false} /></MobileShell>;
}
