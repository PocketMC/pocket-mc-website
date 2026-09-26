import { motion } from "motion/react";

interface ContactPageProps {
  navigate?: (path: string) => void;
}

export default function ContactPage(_props: ContactPageProps) {
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
          Contact PocketMC
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          Reach out directly to the core maintainers, join our active community Discord server, report bugs via GitHub issues, or coordinate responsible security vulnerability disclosures.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 p-4 sm:p-5 rounded-xl border border-divider bg-base-card font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Official Email</span>
            <span className="text-xs sm:text-sm font-bold text-main truncate">contactdslabs@gmail.com</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Community</span>
            <span className="text-xs sm:text-sm font-bold text-main">Discord Server</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Bug Tracker</span>
            <span className="text-xs sm:text-sm font-bold text-main">GitHub Issues</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Security SLA</span>
            <span className="text-xs sm:text-sm font-bold text-main">&lt; 48 Hours</span>
          </div>
        </div>
      </motion.div>

      {/* Main Channels Grid */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Primary Communication Channels
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Select the most appropriate channel for your inquiry to ensure a prompt response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Official Email */}
          <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                Direct Official Email
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Our sole official project email for general inquiries, press, partnership proposals, and contributor coordination.
              </p>
              <div className="font-mono text-xs p-2.5 rounded bg-base-muted text-main font-semibold border border-divider mb-4 break-all">
                contactdslabs@gmail.com
              </div>
            </div>
            <a
              href="mailto:contactdslabs@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-main text-base text-xs font-bold font-mono hover:opacity-90 transition-opacity"
            >
              Compose Email
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Card 2: Discord Server */}
          <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                PocketMC Discord
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Join our active Discord community to chat with other server operators, request help, share feedback, and discuss upcoming features.
              </p>
              <ul className="text-xs text-main-muted space-y-1.5 mb-4 list-disc pl-4">
                <li>Interactive server troubleshooting channels</li>
                <li>Community mod and plugin recommendations</li>
                <li>Release announcement pings and alpha testing</li>
              </ul>
            </div>
            <a
              href="https://discord.gg/mWdMr8Mc2m"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-divider bg-base-card text-main text-xs font-bold font-mono hover:border-main transition-colors"
            >
              Join Discord Server
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Card 3: GitHub Issues */}
          <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group">
            <div>
              <h3 className="text-lg font-bold text-main tracking-tight mb-2">
                GitHub Issue Tracker
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Report reproducible software bugs, submit pull requests, or propose technical architecture enhancements directly on GitHub.
              </p>
              <ul className="text-xs text-main-muted space-y-1.5 mb-4 list-disc pl-4">
                <li>Public transparent issue triage</li>
                <li>Open-source contribution pull requests</li>
                <li>Release notes and changelog history</li>
              </ul>
            </div>
            <a
              href="https://github.com/PocketMC/pocket-mc-windows/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-divider bg-base-card text-main text-xs font-bold font-mono hover:border-main transition-colors"
            >
              Open GitHub Issues
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bug Report Guidance & Security Disclosure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Bug Report Guide */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
            Reporting a Bug Effectively
          </h3>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            To help our team diagnose and fix issues quickly, please ensure your report includes the following details:
          </p>
          <ul className="space-y-2 text-xs text-main-muted font-mono">
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">01.</span>
              <span><strong>PocketMC Version:</strong> The exact version shown in App Settings &gt; About.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">02.</span>
              <span><strong>Windows Environment:</strong> OS build (e.g., Windows 11 23H2 or Windows 10 22H2).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">03.</span>
              <span><strong>Server Software &amp; Version:</strong> Paper, Fabric, Purpur, BDS, or PocketMine-MP.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">04.</span>
              <span><strong>Reproduction Steps:</strong> Specific sequential actions that trigger the unexpected state.</span>
            </li>
          </ul>
        </div>

        {/* Security Disclosures */}
        <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
              Security Vulnerability Disclosure
            </h3>
            <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
              We take the security of PocketMC and user environments seriously. If you identify a security flaw or token exposure vulnerability:
            </p>
            <ul className="text-xs text-main-muted space-y-2 leading-relaxed mb-4 list-disc pl-4">
              <li>Do not open public GitHub issues for critical vulnerabilities.</li>
              <li>Email full reproduction details directly to <strong className="text-main font-mono">contactdslabs@gmail.com</strong>.</li>
              <li>We will acknowledge receipt within 48 hours and work with you on a patch before public disclosure.</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-divider bg-base-muted text-[11px] font-mono text-main-muted">
            PGP and encrypted disclosure details available upon email request.
          </div>
        </div>
      </div>
    </div>
  );
}
