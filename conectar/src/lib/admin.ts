import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ManagedEvent = { checkedInCount: number; id: string; name: string; networkingReleased: boolean; registeredCount: number; slug: string; startsAt: string | null; venueName: string | null };

export async function getActiveAdmin(authUserId: string, username: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("admin_users").select("auth_user_id, username").eq("auth_user_id", authUserId).eq("username", username).eq("is_active", true).maybeSingle();
  if (error) throw new Error("Não foi possível validar o acesso gerencial.");
  return data;
}

export async function getManagedEvents(): Promise<ManagedEvent[]> {
  const supabase = createServerSupabaseClient();
  const [{ data: events, error: eventError }, { data: participants, error: participantError }] = await Promise.all([
    supabase.from("events").select("id, name, slug, starts_at, venue_name, networking_released").order("starts_at", { ascending: false, nullsFirst: false }),
    supabase.from("event_participants").select("event_id, status"),
  ]);
  if (eventError || participantError) throw new Error("Não foi possível carregar os eventos.");
  return events.map((event) => {
    const eventParticipants = participants.filter((participant) => participant.event_id === event.id);
    return { checkedInCount: eventParticipants.filter((participant) => participant.status === "CHECKED_IN").length, id: event.id, name: event.name, networkingReleased: event.networking_released, registeredCount: eventParticipants.length, slug: event.slug, startsAt: event.starts_at, venueName: event.venue_name };
  });
}
