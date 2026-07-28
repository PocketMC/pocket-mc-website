import { getAssetUrl } from "../../utils/getAssetUrl";

export default function HeroSection() {
  return (
    <div id="hero" className="relative w-full min-h-[calc(100dvh-57px)] lg:min-h-[calc(100dvh-69px)] flex flex-col justify-center overflow-hidden border-b border-divider isolate">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <video
          src={getAssetUrl("/Hero_bg_animation/cherry-leaves.1920x1080.mp4")}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-25 dark:opacity-15 theme-transition"
        />
        {/* Gradients blending with background theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base opacity-90 theme-transition" />
        <div className="absolute inset-0 bg-gradient-to-tr from-base/50 via-transparent to-base/80 opacity-70 theme-transition" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto grid w-full max-w-7xl gap-6 sm:gap-10 lg:gap-16 px-4 sm:px-6 py-6 sm:py-12 lg:py-12 lg:grid-cols-[1.1fr_0.9fr] items-center my-auto">
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="max-w-5xl text-[clamp(2rem,6.5vw,6.4rem)] font-black leading-[0.95] tracking-[-0.04em] text-main text-balance">
            Manage Minecraft Servers.{" "}
            <br className="hidden lg:inline" />
            <span className="text-accent italic pr-2">Without Any Mess.</span>
          </h1>

          <p className="mt-4 sm:mt-8 max-w-xl text-sm sm:text-lg leading-6 sm:leading-8 text-main-muted mx-auto lg:mx-0 text-balance">
            <span className="text-main font-semibold">
              PocketMC automates every single step of Minecraft server hosting.
            </span>{" "}
            This local-first Windows client downloads Java, spins up isolated
            Bedrock/Java servers, schedules backups, accepts EULAs, and sets up
            Playit.gg tunnels, all from one beautiful UI.
          </p>

          <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto">
            <a
              href="https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe"
              className="inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center bg-accent text-accent-text hover:bg-accent-hover px-6 sm:px-8 text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] rounded-md transition-transform shadow-md"
            >
              Download for Windows
            </a>

            <div className="grid grid-cols-2 w-full sm:flex sm:w-auto gap-2.5 sm:gap-4">
              <a
                href="https://github.com/PocketMC/pocket-mc-windows"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider px-3 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-base-muted rounded-md gap-2"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://discord.gg/h27uNCaxPH"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider px-3 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] rounded-md gap-2"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                <span>Discord</span>
              </a>
            </div>
          </div>



          <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs text-main-muted font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold select-none text-[11px] sm:text-xs">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.879l-6.837 3.04A1 1 0 002.5 5.83v4.618c0 4.256 2.94 8.232 7.086 9.475a1 1 0 00.828 0c4.146-1.243 7.086-5.219 7.086-9.475V5.83a1 1 0 00-.663-.912L10 1.879zM13.707 8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Safe & Virus-Free
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-card border border-divider text-main-muted font-semibold select-none text-[11px] sm:text-xs shadow-xs">
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              MIT Open Source
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-card border border-divider text-main-muted font-semibold select-none text-[11px] sm:text-xs shadow-xs">
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              No Admin Rights Needed
            </span>
          </div>
        </div>

        {/* Hero Overlapping App Mockup */}
        <div className="relative z-10 lg:pl-4 mt-2 sm:mt-10 lg:mt-0">
          <div className="relative mx-auto max-w-[520px] lg:max-w-none group">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent/5 blur-2xl rounded-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none"></div>

            {/* App Screen Dashboard Mockup with YouTube Redirect */}
            <a
              href="https://www.youtube.com/watch?v=UIcUHqeMCrI"
              target="_blank"
              rel="noreferrer"
              title="Watch full PocketMC showcase video on YouTube"
              className="relative block border border-divider rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl bg-base-card glow-shadow-accent transition-all duration-500 group-hover:translate-y-[-4px] group/vid cursor-pointer"
            >
              <div className="h-6 sm:h-7 border-b border-divider bg-base-muted/40 px-3 flex items-center justify-between gap-2 select-none">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-main-muted ml-1.5 truncate">
                    Server Creation in 50s
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#FF0000] font-mono text-[9px] sm:text-[10px] font-bold opacity-90 group-hover/vid:opacity-100 transition-opacity flex-shrink-0 whitespace-nowrap">
                  <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="hidden sm:inline">Watch on YouTube</span>
                  <span className="sm:hidden">YouTube</span>
                </div>
              </div>

              <div className="relative">
                <video
                  src={getAssetUrl("/Video/PocketMC.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover select-none group-hover/vid:scale-[1.01] transition-transform duration-500"
                  width="1280"
                  height="800"
                  poster={getAssetUrl("/screenshots/screenshot-dashboard.webp")}
                />

                {/* Hover Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white">
                  <div className="relative group-hover/vid:scale-105 transition-transform duration-300 drop-shadow-2xl">
                    <svg className="w-16 h-12 sm:w-20 sm:h-14" viewBox="0 0 68 48">
                      <path fill="#FF0000" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" />
                      <path fill="#FFFFFF" d="M45 24L27 14v20z" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-black/80 text-white px-4 py-1.5 rounded-full border border-white/20 shadow-xl backdrop-blur-md">
                    <span>Watch Full Video on YouTube</span>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* Overlapping Floating Minecraft Skin Head */}
            <div className="hidden sm:flex absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-6 w-24 sm:w-28 h-24 sm:h-28 border border-divider rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl bg-base-card/90 backdrop-blur p-2 animate-float-slow transition-transform hover:scale-105 flex flex-col justify-center items-center group/head cursor-pointer">
              <img
                src={getAssetUrl("/hero_head.webp")}
                alt="Minecraft Skin Hero"
                loading="lazy"
                className="w-12 sm:w-16 h-12 sm:h-16 object-contain image-rendering-pixelated drop-shadow-md select-none group-hover/head:rotate-3 duration-300"
                width="64"
                height="64"
              />
              <span className="mt-1 sm:mt-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-accent font-bold">
                PocketMC
              </span>
            </div>

            {/* Platform Requirement Badge */}
            <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-2 sm:-right-4 bg-base-card/90 backdrop-blur border border-divider px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg animate-float-slower pointer-events-none text-[9px] sm:text-[10px]">
              <p className="uppercase font-mono tracking-wider text-main-muted font-bold">
                Target Platform
              </p>
              <p className="font-bold text-xs sm:text-sm text-main mt-0.5">
                Windows 10 / 11
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* Info Stats Section */}
      <section className="relative z-10 border-t border-divider bg-base-muted/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 sm:px-6 py-8 sm:py-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          {[
            ["Platform target", "Windows 10+ (x64)"],
            ["Safety & License", "100% Safe (MIT License)"],
            ["Local state", "Local-first / Isolated"],
            ["Connectivity", "Playit.gg Provisioning"],
          ].map(([label, value]) => (
            <div key={label} className="group text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-muted font-mono leading-tight">
                {label}
              </p>
              <p className="mt-2 text-sm sm:text-lg font-black text-main group-hover:text-accent transition-colors font-mono">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

