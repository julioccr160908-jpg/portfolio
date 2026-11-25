"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="pb-12 lg:pb-0 border-b border-white/[0.06] lg:border-b-0 last:border-b-0 last:pb-0"
    >
      {/* Mobile-Only Header Block (01 + Subtitle + Title placed immediately above preview for instant recognition) */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-lg font-bold text-zinc-600 tracking-wider">
            {project.number}
          </span>
          <div className="h-px w-8 bg-zinc-800" />
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
            {project.subtitle}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors inline-block"
          >
            {project.title}
          </a>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Media Frame & Dynamic Stage Container */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-[#111113] overflow-hidden isolate shadow-2xl shadow-black/50">
            {/* Top Frame Control Bar */}
            <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-[#0D0D10] border-b border-white/[0.08] gap-2">
              {/* Segmented Control Toggle (Desktop / Mobile) */}
              <div
                className="flex items-center p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] relative"
                role="group"
                aria-label={`Alternar visualização para ${project.title}`}
              >
                <button
                  type="button"
                  onClick={() => setViewport("desktop")}
                  aria-pressed={viewport === "desktop"}
                  className={`relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 active:scale-95 ${
                    viewport === "desktop" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                  {viewport === "desktop" && (
                    <motion.div
                      layoutId={`viewport-toggle-${project.id}`}
                      className="absolute inset-0 bg-white/10 border border-white/15 rounded-md -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setViewport("mobile")}
                  aria-pressed={viewport === "mobile"}
                  className={`relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 active:scale-95 ${
                    viewport === "mobile" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                  {viewport === "mobile" && (
                    <motion.div
                      layoutId={`viewport-toggle-${project.id}`}
                      className="absolute inset-0 bg-white/10 border border-white/15 rounded-md -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {/* Single Prominent Visit Site Button */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/40 hover:text-emerald-300 active:scale-95 transition-[border-color,background-color,color,transform] focus-visible:ring-1 focus-visible:ring-emerald-400 shrink-0"
                aria-label={`Visitar o site do projeto ${project.title}`}
              >
                <span>Visitar site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Dynamic Stage:
                - Desktop view mode: strictly aspect-[16/10] on mobile & desktop to prevent horizontal cropping (1:1 with 16:10 screenshot)
                - Mobile view mode: generous h-[440px] on mobile (md:aspect-[16/10]) so phone frame fills height cleanly
            */}
            <div
              className={`relative w-full bg-[#0A0A0D] overflow-hidden rounded-b-[15px] flex items-center justify-center ${
                viewport === "desktop"
                  ? "aspect-[16/10] md:aspect-[16/10]"
                  : "h-[440px] md:h-auto md:aspect-[16/10]"
              }`}
            >
              <AnimatePresence mode="wait">
                {viewport === "desktop" ? (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full overflow-hidden group cursor-pointer"
                    onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                  >
                    <Image
                      src={project.images.desktop}
                      alt={`Captura desktop da dobra inicial de ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.015]"
                      priority={index === 0}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center technical-grid bg-[#08080A] py-5 px-3"
                    onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                  >
                    {/* Generous Mobile Phone Frame */}
                    <div className="relative h-[92%] aspect-[390/844] rounded-[18px] sm:rounded-[20px] border border-white/15 bg-[#09090B] shadow-2xl shadow-black/80 overflow-hidden group cursor-pointer">
                      <Image
                        src={project.images.mobile}
                        alt={`Captura mobile da dobra inicial de ${project.title}`}
                        fill
                        sizes="320px"
                        className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Text & Metadata Container */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Desktop-Only Header (Hidden on mobile where it appears above the preview) */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-2xl font-bold text-zinc-600 tracking-wider">
                {project.number}
              </span>
              <div className="h-px w-8 bg-zinc-800" />
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                {project.subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight leading-snug">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {project.title}
              </a>
            </h3>
          </div>

          {/* Objective Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
            {project.description}
          </p>

          {/* Highlight Metric */}
          {project.highlightMetric && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-300 mb-4 sm:mb-6 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{project.highlightMetric}</span>
            </div>
          )}

          {/* Technical Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 lg:mb-8" aria-label="Tecnologias utilizadas">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Desktop Dedicated Action Link (Hidden on mobile to eliminate duplication with top bar button) */}
          <div className="hidden lg:block">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 active:scale-[0.98] transition-[color,transform] group focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
            >
              <span>Ver site no ar</span>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform]">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsShowcase() {
  const { projects } = portfolioData;

  return (
    <section id="projetos" className="py-16 md:py-24 border-b border-white/[0.08] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 pb-5 sm:pb-6 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
              01 // VITRINE DE PROJETOS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Projetos em Destaque
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Soluções digitais em produção com foco em identidade marcante, tempo de resposta veloz e conversão direta.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12 sm:space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
