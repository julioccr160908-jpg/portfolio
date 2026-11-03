'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ExternalLink, 
  Server, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Monitor,
  Briefcase,
  Play
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import DemoRenderer from '@/components/demos/DemoRenderer';
import type { Project } from '@/types';

interface ProjectCaseStudyProps {
  project: Project;
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] pt-24 pb-20 selection:bg-[#3B82F6]/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
        {/* Navigation & Back Link */}
        <div className="flex items-center justify-between border-b border-[#27272A] pb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t(translations.projectPage.backToProjects, locale)}</span>
          </Link>

          <span className="rounded-full border border-[#27272A] bg-[#111114] px-3 py-1 font-mono text-xs uppercase text-[#3B82F6]">
            {project.category}
          </span>
        </div>

        {/* 01 — PROJECT OVERVIEW */}
        <header className="space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6]">
              01 — {t(translations.projectPage.overview, locale)}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAFAFA]">
              {t(project.title, locale)}
            </h1>
            <p className="max-w-3xl text-lg sm:text-xl text-[#A1A1AA] leading-relaxed">
              {t(project.description, locale)}
            </p>
          </div>

          {/* Quick metadata badges, Services & Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[#27272A] bg-[#111114] px-3 py-1.5 font-mono text-xs text-[#FAFAFA]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-colors"
                >
                  <span>{locale === 'pt' ? 'Acessar Site ao Vivo' : 'Visit Live Website'}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#3B82F6]/20 hover:bg-blue-600 transition-colors"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{locale === 'pt' ? 'Demonstração Externa' : 'External Demo'}</span>
                </a>
              )}

              {project.links.github && (
                <a
                  href={`https://github.com/${project.links.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Services / Scopes involved (if configured) */}
          {project.services && project.services.length > 0 && (
            <div className="rounded-xl border border-[#27272A] bg-[#111114] p-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#3B82F6]">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{locale === 'pt' ? 'Serviços Prestados:' : 'Services Delivered:'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-md bg-[#18181B] px-2.5 py-1 text-xs text-[#FAFAFA] border border-[#27272A]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* 02 — LIVE WEBSITE PREVIEW */}
        <section id="demo" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6]">
                02 — {project.demo.type === 'iframe'
                  ? locale === 'pt' ? 'Navegação ao Vivo no Site Original' : 'Live Original Website Navigation'
                  : t(translations.projectPage.interactivePreview, locale)}
              </span>
              <h2 className="text-2xl font-bold mt-1 text-[#FAFAFA]">
                {project.demo.type === 'iframe'
                  ? locale === 'pt' ? 'Site Original Incorporado' : 'Original Embedded Website'
                  : locale === 'pt' ? 'Demonstração Interativa ao Vivo' : 'Live Interactive Sandbox'}
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
              ● {locale === 'pt' ? 'URL de Produção' : 'Production URL'}
            </span>
          </div>

          {/* Demo Renderer Component (loads original URL via iframe) */}
          <DemoRenderer
            demo={project.demo}
            projectTitle={t(project.title, locale)}
            locale={locale}
          />
        </section>

        {/* 03 & 04 — THE CHALLENGE & THE SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Challenge */}
          <section className="rounded-2xl border border-[#27272A] bg-[#111114] p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-400">
              <AlertCircle className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                03 — {t(translations.projectPage.challenge, locale)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#FAFAFA]">
              {locale === 'pt' ? 'O Problema a Resolver' : 'The Problem to Solve'}
            </h3>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              {t(project.caseStudy.challenge, locale)}
            </p>
          </section>

          {/* The Solution */}
          <section className="rounded-2xl border border-[#27272A] bg-[#111114] p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-[#3B82F6]">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                04 — {t(translations.projectPage.solution, locale)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#FAFAFA]">
              {locale === 'pt' ? 'A Abordagem Arquitetural' : 'The Architectural Approach'}
            </h3>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              {t(project.caseStudy.solution, locale)}
            </p>
          </section>
        </div>

        {/* 05 — FEATURES */}
        <section className="space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6]">
              05 — {t(translations.projectPage.features, locale)}
            </span>
            <h2 className="text-2xl font-bold mt-1 text-[#FAFAFA]">
              {locale === 'pt' ? 'Principais Funcionalidades Entregues' : 'Key Delivered Features'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.caseStudy.features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#27272A] bg-[#111114] p-6 space-y-3 transition-colors hover:border-[#3B82F6]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#3B82F6] mb-2">
                    <span>0{idx + 1}.</span>
                    <span className="font-semibold">{t(feature.title, locale)}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    {t(feature.description, locale)}
                  </p>
                </div>

                {/* Optional Feature Image if provided */}
                {feature.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#27272A] mt-4">
                    <Image
                      src={feature.image}
                      alt={t(feature.title, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 06 — ARCHITECTURE */}
        {project.caseStudy.architecture && (
          <section className="space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6]">
                06 — {t(translations.projectPage.architecture, locale)}
              </span>
              <h2 className="text-2xl font-bold mt-1 text-[#FAFAFA]">
                {locale === 'pt' ? 'Diagrama de Arquitetura do Sistema' : 'System Architecture Diagram'}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-6 sm:p-8">
              {/* Architecture blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Layer 1: Client/Frontend */}
                {project.caseStudy.architecture.frontend && (
                  <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#3B82F6]">
                      <Monitor className="h-4 w-4" />
                      <span>Frontend Layer</span>
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-[#A1A1AA]">
                      {project.caseStudy.architecture.frontend.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Layer 2: API & Backend */}
                {project.caseStudy.architecture.backend && (
                  <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
                      <Server className="h-4 w-4" />
                      <span>Backend & APIs</span>
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-[#A1A1AA]">
                      {project.caseStudy.architecture.backend.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {project.caseStudy.architecture.apis?.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Layer 3: Persistence & Integrations */}
                {(project.caseStudy.architecture.database || project.caseStudy.architecture.integrations) && (
                  <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
                      <Database className="h-4 w-4" />
                      <span>Data & Integrations</span>
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-[#A1A1AA]">
                      {project.caseStudy.architecture.database?.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {project.caseStudy.architecture.integrations?.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 07 — TECHNOLOGIES */}
        <section className="space-y-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6]">
              07 — {t(translations.projectPage.technologies, locale)}
            </span>
            <h2 className="text-2xl font-bold mt-1 text-[#FAFAFA]">
              {locale === 'pt' ? 'Stack Tecnológica Utilizada' : 'Technology Stack Used'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-[#27272A] bg-[#111114] px-4 py-2 font-mono text-sm text-[#FAFAFA]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 09 — SOURCE & LINKS */}
        <section className="border-t border-[#27272A] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#FAFAFA]">
              {locale === 'pt' ? 'Interessado em uma solução similar?' : 'Interested in a similar solution?'}
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1 font-mono">
              {locale === 'pt'
                ? 'Entre em contato para discutir seu projeto e especificações técnicas.'
                : 'Reach out to discuss your project and technical specifications.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3B82F6]/20 hover:bg-blue-600 transition-colors"
            >
              {locale === 'pt' ? 'Falar sobre o projeto' : 'Discuss this project'}
            </Link>
            <Link
              href="/#projects"
              className="rounded-xl border border-[#27272A] bg-[#111114] px-4 py-2.5 text-sm font-medium text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
            >
              {locale === 'pt' ? 'Ver outros projetos' : 'Browse other projects'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
