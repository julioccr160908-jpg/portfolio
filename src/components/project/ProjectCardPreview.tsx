'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Globe, 
  ExternalLink, 
  Lock, 
  Loader2, 
  AlertCircle,
  Monitor,
  MessageSquare,
  Layers
} from 'lucide-react';
import type { Project, Locale } from '@/types';
import { t } from '@/i18n/translations';

interface ProjectCardPreviewProps {
  project: Project;
  locale: Locale;
  isLead?: boolean;
}

const demoTypeIcons = {
  iframe: Globe,
  component: Monitor,
  simulation: MessageSquare,
  gallery: Layers,
  none: Monitor,
};

export default function ProjectCardPreview({ project, locale, isLead = false }: ProjectCardPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (project.demo.type === 'iframe' && project.demo.url) {
    const rawUrl = project.demo.url;
    const displayUrl = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return (
      <div className={`relative flex flex-col w-full h-full bg-[#111114] ${isLead ? 'min-h-[320px] sm:min-h-[400px]' : 'min-h-[260px] sm:min-h-[300px]'}`}>
        {/* Browser Top Bar with authentic URL */}
        <div className="flex items-center justify-between border-b border-[#27272A] bg-[#18181B] px-3 py-2 z-10 select-none">
          {/* Window control dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>

          {/* Real Domain URL Bar */}
          <div className="flex items-center gap-1.5 rounded-md border border-[#27272A] bg-[#111114] px-2.5 py-0.5 font-mono text-[11px] text-[#A1A1AA] max-w-[200px] sm:max-w-xs truncate">
            <Lock className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
            <span className="truncate text-[#FAFAFA]">{displayUrl}</span>
          </div>

          {/* Direct link to original site in new tab */}
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[11px] font-mono text-[#A1A1AA] hover:text-[#3B82F6] transition-colors"
            title={locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}
            aria-label={locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}
          >
            <span className="hidden sm:inline">{locale === 'pt' ? 'Abrir' : 'Open'}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Live Iframe or Discrete Error Fallback */}
        <div className="relative flex-1 w-full bg-white overflow-hidden">
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111114]/90 backdrop-blur-xs space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#3B82F6]" />
              <span className="font-mono text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Carregando site original...' : 'Loading original site...'}
              </span>
            </div>
          )}

          {hasError ? (
            <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-[#111114] p-6 text-center text-[#FAFAFA] space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">
                  {locale === 'pt' ? 'Visualização incorporada indisponível' : 'Embedded preview unavailable'}
                </h4>
                <p className="text-[11px] text-[#A1A1AA] max-w-xs leading-relaxed">
                  {locale === 'pt'
                    ? 'Este site restringe incorporação direta por políticas de segurança.'
                    : 'This site restricts direct embedding due to server security policies.'}
                </p>
              </div>
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#3B82F6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
              >
                <span>{locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ) : (
            <iframe
              src={rawUrl}
              title={`${t(project.title, locale)} - Site Original`}
              loading="lazy"
              className="w-full h-full min-h-[240px] border-0 bg-white pointer-events-none select-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}

          {/* Bottom Live badge indicator */}
          <div className="absolute bottom-2 right-2 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1 rounded-full border border-black/50 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-emerald-400 backdrop-blur-sm shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {locale === 'pt' ? 'Ao Vivo' : 'Live'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Non-iframe project (e.g. simulations, components)
  const DemoIcon = demoTypeIcons[project.demo.type] || Monitor;

  return (
    <div className={`relative w-full h-full bg-[#18181B] overflow-hidden ${isLead ? 'min-h-[260px] sm:min-h-[320px]' : 'min-h-[220px]'}`}>
      <Image
        src={project.coverImage}
        alt={t(project.title, locale)}
        fill
        sizes={isLead ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 768px) 100vw, 40vw'}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={isLead}
      />
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1 rounded-full border border-black/50 bg-black/70 px-2.5 py-0.5 text-[10px] font-mono text-[#FAFAFA] backdrop-blur-sm">
          <DemoIcon className="h-3 w-3 text-[#3B82F6]" />
          {project.demo.type.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
