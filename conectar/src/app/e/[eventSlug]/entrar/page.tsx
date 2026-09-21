import { ArrowRight, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button, TextField } from "@/components/ui/primitives";

export default async function EnterPage({ params }: PageProps<"/e/[eventSlug]/entrar">) {
  const { eventSlug } = await params;
  return (
    <MobileShell className="bg-conectar-warm-canvas px-5">
      <div className="flex flex-1 flex-col py-[max(24px,env(safe-area-inset-top))]">
        <div className="flex justify-center"><Logo /></div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="font-editorial text-4xl font-semibold leading-none text-conectar-ink">Bem-vindo!</h1>
          <p className="mt-3 text-base leading-6 text-conectar-ink-soft">Informe seu nome para entrar no encontro.</p>
          <form className="mt-9 space-y-5" action={`/e/${eventSlug}/onboarding`} method="get">
            <TextField label="Nome" name="nome" placeholder="Seu nome" autoComplete="given-name" required />
            <TextField label="Sobrenome" name="sobrenome" placeholder="Seu sobrenome" autoComplete="family-name" required />
            <Button type="submit">Entrar no Conectar <ArrowRight className="size-5" /></Button>
          </form>
        </div>
        <p className="mx-auto flex max-w-xs items-start gap-3 pb-4 text-sm leading-5 text-conectar-muted"><UserRound className="mt-0.5 size-4 shrink-0" />Primeira vez por aqui? Seu perfil será criado automaticamente.</p>
      </div>
    </MobileShell>
  );
}
