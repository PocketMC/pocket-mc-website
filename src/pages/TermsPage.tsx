import { motion } from "motion/react";

interface TermsPageProps {
  navigate?: (path: string) => void;
}

export default function TermsPage(_props: TermsPageProps) {
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
          Terms of Service
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          Clear, transparent terms governing your use of the PocketMC desktop client, source code repositories, and documentation website. PocketMC is distributed as free, open-source software under the permissive terms of the MIT License.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 p-4 sm:p-5 rounded-xl border border-divider bg-base-card font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">License Type</span>
            <span className="text-xs sm:text-sm font-bold text-main">MIT Permissive FOSS</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Hosting Model</span>
            <span className="text-xs sm:text-sm font-bold text-main">100% Self-Hosted</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Commercial Use</span>
            <span className="text-xs sm:text-sm font-bold text-main">Permitted (EULA Compliant)</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Warranty</span>
            <span className="text-xs sm:text-sm font-bold text-main">Provided &quot;As Is&quot;</span>
          </div>
        </div>
      </motion.div>

      {/* 1. MIT License Grant */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            1. MIT License &amp; Open Source Software Grant
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Full grant of rights under the open-source MIT License.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
          The PocketMC desktop client and showcase website are open-source software distributed under the terms of the MIT License. You are free to view, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to retaining the original copyright notice:
        </p>

        <div className="p-5 sm:p-6 rounded-xl border border-divider bg-base-muted font-mono text-xs text-main leading-relaxed mb-6">
          Copyright (c) 2026 PocketMC Contributors<br /><br />
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the &quot;Software&quot;), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:<br /><br />
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
        </div>
      </div>

      {/* 2. Warranty Disclaimer */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            2. As-Is Provision &amp; Warranty Disclaimer
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            PocketMC is provided free of charge without implied guarantees.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main font-mono text-xs text-main leading-relaxed mb-4">
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </div>
      </div>

      {/* 3. Server Admin Responsibilities */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            3. Local Hosting &amp; Server Administration Responsibilities
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            PocketMC is a local environment manager, not a commercial hosting provider.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
                Compute &amp; System Maintenance
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                PocketMC does not supply server hardware, cloud VMs, or remote CPU capacity. You are solely responsible for:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>System memory allocation, cooling, and hardware stability.</li>
              <li>Operating system security updates and antivirus exclusions.</li>
              <li>Maintaining adequate disk storage for world backups and logs.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
                Port Forwarding &amp; Player Access
              </h3>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                You retain full administrative control over network ingress and player permissions:
              </p>
            </div>
            <ul className="text-xs text-main-muted space-y-1.5 list-disc pl-4">
              <li>Safeguarding server whitelist settings and OP permissions.</li>
              <li>Managing who is provided access to your public Playit.gg tunnel URLs.</li>
              <li>Configuring local router firewall rules when using UPnP port mapping.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Limitation of Liability */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Legal Inquiries &amp; Contributor Licensing
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          For legal notices, open-source compliance questions, or contributor licensing inquiries, please contact our core project desk directly at <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
