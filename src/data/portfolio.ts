export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  images: {
    desktop: string;
    mobile: string;
  };
  highlightMetric?: string;
}

export interface Specialty {
  id: string;
  category: string;
  summary: string;
  items: string[];
  badge: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface PortfolioData {
  developer: {
    name: string;
    role: string;
    shortTitle: string;
    availability: string;
    isAvailable: boolean;
    profileImage: string;
    headline: {
      line1: string;
      line2: string;
      highlight: string;
    };
    subheadline: string;
    about: {
      tag: string;
      title: string;
      caption: string;
      paragraphs: string[];
      principles: { number: string; title: string; desc: string }[];
    };
  };
  navigation: { label: string; href: string }[];
  projects: Project[];
  specialties: Specialty[];
  faqItems: FaqItem[];
  contacts: {
    whatsapp: {
      url: string;
      display: string;
      message: string;
    };
    github: {
      url: string;
      display: string;
    };
    instagram: {
      url: string;
      display: string;
    };
  };
  footer: {
    headline: string;
    subheadline: string;
    copyright: string;
  };
}

export const portfolioData: PortfolioData = {
  developer: {
    name: "Júlio Carneiro",
    role: "Desenvolvedor Web & Engenheiro Frontend",
    shortTitle: "Desenvolvedor Web",
    availability: "Disponível para novos projetos",
    isAvailable: true,
    profileImage: "/images/julio-profile.jpg",
    headline: {
      line1: "Landing pages de alta conversão,",
      line2: "interfaces rápidas e aplicações",
      highlight: "sob medida.",
    },
    subheadline:
      "Unindo estética editorial refinada, engenharia moderna e obsessão por performance para transformar tráfego em clientes reais.",
    about: {
      tag: "03 // SOBRE MIM",
      title: "Design limpo, código rápido e foco no resultado.",
      caption: "JÚLIO CARNEIRO · DEV WEB",
      paragraphs: [
        "Sou Júlio Carneiro, desenvolvedor web focado em construir interfaces rápidas, landing pages pensadas para conversão e aplicações web modernas sob medida.",
        "Cuido tanto do acabamento visual quanto da engenharia por trás do projeto, unindo design editorial autêntico a código limpo e otimizado para o celular.",
      ],
      principles: [
        {
          number: "01",
          title: "Design sob medida",
          desc: "Layout autêntico e pensado para o seu negócio, sem templates genéricos.",
        },
        {
          number: "02",
          title: "Código otimizado",
          desc: "Páginas leves em Next.js com carregamento quase instantâneo e zero travamentos.",
        },
        {
          number: "03",
          title: "Contato direto sem intermediários",
          desc: "Comunicação clara e transparente do início à publicação no ar.",
        },
      ],
    },
  },
  navigation: [
    { label: "Projetos", href: "#projetos" },
    { label: "Stack", href: "#stack" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ],
  projects: [
    {
      id: "jucarneiro",
      number: "01",
      title: "Ju Carneiro – Estética & Pós-Operatório",
      subtitle: "Clínica Especializada & Procedimentos",
      description:
        "Landing page institucional e de captação desenvolvida para clínica de estética e cuidados pós-operatórios, com foco em autoridade visual, leitura fluida e conversão rápida para agendamentos.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Alta Conversão", "SEO"],
      liveUrl: "https://jucarneiro.vercel.app",
      images: {
        desktop: "/projects/jucarneiro-desktop.png",
        mobile: "/projects/jucarneiro-mobile.png",
      },
      highlightMetric: "Agendamento Direto no WhatsApp",
    },
    {
      id: "celula",
      number: "02",
      title: "Célula Energia Solar",
      subtitle: "Energia Solar Residencial & Comercial",
      description:
        "Landing page comercial e de simulação desenvolvida para a Célula Energia Solar em Jataí-GO. Estruturada para captação de clientes residenciais, empresariais e do agronegócio, com simulação de economia de até 95% na conta de energia e atendimento ágil.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "Alta Conversão", "Simulação de Economia"],
      liveUrl: "https://landingpage-celula.vercel.app",
      images: {
        desktop: "/projects/celula-desktop.png",
        mobile: "/projects/celula-mobile.png",
      },
      highlightMetric: "Economia de até 95% na Conta de Luz",
    },
  ],
  specialties: [
    {
      id: "frontend",
      category: "Frontend & Interfaces",
      badge: "01 // INTERFACE",
      summary:
        "Desenvolvimento de interfaces editoriais de alto padrão visual, precisão matemática de espaçamentos e fluidez de 60fps.",
      items: [
        "Next.js (App Router)",
        "React & TypeScript",
        "Tailwind CSS Moderno",
        "Framer Motion (60fps)",
        "Design Responsivo & Mobile First",
        "Micro-interações Táteis",
      ],
    },
    {
      id: "backend",
      category: "Backend & Engenharia",
      badge: "02 // ENGENHARIA",
      summary:
        "Estrutura de dados confiável, contratos type-safe e automações robustas para suportar operações reais.",
      items: [
        "Python & Ecossistema Moderno",
        "APIs RESTful & Webhooks",
        "Bancos de Dados Relacionais",
        "Docker & Contêineres",
        "Ambientes Linux & DevOps",
        "Arquitetura Limpa & Modular",
      ],
    },
    {
      id: "performance",
      category: "Performance & Conversão",
      badge: "03 // PERFORMANCE",
      summary:
        "Eliminação de gargalos de carregamento, conformidade com Core Web Vitals e gatilhos de persuasão CRO.",
      items: [
        "LCP < 1.5s & Zero Layout Shift (CLS)",
        "SEO Técnico & Metadados Open Graph",
        "Psicologia de Conversão (Fogg Model)",
        "Isolamento RSC Server/Client",
        "Acessibilidade & Contraste WCAG 2.2",
        "Otimização de Assets e Fontes",
      ],
    },
  ],
  faqItems: [
    {
      id: "instagram-vs-site",
      number: "01",
      question: "Por que ter um site se eu já uso o Instagram?",
      answer:
        "O Instagram é ótimo para descoberta, mas o alcance depende do algoritmo e o perfil tem formato engessado. Um site próprio é o seu espaço definitivo na internet: organiza seus serviços com clareza, passa autoridade imediata, aparece nas buscas do Google e conduz o visitante direto para o agendamento ou orçamento sem distrações.",
    },
    {
      id: "vendas-e-divulgacao",
      number: "02",
      question: "Um site realmente ajuda na divulgação e nas vendas?",
      answer:
        "Sim, principalmente quando trabalha junto com tráfego pago, Google ou o link da sua bio. Enquanto a rede social gera atenção, uma landing page bem estruturada faz o trabalho de convencimento: responde dúvidas rápidas, mostra seu trabalho com acabamento profissional e reduz o atrito até o clique no WhatsApp.",
    },
    {
      id: "custo-investimento",
      number: "03",
      question: "Criar um site profissional custa caro?",
      answer:
        "O investimento varia conforme o objetivo e o tamanho do projeto — uma landing page focada em conversão tem um escopo bem mais acessível do que um sistema completo sob medida. Mais do que um gasto fixo, o site é um ativo seu que trabalha 24 horas filtrando curiosos e trazendo contatos mais qualificados.",
    },
    {
      id: "prazo-e-processo",
      number: "04",
      question: "Quanto tempo leva para ficar pronto e como funciona?",
      answer:
        "Projetos de landing pages costumam ser entregues em poucos dias após o alinhamento inicial. Você não precisa entender da parte técnica: conversamos pelo WhatsApp sobre o seu negócio, eu estruturo o design e o código pensando em velocidade no celular, e publico o site pronto no ar.",
    },
  ],
  contacts: {
    whatsapp: {
      url: "https://wa.me/5564999032384",
      display: "(64) 9 9903-2384",
      message: "Olá Júlio. Gostaria de conversar sobre um projeto.",
    },
    github: {
      url: "https://github.com/julioccr160908-jpg",
      display: "github.com/julioccr160908-jpg",
    },
    instagram: {
      url: "https://instagram.com/julio_carneirox",
      display: "@julio_carneirox",
    },
  },
  footer: {
    headline: "Tem um projeto em mente?",
    subheadline:
      "Vamos transformar sua ideia ou negócio em uma interface digital rápida, memorável e pronta para converter.",
    copyright: "© 2026 Júlio Carneiro. Todos os direitos reservados.",
  },
};
