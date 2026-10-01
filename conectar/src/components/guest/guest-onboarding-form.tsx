"use client";

import Link from "next/link";
import { useActionState, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { completeGuestOnboarding, type GuestOnboardingState } from "@/actions/guest.actions";
import { PhotoPicker } from "@/components/profile/photo-picker";
import { Button, SelectField, TextareaField, TextField } from "@/components/ui/primitives";

type Tag = { category: string | null; id: string; name: string };
type Values = {
  city: string;
  company: string;
  instagram: string;
  linkedin: string;
  profession: string;
  segment: string;
  shareContacts: boolean;
  whatsapp: string;
  whatIDoAndOffer: string;
};

const initialState: GuestOnboardingState = {};

function TagCheckbox({ tag, selected, onChange }: { tag: Tag; selected: boolean; onChange: () => void }) {
  return <label className="cursor-pointer"><input className="peer sr-only" type="checkbox" checked={selected} onChange={onChange} /><span className="inline-flex min-h-7 items-center rounded-full bg-conectar-green-50 px-2.5 py-1 text-xs font-medium text-conectar-green-800 peer-checked:bg-conectar-green-800 peer-checked:text-white">{tag.name}</span></label>;
}

function toggleTag(tagId: string, setter: Dispatch<SetStateAction<string[]>>) {
  setter((selected) => selected.includes(tagId) ? selected.filter((id) => id !== tagId) : [...selected, tagId]);
}

export function GuestOnboardingForm({ eventSlug, firstName, lastName, tags }: { eventSlug: string; firstName: string; lastName: string; tags: Tag[] }) {
  const [step, setStep] = useState(1);
  const [state, formAction, isPending] = useActionState(completeGuestOnboarding, initialState);
  const [targetTagIds, setTargetTagIds] = useState<string[]>([]);
  const segmentTags = tags.filter((tag) => tag.category === "segmento");
  const [values, setValues] = useState<Values>({ city: "", company: "", instagram: "", linkedin: "", profession: "", segment: segmentTags[0]?.name ?? "Outro", shareContacts: false, whatsapp: "", whatIDoAndOffer: "" });
  const name = `${firstName} ${lastName}`;
  const headings = ["Quem é você?", "O que você faz e oferece?", "Seus clientes e como podem falar com você?"];
  const setValue = <Key extends keyof Values>(key: Key, value: Values[Key]) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form action={formAction} onSubmit={(event) => { if (step < 3) { event.preventDefault(); setStep((current) => current + 1); } }} className="flex flex-1 flex-col">
      <div className="px-5 pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-conectar-green-100"><div className="h-full rounded-full bg-conectar-green-800" style={{ width: `${(step / 3) * 100}%` }} /></div>
          <span className="text-xs text-conectar-muted">{step} de 3</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-8 pt-8">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">{headings[step - 1]}</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Estas informações serão exibidas aos participantes deste encontro.</p>
        <div className="mt-7 flex flex-1 flex-col">
           <input type="hidden" name="eventSlug" value={eventSlug} />
           <input type="hidden" name="firstName" value={firstName} />
           <input type="hidden" name="lastName" value={lastName} />
           <div className={step === 1 ? "" : "hidden"}><PhotoPicker name="photo" profileName={name} /></div>
          {step === 3 && <>
            <input type="hidden" name="profession" value={values.profession} />
            <input type="hidden" name="company" value={values.company} />
            <input type="hidden" name="segment" value={values.segment} />
            <input type="hidden" name="city" value={values.city} />
             <input type="hidden" name="whatIDoAndOffer" value={values.whatIDoAndOffer} />
            {targetTagIds.map((tagId) => <input key={`target-${tagId}`} type="hidden" name="targetTagIds" value={tagId} />)}
          </>}
          <div className="flex-1 space-y-5">
            {step === 1 && <>
              <TextField label="Profissão / Cargo" name="profession" value={values.profession} onChange={(event) => setValue("profession", event.target.value)} required />
              <TextField label="Empresa" name="company" value={values.company} onChange={(event) => setValue("company", event.target.value)} />
              <SelectField label="Segmento" name="segment" value={values.segment} onChange={(event) => setValue("segment", event.target.value)}>{segmentTags.map((tag) => <option key={tag.id} value={tag.name}>{tag.name}</option>)}</SelectField>
              <TextField label="Cidade" name="city" value={values.city} onChange={(event) => setValue("city", event.target.value)} />
            </>}
            {step === 2 && <>
               <TextareaField label="O que você faz e oferece?" name="whatIDoAndOffer" value={values.whatIDoAndOffer} onChange={(event) => setValue("whatIDoAndOffer", event.target.value)} helper="Descreva brevemente sua atuação e os serviços ou produtos que oferece." maxLength={500} required />
            </>}
            {step === 3 && <>
               <fieldset className="space-y-3"><legend className="text-[13px] font-medium text-conectar-ink-soft">Quais segmentos você atende?</legend><p className="text-xs leading-4 text-conectar-muted">Selecione os tipos de empresa ou profissional que são seus clientes.</p><div className="flex flex-wrap gap-2">{segmentTags.map((tag) => <TagCheckbox key={tag.id} tag={tag} selected={targetTagIds.includes(tag.id)} onChange={() => toggleTag(tag.id, setTargetTagIds)} />)}</div></fieldset>
              <TextField label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" placeholder="(71) 99999-9999" value={values.whatsapp} onChange={(event) => setValue("whatsapp", event.target.value)} />
              <TextField label="LinkedIn" name="linkedin" placeholder="linkedin.com/in/seu-perfil" value={values.linkedin} onChange={(event) => setValue("linkedin", event.target.value)} />
              <TextField label="Instagram" name="instagram" placeholder="@seuusuario" value={values.instagram} onChange={(event) => setValue("instagram", event.target.value)} />
              <label className="flex items-start gap-3 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><input className="mt-1 size-4 accent-[#194828]" name="shareContacts" type="checkbox" checked={values.shareContacts} onChange={(event) => setValue("shareContacts", event.target.checked)} />Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.</label>
              {state.error && <p role="alert" className="text-sm text-[#b94a48]">{state.error}</p>}
            </>}
          </div>
          <div className="mt-8 flex gap-3">
            {step === 1 ? <Link href={`/e/${eventSlug}/entrar`} aria-label="Voltar" className="grid size-[52px] shrink-0 place-items-center rounded-xl border border-conectar-border-soft bg-white text-conectar-ink"><ArrowLeft className="size-5" /></Link> : <Button type="button" variant="secondary" className="w-auto shrink-0 px-4" onClick={() => setStep((current) => current - 1)}><ArrowLeft className="size-5" /></Button>}
            <Button type="submit" disabled={isPending}>{step === 3 ? "Concluir cadastro" : "Continuar"}<ArrowRight className="size-5" /></Button>
          </div>
        </div>
      </div>
    </form>
  );
}
