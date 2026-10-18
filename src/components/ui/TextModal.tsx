import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TextModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function TextModal({
  isOpen,
  title,
  onClose,
  children,
}: TextModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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

    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll('button');
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 cursor-zoom-out"
          tabIndex={-1}
        >
          <motion.div
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-base-card border border-divider rounded-2xl shadow-2xl p-6 sm:p-8 cursor-default max-h-[85vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-divider pb-4 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-main font-mono tracking-tight flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-base-muted border border-divider text-main text-xs w-5 h-5 rounded-full font-sans font-bold">i</span>
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-main-muted hover:text-main transition-colors bg-base-muted/50 p-1.5 rounded-lg border border-divider cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-main-muted leading-relaxed font-mono">
              {children}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-divider flex justify-end">
              <button
                onClick={onClose}
                className="font-mono text-xs font-bold border border-divider bg-base-muted/50 hover:bg-base hover:border-main/40 transition-all focus:outline-none cursor-pointer px-4 py-2 rounded-lg text-main"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : content;
}
