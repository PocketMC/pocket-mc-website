import { motion } from "motion/react";

interface AboutPageProps {
  navigate?: (path: string) => void;
}

export default function AboutPage(_props: AboutPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-divider bg-base-muted text-[11px] font-mono font-bold tracking-wider uppercase text-main-muted mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-main" />
          Open-Source Architecture &amp; Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-4">
          About PocketMC
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          PocketMC was engineered to eliminate the friction, fragility, and complexity of hosting Minecraft servers. Built as a native Windows desktop client with a strictly local-first philosophy, complete data sovereignty, and zero terminal prerequisites.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 p-4 sm:p-5 rounded-xl border border-divider bg-base-card font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Architecture</span>
            <span className="text-xs sm:text-sm font-bold text-main">100% Local-First</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">License</span>
            <span className="text-xs sm:text-sm font-bold text-main">MIT Permissive</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Runtimes</span>
            <span className="text-xs sm:text-sm font-bold text-main">Java, BDS &amp; PHP</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Backups</span>
            <span className="text-xs sm:text-sm font-bold text-main">Direct Cloud Sync</span>
          </div>
        </div>
      </motion.div>

      {/* Core Principles */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Core Engineering Principles
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            The architectural foundation that guides every feature in the PocketMC ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-base-muted text-main-muted mb-3">
                SOVEREIGNTY
              </span>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                100% Local-First Control
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Your game saves, player inventories, plugin settings, and world archives live exclusively on your local storage drive. PocketMC never locks your data behind proprietary cloud silos.
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Direct disk filesystem access</li>
              <li>Zero vendor lock-in or proprietary formats</li>
              <li>Complete offline functionality</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-base-muted text-main-muted mb-3">
                CRYPTOGRAPHY
              </span>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Hardware-Backed Security
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Sensitive API keys, Playit tunnel secrets, and cloud OAuth refresh tokens are encrypted at rest using Windows Data Protection API (DPAPI) and platform keychains.
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Windows DPAPI SID-bound encryption</li>
              <li>Zero plaintext credential storage on disk</li>
              <li>Regex automated redaction on diagnostic exports</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-base-muted text-main-muted mb-3">
                ORCHESTRATION
              </span>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Zero Terminal Complexity
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Automated JRE provisioning (Adoptium OpenJDK 8 through 25), PocketMine PHP runtime isolation, one-click modpack installation, and background tunnel management.
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Integrated Modrinth and CurseForge browser</li>
              <li>RCON-synchronized cloud backups</li>
              <li>Integrated AI log analysis and crash diagnosis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Maintainers Section */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Project Leadership &amp; Contributors
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            PocketMC is an open-source initiative governed by passionate developers and Minecraft community contributors.
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
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-base-muted text-main-muted">Core Maintainer</span>
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
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-base-muted text-main-muted">Core Maintainer</span>
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
