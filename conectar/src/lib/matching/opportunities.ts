import type { ParticipantProfile } from "@/types/profiles";

export type Opportunity = {
  label: "Atuação relacionada ao seu público" | "Público-alvo compatível";
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
        label: "Público-alvo compatível",
        profile,
        reason: `Você selecionou ${profile.segment} como público-alvo, e ${profile.name} atua nesse segmento.`,
        score: 100,
      });
      continue;
    }

    const profession = normalize(profile.profession ?? "");
    const professionTarget = targets.find((target) => professionKeywords[target]?.some((keyword) => new RegExp(keyword, "i").test(profession)));
    if (professionTarget) {
      opportunities.push({
        label: "Atuação relacionada ao seu público" as const,
        profile,
        reason: `Você selecionou ${professionTarget} como público-alvo, e ${profile.name} atua como ${profile.profession}.`,
        score: 70,
      });
    }
  }

  return opportunities
    .sort((left, right) => right.score - left.score || left.profile.name.localeCompare(right.profile.name, "pt-BR") || left.profile.id.localeCompare(right.profile.id))
    .slice(0, 10);
}
