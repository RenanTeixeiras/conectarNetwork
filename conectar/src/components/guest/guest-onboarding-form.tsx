"use client";

import Link from "next/link";
import { useActionState, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { completeGuestOnboarding, type GuestOnboardingState } from "@/actions/guest.actions";
import { Button, TextareaField, TextField } from "@/components/ui/primitives";
import { normalizeInstagram } from "@/lib/normalization/instagram";

type Tag = { category: string | null; id: string; name: string };
type Values = {
  city: string;
  company: string;
  idealAudience: string;
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
  const [values, setValues] = useState<Values>({ city: "", company: "", idealAudience: "", instagram: "", linkedin: "", profession: "", segment: segmentTags[0]?.name ?? "Outro", shareContacts: false, whatsapp: "", whatIDoAndOffer: "" });
  const headings = ["Cadastro", "O que você faz e o que oferece?", "Qual seu público ideal?"];
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
          {step === 3 && <>
            <input type="hidden" name="profession" value={values.profession} />
            <input type="hidden" name="company" value={values.company} />
            <input type="hidden" name="segment" value="" />
            <input type="hidden" name="city" value="" />
            <input type="hidden" name="linkedin" value="" />
            <input type="hidden" name="whatsapp" value={values.whatsapp} />
            <input type="hidden" name="instagram" value={values.instagram} />
            <input type="hidden" name="whatIDoAndOffer" value={values.whatIDoAndOffer} />
            <input type="hidden" name="idealAudience" value={values.idealAudience} />
            {targetTagIds.map((tagId) => <input key={`target-${tagId}`} type="hidden" name="targetTagIds" value={tagId} />)}
          </>}
          <div className="flex-1 space-y-5">
            {step === 1 && <>
              <TextField label="Profissão / Cargo" name="profession" value={values.profession} onChange={(event) => setValue("profession", event.target.value)} required />
              <TextField label="Empresa" name="company" value={values.company} onChange={(event) => setValue("company", event.target.value)} />
              <TextField label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" placeholder="(71) 99999-9999" value={values.whatsapp} onChange={(event) => setValue("whatsapp", event.target.value)} />
              <TextField label="Instagram" name="instagram" placeholder="@seuusuario" value={values.instagram} onChange={(event) => setValue("instagram", event.target.value)} onBlur={(event) => setValue("instagram", normalizeInstagram(event.target.value) ?? event.target.value)} autoCapitalize="none" autoCorrect="off" />
            </>}
            {step === 2 && <>
                <TextareaField label="O que você faz e o que oferece?" name="whatIDoAndOffer" value={values.whatIDoAndOffer} onChange={(event) => setValue("whatIDoAndOffer", event.target.value)} helper="Descreva brevemente sua atuação, serviços ou produtos." maxLength={500} required />
            </>}
            {step === 3 && <>
              <TextareaField label="Com quem gostaria de se conectar?" name="idealAudience" value={values.idealAudience} onChange={(event) => setValue("idealAudience", event.target.value)} helper="Descreva o tipo de pessoa, empresa ou área que você busca." maxLength={500} required />
              <fieldset className="space-y-3"><legend className="text-[13px] font-medium text-conectar-ink-soft">Áreas de interesse</legend><p className="text-xs leading-4 text-conectar-muted">Selecione áreas para receber sugestões de possíveis conexões.</p><div className="flex flex-wrap gap-2">{segmentTags.map((tag) => <TagCheckbox key={tag.id} tag={tag} selected={targetTagIds.includes(tag.id)} onChange={() => toggleTag(tag.id, setTargetTagIds)} />)}</div></fieldset>
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
