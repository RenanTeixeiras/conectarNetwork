"use client";

import { useActionState, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { removeMyProfilePhoto, updateMyProfile, uploadMyProfilePhoto, type ProfilePhotoState, type ProfileUpdateState } from "@/actions/guest.actions";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { PhotoPicker } from "@/components/profile/photo-picker";
import { Button, SelectField, TextareaField, TextField } from "@/components/ui/primitives";
import type { EditableProfile } from "@/types/profiles";

type Values = Pick<EditableProfile, "city" | "company" | "instagram" | "linkedin" | "profession" | "segment" | "shareContacts" | "whatsapp" | "whatIDoAndOffer">;

const initialState: ProfileUpdateState = {};
const initialPhotoState: ProfilePhotoState = {};

export function MyProfileContent({ eventSlug, networkingReleased, profile, tags }: { eventSlug: string; networkingReleased: boolean; profile: EditableProfile; tags: { category: string | null; id: string; name: string }[] }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(updateMyProfile, initialState);
  const [photoState, photoFormAction, isPhotoPending] = useActionState(uploadMyProfilePhoto, initialPhotoState);
  const photoFormRef = useRef<HTMLFormElement>(null);
  const segmentTags = tags.filter((tag) => tag.category === "segmento");
  const [values, setValues] = useState<Values>({
    city: profile.city,
    company: profile.company,
    instagram: profile.instagram,
    linkedin: profile.linkedin,
    profession: profile.profession,
    segment: profile.segment || segmentTags[0]?.name || "",
    shareContacts: profile.shareContacts,
    whatsapp: profile.whatsapp,
    whatIDoAndOffer: profile.whatIDoAndOffer,
  });
  const setValue = <Key extends keyof Values>(key: Key, value: Values[Key]) => setValues((current) => ({ ...current, [key]: value }));
  const preview = {
    bio: null,
    company: values.company || null,
    contact: {},
    id: profile.id,
    name: `${profile.firstName} ${profile.lastName}`,
    photoUrl: profile.photoUrl,
    profession: values.profession || null,
    segment: values.segment || null,
    whatIDoAndOffer: values.whatIDoAndOffer || null,
  };

  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <div className="mb-5 flex items-center justify-between"><h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Meu perfil</h1>{!editing && <button type="button" aria-label="Editar perfil" onClick={() => setEditing(true)} className="grid size-11 place-items-center rounded-lg text-conectar-green-800"><Pencil className="size-5" /></button>}</div>
        {!editing && <><ProfileView profile={preview} isOwnProfile /><section className="mt-8 rounded-xl border border-conectar-border-soft bg-white p-4"><h2 className="text-sm font-semibold text-conectar-ink">Foto de perfil</h2><form ref={photoFormRef} action={photoFormAction} className="mt-4 space-y-4"><input type="hidden" name="eventSlug" value={eventSlug} /><PhotoPicker isUploading={isPhotoPending} name="photo" onPhotoReady={() => photoFormRef.current?.requestSubmit()} profileName={preview.name} photoUrl={profile.photoUrl} />{photoState.error && <p role="alert" className="text-sm text-[#b94a48]">{photoState.error}</p>}</form>{profile.photoUrl && <form action={removeMyProfilePhoto} className="mt-3"><input type="hidden" name="eventSlug" value={eventSlug} /><Button type="submit" variant="ghost">Remover foto</Button></form>}</section><Button className="mt-5" type="button" variant="secondary" onClick={() => setEditing(true)}><Pencil className="size-4" />Editar perfil</Button></>}
        {editing && <form action={formAction} className="space-y-5">
          <input type="hidden" name="eventSlug" value={eventSlug} />
          <TextField label="Profissão / Cargo" name="profession" value={values.profession} onChange={(event) => setValue("profession", event.target.value)} required />
          <TextField label="Empresa" name="company" value={values.company} onChange={(event) => setValue("company", event.target.value)} />
          <SelectField label="Segmento" name="segment" value={values.segment} onChange={(event) => setValue("segment", event.target.value)}>{segmentTags.map((tag) => <option key={tag.id} value={tag.name}>{tag.name}</option>)}</SelectField>
          <TextField label="Cidade" name="city" value={values.city} onChange={(event) => setValue("city", event.target.value)} />
          <TextareaField label="Fale sobre você" name="whatIDoAndOffer" value={values.whatIDoAndOffer} onChange={(event) => setValue("whatIDoAndOffer", event.target.value)} helper="Conte brevemente sobre sua atuação, interesses ou o que gostaria de compartilhar." maxLength={500} required />
          <TextField label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" value={values.whatsapp} onChange={(event) => setValue("whatsapp", event.target.value)} />
          <TextField label="LinkedIn" name="linkedin" value={values.linkedin} onChange={(event) => setValue("linkedin", event.target.value)} />
          <TextField label="Instagram" name="instagram" value={values.instagram} onChange={(event) => setValue("instagram", event.target.value)} />
          <label className="flex items-start gap-3 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><input className="mt-1 size-4 accent-[#194828]" name="shareContacts" type="checkbox" checked={values.shareContacts} onChange={(event) => setValue("shareContacts", event.target.checked)} />Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.</label>
          {state.error && <p role="alert" className="text-sm text-[#b94a48]">{state.error}</p>}
          <div className="flex gap-3"><Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button><Button type="submit" disabled={isPending}>Salvar alterações</Button></div>
        </form>}
      </div>
      <BottomNavigation eventSlug={eventSlug} active="meu-perfil" networkingReleased={networkingReleased} />
    </MobileShell>
  );
}
