import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobileShell({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto flex min-h-dvh w-full max-w-[520px] flex-1 flex-col bg-conectar-canvas", className)}>{children}</main>;
}
