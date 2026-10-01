import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Logo } from "@/components/brand/logo";
import { getAdminSession } from "@/lib/auth/admin-session";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/gerencial");
  return <main className="flex min-h-dvh bg-conectar-warm-canvas px-5 py-[max(24px,env(safe-area-inset-top))]"><div className="mx-auto flex w-full max-w-sm flex-col py-8"><Logo /><div className="mt-auto rounded-3xl border border-conectar-border-soft bg-white p-6 shadow-[0_12px_32px_rgba(20,45,30,0.08)]"><span className="grid size-12 place-items-center rounded-2xl bg-conectar-green-100 text-conectar-green-800"><ShieldCheck aria-hidden="true" className="size-6" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-conectar-green-700">Área restrita</p><h1 className="mt-2 font-editorial text-4xl font-semibold leading-none text-conectar-ink">Gerencial</h1><p className="mt-3 text-sm leading-5 text-conectar-muted">Acesse para acompanhar participantes e liberar a rede de cada encontro.</p><AdminLoginForm /></div><p className="mt-6 text-center text-xs text-conectar-muted">Acesso exclusivo da organização Conectar.</p></div></main>;
}
