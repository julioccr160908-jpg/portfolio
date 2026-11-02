// ============================================================================
// Site Configuration
// All personal data is centralized here for easy customization
// ============================================================================

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Julio',
  title: {
    pt: 'Julio — Full Stack Developer',
    en: 'Julio — Full Stack Developer',
  },
  description: {
    pt: 'Desenvolvedor Full Stack especializado em aplicações web, sistemas personalizados, APIs e automações.',
    en: 'Full Stack Developer specialized in web applications, custom systems, APIs and automations.',
  },
  available: true,
  contact: {
    whatsapp: '', // Configure: seu número com código do país, ex: '5511999999999'
    email: '', // Configure: seu e-mail
    github: '', // Configure: seu username do GitHub
    linkedin: '', // Configure: seu username do LinkedIn
  },
  profileImage: '', // Configure: caminho para sua foto de perfil em /public
};
