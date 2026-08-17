export const comparisonData = [
  {
    tool: "PocketMC",
    category: "Native Multi-Platform Desktop App",
    strength: "Complete local Minecraft server management on Windows, Linux, and macOS",
    win: "Best overall fit for self-hosting across Windows, Linux, and macOS: Java (with NeoForge), native BDS, PocketMine-MP, Geyser/Floodgate crossplay, managed Adoptium/PHP runtimes, RCON-secured backups with automatic Google Drive/OneDrive/Dropbox cloud replication, auto-configured playit.gg & Cloudflare tunnels, AI log summaries, and active open-source trust.",
    isFeatured: true,
  },
  {
    tool: "SquidServers",
    category: "Desktop app",
    strength:
      "Very easy local hosting with BDS, Geyser, Playit.gg, backups, and metrics",
    win: "PocketMC has stronger open-source trust, cross-platform Linux and macOS clients, deeper PocketMine/Modrinth/Bedrock add-on support, safer backup/restore implementation, and broader runtime ownership.",
    isFeatured: false,
  },
  {
    tool: "auto-mcs",
    category: "Desktop GUI (Python Tkinter)",
    strength:
      "Python Tkinter GUI with playit.gg, Modrinth search, and custom scripting (amscript)",
    win: "PocketMC offers native Windows (WPF) and Linux/macOS (Avalonia UI) interfaces instead of a legacy Tkinter interface, provides native Bedrock Dedicated Server (BDS) and PocketMine-MP (PHP) instances out-of-the-box, and features scheduled RCON-held backups with built-in Google Drive, OneDrive, and Dropbox replication.",
    isFeatured: false,
    proof: {
      tool: "auto-mcs",
      title: "Technical Audit: auto-mcs",
      points: [
        {
          title: "Legacy UI Toolkit (Tkinter)",
          desc: "Implemented using Python's built-in Tkinter library rather than native desktop visual assets, leading to a legacy, custom rendering style.",
          file: "source/ui/amseditor.py",
          code: "from tkinter import Tk, Entry, Label, Canvas..."
        },
        {
          title: "No Native Bedrock Runtimes",
          desc: "Bedrock/crossplay support relies on downloading Geyser and Floodgate plugins to run on top of a Java instance. There is no engine implementation to download, run, or configure the native C++ Bedrock Dedicated Server (BDS) or PHP-based PocketMine-MP runtimes.",
          file: "source/core/server/addons.py",
          code: "addon = AddonWebObject('Geyser', 'bukkit', 'GeyserMC', ...)"
        },
        {
          title: "Lacks Cloud Backups",
          desc: "Backup management is restricted to local directory compression and does not support automatic uploads to Google Drive, OneDrive, or Dropbox.",
          file: "source/core/constants.py",
          code: "Paths only define local backup paths; no cloud replication modules found."
        }
      ]
    }
  },
  {
    tool: "MCSManager",
    category: "Web panel (Node.js)",
    strength: "Distributed, multi-user web panel for Minecraft and Steam servers",
    win: "PocketMC is local-first, running natively without requiring Node.js runtimes, database setup, daemon installation, or reverse-proxy configuration. It manages all Java/PHP runtimes automatically and provides a guided tunnel wizard, avoiding the high setup complexity of a distributed panel/daemon architecture.",
    isFeatured: false,
    proof: {
      tool: "MCSManager",
      title: "Technical Audit: MCSManager",
      points: [
        {
          title: "Distributed Architecture Complexity",
          desc: "Requires setting up both a web panel manager ('panel') and node daemon processes ('daemon') connecting over websockets. High setup overhead for typical single-PC host environments.",
          file: "README.md",
          code: "Panel and daemon split, requiring Node.js 16.20.2+ runtimes."
        },
        {
          title: "Lacks Automatic Runtimes",
          desc: "Does not automatically download, install, and map appropriate Adoptium Java or PHP versions dynamically per server type/version.",
          file: "daemon/src/app.ts",
          code: "Startup relies on pre-installed Java binary or manual paths."
        },
        {
          title: "No Built-in Public Tunnels",
          desc: "Requires manual networking configuration or setting up third-party tunnels manually (e.g. no built-in playit.gg pairing wizard).",
          file: "panel/src/",
          code: "Zero references to automated playit.gg agent provisioning."
        }
      ]
    }
  },
  {
    tool: "Crafty Controller",
    category: "Web panel (Python Tornado)",
    strength: "Python web panel supporting multi-server scheduling and backups",
    win: "PocketMC is native to Windows, Linux, and macOS, running local-first in user-space with zero pre-requisites. Crafty Controller is panel-first (requiring browser setup) and its documentation warns of a 90% risk of world chunk corruption/shredding when running under Docker Desktop/WSL on Windows. PocketMC also includes built-in playit.gg/Cloudflare tunnel auto-provisioning and direct cloud backups (Google Drive, OneDrive, Dropbox).",
    isFeatured: false,
    proof: {
      tool: "Crafty Controller",
      title: "Technical Audit: Crafty Controller",
      points: [
        {
          title: "Windows/Docker Chunk Corruption Risk",
          desc: "Official documentation warns of high risk of world chunk destruction when running under Docker Desktop/WSL on Windows upon stopping or restarting the Minecraft server.",
          file: "README.md",
          code: "On 'Stop' or 'Restart' of the MC Server, there is a 90% chance the World's Chunks will be shredded irreparably!"
        },
        {
          title: "Setup Pre-requisites & Security",
          desc: "Requires downloading, running, and configuring Python 3.10/3.11 environment bindings, and running Tornado servers with exposed browser ports locally.",
          file: "crafty/app/web.py",
          code: "Local host listening on port 8000; requires SSL keys manually configured."
        },
        {
          title: "No Native Playit Integration",
          desc: "Does not provide a built-in playit.gg agent controller or interactive pairing workflow.",
          file: "crafty/app/tunnels.py",
          code: "No references to automated playit tunnel setup; manual connection mapping only."
        }
      ]
    }
  },
  {
    tool: "Pterodactyl Panel",
    category: "Web panel & Wings daemon (Linux VPS)",
    strength: "Enterprise client-server web app (PHP/Laravel + Redis + Nginx) and Go daemon (Wings) over Docker for 24/7 Linux VPS and commercial hosting",
    win: "PocketMC is built for zero-sysadmin local desktop self-hosting on Windows, Linux, and macOS without requiring a Linux VPS, Docker engine, MariaDB database, Nginx reverse proxy, or router port forwarding. PocketMC provisions exact Adoptium Java/PHP runtimes automatically, avoids Docker cgroup OOM hard-kills with graceful RCON shutdown hooks, and includes built-in Playit.gg/Cloudflare tunnels and direct cloud sync (Google Drive, OneDrive, Dropbox).",
    isFeatured: false,
    proof: {
      tool: "Pterodactyl Panel",
      title: "Technical Audit: Pterodactyl Panel",
      points: [
        {
          title: "Multi-Service Web Stack & Daemon Overhead",
          desc: "Requires a dedicated Linux host, PHP 8.2+ Laravel framework with queue workers, MariaDB/MySQL database, Redis caching, and Nginx web server before pairing nodes with the Go-based Wings daemon over HTTP APIs. High infrastructure complexity for local gaming.",
          file: "docker-compose.example.yml",
          code: "services: { database: 'mariadb:11', cache: 'redis:alpine', panel: 'ghcr.io/pterodactyl/panel' }"
        },
        {
          title: "Process & Memory Handling (Docker OOM Hard-Kills)",
          desc: "Spikes above the container RAM ceiling trigger immediate OS-level 'kill -9' via Docker cgroup OOM killers, risking unwritten chunk corruption. PocketMC uses graceful RCON shutdown hooks and direct OS scheduling without container hard-kills.",
          file: "app/Repositories/Wings/DaemonServerRepository.php",
          code: "$this->getHttpClient()->post('/api/servers', ['uuid' => $this->server->uuid, 'start_on_completion' => $start])"
        },
        {
          title: "Runtime Management & Egg Maintenance",
          desc: "Java and PHP runtimes are tied to Docker container images and community 'Egg' templates requiring manual environment variable configuration, whereas PocketMC dynamically auto-provisions exact Adoptium Java (8-25) and PHP 8.2 runtimes.",
          file: "composer.json",
          code: "Dependencies tied to 'laravel/framework': '^12.60', 'predis/predis', and 'aws/aws-sdk-php'."
        },
        {
          title: "No Built-in Zero-Port-Forwarding Tunnels",
          desc: "Designed strictly for static-IP cloud servers. Lacks built-in automated tunnel provisioning (Playit.gg / Cloudflare) to allow friends to join local instances without router configuration.",
          file: "app/Services/Backups/InitiateBackupService.php",
          code: "Requires dedicated node allocations and public IP mapping; manual tunnel/reverse proxy only."
        }
      ]
    }
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
