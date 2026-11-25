"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Code2, Server, Zap, CheckCircle2 } from "lucide-react";

export function TechStack() {
  const { specialties } = portfolioData;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "backend":
        return <Server className="w-5 h-5 text-sky-400" />;
      case "performance":
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="stack" className="py-16 md:py-24 border-b border-white/[0.08] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 pb-5 sm:pb-6 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
              02 // ESPECIALIDADES &amp; STACK TÉCNICA
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Engenharia &amp; Domínio Tecnológico
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Stack moderna voltada para entrega de aplicações robustas, interfaces de alta resposta tátil e escalabilidade real.
          </p>
        </div>

        {/* Bento Grid / Minimalist Columns with Fine 1px Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {specialties.map((spec, index) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex flex-col justify-between p-5 sm:p-7 md:p-8 rounded-2xl border border-white/[0.08] bg-[#111113] hover:border-white/[0.18] transition-[border-color,transform] relative group"
            >
              {/* Top Accent Rim Light */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    {getCategoryIcon(spec.id)}
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 tracking-wider">
                    {spec.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {spec.category}
                </h3>

                {/* Summary */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                  {spec.summary}
                </p>
              </div>

              {/* Items List (No fake percentage bars) */}
              <div className="pt-5 sm:pt-6 border-t border-white/[0.06]">
                <ul className="space-y-2 sm:space-y-2.5" role="list">
                  {spec.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                      <span className="font-mono tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
