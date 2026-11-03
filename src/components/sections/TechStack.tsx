'use client';

import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import { technologies } from '@/data';
import SectionLabel from '@/components/ui/SectionLabel';
import type { TechCategory } from '@/types';

// Tech category titles with localization
const categoryLabels: Record<TechCategory, { pt: string; en: string }> = {
  backend: { pt: 'Backend', en: 'Backend' },
  database: { pt: 'Banco de Dados', en: 'Database' },
  frontend: { pt: 'Frontend', en: 'Frontend' },
  tools: { pt: 'Ferramentas & Qualidade', en: 'Tools & Quality' },
};

// SVG icons for technologies for consistent, high-fidelity dark aesthetic
function TechIcon({ name }: { name: string }) {
  switch (name.toLowerCase()) {
    case 'python':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 1C6.4 1 6.8 3.4 6.8 3.4v2.5h5.3v.8H4.6S1 6.2 1 11.8c0 5.5 3.1 5.3 3.1 5.3h1.8v-2.6s-.1-3.1 3-3.1h5.1s2.9.1 2.9-2.8V3.7S17.4 1 11.9 1zm-2.8 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3B82F6"/>
          <path d="M12.1 23c5.5 0 5.1-2.4 5.1-2.4v-2.5h-5.3v-.8h7.5s3.6.5 3.6-5.1c0-5.5-3.1-5.3-3.1-5.3h-1.8v2.6s.1 3.1-3 3.1h-5.1s-2.9-.1-2.9 2.8v4.9s-.5 2.7 5 2.7zm2.8-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FAFAFA"/>
        </svg>
      );
    case 'fastapi':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#009688" strokeWidth="2" />
          <path d="M13 3L6 14h5l-1 7 8-12h-5l2-6z" fill="#059669" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3v12c0 1.657-3.582 3-8 3s-8-1.343-8-3V6z" stroke="#3B82F6"/>
          <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" stroke="#3B82F6"/>
        </svg>
      );
    case 'sqlite':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#60A5FA"/>
          <path d="M7 8h10M7 12h10M7 16h6" stroke="#FAFAFA" strokeLinecap="round"/>
        </svg>
      );
    case 'sql':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#3B82F6"/>
          <path d="M4 5v14c0 1.657 3.582 3 8 3s8-1.343 8-3V5" stroke="#3B82F6"/>
          <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" stroke="#3B82F6"/>
        </svg>
      );
    case 'html':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#E34F26" strokeWidth="2">
          <path d="M4 3l1.5 16 6.5 2 6.5-2L20 3H4z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 7h9M8 11h8M8.5 15l3.5 1 3.5-1" stroke="#E34F26" strokeLinecap="round"/>
        </svg>
      );
    case 'css':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#264DE4" strokeWidth="2">
          <path d="M4 3l1.5 16 6.5 2 6.5-2L20 3H4z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 7H8v4h8v4l-4 1-4-1" stroke="#3B82F6" strokeLinecap="round"/>
        </svg>
      );
    case 'javascript':
      return (
        <div className="h-6 w-6 rounded bg-[#F7DF1E] flex items-center justify-center font-bold text-[11px] text-black font-mono">
          JS
        </div>
      );
    case 'git':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 6h6" strokeLinecap="round"/>
        </svg>
      );
    case 'github':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FAFAFA"/>
        </svg>
      );
    case 'pytest':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#0A9EDC" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" stroke="#34D399" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return <div className="h-6 w-6 rounded bg-[#27272A]" />;
  }
}

export default function TechStack() {
  const { locale } = useLanguage();

  const categories: TechCategory[] = ['backend', 'database', 'frontend', 'tools'];

  return (
    <section id="technologies" className="bg-[#09090B] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <SectionLabel label={t(translations.techStack.sectionLabel, locale)} />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
            {t(translations.techStack.title, locale)}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[#A1A1AA]">
            {locale === 'pt'
              ? 'Conjunto focado de ferramentas comprovadas em produção para construção de software eficiente, estável e escalável.'
              : 'Focused suite of battle-tested tools for building efficient, stable, and scalable software.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((catKey) => {
            const catTechs = technologies.filter((t) => t.category === catKey);

            return (
              <div
                key={catKey}
                className="rounded-2xl border border-[#27272A] bg-[#111114] p-6 transition-all duration-300 hover:border-[#3B82F6]/50"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
                    {categoryLabels[catKey][locale]}
                  </h3>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    {catTechs.length}
                  </span>
                </div>

                {/* Tech items */}
                <div className="space-y-3.5">
                  {catTechs.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-3.5 rounded-xl border border-transparent bg-[#18181B]/50 p-2.5 transition-all hover:border-[#27272A] hover:bg-[#18181B]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111114] border border-[#27272A] p-1.5">
                        <TechIcon name={tech.name} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                          {tech.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#A1A1AA]">
                          Production ready
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

