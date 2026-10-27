export type CompetitorGroup = 'desktop' | 'panel' | 'alternative';

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
	group: CompetitorGroup;
	coreStrength: string;
	pocketmcWins: string;
	concession?: string;
	isPocketMC?: boolean;
	proof?: ComparisonProof;
}

export const toolComparisons: CompetitorComparison[] = [
	{
		tool: 'PocketMC',
		icon: '/logo.webp',
		category: 'Native Windows Desktop App',
		group: 'desktop',
		coreStrength: 'Complete Local Minecraft server management with zero headache.',
		pocketmcWins:
			'Runs locally on your Windows PC. Includes Java (with NeoForge), native BDS, PocketMine-MP, Geyser crossplay, managed Adoptium/PHP runtimes, defensive cloud backups with staging and rollback (Google Drive, OneDrive, Dropbox), automated Playit.gg game tunnels, Cloudflare web dashboard tunnels, AI diagnostics (local Ollama or cloud), and open-source MIT code.',
		isPocketMC: true,
		proof: {
			claim:
				'100% free and open-source (MIT) Windows desktop application offering multi-engine runtime orchestration, automated cloud backups with rollback safeguards, and zero-port-forward tunnels.',
			officialLinks: [
				{ label: 'PocketMC GitHub Repository', url: 'https://github.com/PocketMC/pocket-mc-windows' },
				{ label: 'Official MIT License', url: 'https://github.com/PocketMC/pocket-mc-windows/blob/master/LICENSE' },
				{ label: 'Official Documentation', url: 'https://pocketmc.net/docs' },
				{ label: 'PocketMC Privacy Policy', url: 'https://pocketmc.net/privacy' }
			],
			evidence: [
				'Permissive MIT License: Complete source code publicly auditable and redistributable without proprietary restrictions.',
				'Multi-Engine Support: Orchestrates Paper, Fabric, Forge, NeoForge, official Bedrock Dedicated Server (BDS), and PocketMine-MP (PHP 8.2).',
				'Automated Zero-Port-Forward Tunnels: Embeds official Playit.gg agent for game traffic (TCP 25565, Bedrock UDP 19132, Voice UDP 24454) and Cloudflare Quick Tunnels for remote web dashboard HTTPS access.',
				'Defensive Cloud Backups: Enforces RCON save-holding and flushes chunk buffers before archiving, records checksums in manifest, validates world structure in staging on restore, and rolls back on failure. Syncs directly to Google Drive, Microsoft OneDrive, and Dropbox via DPAPI-secured OAuth tokens.',
				'AI Diagnostics: Built-in error and crash analysis using local Ollama (zero network transmission) or optional cloud providers (Gemini, Claude, OpenAI, Mistral, Groq) with sanitized log excerpts.'
			],
			points: [
				{
					title: 'Permissive Open-Source Licensing (MIT)',
					desc: 'Complete source code is publicly accessible and forkable on GitHub with zero proprietary restrictions or paid licensing tiers.',
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
					title: 'Defensive Restore Architecture with Rollback',
					desc: 'Validates zip integrity and manifest checksums, extracts into a temporary staging directory, verifies world structure, backs up current files, and safely rolls back if the restore fails.',
					file: 'PocketMC.Infrastructure/Services/BackupService.cs',
					code: 'ExecuteRconCommandAsync("save-off"); ExecuteRconCommandAsync("save-all flush");'
				}
			]
		}
	},
	{
		tool: 'SquidServers',
		icon: '/icons/competitors/squidservers.webp',
		category: 'Desktop App (Cross-Platform)',
		group: 'desktop',
		coreStrength:
			'User-friendly local hosting with official BDS, Geyser crossplay, Modrinth mod/plugin installer, Playit.gg tunnels, and automated local backups',
		pocketmcWins:
			'PocketMC is 100% open source under the MIT license, provides native PocketMine-MP (PHP 8.2) runtime orchestration, integrates direct OAuth cloud replication (Google Drive, OneDrive, Dropbox), features defensive staged restores with rollback, and includes built-in AI diagnostics.',
		concession:
			'SquidServers provides a polished cross-platform desktop experience (Windows, macOS, Linux) with solid automated local backups and beginner-friendly server creation.',
		proof: {
			claim:
				'SquidServers is a closed-source desktop application focused on Java and Bedrock BDS with local backups. PocketMC provides full open-source MIT transparency, native PocketMine-MP runtime orchestration, direct consumer-cloud replication, and staged restore safeguards.',
			officialLinks: [
				{ label: 'SquidServers Official Website', url: 'https://squidservers.com' },
				{ label: 'SquidServers FAQ & Licensing', url: 'https://support.squidservers.com/getting-started/what-is-squidservers/' },
				{ label: 'SquidServers Backup Documentation', url: 'https://support.squidservers.com/server-management/backups/' },
				{ label: 'SquidServers GitHub Organization', url: 'https://github.com/SquidServers' }
			],
			evidence: [
				'Closed-Source Desktop Client: SquidServers is distributed as proprietary closed-source software without public source code transparency or independent auditability.',
				'No PocketMine-MP Orchestration: SquidServers supports Java and official Bedrock Dedicated Server (BDS), but does not provide managed PHP 8.2 runtime orchestration for Bedrock plugin servers.',
				'Local-Only Backups: While Squid provides automated local backups with retention and world/full restore, it does not offer direct OAuth integration for automated offsite replication to Google Drive, Dropbox, or OneDrive.',
				'Restore Safeguards: PocketMC implements staged extraction, manifest checksum verification, and automatic rollback on restore failure.'
			],
			points: [
				{
					title: 'Closed-Source Application Distribution',
					desc: 'Distributed as proprietary closed-source software. Core desktop client source code is not published or open for community audit.',
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
					title: 'Local-Only Backups (No Direct Cloud Replication)',
					desc: 'Backup management is restricted to local storage on the host machine. Does not offer automated direct OAuth replication to Google Drive, OneDrive, or Dropbox.',
					file: 'support.squidservers.com/faq/is-squidservers-safe/',
					code: 'All manual and automatic backups stay on your computer. Your world files and data are never shared with or uploaded to any external servers.'
				},
				{
					title: 'No Embedded Remote Control Web Dashboard',
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
		category: 'Desktop App (Python / amscript)',
		group: 'desktop',
		coreStrength:
			'Open-source automation with Modrinth support, modpack import, Playit.gg, Geyser, custom amscript scripting IDE, and Telepath remote administration',
		pocketmcWins:
			'PocketMC provides a native Windows WPF presentation, first-party Bedrock Dedicated Server (BDS) and PocketMine-MP (PHP 8.2) engines out-of-the-box, direct OAuth consumer-cloud backup integrations (Drive, OneDrive, Dropbox), multi-step staged restoration with rollback, and built-in AI diagnostics.',
		concession:
			'auto-mcs offers deep custom scripting via amscript, headless remote host operations via Telepath, and multi-platform support across Windows, Linux, and macOS.',
		proof: {
			claim:
				'auto-mcs is an open-source Python tool with extensive scripting and headless Telepath capabilities for Java servers. PocketMC provides a native Windows interface, native Bedrock BDS and PocketMine-MP runtimes, direct OAuth cloud backup APIs, and staged restore safeguards.',
			officialLinks: [
				{ label: 'auto-mcs GitHub Repository', url: 'https://github.com/macarooni-man/auto-mcs' },
				{ label: 'auto-mcs License (GPL-3.0)', url: 'https://github.com/macarooni-man/auto-mcs/blob/main/LICENSE' },
				{ label: 'auto-mcs Telepath Documentation', url: 'https://auto-mcs.readthedocs.io/en/latest/telepath.html' }
			],
			evidence: [
				'Engine Scope: Focused primarily on Java Edition servers; Bedrock connectivity relies on downloading Geyser/Floodgate plugins onto Java instances rather than managing official C++ BDS or PHP PocketMine-MP runtimes.',
				'Cloud Backup Architecture: Backup Manager creates local zip archives. Cloud synchronization relies on desktop-sync folders or custom amscript scripts rather than first-party OAuth integrations with Google Drive, OneDrive, and Dropbox.',
				'Presentation & Platform: Built with Python CustomTkinter for cross-platform support, whereas PocketMC provides a native Windows WPF desktop experience tightly coupled with Windows kernel Job Objects.',
				'Integrated AI Diagnostics: PocketMC features built-in error analysis via local Ollama or cloud providers; auto-mcs does not include AI diagnostic workflows.'
			],
			points: [
				{
					title: 'Bedrock via Geyser Plugin (No Native BDS or PMMP)',
					desc: 'Bedrock crossplay relies on downloading Geyser and Floodgate plugins to run on top of Java instances. Does not orchestrate native C++ Bedrock Dedicated Server (BDS) or PHP-based PocketMine-MP runtimes.',
					file: 'source/core/server/addons.py',
					code: 'addon = AddonWebObject("Geyser", "bukkit", "GeyserMC", ...)'
				},
				{
					title: 'Direct Cloud Backup APIs vs Local Sync',
					desc: 'Backup Manager provides automated snapshots and retention locally. Cloud replication requires mapping backups to desktop-sync folders or custom scripts rather than direct DPAPI-secured OAuth cloud providers.',
					file: 'source/core/constants.py',
					code: 'Backup manager paths define local filesystem destinations.'
				},
				{
					title: 'Native Windows OS Integration',
					desc: 'PocketMC binds processes to Win32 Job Objects for guaranteed child process termination on exit, paired with fluent Windows desktop styling.',
					file: 'PocketMC.Infrastructure/ProcessManagement/JobObject.cs',
					code: 'JOBOBJECT_EXTENDED_LIMIT_INFORMATION with LimitFlags = 0x2000'
				}
			]
		}
	},
	{
		tool: 'MC Server Soft',
		icon: '/icons/competitors/mcserversoft.webp',
		category: 'Native Windows Server Wrapper',
		group: 'desktop',
		coreStrength:
			'Mature Windows Minecraft server wrapper with scheduling, multi-server controls, remote REST API, and web panel',
		pocketmcWins:
			'PocketMC provides dynamic Adoptium Java (8 through 25) and PHP 8.2 runtime provisioning, automated Playit.gg agent setup with port matching, direct OAuth cloud backups (Google Drive, OneDrive, Dropbox) with RCON chunk flushing and staged restore safeguards, PocketMine-MP support, and integrated AI diagnostics.',
		concession:
			'MC Server Soft is an established, long-running Windows server wrapper with an extensive REST API and granular server wrapper controls.',
		proof: {
			claim:
				'MC Server Soft is a dedicated Windows server wrapper with an established track record and REST API. PocketMC automates Java and PHP runtime provisioning, embeds zero-config Playit.gg tunnels, provides direct OAuth cloud backups with staged restores, and integrates AI diagnostics.',
			officialLinks: [
				{ label: 'MC Server Soft Official Website', url: 'https://www.mcserversoft.com' },
				{ label: 'MC Server Soft Documentation', url: 'https://docs.mcserversoft.com' },
				{ label: 'MC Server Soft Playit.gg Guide', url: 'https://docs.mcserversoft.com/features/playit-gg' }
			],
			evidence: [
				'Manual Runtime Dependency: MC Server Soft expects appropriate 64-bit Java runtimes to be pre-installed on the host system. PocketMC dynamically auto-provisions isolated Adoptium Java (8, 11, 17, 21, 25) and PHP 8.2 per server instance.',
				'Tunnel Provisioning: Playit.gg is documented in MCSS as a manual external guide requiring the user to independently install and configure the tunnel agent. PocketMC auto-provisions and supervises the Playit agent natively.',
				'Cloud Backups: MCSS supports local backups and tasks, but lacks direct OAuth integration for automated replication to Google Drive, OneDrive, or Dropbox with staged restore validation.',
				'Modern Bedrock Support: PocketMC provides first-party PocketMine-MP orchestration alongside official BDS and Java engines.'
			],
			points: [
				{
					title: 'Pre-Installed System Java vs Dynamic Adoptium Provisioning',
					desc: 'MCSS detects system Java paths and requires users to manually install and configure 64-bit Java versions. PocketMC downloads, verifies, and isolates Adoptium runtimes automatically.',
					file: 'docs.mcserversoft.com/troubleshooting',
					code: 'Ensure the correct 64-bit Java version is installed on the host system.'
				},
				{
					title: 'Manual External Playit Setup vs Automated Native Agent',
					desc: 'MCSS provides an external setup guide for Playit.gg. PocketMC embeds the official Playit.gg agent directly, allocating ports and claiming tunnels through an in-app wizard.',
					file: 'docs.mcserversoft.com/features/playit-gg'
					,code: 'Playit is configured externally via the standalone playit program.'
				},
				{
					title: 'Direct OAuth Cloud Sync with Staged Restore',
					desc: 'MCSS backups are written locally. PocketMC replicates encrypted backup archives directly to Google Drive, OneDrive, and Dropbox with staged extraction and rollback safeguards.',
					file: 'PocketMC.Infrastructure/Services/BackupService.cs',
					code: 'Direct OAuth token exchange and staged restore validation.'
				}
			]
		}
	},
	{
		tool: 'Crafty Controller',
		icon: '/icons/competitors/crafty.webp',
		category: 'Web Panel (Python Tornado)',
		group: 'panel',
		coreStrength:
			'Minecraft-focused browser administration with user roles, TOTP/passkey authentication, scheduling, metrics, and multi-server management',
		pocketmcWins:
			'PocketMC runs as a native Windows desktop app with zero background service or Python prerequisites. It auto-provisions Adoptium Java and PHP 8.2 runtimes, provides first-party Playit.gg agent auto-provisioning and port matching, integrates direct cloud backups (Google Drive, OneDrive, Dropbox) with staged restore validation, and includes AI diagnostics.',
		concession:
			'Crafty Controller excels at browser-first remote administration accessible from any LAN or WAN device, fine-grained user roles, and native Linux deployment.',
		proof: {
			claim:
				'Crafty Controller is a Python Tornado web panel designed for browser administration. PocketMC is a native Windows desktop application with zero runtime prerequisites, auto-provisioned runtimes, native Playit tunnels, and direct OAuth cloud backups.',
			officialLinks: [
				{ label: 'Crafty Controller Official Website', url: 'https://craftycontrol.com' },
				{ label: 'Crafty Controller Documentation', url: 'https://docs.craftycontrol.com' },
				{ label: 'Crafty Modpack & NeoForge FAQ', url: 'https://docs.craftycontrol.com/pages/faq/modpack-troubleshooting/' }
			],
			evidence: [
				'Desktop vs Web Service: Crafty runs as a persistent web service requiring Python environments or a Windows background service installation. PocketMC runs as a lightweight native Windows desktop application in user-space.',
				'Runtime Management: Crafty relies on system-installed Java runtimes. PocketMC automatically provisions exact Adoptium Java (8 through 25) and PHP 8.2 runtimes based on server requirements.',
				'Docker on Windows Advisory: Crafty official documentation explicitly advises that running Crafty via Docker Desktop/WSL on Windows carries severe filesystem mount hazards that can corrupt Minecraft chunks upon server stop or restart. Crafty recommends its native Windows installer to avoid this.',
				'Integrated Networking: PocketMC includes built-in Playit.gg agent lifecycle management and port matching; Crafty requires manual port forwarding or external reverse proxies.',
				'Modpack & NeoForge Workflow: Crafty documentation notes that NeoForge and Modrinth modpack setups require external preparation and manual zip importing, whereas PocketMC handles them natively.'
			],
			points: [
				{
					title: 'Native Desktop App vs Web Server Service',
					desc: 'Crafty operates as a Tornado web service on port 8000 requiring service installation. PocketMC is a self-contained desktop executable.',
					file: 'crafty/app/web.py',
					code: 'Local server listening on port 8000; requires SSL keys and browser navigation.'
				},
				{
					title: 'Docker on Windows Filesystem Hazard Clarification',
					desc: 'Crafty documentation explicitly notes a severe chunk corruption issue specific to Docker for Windows with WSL volume mounts, advising native deployment instead.',
					file: 'docs.craftycontrol.com',
					code: 'Known volume permissions issue with Docker for Windows (using WSL/WSL2 and Docker Desktop).'
				},
				{
					title: 'Automated Adoptium and PHP Runtime Provisioning',
					desc: 'Crafty expects the host system to have appropriate Java versions configured. PocketMC isolates Adoptium Java (8-25) and PHP 8.2 per server instance automatically.',
					file: 'PocketMC.Infrastructure/Services/JavaAdoptiumClient.cs',
					code: 'Dynamically resolves Adoptium API releases and unpacks into isolated runtime folders.'
				}
			]
		}
	},
	{
		tool: 'MCSManager',
		icon: '/icons/competitors/mcsmanager.webp',
		category: 'Web Panel (Node.js Distributed)',
		group: 'panel',
		coreStrength:
			'Distributed, multi-node web panel for Minecraft, Steam, and general application management across Windows, Linux, and macOS',
		pocketmcWins:
			'PocketMC is built specifically for a single Windows PC with zero sysadmin overhead. It eliminates Node.js daemon setups, auto-provisions isolated Adoptium Java and PHP runtimes, provides automated Playit.gg tunnel creation, and integrates direct consumer-cloud backups with RCON save coordination.',
		concession:
			'MCSManager is built for distributed multi-machine infrastructure, commercial server reselling, and general process management across heterogeneous operating systems.',
		proof: {
			claim:
				'MCSManager is a distributed web-and-daemon panel designed for multi-machine server networks. PocketMC is a zero-sysadmin local desktop application with automated runtimes, integrated tunnels, and defensive cloud backups.',
			officialLinks: [
				{ label: 'MCSManager Official Website', url: 'https://mcsmanager.com' },
				{ label: 'MCSManager GitHub Repository', url: 'https://github.com/MCSManager/MCSManager' },
				{ label: 'MCSManager Official Documentation', url: 'https://docs.mcsmanager.com' }
			],
			evidence: [
				'Distributed Architecture Overhead: MCSManager separates the web panel (port 23333) and instance controller daemons (port 24444). While powerful for multi-server fleets, it introduces unnecessary complexity for single-PC local hosting.',
				'Runtime Prerequisites: Requires installing and maintaining a Node.js runtime environment on the host computer. PocketMC runs as a compiled native Windows binary.',
				'No Automatic Minecraft Runtimes: MCSManager relies on pre-installed system Java or manually configured binary paths; it does not automatically provision Adoptium Java (8-25) or PHP 8.2 versions dynamically per engine.',
				'Network Tunneling: MCSManager does not include automated Playit.gg agent provisioning or port matching, requiring manual port forwarding or external tunnel configuration.',
				'Database Correction: Current MCSManager releases do not require an external SQL database; it uses an embedded data store.'
			],
			points: [
				{
					title: 'Distributed Daemon Architecture',
					desc: 'Requires running both web panel and daemon processes communicating over WebSockets, designed for VPS and multi-node clusters.',
					file: 'README.md',
					code: 'Panel and daemon split, requiring Node.js 16.20.2+ runtimes.'
				},
				{
					title: 'Manual Runtime Mapping',
					desc: 'Startup commands rely on existing Java binaries or manual paths. Does not dynamically resolve Adoptium Java or PHP per server type.',
					file: 'daemon/src/app.ts',
					code: 'Startup relies on pre-installed Java binary or manual executable paths.'
				},
				{
					title: 'Automated Tunnel Integration',
					desc: 'Lacks built-in automated Playit.gg agent lifecycle management or dynamic port mapping for zero-port-forward local hosting.',
					file: 'panel/src/',
					code: 'No native playit.gg tunnel controller implementation.'
				}
			]
		}
	},
	{
		tool: 'Pterodactyl Panel',
		icon: '/icons/competitors/pterodactyl.webp',
		category: 'Web Panel & Wings Daemon (Linux VPS)',
		group: 'panel',
		coreStrength:
			'Enterprise multi-tenant hosting platform with Linux Wings daemon, Docker container isolation, resource quotas, Eggs catalog, SFTP, and S3 backup integration',
		pocketmcWins:
			'PocketMC is designed for zero-sysadmin local Windows hosting without requiring a Linux VPS, Docker engine, Wings daemon, MariaDB database, Redis, Nginx reverse proxy, or router port forwarding. It auto-provisions exact Adoptium Java and PHP runtimes locally, integrates automated Playit.gg tunnels, and syncs directly to Google Drive, OneDrive, and Dropbox.',
		concession:
			'Pterodactyl is the undisputed industry benchmark for multi-tenant VPS hosting, commercial game server fleets, strict Docker resource isolation, and S3 object storage.',
		proof: {
			claim:
				'Pterodactyl is an enterprise server administration suite for 24/7 Linux VPS hosting clusters. It explicitly does not support Windows for its Wings daemon. PocketMC is designed for zero-sysadmin local desktop self-hosting on Windows.',
			officialLinks: [
				{ label: 'Pterodactyl Official Website', url: 'https://pterodactyl.io' },
				{ label: 'Pterodactyl Wings Requirements', url: 'https://pterodactyl.io/wings/1.0/installing.html' },
				{ label: 'Pterodactyl Panel Documentation', url: 'https://pterodactyl.io/panel/1.0/getting_started.html' }
			],
			evidence: [
				'Windows Explicitly Unsupported: Official Pterodactyl documentation confirms that Wings (the backend Go daemon managing containers) only runs on Linux; Windows is not supported.',
				'Infrastructure Footprint: Requires deploying and maintaining Docker Engine, Wings (Go), PHP 8.2+ Laravel, Composer, MariaDB/MySQL, Redis, and Nginx before hosting a single server.',
				'Single-PC Local Hosting: Pterodactyl is engineered for commercial hosting providers and enterprise VPS clusters, whereas PocketMC provides a frictionless single-app Windows desktop experience.',
				'Runtime Provisioning: Pterodactyl manages runtimes via Docker images and community Eggs. PocketMC auto-provisions exact Adoptium Java (8-25) and PHP 8.2 runtimes directly on the host.',
				'Built-in Tunnels: PocketMC embeds Playit.gg for zero-port-forward home hosting; Pterodactyl requires dedicated static IP allocations or external proxy infrastructure.'
			],
			points: [
				{
					title: 'Linux-Only Wings Daemon',
					desc: 'Official documentation states Wings only runs on Linux. Windows is unsupported, making it unsuitable for native Windows desktop hosting.',
					file: 'wings/1.0/installing.html',
					code: 'Wings only supports Linux environments. Windows is not supported.'
				},
				{
					title: 'Enterprise Web Stack Overhead',
					desc: 'Requires a Linux host, Laravel web panel, MariaDB/MySQL database, Redis caching, queue workers, and Nginx web server.',
					file: 'docker-compose.example.yml',
					code: 'services: { database: "mariadb:11", cache: "redis:alpine", panel: "ghcr.io/pterodactyl/panel" }'
				},
				{
					title: 'Automated Local Tunnels',
					desc: 'Designed for static-IP cloud servers. Lacks built-in automated Playit.gg tunnel provisioning to allow friends to join local instances without router configuration.',
					file: 'app/Services/Backups/InitiateBackupService.php',
					code: 'Requires dedicated node allocations and public IP mapping; manual tunnel/reverse proxy only.'
				}
			]
		}
	},
	{
		tool: 'Essential Mod',
		icon: '/icons/competitors/essential.webp',
		category: 'Client Mod / P2P World Sharing',
		group: 'alternative',
		coreStrength:
			'Instant, low-friction friend world hosting directly from singleplayer with invite UI and modded world support',
		pocketmcWins:
			'PocketMC runs true standalone, persistent dedicated server instances (Paper, Fabric, BDS, PocketMine-MP) that continue running in the background when the host is away. It includes a dedicated server console, automated crash recovery, port diagnostics, and scheduled RCON cloud backups.',
		concession:
			'Essential Mod is unmatched for spontaneous casual play with friends directly from the Java game client with zero server configuration or port forwarding needed.',
		proof: {
			claim:
				'Essential is a client-side Minecraft mod for peer-to-peer singleplayer world sharing. PocketMC runs true standalone, dedicated server instances that operate independently of the game client.',
			officialLinks: [
				{ label: 'Essential Mod Official Website', url: 'https://essential.gg' },
				{ label: 'Essential Mod Features Overview', url: 'https://essential.gg/features' },
				{ label: 'Essential Mod FAQ', url: 'https://essential.gg/faq' }
			],
			evidence: [
				'Client-Bound Lifetime: Multiplayer worlds exist only while the host player remains active in-game; closing Minecraft immediately disconnects all connected friends.',
				'Not a Dedicated Server: Does not run standalone server engines (Paper, Fabric Server, Forge Server, Bedrock BDS, PocketMine-MP), cannot run headless in the background, and cannot load server-only plugins.',
				'No Server Administration: Lacks dedicated server console commands, automated crash recovery, custom port bindings, scheduled reboots, and RCON-held cloud backups.',
				'Hardware Efficiency: Dedicated servers managed by PocketMC use significantly less RAM and CPU than running a full 3D client game.'
			],
			points: [
				{
					title: 'Client-Bound Process Lifetime',
					desc: 'Worlds run inside the client Minecraft game process. Worlds only exist while the host player remains active in-game; exiting Minecraft closes the world immediately.',
					file: 'essential.gg/features',
					code: 'Host worlds directly from singleplayer; friends join your active client session.'
				},
				{
					title: 'Not Dedicated Server Software',
					desc: 'Does not run standalone server engines. Cannot run headless in the background without launching the resource-heavy 3D client game.',
					file: 'essential.gg/faq',
					code: 'Essential is a client mod, not a dedicated server manager or background hosting tool.'
				},
				{
					title: 'No Server Automation or Cloud Backups',
					desc: 'Lacks dedicated server terminal commands, automated crash recovery, port conflict resolution, and scheduled RCON-held cloud backups.',
					file: 'essential.gg/features',
					code: 'Zero standalone server daemon, RCON hooks, or automated cloud snapshot replication.'
				}
			]
		}
	},
	{
		tool: 'Minehut',
		icon: '/icons/competitors/minehut.webp',
		category: 'Managed Cloud Host',
		group: 'alternative',
		coreStrength:
			'Free-to-start managed remote cloud hosting where servers stay online without running on the user\'s home computer',
		pocketmcWins:
			'PocketMC provides 100% data sovereignty, full hardware performance with zero hibernation delays or player queue waits, complete file and runtime control without platform quotas or credit subscriptions, native Bedrock BDS and PocketMine-MP instances, and direct consumer-cloud backups.',
		concession:
			'Minehut runs on remote cloud infrastructure, meaning the host\'s personal PC can be turned off completely while the server operates.',
		proof: {
			claim:
				'Minehut is a remote cloud hosting platform with automated server hibernation and resource quotas on free tiers. PocketMC provides unlimited local hardware performance with complete data sovereignty and zero hibernation.',
			officialLinks: [
				{ label: 'Minehut Official Website', url: 'https://minehut.com' },
				{ label: 'Minehut Plans & Pricing', url: 'https://minehut.com/pricing' },
				{ label: 'Minehut Support - Server Hibernation', url: 'https://minehut.com/support' }
			],
			evidence: [
				'Mandatory Server Hibernation: Free-tier servers automatically sleep when no players are connected to conserve platform cloud resources. Joining requires wake-up delays or queue times.',
				'Resource Restrictions: Free tier strictly limits servers to 1 GB RAM, 10 player slots, and 10 GB disk storage, with accounts capped at 5 free servers (updated Aug 2026). Upgrades require recurring credit subscriptions.',
				'Data Custody: Server files reside on remote multi-tenant cloud machines. PocketMC runs 100% locally on your hardware with unrestricted RAM, complete file control, and direct cloud replication to your personal accounts.',
				'Engine Flexibility: PocketMC runs official Bedrock Dedicated Server (BDS) and PocketMine-MP natively; Minehut connects Bedrock players via Geyser bridge into Java infrastructure.'
			],
			points: [
				{
					title: 'Mandatory Server Hibernation on Free Tiers',
					desc: 'Free-tier servers automatically shut down when empty. Players joining an empty server experience wake-up delays and queues.',
					file: 'minehut.com/pricing',
					code: 'Free servers hibernate when empty; upgrade to paid server plans for 24/7 online status.'
				},
				{
					title: 'Resource Quotas on Free Tiers',
					desc: 'Free plans cap instances to 1 GB RAM, 10 player slots, and 10 GB storage, requiring recurring monthly credit subscriptions for demanding modpacks.',
					file: 'minehut.com/pricing',
					code: 'Free plan: 1 GB RAM, 10 max players, 10 GB disk. Upgrades require monthly credits.'
				},
				{
					title: 'Data Custody and Remote Multi-Tenancy',
					desc: 'Server files are hosted on remote shared cloud instances with limited direct file access. PocketMC runs 100% locally with complete file sovereignty.',
					file: 'minehut.com/terms',
					code: 'Server instances run on Minehut multi-tenant cloud infrastructure subject to quota limits.'
				}
			]
		}
	},
	{
		tool: 'playit.gg',
		icon: '/icons/competitors/playit.webp',
		category: 'Tunnel Service',
		group: 'alternative',
		coreStrength:
			'Purpose-built global reverse proxy and tunnel network providing public addresses bypassing CGNAT without router port forwarding',
		pocketmcWins:
			'PocketMC embeds and supervises the official Playit.gg agent directly into the server workflow, automating account claiming, tunnel provisioning (Java 25565, Bedrock 19132, Voice 24454), and process lifecycle alongside full server engine, runtime, and backup management.',
		concession:
			'playit.gg is the underlying network service itself, supporting custom domains, regional Anycast routing, and arbitrary game protocols far beyond Minecraft.',
		proof: {
			claim:
				'playit.gg is a public network tunnel proxy service, not a Minecraft server management application. PocketMC bundles the official Playit agent directly into an end-to-end server suite.',
			officialLinks: [
				{ label: 'Playit.gg Official Website', url: 'https://playit.gg' },
				{ label: 'Playit.gg Pricing & Features', url: 'https://playit.gg/pricing' },
				{ label: 'Playit.gg Support Documentation', url: 'https://playit.gg/support' }
			],
			evidence: [
				'Tunnel-Only Scope: Playit.gg provides encrypted TCP/UDP network forwarding to bypass CGNAT and firewalls, but does not manage server software, world saves, plugins/mods, runtimes, or backups.',
				'Synergistic Embedded Architecture: Rather than competing, PocketMC integrates the official Playit.gg daemon directly into its desktop app, auto-mapping game ports (Java 25565, Bedrock 19132) and proximity voice chat (UDP 24454) without manual configuration.',
				'Complete Lifecycle Management: PocketMC launches and monitors the Playit agent in tandem with Minecraft server processes, binding tunnels to server lifecycles.'
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
					desc: 'PocketMC embeds the official Playit.gg agent directly into its core lifecycle manager, automating account claims, tunnel provisioning, and process supervision.',
					file: 'PocketMC.Infrastructure/Services/PlayitAgentService.cs',
					code: 'await _tunnelService.CreateTunnelMappingAsync(AgentTunnelType.MinecraftJava, 25565);'
				}
			]
		}
	}
];
