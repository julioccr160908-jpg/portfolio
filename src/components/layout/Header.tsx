'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { t } from '@/i18n/translations';
import { navItems } from '@/data/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMobileMenu();

      if (pathname === '/') {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#' || href === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // If on another page like /projects/[id], let navigation go to /#section
        e.preventDefault();
        router.push(`/${href}`);
      }
    },
    [pathname, router, closeMobileMenu],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      closeMobileMenu();
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        e.preventDefault();
        router.push('/');
      }
    },
    [pathname, router, closeMobileMenu],
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090B]/85 backdrop-blur-xl border-b border-[#27272A]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={handleLogoClick}
              className="text-base sm:text-lg font-bold tracking-tight text-[#FAFAFA] transition-colors hover:text-[#3B82F6] shrink-0"
              aria-label="Julio Carneiro - Página Inicial"
            >
              Julio Carneiro
            </a>

            {/* Desktop Navigation (>= 1024px lg) */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-lg px-2.5 py-1.5 text-xs xl:text-sm xl:px-3 xl:py-2 text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] hover:bg-[#18181B]"
                >
                  {t(item.label, locale)}
                </a>
              ))}

              {/* Language Toggle */}
              <button
                type="button"
                onClick={toggleLocale}
                className="ml-2 flex items-center gap-1.5 rounded-lg border border-[#27272A] px-2.5 py-1.5 text-xs xl:text-sm text-[#A1A1AA] transition-colors hover:border-[#3B82F6]/50 hover:text-[#FAFAFA]"
                aria-label={`Mudar idioma para ${locale === 'pt' ? 'English' : 'Português'}`}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                <span className="font-semibold">
                  {locale === 'pt' ? 'EN' : 'PT'}
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button (< 1024px) */}
            <button
              ref={menuButtonRef}
              type="button"
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] hover:bg-[#18181B] lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={
                isMobileMenuOpen
                  ? locale === 'pt' ? 'Fechar menu' : 'Close menu'
                  : locale === 'pt' ? 'Abrir menu de navegação' : 'Open navigation menu'
              }
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'pt' ? 'Menu móvel' : 'Mobile menu'}
        aria-hidden={!isMobileMenuOpen}
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] border-l border-[#27272A] bg-[#09090B] transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#27272A] px-4">
          <span className="text-sm font-semibold tracking-wide text-[#FAFAFA]">
            {locale === 'pt' ? 'Navegação' : 'Navigation'}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobileMenu}
            className="rounded-lg p-2 text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] hover:bg-[#18181B]"
            aria-label={locale === 'pt' ? 'Fechar menu de navegação' : 'Close navigation menu'}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav
          className="flex flex-col gap-1 p-4"
          aria-label={locale === 'pt' ? 'Links do menu móvel' : 'Mobile menu links'}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, item.href)}
              className="rounded-lg px-4 py-3 text-sm text-[#A1A1AA] transition-colors hover:bg-[#18181B] hover:text-[#FAFAFA]"
            >
              {t(item.label, locale)}
            </a>
          ))}
        </nav>

        {/* Mobile Language Toggle */}
        <div className="border-t border-[#27272A] p-4">
          <button
            type="button"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={() => {
              toggleLocale();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272A] px-4 py-2.5 text-sm text-[#A1A1AA] transition-colors hover:border-[#3B82F6]/50 hover:text-[#FAFAFA]"
            aria-label={`Mudar idioma para ${locale === 'pt' ? 'English' : 'Português'}`}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">
              {locale === 'pt' ? 'English (EN)' : 'Português (PT)'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
