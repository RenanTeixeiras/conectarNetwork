import { describe, expect, it } from "vitest";
import { createConnectionMessage } from "./whatsapp-message";

describe("createConnectionMessage", () => {
  it("includes the sender, event and recipient connection request", () => {
    expect(createConnectionMessage({
      eventName: "Conectar La Pulperia",
      venueName: "LA PULPERIA",
      recipientFirstName: "Dani",
      recipientIdealAudience: "Pessoas que desejam reformar imóveis.",
      senderCompany: "Raquel Magalhães Coffee & Eventos",
      senderName: "Raquel Magalhães",
    })).toBe("Olá, Dani!\n\nMeu nome é Raquel Magalhães da empresa Raquel Magalhães Coffee & Eventos.\n\nEstava na reunião do Conectar no La Pulperia, vi seu pedido de conexão \"Pessoas que desejam reformar imóveis.\" e acho que posso contribuir.\n\nPodemos conversar?");
  });

  it("omits unavailable optional information", () => {
    expect(createConnectionMessage({
      eventName: "Conectar La Pulperia",
      recipientFirstName: "Dani",
      recipientIdealAudience: "",
      senderCompany: null,
      senderName: "Raquel Magalhães",
    })).toBe("Olá, Dani!\n\nMeu nome é Raquel Magalhães.\n\nEstava na reunião de Conectar La Pulperia e acho que posso contribuir.\n\nPodemos conversar?");
  });
});
