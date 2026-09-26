import { motion } from "motion/react";

interface PrivacyPageProps {
  navigate?: (path: string) => void;
}

export default function PrivacyPage(_props: PrivacyPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-4">
          Privacy &amp; Security
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          PocketMC operates under a strict local-first philosophy. Your server files, worlds, credentials, and settings live on your own hardware, never on remote commercial servers.
        </p>
      </motion.div>

      {/* 1. Storage & Encryption */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Storage &amp; Encryption
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Local Storage
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              All world saves, configuration files, console logs, and player records are kept exclusively on your local disk. No cloud sync takes place unless you explicitly link a provider.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              OS-Native Keychains
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              Sensitive credentials, Playit tunnel secrets, and OAuth refresh tokens are encrypted at rest using Windows DPAPI, Linux Secret Service, or macOS Keychain.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Direct Cloud Backups
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              When enabled, backups transfer directly between your machine and Google Drive, OneDrive, or Dropbox. No intermediary PocketMC server intercepts your files.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Telemetry */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Telemetry &amp; Analytics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Anonymous Health Metrics
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              To measure reliability and engine stability, PocketMC collects an anonymous client UUID, app version, server engine type, and approximate country.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Zero Personal Data
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              We never collect or store user real names, email addresses, player gamertags, in-game chat logs, world saves, or hardware serial numbers.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              One-Click Opt-Out
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              Telemetry is optional. You can disable all telemetry reporting at any time via Settings &gt; Telemetry. Outbound reporting stops immediately.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Outbound Connections */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            External Network Connections
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            PocketMC only connects to external endpoints upon user-initiated actions.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-divider bg-base-card">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-divider bg-base-muted font-mono">
                <th className="p-3 sm:p-4 font-bold text-main">Service</th>
                <th className="p-3 sm:p-4 font-bold text-main">Trigger</th>
                <th className="p-3 sm:p-4 font-bold text-main">Data Transferred</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Adoptium / GitHub</td>
                <td className="p-3 sm:p-4 text-main-muted">Java runtime installation or update check</td>
                <td className="p-3 sm:p-4 text-main-muted">Requested Java/PHP version and architecture</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Modrinth / CurseForge</td>
                <td className="p-3 sm:p-4 text-main-muted">Browsing or downloading mods and plugins</td>
                <td className="p-3 sm:p-4 text-main-muted">Search query and loader type</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Playit.gg</td>
                <td className="p-3 sm:p-4 text-main-muted">Setting up public tunnel access</td>
                <td className="p-3 sm:p-4 text-main-muted">Tunnel claim token and local port allocation</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">Cloud Storage APIs</td>
                <td className="p-3 sm:p-4 text-main-muted">Off-site backup synchronization</td>
                <td className="p-3 sm:p-4 text-main-muted">Encrypted ZIP world archives directly to user account</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-mono font-semibold text-main">AI Providers (Optional)</td>
                <td className="p-3 sm:p-4 text-main-muted">Invoking "Analyze Log with AI"</td>
                <td className="p-3 sm:p-4 text-main-muted">Sanitized crash logs (passwords and tokens redacted)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Note */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Security &amp; Privacy Questions
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          Questions or security vulnerability disclosures should be directed to <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
