import { useState } from "react";
import { comparisonData } from "../../data/comparisonData";
import type { ProofModalData } from "../../types";
import { Icon, Section } from "./Primitives";
import ProofModal from "./ProofModal";

export default function ComparisonSection() {
  const [proofData, setProofData] = useState<ProofModalData | null>(null);

  return (
    <Section id="comparison">
      <div className="page section-body">
        <div className="section-head">
          <div>
            <span className="kicker">Comparison</span>
            <h2>Comparison with others</h2>
          </div>
          <span className="section-subhead-note font-mono">
            Direct architecture & platform audit
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="comparison-table-wrapper wire">
          <div className="table-scroll-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="font-mono">Tool</th>
                  <th className="font-mono">Category</th>
                  <th className="font-mono">Core Strength</th>
                  <th className="font-mono">Where PocketMC Wins</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => {
                  const isFeatured = row.isFeatured;
                  return (
                    <tr
                      key={row.tool}
                      className={isFeatured ? "row-featured" : ""}
                    >
                      <td className="cell-tool">
                        {isFeatured ? (
                          <div className="featured-tool-cell">
                            <span className="tool-indicator" />
                            <strong>{row.tool}</strong>
                            <span className="badge-featured font-mono">
                              ★ Best Overall
                            </span>
                          </div>
                        ) : (
                          <div className="tool-name-cell">
                            <span>{row.tool}</span>
                            {row.proof && (
                              <button
                                type="button"
                                onClick={() => setProofData(row.proof as ProofModalData)}
                                className="icon-btn-proof"
                                title="View technical audit proof"
                                aria-label={`View technical audit proof for ${row.tool}`}
                              >
                                <Icon name="info" size={13} />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="cell-category">
                        <span className="category-pill font-mono">
                          {row.category}
                        </span>
                      </td>
                      <td className="cell-strength">
                        <p>{row.strength}</p>
                      </td>
                      <td className="cell-win">
                        <p>{row.win}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="comparison-footnote font-mono">
            * Comparison based on public documentation as of 2026.
          </div>
        </div>

        {/* Mobile Card Stack */}
        <div className="comparison-mobile-stack wire">
          {comparisonData.map((row) => {
            const isFeatured = row.isFeatured;
            return (
              <div
                key={row.tool}
                className={`comparison-mobile-card ${isFeatured ? "featured" : ""}`}
              >
                <div className="mobile-card-top">
                  <div className="mobile-card-title">
                    {isFeatured && <span className="tool-indicator" />}
                    <h3>{row.tool}</h3>
                    {row.proof && (
                      <button
                        type="button"
                        onClick={() => setProofData(row.proof as ProofModalData)}
                        className="icon-btn-proof"
                        title="View technical audit proof"
                        aria-label={`View technical audit proof for ${row.tool}`}
                      >
                        <Icon name="info" size={13} />
                      </button>
                    )}
                  </div>
                  {isFeatured && (
                    <span className="badge-featured font-mono">
                      ★ Best Overall
                    </span>
                  )}
                </div>

                <span className="category-pill font-mono">
                  {row.category}
                </span>

                <div className="mobile-card-details">
                  <div className="detail-item">
                    <span className="kicker">Core Strength</span>
                    <p>{row.strength}</p>
                  </div>
                  <div className="detail-item">
                    <span className="kicker">Where PocketMC Wins</span>
                    <p>{row.win}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Audit Proof Modal */}
        <ProofModal
          proofModalData={proofData}
          onClose={() => setProofData(null)}
        />
      </div>
    </Section>
  );
}
