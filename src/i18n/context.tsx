'use client';

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from 'react';
import type { Locale } from '@/types';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-locale';

let memoryLocale: Locale = 'pt';
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && (e.newValue === 'pt' || e.newValue === 'en')) {
      memoryLocale = e.newValue;
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

function getClientSnapshot(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') {
      memoryLocale = stored;
    }
  }
  return memoryLocale;
}

function getServerSnapshot(): Locale {
  return 'pt';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    memoryLocale = newLocale;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    }
    listeners.forEach((listener) => listener());
  }, []);

  const toggleLocale = useCallback(() => {
    const next = memoryLocale === 'pt' ? 'en' : 'pt';
    setLocale(next);
  }, [setLocale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
