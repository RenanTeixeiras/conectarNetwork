import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { allProfiles } from "@/data/mock-event";

export default async function PersonPage({ params }: PageProps<"/e/[eventSlug]/pessoas/[profileId]">) {
  const { eventSlug, profileId } = await params;
  const profile = allProfiles.find((item) => item.id === profileId) ?? allProfiles[1];
  return <MobileShell className="px-5 pb-10 pt-[max(16px,env(safe-area-inset-top))]"><Link href={`/e/${eventSlug}/presentes`} aria-label="Voltar para presentes" className="grid size-11 place-items-center rounded-lg"><ArrowLeft className="size-5" /></Link><div className="pt-4"><ProfileView profile={profile} /></div></MobileShell>;
}
