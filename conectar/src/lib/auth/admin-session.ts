import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "conectar_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

export type AdminSession = { authUserId: string; expiresAt: number; sessionVersion: 1; username: string };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET ?? process.env.GUEST_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET ou GUEST_SESSION_SECRET deve ter ao menos 32 caracteres.");
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function encode(session: AdminSession) {
  const value = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${value}.${sign(value)}`;
}

function decode(value: string): AdminSession | null {
  const [payload, signature, ...extra] = value.split(".");
  if (!payload || !signature || extra.length) return null;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    return session.sessionVersion === 1 && session.authUserId && session.username && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function createAdminSession(authUserId: string, username: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encode({ authUserId, expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000, sessionVersion: 1, username }), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAdminSession() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  return value ? decode(value) : null;
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
