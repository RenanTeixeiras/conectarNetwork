"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/actions/admin.actions";
import { Button, TextField } from "@/components/ui/primitives";

const initialState: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);
  return <form action={formAction} className="mt-8 space-y-5"><TextField autoComplete="username" label="Usuário" name="username" required /><TextField autoComplete="current-password" label="Senha" name="password" required type="password" />{state.error && <p role="alert" className="text-sm text-[#b94a48]">{state.error}</p>}<Button disabled={pending} type="submit">{pending ? "Entrando..." : "Entrar na gerencial"}</Button></form>;
}
