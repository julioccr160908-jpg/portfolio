'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageOff } from 'lucide-react';
import type { Locale, ProjectImage } from '@/types';

interface GalleryDemoProps {
  images?: ProjectImage[];
  projectTitle: string;
  locale: Locale;
}

export default function GalleryDemo({ images = [], projectTitle, locale }: GalleryDemoProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);

  const hasImages = images && images.length > 0;

  const handleNext = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    lastActiveTriggerRef.current?.focus();
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedIndex === null) return;

    modalCloseButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeModal, handleNext, handlePrev]);

  if (!hasImages) {
    return (
      <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-10 text-center shadow-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] text-[#A1A1AA] mb-3">
          <ImageOff className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-[#FAFAFA]">
          {locale === 'pt' ? 'Nenhuma captura de tela cadastrada' : 'No screenshots available'}
        </h4>
        <p className="mt-1 text-xs text-[#A1A1AA] max-w-sm mx-auto">
          {locale === 'pt'
            ? `As capturas de interface de ${projectTitle} estão em atualização e estarão disponíveis em breve.`
            : `Interface captures for ${projectTitle} are being updated and will be available shortly.`}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-[#FAFAFA]">
            {locale === 'pt' ? 'Galeria de Capturas Reais' : 'Real Screenshots Gallery'}
          </h3>
          <p className="text-xs font-mono text-[#A1A1AA] mt-0.5">
            {images.length} {locale === 'pt' ? 'telas documentadas' : 'documented screens'}
          </p>
        </div>
      </div>

      {/* Grid of gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
            onClick={(e) => {
              lastActiveTriggerRef.current = e.currentTarget;
              setSelectedIndex(idx);
            }}
            aria-label={`${locale === 'pt' ? 'Ampliar captura' : 'Enlarge screenshot'} ${idx + 1}: ${img.alt[locale]}`}
            className="group relative text-left overflow-hidden rounded-xl border border-[#27272A] bg-[#18181B] aspect-[16/10] transition-all hover:border-[#3B82F6]/60 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            {imageErrors[idx] ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#18181B]">
                <ImageOff className="h-8 w-8 text-[#A1A1AA]/50 mb-2" />
                <span className="text-xs text-[#A1A1AA]">{img.alt[locale]}</span>
              </div>
            ) : (
              <Image
                src={img.src}
                alt={img.alt[locale]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => {
                  setImageErrors((prev) => ({ ...prev, [idx]: true }));
                }}
              />
            )}

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-[#09090B]/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex items-center justify-center">
              <span className="flex items-center gap-1.5 rounded-lg bg-[#3B82F6] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                <ZoomIn className="h-3.5 w-3.5" />
                <span>{locale === 'pt' ? 'Ampliar' : 'Zoom in'}</span>
              </span>
            </div>

            {/* Caption bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 pointer-events-none">
              <p className="text-xs font-medium text-[#FAFAFA] truncate">
                {img.alt[locale]}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[selectedIndex].alt[locale]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-[#27272A] bg-[#111114] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#3B82F6]">
                  {selectedIndex + 1} / {images.length}
                </span>
                <span className="text-xs font-semibold text-[#FAFAFA]">
                  {images[selectedIndex].alt[locale]}
                </span>
              </div>
              <button
                ref={modalCloseButtonRef}
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
                aria-label={locale === 'pt' ? 'Fechar visualização ampliada' : 'Close enlarged view'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image viewer box */}
            <div className="relative flex aspect-[16/10] items-center justify-center rounded-xl border border-[#27272A] bg-[#09090B] overflow-hidden">
              {imageErrors[selectedIndex] ? (
                <div className="text-center p-8">
                  <ImageOff className="mx-auto h-12 w-12 text-[#A1A1AA] mb-3" />
                  <h4 className="text-sm font-semibold text-[#FAFAFA]">
                    {images[selectedIndex].alt[locale]}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-1 font-mono">
                    {locale === 'pt' ? 'Arquivo de imagem indisponível' : 'Image file unavailable'}
                  </p>
                </div>
              ) : (
                <Image
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt[locale]}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              )}

              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={locale === 'pt' ? 'Imagem anterior' : 'Previous image'}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[#27272A] bg-[#18181B]/80 p-2.5 text-white hover:border-[#3B82F6] hover:bg-[#18181B] transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={locale === 'pt' ? 'Próxima imagem' : 'Next image'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#27272A] bg-[#18181B]/80 p-2.5 text-white hover:border-[#3B82F6] hover:bg-[#18181B] transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
