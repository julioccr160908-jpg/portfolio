'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import { siteConfig } from '@/data/site-config';
import { GithubIcon, LinkedInIcon } from '@/components/ui/Icons';

// ============================================================================
// Code Window Component (right side decorative element)
// ============================================================================

function CodeWindow() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating decorative elements - safe offsets within layout */}
      <div className="pointer-events-none select-none absolute -top-3 -left-2 h-3 w-3 animate-pulse rounded-full bg-[#3B82F6]/30" />
      <div className="pointer-events-none select-none absolute -right-2 top-10 h-2 w-2 animate-pulse rounded-full bg-emerald-500/30 [animation-delay:1s]" />
      <div className="pointer-events-none select-none absolute -bottom-3 left-6 h-2.5 w-2.5 animate-pulse rounded-full bg-purple-500/30 [animation-delay:2s]" />
      <div className="pointer-events-none select-none absolute -right-2 bottom-16 font-mono text-xs text-[#3B82F6]/20">
        {'{ }'}
      </div>
      <div className="pointer-events-none select-none absolute -left-2 top-28 font-mono text-xs text-emerald-500/20">
        {'< />'}
      </div>

      {/* Terminal window */}
      <div className="overflow-hidden rounded-xl border border-[#27272A] bg-[#111114] shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-[#27272A] px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-2 font-mono text-xs text-[#A1A1AA]">main.py</span>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-xs xl:text-[13px] leading-relaxed sm:p-5 overflow-x-auto">
          {/* Line 1 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">1</span>
            <span>
              <span className="text-purple-400">from</span>{' '}
              <span className="text-[#FAFAFA]">fastapi</span>{' '}
              <span className="text-purple-400">import</span>{' '}
              <span className="text-[#FAFAFA]">FastAPI</span>
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">2</span>
            <span>
              <span className="text-purple-400">from</span>{' '}
              <span className="text-[#FAFAFA]">pydantic</span>{' '}
              <span className="text-purple-400">import</span>{' '}
              <span className="text-[#FAFAFA]">BaseModel</span>
            </span>
          </div>

          {/* Line 3 - blank */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">3</span>
          </div>

          {/* Line 4 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">4</span>
            <span>
              <span className="text-[#FAFAFA]">app</span>{' '}
              <span className="text-[#3B82F6]">=</span>{' '}
              <span className="text-emerald-400">FastAPI</span>
              <span className="text-[#A1A1AA]">()</span>
            </span>
          </div>

          {/* Line 5 - blank */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">5</span>
          </div>

          {/* Line 6 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">6</span>
            <span>
              <span className="text-purple-400">class</span>{' '}
              <span className="text-emerald-400">Project</span>
              <span className="text-[#A1A1AA]">(</span>
              <span className="text-emerald-400">BaseModel</span>
              <span className="text-[#A1A1AA]">):</span>
            </span>
          </div>

          {/* Line 7 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">7</span>
            <span>
              <span className="text-[#FAFAFA]">{'    '}title</span>
              <span className="text-[#A1A1AA]">:</span>{' '}
              <span className="text-emerald-400">str</span>
            </span>
          </div>

          {/* Line 8 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">8</span>
            <span>
              <span className="text-[#FAFAFA]">{'    '}stack</span>
              <span className="text-[#A1A1AA]">:</span>{' '}
              <span className="text-emerald-400">list</span>
              <span className="text-[#A1A1AA]">[</span>
              <span className="text-emerald-400">str</span>
              <span className="text-[#A1A1AA]">]</span>
            </span>
          </div>

          {/* Line 9 - blank */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">9</span>
          </div>

          {/* Line 10 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">10</span>
            <span>
              <span className="text-[#A1A1AA]">@</span>
              <span className="text-[#3B82F6]">app</span>
              <span className="text-[#A1A1AA]">.</span>
              <span className="text-emerald-400">get</span>
              <span className="text-[#A1A1AA]">(</span>
              <span className="text-amber-300">&quot;/api/projects&quot;</span>
              <span className="text-[#A1A1AA]">)</span>
            </span>
          </div>

          {/* Line 11 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">11</span>
            <span>
              <span className="text-purple-400">async def</span>{' '}
              <span className="text-[#3B82F6]">get_projects</span>
              <span className="text-[#A1A1AA]">():</span>
            </span>
          </div>

          {/* Line 12 */}
          <div className="flex">
            <span className="mr-4 select-none text-[#A1A1AA]/40">12</span>
            <span>
              <span className="text-[#FAFAFA]">{'    '}</span>
              <span className="text-purple-400">return</span>{' '}
              <span className="text-[#A1A1AA]">{'{'}</span>
              <span className="text-amber-300">&quot;status&quot;</span>
              <span className="text-[#A1A1AA]">:</span>{' '}
              <span className="text-amber-300">&quot;online&quot;</span>
              <span className="text-[#A1A1AA]">{'}'}</span>
            </span>
          </div>
        </div>

        {/* Terminal bottom bar */}
        <div className="border-t border-[#27272A] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs text-[#A1A1AA]">
              uvicorn running on http://localhost:8000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Hero Section
// ============================================================================

export default function Hero() {
  const { locale } = useLanguage();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#09090B]"
    >
      {/* Background gradient decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-[#3B82F6]/5 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left side: Text content */}
          <div className="space-y-6 sm:space-y-8 min-w-0">
            {/* Role badge with profile photo */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#27272A] bg-[#111114] p-1.5 pr-4 shadow-md">
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-[#3B82F6]/60">
                <Image
                  src={siteConfig.profileImage || '/images/profile.jpg'}
                  alt={siteConfig.name}
                  fill
                  sizes="28px"
                  className="object-cover object-[center_30%]"
                />
              </div>
              <span className="text-xs font-semibold tracking-wider text-[#3B82F6]">
                {t(translations.hero.role, locale)}
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-[#FAFAFA]">
              {t(translations.hero.title, locale)}
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
              {t(translations.hero.subtitle, locale)}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, '#projects')}
                className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-5 sm:px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3B82F6]/90 hover:shadow-lg hover:shadow-[#3B82F6]/25"
              >
                {t(translations.hero.exploreProjects, locale)}
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center justify-center rounded-lg border border-[#27272A] px-5 sm:px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition-all hover:border-[#A1A1AA]/30 hover:bg-[#18181B]"
              >
                {t(translations.hero.letsTalk, locale)}
              </a>
            </div>

            {/* Social links & availability */}
            <div className="flex flex-wrap items-center gap-5 pt-3">
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {siteConfig.contact.github && (
                  <a
                    href={`https://github.com/${siteConfig.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#27272A] p-2.5 text-[#A1A1AA] transition-colors hover:border-[#3B82F6]/50 hover:text-[#FAFAFA]"
                    aria-label="GitHub de Julio Carneiro"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
                {siteConfig.contact.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${siteConfig.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#27272A] p-2.5 text-[#A1A1AA] transition-colors hover:border-[#3B82F6]/50 hover:text-[#FAFAFA]"
                    aria-label="LinkedIn de Julio Carneiro"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Divider */}
              {(siteConfig.contact.github || siteConfig.contact.linkedin) && (
                <div className="h-6 w-px bg-[#27272A]" />
              )}

              {/* Availability badge */}
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      siteConfig.available ? 'bg-emerald-500' : 'bg-[#A1A1AA]'
                    }`}
                  />
                  {siteConfig.available && (
                    <div className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500/60" />
                  )}
                </div>
                <span className="text-xs sm:text-sm text-[#A1A1AA]">
                  {siteConfig.available
                    ? t(translations.hero.available, locale)
                    : t(translations.hero.unavailable, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Right side: Code window */}
          <div className="hidden lg:block min-w-0">
            <CodeWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
