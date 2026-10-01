import { z } from "zod";

const optionalText = z.string().trim().max(500).optional().default("");

export const guestNameSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome.").max(80),
  lastName: z.string().trim().min(1, "Informe seu sobrenome.").max(120),
});

export const guestOnboardingSchema = guestNameSchema.extend({
  profession: z.string().trim().min(1, "Informe sua profissão ou cargo.").max(160),
  company: z.string().trim().max(160).optional().default(""),
  segment: z.string().trim().max(120).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  idealAudience: z.string().trim().min(1, "Descreva seu público ideal.").max(500),
  whatIDoAndOffer: z.string().trim().min(1, "Descreva o que você faz e oferece.").max(500),
  whatsapp: z.string().trim().max(32).optional().default(""),
  linkedin: optionalText,
  instagram: optionalText,
  targetTagIds: z.array(z.uuid()).max(20),
  shareContacts: z.boolean(),
});

export const profileUpdateSchema = guestOnboardingSchema.omit({ firstName: true, lastName: true });
