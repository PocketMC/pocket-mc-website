import { motion } from "motion/react";

interface ContactPageProps {
  navigate?: (path: string) => void;
}

export default function ContactPage(_props: ContactPageProps) {
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
          Contact PocketMC
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          Connect with the core team, join the community for live support, or report technical issues and security vulnerabilities.
        </p>
      </motion.div>

      {/* Primary Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {/* Email */}
        <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors">
          <div>
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Official Email
            </h3>
            <p className="text-sm text-main-muted leading-relaxed mb-4">
              General inquiries, partnerships, and private security disclosure notifications.
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

        {/* Discord */}
        <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors">
          <div>
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              Community Discord
            </h3>
            <p className="text-sm text-main-muted leading-relaxed mb-4">
              Server troubleshooting, community mod discussions, and release announcements.
            </p>
            <div className="font-mono text-xs p-2.5 rounded bg-base-muted text-main font-semibold border border-divider mb-4 break-all">
              discord.gg/mWdMr8Mc2m
            </div>
          </div>
          <a
            href="https://discord.gg/mWdMr8Mc2m"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-divider bg-base-card text-main text-xs font-bold font-mono hover:border-main transition-colors"
          >
            Join Discord
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* GitHub */}
        <div className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors">
          <div>
            <h3 className="text-lg font-bold text-main tracking-tight mb-2">
              GitHub Issues
            </h3>
            <p className="text-sm text-main-muted leading-relaxed mb-4">
              Bug reports, feature suggestions, architecture proposals, and code contributions.
            </p>
            <div className="font-mono text-xs p-2.5 rounded bg-base-muted text-main font-semibold border border-divider mb-4 break-all">
              github.com/PocketMC
            </div>
          </div>
          <a
            href="https://github.com/PocketMC/pocket-mc-windows/issues"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-divider bg-base-card text-main text-xs font-bold font-mono hover:border-main transition-colors"
          >
            Open Issues
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
            Bug Reporting Checklist
          </h3>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Include the following in your issue report to speed up diagnosis:
          </p>
          <ul className="space-y-2 text-xs text-main-muted font-mono">
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">1.</span>
              <span>PocketMC client version (found in Settings &gt; About).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">2.</span>
              <span>Host operating system (e.g. Windows 11 23H2).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">3.</span>
              <span>Server software engine and version (Paper, Fabric, Purpur, BDS, PocketMine).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main font-bold">4.</span>
              <span>Step-by-step reproduction sequence and relevant console logs.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
              Security Disclosures
            </h3>
            <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
              To responsibly disclose a vulnerability or sensitive token exposure:
            </p>
            <ul className="text-xs text-main-muted space-y-2 leading-relaxed list-disc pl-4 mb-4">
              <li>Report privately via email rather than public issue trackers.</li>
              <li>Include reproduction proof-of-concept steps or affected endpoints.</li>
              <li>Our security team acknowledges reports within 48 hours.</li>
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
