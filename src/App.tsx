import { useState, useEffect } from "react";
import type { ProofModalData, LightboxData } from "./types";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import TourSection from "./components/sections/TourSection";
import SoftwaresSection from "./components/sections/SoftwaresSection";
import ComparisonSection from "./components/sections/ComparisonSection";
import StabilitySection from "./components/sections/StabilitySection";
import FaqSection from "./components/sections/FaqSection";
import CtaSection from "./components/sections/CtaSection";
import LightboxModal from "./components/ui/LightboxModal";
import ProofModal from "./components/ui/ProofModal";
import TextModal from "./components/ui/TextModal";

const TermsContent = (
  <>
    <p>
      Welcome to PocketMC. By using this website, downloading any PocketMC desktop application (Windows, Linux, or macOS), or utilizing any of its features, you agree to be bound by these Terms of Service.
    </p>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">1. MIT License & Open Source</h4>
      <p>
        The PocketMC desktop applications and website are open-source software distributed under the MIT License. You are free to view, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions of the MIT License, which requires retaining the copyright notice and permission notice in all copies or substantial portions of the software.
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
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">1. Local Storage & Platform Security Encryption</h4>
      <p>
        PocketMC keeps your server configuration files, world data, console logs, and metadata strictly on your local machine under your configured application directory. To protect your sensitive credentials (such as CurseForge API keys, Playit agent secrets, Cloud backup OAuth tokens, and AI API keys), PocketMC encrypts this information using native platform security frameworks: Windows DPAPI on Windows, Linux Secret Service (dbus) on Linux, and macOS Keychain Security framework on Apple macOS.
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
        <li><strong>adoptium.net & github.com:</strong> Direct HTTP calls are made to download matching JRE runtimes or PHP binaries to your local directory. Velopack / GitHub Releases checks for client updates directly.</li>
        <li><strong>api.modrinth.com & api.curseforge.com:</strong> Queries are sent directly to Modrinth or CurseForge to search and download game mods or plugins. CurseForge integrations utilize your private API key directly.</li>
        <li><strong>api.playit.gg:</strong> The Playit agent is downloaded from GitHub and verified for authentic digital signatures. Tunnels are configured directly using the Playit API. Account provisioning and partner keys are set up via a local loopback server and the Render proxy.</li>
        <li><strong>Cloud Backups:</strong> OneDrive and Dropbox integrations execute standard authentication flows locally. Google Drive uses a Render proxy to exchange and refresh OAuth tokens. Zip uploads are sent directly to the cloud providers' API endpoints.</li>
        <li><strong>AI Providers:</strong> Session log summarization queries are sent directly from the client to your chosen AI endpoint (Google Gemini, OpenAI, Claude, Mistral, Groq, or local Ollama).</li>
      </ul>
    </div>
    <div className="space-y-2">
      <h4 className="font-extrabold text-main font-mono text-xs uppercase tracking-wider mb-2">4. User Context & Diagnostic Logs</h4>
      <p>
        PocketMC runs under standard user accounts. It does not request administrative privileges unless you explicitly trigger UWP loopback exemptions for Bedrock Dedicated Servers on Windows, which prompts a standard Windows UAC dialog to execute <code>CheckNetIsolation.exe</code>.
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
    <div className="min-h-screen text-main relative z-0 bg-base">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="h-14 sm:h-16" aria-hidden="true" />

      <main className="overflow-x-clip">
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

        <StabilitySection isLoading={isLoading} />

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
    </div>
  );
}

export default App;
