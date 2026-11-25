"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";

export function About() {
  const { developer } = portfolioData;

  return (
    <section id="sobre" className="py-16 md:py-24 border-b border-white/[0.08] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column (lg:col-span-5): Vertical Portrait Photo in aspect-[4/5] */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 order-1 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/5] max-h-[380px] sm:max-h-none rounded-2xl border border-white/10 bg-[#111113] overflow-hidden shadow-2xl shadow-black/60 group mx-auto lg:mx-0">
              {/* Profile Image using next/image with object-top */}
              <Image
                src={developer.profileImage}
                alt="Júlio Carneiro — Desenvolvedor Web"
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 420px"
                className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
                priority
              />

              {/* Subtle Base Gradient Overlay for Smooth Integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Technical Badge Caption */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-950/85 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300 tracking-wider">
                  {developer.about.caption}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
            </div>
          </motion.div>

          {/* Right Column (lg:col-span-7): Editorial Story & Core Method Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 order-2 lg:order-2 flex flex-col justify-center"
          >
            {/* Tag in JetBrains Mono */}
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2 sm:mb-3">
              {developer.about.tag}
            </div>

            {/* Direct Headline with text-balance */}
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4 sm:mb-6 text-balance leading-tight">
              {developer.about.title}
            </h2>

            {/* Short & Authentic Paragraphs */}
            <div className="space-y-3 sm:space-y-4 text-zinc-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {developer.about.paragraphs.map((para, i) => (
                <p key={i} className="text-zinc-300">
                  {para}
                </p>
              ))}
            </div>

            {/* Method & Working Principles (3 clean items with subtle 1px borders) */}
            <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6 border-t border-white/[0.08]" role="list">
              {developer.about.principles.map((item) => (
                <div
                  key={item.number}
                  className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-3 sm:gap-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-xs font-semibold text-emerald-400 shrink-0 pt-0.5">
                    {item.number} ·
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-0.5">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
