export interface ComparisonProof {
	claim: string;
	officialLinks: {
		label: string;
		url: string;
	}[];
	evidence: string[];
}

export interface CompetitorComparison {
	tool: string;
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
		category: 'Native Windows Desktop App',
		coreStrength: 'Complete local Minecraft server management with zero setup overhead',
		pocketmcWins:
			'Best overall fit for local self-hosting: Java (with NeoForge), native BDS, PocketMine-MP, Geyser/Floodgate crossplay, managed Adoptium/PHP runtimes, RCON-secured backups with automatic Google Drive/OneDrive/Dropbox cloud replication, auto-configured Playit.gg & Cloudflare tunnels, AI log summaries, and active open-source trust.',
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
			]
		}
	},
	{
		tool: 'SquidServers',
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
			]
		}
	},
	{
		tool: 'auto-mcs',
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
			]
		}
	},
	{
		tool: 'MCSManager',
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
			]
		}
	},
	{
		tool: 'Crafty Controller',
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
			]
		}
	},
	{
		tool: 'Pterodactyl Panel',
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
			]
		}
	},
	{
		tool: 'Essential Mod',
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
			]
		}
	},
	{
		tool: 'Minehut',
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
			]
		}
	},
	{
		tool: 'playit.gg',
		category: 'Tunnel service',
		coreStrength:
			'Excellent public tunnel service',
		pocketmcWins:
			'PocketMC includes Playit.gg as part of a full server-management workflow instead of forcing users to combine tools manually like it\'s 2012.',
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
			]
		}
	}
];
