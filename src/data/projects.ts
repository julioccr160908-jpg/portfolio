// ============================================================================
// Projects Data
// Add new projects here — the portfolio will automatically display them
// ============================================================================

import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'barberhost',
    title: {
      pt: 'BarberHost — Gestão para Barbearias',
      en: 'BarberHost — Barbershop Management',
    },
    category: 'system',
    shortDescription: {
      pt: 'Plataforma SaaS privada para gestão completa de barbearias, agendamentos e financeiro.',
      en: 'Private SaaS platform for complete barbershop management, scheduling and financials.',
    },
    description: {
      pt: 'Sistema de gestão completo e privado desenvolvido especificamente para barbearias. Inclui controle de agendamentos em tempo real, gestão de barbeiros com comissionamento dinâmico, comandas digitais, controle de fluxo de caixa, relatórios analíticos de faturamento e integração com clientes.',
      en: 'Complete and private management system built specifically for barbershops. Features real-time appointment scheduling, barber management with dynamic commissions, digital tickets, cash flow control, analytical billing reports and customer integration.',
    },
    coverImage: '/images/projects/barberhost-cover.svg',
    technologies: ['Python', 'FastAPI', 'MySQL', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    demo: {
      type: 'iframe',
      url: 'https://barberhost.com.br',
    },
    links: {
      live: 'https://barberhost.com.br',
    },
    caseStudy: {
      challenge: {
        pt: 'Barbearias lidam diariamente com agendas concorrentes entre profissionais, cancelamentos de última hora, cálculo complexo de comissões por serviço e fechamento diário de caixa sujeito a falhas humanas.',
        en: 'Barbershops deal daily with concurrent barber schedules, last-minute cancellations, complex commission calculations per service, and error-prone manual daily cash register closures.',
      },
      solution: {
        pt: 'Desenvolvimento do BarberHost como um SaaS sob medida: backend robusto com arquitetura orientada a serviços para processamento ágil de agendamentos, painel administrativo blindado e cálculo automatizado de comissões por barbeiro e produto.',
        en: 'Development of BarberHost as a tailored SaaS: robust backend with service-oriented architecture for quick appointment processing, protected administrative dashboard and automated commission calculations per barber and product.',
      },
      features: [
        {
          title: { pt: 'Agenda em Tempo Real', en: 'Real-Time Schedule' },
          description: {
            pt: 'Visualização da grade de horários por profissional com atualização instantânea.',
            en: 'Schedule grid view per professional with instant real-time synchronization.',
          },
        },
        {
          title: { pt: 'Comissionamento Automático', en: 'Automated Commissioning' },
          description: {
            pt: 'Divisão exata de porcentagens por serviço prestado ou produto vendido.',
            en: 'Exact percentage breakdown per rendered service or sold product.',
          },
        },
        {
          title: { pt: 'Comanda Digital', en: 'Digital Order Tickets' },
          description: {
            pt: 'Adição de serviços e itens de bar/conveniência com fechamento simplificado.',
            en: 'Addition of services and bar/convenience items with simplified checkout.',
          },
        },
        {
          title: { pt: 'DRE & Fluxo de Caixa', en: 'Cash Flow & Analytics' },
          description: {
            pt: 'Métricas de faturamento diário, ticket médio por cliente e controle de despesas.',
            en: 'Daily revenue metrics, average ticket per customer and expense tracking.',
          },
        },
      ],
      architecture: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
        backend: ['Python', 'FastAPI', 'Pydantic'],
        database: ['MySQL', 'SQLAlchemy'],
        apis: ['REST API', 'Webhooks'],
      },
    },
    featured: true,
    order: 1,
  },
  {
    id: 'whatsapp-automation',
    title: {
      pt: 'Automação WhatsApp Empresarial',
      en: 'Business WhatsApp Automation',
    },
    category: 'automation',
    shortDescription: {
      pt: 'Sistema de automação para atendimento, consultas e notificações via WhatsApp.',
      en: 'Automation system for customer service, queries and notifications via WhatsApp.',
    },
    description: {
      pt: 'Sistema de automação empresarial integrado ao WhatsApp para atendimento automatizado, envio de notificações, processamento de solicitações e consulta de informações. O sistema recebe mensagens via Webhook seguro, processa intenções através de uma API FastAPI e retorna respostas personalizadas com dados do banco SQL.',
      en: 'Enterprise automation system integrated with WhatsApp for automated customer service, notification sending, request processing and information queries. The system receives messages via secure Webhook, processes intents through a FastAPI service and returns personalized responses from SQL database.',
    },
    coverImage: '/images/projects/whatsapp-automation-cover.svg',
    technologies: ['Python', 'FastAPI', 'MySQL', 'WhatsApp Business API'],
    demo: {
      type: 'simulation',
      component: 'WhatsAppAutomationDemo',
    },
    links: {
      github: undefined,
      live: undefined,
    },
    caseStudy: {
      challenge: {
        pt: 'Empresas recebem um alto volume de mensagens no WhatsApp com perguntas frequentes, solicitações de informações e pedidos de suporte. O atendimento manual é demorado, sujeito a erros e difícil de escalar.',
        en: 'Companies receive a high volume of WhatsApp messages with FAQs, information requests and support tickets. Manual customer service is time-consuming, error-prone and hard to scale.',
      },
      solution: {
        pt: 'Um pipeline assíncrono de eventos que recebe webhooks, valida autenticação por assinatura HMAC, identifica intenções através de filtros e NLP, consulta o banco de dados em milissegundos e envia respostas personalizadas com alta confiabilidade.',
        en: 'An asynchronous event pipeline receiving webhooks, validating HMAC signature authentication, identifying intents through filters and NLP, querying database in milliseconds and dispatching personalized responses with high reliability.',
      },
      features: [
        {
          title: { pt: 'Processamento automático', en: 'Automatic processing' },
          description: {
            pt: 'Identificação automática de intenções e roteamento de mensagens.',
            en: 'Automatic intent identification and message routing.',
          },
        },
        {
          title: { pt: 'Respostas com dados ao vivo', en: 'Live data responses' },
          description: {
            pt: 'Consulta instantânea ao banco relacional para envio de códigos de rastreio e status.',
            en: 'Instant query to relational database to dispatch tracking codes and real-time status.',
          },
        },
        {
          title: { pt: 'Notificações programadas', en: 'Scheduled notifications' },
          description: {
            pt: 'Envio automatizado de lembretes de agendamento e alertas operacionais.',
            en: 'Automated sending of appointment reminders and operational alerts.',
          },
        },
        {
          title: { pt: 'Painel de telemetria', en: 'Telemetry dashboard' },
          description: {
            pt: 'Acompanhamento de latência, taxa de entrega e volume de requisições por minuto.',
            en: 'Tracking latency, delivery rates and requests per minute volume.',
          },
        },
      ],
      architecture: {
        backend: ['Python', 'FastAPI', 'Uvicorn'],
        database: ['MySQL', 'SQLAlchemy'],
        apis: ['REST API', 'WhatsApp Business Cloud API'],
        integrations: ['WhatsApp Webhooks', 'Event-Driven Engine'],
      },
    },
    featured: true,
    order: 2,
  },
  {
    id: 'clinica-estetica-roan',
    title: {
      pt: 'Clínica Estética Roan',
      en: 'Roan Aesthetic Clinic',
    },
    category: 'landing-page',
    shortDescription: {
      pt: 'Landing page de alta conversão para clínica de estética avançada.',
      en: 'High-conversion landing page for advanced aesthetic clinic.',
    },
    description: {
      pt: 'Landing page moderna e sofisticada desenvolvida para a Clínica Estética Roan. Focada em posicionamento de marca premium, apresentação detalhada de procedimentos estéticos faciais e corporais, avaliações de pacientes e canal direto de agendamento via WhatsApp.',
      en: 'Modern and sophisticated landing page built for Roan Aesthetic Clinic. Focused on premium brand positioning, detailed presentation of facial and body aesthetic procedures, patient testimonials and direct WhatsApp booking channel.',
    },
    coverImage: '/images/projects/clinica-estetica-cover.svg',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'SEO'],
    demo: {
      type: 'iframe',
      url: 'https://clinica-estetica-roan.vercel.app',
    },
    links: {
      live: 'https://clinica-estetica-roan.vercel.app',
    },
    caseStudy: {
      challenge: {
        pt: 'A clínica necessitava de uma presença digital de alto padrão que transmitisse sofisticação e confiança, destacando a qualidade dos procedimentos para atrair clientes qualificados e converter visitas em agendamentos.',
        en: 'The clinic needed a high-standard digital presence conveying sophistication and trust, highlighting procedure quality to attract qualified patients and convert visitors into appointments.',
      },
      solution: {
        pt: 'Criação de uma landing page com design editorial elegante, paleta sofisticada, tipografia refinada, carregamento quase instantâneo e CTAs estrategicamente distribuídos para contato imediato.',
        en: 'Creation of an elegant editorial landing page with refined typography, lightning-fast load times and strategically placed CTAs for instant contact.',
      },
      features: [
        {
          title: { pt: 'Design Premium & Editorial', en: 'Premium Editorial Design' },
          description: {
            pt: 'Identidade visual alinhada ao público de estética avançada e bem-estar.',
            en: 'Visual identity aligned with high-end aesthetics and wellness clients.',
          },
        },
        {
          title: { pt: 'Conversão via WhatsApp', en: 'WhatsApp Conversion' },
          description: {
            pt: 'Botões de agendamento inteligentes com mensagens pré-configuradas por procedimento.',
            en: 'Smart booking buttons with pre-configured messages per procedure.',
          },
        },
        {
          title: { pt: 'Otimização Mobile First', en: 'Mobile First Optimization' },
          description: {
            pt: 'Fluidez impecável em smartphones, garantindo navegação rápida e sem atritos.',
            en: 'Flawless fluidity on smartphones, ensuring quick and frictionless navigation.',
          },
        },
      ],
      architecture: {
        frontend: ['Next.js', 'React', 'Tailwind CSS'],
        integrations: ['WhatsApp Business Link API'],
      },
    },
    featured: true,
    order: 3,
  },
  {
    id: 'landingpage-clinica',
    title: {
      pt: 'Clínica Médica & Saúde',
      en: 'Medical & Healthcare Clinic',
    },
    category: 'website',
    shortDescription: {
      pt: 'Site institucional focado em saúde, especialidades e agendamentos.',
      en: 'Institutional healthcare website focused on specialties and appointments.',
    },
    description: {
      pt: 'Website institucional desenvolvido para clínicas médicas e centros de saúde. Possui estrutura completa para apresentação do corpo clínico, especialidades médicas oferecidas, convênios atendidos, localização integrada e formulário de contato.',
      en: 'Institutional website built for medical clinics and healthcare centers. Complete structure presenting clinical staff, medical specialties, accepted health insurance, integrated location and contact form.',
    },
    coverImage: '/images/projects/landingpage-clinica-cover.svg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    demo: {
      type: 'iframe',
      url: 'https://landingpage-clinica.vercel.app',
    },
    links: {
      live: 'https://landingpage-clinica.vercel.app',
    },
    caseStudy: {
      challenge: {
        pt: 'Facilitar a busca do paciente por especialidades e médicos, apresentando de maneira transparente os convênios atendidos e reduzindo o tempo de resposta para marcação de consultas.',
        en: 'Facilitating patient searches for specialties and physicians, transparently presenting accepted insurance plans and decreasing response times for scheduling appointments.',
      },
      solution: {
        pt: 'Interface limpa, acessível e objetiva, com navegação intuitiva por especialidades e pontos de contato claros em todas as seções principais da página.',
        en: 'Clean, accessible and objective interface with intuitive specialty navigation and clear contact points across all primary sections.',
      },
      features: [
        {
          title: { pt: 'Navegação por Especialidades', en: 'Specialty Navigation' },
          description: {
            pt: 'Apresentação clara dos serviços médicos com orientações sobre preparo e exames.',
            en: 'Clear presentation of medical services with guidance on preparation and exams.',
          },
        },
        {
          title: { pt: 'Performance e Acessibilidade', en: 'Performance & Accessibility' },
          description: {
            pt: 'Código enxuto sem dependências pesadas, assegurando pontuação máxima no Google PageSpeed.',
            en: 'Lean code without heavy dependencies, ensuring top score on Google PageSpeed.',
          },
        },
      ],
      architecture: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
        services: ['Vercel Edge Network'],
      },
    },
    featured: true,
    order: 4,
  },
  {
    id: 'landingpage-celula',
    title: {
      pt: 'Célula — Loja de Energia Solar',
      en: 'Célula — Solar Energy Store',
    },
    category: 'landing-page',
    shortDescription: {
      pt: 'Landing page de alta conversão para loja de placas solares e projetos fotovoltaicos.',
      en: 'High-conversion landing page for solar panels store and photovoltaic systems.',
    },
    description: {
      pt: 'Landing page comercial desenvolvida para a Célula Energia Solar, loja especializada em placas fotovoltaicas, inversores e sistemas solares completos. Focada em demonstrar economia real de até 95% na conta de energia, simulação de retorno do investimento e captação de orçamentos via WhatsApp.',
      en: 'Commercial landing page developed for Célula Solar Energy, a store specializing in photovoltaic panels, inverters and complete solar systems. Focused on showcasing real savings of up to 95% on electricity bills, ROI simulation and quote generation via WhatsApp.',
    },
    coverImage: '/images/projects/landingpage-celula-cover.svg',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    demo: {
      type: 'iframe',
      url: 'https://landingpage-celula.vercel.app/',
    },
    links: {
      live: 'https://landingpage-celula.vercel.app/',
    },
    caseStudy: {
      challenge: {
        pt: 'Apresentar de maneira convincente e simples os benefícios financeiros e a economia a longo prazo da energia solar, gerando confiança para aquisição de kits fotovoltaicos de alto valor agregado.',
        en: 'Convincingly and simply presenting the financial benefits and long-term savings of solar energy, building trust for high-value photovoltaic kit purchases.',
      },
      solution: {
        pt: 'Criação de uma landing page com forte apelo visual, métricas claras de redução de custos, apresentação de equipamentos de ponta com 25 anos de garantia e chamadas persuasivas para simulação de projeto sem compromisso.',
        en: 'Creation of a landing page with strong visual appeal, clear cost reduction metrics, top-tier equipment showcase with 25-year warranties, and persuasive CTAs for no-obligation project simulations.',
      },
      features: [
        {
          title: { pt: 'Simulação de Economia', en: 'Savings Simulation' },
          description: {
            pt: 'Destaque visual da redução de até 95% nos custos mensais com energia elétrica.',
            en: 'Visual highlight of up to 95% reduction in monthly electricity costs.',
          },
        },
        {
          title: { pt: 'Catálogo de Placas e Inversores', en: 'Panels & Inverters Catalog' },
          description: {
            pt: 'Apresentação de equipamentos homologados e de alta eficiência energética.',
            en: 'Showcase of certified, high-energy efficiency photovoltaic equipment.',
          },
        },
        {
          title: { pt: 'Orçamento Rápido via WhatsApp', en: 'Quick WhatsApp Quote' },
          description: {
            pt: 'Botão integrado para envio da conta de luz e cálculo imediato de dimensionamento.',
            en: 'Integrated button to submit electricity bills and receive instant sizing calculations.',
          },
        },
        {
          title: { pt: 'Otimizada para Tráfego Pago', en: 'Optimized for Paid Traffic' },
          description: {
            pt: 'Carregamento instantâneo e alta taxa de conversão para campanhas de Google Ads.',
            en: 'Instant loading and high conversion rate for Google Ads and Meta campaigns.',
          },
        },
      ],
      architecture: {
        frontend: ['React', 'Next.js', 'Tailwind CSS'],
        services: ['Vercel Platform'],
      },
    },
    featured: false,
    order: 5,
  },
  {
    id: 'fleet-management',
    title: {
      pt: 'Sistema de Gestão de Frota',
      en: 'Fleet Management System',
    },
    category: 'system',
    shortDescription: {
      pt: 'Sistema completo para gerenciamento de veículos, motoristas e manutenções.',
      en: 'Complete system for managing vehicles, drivers and maintenance.',
    },
    description: {
      pt: 'Sistema de gerenciamento de frota empresarial com controle de veículos, motoristas, manutenções preventivas e relatórios operacionais. Desenvolvido com Python e FastAPI no backend, banco de dados MySQL e interface administrativa moderna.',
      en: 'Enterprise fleet management system with vehicle, driver, preventive maintenance control and operational reports. Built with Python and FastAPI backend, MySQL database and modern admin interface.',
    },
    coverImage: '/images/projects/fleet-management-cover.svg',
    technologies: ['Python', 'FastAPI', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    demo: {
      type: 'component',
      component: 'FleetManagementDemo',
    },
    links: {
      github: undefined,
      live: undefined,
    },
    caseStudy: {
      challenge: {
        pt: 'Empresas com frotas de veículos frequentemente enfrentam dificuldades para controlar manutenções, custos operacionais e documentação de motoristas.',
        en: 'Companies with vehicle fleets often struggle to control maintenance, operational costs and driver documentation.',
      },
      solution: {
        pt: 'Um sistema centralizado que permite o cadastro e acompanhamento de veículos, motoristas e manutenções com alertas preventivos.',
        en: 'A centralized system for registering and tracking vehicles, drivers and maintenance with preventive alerts.',
      },
      features: [
        {
          title: { pt: 'Dashboard operacional', en: 'Operational dashboard' },
          description: {
            pt: 'Visão geral da frota com indicadores de veículos ativos, manutenções pendentes e custos.',
            en: 'Fleet overview with active vehicle indicators, pending maintenance and costs.',
          },
        },
        {
          title: { pt: 'Gestão de veículos', en: 'Vehicle management' },
          description: {
            pt: 'Cadastro completo com dados do veículo, documentação e histórico de manutenções.',
            en: 'Complete registration with vehicle data, documentation and maintenance history.',
          },
        },
      ],
      architecture: {
        frontend: ['HTML', 'CSS', 'JavaScript'],
        backend: ['Python', 'FastAPI'],
        database: ['MySQL'],
        apis: ['REST API'],
      },
    },
    featured: false,
    order: 6,
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects.sort((a, b) => a.order - b.order);
  return projects
    .filter((p) => p.category === category)
    .sort((a, b) => a.order - b.order);
}
