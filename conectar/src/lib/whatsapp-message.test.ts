import { describe, expect, it } from "vitest";
import { createConnectionMessage } from "./whatsapp-message";

describe("createConnectionMessage", () => {
  it("includes the sender, event and recipient connection request", () => {
    expect(createConnectionMessage({
      eventName: "SSA - Pituba",
      recipientFirstName: "Dani",
      recipientIdealAudience: "Pessoas que desejam reformar imóveis.",
      senderCompany: "Raquel Magalhães Coffee & Eventos",
      senderName: "Raquel Magalhães",
    })).toBe("Olá, Dani!\n\nMeu nome é Raquel Magalhães da empresa Raquel Magalhães Coffee & Eventos.\n\nEstava na reunião de SSA - Pituba, vi seu pedido de conexão \"Pessoas que desejam reformar imóveis.\" e acho que posso contribuir.\n\nPodemos conversar?");
  });

  it("omits unavailable optional information", () => {
    expect(createConnectionMessage({
      eventName: "SSA - Pituba",
      recipientFirstName: "Dani",
      recipientIdealAudience: "",
      senderCompany: null,
      senderName: "Raquel Magalhães",
    })).toBe("Olá, Dani!\n\nMeu nome é Raquel Magalhães.\n\nEstava na reunião de SSA - Pituba e acho que posso contribuir.\n\nPodemos conversar?");
  });
});
