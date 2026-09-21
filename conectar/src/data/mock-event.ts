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
  whatISeek: string;
  tags: string[];
  offerTags: string[];
  seekTags: string[];
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
  whatISeek: "Empresários, parceiros e oportunidades para soluções digitais.",
  tags: ["Tecnologia", "Dados", "Automação"],
  offerTags: ["Tecnologia", "Automação", "Dados"],
  seekTags: ["Empreendedorismo", "Parcerias"],
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
    whatISeek: "Tecnologia, marketing e parceiros para novos projetos.",
    tags: ["Arquitetura", "Construção", "Interiores"],
    offerTags: ["Arquitetura", "Construção"],
    seekTags: ["Tecnologia", "Marketing"],
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
    whatISeek: "Tecnologia e automação para apoiar meus clientes.",
    tags: ["Gestão", "Estratégia", "Negócios"],
    offerTags: ["Gestão", "Estratégia"],
    seekTags: ["Tecnologia", "Automação"],
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
    whatISeek: "Empresas em expansão e parceiros de tecnologia.",
    tags: ["Marketing", "Marca", "Vendas"],
    offerTags: ["Marketing", "Vendas"],
    seekTags: ["Tecnologia", "Empreendedorismo"],
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
    whatISeek: "Empreendedores e negócios em estruturação.",
    tags: ["Finanças", "Gestão", "Empreendedorismo"],
    offerTags: ["Finanças", "Gestão"],
    seekTags: ["Empreendedorismo"],
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
    whatISeek: "Empresas e parceiros para projetos de longo prazo.",
    tags: ["Jurídico", "Contratos", "Negócios"],
    offerTags: ["Jurídico", "Contratos"],
    seekTags: ["Tecnologia", "Parcerias"],
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
    whatISeek: "Tecnologia, gestão e profissionais para projetos em expansão.",
    tags: ["Empreendedorismo", "Vendas", "Parcerias"],
    offerTags: ["Empreendedorismo", "Parcerias"],
    seekTags: ["Tecnologia", "Gestão"],
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
