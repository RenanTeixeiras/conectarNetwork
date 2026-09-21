import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileShell } from "@/components/layout/mobile-shell";
import { event } from "@/data/mock-event";

export default async function EventLanding({ params }: PageProps<"/e/[eventSlug]">) {
  const { eventSlug } = await params;
  return (
    <MobileShell className="bg-conectar-green-800 px-5 text-white">
      <div className="flex flex-1 flex-col justify-between py-[max(40px,env(safe-area-inset-top))]">
        <div className="flex justify-center"><Logo inverse className="scale-110" /></div>
        <div className="space-y-7">
          <p className="font-editorial text-[38px] font-semibold leading-[1.08]">Pessoas certas em conversas que geram futuro.</p>
          <div className="space-y-3 border-y border-white/20 py-5 text-sm text-white/85">
            <p className="flex items-center gap-2"><CalendarDays className="size-4" /> {event.date}</p>
            <p className="flex items-center gap-2"><MapPin className="size-4" /> {event.place}</p>
          </div>
          <Link href={`/e/${eventSlug}/entrar`} className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-conectar-green-800 transition-colors hover:bg-conectar-green-50">Entrar no Conectar <ArrowRight className="size-5" /></Link>
        </div>
        <p className="text-center text-[10px] tracking-[0.18em] text-white/60">NETWORK • IDEIAS • OPORTUNIDADES</p>
      </div>
    </MobileShell>
  );
}
