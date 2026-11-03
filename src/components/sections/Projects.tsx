'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Play, Layers, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import { categoryFilters, projects } from '@/data';
import SectionLabel from '@/components/ui/SectionLabel';
import ProjectCardPreview from '@/components/project/ProjectCardPreview';
import type { ProjectCategory } from '@/types';

const categoryBadgeLabels: Record<ProjectCategory, { pt: string; en: string }> = {
  'landing-page': { pt: 'Landing Page', en: 'Landing Page' },
  'website': { pt: 'Website', en: 'Website' },
  'system': { pt: 'Sistema Web', en: 'Web System' },
  'backend-api': { pt: 'Backend / API', en: 'Backend / API' },
  'automation': { pt: 'Automação', en: 'Automation' },
};

export default function Projects() {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...projects].sort((a, b) => a.order - b.order);
    }
    return projects
      .filter((p) => p.category === selectedCategory)
      .sort((a, b) => a.order - b.order);
  }, [selectedCategory]);

  return (
    <section id="projects" className="relative bg-[#09090B] py-24 sm:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-[#3B82F6]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionLabel label={t(translations.projects.sectionLabel, locale)} />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
              {t(translations.projects.title, locale)}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A1A1AA]">
            {locale === 'pt'
              ? 'Projetos reais em produção e soluções técnicas interativas com arquitetura limpa e testes.'
              : 'Real production projects and interactive technical solutions with clean architecture and testing.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          {categoryFilters.map((filter) => {
            const isActive = selectedCategory === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20'
                    : 'border border-[#27272A] bg-[#111114] text-[#A1A1AA] hover:border-[#3B82F6]/50 hover:text-[#FAFAFA]'
                }`}
              >
                {t(filter.label, locale)}
              </button>
            );
          })}
        </div>

        {/* Empty State for Categories with 0 projects */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] text-[#3B82F6] mb-4">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#FAFAFA]">
              {locale === 'pt' ? 'Nenhum projeto encontrado nesta categoria' : 'No projects found in this category'}
            </h3>
            <p className="mt-2 text-sm text-[#A1A1AA] max-w-md mx-auto">
              {locale === 'pt'
                ? 'Novos projetos e estudos de caso nesta área estão em fase de homologação e documentação.'
                : 'New projects and case studies in this area are undergoing review and documentation.'}
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#3B82F6]/20 hover:bg-blue-600 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{locale === 'pt' ? 'Ver todos os projetos' : 'View all projects'}</span>
            </button>
          </div>
        ) : (
          /* Projects Showcase */
          <div className="space-y-8">
            {filteredProjects.map((project) => {
              // Featured lead card is driven by data: project.featured === true when viewing all, or first flagship
              const isLead = project.featured && project.id === 'barberhost' && selectedCategory === 'all';

              if (isLead) {
                // Lead Featured Card (BarberHost)
                return (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#111114] transition-all duration-300 hover:border-[#3B82F6]/60"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Visual Cover / Preview Area */}
                      <div className="relative lg:col-span-7 min-h-[320px] sm:min-h-[400px] bg-[#141418] border-b lg:border-b-0 lg:border-r border-[#27272A] overflow-hidden flex flex-col justify-between">
                        <ProjectCardPreview project={project} locale={locale} isLead={true} />
                      </div>

                      {/* Content Area */}
                      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          {/* Category & Badge */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
                              {categoryBadgeLabels[project.category]?.[locale] || project.category}
                            </span>
                            <span className="text-[#27272A]">•</span>
                            <span className="text-xs font-mono text-amber-400">
                              {locale === 'pt' ? 'SaaS sob medida' : 'Tailored SaaS'}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                            {t(project.title, locale)}
                          </h3>

                          {/* Description */}
                          <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                            {t(project.description, locale)}
                          </p>

                          {/* Tech tags */}
                          <div className="mt-6 flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-xs font-mono text-[#A1A1AA]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Actions */}
                        <div className="mt-8 pt-6 border-t border-[#27272A] flex items-center justify-between">
                          <Link
                            href={`/projects/${project.id}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#3B82F6]/20 transition-all hover:bg-blue-600"
                          >
                            <span>{locale === 'pt' ? 'Ver Estudo de Caso' : 'Case Study'}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>

                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                            >
                              <span>{locale === 'pt' ? 'Acessar Site' : 'Visit Site'}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Grid cards for secondary projects
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#111114] transition-all duration-300 hover:border-[#3B82F6]/60 flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Visual Cover / Live Preview Area */}
                    <div className="relative md:col-span-5 min-h-[260px] sm:min-h-[290px] bg-[#18181B] border-b md:border-b-0 md:border-r border-[#27272A] overflow-hidden flex flex-col justify-between">
                      <ProjectCardPreview project={project} locale={locale} isLead={false} />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* Top metadata */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
                            {categoryBadgeLabels[project.category]?.[locale] || project.category}
                          </span>
                          {project.featured && (
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                              ★ {locale === 'pt' ? 'Destaque' : 'Featured'}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                          {t(project.title, locale)}
                        </h3>

                        {/* Description */}
                        <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">
                          {t(project.shortDescription, locale)}
                        </p>

                        {/* Technologies */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-[#27272A] bg-[#18181B] px-2 py-0.5 text-[11px] font-mono text-[#A1A1AA]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="rounded-md border border-[#27272A] bg-[#18181B] px-2 py-0.5 text-[11px] font-mono text-[#A1A1AA]">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between">
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
                        >
                          <span>{locale === 'pt' ? 'Ver Estudo de Caso' : 'Case Study'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>

                        <div className="flex items-center gap-3 text-xs font-mono">
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors flex items-center gap-1"
                            >
                              <span>{locale === 'pt' ? 'Ao Vivo' : 'Live'}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          <Link
                            href={`/projects/${project.id}#demo`}
                            className="text-[#A1A1AA] hover:text-[#3B82F6] transition-colors flex items-center gap-1"
                          >
                            <Play className="h-3 w-3" />
                            <span>Demo</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
