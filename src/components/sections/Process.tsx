'use client';

import { Search, PenTool, Code2, CheckCircle, Rocket } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import { processSteps } from '@/data';
import SectionLabel from '@/components/ui/SectionLabel';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  PenTool,
  Code2,
  CheckCircle,
  Rocket,
};

export default function Process() {
  const { locale } = useLanguage();

  return (
    <section id="process" className="relative bg-[#09090B] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <SectionLabel label={t(translations.process.sectionLabel, locale)} />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
            {t(translations.process.title, locale)}
          </h2>
          <p className="mt-3 text-sm text-[#A1A1AA]">
            {locale === 'pt'
              ? 'Uma metodologia transparente e iterativa para transformar requisitos em software funcional com alta confiabilidade.'
              : 'A transparent, iterative methodology to turn requirements into functional software with high reliability.'}
          </p>
        </div>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-[#27272A]" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {processSteps.map((step) => {
              const Icon = iconMap[step.icon] || Code2;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Step Node Circle */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#27272A] bg-[#111114] shadow-lg shadow-black/40 transition-all duration-300 group-hover:border-[#3B82F6] group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[#A1A1AA] transition-colors group-hover:text-[#3B82F6]" />
                  </div>

                  {/* Step Number */}
                  <span className="mt-4 font-mono text-xs font-semibold tracking-wider text-[#3B82F6]">
                    STEP {step.number}
                  </span>

                  {/* Step Title */}
                  <h3 className="mt-1 text-base font-bold text-[#FAFAFA]">
                    {t(step.title, locale)}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA] max-w-xs">
                    {t(step.description, locale)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

