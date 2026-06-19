import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "../ui/skeleton";
import { serverSoftwares } from "../../data/serverSoftwares";
import { detailFeatures } from "../../data/detailFeatures";
import { getAssetUrl } from "../../utils/getAssetUrl";

interface SoftwaresSectionProps {
  isLoading: boolean;
}

export default function SoftwaresSection({ isLoading }: SoftwaresSectionProps) {
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({
    0: true, // Open the first accordion by default
  });

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* Supported Server Software Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div>
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
              SERVER STACK ENGINE
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
              Support for every major server software.
            </h2>
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base leading-6"
              style={{ color: "var(--main-muted)" }}
            >
              PocketMC resolves available server versions from upstream APIs
              and manifests dynamically, facilitating installation for:
            </p>

            <div className="mt-6 border border-divider bg-base-card rounded-xl shadow-sm cursor-default">
              <div className="p-5 flex gap-4 items-center">
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
                  🌐
                </div>
                <div>
                  <h4 className="text-sm font-bold text-main">
                    Geyser + Floodgate Provisions
                  </h4>
                  <p className="text-xs text-main-muted mt-1 leading-5">
                    Java server instances can be patched automatically with
                    Geyser dependencies to support Bedrock client joins
                    natively on the same computer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {isLoading
              ? // Skeleton loaders
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-5 flex gap-4 items-start border border-divider rounded-xl bg-base-card/20 backdrop-blur"
                  >
                    <Skeleton className="w-12 h-12 flex-shrink-0 rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-4 w-12 rounded" />
                      </div>
                      <Skeleton className="h-3 w-full rounded mb-2" />
                      <Skeleton className="h-3 w-5/6 rounded" />
                    </div>
                  </div>
                ))
              : serverSoftwares.map((software) => (
                    <div
                      key={software.name}
                      className="border border-divider bg-base-card rounded-xl shadow-sm select-none group cursor-pointer"
                    >
                      <div className="p-5 flex gap-4 items-start">
                        <div className="w-12 h-12 flex-shrink-0 bg-base-muted p-2 rounded-lg border border-divider flex items-center justify-center overflow-hidden">
                          <img
                            src={getAssetUrl(software.icon)}
                            alt={software.name}
                            className="w-full h-full object-contain filter group-hover:scale-105 transition-transform"
                            width="48"
                            height="48"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-main">
                              {software.name}
                            </h3>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-divider bg-base-muted text-main-muted font-semibold leading-none">
                              {software.tag}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-main-muted leading-5">
                            {software.description}
                          </p>
                        </div>
                      </div>
                    </div>
                ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Accordion */}
      <section
        id="roadmap"
        className="relative z-10 border-t border-divider bg-base-muted/30 py-16 sm:py-24 px-4 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
              UNDER THE HOOD
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
              Every detail engineered for stability.
            </h2>
            <p className="mt-4 text-main-muted text-sm">
              We look into real server errors (like locked session files, port
              clashes, network loopback restrictions, Adoptium hash failures)
              and fix them behind the scenes.
            </p>
          </div>

          <div className="space-y-3">
            {isLoading
              ? // Skeleton loaders
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="px-6 py-5 border border-divider rounded-xl bg-base-card/20 backdrop-blur"
                  >
                    <div className="flex gap-4 items-start">
                      <Skeleton className="w-10 h-10 flex-shrink-0 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 rounded mb-2" />
                        <Skeleton className="h-3 w-48 rounded" />
                      </div>
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                    </div>
                  </div>
                ))
              : detailFeatures.map((group, idx) => {
                  const isOpen = !!openAccordions[idx];
                  return (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.1,
                        ease: "easeOut",
                      }}
                      className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                        isOpen
                          ? "border-main shadow-md"
                          : "border-divider shadow-sm"
                      } bg-base-card/60 backdrop-blur`}
                    >
                      {/* Animated left accent bar */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b from-accent via-purple-400 to-cyan-400"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{
                          scaleY: isOpen ? 1 : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ transformOrigin: "top" }}
                      />

                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                      >
                        <div className="flex gap-4 items-center">
                          <motion.div
                            animate={{
                              backgroundColor: isOpen
                                ? "var(--color-divider)"
                                : "transparent",
                              borderColor: isOpen
                                ? "var(--color-main-muted)"
                                : "var(--color-divider)",
                              boxShadow: "none",
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 flex-shrink-0 border rounded-lg flex items-center justify-center text-main"
                          >
                            <motion.div
                              animate={{
                                rotate: isOpen ? 360 : 0,
                                scale: isOpen ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                              {group.id === "lifecycle" && (
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
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
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="11"
                                    width="18"
                                    height="10"
                                    rx="2"
                                  />
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
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                </svg>
                              )}
                            </motion.div>
                          </motion.div>

                          <div className="ml-4">
                            <h3 className="text-base font-bold text-main group-hover:text-accent transition-colors duration-200 font-mono">
                              {group.title}
                            </h3>
                            <p className="text-xs text-main-muted mt-1 leading-none">
                              {group.description}
                            </p>
                          </div>
                        </div>

                        {/* Animated chevron */}
                        <motion.div
                          animate={{
                            rotate: isOpen ? 180 : 0,
                            backgroundColor: isOpen
                              ? "var(--color-accent)"
                              : "transparent",
                            boxShadow: "none",
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-sm font-bold flex-shrink-0"
                        >
                          <motion.svg
                            className="w-4 h-4"
                            style={{
                              color: isOpen
                                ? "var(--color-accent-text)"
                                : "var(--color-main-muted)",
                            }}
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
                            transition={{
                              duration: 0.35,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="border-t border-divider/60 p-6 bg-gradient-to-b from-accent/[0.03] to-transparent">
                              <div className="space-y-0">
                                {group.items.map((item, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.25,
                                      delay: i * 0.055,
                                      ease: "easeOut",
                                    }}
                                    className="flex items-start gap-3 text-xs leading-5 font-mono group/item py-2 border-b border-divider/30 last:border-0"
                                  >
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: i * 0.055 + 0.1,
                                        type: "spring",
                                        stiffness: 300,
                                      }}
                                      className="h-1.5 w-1.5 rounded-full bg-main mt-2 flex-shrink-0"
                                    />
                                    <span className="text-main-muted group-hover/item:text-main transition-colors duration-150">
                                      {item}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
}
