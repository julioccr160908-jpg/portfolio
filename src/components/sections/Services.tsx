'use client';

// ============================================================================
// Services Section
// ============================================================================

import React from 'react';
import { Globe, Server, Workflow, Blocks } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { t } from '@/i18n/translations';
import { translations } from '@/i18n/translations';
import { serviceAreas } from '@/data';
import SectionLabel from '@/components/ui/SectionLabel';
import type { ServiceArea } from '@/types';

// ============================================================================
// Icon Map
// ============================================================================

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Globe,
  Server,
  Workflow,
  Blocks,
};

// ============================================================================
// Service Card Component
// ============================================================================

function ServiceCard({ service, locale }: { service: ServiceArea; locale: 'pt' | 'en' }) {
  const IconComponent = iconMap[service.icon];

  return (
    <div className="group rounded-2xl border border-[#27272A] bg-[#111114] p-6 transition-colors hover:border-[#3B82F6]/50 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <span className="font-mono text-sm font-semibold text-[#3B82F6]">
          {service.number}
        </span>
        {IconComponent && (
          <IconComponent className="h-5 w-5 text-[#A1A1AA]" />
        )}
      </div>

      {/* Title & Subtitle */}
      <h3 className="mb-2 text-lg font-semibold text-[#FAFAFA]">
        {t(service.title, locale)}
      </h3>
      <p className="mb-6 text-sm text-[#A1A1AA]">
        {t(service.subtitle, locale)}
      </p>

      {/* Items List */}
      <ul className="space-y-2.5">
        {service.items.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-sm text-[#A1A1AA]">
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#3B82F6]" />
            {t(item, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// Services Section
// ============================================================================

export default function Services() {
  const { locale } = useLanguage();

  return (
    <section id="services" className="bg-[#09090B]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        {/* Section Header */}
        <div className="mb-16">
          <SectionLabel label={t(translations.services.sectionLabel, locale)} />
          <h2 className="mt-4 text-3xl font-bold text-[#FAFAFA] sm:text-4xl">
            {t(translations.services.title, locale)}
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {serviceAreas.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
