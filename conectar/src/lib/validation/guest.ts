import { z } from "zod";

const optionalText = z.string().trim().max(500).optional().default("");

export const guestNameSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome.").max(80),
  lastName: z.string().trim().min(1, "Informe seu sobrenome.").max(120),
});

export const guestOnboardingSchema = guestNameSchema.extend({
  profession: z.string().trim().min(1, "Informe sua profissão ou cargo.").max(160),
  company: z.string().trim().max(160).optional().default(""),
  segment: z.string().trim().min(1, "Selecione seu segmento.").max(120),
  city: z.string().trim().max(120).optional().default(""),
  whatIDo: z.string().trim().min(1, "Descreva o que você faz.").max(500),
  whatIOffer: z.string().trim().min(1, "Descreva o que você oferece.").max(500),
  targetAudience: z.string().trim().min(1, "Descreva quem você ajuda.").max(500),
  whatsapp: z.string().trim().max(32).optional().default(""),
  linkedin: optionalText,
  instagram: optionalText,
  offerTagIds: z.array(z.uuid()).max(20),
  targetTagIds: z.array(z.uuid()).min(1, "Selecione ao menos um público-alvo.").max(20),
  shareContacts: z.boolean(),
});

export const profileUpdateSchema = guestOnboardingSchema.omit({ firstName: true, lastName: true });
