import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY são obrigatórios.");

const admins = [
  { username: "renan", password: process.env.ADMIN_RENAN_PASSWORD },
  { username: "dani", password: process.env.ADMIN_DANI_PASSWORD },
];
if (admins.some((admin) => !admin.password || admin.password.length < 7)) {
  throw new Error("Defina ADMIN_RENAN_PASSWORD e ADMIN_DANI_PASSWORD com ao menos 7 caracteres.");
}

const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (listError) throw listError;

for (const admin of admins) {
  const email = `${admin.username}@admin.conectar.local`;
  const existing = listed.users.find((user) => user.email === email);
  const { data, error } = existing
    ? await supabase.auth.admin.updateUserById(existing.id, { email_confirm: true, password: admin.password })
    : await supabase.auth.admin.createUser({ email, email_confirm: true, password: admin.password });
  if (error || !data.user) throw error ?? new Error(`Não foi possível provisionar ${admin.username}.`);

  const { error: adminError } = await supabase.from("admin_users").upsert({ auth_user_id: data.user.id, is_active: true, role: "ADMIN", username: admin.username });
  if (adminError) throw adminError;
}

console.log("Usuários administrativos provisionados.");
