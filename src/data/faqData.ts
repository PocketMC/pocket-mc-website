export const faqData = [
  {
    q: "How do my friends join the server, and how can I manage it remotely?",
    a: "PocketMC supports remote access for both gaming and administration:\n\n1. For Players (Joining Minecraft): Use the built-in Playit.gg tunnel agent. It routes your local port to a public address (e.g., example.playit.gg) without any router configuration. Friends can copy this address directly into Minecraft to join.\n2. For Admins (Managing Remotely): Enable the Remote Control Dashboard in settings. This hosts a secure, password-protected web panel accessible over LAN or internet (via Playit.gg HTTPS or Cloudflare Quick Tunnels). You can pair your phone instantly by scanning the dashboard's QR code or link the PocketMC Discord Bot to DM you access tokens.",
  },
  {
    q: "Does PocketMC require Windows administrator privileges?",
    a: "No. PocketMC runs entirely in user-space and installs per-user. It downloads Adoptium JRE runtimes locally and maps isolated instance directories without requiring administrative elevation or polluting your Windows system environment variables.",
  },
  {
    q: "Do I need to install Java or PHP on my computer beforehand?",
    a: "No. PocketMC manages all runtimes locally. It automatically provisions the correct Adoptium Java version (8, 11, 17, 21, or 25) based on your Minecraft server type and version. For Bedrock PocketMine-MP servers, it installs an app-local, optimized PHP 8.2 runtime automatically.",
  },
  {
    q: "How does Playit.gg tunneling work? Do I need to configure port forwarding?",
    a: "Zero router configuration is required. PocketMC features an integrated Playit.gg agent setup wizard. Once paired, it automatically provisions background agent processes, maps local ports (Java, Bedrock, Geyser, PocketMine, and Simple Voice Chat), and creates public addresses for your players.",
  },
  {
    q: "Can Bedrock (console/mobile) players join a Java server managed by PocketMC?",
    a: "Yes. PocketMC supports automatic GeyserMC and Floodgate setup during server creation for supported Java server loaders. It also scans your mod/plugin folders to verify cross-play status and displays active cross-play indicators on your dashboard.",
  },
  {
    q: "Where are my server files stored and how secure are the backups?",
    a: "All server files are stored 100% locally on your machine in the root folder you select. PocketMC's built-in backup engine locks active servers using RCON save-holding before copying, skips lock files like session.lock to avoid conflicts, and offers secure, OAuth-based replication directly to Google Drive, Dropbox, and OneDrive.",
  },
  {
    q: "Can I import existing worlds or custom Bedrock add-ons?",
    a: "Yes. You can import existing world folders directly, place custom JAR files, or ingest Bedrock .mcpack, .mcaddon, and world .zip files. PocketMC automatically parses manifests, maps dependency requirements, and registers packs.",
  },
  {
    q: "Are my server logs shared with third-party AI systems?",
    a: "Only if you explicitly configure an AI provider and request a log summary. PocketMC pre-processes and sanitizes all logs locally (automatically scrubbing IP addresses, emails, and personal info) before sending them to your provider of choice (Google Gemini, OpenAI, Claude, Mistral, Groq, or local Ollama).",
  },
  {
    q: "Will my server stay online if my Windows PC goes to sleep?",
    a: "PocketMC includes native Windows power integration that automatically prevents your PC from entering sleep mode while any Minecraft server instance is actively running. Once all servers are stopped, standard Windows power saving behaviors resume.",
  },
];
