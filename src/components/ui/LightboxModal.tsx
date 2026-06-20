import { useRef, useEffect } from "react";
import type { TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LightboxData } from "../../types";
import { getAssetUrl } from "../../utils/getAssetUrl";

interface LightboxModalProps {
  lightboxData: LightboxData | null;
  onClose: () => void;
}

export default function LightboxModal({
  lightboxData,
  onClose,
}: LightboxModalProps) {
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxData === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && lightboxData.onPrev) {
        lightboxData.onPrev();
        return;
      }
      if (e.key === "ArrowRight" && lightboxData.onNext) {
        lightboxData.onNext();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Focus close button (always index 0/1 depending on prev/next presence)
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll('button');
      if (focusable.length > 0) {
        // Focus the last button (which is always the Close button)
        (focusable[focusable.length - 1] as HTMLElement).focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxData, onClose]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      e.stopPropagation();
      if (isLeftSwipe) {
        lightboxData?.onNext?.();
      } else {
        lightboxData?.onPrev?.();
      }
    }
  };

  return (
    <AnimatePresence>
      {lightboxData !== null && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-55 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
          tabIndex={-1}
        >
          {/* Prev/Next Navigation Buttons */}
          {lightboxData.onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxData.onPrev?.();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/15 transition-all shadow-lg active:scale-95 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {lightboxData.onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxData.onNext?.();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/15 transition-all shadow-lg active:scale-95 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2.5 rounded-full cursor-pointer z-60"
            aria-label="Close image viewer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[80vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-neutral-900 cursor-default"
          >
            <img
              src={getAssetUrl(lightboxData.src)}
              alt={lightboxData.alt}
              className="w-full h-auto max-h-[80vh] object-contain select-none"
              loading="lazy"
            />
          </motion.div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 text-center text-white max-w-2xl px-4"
          >
            <h4 className="font-mono font-bold text-sm tracking-wide text-accent">
              {lightboxData.label}
            </h4>
            <p className="text-sm text-neutral-300 mt-1">
              {lightboxData.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
