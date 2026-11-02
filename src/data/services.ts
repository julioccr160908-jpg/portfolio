// ============================================================================
// Service Areas Data
// ============================================================================

import { ServiceArea } from '@/types';

export const serviceAreas: ServiceArea[] = [
  {
    id: 'web-development',
    number: '01',
    title: {
      pt: 'Web Development',
      en: 'Web Development',
    },
    subtitle: {
      pt: 'Desenvolvimento de experiências web modernas',
      en: 'Building modern web experiences',
    },
    description: {
      pt: 'Criação de interfaces web responsivas, rápidas e com foco na experiência do usuário.',
      en: 'Creating responsive, fast web interfaces focused on user experience.',
    },
    items: [
      { pt: 'Landing Pages', en: 'Landing Pages' },
      { pt: 'Sites institucionais', en: 'Institutional websites' },
      { pt: 'Sites comerciais', en: 'Commercial websites' },
      { pt: 'Interfaces responsivas', en: 'Responsive interfaces' },
      { pt: 'Experiência do usuário', en: 'User experience' },
    ],
    icon: 'Globe',
  },
  {
    id: 'backend-systems',
    number: '02',
    title: {
      pt: 'Backend & Systems',
      en: 'Backend & Systems',
    },
    subtitle: {
      pt: 'Desenvolvimento da estrutura e lógica dos sistemas',
      en: 'Building system structure and logic',
    },
    description: {
      pt: 'Construção de APIs robustas, sistemas seguros e arquiteturas escaláveis.',
      en: 'Building robust APIs, secure systems and scalable architectures.',
    },
    items: [
      { pt: 'Python', en: 'Python' },
      { pt: 'FastAPI', en: 'FastAPI' },
      { pt: 'APIs REST', en: 'REST APIs' },
      { pt: 'Sistemas personalizados', en: 'Custom systems' },
      { pt: 'Bancos de dados SQL', en: 'SQL Databases' },
      { pt: 'Autenticação e gerenciamento', en: 'Auth & management' },
    ],
    icon: 'Server',
  },
  {
    id: 'automation-integrations',
    number: '03',
    title: {
      pt: 'Automation & Integrations',
      en: 'Automation & Integrations',
    },
    subtitle: {
      pt: 'Automatização de processos e comunicação entre sistemas',
      en: 'Process automation and system communication',
    },
    description: {
      pt: 'Criação de fluxos automatizados para otimizar operações e conectar plataformas.',
      en: 'Creating automated workflows to optimize operations and connect platforms.',
    },
    items: [
      { pt: 'Automação de processos', en: 'Process automation' },
      { pt: 'Integração com WhatsApp', en: 'WhatsApp integration' },
      { pt: 'Integração entre APIs', en: 'API integration' },
      { pt: 'Notificações automatizadas', en: 'Automated notifications' },
      { pt: 'Processamento de informações', en: 'Data processing' },
    ],
    icon: 'Workflow',
  },
  {
    id: 'custom-software',
    number: '04',
    title: {
      pt: 'Custom Software',
      en: 'Custom Software',
    },
    subtitle: {
      pt: 'Soluções desenvolvidas para necessidades específicas',
      en: 'Solutions built for specific needs',
    },
    description: {
      pt: 'Desenvolvimento de software sob medida para resolver problemas únicos do negócio.',
      en: 'Custom software development to solve unique business problems.',
    },
    items: [
      { pt: 'Sistemas administrativos', en: 'Admin systems' },
      { pt: 'Painéis de gerenciamento', en: 'Management dashboards' },
      { pt: 'Sistemas empresariais', en: 'Enterprise systems' },
      { pt: 'Ferramentas internas', en: 'Internal tools' },
      { pt: 'Aplicações sob demanda', en: 'On-demand applications' },
    ],
    icon: 'Blocks',
  },
];
