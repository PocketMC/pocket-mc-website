import { useState, useEffect } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";
import { SOCIAL_LINKS } from "../../data/socialLinks";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: "screenshots", label: "Screenshots", href: "#screenshots" },
  { id: "under-the-hood", label: "Under the Hood", href: "#under-the-hood" },
  { id: "comparison", label: "Comparison", href: "#comparison" },
  { id: "platforms", label: "Platforms", href: "#platforms" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["hero", "screenshots", "under-the-hood", "roadmap", "comparison", "platforms", "faq"];
      const scrollPosition = window.scrollY + 120; // Offset for header height

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            const normalizedId = id === "roadmap" ? "under-the-hood" : id;
            setActiveSection(normalizedId);

            const targetHash = normalizedId === "hero" ? "" : `#${normalizedId}`;
            if (window.location.hash !== targetHash && window.history.replaceState) {
              window.history.replaceState(null, "", targetHash || window.location.pathname);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Desktop ScrollSpy Nav Items */}
          <div className="hidden items-center gap-6 md:flex mr-1 font-mono text-xs sm:text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-accent font-bold"
                      : "text-main-muted hover:text-main"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full animate-fadeIn" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Social Brand Logos */}
          <div className="hidden md:flex items-center gap-2 border-l border-divider/60 pl-4">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title={item.name}
                  aria-label={item.name}
                  className={`p-2 text-main-muted ${item.textHoverColor} transition-all duration-200 hover:scale-110 rounded-md focus:outline-none`}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>
              );
            })}
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
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`py-2 border-b border-divider/50 transition-colors flex items-center justify-between ${
                  isActive ? "font-extrabold text-accent" : "font-bold text-main-muted hover:text-accent"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </a>
            );
          })}

          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-main-muted/60 mb-2">
              Community & Links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-2.5 p-2 rounded-md border border-divider/60 bg-base-muted/20 text-main-muted ${item.textHoverColor} transition-colors`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold text-xs">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
