import { motion, AnimatePresence } from "motion/react";
import React from "react";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-base-card/90 backdrop-blur-xl border border-divider rounded-2xl shadow-2xl p-6 md:p-8 cursor-default max-h-[85vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-divider pb-4 mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-extrabold text-main font-mono tracking-tight flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-accent/10 text-accent text-sm w-6 h-6 rounded-full font-sans font-bold">i</span>
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-main-muted hover:text-main transition-colors bg-base-muted/30 hover:bg-base-muted/60 p-1.5 rounded-full cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 text-sm text-main-muted leading-relaxed font-sans">
              {children}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-divider flex justify-end">
              <button
                onClick={onClose}
                className="font-mono text-xs font-bold border border-divider bg-base-muted/40 hover:bg-base hover:text-accent hover:border-accent/40 shadow-sm transition-all focus:outline-none cursor-pointer px-4 py-2 rounded-lg text-main"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
