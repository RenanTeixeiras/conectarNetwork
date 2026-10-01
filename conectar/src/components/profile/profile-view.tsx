import { AtSign, BriefcaseBusiness, ExternalLink, MessageCircle } from "lucide-react";
import { Avatar, Divider } from "@/components/ui/primitives";
import type { PublicProfile } from "@/types/profiles";

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="text-sm font-semibold text-conectar-ink">{title}</h2><div className="mt-2 text-sm leading-6 text-conectar-ink-soft">{children}</div></section>;
}

export function ProfileView({ profile, isOwnProfile = false }: { profile: PublicProfile; isOwnProfile?: boolean }) {
  const socialLinks = [
    profile.contact.whatsapp && { label: "WhatsApp", href: profile.contact.whatsapp, icon: MessageCircle },
    profile.contact.linkedin && { label: "LinkedIn", href: profile.contact.linkedin, icon: BriefcaseBusiness },
    profile.contact.instagram && { label: "Instagram", href: profile.contact.instagram, icon: AtSign },
  ].filter(Boolean) as { label: string; href: string; icon: typeof MessageCircle }[];

  return (
    <div>
      <header className="text-center"><Avatar name={profile.name} photoUrl={profile.photoUrl} size="xl" className="mx-auto" /><h1 className="mt-4 font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">{profile.name}</h1>{profile.profession && <p className="mt-1 text-sm text-conectar-ink-soft">{profile.profession}</p>}{profile.company && <p className="text-sm text-conectar-muted">{profile.company}</p>}</header>
       <div className="mt-7 space-y-6">{profile.bio && <><ProfileSection title="Sobre mim">{profile.bio}</ProfileSection><Divider /></>}{profile.whatIDoAndOffer && <ProfileSection title="Fale sobre você">{profile.whatIDoAndOffer}</ProfileSection>}</div>
      {!isOwnProfile && socialLinks.length > 0 && <section className="mt-8"><h2 className="text-sm font-semibold text-conectar-ink">Vamos conversar?</h2><div className="mt-4 flex justify-around">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-16 min-w-16 flex-col items-center justify-center gap-1.5 text-xs font-medium text-conectar-green-800"><span className="grid size-11 place-items-center rounded-full bg-conectar-green-100"><Icon aria-hidden="true" className="size-5" /></span>{label}<ExternalLink aria-label={`Abre ${label} em uma nova aba`} className="sr-only" /></a>)}</div></section>}
    </div>
  );
}
