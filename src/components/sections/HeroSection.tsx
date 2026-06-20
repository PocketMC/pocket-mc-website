import { getAssetUrl } from "../../utils/getAssetUrl";
import SpotlightCard from "../ui/SpotlightCard";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden border-b border-divider isolate">
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
      <section className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 pb-12 sm:pb-16 pt-1 sm:pt-2 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-3 items-center">
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="max-w-5xl text-[clamp(2.15rem,5.5vw,6.4rem)] font-black leading-[0.95] tracking-[-0.05em] text-main text-balance">
            Manage Minecraft Servers.{" "}
            <br className="hidden lg:inline" />
            <span className="text-accent italic pr-2">Without Any Mess.</span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-main-muted mx-auto lg:mx-0 text-balance">
            <span className="text-main font-semibold">
              PocketMC automates every single step of Minecraft server hosting.
            </span>{" "}
            This local-first Windows client downloads Java, spins up isolated
            Bedrock/Java servers, schedules backups, accepts EULAs, and sets up
            Playit.gg tunnels — all from one beautiful UI.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start">
            <a
              href="https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe"
              className="inline-flex h-11 sm:h-12 items-center justify-center bg-accent text-accent-text hover:bg-accent-hover px-6 sm:px-8 text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] rounded-md transition-transform"
            >
              Download for Windows
            </a>

            <a
              href="https://github.com/PocketMC/pocket-mc-windows"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider px-4 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-base-muted rounded-md gap-2"
            >
              <svg
                className="w-4 h-4 flex-shrink-0 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="hidden sm:inline">View on GitHub</span>
            </a>

            <a
              href="https://discord.gg/h27uNCaxPH"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider px-4 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] rounded-md gap-2"
            >
              <svg
                className="w-4 h-4 flex-shrink-0 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
              </svg>
              <span className="hidden sm:inline">Join Discord</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="inline-flex border border-divider px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent font-mono bg-base-muted/30 rounded-full whitespace-nowrap">
              ⚡ WINDOWS DESKTOP APP
            </span>
            <span className="inline-flex border border-success/30 px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wider text-success font-mono bg-success/5 rounded-full whitespace-nowrap">
              .NET 8.0 POWERED
            </span>
          </div>

          <div className="mt-4 text-xs text-main-muted font-mono flex items-center gap-2 justify-center lg:justify-start text-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <span className="line-clamp-2">
              No administrator rights or global Java installs required.
            </span>
          </div>
        </div>

        {/* Hero Overlapping App Mockup */}
        <div className="relative z-10 lg:pl-4 mt-10 lg:mt-0">
          <div className="relative mx-auto max-w-[520px] lg:max-w-none group">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent/5 blur-2xl rounded-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none"></div>

            {/* App Screen Dashboard Mockup */}
            <div className="relative border border-divider rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl bg-base-card glow-shadow-accent transition-transform duration-500 group-hover:translate-y-[-4px]">
              <div className="h-6 sm:h-7 border-b border-divider bg-base-muted/40 px-3 flex items-center gap-1.5 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-divider dark:bg-divider flex-shrink-0"></span>
                <span className="text-[9px] sm:text-[10px] font-mono text-main-muted ml-2 truncate">
                  Server Creation in 50s via PocketMC
                </span>
              </div>
              <video
                src={getAssetUrl("/Video/PocketMC.mp4")}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover select-none"
                width="1280"
                height="800"
              />
            </div>

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
            ["License type", "MIT Open Source"],
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

      {/* Iconic Minecraft Feature Pillars */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
            THE CORE MECHANICS
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em]">
            Built with proper gaming mechanics.
          </h2>
          <p
            className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--main-muted)" }}
          >
            No convoluted scripts, Docker overheads, or web dashboards. PocketMC
            packages standard tasks as smooth, local desktop features.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {[
            {
              title: "1-Click Instance Setup",
              image: "/block_grass.webp",
              desc: "Deploy Vanilla, Paper, Fabric, Forge, BDS, or PocketMine server instances directly from an elegant client. EULA prompts, server versions, and runtime downloads are fully managed under one local path.",
              badge: "LIFECYCLE",
            },
            {
              title: "Scheduled World Backups",
              image: "/block_cobble.webp",
              desc: "Protect your worlds. Enjoy automated cron schedules or manual backup triggers that use active RCON locks. Includes zip security validations, zip cleanups, and external directory replication.",
              badge: "RECOVERY",
            },
            {
              title: "Zero-Config Runtimes & Tunnels",
              image: "/block_diamond.webp",
              desc: "PocketMC provisions local Adoptium Java 8-25 versions and PM5 PHP binaries on demand. Zero global environment clashes. Share with friends instantly using built-in Playit.gg agent setups.",
              badge: "CONNECTIVITY",
            },
          ].map((block, idx) => {
            const blockSpotlights = [
              "rgba(255, 255, 255, 0.05)",
              "rgba(255, 255, 255, 0.05)",
              "rgba(255, 255, 255, 0.05)",
            ];

            return (
              <SpotlightCard
                key={block.title}
                spotlightColor={blockSpotlights[idx]}
                className={`border border-divider hover:border-main/50 bg-base-card/40 backdrop-blur-sm p-6 sm:p-8 rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg flex flex-col group`}
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-accent tracking-widest border border-divider px-2 py-1 rounded bg-base-muted/30 whitespace-nowrap">
                    {block.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-main-muted/50">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex justify-center mb-4 sm:mb-6">
                  <img
                    src={getAssetUrl(block.image)}
                    alt={block.title}
                    className="w-20 sm:w-24 h-20 sm:h-24 object-contain select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 animate-float"
                    style={{ animationDelay: `${idx * 1.5}s` }}
                    width="96"
                    height="96"
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-black text-main mt-4 group-hover:text-accent transition-colors">
                  {block.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-6 text-main-muted flex-grow">
                  {block.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
