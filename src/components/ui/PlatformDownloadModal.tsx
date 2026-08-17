import { useState } from "react";
import { createPortal } from "react-dom";
import { WindowsIcon, LinuxIcon, AppleIcon } from "./SocialIcons";

interface PlatformDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlatformDownloadModal({
  isOpen,
  onClose,
}: PlatformDownloadModalProps) {
  const [selectedTab, setSelectedTab] = useState<"windows" | "linux" | "mac">("windows");

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] rounded-2xl border border-divider bg-base-card shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-divider bg-base-muted/30 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-main tracking-tight">
              Download PocketMC
            </h3>
            <p className="text-[11px] sm:text-xs text-main-muted mt-0.5">
              Select your platform for native installation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-divider bg-base-muted/50 text-main-muted hover:text-main hover:bg-base transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close download modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Platform Selector Tabs - Touch Scrollable */}
        <div className="flex border-b border-divider bg-base/40 px-4 sm:px-6 gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedTab("windows")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer whitespace-nowrap ${
              selectedTab === "windows"
                ? "border-main text-main"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <WindowsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Windows</span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-base-muted text-main rounded border border-divider">
              Stable
            </span>
          </button>

          <button
            onClick={() => setSelectedTab("linux")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer whitespace-nowrap ${
              selectedTab === "linux"
                ? "border-main text-main"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <LinuxIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Linux</span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-base-muted text-main-muted rounded border border-divider">
              Beta
            </span>
          </button>

          <button
            onClick={() => setSelectedTab("mac")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer whitespace-nowrap ${
              selectedTab === "mac"
                ? "border-main text-main"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <AppleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>macOS</span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-base-muted text-main-muted rounded border border-divider">
              Beta
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 flex-1">
          {selectedTab === "windows" && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-main text-sm sm:text-base">Windows 10 & 11</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-base-muted text-main rounded border border-divider">
                      Full Release
                    </span>
                  </div>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Production WPF client featuring automatic Java/PHP runtime provisioning, mod marketplaces, and cloud backups.
                  </p>
                </div>
                <a
                  href="https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe"
                  className="inline-flex h-10 w-full sm:w-auto px-5 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.01] flex-shrink-0 shadow-sm"
                >
                  Download Setup.exe
                </a>
              </div>
            </div>
          )}

          {selectedTab === "linux" && (
            <div className="space-y-4">
              {/* Beta Disclaimer Banner */}
              <div className="p-3.5 rounded-lg border border-divider bg-base-muted/40 text-xs text-main-muted flex items-start gap-2.5">
                <span className="font-mono font-bold text-main px-1.5 py-0.5 rounded bg-base-card border border-divider text-[10px]">
                  BETA
                </span>
                <p className="leading-relaxed text-[11px]">
                  The Linux version is under active development and features a distinct UI built for Unix systems. Previews are available for testing.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-main text-sm">AppImage (Beta)</h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-base-muted text-main rounded border border-divider">
                        Portable
                      </span>
                    </div>
                    <p className="text-xs text-main-muted mt-1 leading-relaxed">
                      Standalone binary with zsync delta updates. Tested on Ubuntu, Fedora, Arch & Debian.
                    </p>
                  </div>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-linux-x64.AppImage"
                    className="inline-flex h-10 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.01]"
                  >
                    Download AppImage
                  </a>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-bold text-main text-sm">Flatpak & Source</h4>
                    <p className="text-xs text-main-muted mt-1 leading-relaxed">
                      Follow Linux UI development, open issues, or build the latest beta from source on GitHub.
                    </p>
                  </div>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center border border-divider bg-base hover:bg-base-muted text-main font-bold text-xs rounded-lg transition-colors"
                  >
                    View GitHub Releases
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "mac" && (
            <div className="space-y-4">
              {/* Beta Disclaimer Banner */}
              <div className="p-3.5 rounded-lg border border-divider bg-base-muted/40 text-xs text-main-muted flex items-start gap-2.5">
                <span className="font-mono font-bold text-main px-1.5 py-0.5 rounded bg-base-card border border-divider text-[10px]">
                  BETA
                </span>
                <p className="leading-relaxed text-[11px]">
                  The macOS client has a distinct interface tailored for macOS and is currently in active development.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-main text-sm">Apple Silicon (Beta)</h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-base-muted text-main rounded border border-divider">
                        M1 - M4
                      </span>
                    </div>
                    <p className="text-xs text-main-muted mt-1 leading-relaxed">
                      Native ARM64 beta release compiled for Apple Silicon Macs.
                    </p>
                  </div>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-arm64.zip"
                    className="inline-flex h-10 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.01]"
                  >
                    Download for Apple Silicon
                  </a>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-main text-sm">Intel Macs (Beta)</h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-base-muted text-main-muted rounded border border-divider">
                        x86_64
                      </span>
                    </div>
                    <p className="text-xs text-main-muted mt-1 leading-relaxed">
                      Intel x64 beta zip archive release for Intel-based Macs.
                    </p>
                  </div>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-x64.zip"
                    className="inline-flex h-10 items-center justify-center border border-divider bg-base hover:bg-base-muted text-main font-bold text-xs rounded-lg transition-colors"
                  >
                    Download for Intel Mac
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-divider bg-base-muted/30 flex items-center justify-between text-xs text-main-muted font-mono">
          <span>MIT Open Source</span>
          <a
            href="https://github.com/PocketMC"
            target="_blank"
            rel="noreferrer"
            className="hover:text-main font-bold transition-colors"
          >
            View GitHub &rarr;
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
