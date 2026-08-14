import { useState } from "react";
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-divider bg-base-card shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-divider bg-base-muted/30">
          <div>
            <h3 className="text-xl font-bold text-main tracking-tight">
              Download PocketMC
            </h3>
            <p className="text-xs text-main-muted mt-0.5">
              Select your platform for native installation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-divider bg-base-muted/50 text-main-muted hover:text-main hover:bg-base transition-colors cursor-pointer"
            aria-label="Close download modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex border-b border-divider bg-base/40 px-6 gap-2">
          <button
            onClick={() => setSelectedTab("windows")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer ${
              selectedTab === "windows"
                ? "border-accent text-accent"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <WindowsIcon className="w-4 h-4" />
            <span>Windows</span>
          </button>

          <button
            onClick={() => setSelectedTab("linux")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer ${
              selectedTab === "linux"
                ? "border-accent text-accent"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <LinuxIcon className="w-4 h-4" />
            <span>Linux</span>
          </button>

          <button
            onClick={() => setSelectedTab("mac")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 font-mono transition-colors cursor-pointer ${
              selectedTab === "mac"
                ? "border-accent text-accent"
                : "border-transparent text-main-muted hover:text-main"
            }`}
          >
            <AppleIcon className="w-4 h-4" />
            <span>macOS</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {selectedTab === "windows" && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-main text-base">Windows 10 & 11</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-accent/15 text-accent rounded border border-accent/30">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Installer with automatic Java/PHP runtime provisioning & background updates.
                  </p>
                </div>
                <a
                  href="https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe"
                  className="inline-flex h-10 px-5 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.02] flex-shrink-0 shadow-md"
                >
                  Download Setup.exe
                </a>
              </div>
            </div>
          )}

          {selectedTab === "linux" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-main text-sm">AppImage</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-accent/15 text-accent rounded border border-accent/30">
                      Portable
                    </span>
                  </div>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Standalone binary with zsync 1-click delta updates. Works on Ubuntu, Fedora, Arch & Debian.
                  </p>
                </div>
                <a
                  href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-linux-x64.AppImage"
                  className="inline-flex h-10 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.02]"
                >
                  Download AppImage
                </a>
              </div>

              <div className="p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-main text-sm">Flatpak & Tarball</h4>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Standard Flatpak package or standalone tar.gz archive for Linux desktop environments.
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
          )}

          {selectedTab === "mac" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-main text-sm">Apple Silicon (M1-M4)</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-accent/15 text-accent rounded border border-accent/30">
                      ARM64
                    </span>
                  </div>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Native ARM64 release compiled for M1, M2, M3, and M4 Macs.
                  </p>
                </div>
                <a
                  href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-arm64.zip"
                  className="inline-flex h-10 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs rounded-lg transition-transform hover:scale-[1.02]"
                >
                  Download for Apple Silicon
                </a>
              </div>

              <div className="p-5 rounded-xl border border-divider bg-base-muted/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-main text-sm">Intel Macs</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-base-card text-main-muted rounded border border-divider">
                      x86_64
                    </span>
                  </div>
                  <p className="text-xs text-main-muted mt-1 leading-relaxed">
                    Intel x64 zip archive release for Intel-based Macs.
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-divider bg-base-muted/30 flex items-center justify-between text-xs text-main-muted font-mono">
          <span>MIT Open Source</span>
          <a
            href="https://github.com/PocketMC"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent font-bold transition-colors"
          >
            View GitHub &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
