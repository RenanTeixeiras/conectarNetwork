"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn, initials } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-conectar-green-800 text-white hover:bg-conectar-green-900 active:bg-conectar-green-950",
    secondary: "border border-conectar-green-800 bg-white text-conectar-green-800 hover:bg-conectar-green-50",
    ghost: "bg-transparent text-conectar-green-800 hover:bg-conectar-green-50",
  };
  return (
    <button
      className={cn("flex h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-[#d7dfd9] disabled:text-[#8a948d]", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export function TextField({ label, error, className, id, ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="block space-y-2" htmlFor={fieldId}>
      <span className="text-[13px] font-medium text-conectar-ink-soft">{label}</span>
      <input
        className={cn("h-[52px] w-full rounded-xl border bg-white px-3.5 text-base text-conectar-ink outline-none placeholder:text-conectar-muted-light focus:border-conectar-green-700 focus:ring-2 focus:ring-conectar-green-100", error && "border-[#b94a48]", className)}
        id={fieldId}
        {...props}
      />
      {error && <span className="block text-xs text-[#b94a48]">{error}</span>}
    </label>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; helper?: string };

export function TextareaField({ label, helper, className, id, ...props }: TextareaFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="block space-y-2" htmlFor={fieldId}>
      <span className="text-[13px] font-medium text-conectar-ink-soft">{label}</span>
      <textarea
        className={cn("min-h-28 w-full rounded-xl border bg-white px-3.5 py-3 text-base text-conectar-ink outline-none placeholder:text-conectar-muted-light focus:border-conectar-green-700 focus:ring-2 focus:ring-conectar-green-100 md:resize-y", className)}
        id={fieldId}
        {...props}
      />
      {helper && <span className="block text-xs leading-4 text-conectar-muted">{helper}</span>}
    </label>
  );
}

export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[13px] font-medium text-conectar-ink-soft">{label}</span>
      <span className="relative block">
        <select className="h-[52px] w-full appearance-none rounded-xl border bg-white px-3.5 text-base text-conectar-ink outline-none focus:border-conectar-green-700 focus:ring-2 focus:ring-conectar-green-100" {...props}>
          {children}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-4 size-5 text-conectar-muted" />
      </span>
    </label>
  );
}

export function Chip({ children, selected = false, onClick }: { children: ReactNode; selected?: boolean; onClick?: () => void }) {
  const content = <span className={cn("inline-flex min-h-7 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", selected ? "bg-conectar-green-800 text-white" : "bg-conectar-green-50 text-conectar-green-800")}>{selected && <Check className="size-3" aria-hidden="true" />}{children}</span>;
  return onClick ? <button type="button" onClick={onClick}>{content}</button> : content;
}

export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = { sm: "size-9 text-xs", md: "size-12 text-sm", lg: "size-[72px] text-xl", xl: "size-24 text-2xl" };
  return <div aria-label={`Foto de ${name}`} className={cn("grid shrink-0 place-items-center rounded-full bg-conectar-green-100 font-semibold text-conectar-green-800", sizes[size], className)}>{initials(name)}</div>;
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-conectar-border-soft", className)} />;
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded bg-conectar-green-50", className)} />;
}

export function Sheet({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 flex items-end bg-conectar-ink/30" role="dialog" aria-modal="true" aria-label={title}><button type="button" aria-label="Fechar painel" className="absolute inset-0" onClick={onClose} /><section className="relative w-full rounded-t-3xl bg-white p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(20,45,30,0.12)]"><div className="mx-auto mb-5 h-1 w-9 rounded-full bg-conectar-border" /><div className="flex items-center justify-between"><h2 className="font-editorial text-2xl font-semibold text-conectar-ink">{title}</h2><button type="button" aria-label="Fechar painel" className="grid size-11 place-items-center" onClick={onClose}><X className="size-5" /></button></div><div className="mt-5">{children}</div></section></div>;
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div role="status" className="fixed bottom-24 left-1/2 z-30 flex w-[calc(100%-40px)] max-w-[480px] -translate-x-1/2 items-center justify-between rounded-xl bg-conectar-green-900 px-4 py-3 text-sm text-white shadow-lg"><span>{message}</span><button aria-label="Fechar mensagem" className="grid size-8 place-items-center" onClick={onClose}><X className="size-4" /></button></div>;
}
