export interface ProofAuditPoint {
	title: string;
	desc: string;
	file?: string;
	code?: string;
}

export interface ComparisonProof {
	claim: string;
	officialLinks: {
		label: string;
		url: string;
	}[];
	evidence: string[];
	points?: ProofAuditPoint[];
}

export interface CompetitorComparison {
	tool: string;
	icon?: string;
	badge?: string;
	category: string;
	coreStrength: string;
	pocketmcWins: string;
	isPocketMC?: boolean;
	proof?: ComparisonProof;
}

export const toolComparisons: CompetitorComparison[] = [
	{
		tool: 'PocketMC',
		icon: '/logo.webp',
		category: 'Native Windows Desktop App',
		coreStrength: 'Complete local Minecraft server management with zero setup overhead',
		pocketmcWins:
			'Runs locally on your Windows PC. Includes Java (with NeoForge), native BDS, PocketMine-MP, Geyser crossplay, managed Adoptium/PHP runtimes, safe cloud backups (Google Drive, OneDrive, Dropbox), zero-config Playit.gg tunnels, offline AI crash summaries, and open-source MIT code.',
		isPocketMC: true,
		proof: {
			claim:
				'100% free and open-source (MIT) Windows desktop application offering multi-engine runtime orchestration, automated cloud backups, and zero-port-forward tunnels.',
			officialLinks: [
				{ label: 'PocketMC GitHub Repository', url: 'https://github.com/PocketMC/pocket-mc-windows' },
				{ label: 'Official MIT License', url: 'https://github.com/PocketMC/pocket-mc-windows/blob/master/LICENSE' },
				{ label: 'Official Documentation', url: 'https://pocketmc.net/docs' }
			],
			evidence: [
				'Permissive MIT License: Complete source code publicly auditable and redistributable without proprietary restrictions.',
				'Multi-Engine Support: Orchestrates Paper, Fabric, Forge, NeoForge, official Bedrock Dedicated Server (BDS), and PocketMine-MP (PHP 8.2).',
				'Automated Zero-Port-Forward Tunnels: Embeds official Playit.gg agent (TCP 25565, Bedrock UDP 19132, Simple Voice Chat UDP 24454) and Cloudflare Quick Tunnels.',
				'RCON Cloud Backups: Enforces RCON save-holding and flushes before archive creation, syncing directly to Google Drive, Microsoft OneDrive, and Dropbox via DPAPI-secured OAuth tokens.'
			],
			points: [
				{
					title: 'Permissive Open-Source Licensing (MIT)',
					desc: 'Complete source code is publicly accessible and forkable on GitHub with zero proprietary restrictions, telemetry tracking, or paid licensing tiers.',
					file: 'LICENSE',
					code: 'MIT License Copyright (c) 2026 DS Labs / PocketMC'
				},
				{
					title: 'Automated Multi-Engine Runtime Provisioning',
					desc: 'Dynamically fetches and extracts Adoptium Java (8 through 25), handles headless Forge and NeoForge installers, installs official Bedrock Dedicated Server, and compiles PHP 8.2 pmmp runtimes.',
					file: 'PocketMC.Infrastructure/Services/JavaAdoptiumClient.cs',
					code: 'await DownloadAndExtractArchiveAsync(package.Binary.Package.Link, destinationDir);'
				},
				{
					title: 'Win32 Job Object Process Sandboxing',
					desc: 'Binds server child processes to Windows kernel Job Objects with kill-on-close limits, preventing orphaned Java or PHP background processes when the manager exits.',
					file: 'PocketMC.Infrastructure/ProcessManagement/JobObject.cs',
					code: 'JOBOBJECT_EXTENDED_LIMIT_INFORMATION { BasicLimitInformation = { LimitFlags = 0x2000 } }'
				},
				{
					title: 'Integrated Cloud Backups with RCON Synchronization',
					desc: 'Pauses world saving via RCON save-off and flushes chunk buffers before archiving, then replicates zip bundles directly to Google Drive, OneDrive, or Dropbox.',
					file: 'PocketMC.Infrastructure/Services/BackupService.cs',
					code: 'ExecuteRconCommandAsync("save-off"); ExecuteRconCommandAsync("save-all flush");'
				}
			]
		}
	},
	{
		tool: 'SquidServers',
		icon: '/icons/competitors/squidservers.webp',
		category: 'Desktop App',
		coreStrength:
			'User-friendly local hosting with official BDS, Geyser crossplay, Modrinth mod/plugin installer, Playit.gg tunnels, and metrics',
		pocketmcWins:
			'PocketMC is 100% free and open-source (MIT), provides native PocketMine-MP (PHP) runtime orchestration alongside Java and BDS, features RCON-synchronized backups with automated cloud replication (Google Drive, OneDrive, Dropbox), and includes built-in AI log summaries and Discord integrations.',
		proof: {
			claim:
				'SquidServers is a freemium proprietary desktop application. PocketMC provides full open-source licensing, native PocketMine-MP runtime orchestration, and automated cloud storage sync.',
			officialLinks: [
				{ label: 'SquidServers Official Website', url: 'https://squidservers.com' },
				{ label: 'SquidServers EULA & Terms', url: 'https://squidservers.com/eula' },
				{ label: 'SquidServers GitHub Organization', url: 'https://github.com/SquidServers' }
			],
			evidence: [
				'Proprietary Licensing: SquidServers terms of service and EULA explicitly restrict decompilation, reverse engineering, and modification of the desktop application; core client source code is closed.',
				'No PocketMine-MP Orchestration: SquidServers supports Java and Bedrock BDS, but does not provide managed PHP 8.2 runtime orchestration for Bedrock PocketMine-MP servers.',
				'Local-Only Backups: Does not provide direct OAuth integration for automated offsite replication to Google Drive, Dropbox, or OneDrive.',
				'Community Trust: PocketMC is published under the open-source MIT license on GitHub with zero proprietary vendor lock-in.'
			],
			points: [
				{
					title: 'Closed-Source Electron Distribution',
					desc: 'Built on Electron and distributed as proprietary closed-source software without public source code transparency or independent auditability.',
					file: 'support.squidservers.com/getting-started/what-is-squidservers/',
					code: 'Closed source. SquidServers is not open-source software and is not planned to be.'
				},
				{
					title: 'No PocketMine-MP or Bedrock PHP Runtimes',
					desc: 'Supports Java engines and Bedrock Dedicated Server (BDS), but lacks support for PocketMine-MP and does not provide automated PHP runtime orchestration for Bedrock plugin servers.',
					file: 'support.squidservers.com/getting-started/what-is-squidservers/',
					code: 'Supported: Vanilla, BDS, Paper, Forge, NeoForge, Fabric, Quilt. PocketMine-MP is not supported.'
				},
				{
					title: 'Local-Only Backups (No Cloud Replication)',
					desc: 'Backup management is restricted to local directory storage on the host machine. Does not offer automated cloud replication to Google Drive, OneDrive, or Dropbox.',
					file: 'support.squidservers.com/faq/is-squidservers-safe/',
					code: 'All manual and automatic backups stay on your computer. Your world files and data are never shared with or uploaded to any external servers.'
				},
				{
					title: 'No Native Remote Control Web Dashboard',
					desc: 'Operates exclusively as a local desktop window. Lacks an embedded web administration dashboard with mobile QR pairing or HTTPS tunnel exposure for remote management.',
					file: 'support.squidservers.com/server-setup/web-ui/',
					code: 'It is not possible to expose web UIs using the default free Minecraft TCP/UDP tunnels provided in SquidServers.'
				}
			]
		}
	},
	{
		tool: 'auto-mcs',
		icon: '/icons/competitors/auto-mcs.webp',
		category: 'Desktop GUI (Python Tkinter)',
		coreStrength:
			'Python Tkinter GUI with playit.gg, Modrinth search, and custom scripting (amscript)',
		pocketmcWins:
			'PocketMC offers a modern native Windows interface instead of a legacy Tkinter interface, provides native Bedrock Dedicated Server (BDS) and PocketMine-MP (PHP) instances out-of-the-box, and features scheduled RCON-held backups with built-in Google Drive, OneDrive, and Dropbox replication.',
		proof: {
			claim:
				'auto-mcs is built in Python using Tkinter and focuses on Java Edition servers. PocketMC provides a native Windows UI, native Bedrock BDS and PocketMine-MP support, and automated cloud backups.',
			officialLinks: [
				{ label: 'auto-mcs GitHub Repository', url: 'https://github.com/macarooni-man/auto-mcs' },
				{ label: 'auto-mcs License (GPL-3.0)', url: 'https://github.com/macarooni-man/auto-mcs/blob/main/LICENSE' }
			],
			evidence: [
				'UI Framework: auto-mcs uses Python Tkinter / CustomTkinter for desktop rendering rather than native Windows presentation.',
				'Engine Limitation: Focused exclusively on Java Edition servers (Paper, Purpur, Fabric, Forge, Spigot, Vanilla); lacks support for official Bedrock Dedicated Server (BDS) or PocketMine-MP.',
				'Backup Architecture: Backups are stored in local directories without automated OAuth-authenticated synchronization to Google Drive, Dropbox, or OneDrive.'
			],
			points: [
				{
					title: 'Legacy UI Toolkit (Tkinter)',
					desc: 'Implemented using Python\'s built-in Tkinter library rather than native desktop visual assets, leading to a legacy, custom rendering style.',
					file: 'source/ui/amseditor.py',
					code: 'from tkinter import Tk, Entry, Label, Canvas...'
				},
				{
					title: 'No Native Bedrock Runtimes',
					desc: 'Bedrock/crossplay support relies on downloading Geyser and Floodgate plugins to run on top of a Java instance. There is no engine implementation to download, run, or configure native C++ Bedrock Dedicated Server (BDS) or PHP-based PocketMine-MP runtimes.',
					file: 'source/core/server/addons.py',
					code: 'addon = AddonWebObject(\'Geyser\', \'bukkit\', \'GeyserMC\', ...)'
				},
				{
					title: 'Lacks Cloud Backups',
					desc: 'Backup management is restricted to local directory compression and does not support automatic uploads to Google Drive, OneDrive, or Dropbox.',
					file: 'source/core/constants.py',
					code: 'Paths only define local backup paths; no cloud replication modules found.'
				}
			]
		}
	},
	{
		tool: 'MCSManager',
		icon: '/icons/competitors/mcsmanager.webp',
		category: 'Web panel (Node.js)',
		coreStrength:
			'Distributed, multi-user web panel for Minecraft and Steam servers',
		pocketmcWins:
			'PocketMC is local-first, running natively without requiring Node.js runtimes, database setup, daemon installation, or reverse-proxy configuration. It manages all Java/PHP runtimes automatically and provides a guided tunnel wizard, avoiding the high setup complexity of a distributed panel/daemon architecture.',
		proof: {
			claim:
				'MCSManager is a distributed web-based panel designed for remote Linux/Windows multi-node management. PocketMC is a zero-sysadmin local desktop application with built-in networking.',
			officialLinks: [
				{ label: 'MCSManager Official Website', url: 'https://mcsmanager.com' },
				{ label: 'MCSManager GitHub Repository', url: 'https://github.com/MCSManager/MCSManager' },
				{ label: 'MCSManager Official Docs', url: 'https://docs.mcsmanager.com' }
			],
			evidence: [
				'Distributed Architecture: Requires deploying both a web panel daemon (`mcsmanager-web` on port 23333) and instance controller daemons (`mcsmanager-daemon` on port 24444) across host machines.',
				'Runtime Prerequisites: Requires installing and maintaining a Node.js runtime environment on the host computer.',
				'Setup Complexity: Geared towards VPS providers, community servers, and sysadmins managing multiple servers remotely, requiring manual network configuration and firewall rules compared to PocketMC\'s single-executable desktop workflow.'
			],
			points: [
				{
					title: 'Distributed Architecture Complexity',
					desc: 'Requires setting up both a web panel manager (\'panel\') and node daemon processes (\'daemon\') connecting over websockets. High setup overhead for typical single-PC host environments.',
					file: 'README.md',
					code: 'Panel and daemon split, requiring Node.js 16.20.2+ runtimes.'
				},
				{
					title: 'Lacks Automatic Runtimes',
					desc: 'Does not automatically download, install, and map appropriate Adoptium Java or PHP versions dynamically per server type and version.',
					file: 'daemon/src/app.ts',
					code: 'Startup relies on pre-installed Java binary or manual paths.'
				},
				{
					title: 'No Built-in Public Tunnels',
					desc: 'Requires manual networking configuration or setting up third-party tunnels manually without an automated Playit.gg pairing wizard.',
					file: 'panel/src/',
					code: 'Zero references to automated playit.gg agent provisioning.'
				}
			]
		}
	},
	{
		tool: 'Crafty Controller',
		icon: '/icons/competitors/crafty.webp',
		category: 'Web panel (Python Tornado)',
		coreStrength:
			'Python web panel supporting multi-server scheduling and backups',
		pocketmcWins:
			'PocketMC runs local-first in user-space with zero prerequisites. Crafty Controller is panel-first (requiring browser setup) and its documentation warns of a 90% risk of world chunk corruption/shredding when running under Docker Desktop/WSL on Windows. PocketMC also includes built-in playit.gg/Cloudflare tunnel auto-provisioning and direct cloud backups (Google Drive, OneDrive, Dropbox).',
		proof: {
			claim:
				'Crafty Controller is a Python Tornado web panel. Its documentation explicitly warns of high chunk corruption risks when running via Docker on Windows, while PocketMC runs natively in user-space with integrated cloud replication.',
			officialLinks: [
				{ label: 'Crafty Controller Official Website', url: 'https://craftycontrol.com' },
				{ label: 'Crafty Documentation - Docker on Windows Warning', url: 'https://docs.craftycontrol.com' }
			],
			evidence: [
				'Official Docker on Windows Warning: Crafty\'s official docs explicitly state: "There is a known volume permissions issue with Docker for Windows (using WSL/WSL2 and Docker Desktop)... When you stop or restart a Minecraft server in this setup, there is a very high chance (approx. 90%) that the world\'s chunks will be shredded and corrupted irreparably."',
				'Browser/Panel-First: Crafty operates as a web service accessed through a web browser, requiring either a Windows background service installation or Docker container.',
				'Built-in Tunneling & Cloud: Crafty does not include built-in one-click Playit.gg agent lifecycle management or direct OAuth cloud replication to Google Drive, Dropbox, and OneDrive.'
			],
			points: [
				{
					title: 'Windows/Docker Chunk Corruption Risk',
					desc: 'Official documentation warns of high risk of world chunk destruction when running under Docker Desktop/WSL on Windows upon stopping or restarting the Minecraft server.',
					file: 'README.md',
					code: 'On \'Stop\' or \'Restart\' of the MC Server, there is a 90% chance the World\'s Chunks will be shredded irreparably!'
				},
				{
					title: 'Setup Prerequisites & Web Server Exposure',
					desc: 'Requires downloading, running, and configuring Python 3.10/3.11 environment bindings, and running Tornado servers with exposed browser ports locally.',
					file: 'crafty/app/web.py',
					code: 'Local host listening on port 8000; requires SSL keys manually configured.'
				},
				{
					title: 'No Native Playit Integration',
					desc: 'Does not provide a built-in playit.gg agent controller or interactive pairing workflow.',
					file: 'crafty/app/tunnels.py',
					code: 'No references to automated playit tunnel setup; manual connection mapping only.'
				}
			]
		}
	},
	{
		tool: 'Pterodactyl Panel',
		icon: '/icons/competitors/pterodactyl.webp',
		category: 'Web panel & Wings daemon (Linux VPS)',
		coreStrength:
			'Enterprise client-server web app (PHP/Laravel + Redis + Nginx) and Go daemon (Wings) over Docker for 24/7 Linux VPS and commercial hosting',
		pocketmcWins:
			'PocketMC is built for zero-sysadmin local desktop self-hosting without requiring a Linux VPS, Docker engine, MariaDB database, Nginx reverse proxy, or router port forwarding. PocketMC provisions exact Adoptium Java/PHP runtimes automatically, avoids Docker cgroup OOM hard-kills with graceful RCON shutdown hooks, and includes built-in Playit.gg/Cloudflare tunnels and direct cloud sync (Google Drive, OneDrive, Dropbox).',
		proof: {
			claim:
				'Pterodactyl is an enterprise server administration suite for 24/7 Linux VPS hosting clusters. It explicitly does not support Windows for its Wings daemon.',
			officialLinks: [
				{ label: 'Pterodactyl Official Website', url: 'https://pterodactyl.io' },
				{ label: 'Pterodactyl Wings Requirements', url: 'https://pterodactyl.io/wings/1.0/installing.html' },
				{ label: 'Pterodactyl Panel Documentation', url: 'https://pterodactyl.io/panel/1.0/getting_started.html' }
			],
			evidence: [
				'Windows Explicitly Unsupported: Official Pterodactyl documentation states that Wings (the backend Go daemon managing containers) only runs on Linux; Windows is not supported.',
				'Heavy Infrastructure Stack: Requires deploying and maintaining Docker Engine, Wings (Go), PHP 8.1+, Laravel, Composer, MariaDB/MySQL, Redis cache, Nginx reverse proxy, and SSL certificates.',
				'Target Audience: Designed for enterprise VPS clusters and commercial Minecraft hosts with sysadmin capabilities, rather than personal desktop self-hosting.'
			],
			points: [
				{
					title: 'Multi-Service Web Stack & Daemon Overhead',
					desc: 'Requires a dedicated Linux host, PHP 8.2+ Laravel framework with queue workers, MariaDB/MySQL database, Redis caching, and Nginx web server before pairing nodes with the Go-based Wings daemon over HTTP APIs.',
					file: 'docker-compose.example.yml',
					code: 'services: { database: \'mariadb:11\', cache: \'redis:alpine\', panel: \'ghcr.io/pterodactyl/panel\' }'
				},
				{
					title: 'Process & Memory Handling (Docker OOM Hard-Kills)',
					desc: 'Spikes above the container RAM ceiling trigger immediate OS-level kill -9 via Docker cgroup OOM killers, risking unwritten chunk corruption. PocketMC uses graceful RCON shutdown hooks and direct OS scheduling without container hard-kills.',
					file: 'app/Repositories/Wings/DaemonServerRepository.php',
					code: '$this->getHttpClient()->post(\'/api/servers\', [\'uuid\' => $this->server->uuid, \'start_on_completion\' => $start])'
				},
				{
					title: 'Runtime Management & Egg Maintenance',
					desc: 'Java and PHP runtimes are tied to Docker container images and community Egg templates requiring manual environment variable configuration, whereas PocketMC dynamically auto-provisions exact Adoptium Java (8 through 25) and PHP 8.2 runtimes.',
					file: 'composer.json',
					code: 'Dependencies tied to \'laravel/framework\': \'^12.60\', \'predis/predis\', and \'aws/aws-sdk-php\'.'
				},
				{
					title: 'No Built-in Zero-Port-Forwarding Tunnels',
					desc: 'Designed strictly for static-IP cloud servers. Lacks built-in automated tunnel provisioning (Playit.gg / Cloudflare) to allow friends to join local instances without router configuration.',
					file: 'app/Services/Backups/InitiateBackupService.php',
					code: 'Requires dedicated node allocations and public IP mapping; manual tunnel/reverse proxy only.'
				}
			]
		}
	},
	{
		tool: 'Essential Mod',
		icon: '/icons/competitors/essential.webp',
		category: 'Client mod / P2P hosting',
		coreStrength:
			'Easy friend world hosting',
		pocketmcWins:
			'PocketMC manages real server instances. Essential is convenient for casual worlds, but it is not a serious server management app.',
		proof: {
			claim:
				'Essential is a client-side Minecraft mod for peer-to-peer singleplayer world sharing. PocketMC runs true standalone, dedicated server instances.',
			officialLinks: [
				{ label: 'Essential Mod Official Website', url: 'https://essential.gg' },
				{ label: 'Essential Mod Features Overview', url: 'https://essential.gg/features' }
			],
			evidence: [
				'Client-Bound Lifetime: Multiplayer worlds exist only while the host player remains active and logged into Minecraft; exiting the game immediately disconnects all players.',
				'Not a Dedicated Server: Does not run standalone server software (Paper, Fabric Server, Forge Server, Bedrock BDS, PocketMine-MP), cannot run headless in the background, and cannot load standalone server plugins.',
				'No Server Automation: Lacks dedicated server console control, scheduled reboot automation, port-binding diagnostics, and RCON-synchronized cloud backups.'
			],
			points: [
				{
					title: 'Client-Bound Process Lifetime',
					desc: 'Multiplayer worlds run inside the client Minecraft game process. Worlds only exist while the host player remains active in-game; exiting Minecraft closes the world and disconnects all players immediately.',
					file: 'essential.gg/features',
					code: 'Host worlds directly from singleplayer; friends join your active client session.'
				},
				{
					title: 'Not a Dedicated Server Software',
					desc: 'Does not run standalone server engines (Paper, Fabric Server, Forge Server, BDS, PocketMine-MP). Cannot run headless in the background without launching the 3D client game.',
					file: 'essential.gg/faq',
					code: 'Essential is a client mod, not a dedicated server manager or background hosting tool.'
				},
				{
					title: 'No Server Automation or Backups',
					desc: 'Lacks dedicated server terminal commands, automated crash recovery, port-binding conflict resolution, and scheduled RCON-held cloud backups.',
					file: 'essential.gg/features',
					code: 'Zero standalone server daemon, RCON hooks, or automated cloud snapshot replication.'
				}
			]
		}
	},
	{
		tool: 'Minehut',
		icon: '/icons/competitors/minehut.webp',
		category: 'Managed cloud host',
		coreStrength:
			'Free-to-start hosted servers and community hosting',
		pocketmcWins:
			'PocketMC wins on local ownership, file control, fewer platform restrictions, and self-hosted privacy/control.',
		proof: {
			claim:
				'Minehut is a remote cloud hosting platform with automated server hibernation and resource quotas on free tiers. PocketMC provides unlimited local hardware performance with zero hibernation.',
			officialLinks: [
				{ label: 'Minehut Official Website', url: 'https://minehut.com' },
				{ label: 'Minehut Plans & Pricing', url: 'https://minehut.com/pricing' }
			],
			evidence: [
				'Mandatory Hibernation: Free-tier servers automatically shut down (hibernate) whenever no players are online to conserve platform computing resources.',
				'Resource Restrictions: Free tier limits servers to 1 GB RAM, 10 maximum player slots, and 10 GB disk storage, requiring paid monthly credit subscriptions (600 to 6,000 credits/month) for 24/7 uptime or higher memory.',
				'Data Sovereignty: Server files reside on remote multi-tenant cloud machines; PocketMC runs 100% on your local PC with full file access, offline capability, and no artificial player or memory limits.'
			],
			points: [
				{
					title: 'Mandatory Server Hibernation',
					desc: 'Free-tier servers automatically shut down and hibernate when no players are connected to conserve platform cloud resources. Joining requires wake-up delays or queue times.',
					file: 'minehut.com/pricing',
					code: 'Free servers hibernate when empty; upgrade to paid server plans for 24/7 online status.'
				},
				{
					title: 'Severe Resource Quotas on Free Tiers',
					desc: 'Free plans strictly cap servers to 1 GB RAM, 10 player slots, and 10 GB storage, requiring recurring monthly credit subscriptions for standard modpack or community hosting.',
					file: 'minehut.com/pricing',
					code: 'Free plan: 1 GB RAM, 10 max players, 10 GB disk. Upgrades require monthly credits.'
				},
				{
					title: 'Data Custody & Remote Multi-Tenancy',
					desc: 'Server files are hosted on remote shared cloud instances with limited direct file access. PocketMC runs 100% locally on your hardware with unrestricted RAM and complete file control.',
					file: 'minehut.com/terms',
					code: 'Server instances run on Minehut multi-tenant cloud infrastructure subject to quota limits.'
				}
			]
		}
	},
	{
		tool: 'playit.gg',
		icon: '/icons/competitors/playit.webp',
		category: 'Tunnel service',
		coreStrength:
			'Excellent public tunnel service',
		pocketmcWins:
			'PocketMC embeds the Playit.gg agent directly into the server workflow, automatically configuring tunnels, ports, and proximity voice chat without manual setup.',
		proof: {
			claim:
				'Playit.gg is a public network tunnel proxy service, not a Minecraft server management application. PocketMC bundles Playit directly into an end-to-end server suite.',
			officialLinks: [
				{ label: 'Playit.gg Official Website', url: 'https://playit.gg' },
				{ label: 'Playit.gg Pricing & Features', url: 'https://playit.gg/pricing' }
			],
			evidence: [
				'Tunnel-Only Scope: Playit.gg provides encrypted TCP/UDP network forwarding to bypass CGNAT and firewalls, but does not manage server software, world saves, plugins/mods, runtimes, or backups.',
				'Synergistic Workflow: Rather than competing, PocketMC integrates the official Playit.gg daemon directly into its desktop app, auto-mapping game ports (Java 25565, Bedrock 19132) and proximity voice chat (UDP 24454) without manual configuration.'
			],
			points: [
				{
					title: 'Scope Limited to Network Tunneling',
					desc: 'Playit.gg is a public network tunnel proxy designed to forward TCP and UDP packets through firewalls and CGNAT. It is not a server management application.',
					file: 'playit.gg/pricing',
					code: 'playit.gg is a tunneling service that assigns static IP/domain routing to local ports.'
				},
				{
					title: 'Synergistic Embedded Architecture',
					desc: 'PocketMC embeds the official Playit.gg agent directly into its core lifecycle manager, automating account claims, tunnel provisioning (Java TCP 25565, Bedrock UDP 19132, Voice UDP 24454), and process supervision without manual configuration.',
					file: 'PocketMC.Infrastructure/Services/PlayitAgentService.cs',
					code: 'await _tunnelService.CreateTunnelMappingAsync(AgentTunnelType.MinecraftJava, 25565);'
				}
			]
		}
	}
];

