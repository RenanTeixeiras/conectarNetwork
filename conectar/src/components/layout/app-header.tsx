import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/primitives";

export function AppHeader({ eventSlug, name = "Renan Teixeira" }: { eventSlug: string; name?: string }) {
  return (
    <header className="flex items-center justify-between px-5 pb-6 pt-[max(20px,env(safe-area-inset-top))]">
      <Link aria-label="Abrir menu" href={`/e/${eventSlug}/menu`} className="flex min-h-11 items-center gap-2 rounded-lg">
        <Logo compact />
        <Menu aria-hidden="true" className="size-4 text-conectar-muted" />
      </Link>
      <Link aria-label="Abrir meu perfil" href={`/e/${eventSlug}/meu-perfil`}>
        <Avatar name={name} size="sm" />
      </Link>
    </header>
  );
}
