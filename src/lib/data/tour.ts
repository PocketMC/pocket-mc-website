export type TourTab = {
	id: string;
	label: string;
	title: string;
	description: string;
	image?: string;
	images?: string[];
	video?: string;
	bullets: string[];
};

export const tourTabs: TourTab[] = [
	{
		id: 'overview',
		label: 'Overview Video',
		title: 'Complete Native Server Control',
		video: '/Video/PocketMC.mp4',
		description:
			'Watch PocketMC in action: 1-click server provisioning, real-time Adoptium Java runtime installation, colorized live terminal logging, and zero-router Playit.gg network tunneling.',
		bullets: [
			'Single-click instance creation for Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock & PocketMine-MP',
			'Interactive live terminal with ANSI color support, auto-scroll, and command auto-completion',
			'Integrated Playit.gg tunnel agent with instant copy-to-clipboard public join address',
			'Zero-friction user experience running entirely in desktop user-space'
		]
	},
	{
		id: 'instances',
		label: 'Instance Dashboard',
		title: 'Unified Server Management Hub',
		image: '/screenshots/screenshot-dashboard.webp',
		description:
			'Organize, monitor, and control multiple server instances from one centralized dashboard. Track real-time CPU/RAM consumption, player counts, server uptime, and active tunnel endpoints with instant one-touch actions.',
		bullets: [
			'Dedicated cards for each isolated server instance with real-time status badges',
			'Hardware metrics with 80% RAM over-allocation warning guard',
			'Live cross-play indicators showing Geyser and Floodgate status',
			'Instant start, graceful stop with RCON save-flush, and force-kill fallback'
		]
	},
	{
		id: 'console',
		label: 'Console & Logs',
		title: 'High-Performance Terminal & AI Diagnostics',
		image: '/screenshots/screenshot-console.webp',
		description:
			'Interact directly with your server via a responsive terminal. Features ANSI color formatting, search filtering, and smart AI session summaries that translate multi-megabyte crash logs into plain-English post-mortems.',
		bullets: [
			'High-throughput ANSI color-coded console with pause and search capabilities',
			'Command input with history navigation and common command quick-actions',
			'Local log sanitization automatically scrubs IP addresses and personal identifiers',
			'Built-in Ollama & cloud AI integration (Gemini, Claude, OpenAI) for instant session reports'
		]
	},
	{
		id: 'plugins',
		label: 'Mods & Add-ons',
		title: 'Curated Content Marketplaces',
		image: '/screenshots/mod-marketplace.webp',
		description:
			'Browse and install server-side mods, plugins, and modpacks directly from Modrinth, CurseForge, and Poggit without opening a browser. Manage enabled/disabled states with three-dot options menus and direct folder navigation.',
		bullets: [
			'Native Modrinth and CurseForge search with dependency resolution',
			'Three-dot options menu with direct Windows Explorer (/select) folder jumps',
			'Enable, disable, or update add-ons without manually renaming jar files',
			'Bedrock pack (.mcpack, .mcaddon, .zip) ingestion, validation, and auto-registration'
		]
	},
	{
		id: 'backups',
		label: 'Config & Backups',
		title: 'Interactive Config & Cloud Replication',
		image: '/screenshots/screenshot-backups.webp',
		description:
			'Fine-tune server.properties via an interactive grid with live field tooltips and Enter-key saving. Configure automated crash recovery and scheduled backups with RCON save-holding and direct replication to Google Drive, Dropbox, or OneDrive.',
		bullets: [
			'Interactive server.properties editor with real-time descriptions and port-collision checks',
			'Automated scheduled reboot system with customizable in-game countdown warnings',
			'Safe RCON save-flush sequence (save-off/save-all) preventing database write corruption',
			'SHA-256 archive checksums and automated OAuth upload to Google Drive, Dropbox, and OneDrive'
		]
	},
	{
		id: 'runtimes',
		label: 'Java Provisioning',
		title: 'App-Local Runtimes Manager',
		image: '/screenshots/java-runtimes.webp',
		description:
			'Stop fighting global Java environment variables and PATH conflicts. PocketMC downloads Adoptium JRE binaries locally and auto-assigns the exact required version (Java 8, 11, 17, 21, or 25) based on your server engine.',
		bullets: [
			'Pre-configured Adoptium JREs managed cleanly in app-local directory',
			'Automatic version selection matching Minecraft server jar requirements',
			'Official managed PHP 8.2 PM5 runtime for Bedrock PocketMine-MP instances',
			'Zero administrator elevation or registry modifications required'
		]
	},
	{
		id: 'remote',
		label: 'Remote Web Control',
		title: 'Manage Servers From Any Device',
		image: '/screenshots/remote-control.webp',
		description:
			'PocketMC includes a built-in web server hosting a secure, password-protected remote dashboard. Access it over local Wi-Fi or securely over the internet via Playit.gg HTTPS or Cloudflare Quick Tunnels, with multi-user permissions.',
		bullets: [
			'Multi-user accounts with granular permission scopes (Console, Players, Settings, Files)',
			'Quick phone access: scan the QR code to open the web dashboard URL instantly',
			'Live terminal streaming and instance power controls over mobile browsers',
			'Discord Bot integration: receive secure remote control links directly in your DMs'
		]
	},
	{
		id: 'mobile',
		label: 'Mobile UI',
		title: 'Mobile-Optimized Web Dashboard',
		image: '/screenshots/mobile-home.webp',
		description:
			'Full administration power right on your smartphone. Check CPU/RAM consumption, monitor connected players, execute console commands, and trigger backups while away from your PC.',
		bullets: [
			'Responsive mobile layout designed for smartphone touchscreens',
			'One-touch server state controls (Start, Stop, Force Kill)',
			'Live console stream with responsive command input bar',
			'Mobile file explorer and backup status inspector'
		]
	},
	{
		id: 'themes',
		label: 'Themes & Personalization',
		title: 'Mica, Acrylic & Wallpaper Theming',
		image: '/screenshots/themes-showcase.webp',
		description:
			'Personalize your desktop experience. Upload custom wallpaper backgrounds, adjust blur intensity from 0 to 120 px, customize dimming opacity, and pick between Mica, Acrylic, and native window backdrops.',
		bullets: [
			'Custom background image uploads with desktop wallpaper restore presets',
			'Wallpaper blur slider (0–120px) and dark dimming overlay control (0–100%)',
			'Dynamic accent color palettes with custom HEX picker',
			'Hardware-accelerated window backdrops with ClearType text optimization'
		]
	}
];
