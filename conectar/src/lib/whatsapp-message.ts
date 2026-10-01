type ConnectionMessageInput = {
  eventName: string;
  venueName?: string | null;
  recipientFirstName: string;
  recipientIdealAudience: string;
  senderCompany: string | null;
  senderName: string;
};

export function createConnectionMessage({ eventName, venueName, recipientFirstName, recipientIdealAudience, senderCompany, senderName }: ConnectionMessageInput) {
  const venue = venueName?.trim().toLocaleLowerCase("pt-BR").replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1));
  const meeting = venue ? `do Conectar no ${venue}` : `de ${eventName}`;
  const introduction = `Meu nome é ${senderName}${senderCompany ? ` da empresa ${senderCompany}` : ""}.`;
  const connectionRequest = recipientIdealAudience
    ? `, vi seu pedido de conexão "${recipientIdealAudience}"`
    : "";

  return `Olá, ${recipientFirstName}!\n\n${introduction}\n\nEstava na reunião ${meeting}${connectionRequest} e acho que posso contribuir.\n\nPodemos conversar?`;
}
