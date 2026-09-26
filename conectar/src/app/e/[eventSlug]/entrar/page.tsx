import { UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { GuestEntryForm } from "@/components/guest/guest-entry-form";
import { MobileShell } from "@/components/layout/mobile-shell";

export default async function EnterPage({ params }: PageProps<"/e/[eventSlug]/entrar">) {
  const { eventSlug } = await params;
  return (
    <MobileShell className="bg-conectar-warm-canvas px-5">
      <div className="flex flex-1 flex-col py-[max(24px,env(safe-area-inset-top))]">
        <div className="flex justify-center"><Logo /></div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="font-editorial text-4xl font-semibold leading-none text-conectar-ink">Bem-vindo!</h1>
          <p className="mt-3 text-base leading-6 text-conectar-ink-soft">Informe seu nome para entrar no encontro.</p>
          <GuestEntryForm eventSlug={eventSlug} />
        </div>
        <p className="mx-auto flex max-w-xs items-start gap-3 pb-4 text-sm leading-5 text-conectar-muted"><UserRound className="mt-0.5 size-4 shrink-0" />Primeira vez por aqui? Seu perfil será criado automaticamente.</p>
      </div>
    </MobileShell>
  );
}
