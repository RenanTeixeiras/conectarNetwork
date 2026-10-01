"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createAdminSession, clearAdminSession, getAdminSession } from "@/lib/auth/admin-session";
import { getActiveAdmin } from "@/lib/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type AdminLoginState = { error?: string };

function value(formData: FormData, name: string) {
  const item = formData.get(name);
  return typeof item === "string" ? item.trim() : "";
}

function adminEmail(username: string) {
  return `${username}@admin.conectar.local`;
}

function createPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("As credenciais públicas do Supabase não estão configuradas.");
  return createClient<Database>(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function loginAdmin(_: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const username = value(formData, "username").toLowerCase();
  const password = value(formData, "password");
  if (!/^[a-z0-9][a-z0-9_-]{1,39}$/.test(username) || !password) return { error: "Informe seu usuário e senha." };

  try {
    const { data, error } = await createPublicSupabaseClient().auth.signInWithPassword({ email: adminEmail(username), password });
    if (error || !data.user) return { error: "Usuário ou senha inválidos." };
    const admin = await getActiveAdmin(data.user.id, username);
    if (!admin) return { error: "Usuário ou senha inválidos." };
    await createAdminSession(data.user.id, username);
  } catch {
    return { error: "Não foi possível iniciar sua sessão. Tente novamente." };
  }
  redirect("/gerencial");
}

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("Acesso não autorizado.");
  const admin = await getActiveAdmin(session.authUserId, session.username);
  if (!admin) throw new Error("Acesso não autorizado.");
  return session;
}

export async function setEventNetworkingRelease(formData: FormData) {
  await requireAdmin();
  const eventId = value(formData, "eventId");
  const released = value(formData, "released") === "true";
  if (!eventId) throw new Error("Evento inválido.");

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("events").update({ networking_released: released }).eq("id", eventId);
  if (error) throw new Error("Não foi possível atualizar a liberação do evento.");
  redirect("/gerencial");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/gerencial/entrar");
}
