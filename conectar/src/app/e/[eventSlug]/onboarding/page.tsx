import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { onboardingTags } from "@/data/mock-event";
import { Avatar, Button, SelectField, TextareaField, TextField } from "@/components/ui/primitives";

type SearchValues = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined, fallback = "") {
  return Array.isArray(value) ? (value[0] ?? fallback) : (value ?? fallback);
}

function allValues(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function HiddenField({ name, value }: { name: string; value: string | string[] | undefined }) {
  return <>{allValues(value).map((item, index) => <input key={`${name}-${index}`} type="hidden" name={name} value={item} />)}</>;
}

function TagCheckbox({ name, tag, selected }: { name: string; tag: string; selected: boolean }) {
  return <label className="cursor-pointer"><input className="peer sr-only" type="checkbox" name={name} value={tag} defaultChecked={selected} /><span className="inline-flex min-h-7 items-center rounded-full bg-conectar-green-50 px-2.5 py-1 text-xs font-medium text-conectar-green-800 peer-checked:bg-conectar-green-800 peer-checked:text-white">{tag}</span></label>;
}

export default async function OnboardingPage({ params, searchParams }: PageProps<"/e/[eventSlug]/onboarding">) {
  const { eventSlug } = await params;
  const values = (await searchParams) as SearchValues;
  const requestedStep = Number(firstValue(values.etapa, "1"));
  const step = requestedStep === 2 || requestedStep === 3 ? requestedStep : 1;
  const firstName = firstValue(values.nome, "Renan");
  const lastName = firstValue(values.sobrenome, "Teixeira");
  const name = `${firstName} ${lastName}`;
  const offerTags = allValues(values.oferta);
  const targetTags = allValues(values.clienteIdeal);
  const headings = ["Quem é você?", "O que você faz e oferece?", "Quem você ajuda e como podem falar com você?"];
  const previousStepUrl = step === 1 ? `/e/${eventSlug}/entrar` : `/e/${eventSlug}/onboarding?${new URLSearchParams({ ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, firstValue(value)])), etapa: String(step - 1) }).toString()}`;

  return (
    <MobileShell className="bg-conectar-canvas">
      <div className="px-5 pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center gap-4">
          <Link aria-label="Voltar" className="grid size-11 place-items-center rounded-lg text-conectar-ink" href={previousStepUrl}><ArrowLeft className="size-5" /></Link>
          <div className="flex-1"><div className="h-1 overflow-hidden rounded-full bg-conectar-green-100"><div className="h-full rounded-full bg-conectar-green-800" style={{ width: `${(step / 3) * 100}%` }} /></div></div>
          <span className="text-xs text-conectar-muted">{step} de 3</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-8 pt-8">
        <h1 className="font-editorial text-[30px] font-semibold leading-9 text-conectar-ink">{headings[step - 1]}</h1>
        <p className="mt-2 text-sm leading-5 text-conectar-muted">Estas informações serão exibidas aos participantes deste encontro.</p>
        {step === 1 && <form className="mt-7 flex flex-1 flex-col" action={`/e/${eventSlug}/onboarding`} method="get"><input type="hidden" name="etapa" value="2" /><input type="hidden" name="nome" value={firstName} /><input type="hidden" name="sobrenome" value={lastName} /><div className="flex-1 space-y-5"><div className="flex items-center gap-4"><Avatar name={name} size="lg" /><span className="flex min-h-11 items-center gap-2 text-sm font-medium text-conectar-green-800"><Camera className="size-5" />Adicionar foto <span className="font-normal text-conectar-muted">(opcional)</span></span></div><TextField label="Profissão / Cargo" name="profissao" defaultValue={firstValue(values.profissao, "Desenvolvedor de Software")} required /><TextField label="Empresa" name="empresa" defaultValue={firstValue(values.empresa, "NG7")} /><SelectField label="Segmento" name="segmento" defaultValue={firstValue(values.segmento, "Tecnologia")}><option value="Tecnologia">Tecnologia</option><option value="Marketing">Marketing</option><option value="Arquitetura">Arquitetura</option><option value="Gestão">Gestão</option></SelectField><TextField label="Cidade" name="cidade" defaultValue={firstValue(values.cidade, "Salvador - BA")} /></div><Button type="submit">Continuar<ArrowRight className="size-5" /></Button></form>}
        {step === 2 && <form className="mt-7 flex flex-1 flex-col" action={`/e/${eventSlug}/onboarding`} method="get"><input type="hidden" name="etapa" value="3" /><HiddenField name="nome" value={values.nome} /><HiddenField name="sobrenome" value={values.sobrenome} /><HiddenField name="profissao" value={values.profissao} /><HiddenField name="empresa" value={values.empresa} /><HiddenField name="segmento" value={values.segmento} /><HiddenField name="cidade" value={values.cidade} /><div className="flex-1 space-y-5"><TextareaField label="O que você faz?" name="oQueFaz" defaultValue={firstValue(values.oQueFaz, "Desenvolvo sistemas, integrações, automações e produtos digitais.")} helper="Explique em poucas palavras sua atuação profissional." maxLength={500} required /><TextareaField label="O que você oferece?" name="oQueOferece" defaultValue={firstValue(values.oQueOferece, "Software, automação e soluções digitais para empresas.")} maxLength={500} required /><fieldset className="space-y-3"><legend className="text-[13px] font-medium text-conectar-ink-soft">Posso ajudar com</legend><div className="flex flex-wrap gap-2">{onboardingTags.map((tag) => <TagCheckbox key={tag} name="oferta" tag={tag} selected={offerTags.length ? offerTags.includes(tag) : ["Tecnologia", "Automação"].includes(tag)} />)}</div></fieldset></div><Button type="submit">Continuar<ArrowRight className="size-5" /></Button></form>}
        {step === 3 && <form className="mt-7 flex flex-1 flex-col" action={`/e/${eventSlug}/presentes`} method="get"><HiddenField name="nome" value={values.nome} /><HiddenField name="sobrenome" value={values.sobrenome} /><HiddenField name="profissao" value={values.profissao} /><HiddenField name="empresa" value={values.empresa} /><HiddenField name="segmento" value={values.segmento} /><HiddenField name="cidade" value={values.cidade} /><HiddenField name="oQueFaz" value={values.oQueFaz} /><HiddenField name="oQueOferece" value={values.oQueOferece} /><HiddenField name="oferta" value={values.oferta} /><div className="flex-1 space-y-5"><TextareaField label="Quem você ajuda ou atende?" name="quemAjuda" defaultValue={firstValue(values.quemAjuda, "Empresas que precisam organizar processos, vendas e atendimento.")} helper="Descreva o tipo de pessoa, empresa ou segmento que mais se beneficia do que você oferece." maxLength={500} required /><fieldset className="space-y-3"><legend className="text-[13px] font-medium text-conectar-ink-soft">Cliente ideal</legend><div className="flex flex-wrap gap-2">{onboardingTags.map((tag) => <TagCheckbox key={tag} name="clienteIdeal" tag={tag} selected={targetTags.includes(tag)} />)}</div></fieldset><TextField label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" placeholder="(71) 99999-9999" defaultValue={firstValue(values.whatsapp)} /><TextField label="LinkedIn" name="linkedin" type="url" placeholder="linkedin.com/in/seu-perfil" defaultValue={firstValue(values.linkedin)} /><TextField label="Instagram" name="instagram" placeholder="@seuusuario" defaultValue={firstValue(values.instagram)} /><label className="flex items-start gap-3 rounded-xl bg-conectar-green-50 p-4 text-sm leading-5 text-conectar-ink-soft"><input className="mt-1 size-4 accent-[#194828]" name="compartilharContato" type="checkbox" defaultChecked={firstValue(values.compartilharContato) === "on"} />Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.</label></div><Button type="submit">Concluir perfil<ArrowRight className="size-5" /></Button></form>}
      </div>
    </MobileShell>
  );
}
