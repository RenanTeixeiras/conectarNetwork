"use client";

import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { Button, Toast } from "@/components/ui/primitives";
import { currentProfile } from "@/data/mock-event";
import { useState } from "react";

export default function MyProfilePage() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const [showToast, setShowToast] = useState(false);
  return <MobileShell><AppHeader eventSlug={eventSlug} /><div className="flex-1 px-5 pb-6"><div className="mb-5 flex items-center justify-between"><h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Meu perfil</h1><button type="button" aria-label="Editar perfil" onClick={() => setShowToast(true)} className="grid size-11 place-items-center rounded-lg text-conectar-green-800"><Pencil className="size-5" /></button></div><ProfileView profile={currentProfile} isOwnProfile /><Button className="mt-8" type="button" variant="secondary" onClick={() => setShowToast(true)}><Pencil className="size-4" />Editar perfil</Button></div>{showToast && <Toast message="A edição será conectada ao banco na próxima etapa." onClose={() => setShowToast(false)} />}<BottomNavigation eventSlug={eventSlug} active="meu-perfil" /></MobileShell>;
}
