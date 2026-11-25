"use client";

import React, { useState } from "react";
import { portfolioData, FaqItem } from "@/data/portfolio";
import { WhatsAppIcon, ArrowUpRight } from "@/components/ui/Icons";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export function FaqSection() {
  const { faqItems, contacts } = portfolioData;
  const [openId, setOpenId] = useState<string | null>("instagram-vs-site");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="duvidas" className="py-16 md:py-24 border-b border-white/[0.08] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (lg:col-span-4): Header & Direct WhatsApp Callout */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2 sm:mb-3">
              04 // DÚVIDAS FREQUENTES
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4 text-balance">
              Antes de começarmos
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Respostas diretas e transparentes sobre o papel de um site profissional, processo de entrega e impacto real no seu negócio.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#111113] relative overflow-hidden">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Tem outra dúvida?
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Podemos conversar diretamente sobre a sua ideia ou necessidade sem compromisso.
              </p>
              <a
                href={contacts.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 active:scale-95 transition-[color,transform] group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Conversar no WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column (lg:col-span-8): Minimalist Accordion */}
          <div className="lg:col-span-8 divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {faqItems.map((item, index) => {
              const isOpen = openId === item.id;
              const answerId = `faq-answer-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <div key={item.id} className="border-t border-white/[0.08] first:border-t-0">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full min-h-[56px] py-4 sm:py-6 flex items-start justify-between gap-3 sm:gap-4 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                  >
                    <div className="flex items-start gap-3 sm:gap-6 flex-1">
                      {/* Monospace Number */}
                      <span className="font-mono text-xs sm:text-base font-semibold text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0 pt-0.5">
                        {item.number}
                      </span>

                      {/* Question Text */}
                      <span className="text-sm sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors tracking-tight leading-snug">
                        {item.question}
                      </span>
                    </div>

                    {/* Rotating Plus Icon with Tactile Feedback */}
                    <div
                      className={`p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-400 group-hover:text-white transition-[color,transform,border-color,background-color] shrink-0 ${
                        isOpen ? "rotate-45 text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </button>

                  {/* Clean Animated Accordion Body (CSS grid-template-rows without layout thrashing) */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-6 sm:pl-12 pr-2 sm:pr-4 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-zinc-400 leading-relaxed">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
