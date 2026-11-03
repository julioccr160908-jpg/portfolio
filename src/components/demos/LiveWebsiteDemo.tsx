'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import type { Locale } from '@/types';

interface LiveWebsiteDemoProps {
  url: string;
  projectTitle: string;
  locale: Locale;
}

export default function LiveWebsiteDemo({ url, projectTitle, locale }: LiveWebsiteDemoProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const exitFullscreenButtonRef = useRef<HTMLButtonElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setKey((prev) => prev + 1);
  };

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => exitFullscreenButtonRef.current?.focus(), 50);
      } else {
        setTimeout(() => fullscreenButtonRef.current?.focus(), 50);
      }
      return next;
    });
  }, []);

  // Escape key handler for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        fullscreenButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Safety timeout for loading indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [key]);

  const widthClasses = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto',
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border border-[#27272A] bg-[#111114] shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 flex flex-col bg-[#09090B] p-2 sm:p-4 rounded-none'
          : 'relative overflow-hidden'
      }`}
    >
      {/* Browser Chrome Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] bg-[#18181B] px-4 py-3">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-2 hidden font-mono text-xs text-[#A1A1AA] sm:inline">
            {projectTitle}
          </span>
        </div>

        {/* Real URL Input Bar */}
        <div className="flex flex-1 items-center justify-center max-w-lg mx-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={locale === 'pt' ? 'Abrir URL original em nova aba' : 'Open original URL in new tab'}
            className="group flex w-full items-center gap-2 rounded-lg border border-[#27272A] bg-[#111114] px-3 py-1.5 font-mono text-xs text-[#A1A1AA] hover:border-[#3B82F6]/50 transition-colors"
          >
            <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
            <span className="truncate text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
              {url}
            </span>
            <span className="ml-auto hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 shrink-0">
              <ShieldCheck className="h-3 w-3" />
              <span>SSL</span>
            </span>
          </a>
        </div>

        {/* Device Switchers and Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Device viewport toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-[#27272A] bg-[#111114] p-0.5">
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded transition-colors ${deviceView === 'desktop' ? 'bg-[#27272A] text-white' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'}`}
              title={locale === 'pt' ? 'Visualização Desktop' : 'Desktop view'}
              aria-label={locale === 'pt' ? 'Visualização Desktop' : 'Desktop view'}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded transition-colors ${deviceView === 'tablet' ? 'bg-[#27272A] text-white' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'}`}
              title={locale === 'pt' ? 'Visualização Tablet' : 'Tablet view'}
              aria-label={locale === 'pt' ? 'Visualização Tablet' : 'Tablet view'}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded transition-colors ${deviceView === 'mobile' ? 'bg-[#27272A] text-white' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'}`}
              title={locale === 'pt' ? 'Visualização Mobile' : 'Mobile view'}
              aria-label={locale === 'pt' ? 'Visualização Mobile' : 'Mobile view'}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Open original site in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#27272A] bg-[#111114] p-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
            title={locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}
            aria-label={locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Refresh iframe */}
          <button
            type="button"
            onClick={handleRefresh}
            className="rounded-lg border border-[#27272A] bg-[#111114] p-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
            title={locale === 'pt' ? 'Recarregar site original' : 'Reload original site'}
            aria-label={locale === 'pt' ? 'Recarregar site original' : 'Reload original site'}
          >
            <RotateCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-[#3B82F6]' : ''}`} />
          </button>

          {/* Fullscreen toggle */}
          <button
            ref={isFullscreen ? exitFullscreenButtonRef : fullscreenButtonRef}
            type="button"
            onClick={handleToggleFullscreen}
            className="rounded-lg border border-[#27272A] bg-[#111114] p-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
            title={isFullscreen ? (locale === 'pt' ? 'Sair da tela cheia (Esc)' : 'Exit fullscreen (Esc)') : (locale === 'pt' ? 'Tela cheia' : 'Fullscreen')}
            aria-label={isFullscreen ? (locale === 'pt' ? 'Sair da tela cheia' : 'Exit fullscreen') : (locale === 'pt' ? 'Tela cheia' : 'Fullscreen')}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Discrete Original Site Info Bar */}
      <div className="flex items-center justify-between border-b border-[#27272A] bg-[#0E0E11] px-4 py-2 text-[11px] text-[#A1A1AA]">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>
            {locale === 'pt'
              ? 'Exibição direta da URL original em produção.'
              : 'Direct embedded rendering of original production URL.'}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3B82F6] hover:underline flex items-center gap-1 font-medium"
        >
          <span>{locale === 'pt' ? 'Abrir site original' : 'Open original site'}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Iframe Viewport */}
      <div className={`relative flex-1 bg-[#09090B] p-2 sm:p-4 overflow-y-auto transition-all ${isFullscreen ? 'h-full' : 'min-h-[550px]'}`}>
        <div className={`${widthClasses[deviceView]} transition-all duration-300 rounded-xl overflow-hidden border border-[#27272A] bg-white shadow-lg relative min-h-[520px]`}>
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111114]/90 backdrop-blur-sm space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
              <p className="text-xs font-mono text-[#A1A1AA]">
                {locale === 'pt' ? 'Carregando site original...' : 'Loading original site...'}
              </p>
            </div>
          )}

          {/* Security policy fallback notice (only if browser blocks iframe embedding) */}
          {hasError ? (
            <div className="flex min-h-[500px] flex-col items-center justify-center bg-[#111114] p-8 text-center text-[#FAFAFA] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-base font-semibold">
                  {locale === 'pt' ? 'Visualização incorporada indisponível' : 'Embedded preview unavailable'}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {locale === 'pt'
                    ? 'Este site restringe a incorporação direta em iframes por políticas de segurança do servidor. Você pode visualizá-lo diretamente na URL original.'
                    : 'This site restricts direct iframe embedding due to server security policies. You can view it directly at the original URL.'}
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#3B82F6]/20 hover:bg-blue-600 transition-colors"
              >
                <span>{locale === 'pt' ? 'Abrir site original em nova aba' : 'Open original site in new tab'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <iframe
              key={key}
              src={url}
              title={`${projectTitle} - Site Original`}
              className="w-full min-h-[540px] h-[75vh] border-0 bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => {
                setIsLoading(false);
              }}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
