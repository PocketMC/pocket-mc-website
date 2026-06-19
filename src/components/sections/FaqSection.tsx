import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqData } from "../../data/faqData";

export default function FaqSection() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true, // Open the first FAQ by default
  });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
      <div className="text-center mb-12 sm:mb-16">
        <span
          className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded inline-block"
          style={{
            color: "var(--accent)",
            background: "var(--base-muted)",
          }}
        >
          QUESTIONS &amp; ANSWERS
        </span>
        <h2
          className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em]"
          style={{ color: "var(--main)" }}
        >
          Frequently Asked Questions
        </h2>
        <p
          className="mt-4 text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--main-muted)" }}
        >
          Find answers to common questions about setting up, securing, and
          managing your Minecraft server environments.
        </p>
      </div>

      <div className="space-y-3">
        {faqData.map((faq, idx) => {
          const isOpen = !!openFaqs[idx];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                isOpen ? "shadow-md border-main" : "shadow-sm border-divider"
              }`}
              style={{
                background: "var(--base-card)",
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
              >
                <h3
                  className="text-sm sm:text-base font-bold pr-4 transition-colors duration-200"
                  style={{ color: "var(--main)" }}
                >
                  {faq.q}
                </h3>

                {/* Animated chevron */}
                <motion.div
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isOpen ? "text-main border-main" : "text-main-muted border-divider"
                  }`}
                >
                  <motion.svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
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
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="p-6"
                      style={{
                        borderTop: "1px solid var(--divider)",
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "var(--main-muted)",
                          lineHeight: "1.75",
                        }}
                      >
                        {faq.a}
                      </p>
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
