// ============================================================================
// Internationalization System
// ============================================================================

import { Locale, LocalizedString } from '@/types';

// ============================================================================
// Translation Dictionary
// ============================================================================

export const translations = {
  // Navigation
  nav: {
    about: { pt: 'Sobre', en: 'About' },
    services: { pt: 'Serviços', en: 'Services' },
    projects: { pt: 'Projetos', en: 'Projects' },
    technologies: { pt: 'Tecnologias', en: 'Technologies' },
    contact: { pt: 'Contato', en: 'Contact' },
  },

  // Hero Section
  hero: {
    role: { pt: 'FULL STACK DEVELOPER', en: 'FULL STACK DEVELOPER' },
    title: {
      pt: 'Construindo soluções digitais que conectam ideias e tecnologia.',
      en: 'Building digital solutions that connect ideas and technology.',
    },
    subtitle: {
      pt: 'Desenvolvo aplicações web, sistemas personalizados e automações, conectando interfaces modernas a arquiteturas backend eficientes.',
      en: 'Developing web applications, custom systems and automations, connecting modern interfaces with efficient backend architectures.',
    },
    exploreProjects: { pt: 'Explorar projetos', en: 'Explore projects' },
    letsTalk: { pt: 'Vamos conversar', en: "Let's talk" },
    available: { pt: 'Disponível para projetos', en: 'Available for projects' },
    unavailable: { pt: 'Indisponível no momento', en: 'Currently unavailable' },
  },

  // About Section
  about: {
    sectionLabel: { pt: 'Sobre mim', en: 'About me' },
    title: { pt: 'Além do código.', en: 'Beyond the code.' },
    paragraph1: {
      pt: 'Sou desenvolvedor e entusiasta da tecnologia, interessado em construir soluções que realmente façam diferença.',
      en: "I'm a developer and technology enthusiast, passionate about building solutions that truly make a difference.",
    },
    paragraph2: {
      pt: 'Trabalho com desenvolvimento web, backend, bancos de dados e automações, explorando diferentes tecnologias para transformar necessidades em aplicações funcionais.',
      en: 'I work with web development, backend, databases and automations, exploring different technologies to transform needs into functional applications.',
    },
    paragraph3: {
      pt: 'Gosto de compreender a lógica por trás dos sistemas, desenvolver soluções organizadas e aprender constantemente através de projetos práticos.',
      en: 'I enjoy understanding the logic behind systems, developing organized solutions and constantly learning through practical projects.',
    },
    paragraph4: {
      pt: 'Para mim, programar vai além de escrever código: é entender problemas, estruturar ideias e construir ferramentas úteis.',
      en: 'For me, programming goes beyond writing code: it\'s about understanding problems, structuring ideas and building useful tools.',
    },
  },

  // Services Section
  services: {
    sectionLabel: { pt: 'Áreas de atuação', en: 'Services' },
    title: { pt: 'Soluções completas.', en: 'Complete solutions.' },
  },

  // Projects Section
  projects: {
    sectionLabel: { pt: 'Projetos', en: 'Projects' },
    title: { pt: 'Projetos em destaque.', en: 'Featured projects.' },
    explore: { pt: 'Explorar projeto', en: 'Explore project' },
    viewAll: { pt: 'Ver todos os projetos', en: 'View all projects' },
    filterAll: { pt: 'Todos', en: 'All' },
    filterLandingPages: { pt: 'Landing Pages', en: 'Landing Pages' },
    filterWebsites: { pt: 'Websites', en: 'Websites' },
    filterSystems: { pt: 'Sistemas', en: 'Systems' },
    filterBackend: { pt: 'Backend / APIs', en: 'Backend / APIs' },
    filterAutomations: { pt: 'Automações', en: 'Automations' },
  },

  // Project Page
  projectPage: {
    overview: { pt: 'Visão Geral', en: 'Overview' },
    interactivePreview: { pt: 'Prévia Interativa', en: 'Interactive Preview' },
    challenge: { pt: 'O Desafio', en: 'The Challenge' },
    solution: { pt: 'A Solução', en: 'The Solution' },
    features: { pt: 'Funcionalidades', en: 'Features' },
    architecture: { pt: 'Arquitetura', en: 'Architecture' },
    technologies: { pt: 'Tecnologias', en: 'Technologies' },
    gallery: { pt: 'Galeria', en: 'Gallery' },
    sourceLinks: { pt: 'Código & Links', en: 'Source & Links' },
    backToProjects: { pt: 'Voltar aos projetos', en: 'Back to projects' },
    viewSource: { pt: 'Ver código fonte', en: 'View source code' },
    viewLive: { pt: 'Ver site ao vivo', en: 'View live site' },
    fullscreen: { pt: 'Tela cheia', en: 'Fullscreen' },
    exitFullscreen: { pt: 'Sair da tela cheia', en: 'Exit fullscreen' },
    restart: { pt: 'Reiniciar demonstração', en: 'Restart demo' },
    simulatedData: { pt: 'Dados simulados', en: 'Simulated data' },
    liveWebsite: { pt: 'Site ao vivo', en: 'Live Website' },
    interactiveDemo: { pt: 'Demonstração Interativa', en: 'Interactive Demo' },
    automationSimulator: { pt: 'Simulador de Automação', en: 'Automation Simulator' },
    visualGallery: { pt: 'Galeria Visual', en: 'Visual Gallery' },
  },

  // Demo
  demo: {
    browserBar: { pt: 'Demonstração', en: 'Demo' },
    loading: { pt: 'Carregando...', en: 'Loading...' },
    startSimulation: { pt: 'Iniciar simulação', en: 'Start simulation' },
    simulationRunning: { pt: 'Simulação em andamento...', en: 'Simulation running...' },
    simulationComplete: { pt: 'Simulação concluída', en: 'Simulation complete' },
    step: { pt: 'Etapa', en: 'Step' },
  },

  // Tech Stack Section
  techStack: {
    sectionLabel: { pt: 'Stack tecnológica', en: 'Tech Stack' },
    title: { pt: 'Ferramentas e tecnologias.', en: 'Tools and technologies.' },
    backend: { pt: 'Backend', en: 'Backend' },
    database: { pt: 'Banco de Dados', en: 'Database' },
    frontend: { pt: 'Frontend', en: 'Frontend' },
    tools: { pt: 'Ferramentas', en: 'Tools' },
  },

  // Process Section
  process: {
    sectionLabel: { pt: 'Processo', en: 'Process' },
    title: { pt: 'Da ideia à implementação.', en: 'From idea to implementation.' },
  },

  // Contact Section
  contact: {
    sectionLabel: { pt: 'Contato', en: 'Contact' },
    title: { pt: 'Tem um projeto em mente?', en: 'Have a project in mind?' },
    description: {
      pt: 'Se você precisa de um site, sistema personalizado ou automação, vamos conversar.',
      en: "Whether you need a website, custom system or automation, let's talk.",
    },
    sendMessage: { pt: 'Enviar mensagem', en: 'Send message' },
    whatsapp: { pt: 'WhatsApp', en: 'WhatsApp' },
    email: { pt: 'E-mail', en: 'Email' },
  },

  // Footer
  footer: {
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
    builtWith: { pt: 'Construído com', en: 'Built with' },
  },

  // Common
  common: {
    loading: { pt: 'Carregando...', en: 'Loading...' },
    error: { pt: 'Erro', en: 'Error' },
    close: { pt: 'Fechar', en: 'Close' },
    open: { pt: 'Abrir', en: 'Open' },
    menu: { pt: 'Menu', en: 'Menu' },
  },
} as const;

// ============================================================================
// Helper function to get translated string
// ============================================================================

export function t(localizedString: LocalizedString, locale: Locale): string {
  return localizedString[locale] || localizedString.pt || '';
}

// ============================================================================
// Type for translation keys
// ============================================================================

export type TranslationKey = keyof typeof translations;

