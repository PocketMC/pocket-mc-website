export type DocPage = { slug: string; title: string; summary: string };

export const groups: { label: string; pages: DocPage[] }[] = [
	{
		label: 'Start here',
		pages: [
			{
				slug: 'introduction',
				title: 'Introduction',
				summary: 'Architecture overview, local-first principles, and core capabilities.'
			},
			{
				slug: 'servers',
				title: 'Server Engines',
				summary: 'Supported Minecraft engines: Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock BDS, and PocketMine-MP.'
			},
			{
				slug: 'runtimes',
				title: 'Java & Runtimes',
				summary: 'App-local Adoptium JRE management, PHP 8.2 PM5, memory limits, and auto-selection.'
			}
		]
	},
	{
		label: 'Server Management',
		pages: [
			{
				slug: 'addons',
				title: 'Plugins & Mods',
				summary: 'Modrinth and CurseForge marketplace browsing, dependency resolution, and Geyser crossplay.'
			},
			{
				slug: 'management',
				title: 'Instance & World Management',
				summary: 'World importing (.zip/.mcworld), server.properties editor, player bans, and sleep inhibition.'
			},
			{
				slug: 'backups',
				title: 'Cloud Backups',
				summary: 'Safe RCON save-holding, SHA-256 integrity validation, and Google Drive / Dropbox / OneDrive sync.'
			},
			{
				slug: 'recovery',
				title: 'Crash Recovery',
				summary: 'Automated reboot scheduler, crash-loop backoff limits, and Windows sleep inhibition.'
			}
		]
	},
	{
		label: 'Connectivity',
		pages: [
			{
				slug: 'tunnels',
				title: 'Network Tunnels',
				summary: 'Zero-port-forward tunneling via integrated Playit.gg agent and Cloudflare Quick Tunnels.'
			},
			{
				slug: 'remote',
				title: 'Remote Dashboard',
				summary: 'Self-hosted responsive web panel, QR code mobile pairing, and permission scopes.'
			},
			{
				slug: 'discord',
				title: 'Discord Integration',
				summary: 'Real-time Discord Rich Presence (RPC) showing player counts, server engine, and tunnel addresses.'
			}
		]
	},
	{
		label: 'Developer & Security',
		pages: [
			{
				slug: 'api',
				title: 'REST API Reference',
				summary: 'Embedded Kestrel HTTP and WebSocket endpoints for instance lifecycle, console streaming, and files.'
			},
			{
				slug: 'auth',
				title: 'Authentication & Security',
				summary: 'Session cookies, DPAPI credential encryption, loopback isolation, and rate limiting.'
			},
			{
				slug: 'ai',
				title: 'AI Log Summaries',
				summary: 'Log sanitization, token caching, and integration with Ollama, Gemini, OpenAI, Claude, and Mistral.'
			}
		]
	}
];

export const pages = groups.flatMap((group) => group.pages);
