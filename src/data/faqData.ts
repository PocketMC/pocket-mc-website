export const faqData = [
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
