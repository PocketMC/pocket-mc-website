import { motion } from "motion/react";

interface PrivacyPageProps {
  navigate?: (path: string) => void;
}

export default function PrivacyPage(_props: PrivacyPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-4">
          Privacy &amp; Security Policy
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          PocketMC is engineered with an uncompromising local-first architecture. Your server configurations, game worlds, credentials, and telemetry preferences reside strictly on your own hardware. This document outlines how secrets are encrypted, how telemetry operates with zero personal data, and every outbound connection the software makes.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 p-4 sm:p-5 rounded-xl border border-divider bg-base-card font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Storage Location</span>
            <span className="text-xs sm:text-sm font-bold text-main">100% Local Disk</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Secret Encryption</span>
            <span className="text-xs sm:text-sm font-bold text-main">Hardware Key Vault</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Telemetry Model</span>
            <span className="text-xs sm:text-sm font-bold text-main">Optional &amp; Anonymized</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Personal Data Sold</span>
            <span className="text-xs sm:text-sm font-bold text-main">Zero (Never Collected)</span>
          </div>
        </div>
      </motion.div>

      {/* 1. Local Storage Sovereignty */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            1. Local Storage Sovereignty &amp; Platform Encryption
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Hardware-backed cryptographic security without cloud intermediary storage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Local Directory Containment
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                PocketMC maintains all server configuration files, world archives, console logs, player data, and metadata strictly on your local machine under your designated application directory. We do not mirror or store your game data on proprietary servers.
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>World saves stay on your NVMe or SSD storage.</li>
              <li>No remote access unless you explicitly enable a tunnel.</li>
              <li>Full portability: delete or move instances with standard file operations.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Platform-Native Key Vaults
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Sensitive credentials (including CurseForge API tokens, Playit secret keys, OAuth refresh tokens, and AI Provider keys) are encrypted at rest using OS hardware-backed cryptographic facilities:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li><strong>Windows:</strong> Protected via Windows Data Protection API (DPAPI).</li>
              <li><strong>Linux:</strong> Stored via Secret Service API (dbus / GNOME Keyring / KWallet).</li>
              <li><strong>macOS:</strong> Protected using Apple Keychain Security framework.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Direct Cloud Backup Pipe
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                When configuring automated off-site backups to Google Drive, Microsoft OneDrive, or Dropbox, the connection is established directly between your local PC and the respective cloud provider API.
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Zero intermediary servers handle world archives.</li>
              <li>OAuth tokens are held in your local DPAPI vault.</li>
              <li>RCON freeze and thaw commands preserve chunk consistency.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Telemetry Architecture */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            2. Telemetry Architecture &amp; Complete Opt-Out
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Transparent health metrics designed to evaluate engine stability with zero tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                What Is Collected (If Enabled)
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                To measure software reliability, track server engine adoption, and diagnose crashes, PocketMC includes an optional telemetry reporting system:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li><strong>Anonymous Client UUID:</strong> Randomly generated locally; not tied to hardware serials.</li>
              <li><strong>Approximate Country:</strong> Resolved on startup via <code>http://ip-api.com</code>.</li>
              <li><strong>Client Version &amp; Engines:</strong> App version and active server engine counts.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                What Is Never Collected
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                We follow a strict zero-knowledge approach regarding your personal identity, server content, and player behavior:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Zero personal identifiers, real names, or email addresses.</li>
              <li>Zero player gamertags, IP addresses, or in-game chat logs.</li>
              <li>Zero world saves, seed values, coordinate records, or mods.</li>
              <li>Zero hardware MAC addresses, motherboard serials, or GPU IDs.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                1-Click Permanent Opt-Out
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Telemetry is completely optional. You can disable all telemetry reporting at any time with a single switch:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Open <strong>Settings</strong> &gt; <strong>Telemetry</strong> in PocketMC.</li>
              <li>Toggle <strong>Anonymous Telemetry</strong> to OFF.</li>
              <li>All outbound telemetry routines, IP lookups, and proxy pings cease immediately and permanently.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Outbound Connections Table */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            3. Outbound Network Connection Disclosures
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            PocketMC connects to external services only when you explicitly invoke specific features.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-divider bg-base-card">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-divider bg-base-muted">
                <th className="p-3 sm:p-4 font-bold text-main font-mono">Service &amp; Hostname</th>
                <th className="p-3 sm:p-4 font-bold text-main font-mono">Trigger Event</th>
                <th className="p-3 sm:p-4 font-bold text-main font-mono">Data Exchanged</th>
                <th className="p-3 sm:p-4 font-bold text-main font-mono">Security Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Adoptium &amp; GitHub API<br /><span className="text-[11px] text-main-muted font-normal">api.adoptium.net / github.com</span></td>
                <td className="p-3 sm:p-4 text-main-muted">Runtime installation or update check</td>
                <td className="p-3 sm:p-4 text-main-muted">Requested Java/PHP version, target OS architecture</td>
                <td className="p-3 sm:p-4 text-main-muted">HTTPS / TLS 1.3 with SHA-256 binary validation</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Modrinth &amp; CurseForge<br /><span className="text-[11px] text-main-muted font-normal">api.modrinth.com / api.curseforge.com</span></td>
                <td className="p-3 sm:p-4 text-main-muted">Browsing or installing mods, plugins, datapacks</td>
                <td className="p-3 sm:p-4 text-main-muted">Search query text, game version, loader type</td>
                <td className="p-3 sm:p-4 text-main-muted">HTTPS / TLS 1.3 with authenticated API keys</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Playit.gg API<br /><span className="text-[11px] text-main-muted font-normal">api.playit.gg</span></td>
                <td className="p-3 sm:p-4 text-main-muted">Provisioning or running public network tunnels</td>
                <td className="p-3 sm:p-4 text-main-muted">Tunnel claim token, local port allocation request</td>
                <td className="p-3 sm:p-4 text-main-muted">HTTPS / TLS 1.3 with stateless proxy token auth</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Cloud Storage APIs<br /><span className="text-[11px] text-main-muted font-normal">Google Drive / OneDrive / Dropbox</span></td>
                <td className="p-3 sm:p-4 text-main-muted">Scheduled or manual off-site backup upload</td>
                <td className="p-3 sm:p-4 text-main-muted">ZIP world archives sent directly to user cloud account</td>
                <td className="p-3 sm:p-4 text-main-muted">OAuth 2.0 PKCE with client-side DPAPI token store</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">AI Model Providers<br /><span className="text-[11px] text-main-muted font-normal">Gemini / OpenAI / Claude / Ollama</span></td>
                <td className="p-3 sm:p-4 text-main-muted">User clicking "Analyze Log with AI"</td>
                <td className="p-3 sm:p-4 text-main-muted">Regex-sanitized server crash logs</td>
                <td className="p-3 sm:p-4 text-main-muted">HTTPS to user endpoint or local HTTP loopback</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Inquiries Box */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Security Vulnerability Disclosures &amp; Inquiries
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          If you discover a security vulnerability or have questions regarding data privacy in PocketMC, please report it directly to our security maintainers at <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>. We acknowledge receipt within 48 hours and coordinate responsible disclosure fixes before public release.
        </p>
      </div>
    </div>
  );
}
