import type { ParticipantProfile } from "@/types/profiles";

export type Opportunity = {
  label: "Atuação no segmento atendido" | "Atuação relacionada ao interesse" | "Segmento atendido compatível";
  profile: ParticipantProfile;
  reason: string;
  score: number;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

const professionKeywords: Record<string, string[]> = {
  arquitetura: ["arquit"],
  construcao: ["engenheir", "constr", "obra"],
  financas: ["contador", "contab", "financeir"],
  juridico: ["advog", "jurid"],
  marketing: ["marketing", "publicit"],
  tecnologia: ["desenvolvedor", "software", "tecnolog", "programador", "\\bti\\b"],
};

export function rankOpportunities(targetTags: string[], candidates: ParticipantProfile[]): Opportunity[] {
  const targets = [...new Set(targetTags.map(normalize).filter(Boolean))];
  if (!targets.length) return [];

  const opportunities: Opportunity[] = [];
  for (const profile of candidates) {
    const segment = profile.segment ? normalize(profile.segment) : "";
    const directTarget = targets.find((target) => target === segment);
    if (directTarget) {
      opportunities.push({
        label: "Segmento atendido compatível",
        profile,
        reason: `Você indicou interesse em ${profile.segment}, e ${profile.name} atua nessa área.`,
        score: 100,
      });
      continue;
    }

    const profession = normalize(profile.profession ?? "");
    const professionTarget = targets.find((target) => professionKeywords[target]?.some((keyword) => new RegExp(keyword, "i").test(profession)));
    if (professionTarget) {
      opportunities.push({
        label: "Atuação no segmento atendido",
        profile,
        reason: `Você indicou interesse em ${professionTarget}, e ${profile.name} atua como ${profile.profession}.`,
        score: 70,
      });
      continue;
    }

    const offer = normalize(profile.whatIDoAndOffer);
    const offerTarget = targets.find((target) => offer.includes(target) || target.split(/\s+/).some((word) => word.length >= 5 && offer.includes(word)));
    if (offerTarget) {
      opportunities.push({
        label: "Atuação relacionada ao interesse",
        profile,
        reason: `Você indicou interesse em ${offerTarget}, e a atuação de ${profile.name} está relacionada a essa área.`,
        score: 50,
      });
    }
  }

  return opportunities
    .sort((left, right) => right.score - left.score || left.profile.name.localeCompare(right.profile.name, "pt-BR") || left.profile.id.localeCompare(right.profile.id))
    .slice(0, 10);
}
