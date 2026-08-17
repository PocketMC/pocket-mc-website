import { useState, useRef, useEffect, useCallback } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";
import PlatformDownloadModal from "../ui/PlatformDownloadModal";
import { YoutubeIcon } from "../ui/SocialIcons";

function detectOS(): "windows" | "linux" | "mac" {
  if (typeof window === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux")) return "linux";
  return "windows";
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userOS] = useState<"windows" | "linux" | "mac">(detectOS);

  // Video Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const getPrimaryDownloadLink = () => {
    switch (userOS) {
      case "linux":
        return {
          label: "Download for Linux (Beta)",
          url: "https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-linux-x64.AppImage",
        };
      case "mac":
        return {
          label: "Download for macOS (Beta)",
          url: "https://github.com/PocketMC/pocket-mc-linux-mac/releases/latest/download/PocketMC-osx-arm64.zip",
        };
      case "windows":
      default:
        return {
          label: "Download for Windows",
          url: "https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe",
        };
    }
  };

  const primaryDownload = getPrimaryDownloadLink();

  // Video event handlers
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const triggerControlsVisibility = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2800);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (isNowFullscreen) {
        triggerControlsVisibility();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div id="hero" className="relative w-full border-b border-divider isolate">
      {/* Subtle Atmospheric Top Light */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-main/[0.02] to-transparent pointer-events-none -z-10" />

      {/* Hero Main Content */}
      <section className="relative mx-auto grid w-full max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 py-12 sm:py-16 lg:py-24 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-black leading-[1.06] tracking-[-0.04em] text-main text-balance">
            Manage Minecraft servers. <br className="hidden sm:inline" />
            Without any mess.
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-main-muted mx-auto lg:mx-0 text-balance">
            PocketMC automates every step of Minecraft server hosting. Native desktop app for Windows, with Linux and macOS versions in active beta development.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-center lg:justify-start w-full sm:w-auto">
            {/* Primary OS Detected Download Button */}
            <a
              href={primaryDownload.url}
              className="inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center bg-accent text-accent-text hover:bg-accent-hover px-6 sm:px-8 text-xs sm:text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99] rounded-lg shadow-sm gap-2"
            >
              <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span>{primaryDownload.label}</span>
            </a>

            {/* Platform Modal Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center border border-divider bg-base-card hover:bg-base-muted px-4 sm:px-6 text-xs sm:text-sm font-semibold text-main transition-colors rounded-lg gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>All Platforms</span>
            </button>

            <div className="grid grid-cols-2 w-full sm:flex sm:w-auto gap-2.5 sm:gap-3">
              <a
                href="https://github.com/PocketMC"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider bg-base px-4 sm:px-5 text-xs sm:text-sm font-semibold text-main transition-colors hover:bg-base-muted rounded-lg gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://discord.gg/mWdMr8Mc2m"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 sm:h-12 items-center justify-center border border-divider bg-base px-4 sm:px-5 text-xs sm:text-sm font-semibold text-main transition-colors hover:bg-base-muted rounded-lg gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                <span>Discord</span>
              </a>
            </div>
          </div>

          {/* Minimal Badges */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-main-muted font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-muted text-main font-bold select-none text-[11px] sm:text-xs border border-divider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-main" />
              100% Free & Open Source (MIT)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-card border border-divider text-main font-medium select-none text-[11px] sm:text-xs">
              Zero Port Forwarding
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-card border border-divider text-main-muted font-medium select-none text-[11px] sm:text-xs">
              Automatic Java Adoptium
            </span>
          </div>
        </div>

        {/* Hero Video Mockup */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="relative mx-auto w-full group">
            {/* Custom Video Player Container */}
            <div
              ref={playerWrapperRef}
              onMouseMove={triggerControlsVisibility}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => !isFullscreen && setShowControls(false)}
              className={`relative block overflow-hidden transition-all duration-200 select-none ${
                isFullscreen
                  ? "fixed inset-0 w-screen h-screen bg-black flex flex-col justify-center items-center z-[99999] rounded-0 border-0"
                  : "border border-divider rounded-xl sm:rounded-2xl shadow-xl bg-base-card"
              }`}
            >
              {/* Window Header */}
              {!isFullscreen && (
                <div className="h-8 border-b border-divider bg-base-muted/40 px-4 flex items-center justify-between gap-2 select-none">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-divider flex-shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-divider flex-shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-divider flex-shrink-0" />
                    <span className="text-[11px] font-mono text-main-muted ml-2 truncate font-medium">
                      PocketMC Demo • Server Creation in 50s
                    </span>
                  </div>

                  <a
                    href="https://www.youtube.com/watch?v=UIcUHqeMCrI"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded text-main-muted hover:text-main font-mono text-[11px] transition-colors"
                    title="Watch full video on YouTube"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline font-medium">YouTube</span>
                  </a>
                </div>
              )}

              {/* Video Canvas & Controls Area */}
              <div
                className={`relative w-full bg-black cursor-pointer flex items-center justify-center ${
                  isFullscreen ? "h-full max-h-screen" : "aspect-[16/10]"
                }`}
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src={getAssetUrl("/Video/PocketMC.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className={`select-none ${
                    isFullscreen
                      ? "w-full h-full max-h-screen object-contain"
                      : "w-full h-full object-cover"
                  }`}
                  width="1280"
                  height="800"
                  poster={getAssetUrl("/screenshots/screenshot-dashboard.webp")}
                />

                {/* Minimal Center Play Button */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none animate-fadeIn">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 text-white grid place-items-center shadow-2xl transition-transform duration-200 hover:scale-105">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Video Options & Seekbar Overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-200 flex flex-col gap-2 z-50 cursor-default ${
                    isFullscreen ? "p-4 sm:p-6 pb-6" : "px-3 py-2.5 sm:px-4 sm:py-3"
                  } ${showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Interactive Seekbar */}
                  <div className="relative flex items-center group/seekbar w-full py-1">
                    <div className="absolute inset-x-0 h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden pointer-events-none">
                      <div
                        className="h-full bg-white transition-all duration-75"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      aria-label="Video seek bar"
                      className="relative w-full h-3 opacity-0 group-hover/seekbar:opacity-100 transition-opacity cursor-pointer accent-white z-10"
                    />
                  </div>

                  {/* Options Control Bar */}
                  <div className="flex items-center justify-between text-white text-xs px-1">
                    {/* Left: Play/Pause, Mute/Unmute, Time */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={togglePlay}
                        className="h-7 w-7 rounded flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="h-7 w-7 rounded flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>

                      <span className="text-[10px] sm:text-xs font-mono text-white/80 select-none ml-1">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Right: Speed, YouTube link, Fullscreen */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={toggleSpeed}
                        className="h-6 px-2 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] sm:text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                        title="Change Playback Speed"
                      >
                        {playbackRate}x
                      </button>

                      <a
                        href="https://www.youtube.com/watch?v=UIcUHqeMCrI"
                        target="_blank"
                        rel="noreferrer"
                        className="h-6 px-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors text-[10px] sm:text-xs font-mono font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Open on YouTube"
                      >
                        <YoutubeIcon className="w-3 h-3 fill-current flex-shrink-0" />
                        <span className="hidden min-[360px]:inline">YouTube ↗</span>
                        <span className="min-[360px]:hidden">YT ↗</span>
                      </a>

                      <button
                        onClick={toggleFullscreen}
                        className="h-7 w-7 rounded flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white"
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
                      >
                        {isFullscreen ? (
                          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0l5 0m-5 0l0 5m6 6l5 5m0 0l-5 0m5 0l0-5" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Stats Section */}
      <section className="relative z-10 border-t border-divider bg-base-muted/20">
        <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-7 grid-cols-2 md:grid-cols-4">
          {[
            ["Platform targets", "Windows (Stable) · Linux & Mac (Beta)"],
            ["Safety & License", "100% Safe (MIT License)"],
            ["Local state", "Local-first / Isolated"],
            ["Connectivity", "Playit & Cloudflare Tunnels"],
          ].map(([label, value]) => (
            <div key={label} className="group text-center sm:text-left">
              <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-main-muted font-mono leading-tight">
                {label}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-bold text-main font-mono">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Download Modal */}
      <PlatformDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
