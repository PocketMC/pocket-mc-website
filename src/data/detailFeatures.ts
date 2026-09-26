export const detailFeatures = [
  {
    id: "lifecycle",
    title: "Server Lifecycle & Safety",
    description:
      "WPF instance automation handles everything from creation to crash recovery.",
    items: [
      "Create isolated server instances with distinct config files in one app root",
      "Preflight port availability checks before boot to prevent crash-loops",
      "Resilient server lifecycle management preventing stdin stream concurrency crashes and file lock exceptions",
      "Skeleton loading states and rendering optimizations eliminating frame drops across screen transitions",
      "Clean RCON save-flush sequence (save-off/save-all) to ensure database consistency before backups",
      "RCON graceful termination hooks with process-kill fallback",
      "Crash monitoring captures recent sanitized output with auto-restart backoff and crash-loop limits (max 3)",
      "Server version update workflow with rollback, staging, and journal support",
      "Disk storage checks with warning indicators if target drive space falls below 2 GB",
      "Player Management: operators, bans, banned IPs, and whitelist controls",
      "Native Cloud Backups (Google Drive, Dropbox, OneDrive) with SHA-256 integrity verification",
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
      "Local credential encryption via Windows Data Protection API (DPAPI) bound to current user profile",
      "Memory over-allocation warning triggering when RAM bounds exceed 80% of system capacity",
      "Real-time parameters validation, value clamping, and interactive parameter descriptions",
      "Built-in CheckNetIsolation.exe UWP helper for Bedrock local loopback access",
      "Windows native Toast notifications and taskbar Tray integration",
      "Discord Welcome Bot Integration with automatic server role assignments",
      "Fully customizable Discord Rich Presence: custom state, details, image assets, buttons, and live preview card",
      "Dedicated Playit v1.0.10 agent binary console with color-coded log levels, search filtering, and copy controls",
      "Appearance options: custom wallpaper background upload, Wallpaper Blur Intensity (0-120px), Darkness & Dimming controls, and Mica/Acrylic backdrops",
      "Velopack automated startup updates with incremental file checks",
      "Dependency health scanner validating Adoptium, Playit, and marketplace APIs",
      "Centralized dynamic pocketmc.yml single-source-of-truth configuration engine",
    ],
  },
];
