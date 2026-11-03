'use client';

import React, { Suspense, lazy } from 'react';
import type { ProjectDemo, Locale, RegisteredDemoComponent } from '@/types';
import LiveWebsiteDemo from './LiveWebsiteDemo';
import GalleryDemo from './GalleryDemo';
import { Loader2, Code2 } from 'lucide-react';

// Typed registry for interactive demonstration components
const DEMO_COMPONENTS: Record<
  RegisteredDemoComponent,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>
> = {
  FleetManagementDemo: lazy(() => import('@/demos/systems/FleetManagementDemo')),
  WhatsAppAutomationDemo: lazy(() => import('@/demos/automations/WhatsAppAutomationDemo')),
};

interface DemoRendererProps {
  demo: ProjectDemo;
  projectTitle: string;
  locale: Locale;
}

export default function DemoRenderer({ demo, projectTitle, locale }: DemoRendererProps) {
  switch (demo.type) {
    case 'iframe':
      return (
        <LiveWebsiteDemo
          url={demo.url}
          projectTitle={projectTitle}
          locale={locale}
        />
      );

    case 'gallery':
      return (
        <GalleryDemo
          images={demo.images}
          projectTitle={projectTitle}
          locale={locale}
        />
      );

    case 'component':
    case 'simulation': {
      const ComponentToRender = DEMO_COMPONENTS[demo.component];

      if (!ComponentToRender) {
        return (
          <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-8 text-center text-[#A1A1AA]">
            {locale === 'pt' ? 'Demonstração não encontrada no registro.' : 'Demo not registered.'}
          </div>
        );
      }

      return (
        <Suspense
          fallback={
            <div className="flex h-96 w-full items-center justify-center rounded-2xl border border-[#27272A] bg-[#111114]">
              <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
            </div>
          }
        >
          <ComponentToRender />
        </Suspense>
      );
    }

    case 'none':
    default:
      return (
        <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] text-[#3B82F6] mb-3">
            <Code2 className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-[#FAFAFA]">
            {locale === 'pt' ? 'Demonstração Interativa Indisponível' : 'Interactive Demo Unavailable'}
          </h3>
          <p className="mt-1 text-xs text-[#A1A1AA] max-w-md mx-auto">
            {locale === 'pt'
              ? 'Este projeto foca em arquitetura backend, regras de negócio e infraestrutura de dados sem interface pública.'
              : 'This project focuses on backend architecture, business logic and data persistence without a public UI sandbox.'}
          </p>
        </div>
      );
  }
}
