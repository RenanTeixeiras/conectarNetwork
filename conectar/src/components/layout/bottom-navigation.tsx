"use client";

import Link from "next/link";
import { Handshake, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "presentes", label: "Presentes", icon: Users },
  { href: "conexoes", label: "Conexões", icon: Handshake },
  { href: "meu-perfil", label: "Meu perfil", icon: UserRound },
];

export function BottomNavigation({ eventSlug, active }: { eventSlug: string; active: string }) {
  return (
    <nav aria-label="Navegação principal" className="sticky bottom-0 z-20 mt-auto border-t border-conectar-border-soft bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_20px_rgba(20,45,30,0.05)] backdrop-blur-sm">
      <div className="flex justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const isActive = active === href;
          return (
            <Link key={href} href={`/e/${eventSlug}/${href}`} className={cn("flex min-h-14 min-w-20 flex-col items-center justify-center gap-1 rounded-lg px-3 text-[11px] transition-colors", isActive ? "font-semibold text-conectar-green-800" : "text-conectar-muted")}>
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
