import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { serverSoftwares } from "../../data/serverSoftwares";
import { getAssetUrl } from "../../utils/getAssetUrl";

interface SoftwaresSectionProps {
  isLoading: boolean;
}

export default function SoftwaresSection({ isLoading }: SoftwaresSectionProps) {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  return (
    <section id="under-the-hood" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
            Support for every major server software.
          </h2>

          <div className="mt-6 border border-divider bg-base-card rounded-xl shadow-xs cursor-default">
            <div className="p-5 flex gap-4 items-center">
              <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-base-muted rounded-lg text-main border border-divider">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-main">
                  Geyser + Floodgate Provisions
                </h4>
                <p className="text-xs text-main-muted mt-1 leading-5">
                  Java server instances can be patched automatically with Geyser dependencies to support Bedrock client joins natively.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-2.5 sm:gap-3.5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 flex gap-3 items-center border border-divider rounded-xl bg-base-card"
                >
                  <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-20 rounded mb-1" />
                    <Skeleton className="h-3 w-10 rounded" />
                  </div>
                </div>
              ))
            : serverSoftwares.map((software) => {
                const isActive = activeInfo === software.name;
                return (
                  <div
                    key={software.name}
                    className="border border-divider bg-base-card rounded-xl shadow-xs select-none p-3 sm:p-4 transition-all hover:border-main/30 flex items-center justify-between gap-2 relative"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-base-muted p-1.5 sm:p-2 rounded-lg border border-divider flex items-center justify-center overflow-hidden">
                        <img
                          src={getAssetUrl(software.icon)}
                          alt={software.name}
                          className={`w-full h-full object-contain filter ${
                            software.name === "Forge" ? "invert dark:invert-0" : ""
                          }`}
                          width="40"
                          height="40"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs sm:text-sm text-main truncate leading-tight">
                          {software.name}
                        </h3>
                        <span className="inline-block mt-0.5 text-[9px] font-mono px-1.5 py-0.5 rounded border border-divider bg-base-muted text-main-muted font-medium leading-none">
                          {software.tag}
                        </span>
                      </div>
                    </div>

                    {/* Tooltip Wrapper */}
                    <div className="relative group/tooltip flex-shrink-0">
                      <button
                        onClick={() => setActiveInfo(isActive ? null : software.name)}
                        onMouseEnter={() => setActiveInfo(software.name)}
                        onMouseLeave={() => setActiveInfo(null)}
                        className="w-6 h-6 rounded-full border bg-base-muted border-divider text-main-muted hover:text-main transition-colors flex items-center justify-center cursor-pointer"
                        aria-label={`Info about ${software.name}`}
                      >
                        <svg
                          className="w-3 h-3 fill-none stroke-current"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </button>

                      {/* Hover Tooltip Card */}
                      <div
                        className={`absolute right-0 bottom-full mb-2.5 w-56 sm:w-64 p-3 rounded-xl border border-divider bg-base-card/95 backdrop-blur-md shadow-lg text-[11px] font-mono text-main leading-relaxed z-40 transition-all duration-150 pointer-events-none ${
                          isActive
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-1 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:scale-100"
                        }`}
                      >
                        <div className="font-bold text-main mb-1 border-b border-divider pb-1 flex items-center justify-between">
                          <span>{software.name}</span>
                          <span className="text-[9px] font-normal text-main-muted">{software.tag}</span>
                        </div>
                        <p className="text-main-muted text-[11px] font-normal">
                          {software.description}
                        </p>
                        <div className="absolute -bottom-1.5 right-2.5 w-3 h-3 bg-base-card border-b border-r border-divider rotate-45"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
