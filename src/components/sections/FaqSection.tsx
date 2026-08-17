import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqData } from "../../data/faqData";

export default function FaqSection() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqData.map((faq, idx) => {
          const isOpen = !!openFaqs[idx];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: idx * 0.06,
                ease: "easeOut",
              }}
              className={`relative rounded-xl overflow-hidden border transition-all duration-200 ${
                isOpen ? "border-main/50 shadow-xs" : "border-divider"
              } bg-base-card`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
              >
                <h3 className="text-sm sm:text-base font-bold pr-4 text-main leading-snug">
                  {faq.q}
                </h3>

                {/* Animated chevron */}
                <motion.div
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-7 h-7 rounded-full border border-divider bg-base-muted/50 flex items-center justify-center text-main-muted group-hover:text-main flex-shrink-0"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </button>

              {/* Animated content panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="p-4 sm:p-6 space-y-3.5 border-t border-divider bg-base-muted/20">
                      {faq.a.split("\n").filter(Boolean).map((paragraph, pIdx) => {
                        const isNumbered = /^\d+\.\s+/.test(paragraph);
                        if (isNumbered) {
                          const match = paragraph.match(/^(\d+)\.\s+(.*?):\s+(.*)/);
                          if (match) {
                            const [, num, title, desc] = match;
                            return (
                              <div 
                                key={pIdx} 
                                className="mt-2 p-3.5 rounded-lg border border-divider bg-base-card space-y-1.5"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-mono font-bold select-none border border-divider bg-base-muted text-main">
                                    {num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-main">
                                    {title}
                                  </h4>
                                </div>
                                <p className="text-xs pl-7 leading-relaxed text-main-muted">
                                  {desc}
                                </p>
                              </div>
                            );
                          }
                        }
                        return (
                          <p
                            key={pIdx}
                            className="text-xs sm:text-sm leading-relaxed text-main-muted"
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
