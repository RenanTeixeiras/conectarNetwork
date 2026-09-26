import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

function requiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SECRET_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  return value;
}

/**
 * Cliente privilegiado exclusivo para Server Components, Actions e serviços.
 * Nunca importe este módulo em componentes de cliente.
 */
export function createServerSupabaseClient() {
  return createClient<Database>(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SECRET_KEY"),
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
