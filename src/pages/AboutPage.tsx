import { motion } from "motion/react";

interface AboutPageProps {
  navigate?: (path: string) => void;
}

export default function AboutPage(_props: AboutPageProps) {
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
          About PocketMC
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          A local-first Minecraft server manager engineered to eliminate terminal complexity, safeguard data sovereignty, and automate runtime operations on your own hardware.
        </p>
      </motion.div>

      {/* Core Pillars */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Architecture &amp; Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Data Sovereignty
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              Your server files, worlds, and settings live exclusively on your local storage drive. PocketMC never locks your data behind cloud silos or proprietary formats.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Hardware Security
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              Credentials, API keys, and tunnel secrets are encrypted at rest using OS-native keychains (Windows DPAPI, Linux Secret Service, macOS Keychain).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Automated Operations
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              Automated Java runtime provisioning, one-click modpack installation, background network tunneling, and RCON-synchronized cloud backups without console hassle.
            </p>
          </div>
        </div>
      </div>

      {/* Maintainers */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Project Maintainers
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Governed by passionate developers and Minecraft community contributors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card flex items-start gap-4">
            <img
              src="https://github.com/sizwinz.png"
              alt="sizwinz GitHub Avatar"
              className="w-12 h-12 rounded-xl border border-divider object-cover flex-shrink-0 bg-base-muted"
              width="48"
              height="48"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-main tracking-tight">sizwinz</h3>
                <span className="text-xs text-main-muted">Core Maintainer</span>
              </div>
              <p className="text-xs text-main-muted leading-relaxed mt-1 mb-3">
                Architect of the .NET Windows desktop client, process management supervisors, and native platform integration.
              </p>
              <a
                href="https://github.com/sizwinz"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-main font-bold hover:underline inline-flex items-center gap-1"
              >
                github.com/sizwinz
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex items-start gap-4">
            <img
              src="https://github.com/divyviradiya2.png"
              alt="divyviradiya2 GitHub Avatar"
              className="w-12 h-12 rounded-xl border border-divider object-cover flex-shrink-0 bg-base-muted"
              width="48"
              height="48"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-main tracking-tight">divyviradiya2</h3>
                <span className="text-xs text-main-muted">Core Maintainer</span>
              </div>
              <p className="text-xs text-main-muted leading-relaxed mt-1 mb-3">
                Lead architect for proxy services, developer ecosystem APIs, cloud synchronization pipelines, and web experiences.
              </p>
              <a
                href="https://github.com/divyviradiya2"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-main font-bold hover:underline inline-flex items-center gap-1"
              >
                github.com/divyviradiya2
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
