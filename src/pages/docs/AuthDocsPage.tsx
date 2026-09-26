import { motion } from "motion/react";

interface AuthDocsPageProps {
  navigate?: (path: string) => void;
}

export default function AuthDocsPage({ navigate }: AuthDocsPageProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigate) {
      navigate("/docs/");
    } else {
      window.location.href = "/pocket-mc-website/docs/";
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6">
        <a
          href="/pocket-mc-website/docs/"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-main-muted hover:text-main transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Developer Portal
        </a>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-3">
          Authentication &amp; Security
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          Security architecture and credential management across the PocketMC desktop client and API daemon.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {/* Platform Native Secrets */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            1. Platform-Native Secrets Encryption
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            API keys, partner secrets, and OAuth refresh tokens are encrypted at rest using OS hardware-backed cryptographic facilities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">Windows DPAPI</span>
              <span className="text-main-muted leading-relaxed">
                Bound to the Windows user SID using ProtectedData. Other user accounts or processes cannot decrypt stored secrets.
              </span>
            </div>
            <div className="p-4 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">Linux Secret Service</span>
              <span className="text-main-muted leading-relaxed">
                Integrated via DBus with GNOME Keyring or KWallet for session-level credential isolation.
              </span>
            </div>
            <div className="p-4 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">macOS Keychain</span>
              <span className="text-main-muted leading-relaxed">
                Secured inside Apple Keychain Services with access controls restricted to the application bundle.
              </span>
            </div>
          </div>
        </div>

        {/* Remote Pairing Protocol */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            2. Remote Control Web Panel Pairing
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            When connecting to the local desktop service from a mobile phone or secondary device on the local network:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-main-muted list-disc pl-4">
            <li>
              <strong className="text-main">QR Code Handshake:</strong> The desktop UI renders a single-use cryptographically signed pairing challenge.
            </li>
            <li>
              <strong className="text-main">HMAC Session Minting:</strong> Scanning the challenge issues an HMAC-SHA256 bearer token valid only for that client device.
            </li>
            <li>
              <strong className="text-main">Instant Revocation:</strong> Active sessions can be audited and terminated immediately from App Settings with one click.
            </li>
          </ul>
        </div>

        {/* Cloud OAuth Integrations */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            3. Cloud OAuth PKCE Exchange
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Cloud backup authorization (Google Drive, Microsoft OneDrive, Dropbox) uses standard OAuth 2.0 with Proof Key for Code Exchange (PKCE):
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-main-muted list-disc pl-4">
            <li>
              <strong className="text-main">Least Privilege Scopes:</strong> Access is restricted strictly to application-created files (e.g. <code className="font-mono text-xs">drive.file</code>), preventing access to the rest of the user's cloud drive.
            </li>
            <li>
              <strong className="text-main">Direct Upload Pipe:</strong> Backups stream directly from the user's PC to cloud storage endpoints. Tokens are stored only in the local DPAPI vault.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
