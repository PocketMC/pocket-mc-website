import { motion } from "motion/react";

interface TermsPageProps {
  navigate?: (path: string) => void;
}

export default function TermsPage(_props: TermsPageProps) {
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
          Terms of Service
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          PocketMC is free, open-source software provided under the permissive terms of the MIT License.
        </p>
      </motion.div>

      {/* MIT License */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            MIT License
          </h2>
        </div>

        <div className="p-5 sm:p-6 rounded-xl border border-divider bg-base-muted font-mono text-xs text-main leading-relaxed">
          Copyright (c) 2026 PocketMC Contributors<br /><br />
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the &quot;Software&quot;), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:<br /><br />
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.<br /><br />
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </div>
      </div>

      {/* Hosting & Administration Responsibilities */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Self-Hosting Scope &amp; Responsibilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
              Hardware &amp; System Maintenance
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              PocketMC is a local process manager, not a commercial hosting provider. You are responsible for your own computer hardware, memory allocation, storage capacity, cooling, and operating system updates.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-divider bg-base-card">
            <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mb-2">
              Network Access &amp; EULA Compliance
            </h3>
            <p className="text-sm text-main-muted leading-relaxed">
              You maintain full administrative control over player permissions, port forwarding, and tunnel access. Server operations must comply with Mojang's Minecraft End User License Agreement (EULA).
            </p>
          </div>
        </div>
      </div>

      {/* Legal Inquiries */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Legal &amp; Compliance Inquiries
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          For licensing questions or contributor notices, contact our project desk at <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
