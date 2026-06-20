import { useState, useEffect } from "react";
import type { ProofModalData, LightboxData } from "./types";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import TourSection from "./components/sections/TourSection";
import SoftwaresSection from "./components/sections/SoftwaresSection";
import ComparisonSection from "./components/sections/ComparisonSection";
import FaqSection from "./components/sections/FaqSection";
import CtaSection from "./components/sections/CtaSection";
import LightboxModal from "./components/ui/LightboxModal";
import ProofModal from "./components/ui/ProofModal";
import TextModal from "./components/ui/TextModal";

const TermsContent = (
  <>
    <p>
      Welcome to PocketMC. By using this website, downloading the PocketMC desktop application, or utilizing any of its features, you agree to be bound by these Terms of Service.
    </p>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">1. MIT License & Open Source</h4>
      <p>
        The PocketMC desktop client and website are open-source software distributed under the MIT License. You are free to view, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions of the MIT License, which requires retaining the copyright notice and permission notice in all copies or substantial portions of the software.
      </p>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">2. As-Is Provision & Disclaimer</h4>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">3. Local Hosting & Server Management</h4>
      <p>
        PocketMC is a local environment manager. It does not provide server hardware, VPS hosting, virtual servers, or cloud infrastructure. You are fully responsible for your own computer hardware, local network security, internet service fees, data consumption, electricity consumption, and security configuration of any server instances you host.
      </p>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">4. Third-Party Services & Integrations</h4>
      <p>
        PocketMC facilitates optional connections to third-party services, including Eclipse Adoptium (for Java runtimes), GitHub (for PocketMine PHP runtimes and update downloads), Modrinth and CurseForge (for mod/plugin search and downloads), Playit.gg (for network tunneling), Google Drive, OneDrive, and Dropbox (for cloud backup storage), Discord (for local RPC and optional account linking), and AI Providers (Google Gemini, OpenAI, Anthropic Claude, Mistral, Groq, and Ollama) for server log summarization. Your use of these integrations is governed entirely by their respective Terms of Service and Privacy Policies. PocketMC is not responsible for their availability, security, or changes in their API structures.
      </p>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">5. Limitation of Liability</h4>
      <p>
        Under no circumstances shall the developers or contributors of PocketMC be liable for any direct, indirect, incidental, or consequential damages, including but not limited to server downtime, game data loss, hardware overheating, unauthorized local network access, third-party hosting charges, or service suspensions resulting from your use of this software or its integrations.
      </p>
    </div>
  </>
);

const PrivacyContent = (
  <>
    <p>
      PocketMC is designed with a <strong>local-first</strong> architecture. Your privacy and local environment security are our core principles. This policy explains how your data is managed and under what conditions outbound network requests are made.
    </p>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">1. Local Storage & DPAPI Encryption</h4>
      <p>
        PocketMC keeps your server configuration files, world data, console logs, and metadata strictly on your local machine under your configured application directory. To protect your sensitive credentials (such as CurseForge API keys, Playit agent secrets, Cloud backup OAuth tokens, and AI API keys), PocketMC encrypts this information using the Windows Data Protection API (DPAPI) bound to your local Windows user account (DataProtectionScope.CurrentUser). These values are decrypted in memory only when active network requests are initiated, and plain-text buffers are immediately zeroed out of memory to prevent scraping.
      </p>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">2. Telemetry and Opt-Out</h4>
      <p>
        To help improve application stability, PocketMC includes an optional telemetry reporting system:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
        <li><strong>Country Lookup:</strong> Once per startup, if telemetry is active, the app queries <code>http://ip-api.com</code> to resolve your approximate country location.</li>
        <li><strong>Aggregated Stats:</strong> Telemetry reports are sent to the secure Render proxy server (<code>pocket-mc-proxy.onrender.com</code>). They include an anonymous client UUID (generated locally), your app version, country code, and count/types of active running servers (e.g. Paper, Fabric, BDS).</li>
        <li><strong>Public Stats Endpoint:</strong> The proxy server aggregates this data to expose real-time metrics (like active user counts and server distributions) on a public statistics endpoint. No personal identifiers, IP addresses, client UUIDs, or folder locations are ever exposed.</li>
        <li><strong>Opt-Out:</strong> You can completely disable telemetry at any time in the app settings, which halts all country lookups and periodic reporting loops.</li>
      </ul>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">3. Outbound Network & Third-Party Connections</h4>
      <p>
        The desktop client communicates directly with external servers only to support the features you interact with:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
        <li><strong>adoptium.net & github.com:</strong> Direct HTTP calls are made to download matching JRE runtimes or PHP binaries to your local directory. Velopack checks for client updates directly via GitHub Releases.</li>
        <li><strong>api.modrinth.com & api.curseforge.com:</strong> Queries are sent directly to Modrinth or CurseForge to search and download game mods or plugins. CurseForge integrations utilize your private API key directly.</li>
        <li><strong>api.playit.gg:</strong> The Playit agent is downloaded from GitHub and verified for authentic digital signatures. Tunnels are configured directly using the Playit API. Account provisioning and partner keys are set up via a local loopback server and the Render proxy.</li>
        <li><strong>Cloud Backups:</strong> OneDrive and Dropbox integrations execute standard authentication flows locally. Google Drive uses a Render proxy to exchange and refresh OAuth tokens. Zip uploads are sent directly to the cloud providers' API endpoints.</li>
        <li><strong>AI Providers:</strong> Session log summarization queries are sent directly from the client to your chosen AI endpoint (Google Gemini, OpenAI, Claude, Mistral, Groq, or local Ollama).</li>
      </ul>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">4. User Context & Diagnostic Logs</h4>
      <p>
        PocketMC runs under your standard Windows user account (<code>asInvoker</code>). It does not request administrative privileges unless you explicitly trigger UWP loopback exemptions for Bedrock Dedicated Servers, which prompts a standard Windows UAC dialog to execute <code>CheckNetIsolation.exe</code>.
      </p>
      <p>
        If you generate a support diagnostics bundle, it is compiled as a local ZIP file on your machine and is never uploaded automatically. PocketMC automatically redacts passwords (such as RCON credentials) from server configuration files before compiling the bundle.
      </p>
    </div>
  </>
);

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [proofModalData, setProofModalData] = useState<ProofModalData | null>(null);
  const [isLoading] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen text-main theme-transition relative overflow-x-clip z-0 bg-base">

        {/* Decorative Glowing Ambient Orbs */}
        <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] rounded-full glow-orb opacity-70 pointer-events-none"></div>
        <div className="absolute top-[35%] right-[-200px] w-[600px] h-[600px] rounded-full glow-orb opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-100px] w-[450px] h-[450px] rounded-full glow-orb opacity-60 pointer-events-none"></div>

        <Header theme={theme} toggleTheme={toggleTheme} />

        <main>
          <HeroSection />

          <TourSection
            isLoading={isLoading}
            onOpenLightbox={(data) => setLightboxData(data)}
          />

          <SoftwaresSection isLoading={isLoading} />

          <ComparisonSection
            isLoading={isLoading}
            onOpenProofModal={(data) => setProofModalData(data)}
          />

          <FaqSection />

          <CtaSection />
        </main>

        <Footer
          onOpenTerms={() => setIsTermsOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />

        {/* Global Modals */}
        <LightboxModal
          lightboxData={lightboxData}
          onClose={() => setLightboxData(null)}
        />

        <ProofModal
          proofModalData={proofModalData}
          onClose={() => setProofModalData(null)}
        />

        <TextModal
          isOpen={isTermsOpen}
          title="Terms of Service"
          onClose={() => setIsTermsOpen(false)}
        >
          {TermsContent}
        </TextModal>

        <TextModal
          isOpen={isPrivacyOpen}
          title="Privacy & Security"
          onClose={() => setIsPrivacyOpen(false)}
        >
          {PrivacyContent}
        </TextModal>

        {/* Floating Social/Support Buttons Overlay */}
        <div className="hidden sm:flex fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <a
            href="https://discord.gg/h27uNCaxPH"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#5865F2] text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 group cursor-pointer flex-shrink-0"
            title="Join the Discord Community"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
            </svg>
          </a>

          <a
            href="https://www.buymeacoffee.com/sahaj33"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-[#FFDD00] text-black font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-black/5 group cursor-pointer whitespace-nowrap flex-shrink-0"
            title="Support the Project on Buy Me a Coffee"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current group-hover:rotate-12 transition-transform flex-shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M2 21h18v-2H2v2zM20 8h-2V5h2v3zm2-5h-4v7h4V3zm-6 2H4v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5z" />
            </svg>
            <span className="hidden sm:inline">Buy me a coffee</span>
          </a>
        </div>
    </div>
  );
}

export default App;
