import { useState } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-base/85 backdrop-blur-md theme-transition">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a
          href="#"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
        >
          <img
            src={getAssetUrl("/logo.webp")}
            alt="PocketMC Logo"
            className="h-8 sm:h-9 w-8 sm:w-9 object-contain rounded transition-transform group-hover:scale-105 duration-300"
            width="36"
            height="36"
          />
          <div className="flex flex-col">
            <p className="font-black leading-none tracking-[-0.02em] text-main text-sm">
              PocketMC
            </p>
            <p className="hidden sm:block mt-1 text-xs text-main-muted font-mono">
              Local server management
            </p>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-6 sm:gap-8 md:flex mr-2 font-mono text-xs sm:text-sm">
            <a
              href="#screenshots"
              className="font-semibold text-main-muted hover:text-accent transition-colors"
            >
              Screenshots
            </a>
            <a
              href="#roadmap"
              className="font-semibold text-main-muted hover:text-accent transition-colors"
            >
              Under the Hood
            </a>
            <a
              href="https://github.com/PocketMC/pocket-mc-windows"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-main-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/h27uNCaxPH"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-main-muted hover:text-[#5865F2] transition-colors"
            >
              Discord
            </a>
            <a
              href="https://www.reddit.com/r/PocketMC/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-main-muted hover:text-[#FF4500] transition-colors"
            >
              Reddit
            </a>
            <a
              href="https://www.youtube.com/@OfficialPocketMC"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-main-muted hover:text-[#FF0000] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.buymeacoffee.com/sahaj33"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-main-muted hover:text-[#FF813F] transition-colors"
            >
              Buy Me a Coffee
            </a>
          </div>

          {/* Sun/Moon Animated Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-divider bg-base-muted/40 text-main hover:bg-base hover:text-accent hover:border-accent/40 shadow-sm transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle light/dark theme"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {/* Sun Icon */}
            <svg
              className={`absolute h-5 w-5 transition-all duration-300 transform ${
                theme === "dark"
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>

            {/* Moon Icon */}
            <svg
              className={`absolute h-5 w-5 transition-all duration-300 transform ${
                theme === "dark"
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          {/* Hamburger Menu Button (mobile only) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative grid h-10 w-10 place-items-center rounded-full border border-divider bg-base-muted/40 text-main hover:bg-base hover:text-accent hover:border-accent/40 shadow-sm transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-divider bg-base/95 backdrop-blur-lg px-4 py-5 flex flex-col gap-3.5 font-mono text-xs shadow-inner">
          <a
            href="#screenshots"
            onClick={closeMobileMenu}
            className="font-bold text-main-muted hover:text-accent py-2 border-b border-divider/50 transition-colors"
          >
            Screenshots
          </a>
          <a
            href="#roadmap"
            onClick={closeMobileMenu}
            className="font-bold text-main-muted hover:text-accent py-2 border-b border-divider/50 transition-colors"
          >
            Under the Hood
          </a>
          <a
            href="https://github.com/PocketMC/pocket-mc-windows"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileMenu}
            className="font-semibold text-main-muted hover:text-accent py-2 border-b border-divider/50 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/h27uNCaxPH"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileMenu}
            className="font-semibold text-main-muted hover:text-[#5865F2] py-2 border-b border-divider/50 transition-colors"
          >
            Discord
          </a>
          <a
            href="https://www.reddit.com/r/PocketMC/"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileMenu}
            className="font-semibold text-main-muted hover:text-[#FF4500] py-2 border-b border-divider/50 transition-colors"
          >
            Reddit
          </a>
          <a
            href="https://www.youtube.com/@OfficialPocketMC"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileMenu}
            className="font-semibold text-main-muted hover:text-[#FF0000] py-2 border-b border-divider/50 transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://www.buymeacoffee.com/sahaj33"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileMenu}
            className="font-semibold text-main-muted hover:text-[#FF813F] py-2 transition-colors"
          >
            Buy Me a Coffee
          </a>
        </div>
      )}
    </header>
  );
}
