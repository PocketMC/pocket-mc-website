import { getAssetUrl } from "../../utils/getAssetUrl";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-base/85 backdrop-blur-md theme-transition">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
        >
          <img
            src={getAssetUrl("/logo.webp")}
            alt="PocketMC Logo"
            className="h-8 sm:h-9 w-8 sm:w-9 object-contain rounded transition-transform group-hover:scale-105 duration-300"
            width="36"
            height="36"
          />
          <div className="hidden sm:block">
            <p className="font-black leading-none tracking-[-0.02em] text-main text-sm">
              PocketMC
            </p>
            <p className="mt-1 text-xs text-main-muted font-mono">
              Local server management
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
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
        </div>
      </nav>
    </header>
  );
}
