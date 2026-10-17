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
				summary: 'Supported Minecraft engines: Paper, Fabric, Forge, NeoForge, Bedrock BDS, and PocketMine.'
			},
			{
				slug: 'runtimes',
				title: 'Java & Runtimes',
				summary: 'App-local Adoptium JRE management, PHP 8.2 PM5, memory limits, and auto-selection.'
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
				summary: 'Custom Discord Rich Presence (RPC) and automated welcome bot verification.'
			}
		]
	},
	{
		label: 'Developer Portal',
		pages: [
			{
				slug: 'api',
				title: 'REST API Reference',
				summary: 'Local daemon HTTP endpoints for server lifecycle, console logs, and instances.'
			},
			{
				slug: 'auth',
				title: 'Authentication & Security',
				summary: 'Token generation, DPAPI encryption, loopback isolation, and access controls.'
			},
			{
				slug: 'mcp',
				title: 'Model Context Protocol (MCP)',
				summary: 'Expose local server control tools and resources directly to AI coding agents.'
			},
			{
				slug: 'webhooks',
				title: 'Webhooks & Events',
				summary: 'Event subscriptions, JSON payload signatures, and real-time state broadcasts.'
			}
		]
	},
	{
		label: 'Operations & Safety',
		pages: [
			{
				slug: 'backups',
				title: 'Cloud Backups',
				summary: 'Safe RCON save-holding, SHA-256 integrity validation, and Google Drive / Dropbox / OneDrive sync.'
			},
			{
				slug: 'recovery',
				title: 'Crash Recovery',
				summary: 'Automated reboot scheduler, crash-loop backoff limits, and Windows sleep inhibition.'
			},
			{
				slug: 'ai',
				title: 'AI Log Summaries',
				summary: 'Log sanitization, token caching, and integration with Ollama, Gemini, and OpenAI.'
			}
		]
	}
];

export const pages = groups.flatMap((group) => group.pages);
