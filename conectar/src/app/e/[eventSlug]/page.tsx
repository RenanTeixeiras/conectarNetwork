import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileShell } from "@/components/layout/mobile-shell";
import { getEventBySlug } from "@/lib/events";

function formatEventStart(startsAt: string | null, timezone: string) {
  if (!startsAt) return "Data a confirmar";

  const date = new Date(startsAt);
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(date);
  const hour = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  }).format(date);

  return `${formattedDate} às ${hour}h`;
}

export default async function EventLanding({ params }: PageProps<"/e/[eventSlug]">) {
  const { eventSlug } = await params;
  const event = await getEventBySlug(eventSlug);

  if (!event) notFound();

  const isOpen = event.status === "OPEN";
  return (
    <MobileShell className="bg-conectar-green-800 px-5 text-white">
      <div className="flex flex-1 flex-col justify-between py-[max(40px,env(safe-area-inset-top))]">
        <div className="flex justify-center"><Logo inverse className="scale-110" /></div>
        <div className="space-y-7">
          <p className="font-editorial text-[38px] font-semibold leading-[1.08]">Pessoas certas em conversas que geram futuro.</p>
          <div className="space-y-3 border-y border-white/20 py-5 text-sm text-white/85">
            <p className="flex items-center gap-2"><CalendarDays className="size-4" /> {formatEventStart(event.starts_at, event.timezone)}</p>
            {event.venue_name && <p className="flex items-center gap-2"><MapPin className="size-4" /> {event.venue_name}</p>}
          </div>
          {isOpen ? (
            <Link href={`/e/${eventSlug}/entrar`} className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-conectar-green-800 transition-colors hover:bg-conectar-green-50">Entrar no Conectar <ArrowRight className="size-5" /></Link>
          ) : (
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm leading-5 text-white/85">
              <p className="font-semibold text-white">Este encontro não está disponível.</p>
              <p className="mt-1">Aguarde a abertura ou entre em contato com a organização.</p>
            </div>
          )}
        </div>
        <p className="text-center text-[10px] tracking-[0.18em] text-white/60">NETWORK • IDEIAS • OPORTUNIDADES</p>
      </div>
    </MobileShell>
  );
}
