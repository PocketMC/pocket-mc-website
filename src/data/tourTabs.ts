export const tourTabs = [
  {
    id: "dashboard",
    label: "Live Dashboard",
    title: "Instant Server Lifecycle & Live Monitoring",
    image: "/screenshots/screenshot-dashboard.webp",
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
    image: "/screenshots/screenshot-console.webp",
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
    images: [
      "/screenshots/screenshot-plugins.webp",
      "/screenshots/mod-marketplace.webp",
      "/screenshots/screenshot-mod-management.webp"
    ],
    alt: "PocketMC Modrinth plugin and mod installer browsers",
    description:
      "Install and manage server-side mods, plugins, and modpacks directly from your UI. Native browsers for Modrinth and CurseForge handle downloads safely, while the integrated Mod and Plugin Management views allow you to enable, disable, or update add-ons without renaming files.",
    bullets: [
      "Native Modrinth browser — mods, plugins, and modpacks",
      "CurseForge browser via API key and Modrinth integration for PocketMine plugins",
      "Java metadata scanning: Fabric, Quilt, Forge, NeoForge, Paper metadata",
      "Bedrock pack (.mcpack, .mcaddon, .zip) ingestion and validation",
    ],
  },
  {
    id: "backups",
    label: "Config & Backups",
    title: "Server Configuration & Automated Backups",
    images: [
      "/screenshots/server-settings.webp",
      "/screenshots/screenshot-backups.webp"
    ],
    alt: "PocketMC Server Settings editor and Backups configuration view",
    description:
      "Server Config & Safety Safeguards:\nFine-tune server.properties via an interactive grid with live field tooltips and validation. Background guards prevent startup port collisions, verify Java/Adoptium version compatibility, and alert you if RAM allocations exceed 80% of host memory. Includes a native server icon cropper for Minecraft's native 64x64 PNG format.\n\nAutomated Backups & Safeguards:\nProtect your worlds. Backups trigger a safe RCON save-flush to prevent write corruption, calculate SHA-256 hashes to guarantee integrity, and sync to Google Drive, Dropbox, or OneDrive. Real-time disk space checks alert you at 2GB and halt backups under 1GB to protect the host filesystem.",
    bullets: [
      "Interactive server.properties editor with real-time description tooltips",
      "Port-conflict preflight checks and 80% system RAM warning guards",
      "Custom server icon image cropper (re-scaled to Minecraft native 64x64 format)",
      "Scheduled backups via custom Cron intervals and live-server RCON save sync",
      "SHA-256 archive integrity validation to prevent corrupted world restores",
      "Disk storage monitoring (warnings at 2GB; safety halts at 1GB free space)",
      "Automated cloud uploads to Google Drive, Dropbox, and OneDrive",
    ],
  },
  {
    id: "runtimes",
    label: "Java Provisioning",
    title: "App-Local Runtimes Manager",
    image: "/screenshots/java-runtimes.webp",
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
    label: "Remote Control Page",
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
    label: "Remote UI",
    title: "Responsive Mobile Web Dashboard",
    images: [
      "/screenshots/mobile-welcome.webp",
      "/screenshots/mobile-login.webp",
      "/screenshots/mobile-home.webp",
      "/screenshots/mobile-instances.webp",
      "/screenshots/mobile-console.webp",
      "/screenshots/mobile-players.webp"
    ],
    alt: "PocketMC Mobile Web Dashboard interfaces",
    description:
      "View live CPU/RAM metrics, stream colorized console logs, and moderate players directly from your phone. Features a secure browser pairing welcome portal and credentials-based login screen for protected remote access.",
    bullets: [
      "Secure browser pairing welcome portal and credentials authorization login",
      "Mobile-first responsive design for on-the-go administration",
      "One-touch server state controls (Start, Stop, Kill)",
      "Remote moderation: kick, ban, or op users from the mobile web interface",
    ],
  },
  {
    id: "settings",
    label: "App Settings",
    title: "Application Preferences & System Diagnostics",
    images: [
      "/screenshots/app-settings.webp",
      "/screenshots/about.webp"
    ],
    alt: "PocketMC App Settings and About Diagnostics views",
    description:
      "Application Preferences:\nConfigure global application behavior including Windows auto-start options, background update checks, and tray minimization preferences.\n\nDiagnostics & Contributor Panel:\nInspect local diagnostic reports, system architecture specs, runtime environments, open-source licensing, and project contributor credits.",
    bullets: [
      "Windows tray minimization and auto-run on boot settings",
      "Local diagnostics logging, reports, and debug file generation",
      "Adoptium JRE directory manager and global Java paths override",
      "Consolidated credits, licenses, and direct feedback panel",
    ],
  },
];
