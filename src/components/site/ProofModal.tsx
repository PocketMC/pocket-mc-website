import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ProofPoint, ProofModalData } from "../../types";
import { Icon } from "./Primitives";

interface ProofModalProps {
  proofModalData: ProofModalData | null;
  onClose: () => void;
}

export default function ProofModal({
  proofModalData,
  onClose,
}: ProofModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!proofModalData) return;

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
      const focusable = modalRef.current.querySelectorAll("button");
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [proofModalData, onClose]);

  if (!proofModalData) return null;

  const content = (
    <div
      className="proof-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={proofModalData.title}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="proof-modal-card"
      >
        {/* Header */}
        <div className="proof-modal-header">
          <div className="proof-modal-header-text">
            <div className="proof-kicker-row">
              <span className="proof-badge font-mono">
                <Icon name="shield" size={12} />
                <span>TECHNICAL AUDIT</span>
              </span>
              <span className="proof-subkicker font-mono">CODE CITATIONS</span>
            </div>
            <h3>{proofModalData.title}</h3>
            <p className="proof-modal-subtitle">
              Public codebase citations and architectural documentation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="icon-button dialog-close"
            aria-label="Close audit notes"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Audit Points List */}
        <div className="proof-modal-body">
          {proofModalData.points.map((pt: ProofPoint, i: number) => (
            <div key={i} className="proof-card">
              <div className="proof-card-header">
                <span className="proof-card-index font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="proof-card-title">{pt.title}</h4>
              </div>

              <p className="proof-card-desc">{pt.desc}</p>

              {(pt.file || pt.code) && (
                <div className="proof-card-evidence">
                  {pt.file && (
                    <div className="proof-file-row font-mono">
                      <span className="evidence-label">File</span>
                      <Icon name="file" size={13} />
                      <span className="file-path">{pt.file}</span>
                    </div>
                  )}
                  {pt.code && (
                    <div className="proof-code-box font-mono">
                      <div className="code-box-header">
                        <Icon name="code" size={12} />
                        <span>Code Reference</span>
                      </div>
                      <pre className="code-content">
                        <code>{pt.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="proof-modal-footer">
          <div className="proof-footer-note font-mono">
            <Icon name="info" size={13} />
            <span>Audit Invariants: Architecture &amp; Public Source</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="button secondary small"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : content;
}
