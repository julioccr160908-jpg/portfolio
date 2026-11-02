// ============================================================================
// Development Process Steps Data
// ============================================================================

import { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: { pt: 'Discovery', en: 'Discovery' },
    description: {
      pt: 'Entendimento das necessidades e objetivos do projeto.',
      en: 'Understanding project needs and objectives.',
    },
    icon: 'Search',
  },
  {
    number: '02',
    title: { pt: 'Planning', en: 'Planning' },
    description: {
      pt: 'Planejamento da solução, funcionalidades e arquitetura.',
      en: 'Solution planning, features and architecture.',
    },
    icon: 'PenTool',
  },
  {
    number: '03',
    title: { pt: 'Development', en: 'Development' },
    description: {
      pt: 'Desenvolvimento da interface, backend, banco de dados e integrações.',
      en: 'Interface, backend, database and integration development.',
    },
    icon: 'Code2',
  },
  {
    number: '04',
    title: { pt: 'Testing', en: 'Testing' },
    description: {
      pt: 'Validação, testes e correção de problemas.',
      en: 'Validation, testing and bug fixing.',
    },
    icon: 'CheckCircle',
  },
  {
    number: '05',
    title: { pt: 'Delivery', en: 'Delivery' },
    description: {
      pt: 'Entrega e disponibilização da solução.',
      en: 'Solution delivery and deployment.',
    },
    icon: 'Rocket',
  },
];
