'use client';

import { MessageSquare, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/i18n';
import { t, translations } from '@/i18n/translations';
import { siteConfig } from '@/data/site-config';
import SectionLabel from '@/components/ui/SectionLabel';

export default function Contact() {
  const { locale } = useLanguage();

  const whatsappUrl = siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        locale === 'pt'
          ? 'Olá Julio! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.'
          : "Hi Julio! I visited your portfolio and would like to talk about a project."
      )}`
    : '#';

  const emailUrl = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}`
    : '#';

  return (
    <section id="contact" className="relative bg-[#09090B] py-28 sm:py-36 overflow-hidden">
      {/* Background glow and grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-[#27272A] bg-gradient-to-b from-[#111114] to-[#0A0A0C] p-8 sm:p-14 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and pitch */}
            <div className="lg:col-span-7">
              <SectionLabel label={t(translations.contact.sectionLabel, locale)} />
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#FAFAFA] sm:text-5xl">
                {t(translations.contact.title, locale)}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                {t(translations.contact.description, locale)}
              </p>

              {/* Direct WhatsApp Call to Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3B82F6]/30 transition-all hover:bg-blue-600 hover:shadow-[#3B82F6]/50 active:scale-95"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>
                    {locale === 'pt' ? 'Conversar no WhatsApp' : 'Chat on WhatsApp'}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                {siteConfig.contact.email && (
                  <a
                    href={emailUrl}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B] px-5 py-3.5 text-sm font-medium text-[#FAFAFA] transition-all hover:border-[#3B82F6]/50 hover:bg-[#18181B]/80"
                  >
                    <Mail className="h-4 w-4 text-[#A1A1AA]" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Fast Contact Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B]/60 p-4 transition-all hover:border-[#3B82F6]/60 hover:bg-[#18181B]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#A1A1AA]">Instant messaging</p>
                    <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                      WhatsApp
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#A1A1AA] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Email Card (only if email configured) */}
              {Boolean(siteConfig.contact.email) && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B]/60 p-4 transition-all hover:border-[#3B82F6]/60 hover:bg-[#18181B]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-[#3B82F6]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[#A1A1AA]">Direct inbox</p>
                      <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                        {siteConfig.contact.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#A1A1AA] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {/* GitHub Card */}
              <a
                href={siteConfig.contact.github ? `https://github.com/${siteConfig.contact.github}` : 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B]/60 p-4 transition-all hover:border-[#3B82F6]/60 hover:bg-[#18181B]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-[#27272A] text-[#FAFAFA]">
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#A1A1AA]">Open source code</p>
                    <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                      GitHub
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#A1A1AA] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={siteConfig.contact.linkedin ? `https://linkedin.com/in/${siteConfig.contact.linkedin}` : 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B]/60 p-4 transition-all hover:border-[#3B82F6]/60 hover:bg-[#18181B]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-600/20 text-blue-400">
                    <LinkedInIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#A1A1AA]">Professional network</p>
                    <p className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#3B82F6] transition-colors">
                      LinkedIn
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#A1A1AA] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
