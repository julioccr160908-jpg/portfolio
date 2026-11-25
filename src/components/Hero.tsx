"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { WhatsAppIcon, ArrowUpRight } from "@/components/ui/Icons";
import { ArrowDown } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";

export function Hero() {
  const { developer, contacts } = portfolioData;

  return (
    <section className="relative pt-24 pb-14 sm:pt-36 sm:pb-24 overflow-x-clip border-b border-white/[0.08]">
      {/* Interactive Topographic Isoline Background (Lando Norris style) */}
      <HeroBackground />

      {/* Radial soft ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] mb-4 sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-medium text-emerald-400 tracking-wide">
              {developer.availability}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[1.85rem] sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-4 sm:mb-6 text-balance">
            {developer.headline.line1}
            <br />
            {developer.headline.line2}{" "}
            <span className="text-emerald-400 font-semibold underline decoration-emerald-500/30 decoration-2 underline-offset-8">
              {developer.headline.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-lg text-zinc-400 leading-relaxed mb-6 sm:mb-10 text-balance">
            {developer.subheadline}
          </p>

          {/* Call to Actions (Full-width on mobile with comfortable >= 48px touch targets) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary CTA (WhatsApp) */}
            <a
              href={contacts.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 rounded-xl font-semibold text-sm bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-[background-color,transform] shadow-sm shadow-white/10 group focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-600 transition-transform group-hover:scale-110" />
              <span>Iniciar um projeto</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Secondary CTA (Scroll to projects) */}
            <a
              href="#projetos"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 rounded-xl font-medium text-sm text-zinc-300 border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-[0.98] transition-[background-color,border-color,transform]"
            >
              <span>Explorar projetos</span>
              <ArrowDown className="w-4 h-4 text-zinc-400" />
            </a>
          </div>

          {/* Quick Stats / Credibility Metrics */}
          <div className="mt-10 pt-6 sm:mt-14 sm:pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-12 w-full">
            <div>
              <div className="font-mono text-xl sm:text-3xl font-bold text-white tracking-tight">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                Código Limpo &amp; Tipado
              </div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
                &lt; 1.5s
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                Meta LCP / Core Vitals
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-xl sm:text-3xl font-bold text-white tracking-tight">
                CRO
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                Foco em Alta Conversão
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
