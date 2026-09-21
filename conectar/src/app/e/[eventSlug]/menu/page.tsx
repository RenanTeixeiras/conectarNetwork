import Link from "next/link";
import { Info, LogOut, ShieldCheck, Users, UserRound, X, Handshake } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Divider } from "@/components/ui/primitives";

const links = [
  { key: "presentes", label: "Presentes", icon: Users },
  { key: "conexoes", label: "Conexões", icon: Handshake },
  { key: "meu-perfil", label: "Meu perfil", icon: UserRound },
];

export default async function MenuPage({ params }: PageProps<"/e/[eventSlug]/menu">) {
  const { eventSlug } = await params;
  return <MobileShell className="bg-conectar-green-900 px-5 text-white"><header className="flex items-center justify-between pt-[max(24px,env(safe-area-inset-top))]"><Logo inverse /><Link aria-label="Fechar menu" className="grid size-11 place-items-center rounded-lg" href={`/e/${eventSlug}/presentes`}><X className="size-5" /></Link></header><nav className="mt-14 space-y-2">{links.map(({ key, label, icon: Icon }) => <Link key={key} href={`/e/${eventSlug}/${key}`} className="flex min-h-12 items-center gap-4 rounded-xl px-2 text-base"><Icon className="size-5" />{label}</Link>)}<Divider className="my-6 bg-white/20" /><a className="flex min-h-12 items-center gap-4 rounded-xl px-2 text-base" href="#sobre"><Info className="size-5" />Sobre o Conectar</a><a className="flex min-h-12 items-center gap-4 rounded-xl px-2 text-base" href="#privacidade"><ShieldCheck className="size-5" />Termos e privacidade</a><Divider className="my-6 bg-white/20" /><button type="button" className="flex min-h-12 items-center gap-4 rounded-xl px-2 text-base"><LogOut className="size-5" />Sair</button></nav><footer className="mt-auto pb-[max(20px,env(safe-area-inset-bottom))] pt-8 text-center text-[10px] tracking-[0.18em] text-white/55">PESSOAS • IDEIAS • OPORTUNIDADES</footer></MobileShell>;
}
