'use client';

// ============================================================================
// About Section
// ============================================================================

import Image from 'next/image';
import { User } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/i18n';
import { t } from '@/i18n/translations';
import { translations } from '@/i18n/translations';
import { siteConfig } from '@/data/site-config';
import SectionLabel from '@/components/ui/SectionLabel';

export default function About() {
  const { locale } = useLanguage();

  const paragraphs = [
    t(translations.about.paragraph1, locale),
    t(translations.about.paragraph2, locale),
    t(translations.about.paragraph3, locale),
    t(translations.about.paragraph4, locale),
  ];

  return (
    <section id="about" className="bg-[#09090B]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        {/* Section Header */}
        <div className="mb-16">
          <SectionLabel label={t(translations.about.sectionLabel, locale)} />
          <h2 className="mt-4 text-3xl font-bold text-[#FAFAFA] sm:text-4xl">
            {t(translations.about.title, locale)}
          </h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column — Photo */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="group relative w-full max-w-sm">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#3B82F6]/30 to-purple-600/20 opacity-60 blur-xl transition duration-500 group-hover:opacity-100" />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#27272A] bg-[#111114]">
                {siteConfig.profileImage ? (
                  <Image
                    src={siteConfig.profileImage}
                    alt={siteConfig.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="h-20 w-20 text-[#27272A]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column — Bio & Links */}
          <div className="flex flex-col justify-center">
            {/* Paragraphs */}
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-[#A1A1AA]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center gap-6">
              {siteConfig.contact.github && (
                <a
                  href={`https://github.com/${siteConfig.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
                >
                  <GithubIcon className="h-5 w-5 transition-colors group-hover:text-[#3B82F6]" />
                  <span>GitHub</span>
                </a>
              )}
              {siteConfig.contact.linkedin && (
                <a
                  href={`https://linkedin.com/in/${siteConfig.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
                >
                  <LinkedInIcon className="h-5 w-5 transition-colors group-hover:text-[#3B82F6]" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
