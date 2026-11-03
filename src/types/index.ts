// ============================================================================
// Portfolio Types
// ============================================================================

export type Locale = 'pt' | 'en';

export interface LocalizedString {
  pt: string;
  en: string;
}

export interface LocalizedContent {
  pt: string;
  en: string;
}

// ============================================================================
// Project Types & Discriminated Demo Union
// ============================================================================

export type ProjectCategory = 
  | 'landing-page'
  | 'website'
  | 'system'
  | 'backend-api'
  | 'automation';

/**
 * Registry of interactive demonstration components
 */
export type RegisteredDemoComponent = 
  | 'FleetManagementDemo' 
  | 'WhatsAppAutomationDemo';

export interface IframeDemo {
  type: 'iframe';
  url: string;
  allowFullscreen?: boolean;
}

export interface ComponentDemo {
  type: 'component';
  component: RegisteredDemoComponent;
}

export interface SimulationDemo {
  type: 'simulation';
  component: RegisteredDemoComponent;
  initialStep?: number;
}

export interface GalleryDemoConfig {
  type: 'gallery';
  images: ProjectImage[];
}

export interface NoneDemo {
  type: 'none';
}

/**
 * Discriminated union for project demonstrations ensuring valid type configurations:
 * - iframe: requires url
 * - component: requires registered component
 * - simulation: requires registered component & optional initial step
 * - gallery: requires array of images
 * - none: represents projects without interactive demos
 */
export type ProjectDemo = 
  | IframeDemo 
  | ComponentDemo 
  | SimulationDemo 
  | GalleryDemoConfig 
  | NoneDemo;

export type DemoType = ProjectDemo['type'];

export interface ProjectImage {
  src: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
}

export interface ProjectLink {
  github?: string;
  live?: string;
  demo?: string;
}

export interface ProjectFeature {
  title: LocalizedString;
  description: LocalizedString;
  image?: string;
}

export interface ProjectArchitecture {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  apis?: string[];
  services?: string[];
  integrations?: string[];
}

export interface ProjectCaseStudy {
  challenge: LocalizedContent;
  solution: LocalizedContent;
  features: ProjectFeature[];
  architecture?: ProjectArchitecture;
}

export interface Project {
  id: string;
  title: LocalizedString;
  category: ProjectCategory;
  description: LocalizedString;
  shortDescription: LocalizedString;
  coverImage: string;
  technologies: string[];
  services?: string[];
  demo: ProjectDemo;
  links: ProjectLink;
  caseStudy: ProjectCaseStudy;
  featured: boolean;
  order: number;
}

// ============================================================================
// Technology Stack Types
// ============================================================================

export type TechCategory = 'backend' | 'database' | 'frontend' | 'tools';

export interface Technology {
  name: string;
  icon: string;
  category: TechCategory;
}

// ============================================================================
// Service Area Types
// ============================================================================

export interface ServiceArea {
  id: string;
  number: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  items: LocalizedString[];
  icon: string;
}

// ============================================================================
// Contact Types
// ============================================================================

export interface ContactInfo {
  whatsapp?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  name: string;
  title: LocalizedString;
  description: LocalizedString;
  available: boolean;
  contact: ContactInfo;
  profileImage?: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  label: LocalizedString;
  href: string;
}

// ============================================================================
// Process Step Types
// ============================================================================

export interface ProcessStep {
  number: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

// ============================================================================
// Category Filter Types
// ============================================================================

export interface CategoryFilter {
  value: ProjectCategory | 'all';
  label: LocalizedString;
}
