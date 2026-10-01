import { describe, expect, it } from "vitest";
import { rankOpportunities } from "./opportunities";

const candidates = [
  { id: "1", name: "Marina Souza", photoUrl: null, profession: "Arquiteta", company: null, segment: "Arquitetura" },
  { id: "2", name: "Ana Lima", photoUrl: null, profession: "Especialista em Marketing", company: null, segment: "Comunicação" },
  { id: "3", name: "Carlos Mendes", photoUrl: null, profession: "Consultor", company: null, segment: "Gestão" },
];

describe("rankOpportunities", () => {
  it("prioritizes an exact target-segment match", () => {
    const [opportunity] = rankOpportunities(["Arquitetura"], candidates);
    expect(opportunity).toMatchObject({ label: "Segmento atendido compatível", profile: { id: "1" }, score: 100 });
  });

  it("uses profession equivalence only when the segment does not match", () => {
    const [opportunity] = rankOpportunities(["Marketing"], candidates);
    expect(opportunity).toMatchObject({ label: "Atuação no segmento atendido", profile: { id: "2" }, score: 70 });
  });

  it("does not manufacture results for an unrelated target", () => {
    expect(rankOpportunities(["Jurídico"], candidates)).toEqual([]);
  });

  it("does not increase relevance when a target is repeated", () => {
    const [opportunity] = rankOpportunities(["Arquitetura", "Arquitetura"], candidates);
    expect(opportunity?.score).toBe(100);
  });

  it("keeps ordering deterministic on equal evidence", () => {
    const results = rankOpportunities(["Gestão"], [candidates[2]!, { ...candidates[2]!, id: "4", name: "Beatriz Costa" }]);
    expect(results.map((result) => result.profile.name)).toEqual(["Beatriz Costa", "Carlos Mendes"]);
  });
});
