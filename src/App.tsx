import { useState, useEffect, useRef, lazy, Suspense } from "react";
import type { TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import ClickSpark from "./components/ClickSpark";
import StarBorder from "./components/StarBorder";
import Dock from "./components/Dock";
import BorderGlow from "./components/BorderGlow";
import { Skeleton } from "./components/ui/skeleton";

// Heavy WebGL/canvas components — lazy-loaded to avoid blocking first paint
const PixelSnow = lazy(() => import("./components/PixelSnow"));
const LiquidEther = lazy(() => import("./components/LiquidEther"));
const ElectricBorder = lazy(() => import("./components/ElectricBorder"));
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/ui/table";

const getAssetUrl = (path: string) => {
  if (!path) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("https") ||
    path.startsWith("data:")
  )
    return path;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const separator = baseUrl.endsWith("/") ? "" : "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${separator}${cleanPath}`;
};

// Platform Software Data from README
const serverSoftwares = [
  {
    name: "Vanilla Java",
    icon: "/icons/vanilla.png",
    description: "Official Mojang server JARs, Minecraft 1.8.8+",
    tag: "Java",
  },
  {
    name: "Paper",
    icon: "/icons/papermc.png",
    description:
      "High-performance Paper server builds by PaperMC, Minecraft 1.8.8+",
    tag: "Plugins",
  },
  {
    name: "Fabric",
    icon: "/icons/fabric.png",
    description: "Modular modding toolkit, extremely fast, Minecraft 1.14+",
    tag: "Mods",
  },
  {
    name: "Forge",
    icon: "/icons/forge.png",
    description:
      "Industry-standard heavyweight modding framework, installer-based setup, Minecraft 1.8.8+",
    tag: "Mods",
  },
  {
    name: "NeoForge",
    icon: "/icons/neoforge.png",
    description:
      "Community-driven modern Forge fork from Maven metadata, installer-based setup",
    tag: "Mods",
  },
  {
    name: "Bedrock Server (BDS)",
    icon: "/icons/bds.png",
    description:
      "Community-manifested Windows BDS ZIPs, including release and preview builds",
    tag: "Bedrock",
  },
  {
    name: "PocketMine-MP",
    icon: "/icons/pocketmine-mp.png",
    description:
      "Extensible PHP-based Bedrock server with managed PHP 8.2 PM5 runtime",
    tag: "PHP",
  },
];

// Interactive Screenshots tour tabs
const tourTabs = [
  {
    id: "dashboard",
    label: "Live Dashboard",
    title: "Instant Server Lifecycle & Live Monitoring",
    image: "/screenshots/dashboard.webp",
    alt: "PocketMC Dashboard showing running instances and metrics",
    description:
      "The control center. Track CPU/RAM resource graphs, accepted EULAs, active player counts, and control server state gracefully. Features dynamic badges that scan mod folders to verify Geyser cross-play and voice chat integrations. Now includes full Remote Control Web Dashboard capabilities via Playit HTTPS tunnels.",
    bullets: [
      "Secure Remote Control Dashboard with mobile QR code pairing",
      "Dynamic status badges: Simple Voice Chat, Geyser + Floodgate indicators",
      "One-click start, stop, restart, or process termination",
      "Per-instance preflight port checks to eliminate local port conflicts",
    ],
  },
  {
    id: "console",
    label: "Smart Console",
    title: "Sanitized Console & Player Tracking",
    image: "/screenshots/console.webp",
    alt: "PocketMC Console panel with log formatting",
    description:
      "Ditch raw terminal chaos. Read formatted, colorized, and classified logs in real-time. Execute server commands with ease and trace player activity directly.",
    bullets: [
      "Automatically logs session console output to local session files",
      "Sanitizes personal details (IP addresses, emails) automatically",
      "Parses Java, Bedrock, and PocketMine formats for unified player lists",
      "Fast filtering, search-oriented log handling, and buffer history",
    ],
  },
  {
    id: "tunnels",
    label: "Public Access",
    title: "Playit.gg Tunnels & Network Mapping",
    images: ["/screenshots/tunnels.webp", "/screenshots/ports-map.webp"],
    alt: "PocketMC Playit.gg tunnels and interactive ports map",
    description:
      "Invite friends to play instantly. No router configuring, no port forwarding. Link your Playit.gg account to auto-discover and map local Java/Bedrock ports to public tunnel addresses, visualized via the interactive Ports Map.",
    bullets: [
      "Guided 4-step Playit account link and agent provisioning wizard",
      "Real-time visual map of local bindings and public Playit endpoints",
      "Graceful handling for offline agents, invalid tokens, and account limits",
      "One-click copy for public IP and Port connections",
    ],
  },
  {
    id: "plugins",
    label: "Mods & Plugins",
    title: "Curated Content Marketplaces",
    images: ["/screenshots/screenshot-plugins.webp", "/screenshots/mod-marketplace.webp"],
    alt: "PocketMC Modrinth plugin and mod installer browsers",
    description:
      "Install server-side mods, plugins, and modpacks directly from your UI. Native browsers for Modrinth and CurseForge handle dependency resolution safely.",
    bullets: [
      "Native Modrinth browser — mods, plugins, and modpacks",
      "CurseForge browser via API key and Poggit integration for PocketMine",
      "Java metadata scanning: Fabric, Quilt, Forge, NeoForge, Paper metadata",
      "Bedrock pack (.mcpack, .mcaddon, .zip) ingestion and validation",
    ],
  },
  {
    id: "backups",
    label: "Automated Backups",
    title: "Safe World Archives, Cloud Backup & Restore",
    image: "/screenshots/backups.webp",
    alt: "PocketMC Backups scheduler view",
    description:
      "Protect your worlds. Live-server backups attempt RCON save sync first, then fall back to console save commands. Unsafe files like session.lock are automatically skipped.",
    bullets: [
      "Manual and scheduled Cron-based backup policies with SHA-256 integrity checks",
      "Live-server sync: RCON save sync first, falls back to console commands",
      "Native cloud backup to Google Drive, Dropbox & OneDrive with one-click restore",
      "Retention pruning and optional local folder replication",
    ],
  },
  {
    id: "runtimes",
    label: "Java Provisioning",
    title: "App-Local Runtimes Manager",
    image: "/screenshots/runtimes.webp",
    alt: "PocketMC Java Adoptium manager",
    description:
      "Stop dealing with global Java environment variables. PocketMC downloads Adoptium JRE binaries locally to isolate your server dependencies from the rest of your Windows PC.",
    bullets: [
      "Adoptium Java binaries managed locally: Java 8, 11, 17, 21, and 25",
      "Saves disk space: background downloads Java 25, prompts older versions on-demand",
      "Auto-selection based on Minecraft server jar compatibility requirements",
      "Official managed PHP PM5 runtime for Bedrock PocketMine-MP instances",
    ],
  },
  {
    id: "remote",
    label: "Remote Web Panel",
    title: "Manage Servers from Any Device",
    image: "/screenshots/remote-control.webp",
    alt: "PocketMC Remote Control Dashboard configuration",
    description:
      "Access and manage your local servers from anywhere. The Remote Control server hosts a secure web dashboard accessible over your local network or securely via Playit.gg.",
    bullets: [
      "Secure QR code pairing and host port configuration",
      "Live console streaming and command execution remotely",
      "Securely exposed via Playit.gg HTTPS tunnels or Cloudflare",
    ],
  },
  {
    id: "mobile",
    label: "Mobile UI",
    title: "Responsive Mobile Web Dashboard",
    images: [
      "/screenshots/mobile-instances.webp",
      "/screenshots/mobile-home.webp",
      "/screenshots/mobile-console.webp",
      "/screenshots/mobile-players.webp"
    ],
    alt: "PocketMC Mobile Web Dashboard interfaces",
    description:
      "View live CPU/RAM metrics, stream colorized console logs, and manage connected players directly from your phone's browser.",
    bullets: [
      "Mobile-first responsive design for on-the-go administration",
      "One-touch server state controls (Start, Stop, Kill)",
      "Remote moderation: kick, ban, or op users from the mobile web interface",
    ],
  },
];

// High-impact feature categories for the accordion cards
const detailFeatures = [
  {
    id: "lifecycle",
    title: "Server Lifecycle & Safety",
    description:
      "WPF instance automation handles everything from creation to crash recovery.",
    items: [
      "Create isolated server instances with distinct config files in one app root",
      "Preflight port availability checks before boot to prevent crash-loops",
      "RCON graceful termination hooks with process-kill fallback",
      "Crash monitoring captures recent sanitized output with auto-restart backoff",
      "Server version update workflow with rollback, staging, and journal support",
      "Player Management: operators, bans, banned IPs, and whitelist controls",
      "Native Cloud Backups (Google Drive, Dropbox, OneDrive) with integrity checks",
    ],
  },
  {
    id: "ai",
    title: "Intelligent AI Summaries",
    description:
      "Translate multi-megabyte server logs into quick human-readable session reports.",
    items: [
      "Sanitizes obvious personal identifiers (IPs, emails) before processing",
      "Supported providers: Google Gemini, OpenAI, Anthropic Claude, Mistral AI, Groq, Ollama (local)",
      "Custom endpoint and model overrides supported across all providers",
      "Large-log warning shown for sessions over ~1.5 MB before summarizing",
      "Session analytics, playtime summaries, and crash post-mortems in rich markdown",
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostic Engine & QoL",
    description:
      "Windows-focused tools and integrations built for the local desktop environment.",
    items: [
      "Built-in CheckNetIsolation.exe UWP helper for Bedrock local loopback access",
      "Windows native Toast notifications and taskbar Tray integration",
      "Discord Welcome Bot Integration with automatic server role assignments",
      "Discord Rich Presence — shows server state, player count, uptime, and join link",
      "Velopack automated startup updates with incremental file checks",
      "Dependency health scanner validating Adoptium, Playit, and marketplace APIs",
      "Mica, Acrylic, Wallpaper Blur, and Solid theme options for Windows UI polish",
    ],
  },
];

// Comparison Table Data
const comparisonData = [
  {
    tool: "PocketMC",
    category: "Local-first Windows desktop app",
    strength: "Complete local Minecraft server management in one Windows app",
    win: "Best overall fit for Windows self-hosting: Java, native BDS, PocketMine-MP, Geyser/Floodgate, managed Java/PHP runtimes, backups, metrics, Playit.gg tunnels, marketplace content, and open-source trust.",
    isFeatured: true,
  },
  {
    tool: "SquidServers",
    category: "Desktop app",
    strength:
      "Very easy local hosting with BDS, Geyser, Playit.gg, backups, and metrics",
    win: "PocketMC has stronger open-source trust, deeper PocketMine/Poggit/Bedrock add-on support, safer backup/restore implementation, and broader runtime ownership.",
    isFeatured: false,
  },
  {
    tool: "auto-mcs",
    category: "Desktop + Docker",
    strength:
      "Broad Java support, Geyser crossplay, backups, metrics, Playit.gg",
    win: "PocketMC supports native Bedrock Dedicated Server and PocketMine-MP, while auto-mcs is Geyser-based for Bedrock crossplay, not native BDS.",
    isFeatured: false,
  },
  {
    tool: "MCSManager",
    category: "Web panel",
    strength: "Broad game-server management panel",
    win: "PocketMC is more focused, simpler for Windows users, and does not require web-panel/server-admin setup.",
    isFeatured: false,
  },
  {
    tool: "Pterodactyl",
    category: "Web panel",
    strength: "Powerful Docker-based hosting infrastructure",
    win: "PocketMC gives you the same Remote Control Web Panel capabilities for your instances, but entirely local-first without requiring Linux, Docker, or complicated reverse proxy configurations.",
    isFeatured: false,
  },
  {
    tool: "fork.gg",
    category: "Windows GUI",
    strength: "Simple Minecraft server wrapper",
    win: "PocketMC is much more complete: modern server families, BDS, PocketMine-MP, Geyser/Floodgate, backups, metrics, marketplace support, Playit.gg, and active open-source positioning.",
    isFeatured: false,
  },
  {
    tool: "Apex Hosting",
    category: "Managed cloud host",
    strength: "Paid 24/7 hosted servers",
    win: "PocketMC gives local ownership, no monthly hosting dependency, full file control, and self-hosted freedom. Apex only wins when the user specifically wants paid always-online hosting.",
    isFeatured: false,
  },
  {
    tool: "Aternos",
    category: "Free cloud host",
    strength: "Free hosted Minecraft servers",
    win: "PocketMC gives more control, fewer platform limits, local files, custom workflows, and no queue/ad-supported hosting model.",
    isFeatured: false,
  },
  {
    tool: "CubeCoders AMP",
    category: "Paid web panel",
    strength: "Professional multi-game server panel",
    win: "PocketMC is free, open-source, Minecraft-focused, and Windows desktop-first instead of paid panel-first.",
    isFeatured: false,
  },
  {
    tool: "e4mc",
    category: "Tunnel mod",
    strength: "Quick LAN/world tunneling",
    win: "PocketMC is a full server manager, not just a tunneling mod. It handles lifecycle, runtimes, backups, metrics, content, and restore safety.",
    isFeatured: false,
  },
  {
    tool: "Essential Mod",
    category: "Client mod / P2P hosting",
    strength: "Easy friend world hosting",
    win: "PocketMC manages real server instances. Essential is convenient for casual worlds, but it is not a serious server management app.",
    isFeatured: false,
  },
  {
    tool: "Minehut",
    category: "Managed cloud host",
    strength: "Free-to-start hosted servers and community hosting",
    win: "PocketMC wins on local ownership, file control, fewer platform restrictions, and self-hosted privacy/control.",
    isFeatured: false,
  },
  {
    tool: "playit.gg",
    category: "Tunnel service",
    strength: "Excellent public tunnel service",
    win: "PocketMC includes Playit.gg as part of a full server-management workflow instead of forcing users to combine tools manually like it’s 2012.",
    isFeatured: false,
  },
];

// FAQ Data
const faqData = [
  {
    q: "Does PocketMC require Windows administrator privileges?",
    a: "No. PocketMC runs entirely in user-space. It downloads Adoptium runtimes locally and maps isolated directories without touching system environment variables or requiring administrative elevation.",
  },
  {
    q: "How does the Playit.gg integration work?",
    a: "PocketMC packages a guided 4-step wizard that pairs your Playit account. Once linked, the client automatically manages background agent processes, port mapping, and tunnel generation directly from the UI—zero router configuration needed.",
  },
  {
    q: "Can I host both Java and Bedrock server types?",
    a: "Yes. PocketMC manages Vanilla Java, Paper, Fabric, Forge, and NeoForge instances on the Java side, alongside native Bedrock Dedicated Server (BDS) and PocketMine-MP. It also handles Geyser/Floodgate setups to allow Bedrock/Java cross-play.",
  },
  {
    q: "How secure are automated world backups?",
    a: "Backups are highly secure. The manager locks the active server using RCON save-holding, flushes data to disk, excludes temporary run locks (like session.lock), verifies ZIP integrity via SHA-256 hashes, and offers automated cloud replication to Google Drive, OneDrive, and Dropbox.",
  },
  {
    q: "Are my server logs shared with third-party AI systems?",
    a: "Only if you explicitly request an AI session summary. Obvious personal identifiers (IPs, emails) are scrubbed locally before processing. Supported models include Google Gemini, OpenAI, Claude, Mistral, Groq, or Ollama (fully local, zero-leak offline processing).",
  },
  {
    q: "Can I import existing worlds or servers?",
    a: "Yes. You can import world folders directly, ingest Minecraft Bedrock packs (.mcpack, .mcaddon, .zip) with automatic manifest mapping, or place pre-configured server JARs inside your instance root directories.",
  },
];

// ----------------------------------------------------
// Scroll-Driven Frame Animation Background
// ----------------------------------------------------
function ScrollAnimationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [mountOpacity, setMountOpacity] = useState(0);
  const frameCount = 82;
  const currentFrameRef = useRef(0);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];
      const baseUrl = import.meta.env.BASE_URL || "/";

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        const separator = baseUrl.endsWith("/") ? "" : "/";
        img.src = `${baseUrl}${separator}bg_animation/${frameIndex}.webp`;

        const promise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
        });
        promises.push(promise);
        loadedImages[i] = img;
      }

      await Promise.all(promises);
      const successfulLoads = loadedImages.filter(
        (img) => img && img.complete && img.naturalWidth > 0,
      ).length;

      if (successfulLoads > 0) {
        setImages(loadedImages);
        setIsLoaded(true);
      }
    };

    loadImages();
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete) return;

    // Canvas cover logic
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images]);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount),
      );

      // Hero Isolation: stay at 0% opacity during the hero section
      const viewportHeight = window.innerHeight;
      const heroFadeStart = viewportHeight * 0.3; // Start fading in after 30% scroll
      const heroFadeEnd = viewportHeight * 0.9; // Fully visible by the end of hero
      let heroMultiplier = 1;

      if (scrollY < heroFadeStart) {
        heroMultiplier = 0;
      } else if (scrollY < heroFadeEnd) {
        heroMultiplier =
          (scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart);
      }

      // Bottom Fade: fade out at the very end of the page
      const fadeStart = 0.85;
      let bottomMultiplier = 1;
      if (progress > fadeStart) {
        bottomMultiplier = 1 - (progress - fadeStart) / (1 - fadeStart);
      }

      setScrollOpacity(heroMultiplier * bottomMultiplier);

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded, images]);

  // Initial Draw and Mount Fade
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
      setTimeout(() => setMountOpacity(1), 100);
    }
  }, [isLoaded]);

  return (
    <div
      className="fixed inset-0 -z-30 overflow-hidden pointer-events-none"
      style={{
        opacity: isLoaded ? scrollOpacity * mountOpacity * 0.15 : 0,
        transition: "opacity 1500ms ease-in-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover pointer-events-none"
      />
      {/* Dynamic theme-aware overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-base/80 via-base/30 to-base/95 theme-transition" />
    </div>
  );
}

// ----------------------------------------------------
// Spotlight Card Component (from ReactBits)
// ----------------------------------------------------
interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

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

  const [activeTourTab, setActiveTourTab] = useState("dashboard");
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>(
    { 0: true },
  );
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
  });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Swipe controls for mobile screenshots
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handlePrevTab = () => {
    const currentIndex = tourTabs.findIndex((t) => t.id === activeTourTab);
    const prevIndex = (currentIndex - 1 + tourTabs.length) % tourTabs.length;
    setActiveTourTab(tourTabs[prevIndex].id);
  };

  const handleNextTab = () => {
    const currentIndex = tourTabs.findIndex((t) => t.id === activeTourTab);
    const nextIndex = (currentIndex + 1) % tourTabs.length;
    setActiveTourTab(tourTabs[nextIndex].id);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      e.stopPropagation();
      if (isLeftSwipe) {
        handleNextTab();
      } else {
        handlePrevTab();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    if (lightboxImage !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    // Simulate loading for 1.2 seconds to showcase skeletons
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

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const activeTabDetails =
    tourTabs.find((t) => t.id === activeTourTab) || tourTabs[0];

  const dockItems = tourTabs.map((tab) => {
    const isActive = activeTourTab === tab.id;
    const tabIcon = {
      dashboard: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      console: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
      tunnels: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      plugins: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      backups: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      runtimes: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      remote: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      mobile: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    }[tab.id] || <span>🔍</span>;

    return {
      icon: tabIcon,
      label: tab.label,
      onClick: () => setActiveTourTab(tab.id),
      className: isActive
        ? "!border-accent !bg-accent/15 scale-110 shadow-lg"
        : "",
    };
  });

  return (
    <main className="min-h-screen text-main theme-transition relative overflow-x-clip bg-grid z-0">
      <ScrollAnimationBackground />
      <ClickSpark
        sparkColor={theme === "dark" ? "#a78bfa" : "#4f46e5"}
        sparkSize={18}
        sparkRadius={95}
        sparkCount={8}
        duration={1300}
        easing="ease-out"
        extraScale={1.6}
      >
        {/* Decorative Glowing Ambient Orbs */}
        <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] rounded-full glow-orb opacity-70 pointer-events-none"></div>
        <div className="absolute top-[35%] right-[-200px] w-[600px] h-[600px] rounded-full glow-orb opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-100px] w-[450px] h-[450px] rounded-full glow-orb opacity-60 pointer-events-none"></div>

        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Hero Wrapper with Ambient Cherry Leaves Video Backdrop */}
        <div className="relative w-full overflow-hidden border-b border-divider isolate">
          {/* Video Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <video
              src={getAssetUrl(
                "/Hero_bg_animation/cherry-leaves.1920x1080.mp4",
              )}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-25 dark:opacity-15 theme-transition"
            />
            {/* Gradients blending with background theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base opacity-90 theme-transition" />
            <div className="absolute inset-0 bg-gradient-to-tr from-base/50 via-transparent to-base/80 opacity-70 theme-transition" />

            {/* Retro Pixelated Snow Backdrop overlay */}
            <div
              className={`absolute inset-0 z-0 pointer-events-none ${theme === "dark" ? "opacity-20" : "opacity-[0.05]"}`}
            >
              <Suspense fallback={null}>
                <PixelSnow
                  color={theme === "dark" ? "#a78bfa" : "#4f46e5"}
                  flakeSize={0.008}
                  minFlakeSize={1.1}
                  pixelResolution={160}
                  speed={0.6}
                  density={0.2}
                  direction={135}
                  variant="snowflake"
                  brightness={1.0}
                />
              </Suspense>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 pb-12 sm:pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-24 items-center">
            <div className="relative z-10">
              <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
                <span className="inline-flex border border-divider px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent font-mono bg-base-muted/30 rounded-full whitespace-nowrap">
                  ⚡ WINDOWS DESKTOP APP
                </span>
                <span className="inline-flex border border-success/30 px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wider text-success font-mono bg-success/5 rounded-full whitespace-nowrap">
                  .NET 8.0 POWERED
                </span>
              </div>

              <h1 className="max-w-5xl text-[clamp(1.75rem,5vw,6.4rem)] font-black leading-[0.9] tracking-[-0.06em] text-main">
                Manage Minecraft Servers.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-accent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent font-playfair italic font-medium tracking-normal pr-2">
                  Without any Mess.
                </span>
              </h1>

              <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-main-muted">
                PocketMC is a local-first Windows client that downloads Java,
                spins up isolated Bedrock/Java servers, schedules backups,
                accepts EULAs, and sets up Playit.gg tunnels — all from one
                beautiful UI.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-4 items-center">
                <StarBorder
                  as="a"
                  href="https://github.com/PocketMC/pocket-mc-windows/releases/latest"
                  color={theme === "dark" ? "#a78bfa" : "#4f46e5"}
                  speed="5s"
                  thickness={1.5}
                  className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98] rounded-[20px] text-sm sm:text-base"
                >
                  Download Setup.exe
                </StarBorder>

                <a
                  href="https://github.com/PocketMC/pocket-mc-windows"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 sm:h-12 items-center justify-center border border-divider px-3 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-base-muted rounded-md gap-2"
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
                  className="inline-flex h-10 sm:h-12 items-center justify-center border border-divider px-3 sm:px-6 text-xs sm:text-sm font-bold text-main transition-colors hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] rounded-md gap-2"
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

              <div className="mt-6 sm:mt-8 text-xs text-main-muted font-mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                <span className="line-clamp-2">
                  No administrator rights or global Java installs required.
                </span>
              </div>
            </div>

            {/* Hero Overlapping App Mockup */}
            <div className="relative z-10 lg:pl-4 mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-[520px] lg:max-w-none group">
                {/* Ambient Back Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-accent/15 blur-2xl rounded-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none"></div>

                {/* App Screen Dashboard Mockup */}
                <div className="relative border border-divider rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl bg-base-card glow-shadow-accent transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <div className="h-6 sm:h-7 border-b border-divider bg-base-muted/40 px-3 flex items-center gap-1.5 select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 dark:bg-red-500/40 flex-shrink-0"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 dark:bg-yellow-500/40 flex-shrink-0"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 dark:bg-green-500/40 flex-shrink-0"></span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-main-muted ml-2 truncate">
                      PocketMC Interactive Demo
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
                <div className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-6 w-24 sm:w-28 h-24 sm:h-28 border border-divider rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl bg-base-card/90 backdrop-blur p-2 animate-float-slow transition-transform hover:scale-105 flex flex-col justify-center items-center group/head cursor-pointer">
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
                <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 bg-base-card/90 backdrop-blur border border-divider px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg animate-float-slower pointer-events-none text-[9px] sm:text-[10px]">
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
        </div>

        {/* Info Stats Section */}
        <section className="relative z-10 border-y border-divider bg-base-muted/40 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 sm:px-6 py-8 sm:py-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
            {[
              ["Platform target", "Windows 10+ (x64)"],
              ["License type", "MIT Open Source"],
              ["Local state", "Local-first / Isolated"],
              ["Connectivity", "Playit.gg Provisioning"],
            ].map(([label, value]) => (
              <div key={label} className="group">
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
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
              No convoluted scripts, Docker overheads, or web dashboards.
              PocketMC packages standard tasks as smooth, local desktop
              features.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                title: "1-Click Instance Setup",
                image: "/block_grass.webp",
                desc: "Deploy Vanilla, Paper, Fabric, Forge, BDS, or PocketMine server instances directly from an elegant client. EULA prompts, server versions, and runtime downloads are fully managed under one local path.",
                badge: "LIFECYCLE",
                color: "border-green-500/20 hover:border-green-500/40",
              },
              {
                title: "Scheduled World Backups",
                image: "/block_cobble.webp",
                desc: "Protect your worlds. Enjoy automated cron schedules or manual backup triggers that use active RCON locks. Includes zip security validations, zip cleanups, and external directory replication.",
                badge: "RECOVERY",
                color: "border-zinc-500/20 hover:border-zinc-500/40",
              },
              {
                title: "Zero-Config Runtimes & Tunnels",
                image: "/block_diamond.webp",
                desc: "PocketMC provisions local Adoptium Java 8-25 versions and PM5 PHP binaries on demand. Zero global environment clashes. Share with friends instantly using built-in Playit.gg agent setups.",
                badge: "CONNECTIVITY",
                color: "border-cyan-500/20 hover:border-cyan-500/40",
              },
            ].map((block, idx) => {
              const blockSpotlights = [
                "rgba(34, 197, 94, 0.15)",
                "rgba(163, 163, 163, 0.15)",
                "rgba(6, 182, 212, 0.15)",
              ];

              return (
                <SpotlightCard
                  key={block.title}
                  spotlightColor={blockSpotlights[idx]}
                  className={`border border-divider bg-base-card/40 backdrop-blur-sm p-6 sm:p-8 rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg flex flex-col group ${block.color}`}
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

        {/* Interactive Screenshot Tour */}
        <section
          id="servers"
          className="relative z-10 border-y border-divider bg-base-muted/20 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 max-w-3xl">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted/60 px-3 py-1 rounded inline-block">
                APPLICATION TOUR
              </span>
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
                Inspect every interface.
              </h2>
              <p
                className="mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl"
                style={{ color: "var(--main-muted)" }}
              >
                Explore the actual WPF app views. Each screen was crafted from
                the ground up for Windows, delivering a clean desktop
                experience.
              </p>
            </div>

            {/* Display active screenshot mock with details */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {isLoading ? (
                <>
                  {/* Screenshot Skeleton */}
                  <div className="border border-divider bg-base-card rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl">
                    <div className="h-7 border-b border-divider bg-base-muted/40 px-4 flex items-center gap-1.5">
                      <Skeleton className="w-3.5 h-3.5 rounded-full" />
                      <Skeleton className="w-3.5 h-3.5 rounded-full" />
                      <Skeleton className="w-3.5 h-3.5 rounded-full" />
                      <Skeleton className="h-3 w-40 rounded ml-2" />
                    </div>
                    <Skeleton className="w-full aspect-video rounded-none" />
                  </div>

                  {/* Details Card Skeleton */}
                  <div className="mt-8 border border-divider bg-base-card/60 backdrop-blur p-8 rounded-xl shadow-sm">
                    <Skeleton className="h-6 w-48 rounded mb-4" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-5/6 rounded mb-6" />

                    <div className="grid sm:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Skeleton className="w-4 h-4 rounded flex-shrink-0 mt-0.5" />
                          <Skeleton className="h-3 w-full rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border border-divider bg-base-card rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl glow-shadow-accent group relative theme-transition">
                    <div className="h-7 border-b border-divider bg-base-muted/40 px-4 flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-red-500/20 dark:bg-red-500/30"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 dark:bg-yellow-500/30"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500/20 dark:bg-green-500/30"></span>
                        <span className="text-[10px] font-mono text-main-muted ml-2">
                          {activeTabDetails.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono border border-divider px-1.5 py-0.5 rounded bg-base-muted/20 text-main-muted/80">
                        WPF View
                      </span>
                    </div>

                    <div
                      className="relative bg-base-muted/10 overflow-hidden"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      {activeTabDetails.images ? (
                        <div className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 p-4 sm:p-6 md:grid ${
                          activeTabDetails.images.length === 4 ? 'md:grid-cols-4' : 
                          activeTabDetails.images.length === 3 ? 'md:grid-cols-3' : 
                          'md:grid-cols-2'
                        }`}>
                          {activeTabDetails.images.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="relative group/screen cursor-zoom-in overflow-hidden rounded-md border border-divider/50 shadow-sm flex-shrink-0 w-[85%] sm:w-[65%] md:w-auto snap-center"
                              onClick={() => setLightboxImage(img)}
                            >
                              <img
                                src={getAssetUrl(img)}
                                alt={`${activeTabDetails.alt} ${idx + 1}`}
                                className="w-full h-auto max-h-[60vh] object-contain transition-all duration-700 group-hover/screen:brightness-[0.95] select-none"
                                loading="lazy"
                              />
                              {/* Zoom Indicator */}
                              <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 bg-base-card/95 backdrop-blur-sm border border-divider p-1.5 rounded-md shadow-lg pointer-events-none">
                                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div 
                          className="relative cursor-zoom-in group/screen"
                          onClick={() => setLightboxImage(activeTabDetails.image || "")}
                        >
                          <img
                            src={getAssetUrl(activeTabDetails.image || "")}
                            alt={activeTabDetails.alt}
                            className="w-full h-auto max-h-[65vh] object-contain mx-auto block transition-all duration-700 group-hover/screen:brightness-[0.98] select-none"
                            key={activeTourTab} // forces element reload for animation
                            width="1280"
                            height="800"
                          />
                          {/* Zoom Indicator Badge in Bottom-Right */}
                          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 bg-base-card/95 backdrop-blur-sm border border-divider px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-none select-none">
                            <svg
                              className="w-3.5 h-3.5 text-accent animate-pulse"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                              />
                            </svg>
                            <span className="text-[10px] font-mono font-bold text-main">
                              Click to view full size
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Prev/Next buttons overlay for mobile devices */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevTab();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-base-card/85 backdrop-blur-sm text-main hover:bg-base-muted/80 transition-all shadow-md active:scale-95 md:hidden"
                        aria-label="Previous screenshot"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextTab();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-base-card/85 backdrop-blur-sm text-main hover:bg-base-muted/80 transition-all shadow-md active:scale-95 md:hidden"
                        aria-label="Next screenshot"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Floating Application Navigation Dock (Desktop Only) */}
                  {/* min-height reserves space before JS hydration to prevent CLS */}
                  <div
                    className="hidden md:flex relative mt-6 justify-center"
                    style={{ minHeight: "80px" }}
                  >
                    <Dock items={dockItems} />
                  </div>

                  {/* Normal Screenshot Changing Navigation for Mobile Devices */}
                  <div className="flex md:hidden flex-col gap-3 mt-4">
                    {/* Horizontal Scrollable Tabs */}
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none snap-x mask-fade-edges px-1">
                      {tourTabs.map((tab) => {
                        const isActive = activeTourTab === tab.id;
                        const tabIcon = {
                          dashboard: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="20" x2="18" y2="10" />
                              <line x1="12" y1="20" x2="12" y2="4" />
                              <line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                          ),
                          console: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="4 17 10 11 4 5" />
                              <line x1="12" y1="19" x2="20" y2="19" />
                            </svg>
                          ),
                          tunnels: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          ),
                          plugins: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                              <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                          ),
                          backups: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          ),
                          runtimes: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                              <line x1="6" y1="1" x2="6" y2="4" />
                              <line x1="10" y1="1" x2="10" y2="4" />
                              <line x1="14" y1="1" x2="14" y2="4" />
                            </svg>
                          ),
                          remote: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                          ),
                          mobile: (
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                              <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                          ),
                        }[tab.id] || <span>🔍</span>;

                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTourTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono font-bold whitespace-nowrap snap-center transition-all cursor-pointer ${
                              isActive
                                ? "bg-accent/15 border-accent text-accent shadow-sm"
                                : "bg-base-card border-divider text-main-muted active:bg-base-muted/40"
                            }`}
                          >
                            {tabIcon}
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Dot Page Indicator for mobile */}
                    <div className="flex justify-center gap-2 mt-1">
                      {tourTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTourTab(tab.id)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            activeTourTab === tab.id
                              ? "w-6 bg-accent"
                              : "w-2 bg-divider hover:bg-main-muted/50"
                          }`}
                          aria-label={`Go to ${tab.label} screenshot`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Screenshot Details Info Card */}
                  <Suspense fallback={null}>
                    <ElectricBorder
                      color={theme === "dark" ? "#a78bfa" : "#4f46e5"}
                      speed={0.7}
                      chaos={0.05}
                      borderRadius={12}
                      className="w-full"
                    >
                      <div className="border border-divider bg-base-card/65 backdrop-blur-md p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-black text-main flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-accent"></span>
                          {activeTabDetails.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-main-muted">
                          {activeTabDetails.description}
                        </p>

                        <div className="mt-6 grid sm:grid-cols-2 gap-4">
                          {activeTabDetails.bullets.map((bullet, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs font-mono text-main-muted"
                            >
                              <svg
                                className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ElectricBorder>
                  </Suspense>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Supported Server Software Grid */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
            <div>
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
                SERVER STACK ENGINE
              </span>
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
                Support for every major server software.
              </h2>
              <p
                className="mt-3 sm:mt-4 text-sm sm:text-base leading-6"
                style={{ color: "var(--main-muted)" }}
              >
                PocketMC resolves available server versions from upstream APIs
                and manifests dynamically, facilitating installation for:
              </p>

              <BorderGlow
                className="mt-6 shadow-sm cursor-default"
                edgeSensitivity={30}
                glowColor={theme === "dark" ? "263 90 70" : "243 75 59"}
                backgroundColor="var(--base-card)"
                borderRadius={12}
                glowRadius={30}
                glowIntensity={0.8}
                fillOpacity={0.06}
                colors={
                  theme === "dark"
                    ? ["#a78bfa", "#6366f1", "#ec4899"]
                    : ["#4f46e5", "#3b82f6", "#db2777"]
                }
              >
                <div className="p-5 flex gap-4 items-center">
                  <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
                    🌐
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-main">
                      Geyser + Floodgate Provisions
                    </h4>
                    <p className="text-xs text-main-muted mt-1 leading-5">
                      Java server instances can be patched automatically with
                      Geyser dependencies to support Bedrock client joins
                      natively on the same computer.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {isLoading
                ? // Skeleton loaders
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-5 flex gap-4 items-start border border-divider rounded-xl bg-base-card/20 backdrop-blur"
                    >
                      <Skeleton className="w-12 h-12 flex-shrink-0 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-4 w-24 rounded" />
                          <Skeleton className="h-4 w-12 rounded" />
                        </div>
                        <Skeleton className="h-3 w-full rounded mb-2" />
                        <Skeleton className="h-3 w-5/6 rounded" />
                      </div>
                    </div>
                  ))
                : serverSoftwares.map((software) => (
                    <BorderGlow
                      key={software.name}
                      edgeSensitivity={30}
                      glowColor={theme === "dark" ? "263 90 70" : "243 75 59"}
                      backgroundColor="var(--base-card)"
                      borderRadius={12}
                      glowRadius={30}
                      glowIntensity={0.8}
                      fillOpacity={0.06}
                      colors={
                        theme === "dark"
                          ? ["#a78bfa", "#6366f1", "#ec4899"]
                          : ["#4f46e5", "#3b82f6", "#db2777"]
                      }
                      className="shadow-sm select-none group cursor-pointer"
                    >
                      <div className="p-5 flex gap-4 items-start">
                        <div className="w-12 h-12 flex-shrink-0 bg-base-muted p-2 rounded-lg border border-divider flex items-center justify-center overflow-hidden">
                          <img
                            src={getAssetUrl(software.icon)}
                            alt={software.name}
                            className="w-full h-full object-contain filter group-hover:scale-105 transition-transform"
                            width="48"
                            height="48"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-main">
                              {software.name}
                            </h3>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-divider bg-base-muted text-main-muted font-semibold leading-none">
                              {software.tag}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-main-muted leading-5">
                            {software.description}
                          </p>
                        </div>
                      </div>
                    </BorderGlow>
                  ))}
            </div>
          </div>
        </section>

        {/* Feature Deep Dive Accordion */}
        <section
          id="roadmap"
          className="relative z-10 border-t border-divider bg-base-muted/30 py-16 sm:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
                UNDER THE HOOD
              </span>
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
                Every detail engineered for stability.
              </h2>
              <p className="mt-4 text-main-muted text-sm">
                We look into real server errors (like locked session files, port
                clashes, network loopback restrictions, Adoptium hash failures)
                and fix them behind the scenes.
              </p>
            </div>

            <div className="space-y-3">
              {isLoading
                ? // Skeleton loaders
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="px-6 py-5 border border-divider rounded-xl bg-base-card/20 backdrop-blur"
                    >
                      <div className="flex gap-4 items-start">
                        <Skeleton className="w-10 h-10 flex-shrink-0 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 rounded mb-2" />
                          <Skeleton className="h-3 w-48 rounded" />
                        </div>
                        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      </div>
                    </div>
                  ))
                : detailFeatures.map((group, idx) => {
                    const isOpen = !!openAccordions[idx];
                    return (
                      <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                          isOpen
                            ? "border-accent/40 shadow-[0_0_24px_-4px_var(--color-accent,#7c3aed)]/30"
                            : "border-divider shadow-sm"
                        } bg-base-card/60 backdrop-blur`}
                      >
                        {/* Animated left accent bar */}
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b from-accent via-purple-400 to-cyan-400"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{
                            scaleY: isOpen ? 1 : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          style={{ transformOrigin: "top" }}
                        />

                        <button
                          onClick={() => toggleAccordion(idx)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                        >
                          <div className="flex gap-4 items-center">
                            {/* Animated icon container */}
                            <motion.div
                              animate={{
                                backgroundColor: isOpen
                                  ? "rgba(124,58,237,0.18)"
                                  : "rgba(124,58,237,0.08)",
                                borderColor: isOpen
                                  ? "rgba(124,58,237,0.45)"
                                  : "rgba(124,58,237,0.18)",
                                boxShadow: isOpen
                                  ? "0 0 14px -2px rgba(124,58,237,0.45)"
                                  : "none",
                              }}
                              transition={{ duration: 0.3 }}
                              className="w-10 h-10 flex-shrink-0 border rounded-lg flex items-center justify-center text-accent"
                            >
                              <motion.div
                                animate={{
                                  rotate: isOpen ? 360 : 0,
                                  scale: isOpen ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                              >
                                {group.id === "lifecycle" && (
                                  <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                                    <path d="M12 12l-6.5 6.5" />
                                    <path d="M11.5 3A16.5 16.5 0 0 0 21 12.5v.5h-1.5a3.5 3.5 0 0 1-3.5-3.5v-1a3.5 3.5 0 0 1-3.5-3.5V3.5A3.5 3.5 0 0 1 11.5 3z" />
                                    <path d="M8.5 8.5L3 14" />
                                  </svg>
                                )}
                                {group.id === "ai" && (
                                  <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect
                                      x="3"
                                      y="11"
                                      width="18"
                                      height="10"
                                      rx="2"
                                    />
                                    <circle cx="12" cy="5" r="2" />
                                    <path d="M12 7v4" />
                                    <line x1="8" y1="16" x2="8.01" y2="16" />
                                    <line x1="16" y1="16" x2="16.01" y2="16" />
                                  </svg>
                                )}
                                {group.id === "diagnostics" && (
                                  <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                  </svg>
                                )}
                              </motion.div>
                            </motion.div>

                            <div>
                              <h3 className="text-base font-bold text-main group-hover:text-accent transition-colors duration-200 font-mono">
                                {group.title}
                              </h3>
                              <p className="text-xs text-main-muted mt-1 leading-none">
                                {group.description}
                              </p>
                            </div>
                          </div>

                          {/* Animated chevron */}
                          <motion.div
                            animate={{
                              rotate: isOpen ? 180 : 0,
                              backgroundColor: isOpen
                                ? "var(--color-accent, #7c3aed)"
                                : "transparent",
                              boxShadow: isOpen
                                ? "0 0 12px -2px rgba(124,58,237,0.6)"
                                : "none",
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-sm font-bold flex-shrink-0"
                          >
                            <motion.svg
                              className="w-4 h-4"
                              style={{
                                color: isOpen
                                  ? "white"
                                  : "var(--color-main-muted, #888)",
                              }}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </motion.svg>
                          </motion.div>
                        </button>

                        {/* Animated content panel */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="border-t border-divider/60 p-6 bg-gradient-to-b from-accent/[0.03] to-transparent">
                                <div className="space-y-0">
                                  {group.items.map((item, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -12 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.25,
                                        delay: i * 0.055,
                                        ease: "easeOut",
                                      }}
                                      className="flex items-start gap-3 text-xs leading-5 font-mono group/item py-2 border-b border-divider/30 last:border-0"
                                    >
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                          duration: 0.2,
                                          delay: i * 0.055 + 0.1,
                                          type: "spring",
                                          stiffness: 300,
                                        }}
                                        className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0 shadow-[0_0_6px_1px_rgba(124,58,237,0.5)]"
                                      />
                                      <span className="text-main-muted group-hover/item:text-main transition-colors duration-150">
                                        {item}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
            </div>
          </div>
        </section>

        {/* Tool Comparison Table Section */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded inline-block">
              TOOL COMPARISON
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
              How PocketMC Stacks Up
            </h2>
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--main-muted)" }}
            >
              Compare local self-hosting with traditional panels, cloud hosting
              services, wrappers, and P2P solutions.
            </p>
          </div>

          <div className="border border-divider rounded-xl overflow-hidden bg-base-card/40 backdrop-blur-md shadow-sm relative z-10">
            <div className="md:hidden text-center bg-accent/10 border-b border-divider py-2 px-4 text-xs font-mono text-accent animate-pulse font-bold">
              ← Swipe horizontally to see the comparison →
            </div>
            <div className="overflow-x-auto scrollbar-none">
              <Table className="min-w-[850px] md:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Tool</TableHead>
                    <TableHead className="w-[200px]">Category</TableHead>
                    <TableHead className="w-[280px]">Core Strength</TableHead>
                    <TableHead>Where PocketMC Wins</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, idx) => {
                    const isFeatured = row.isFeatured;
                    return (
                      <TableRow
                        key={idx}
                        className={
                          isFeatured
                            ? "bg-accent/5 dark:bg-accent/10 hover:bg-accent/8 dark:hover:bg-accent/15 border-l-4 border-accent"
                            : ""
                        }
                      >
                        <TableCell className="font-bold text-main py-4">
                          {isFeatured ? (
                            <div className="flex items-center gap-1.5 text-accent font-black">
                              <span className="text-xs">⚡</span>
                              {row.tool}
                            </div>
                          ) : (
                            row.tool
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <span
                            className={`inline-flex px-2 py-0.5 text-[10px] font-semibold font-mono rounded border ${
                              isFeatured
                                ? "bg-accent/15 border-accent/40 text-accent"
                                : "bg-base-muted/30 border-divider text-main-muted"
                            }`}
                          >
                            {row.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-main-muted text-xs leading-5 py-4">
                          {row.strength}
                        </TableCell>
                        <TableCell
                          className={`text-xs leading-5 py-4 ${isFeatured ? "text-main font-bold" : "text-main-muted"}`}
                        >
                          {isFeatured ? (
                            <span className="text-main dark:text-zinc-100">
                              {row.win}
                            </span>
                          ) : (
                            row.win
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p
              className="mt-4 text-left text-[10px] sm:text-xs font-mono leading-relaxed px-4"
              style={{ color: "var(--main-muted)" }}
            >
              * Comparison based on public documentation as of May 2026. Setup
              complexity varies based on standard manual terminal/scripts or
              Docker network configuration.
            </p>
          </div>
        </section>

        {/* System Requirements & Quick Start */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {isLoading ? (
              <>
                {/* Quick Start Skeleton */}
                <div className="border border-divider p-6 sm:p-8 rounded-lg sm:rounded-xl bg-base-card/20 backdrop-blur">
                  <Skeleton className="h-6 w-32 rounded mb-4" />
                  <div className="space-y-4 sm:space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32 rounded mb-1.5" />
                          <Skeleton className="h-3 w-full rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Requirements Skeleton */}
                <div className="border border-divider p-8 rounded-xl bg-base-card/20 backdrop-blur">
                  <Skeleton className="h-6 w-40 rounded mb-6" />
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="border-b border-divider/60 pb-3 flex flex-col sm:flex-row sm:justify-between gap-1"
                      >
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-4 w-32 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 border border-divider bg-base-muted/30 rounded-lg">
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-3 w-5/6 rounded" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Quick Start Card */}
                <div className="border border-divider p-6 sm:p-8 rounded-lg sm:rounded-xl bg-base-card/40 backdrop-blur shadow-sm relative overflow-hidden">
                  {/* LiquidEther Background */}
                  <div className="absolute inset-0 -z-10 pointer-events-none">
                    <Suspense fallback={null}>
                      <LiquidEther
                        colors={
                          theme === "dark"
                            ? ["#6366f1", "#8b5cf6", "#a78bfa"]
                            : ["#4f46e5", "#60a5fa", "#c084fc"]
                        }
                        mouseForce={5}
                        cursorSize={40}
                        resolution={0.4}
                        autoDemo={false}
                      />
                    </Suspense>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-main font-mono mb-4 sm:mb-6 relative z-10">
                    🏁 Quick Start
                  </h3>

                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Choose App Root Path",
                        desc: "When launching PocketMC for the first time, choose an empty target folder where instances, runtimes, logs, and tunnel files will be organized.",
                      },
                      {
                        step: "02",
                        title: "Create Your First Server",
                        desc: "Select a server family (e.g. Paper, Fabric, BDS), choose a release version, accept the Minecraft EULA, and let the background download handle files.",
                      },
                      {
                        step: "03",
                        title: "Launch & Connect",
                        desc: "Click Start. Open the Minecraft client and connect locally using 'localhost' or your LAN IP. Port diagnostics will resolve conflicts.",
                      },
                      {
                        step: "04",
                        title: "Go Public (Optional)",
                        desc: "Configure Playit.gg tunnels in the client directly. Distribute the numeric or alphanumeric share address to invite friends.",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex gap-4 items-start group"
                      >
                        <span className="font-mono text-xs font-bold flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-base-muted text-accent border border-divider shadow-sm group-hover:scale-105 transition-transform duration-300">
                          {item.step}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-main">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-main-muted leading-5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Requirements Card */}
                <div className="flex flex-col justify-between border border-divider p-8 rounded-xl bg-base-card/40 backdrop-blur shadow-sm relative overflow-hidden">
                  {/* LiquidEther Background */}
                  <div className="absolute inset-0 -z-10 pointer-events-none">
                    <Suspense fallback={null}>
                      <LiquidEther
                        colors={
                          theme === "dark"
                            ? ["#6366f1", "#8b5cf6", "#a78bfa"]
                            : ["#4f46e5", "#60a5fa", "#c084fc"]
                        }
                        mouseForce={5}
                        cursorSize={40}
                        resolution={0.4}
                        autoDemo={false}
                      />
                    </Suspense>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-main font-mono mb-6">
                      💻 System Requirements
                    </h3>

                    <div className="space-y-4 font-mono text-xs">
                      {[
                        [
                          "Operating System",
                          "Windows 10 Version 1809 (Build 17763) or newer / Windows 11",
                        ],
                        ["Architecture", "x64 Required"],
                        [
                          "Memory (RAM)",
                          "4 GB Minimum / 8 GB or more recommended",
                        ],
                        [
                          "Local Runtimes",
                          ".NET 8 Desktop Runtime (app prompts installer if missing)",
                        ],
                        [
                          "Network Details",
                          "Local loopback access helper (CheckNetIsolation) handles BDS player restrictions",
                        ],
                        [
                          "Internet Link",
                          "Required for runtime/server downloads, provider metadata, marketplace browsing, updates, and Playit.gg",
                        ],
                      ].map(([specName, specVal]) => (
                        <div
                          key={specName}
                          className="border-b border-divider/60 pb-3 flex flex-col sm:flex-row sm:justify-between gap-1"
                        >
                          <span className="font-semibold text-main">
                            {specName}
                          </span>
                          <span className="text-main-muted text-left sm:text-right max-w-sm leading-5">
                            {specVal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-4 border border-divider bg-base-muted/30 rounded-lg flex items-start gap-3 relative z-10">
                    <span className="text-lg">⚙️</span>
                    <p className="text-xs text-main-muted leading-5 font-mono">
                      No local global setup needed. PocketMC coordinates
                      app-local Adoptium Java versions and PHP runtimes
                      dynamically.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Frequently Asked Questions Section */}
        <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 border-t border-divider">
          <div className="text-center mb-12 sm:mb-16">
            <span
              className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded inline-block"
              style={{
                color: "var(--accent)",
                background: "var(--base-muted)",
              }}
            >
              QUESTIONS &amp; ANSWERS
            </span>
            <h2
              className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em]"
              style={{ color: "var(--main)" }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="mt-4 text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--main-muted)" }}
            >
              Find answers to common questions about setting up, securing, and
              managing your Minecraft server environments.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                    isOpen ? "border-accent/40" : "border-divider"
                  }`}
                  style={{
                    background: "var(--base-card)",
                    boxShadow: isOpen
                      ? "0 0 24px -4px color-mix(in srgb, var(--accent) 30%, transparent)"
                      : "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Animated left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b from-accent via-purple-400 to-cyan-400"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{
                      scaleY: isOpen ? 1 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                  />

                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                  >
                    <h3
                      className="text-sm sm:text-base font-bold pr-4 transition-colors duration-200"
                      style={{ color: "var(--main)" }}
                    >
                      {faq.q}
                    </h3>

                    {/* Animated chevron */}
                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        backgroundColor: isOpen
                          ? "var(--color-accent, #7c3aed)"
                          : "transparent",
                        boxShadow: isOpen
                          ? "0 0 12px -2px rgba(124,58,237,0.6)"
                          : "none",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full border border-divider flex items-center justify-center text-sm font-bold flex-shrink-0"
                    >
                      <motion.svg
                        className="w-4 h-4"
                        style={{
                          color: isOpen
                            ? "white"
                            : "var(--color-main-muted, #888)",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </motion.div>
                  </button>

                  {/* Animated content panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="p-6"
                          style={{
                            borderTop: "1px solid var(--divider)",
                          }}
                        >
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              color: "var(--main-muted)",
                              lineHeight: "1.75",
                            }}
                          >
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Pre-footer Call to Action */}
        <section className="relative z-10 border-t border-divider bg-base-muted/50 py-24 overflow-hidden isolate">
          {/* Retro Pixelated Snow Backdrop */}
          <div
            className={`absolute inset-0 -z-10 pointer-events-none ${theme === "dark" ? "opacity-15" : "opacity-[0.03]"}`}
          >
            <Suspense fallback={null}>
              <PixelSnow
                color={theme === "dark" ? "#ffffff" : "#4f46e5"}
                flakeSize={0.012}
                minFlakeSize={1.4}
                pixelResolution={200}
                speed={0.9}
                density={0.18}
                direction={110}
                variant="square"
                brightness={1.0}
              />
            </Suspense>
          </div>
          <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] rounded-full glow-orb opacity-50 pointer-events-none"></div>

          <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted px-3 py-1 rounded">
              GET STARTED TODAY
            </span>
            <h2 className="mt-6 text-3xl font-black md:text-6xl tracking-[-0.05em] leading-[0.95] text-main">
              Start a server without turning setup into a chore.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-base text-main-muted">
              Enjoy full automation, Adoptium managed runtimes, safe scheduled
              cron backups, Modrinth marketplace installers, and zero port
              forwarded tunnels.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
              <a
                href="https://github.com/PocketMC/pocket-mc-windows/releases/latest"
                className="inline-flex h-12 items-center justify-center bg-gradient-to-r from-indigo-600 to-accent dark:from-violet-500 dark:to-indigo-500 px-8 text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/20 dark:shadow-violet-500/25 active:scale-[0.98] rounded-md font-mono"
              >
                Download for Windows
              </a>
              <a
                href="https://github.com/PocketMC/pocket-mc-windows"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center border border-divider bg-base px-8 text-sm font-bold text-main transition-colors hover:bg-base-muted rounded-md gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>Star on GitHub</span>
              </a>
              <a
                href="https://discord.gg/h27uNCaxPH"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center border border-divider bg-base px-8 text-sm font-bold text-main transition-colors hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] rounded-md gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                <span>Join Discord</span>
              </a>
            </div>

            <div className="mt-8 flex justify-center items-center">
              <a
                href="https://www.buymeacoffee.com/sahaj33"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-main-muted hover:text-[#FF813F] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M2 21h18v-2H2v2zM20 8h-2V5h2v3zm2-5h-4v7h4V3zm-6 2H4v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5z" />
                </svg>
                <span>Support the Project</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-divider px-4 sm:px-6 py-8 sm:py-12 bg-base/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:gap-8 md:flex-row items-center">
            <div className="flex flex-col gap-2 items-center md:items-start flex-shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={getAssetUrl("/logo.webp")}
                  alt="PocketMC Logo"
                  className="h-6 w-6 object-contain"
                  width="24"
                  height="24"
                />
                <p
                  className="font-mono text-xs leading-tight"
                  style={{ color: "var(--main-muted)" }}
                >
                  © {new Date().getFullYear()} PocketMC Contributors. Licensed
                  under MIT.
                </p>
              </div>
              <p
                className="text-[10px] text-center md:text-left font-mono leading-tight"
                style={{ color: "var(--main-muted)" }}
              >
                PocketMC is an open-source project maintained by{" "}
                <a
                  href="https://github.com/sahaj33-op"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-bold"
                >
                  sahaj33-op
                </a>
                ,{" "}
                <a
                  href="https://github.com/divyviradiya2"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-bold"
                >
                  divyviradiya2
                </a>
                , and the Minecraft community.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-6 font-mono text-xs flex-wrap justify-center">
              <a
                href="https://github.com/PocketMC"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                GitHub Organization
              </a>
              <a
                href="https://discord.gg/h27uNCaxPH"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#5865F2] transition-colors whitespace-nowrap"
              >
                Discord
              </a>
              <a
                href="https://www.buymeacoffee.com/sahaj33"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF813F] transition-colors whitespace-nowrap"
              >
                Buy Me a Coffee
              </a>
              <a
                href="https://github.com/PocketMC/pocket-mc-windows"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                Windows App
              </a>
              <a
                href="https://github.com/PocketMC/pocket-mc-website"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                Website Repo
              </a>
            </div>
          </div>
        </footer>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="fixed inset-0 z-55 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
            >
              {/* Prev/Next Navigation Buttons inside Lightbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevTab();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/15 transition-all shadow-lg active:scale-95 cursor-pointer"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTab();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/15 transition-all shadow-lg active:scale-95 cursor-pointer"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2.5 rounded-full cursor-pointer z-60"
                aria-label="Close image viewer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                className="relative max-w-[90vw] max-h-[80vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-neutral-900 cursor-default"
              >
                <img
                  src={getAssetUrl(lightboxImage || "")}
                  alt={activeTabDetails.alt}
                  className="w-full h-auto max-h-[80vh] object-contain select-none"
                  loading="lazy"
                />
              </motion.div>

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 text-center text-white max-w-2xl px-4"
              >
                <h4 className="font-mono font-bold text-sm tracking-wide text-accent">
                  {activeTabDetails.label}
                </h4>
                <p className="text-sm text-neutral-300 mt-1">
                  {activeTabDetails.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Social/Support Buttons Overlay */}
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          {/* Discord Floating Button */}
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

          {/* Buy Me a Coffee Floating Pill */}
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
      </ClickSpark>
    </main>
  );
}

// ----------------------------------------------------
// Header Component (With Animated Theme Switcher)
// ----------------------------------------------------
interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

function Header({ theme, toggleTheme }: HeaderProps) {
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
              href="#servers"
              className="font-semibold text-main-muted hover:text-accent transition-colors"
            >
              Servers
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

export default App;
