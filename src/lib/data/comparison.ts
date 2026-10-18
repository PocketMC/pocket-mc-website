export interface CompetitorComparison {
	tool: string;
	badge?: string;
	category: string;
	coreStrength: string;
	pocketmcWins: string;
	isPocketMC?: boolean;
}

export const toolComparisons: CompetitorComparison[] = [
	{
		tool: 'PocketMC',
		badge: 'Best Overall',
		category: 'Native Windows Desktop App',
		coreStrength: 'Complete local Minecraft server management with zero setup overhead',
		pocketmcWins:
			'Best overall fit for local self-hosting: Java (with NeoForge), native BDS, PocketMine-MP, Geyser/Floodgate crossplay, managed Adoptium/PHP runtimes, RCON-secured backups with automatic Google Drive/OneDrive/Dropbox cloud replication, auto-configured Playit.gg & Cloudflare tunnels, AI log summaries, and active open-source trust.',
		isPocketMC: true
	},
	{
		tool: 'SquidServers',
		category: 'Desktop App',
		coreStrength:
			'User-friendly local hosting with official BDS, Geyser crossplay, Modrinth mod/plugin installer, Playit.gg tunnels, and metrics',
		pocketmcWins:
			'PocketMC is 100% free and open-source (MIT), provides native PocketMine-MP (PHP) runtime orchestration alongside Java and BDS, features RCON-synchronized backups with automated cloud replication (Google Drive, OneDrive, Dropbox), and includes built-in AI log summaries and Discord integrations.'
	},
	{
		tool: 'auto-mcs',
		category: 'Desktop GUI (Python Tkinter)',
		coreStrength:
			'Python Tkinter GUI with playit.gg, Modrinth search, and custom scripting (amscript)',
		pocketmcWins:
			'PocketMC offers a modern native Windows interface instead of a legacy Tkinter interface, provides native Bedrock Dedicated Server (BDS) and PocketMine-MP (PHP) instances out-of-the-box, and features scheduled RCON-held backups with built-in Google Drive, OneDrive, and Dropbox replication.'
	},
	{
		tool: 'MCSManager',
		category: 'Web panel (Node.js)',
		coreStrength:
			'Distributed, multi-user web panel for Minecraft and Steam servers',
		pocketmcWins:
			'PocketMC is local-first, running natively without requiring Node.js runtimes, database setup, daemon installation, or reverse-proxy configuration. It manages all Java/PHP runtimes automatically and provides a guided tunnel wizard, avoiding the high setup complexity of a distributed panel/daemon architecture.'
	},
	{
		tool: 'Crafty Controller',
		category: 'Web panel (Python Tornado)',
		coreStrength:
			'Python web panel supporting multi-server scheduling and backups',
		pocketmcWins:
			'PocketMC runs local-first in user-space with zero prerequisites. Crafty Controller is panel-first (requiring browser setup) and its documentation warns of a 90% risk of world chunk corruption/shredding when running under Docker Desktop/WSL on Windows. PocketMC also includes built-in playit.gg/Cloudflare tunnel auto-provisioning and direct cloud backups (Google Drive, OneDrive, Dropbox).'
	},
	{
		tool: 'Pterodactyl Panel',
		category: 'Web panel & Wings daemon (Linux VPS)',
		coreStrength:
			'Enterprise client-server web app (PHP/Laravel + Redis + Nginx) and Go daemon (Wings) over Docker for 24/7 Linux VPS and commercial hosting',
		pocketmcWins:
			'PocketMC is built for zero-sysadmin local desktop self-hosting without requiring a Linux VPS, Docker engine, MariaDB database, Nginx reverse proxy, or router port forwarding. PocketMC provisions exact Adoptium Java/PHP runtimes automatically, avoids Docker cgroup OOM hard-kills with graceful RCON shutdown hooks, and includes built-in Playit.gg/Cloudflare tunnels and direct cloud sync (Google Drive, OneDrive, Dropbox).'
	},
	{
		tool: 'Essential Mod',
		category: 'Client mod / P2P hosting',
		coreStrength:
			'Easy friend world hosting',
		pocketmcWins:
			'PocketMC manages real server instances. Essential is convenient for casual worlds, but it is not a serious server management app.'
	},
	{
		tool: 'Minehut',
		category: 'Managed cloud host',
		coreStrength:
			'Free-to-start hosted servers and community hosting',
		pocketmcWins:
			'PocketMC wins on local ownership, file control, fewer platform restrictions, and self-hosted privacy/control.'
	},
	{
		tool: 'playit.gg',
		category: 'Tunnel service',
		coreStrength:
			'Excellent public tunnel service',
		pocketmcWins:
			'PocketMC includes Playit.gg as part of a full server-management workflow instead of forcing users to combine tools manually like it\'s 2012.'
	}
];
