import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { comparisonData } from "../../data/comparisonData";
import type { ProofModalData } from "../../types";

interface ComparisonSectionProps {
  isLoading: boolean;
  onOpenProofModal: (data: ProofModalData) => void;
}

export default function ComparisonSection({
  isLoading,
  onOpenProofModal,
}: ComparisonSectionProps) {
  return (
    <>
      {/* Tool Comparison Table Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
            TOOL COMPARISON
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
            How PocketMC Stacks Up
          </h2>
          <p
            className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--main-muted)" }}
          >
            Compare local self-hosting with traditional panels, cloud hosting
            services, wrappers, and P2P solutions.
          </p>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block border border-divider rounded-xl overflow-hidden bg-base-card/40 backdrop-blur-md shadow-sm relative z-10">
          <div className="overflow-x-auto scrollbar-none">
            <Table className="min-w-[850px] md:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Tool</TableHead>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-[280px]">Core Strength</TableHead>
                  <TableHead>Where PocketMC Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, idx) => {
                  const isFeatured = row.isFeatured;
                  return (
                    <TableRow
                      key={idx}
                      className={
                        isFeatured
                          ? "bg-accent/5 dark:bg-accent/10 hover:bg-accent/8 dark:hover:bg-accent/15 border-l-4 border-accent"
                          : ""
                      }
                    >
                      <TableCell className="font-bold text-main py-4">
                        {isFeatured ? (
                          <div className="flex items-center gap-1.5 text-accent font-black">
                            <span className="text-xs">⚡</span>
                            {row.tool}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span>{row.tool}</span>
                            {row.proof && (
                              <button
                                onClick={() => onOpenProofModal(row.proof!)}
                                className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-base-muted text-main-muted hover:text-accent transition-all cursor-pointer group"
                                title="View Technical Audit Proof"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[10px] font-semibold font-mono rounded border ${
                            isFeatured
                              ? "bg-accent/15 border-accent/40 text-accent"
                              : "bg-base-muted/30 border-divider text-main-muted"
                          }`}
                        >
                          {row.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-main-muted text-xs leading-5 py-4">
                        {row.strength}
                      </TableCell>
                      <TableCell
                        className={`text-xs leading-5 py-4 ${
                          isFeatured ? "text-main font-bold" : "text-main-muted"
                        }`}
                      >
                        {isFeatured ? (
                          <span className="text-main dark:text-zinc-100">
                            {row.win}
                          </span>
                        ) : (
                          row.win
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <p
            className="mt-4 text-left text-[10px] sm:text-xs font-mono leading-relaxed px-4 pb-4"
            style={{ color: "var(--main-muted)" }}
          >
            * Comparison based on public documentation as of May 2026. Setup
            complexity varies based on standard manual terminal/scripts or
            Docker network configuration.
          </p>
        </div>

        {/* Mobile Card Stack View (Hidden on desktop/tablet) */}
        <div className="md:hidden space-y-4 relative z-10">
          {comparisonData.map((row, idx) => {
            const isFeatured = row.isFeatured;
            return (
              <div
                key={idx}
                className={`border rounded-xl p-5 backdrop-blur-md shadow-sm relative ${
                  isFeatured
                    ? "border-accent bg-accent/5 dark:bg-accent/10"
                    : "border-divider bg-base-card/40"
                }`}
              >
                {isFeatured && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-accent/20 text-accent uppercase tracking-widest animate-pulse">
                    Featured
                  </span>
                )}
                <div className="flex items-center gap-2">
                  {isFeatured && <span className="text-xs">⚡</span>}
                  <h3 className={`font-black text-sm ${isFeatured ? "text-accent" : "text-main"}`}>
                    {row.tool}
                  </h3>
                  {row.proof && (
                    <button
                      onClick={() => onOpenProofModal(row.proof!)}
                      className="inline-flex items-center justify-center p-1 rounded-full hover:bg-base-muted text-main-muted hover:text-accent transition-all cursor-pointer"
                      title="View Technical Audit Proof"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="mt-2">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-semibold font-mono rounded border ${
                    isFeatured
                      ? "bg-accent/15 border-accent/40 text-accent"
                      : "bg-base-muted/30 border-divider text-main-muted"
                  }`}>
                    {row.category}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-main-muted uppercase tracking-wider">
                      Core Strength
                    </h4>
                    <p className="text-xs text-main leading-relaxed mt-0.5">
                      {row.strength}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-main-muted uppercase tracking-wider">
                      Where PocketMC Wins
                    </h4>
                    <p className={`text-xs leading-relaxed mt-0.5 ${isFeatured ? "text-main font-bold" : "text-main-muted"}`}>
                      {row.win}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <p
            className="text-[10px] font-mono leading-relaxed text-main-muted mt-4 px-2"
          >
            * Comparison based on public documentation as of May 2026. Setup
            complexity varies based on standard manual terminal/scripts or
            Docker network configuration.
          </p>
        </div>
      </section>

      {/* System Requirements & Quick Start */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          {isLoading ? (
            <>
              {/* Quick Start Skeleton */}
              <div className="border border-divider p-6 sm:p-8 rounded-lg sm:rounded-xl bg-base-card/20 backdrop-blur">
                <Skeleton className="h-6 w-32 rounded mb-4" />
                <div className="space-y-4 sm:space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 rounded mb-1.5" />
                        <Skeleton className="h-3 w-full rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Requirements Skeleton */}
              <div className="border border-divider p-8 rounded-xl bg-base-card/20 backdrop-blur">
                <Skeleton className="h-6 w-40 rounded mb-6" />
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-divider/60 pb-3 flex flex-col sm:flex-row sm:justify-between gap-1"
                    >
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 border border-divider bg-base-muted/30 rounded-lg">
                  <Skeleton className="h-4 w-full rounded mb-2" />
                  <Skeleton className="h-3 w-5/6 rounded" />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Quick Start Card */}
              <div className="border border-divider p-6 sm:p-8 rounded-lg sm:rounded-xl bg-base-card/40 backdrop-blur shadow-sm relative overflow-hidden">
                <h3 className="text-lg sm:text-xl font-black text-main font-mono mb-4 sm:mb-6 relative z-10">
                  🏁 Quick Start
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Choose App Root Path",
                      desc: "When launching PocketMC for the first time, choose an empty target folder where instances, runtimes, logs, and tunnel files will be organized.",
                    },
                    {
                      step: "02",
                      title: "Create Your First Server",
                      desc: "Select a server family (e.g. Paper, Fabric, BDS), choose a release version, accept the Minecraft EULA, and let the background download handle files.",
                    },
                    {
                      step: "03",
                      title: "Launch & Connect",
                      desc: "Click Start. Open the Minecraft client and connect locally using 'localhost' or your LAN IP. Port diagnostics will resolve conflicts.",
                    },
                    {
                      step: "04",
                      title: "Go Public (Optional)",
                      desc: "Configure Playit.gg tunnels in the client directly. Distribute the numeric or alphanumeric share address to invite friends.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 items-start group"
                    >
                      <span className="font-mono text-xs font-bold flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-base-muted text-accent border border-divider shadow-sm group-hover:scale-105 transition-transform duration-300">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-main">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-main-muted leading-5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Requirements Card */}
              <div className="flex flex-col justify-between border border-divider p-8 rounded-xl bg-base-card/40 backdrop-blur shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-main font-mono mb-6">
                    💻 System Requirements
                  </h3>

                  <div className="space-y-4 font-mono text-xs">
                    {[
                      [
                        "Operating System",
                        "Windows 10 Version 1809 (Build 17763) or newer / Windows 11",
                      ],
                      ["Architecture", "x64 Required"],
                      [
                        "Memory (RAM)",
                        "4 GB Minimum / 8 GB or more recommended",
                      ],
                      [
                        "Local Runtimes",
                        ".NET 8 Desktop Runtime (app prompts installer if missing)",
                      ],
                      [
                        "Network Details",
                        "Local loopback access helper (CheckNetIsolation) handles BDS player restrictions",
                      ],
                      [
                        "Internet Link",
                        "Required for runtime/server downloads, provider metadata, marketplace browsing, updates, and Playit.gg",
                      ],
                    ].map(([specName, specVal]) => (
                      <div
                        key={specName}
                        className="border-b border-divider/60 pb-3 flex flex-col sm:flex-row sm:justify-between gap-1"
                      >
                        <span className="font-semibold text-main">
                          {specName}
                        </span>
                        <span className="text-main-muted text-left sm:text-right max-w-sm leading-5">
                          {specVal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 border border-divider bg-base-muted/30 rounded-lg flex items-start gap-3 relative z-10">
                  <span className="text-lg">⚙️</span>
                  <p className="text-xs text-main-muted leading-5 font-mono">
                    No local global setup needed. PocketMC coordinates
                    app-local Adoptium Java versions and PHP runtimes
                    dynamically.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
