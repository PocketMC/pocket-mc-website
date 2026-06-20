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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
    <main className="min-h-screen text-main theme-transition relative overflow-x-clip bg-grid z-0">

        {/* Decorative Glowing Ambient Orbs */}
        <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] rounded-full glow-orb opacity-70 pointer-events-none"></div>
        <div className="absolute top-[35%] right-[-200px] w-[600px] h-[600px] rounded-full glow-orb opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-100px] w-[450px] h-[450px] rounded-full glow-orb opacity-60 pointer-events-none"></div>

        <Header theme={theme} toggleTheme={toggleTheme} />

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

        <Footer />

        {/* Global Modals */}
        <LightboxModal
          lightboxData={lightboxData}
          onClose={() => setLightboxData(null)}
        />

        <ProofModal
          proofModalData={proofModalData}
          onClose={() => setProofModalData(null)}
        />

        {/* Floating Social/Support Buttons Overlay */}
        <div className="hidden sm:flex fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <a
            href="https://discord.gg/h27uNCaxPH"
            target="_blank"
            rel="noreferrer"
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
            rel="noreferrer"
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
    </main>
  );
}

export default App;
