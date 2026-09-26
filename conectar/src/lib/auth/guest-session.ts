import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "conectar_guest_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

export type GuestSession = {
  eventId: string;
  expiresAt: number;
  profileId: string;
  sessionVersion: 1;
};

function getSessionSecret() {
  const secret = process.env.GUEST_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("GUEST_SESSION_SECRET deve ter ao menos 32 caracteres.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function encode(session: GuestSession) {
  const value = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${value}.${sign(value)}`;
}

function decode(value: string): GuestSession | null {
  const [payload, signature, ...extra] = value.split(".");
  if (!payload || !signature || extra.length) return null;

  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as GuestSession;
    if (session.sessionVersion !== 1 || !session.eventId || !session.profileId || session.expiresAt <= Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function createGuestSession(eventId: string, profileId: string) {
  const session: GuestSession = {
    eventId,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    profileId,
    sessionVersion: 1,
  };
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encode(session), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getGuestSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  return value ? decode(value) : null;
}
