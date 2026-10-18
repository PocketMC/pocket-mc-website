import { comparisonData } from "../../data/comparisonData";
import type { ProofModalData } from "../../types";

interface ComparisonSectionProps {
  onOpenProofModal: (data: ProofModalData) => void;
}

export default function ComparisonSection({
  onOpenProofModal,
}: ComparisonSectionProps) {
  return (
    <section id="comparison" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
          Comparison with others
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-divider rounded-xl overflow-hidden bg-base-card shadow-xs relative z-10">
        <div className="relative w-full overflow-x-auto scrollbar-none">
          <table className="w-full caption-bottom text-sm border-collapse text-left min-w-[850px] md:min-w-full">
            <thead className="border-b border-divider bg-base-muted/50">
              <tr className="border-b border-divider">
                <th className="h-11 px-5 text-left align-middle font-mono text-xs font-bold uppercase tracking-wider text-main-muted select-none w-[170px]">Tool</th>
                <th className="h-11 px-5 text-left align-middle font-mono text-xs font-bold uppercase tracking-wider text-main-muted select-none w-[210px]">Category</th>
                <th className="h-11 px-5 text-left align-middle font-mono text-xs font-bold uppercase tracking-wider text-main-muted select-none w-[260px]">Core Strength</th>
                <th className="h-11 px-5 text-left align-middle font-mono text-xs font-bold uppercase tracking-wider text-main-muted select-none">Where PocketMC Wins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {comparisonData.map((row, idx) => {
                const isFeatured = row.isFeatured;
                return (
                  <tr
                    key={idx}
                    className={`border-b border-divider transition-colors ${
                      isFeatured
                        ? "bg-base-muted/35 hover:bg-base-muted/50"
                        : "hover:bg-base-muted/20"
                    }`}
                  >
                    <td className="px-5 py-4 align-top font-bold text-main">
                      {isFeatured ? (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-main font-black">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-main flex-shrink-0" />
                            <span>{row.tool}</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-base border border-divider text-main w-fit">
                            ★ Best Overall
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-main">{row.tool}</span>
                          {row.proof && (
                            <button
                              onClick={() => onOpenProofModal(row.proof!)}
                              className="inline-flex items-center justify-center p-0.5 rounded-md hover:bg-base-muted text-main-muted hover:text-main transition-colors cursor-pointer"
                              title="View Technical Audit Proof"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
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
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-[11px] font-medium font-mono rounded border ${
                          isFeatured
                            ? "bg-base-card border-divider text-main font-semibold shadow-2xs"
                            : "bg-base-muted/50 border-divider text-main-muted"
                        }`}
                      >
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-main-muted text-xs leading-relaxed">
                      {row.strength}
                    </td>
                    <td
                      className={`px-5 py-4 align-top text-xs leading-relaxed ${
                        isFeatured ? "text-main font-medium" : "text-main-muted"
                      }`}
                    >
                      {row.win}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-divider bg-base-muted/20 text-left text-[11px] font-mono text-main-muted">
          * Comparison based on public documentation as of 2026.
        </div>
      </div>

      {/* Mobile Card Stack View */}
      <div className="md:hidden space-y-3.5 relative z-10">
        {comparisonData.map((row, idx) => {
          const isFeatured = row.isFeatured;
          return (
            <div
              key={idx}
              className={`border rounded-xl p-4 sm:p-5 shadow-xs relative ${
                isFeatured
                  ? "border-main/40 bg-base-muted/30"
                  : "border-divider bg-base-card"
              }`}
            >
              {isFeatured && (
                <span className="absolute top-3 right-3 text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-base-card text-main border border-divider">
                  ★ Best Overall
                </span>
              )}
              <div className="flex items-center gap-2">
                {isFeatured && (
                  <span className="w-1.5 h-1.5 rounded-full bg-main flex-shrink-0" />
                )}
                <h3 className="font-bold text-sm text-main">
                  {row.tool}
                </h3>
                {row.proof && (
                  <button
                    onClick={() => onOpenProofModal(row.proof!)}
                    className="inline-flex items-center justify-center p-1 rounded-md hover:bg-base-muted text-main-muted hover:text-main transition-colors cursor-pointer"
                    title="View Technical Audit Proof"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="mt-2">
                <span className={`inline-block px-2 py-0.5 text-[9px] font-medium font-mono rounded border ${
                  isFeatured
                    ? "bg-base-card border-divider text-main font-semibold"
                    : "bg-base-muted/40 border-divider text-main-muted"
                }`}>
                  {row.category}
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
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
                  <p className="text-xs text-main-muted leading-relaxed mt-0.5">
                    {row.win}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
