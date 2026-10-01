type ConnectionMessageInput = {
  eventName: string;
  recipientFirstName: string;
  recipientIdealAudience: string;
  senderCompany: string | null;
  senderName: string;
};

export function createConnectionMessage({ eventName, recipientFirstName, recipientIdealAudience, senderCompany, senderName }: ConnectionMessageInput) {
  const introduction = `Meu nome é ${senderName}${senderCompany ? ` da empresa ${senderCompany}` : ""}.`;
  const connectionRequest = recipientIdealAudience
    ? `, vi seu pedido de conexão "${recipientIdealAudience}"`
    : "";

  return `Olá, ${recipientFirstName}!\n\n${introduction}\n\nEstava na reunião de ${eventName}${connectionRequest} e acho que posso contribuir.\n\nPodemos conversar?`;
}
