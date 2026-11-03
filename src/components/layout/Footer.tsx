'use client';

import { useLanguage } from '@/i18n';
import { siteConfig } from '@/data/site-config';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from '@/components/ui/Icons';

export default function Footer() {
  const { locale } = useLanguage();
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#27272A] bg-[#09090B] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-base font-bold text-[#FAFAFA]">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline text-[#27272A]">•</span>
            <span className="text-xs text-[#A1A1AA] font-mono">
              © {currentYear} {siteConfig.name}.{' '}
              {locale === 'pt'
                ? 'Todos os direitos reservados.'
                : 'All rights reserved.'}
            </span>
          </div>

          {/* Center Info */}
          <div className="text-xs font-mono text-[#A1A1AA] flex items-center gap-1.5">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>

          {/* Right Links & Back to top */}
          <div className="flex items-center gap-4">
            {siteConfig.contact.github && (
              <a
                href={`https://github.com/${siteConfig.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {siteConfig.contact.linkedin && (
              <a
                href={`https://linkedin.com/in/${siteConfig.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114] text-[#A1A1AA] hover:border-[#3B82F6]/50 hover:text-[#FAFAFA] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
