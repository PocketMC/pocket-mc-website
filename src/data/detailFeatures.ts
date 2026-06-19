export const detailFeatures = [
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
