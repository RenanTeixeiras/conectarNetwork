"use client";

import { useActionState, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { removeMyProfilePhoto, updateMyProfile, uploadMyProfilePhoto, type ProfilePhotoState, type ProfileUpdateState } from "@/actions/guest.actions";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { PhotoPicker } from "@/components/profile/photo-picker";
import { Button, TextareaField, TextField } from "@/components/ui/primitives";
import type { EditableProfile } from "@/types/profiles";

type Values = Pick<EditableProfile, "city" | "company" | "idealAudience" | "instagram" | "linkedin" | "profession" | "segment" | "shareContacts" | "whatsapp" | "whatIDoAndOffer">;

const initialState: ProfileUpdateState = {};
const initialPhotoState: ProfilePhotoState = {};

function TagCheckbox({ tag, selected, onChange }: { tag: { category: string | null; id: string; name: string }; selected: boolean; onChange: () => void }) {
  return <label className="cursor-pointer"><input className="peer sr-only" type="checkbox" checked={selected} onChange={onChange} /><span className="inline-flex min-h-7 items-center rounded-full bg-conectar-green-50 px-2.5 py-1 text-xs font-medium text-conectar-green-800 peer-checked:bg-conectar-green-800 peer-checked:text-white">{tag.name}</span></label>;
}

export function MyProfileContent({ eventSlug, networkingReleased, profile, tags }: { eventSlug: string; networkingReleased: boolean; profile: EditableProfile; tags: { category: string | null; id: string; name: string }[] }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(updateMyProfile, initialState);
  const [photoState, photoFormAction, isPhotoPending] = useActionState(uploadMyProfilePhoto, initialPhotoState);
  const photoFormRef = useRef<HTMLFormElement>(null);
  const segmentTags = tags.filter((tag) => tag.category === "segmento");
  const [targetTagIds, setTargetTagIds] = useState(profile.targetTagIds.filter((tagId) => segmentTags.some((tag) => tag.id === tagId)));
  const [values, setValues] = useState<Values>({
    city: profile.city,
    company: profile.company,
    idealAudience: profile.idealAudience,
    instagram: profile.instagram,
    linkedin: profile.linkedin,
    profession: profile.profession,
    segment: profile.segment || segmentTags[0]?.name || "",
    shareContacts: profile.shareContacts,
    whatsapp: profile.whatsapp,
    whatIDoAndOffer: profile.whatIDoAndOffer,
  });
  const setValue = <Key extends keyof Values>(key: Key, value: Values[Key]) => setValues((current) => ({ ...current, [key]: value }));
  const toggleTag = (tagId: string) => setTargetTagIds((selected) => selected.includes(tagId) ? selected.filter((id) => id !== tagId) : [...selected, tagId]);
  const preview = {
    bio: null,
    company: values.company || null,
    contact: {},
    id: profile.id,
    idealAudience: values.idealAudience || "",
    name: `${profile.firstName} ${profile.lastName}`,
    photoUrl: profile.photoUrl,
    profession: values.profession || null,
    segment: values.segment || null,
    targetTags: targetTagIds.map((tagId) => segmentTags.find((tag) => tag.id === tagId)?.name).filter((name): name is string => Boolean(name)),
    whatIDoAndOffer: values.whatIDoAndOffer,
  };

  return (
    <MobileShell>
      <AppHeader eventSlug={eventSlug} />
      <div className="flex-1 px-5 pb-6">
        <div className="mb-5 flex items-center justify-between"><h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">Meu perfil</h1>{!editing && <button type="button" aria-label="Editar perfil" onClick={() => setEditing(true)} className="grid size-11 place-items-center rounded-lg text-conectar-green-800"><Pencil className="size-5" /></button>}</div>
        {!editing && <><ProfileView profile={preview} isOwnProfile /><section className="mt-8 rounded-xl border border-conectar-border-soft bg-white p-4"><h2 className="text-sm font-semibold text-conectar-ink">Foto de perfil</h2><form ref={photoFormRef} action={photoFormAction} className="mt-4 space-y-4"><input type="hidden" name="eventSlug" value={eventSlug} /><PhotoPicker isUploading={isPhotoPending} name="photo" onPhotoReady={() => photoFormRef.current?.requestSubmit()} profileName={preview.name} photoUrl={profile.photoUrl} />{photoState.error && <p role="alert" className="text-sm text-[#b94a48]">{photoState.error}</p>}</form>{profile.photoUrl && <form action={removeMyProfilePhoto} className="mt-3"><input type="hidden" name="eventSlug" value={eventSlug} /><Button type="submit" variant="ghost">Remover foto</Button></form>}</section><Button className="mt-5" type="button" variant="secondary" onClick={() => setEditing(true)}><Pencil className="size-4" />Editar perfil</Button></>}
        {editing && <form action={formAction} className="space-y-5">
          <input type="hidden" name="eventSlug" value={eventSlug} />
          <input type="hidden" name="city" value="" />
          <input type="hidden" name="segment" value="" />
          <input type="hidden" name="linkedin" value="" />
          {targetTagIds.map((tagId) => <input key={`target-${tagId}`} type="hidden" name="targetTagIds" value={tagId} />)}
          <TextField label="Profissão / Cargo" name="profession" value={values.profession} onChange={(event) => setValue("profession", event.target.value)} required />
          <TextField label="Empresa" name="company" value={values.company} onChange={(event) => setValue("company", event.target.value)} />
          <TextField label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" value={values.whatsapp} onChange={(event) => setValue("whatsapp", event.target.value)} />
          <TextField label="Instagram" name="instagram" value={values.instagram} onChange={(event) => setValue("instagram", event.target.value)} />
          <TextareaField label="O que você faz e o que oferece?" name="whatIDoAndOffer" value={values.whatIDoAndOffer} onChange={(event) => setValue("whatIDoAndOffer", event.target.value)} helper="Descreva brevemente sua atuação, serviços ou produtos." maxLength={500} required />
          <TextareaField label="Com quem gostaria de se conectar?" name="idealAudience" value={values.idealAudience} onChange={(event) => setValue("idealAudience", event.target.value)} helper="Descreva o tipo de pessoa, empresa ou área que você busca." maxLength={500} required />
          <fieldset className="space-y-3"><legend className="text-[13px] font-medium text-conectar-ink-soft">Áreas de interesse</legend><p className="text-xs leading-4 text-conectar-muted">Selecione áreas para receber sugestões de possíveis conexões.</p><div className="flex flex-wrap gap-2">{segmentTags.map((tag) => <TagCheckbox key={tag.id} tag={tag} selected={targetTagIds.includes(tag.id)} onChange={() => toggleTag(tag.id)} />)}</div></fieldset>
          <label className="flex items-start gap-3 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><input className="mt-1 size-4 accent-[#194828]" name="shareContacts" type="checkbox" checked={values.shareContacts} onChange={(event) => setValue("shareContacts", event.target.checked)} />Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.</label>
          {state.error && <p role="alert" className="text-sm text-[#b94a48]">{state.error}</p>}
          <div className="flex gap-3"><Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button><Button type="submit" disabled={isPending}>Salvar alterações</Button></div>
        </form>}
      </div>
      <BottomNavigation eventSlug={eventSlug} active="meu-perfil" networkingReleased={networkingReleased} />
    </MobileShell>
  );
}
