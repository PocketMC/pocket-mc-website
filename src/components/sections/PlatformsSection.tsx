import { useState } from "react";
import { WindowsIcon, LinuxIcon, AppleIcon } from "../ui/SocialIcons";

export default function PlatformsSection() {
  const [activeTab, setActiveTab] = useState<"windows" | "linux" | "mac">("windows");

  return (
    <section id="platforms" className="relative z-10 border-t border-divider bg-base-muted/30 py-20 sm:py-28 isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-card px-3 py-1 rounded border border-divider">
            Supported Operating Systems
          </span>
          <h2 className="mt-4 text-3xl font-black sm:text-5xl tracking-[-0.04em] text-main">
            Native Desktop Apps for <br />
            <span className="text-accent italic">Windows, Linux & macOS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-main-muted">
            PocketMC runs locally on your machine with native desktop performance.
          </p>
        </div>

        {/* Operating System Selector Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl border border-divider bg-base-card shadow-sm gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("windows")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                activeTab === "windows"
                  ? "bg-accent text-accent-text shadow-sm"
                  : "text-main-muted hover:text-main hover:bg-base-muted/50"
              }`}
            >
              <WindowsIcon className="w-4 h-4" />
              <span>Windows</span>
            </button>

            <button
              onClick={() => setActiveTab("linux")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                activeTab === "linux"
                  ? "bg-accent text-accent-text shadow-sm"
                  : "text-main-muted hover:text-main hover:bg-base-muted/50"
              }`}
            >
              <LinuxIcon className="w-4 h-4" />
              <span>Linux</span>
            </button>

            <button
              onClick={() => setActiveTab("mac")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                activeTab === "mac"
                  ? "bg-accent text-accent-text shadow-sm"
                  : "text-main-muted hover:text-main hover:bg-base-muted/50"
              }`}
            >
              <AppleIcon className="w-4 h-4" />
              <span>macOS</span>
            </button>
          </div>
        </div>

        {/* Dynamic Platform Overview Card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center rounded-2xl border border-divider bg-base-card p-6 sm:p-10 shadow-xl">
          {activeTab === "windows" && (
            <>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">
                  <WindowsIcon className="w-3.5 h-3.5" />
                  <span>PocketMC Windows</span>
                  <span>•</span>
                  <span>WPF + .NET 8</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-main tracking-tight">
                  Windows 10 & 11
                </h3>
                <p className="text-sm sm:text-base text-main-muted leading-relaxed">
                  Native Windows app built with WPF and .NET 8. Handles server downloads, Java versioning, backups, and networking automatically.
                </p>

                <div className="pt-2">
                  <a
                    href="https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe"
                    className="inline-flex h-11 px-6 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs sm:text-sm rounded-md transition-transform hover:scale-[1.02]"
                  >
                    Download Setup.exe
                  </a>
                </div>
              </div>

              {/* Aesthetic Bullet Points Card */}
              <div className="lg:col-span-5 border border-divider bg-base-muted/30 p-6 sm:p-7 rounded-xl space-y-4">
                <h4 className="font-bold text-main text-sm font-mono uppercase tracking-wider border-b border-divider pb-2.5">
                  Key Highlights
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-main-muted">
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Native WPF app for Windows 10 (1809+) and Windows 11</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automatic Adoptium Java (8 to 25) & PHP runtime management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automated updates via Velopack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prevents Windows sleep mode while servers are running</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {activeTab === "linux" && (
            <>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                  <LinuxIcon className="w-3.5 h-3.5" />
                  <span>PocketMC Linux</span>
                  <span>•</span>
                  <span>Avalonia UI + .NET 8</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-main tracking-tight">
                  Linux (AppImage & Flatpak)
                </h3>
                <p className="text-sm sm:text-base text-main-muted leading-relaxed">
                  Native cross-platform desktop app for Linux distros. Available as portable AppImage, Flatpak package, or standalone tarball.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-linux-x64.AppImage"
                    className="inline-flex h-11 px-6 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs sm:text-sm rounded-md transition-transform hover:scale-[1.02]"
                  >
                    Download AppImage
                  </a>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 px-6 items-center justify-center border border-divider bg-base hover:bg-base-muted font-bold text-xs sm:text-sm text-main rounded-md transition-colors"
                  >
                    GitHub Releases
                  </a>
                </div>
              </div>

              {/* Aesthetic Bullet Points Card */}
              <div className="lg:col-span-5 border border-divider bg-base-muted/30 p-6 sm:p-7 rounded-xl space-y-4">
                <h4 className="font-bold text-main text-sm font-mono uppercase tracking-wider border-b border-divider pb-2.5">
                  Key Highlights
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-main-muted">
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Portable AppImage, Flatpak & tar.gz support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Supports 1-click zsync delta updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure token storage via Linux Secret Service (dbus)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tested on Ubuntu, Fedora, Debian, and Arch Linux</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {activeTab === "mac" && (
            <>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold">
                  <AppleIcon className="w-3.5 h-3.5" />
                  <span>PocketMC macOS</span>
                  <span>•</span>
                  <span>Avalonia UI + .NET 8</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-main tracking-tight">
                  macOS (Apple Silicon & Intel)
                </h3>
                <p className="text-sm sm:text-base text-main-muted leading-relaxed">
                  Native desktop app built for Apple Silicon (M1-M4) and Intel Macs. Unzip and run directly from Applications.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-arm64.zip"
                    className="inline-flex h-11 px-6 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs sm:text-sm rounded-md transition-transform hover:scale-[1.02]"
                  >
                    Download Apple Silicon (M1-M4)
                  </a>
                  <a
                    href="https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-x64.zip"
                    className="inline-flex h-11 px-6 items-center justify-center border border-divider bg-base hover:bg-base-muted font-bold text-xs sm:text-sm text-main rounded-md transition-colors"
                  >
                    Download Intel Mac
                  </a>
                </div>
              </div>

              {/* Aesthetic Bullet Points Card */}
              <div className="lg:col-span-5 border border-divider bg-base-muted/30 p-6 sm:p-7 rounded-xl space-y-4">
                <h4 className="font-bold text-main text-sm font-mono uppercase tracking-wider border-b border-divider pb-2.5">
                  Key Highlights
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-main-muted">
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Native builds for Apple Silicon (M1-M4) & Intel Macs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure credential encryption via macOS Keychain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simple installation: unzip and drag to /Applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full feature parity with Windows and Linux clients</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
