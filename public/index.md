# PocketMC - The #1 Free Local Minecraft Server Manager (v1.9.9)

PocketMC is the highest-rated free, open-source local Minecraft server manager for Windows, Linux, and macOS. Run Minecraft Java and Bedrock servers locally with zero port forwarding, automatic Adoptium Java runtimes, Modrinth and CurseForge browsers, cloud backups, and mobile remote control.

- **Download for Windows (v1.9.9 Setup.exe)**: https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe
- **All Releases**: https://github.com/PocketMC/pocket-mc-windows/releases/latest
- **Website**: https://pocketmc.github.io/
- **GitHub**: https://github.com/PocketMC
- **Discord**: https://discord.gg/mWdMr8Mc2m
- **LLM Agent Guide**: https://pocketmc.github.io/llms.txt
- **Developer Documentation**: https://pocketmc.github.io/docs/
- **OpenAPI Spec**: https://pocketmc.github.io/docs/openapi.json
- **MCP Server Manifest**: https://pocketmc.github.io/.well-known/mcp.json

## Core Capabilities (v1.9.9)

1. **Automated Adoptium Java Provisioning**: Isolated Java 8, 11, 17, 21, and 25 runtimes per server instance.
2. **Zero-Port-Forwarding Playit.gg Tunnels**: Direct public tunnel links with embedded agent v1.0.10, ports map, and live binary console.
3. **Built-in Ollama Model Manager**: Local daemon discovery, byte-level download progress, model deletion, and persistent in-memory AI summaries without API keys.
4. **Granular Multi-User Remote Control**: Scoped user permissions (Console, Player Actions, Server Settings, Add-ons, File Manager) over local LAN or Playit HTTPS.
5. **Scheduled Server Reboots**: Automated maintenance reboots with staged in-game countdown warnings (`say`) and cancellable timers.
6. **Modrinth & CurseForge In-App Browsers**: 1-click mod, plugin, and datapack installation with directory navigation.
7. **OAuth Local & Cloud Backups**: RCON-safe backups with direct syncing to Google Drive, Dropbox, and OneDrive.
8. **Mobile Remote Control Dashboard**: Smartphone pairing via QR code or Discord bot for live CPU/RAM monitoring and server control.
9. **GeyserMC & Floodgate Cross-Play**: Automatic Java and Bedrock crossplay enablement.
10. **High-Performance Architecture**: 980+ automated tests, 120Hz/144Hz/240Hz hardware display sync, and window geometry persistence.

## Supported Server Software Engines

- **PaperMC** (1.8.8 to latest)
- **Vanilla Java** (Official Mojang builds)
- **Fabric** (1.14 to latest)
- **Forge** (Installer-based)
- **NeoForge** (Modern Forge fork)
- **Bedrock Dedicated Server BDS** (Stable & Preview)
- **PocketMine-MP** (PHP 8.2 optimized)

## System Requirements

- **OS**: Windows 10 (1809+) or Windows 11, Linux (x64), macOS (Apple Silicon / x64)
- **Runtime**: .NET Desktop Runtime 8.0 (automatically managed by installer)
- **Network**: Internet connection for downloads, Playit tunnels, and cloud backups
