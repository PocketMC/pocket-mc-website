import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "../ui/skeleton";
import { detailFeatures } from "../../data/detailFeatures";

interface StabilitySectionProps {
  isLoading: boolean;
}

export default function StabilitySection({ isLoading }: StabilitySectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="stability"
      className="relative z-10 border-t border-divider bg-base-muted/20 py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Collapsible Header Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
          aria-expanded={isOpen}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main group-hover:opacity-85 transition-opacity">
            Every detail engineered for stability.
          </h2>

          <div className="flex items-center gap-2.5 font-mono text-xs text-main-muted group-hover:text-main transition-colors flex-shrink-0 ml-4">
            <span className="hidden sm:inline font-semibold">
              {isOpen ? "Hide details" : "Show details"}
            </span>
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-divider bg-base-card flex items-center justify-center text-main shadow-xs group-hover:border-main/40 transition-colors">
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </div>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="stability-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-6 sm:p-8 border border-divider rounded-2xl bg-base-card shadow-xs"
                      >
                        <Skeleton className="w-10 h-10 rounded-xl mb-4" />
                        <Skeleton className="h-6 w-3/4 rounded mb-2" />
                        <Skeleton className="h-4 w-full rounded mb-6" />
                        <div className="space-y-3">
                          <Skeleton className="h-3 w-full rounded" />
                          <Skeleton className="h-3 w-5/6 rounded" />
                          <Skeleton className="h-3 w-4/5 rounded" />
                        </div>
                      </div>
                    ))
                  : detailFeatures.map((group) => (
                      <div
                        key={group.id}
                        className="border border-divider bg-base-card rounded-xl sm:rounded-2xl p-5 sm:p-8 flex flex-col justify-between shadow-xs hover:border-main/30 transition-all duration-200"
                      >
                        <div>
                          {/* Icon Badge */}
                          <div className="w-10 h-10 rounded-xl border border-divider bg-base-muted flex items-center justify-center text-main mb-5 flex-shrink-0">
                            {group.id === "lifecycle" && (
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                                <path d="M12 12l-6.5 6.5" />
                                <path d="M11.5 3A16.5 16.5 0 0 0 21 12.5v.5h-1.5a3.5 3.5 0 0 1-3.5-3.5v-1a3.5 3.5 0 0 1-3.5-3.5V3.5A3.5 3.5 0 0 1 11.5 3z" />
                                <path d="M8.5 8.5L3 14" />
                              </svg>
                            )}
                            {group.id === "ai" && (
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="3" y="11" width="18" height="10" rx="2" />
                                <circle cx="12" cy="5" r="2" />
                                <path d="M12 7v4" />
                                <line x1="8" y1="16" x2="8.01" y2="16" />
                                <line x1="16" y1="16" x2="16.01" y2="16" />
                              </svg>
                            )}
                            {group.id === "diagnostics" && (
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                              </svg>
                            )}
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-main tracking-tight">
                            {group.title}
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm text-main-muted leading-relaxed mb-6">
                            {group.description}
                          </p>

                          <div className="h-px bg-divider mb-5" />

                          {/* Items with High-Contrast Readable Typography */}
                          <ul className="space-y-3">
                            {group.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs text-main-muted leading-relaxed"
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-main mt-0.5 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
