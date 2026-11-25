"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { developer, navigation, contacts } = portfolioData;

  // Lock body scroll when mobile menu is open to prevent background bouncing
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const navIndexMap: Record<string, string> = {
    "#projetos": "01",
    "#stack": "02",
    "#sobre": "03",
    "#duvidas": "04",
    "#contato": "05",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#09090B]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Signature & Brand */}
        <Link
          href="#"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
          aria-label="Ir para o topo"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-transform duration-200 group-hover:scale-125" />
          <span className="font-semibold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            {developer.name}
          </span>
          <span className="hidden md:inline-block font-mono text-[11px] text-zinc-500 border-l border-zinc-800 pl-3">
            Frontend &amp; Creative Dev
          </span>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-zinc-400 hover:text-white transition-colors py-1 focus-visible:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions & WhatsApp CTA (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={contacts.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/40 active:scale-95 transition-[background-color,border-color,transform] focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Conversar no WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Action Controls (Touch Target >= 44x44px) */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={contacts.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 active:scale-95 transition-[background-color,border-color,transform]"
            aria-label="Conversar no WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => prev === false)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/[0.16] active:scale-95 transition-[background-color,border-color,transform]"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[#09090B]/98 backdrop-blur-xl border-b border-white/[0.08] flex flex-col justify-between p-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-1" aria-label="Menu móvel">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest pb-3 border-b border-white/[0.06]">
                Navegação
              </div>
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-white/[0.04] text-base font-medium text-zinc-200 active:text-emerald-400 transition-colors"
                >
                  <span className="tracking-tight">{item.label}</span>
                  <span className="font-mono text-xs text-zinc-500">
                    {navIndexMap[item.href] || "·"}
                  </span>
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 border-b border-white/[0.04] text-base font-medium text-zinc-200 active:text-emerald-400 transition-colors"
              >
                <span className="tracking-tight">Contato</span>
                <span className="font-mono text-xs text-zinc-500">05</span>
              </a>
            </nav>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2 px-1 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{developer.availability}</span>
              </div>
              <a
                href={contacts.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 rounded-xl text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] transition-[background-color,transform] shadow-lg shadow-emerald-500/20"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Iniciar conversa no WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
