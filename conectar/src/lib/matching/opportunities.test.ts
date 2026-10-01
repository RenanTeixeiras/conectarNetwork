import { describe, expect, it } from "vitest";
import { rankOpportunities } from "./opportunities";

const candidates = [
  { id: "1", name: "Marina Souza", photoUrl: null, profession: "Arquiteta", company: null, segment: "Arquitetura", whatIDoAndOffer: "Projetos residenciais e comerciais." },
  { id: "2", name: "Ana Lima", photoUrl: null, profession: "Especialista em Marketing", company: null, segment: null, whatIDoAndOffer: "Estratégia de marca e campanhas." },
  { id: "3", name: "Carlos Mendes", photoUrl: null, profession: "Consultor", company: null, segment: "Gestão", whatIDoAndOffer: "Consultoria empresarial." },
];

describe("rankOpportunities", () => {
  it("prioritizes an exact target-segment match", () => {
    const [opportunity] = rankOpportunities(["Arquitetura"], candidates);
    expect(opportunity).toMatchObject({ label: "Segmento atendido compatível", profile: { id: "1" }, score: 100 });
  });

  it("uses profession equivalence when the candidate has no segment", () => {
    const [opportunity] = rankOpportunities(["Marketing"], candidates);
    expect(opportunity).toMatchObject({ label: "Atuação no segmento atendido", profile: { id: "2" }, score: 70 });
  });

  it("does not manufacture results for an unrelated target", () => {
    expect(rankOpportunities(["Jurídico"], candidates)).toEqual([]);
  });

  it("uses the offer description when profession and segment are insufficient", () => {
    const [opportunity] = rankOpportunities(["Marca"], candidates);
    expect(opportunity).toMatchObject({ label: "Atuação relacionada ao interesse", profile: { id: "2" }, score: 50 });
  });
});
