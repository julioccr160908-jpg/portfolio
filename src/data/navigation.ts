// ============================================================================
// Navigation Data
// ============================================================================

import { NavItem, CategoryFilter } from '@/types';

export const navItems: NavItem[] = [
  { label: { pt: 'Sobre', en: 'About' }, href: '#about' },
  { label: { pt: 'Serviços', en: 'Services' }, href: '#services' },
  { label: { pt: 'Projetos', en: 'Projects' }, href: '#projects' },
  { label: { pt: 'Tecnologias', en: 'Technologies' }, href: '#technologies' },
  { label: { pt: 'Contato', en: 'Contact' }, href: '#contact' },
];

export const categoryFilters: CategoryFilter[] = [
  { value: 'all', label: { pt: 'Todos', en: 'All' } },
  { value: 'landing-page', label: { pt: 'Landing Pages', en: 'Landing Pages' } },
  { value: 'website', label: { pt: 'Websites', en: 'Websites' } },
  { value: 'system', label: { pt: 'Sistemas', en: 'Systems' } },
  { value: 'backend-api', label: { pt: 'Backend / APIs', en: 'Backend / APIs' } },
  { value: 'automation', label: { pt: 'Automações', en: 'Automations' } },
];

