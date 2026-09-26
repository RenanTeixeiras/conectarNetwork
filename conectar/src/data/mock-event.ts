export type Profile = {
  id: string;
  name: string;
  profession: string;
  company?: string;
  segment: string;
  city: string;
  bio: string;
  whatIDo: string;
  whatIOffer: string;
  whoIHelp: string;
  tags: string[];
  offerTags: string[];
  targetTags: string[];
  contact: {
    whatsapp?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export const event = {
  name: "Primeiro encontro no La Pulperia",
  shortName: "La Pulperia",
  slug: "primeiro-encontro-la-pulperia",
  date: "01 de outubro de 2026",
  place: "La Pulperia",
};

export const currentProfile: Profile = {
  id: "renan-teixeira",
  name: "Renan Teixeira",
  profession: "Desenvolvedor de Software",
  company: "NG7",
  segment: "Tecnologia",
  city: "Salvador - BA",
  bio: "Crio produtos digitais que tornam processos mais simples e úteis.",
  whatIDo: "Desenvolvo sistemas, integrações, automações e produtos digitais.",
  whatIOffer: "Software, automação e soluções digitais para empresas.",
  whoIHelp: "Empresas que precisam organizar processos, vendas e atendimento.",
  tags: ["Tecnologia", "Dados", "Automação"],
  offerTags: ["Tecnologia", "Automação", "Dados"],
  targetTags: ["Empreendedorismo", "Gestão"],
  contact: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
};

export const profiles: Profile[] = [
  {
    id: "marina-souza",
    name: "Marina Souza",
    profession: "Arquiteta",
    company: "Santos Arquitetura",
    segment: "Arquitetura",
    city: "Salvador - BA",
    bio: "Arquiteta especializada em projetos residenciais e comerciais.",
    whatIDo: "Desenvolvo projetos arquitetônicos, interiores e acompanho obras.",
    whatIOffer: "Arquitetura, reformas e planejamento de espaços.",
    whoIHelp: "Pessoas e empresas que precisam projetar, reformar ou organizar espaços.",
    tags: ["Arquitetura", "Construção", "Interiores"],
    offerTags: ["Arquitetura", "Construção"],
    targetTags: ["Construção", "Empreendedorismo"],
    contact: { whatsapp: "5571999999999", linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
  {
    id: "carlos-mendes",
    name: "Carlos Mendes",
    profession: "Consultor Empresarial",
    company: "CM Consultoria",
    segment: "Gestão",
    city: "Salvador - BA",
    bio: "Ajudo empresas a organizarem decisões, processos e crescimento.",
    whatIDo: "Atuo com estratégia, gestão e estruturação comercial.",
    whatIOffer: "Planejamento, gestão e desenvolvimento de negócios.",
    whoIHelp: "Empresas em crescimento que precisam de estratégia e organização comercial.",
    tags: ["Gestão", "Estratégia", "Negócios"],
    offerTags: ["Gestão", "Estratégia"],
    targetTags: ["Empreendedorismo", "Gestão"],
    contact: { linkedin: "https://linkedin.com" },
  },
  {
    id: "ana-lima",
    name: "Ana Lima",
    profession: "Marketing",
    company: "Lima Marketing",
    segment: "Marketing",
    city: "Salvador - BA",
    bio: "Estratégia de marca e comunicação para negócios em crescimento.",
    whatIDo: "Desenho posicionamento, campanhas e conteúdo para empresas.",
    whatIOffer: "Marketing, marca e comunicação estratégica.",
    whoIHelp: "Empresas que querem fortalecer marca, campanhas e vendas.",
    tags: ["Marketing", "Marca", "Vendas"],
    offerTags: ["Marketing", "Vendas"],
    targetTags: ["Empreendedorismo", "Vendas"],
    contact: { whatsapp: "5571988888888", instagram: "https://instagram.com" },
  },
  {
    id: "joao-santos",
    name: "João Santos",
    profession: "Contador",
    company: "JS Contabilidade",
    segment: "Finanças",
    city: "Salvador - BA",
    bio: "Contabilidade próxima para negócios que querem crescer com segurança.",
    whatIDo: "Cuido da estrutura contábil e financeira de empresas.",
    whatIOffer: "Contabilidade, planejamento tributário e organização financeira.",
    whoIHelp: "Empreendedores e empresas que precisam organizar finanças e contabilidade.",
    tags: ["Finanças", "Gestão", "Empreendedorismo"],
    offerTags: ["Finanças", "Gestão"],
    targetTags: ["Empreendedorismo", "Gestão"],
    contact: { whatsapp: "5571977777777", linkedin: "https://linkedin.com" },
  },
  {
    id: "beatriz-costa",
    name: "Beatriz Costa",
    profession: "Advogada",
    company: "Costa & Associados",
    segment: "Jurídico",
    city: "Salvador - BA",
    bio: "Advogada com foco em contratos e relações empresariais.",
    whatIDo: "Atuo preventivamente em contratos e decisões empresariais.",
    whatIOffer: "Jurídico, contratos e estruturação societária.",
    whoIHelp: "Empresas que precisam estruturar contratos e decisões societárias.",
    tags: ["Jurídico", "Contratos", "Negócios"],
    offerTags: ["Jurídico", "Contratos"],
    targetTags: ["Empreendedorismo", "Gestão"],
    contact: { linkedin: "https://linkedin.com" },
  },
  {
    id: "rafael-lima",
    name: "Rafael Lima",
    profession: "Empreendedor",
    company: "RL Negócios",
    segment: "Empreendedorismo",
    city: "Salvador - BA",
    bio: "Empreendedor interessado em construir negócios sustentáveis.",
    whatIDo: "Desenvolvo e acompanho negócios em fase de crescimento.",
    whatIOffer: "Parcerias, visão comercial e novos negócios.",
    whoIHelp: "Pessoas e empresas que buscam novos negócios, parceiros e crescimento comercial.",
    tags: ["Empreendedorismo", "Vendas", "Parcerias"],
    offerTags: ["Empreendedorismo", "Parcerias"],
    targetTags: ["Empreendedorismo", "Vendas"],
    contact: { instagram: "https://instagram.com" },
  },
];

export const allProfiles = [currentProfile, ...profiles];

export const onboardingTags = [
  "Tecnologia",
  "Marketing",
  "Jurídico",
  "Construção",
  "Arquitetura",
  "Finanças",
  "Vendas",
  "Gestão",
  "Dados",
  "Automação",
  "Empreendedorismo",
  "Parcerias",
];
