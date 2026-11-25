"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  WhatsAppIcon,
  GitHubIcon,
  InstagramIcon,
  ArrowUpRight,
  CopyIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { motion } from "framer-motion";

export function ContactFooter() {
  const { contacts, footer } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("5564999032384");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contato" className="pt-16 pb-12 sm:pt-24 sm:pb-16 relative overflow-hidden bg-[#09090B] scroll-mt-24">
      {/* Decorative Radial Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Main CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-14 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111113] relative overflow-hidden mb-14 sm:mb-20"
        >
          {/* Subtle Ambient Rim Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.04] rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2 sm:mb-3">
              05 // VAMOS CONVERSAR
            </div>
            <h2 className="text-2xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4">
              {footer.headline}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {footer.subheadline}
            </p>

            {/* Direct WhatsApp CTA Button & Copy Button (Touch friendly min-h-[48px] with full width on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <a
                href={contacts.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 rounded-xl font-semibold text-sm bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] transition-[background-color,transform] focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-lg shadow-emerald-500/15"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Conversar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Copy Phone Number Button */}
              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-4 rounded-xl text-sm font-mono text-zinc-300 border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.98] transition-[background-color,border-color,transform] focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Copiar número de telefone e WhatsApp"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Número copiado</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 text-zinc-400" />
                    <span>{contacts.whatsapp.display}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/[0.08]">
            {/* WhatsApp */}
            <a
              href={contacts.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] active:scale-[0.99] transition-[background-color,border-color,transform] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-mono">WhatsApp</div>
                  <div className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {contacts.whatsapp.display}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href={contacts.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] active:scale-[0.99] transition-[background-color,border-color,transform] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/[0.06] text-white">
                  <GitHubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-mono">GitHub</div>
                  <div className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                    julioccr160908-jpg
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* Instagram */}
            <a
              href={contacts.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] active:scale-[0.99] transition-[background-color,border-color,transform] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-mono">Instagram</div>
                  <div className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {contacts.instagram.display}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Minimalist Footer Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-6">
            <span>Desenvolvido com Next.js &amp; Tailwind CSS</span>
            <span className="text-emerald-500/80 font-semibold">• 100% Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
