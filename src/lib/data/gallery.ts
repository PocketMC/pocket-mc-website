export type GalleryItem = {
	id: string;
	title: string;
	kicker: string;
	category: 'desktop' | 'mobile';
	src: string;
	width: number;
	height: number;
	orientation: 'landscape' | 'portrait';
	description: string;
	bullets: string[];
};

export const galleryItems: GalleryItem[] = [
	// Desktop Screens
	{
		id: 'desktop-dashboard',
		title: 'Unified Server Dashboard',
		kicker: 'INSTANCE MANAGER',
		category: 'desktop',
		src: '/screenshots/screenshot-dashboard.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Centralized command center for managing multiple server instances simultaneously. Monitor real-time CPU, RAM allocation, player activity, and network status.',
		bullets: [
			'Per-instance isolation with independent working directories and runtimes',
			'Real-time hardware telemetry with over-allocation warnings',
			'Instant start, graceful RCON stop, and force-kill fallbacks'
		]
	},
	{
		id: 'desktop-console',
		title: 'High-Throughput ANSI Terminal',
		kicker: 'CONSOLE & DIAGNOSTICS',
		category: 'desktop',
		src: '/screenshots/screenshot-console.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Low-latency server console with full ANSI 256-color support, log level filtering, auto-scroll locking, and integrated AI crash log analysis.',
		bullets: [
			'Command input with history navigation and auto-completion',
			'Local log sanitization scrubbing personal IP addresses and secrets',
			'AI-assisted crash log translation for rapid troubleshooting'
		]
	},
	{
		id: 'desktop-mod-management',
		title: 'Mod & Add-on Management',
		kicker: 'CONTENT CURATION',
		category: 'desktop',
		src: '/screenshots/screenshot-mod-management.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Manage mods, modpacks, and Bedrock add-ons with direct toggle switches. Open file locations in Explorer with a single click.',
		bullets: [
			'Direct toggle to enable or disable mods without file deletion',
			'One-click jump to file location in native file manager',
			'Automatic dependency validation across Minecraft versions'
		]
	},
	{
		id: 'desktop-mod-marketplace',
		title: 'Modrinth & CurseForge Marketplace',
		kicker: 'INTEGRATED STORE',
		category: 'desktop',
		src: '/screenshots/mod-marketplace.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Search and install server mods directly from Modrinth and CurseForge without leaving the application or manually downloading jar files.',
		bullets: [
			'Curated search across popular mod repositories with version filtering',
			'Automatic dependency download and conflict detection',
			'Batch installation and version upgrade notifications'
		]
	},
	{
		id: 'desktop-plugins',
		title: 'Plugin Registry & Updates',
		kicker: 'EXTENSIONS',
		category: 'desktop',
		src: '/screenshots/screenshot-plugins.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Dedicated plugin manager for Paper, Purpur, Spigot, and Bedrock PocketMine-MP servers with automated compatibility checking.',
		bullets: [
			'Instant search through SpigotMC, Hangar, and Poggit repositories',
			'Clean enable/disable toggling and configuration shortcuts',
			'Isolated configuration file editors with JSON/YAML validation'
		]
	},
	{
		id: 'desktop-backups',
		title: 'Multi-Cloud Backup Replication',
		kicker: 'AUTOMATED BACKUPS',
		category: 'desktop',
		src: '/screenshots/screenshot-backups.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Automated incremental backups with SHA-256 archive checksums and cloud replication to Google Drive, Dropbox, or OneDrive.',
		bullets: [
			'Zero corruption guarantees using safe RCON save-flush sequences',
			'Custom retention policies and automated pruning of old snapshots',
			'Instant one-click rollback to any previous backup timestamp'
		]
	},
	{
		id: 'desktop-tunnels',
		title: 'Zero-Router Playit.gg Tunneling',
		kicker: 'NETWORK MESH',
		category: 'desktop',
		src: '/screenshots/tunnels.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Host multiplayer games without port forwarding or exposing your home IP. Integrated Playit.gg tunnel agent provisions public join addresses instantly.',
		bullets: [
			'Built-in background tunnel agent with automatic reconnect',
			'Instant copy-to-clipboard public address for players',
			'Support for custom subdomains and custom DNS records'
		]
	},
	{
		id: 'desktop-remote',
		title: 'Encrypted Remote Web Control',
		kicker: 'REMOTE ACCESS',
		category: 'desktop',
		src: '/screenshots/remote-control.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'PocketMC hosts a secure local web interface accessible from smartphones, tablets, or remote browsers over local Wi-Fi or Cloudflare Quick Tunnels.',
		bullets: [
			'End-to-end encrypted connection with password and PIN authentication',
			'QR code mobile pairing for instant phone connection',
			'Full instance control, live terminal, and file manager over HTTP'
		]
	},
	{
		id: 'desktop-permissions',
		title: 'Fine-Grained Role Permissions',
		kicker: 'SECURITY & RBAC',
		category: 'desktop',
		src: '/screenshots/remote-control-permissions.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Delegate server administration with granular permission scopes. Grant moderators console access without giving access to server files or credentials.',
		bullets: [
			'Scoped permission controls (Console, Players, Backups, Files, Settings)',
			'Multi-user accounts with audit logs for security tracking',
			'Session timeout guards and IP rate-limiting'
		]
	},
	{
		id: 'desktop-runtimes',
		title: 'App-Local Java Provisioning',
		kicker: 'RUNTIMES MANAGER',
		category: 'desktop',
		src: '/screenshots/java-runtimes.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Zero Java configuration headaches. PocketMC downloads and manages isolated Adoptium JRE binaries locally without modifying system PATH.',
		bullets: [
			'Automated Java 8, 11, 17, 21, and 25 provisioning per server instance',
			'Managed PHP 8.2 runtime for PocketMine-MP Bedrock servers',
			'Runs completely in user space without administrator privileges'
		]
	},
	{
		id: 'desktop-server-settings',
		title: 'Interactive Config Editor',
		kicker: 'SERVER PROPERTIES',
		category: 'desktop',
		src: '/screenshots/server-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Visual configuration editor for server.properties with human-readable descriptions, toggle switches, port conflict alerts, and inline documentation.',
		bullets: [
			'Real-time tooltips explaining every Minecraft configuration key',
			'Instant validation preventing invalid ports or malformed values',
			'Quick presets for survival, creative, anarchy, and hardcore servers'
		]
	},
	{
		id: 'desktop-ports-map',
		title: 'Port Mapping & Routing',
		kicker: 'NETWORK ROUTING',
		category: 'desktop',
		src: '/screenshots/ports-map.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Visual matrix of all active and allocated network ports across Minecraft, RCON, Query, and tunnel endpoints, preventing port collision.',
		bullets: [
			'Automatic detection of occupied ports with conflict resolution',
			'Dual IPv4 and IPv6 binding diagnostics',
			'Live RCON port testing and socket connectivity verification'
		]
	},
	{
		id: 'desktop-themes',
		title: 'Mica, Acrylic & Wallpaper Theming',
		kicker: 'PERSONALIZATION',
		category: 'desktop',
		src: '/screenshots/themes-showcase.webp',
		width: 7736,
		height: 3085,
		orientation: 'landscape',
		description:
			'Tailor the visual aesthetic of PocketMC. Upload custom wallpapers, adjust Gaussian blur (0–120px), customize dimming, and choose native Windows 11 backdrops.',
		bullets: [
			'Hardware-accelerated Mica and Acrylic window background effects',
			'Custom wallpaper image upload with wallpaper blur slider',
			'Dynamic accent color palettes with custom HEX picker'
		]
	},
	{
		id: 'desktop-app-settings',
		title: 'System Preferences & Watchdogs',
		kicker: 'APPLICATION PREFERENCES',
		category: 'desktop',
		src: '/screenshots/app-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'Configure startup behavior, automatic updates, system tray minimization, crash watchdogs, and global telemetry settings.',
		bullets: [
			'Minimize-to-tray with background server persistence',
			'Automated crash detection with instant auto-restart triggers',
			'Discord Rich Presence status broadcast customization'
		]
	},
	{
		id: 'desktop-about',
		title: 'About PocketMC & Open Source',
		kicker: 'ABOUT & COMMUNITY',
		category: 'desktop',
		src: '/screenshots/about.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		description:
			'PocketMC is free and open-source software licensed under GPL-3.0, built with Rust, Svelte, and native desktop UI tooling.',
		bullets: [
			'100% free and open-source with no telemetry or paywalls',
			'Active GitHub community with regular feature updates',
			'Integrated direct links to changelogs, documentation, and Discord'
		]
	},

	// Mobile Screens (Portrait ~9:19.5, 1206x2622)
	{
		id: 'mobile-home',
		title: 'Mobile Companion Dashboard',
		kicker: 'MOBILE OVERVIEW',
		category: 'mobile',
		src: '/screenshots/mobile-home.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Touch-optimized remote dashboard designed for mobile browsers. Monitor server uptime, CPU/RAM telemetry, and player counts from your phone.',
		bullets: [
			'Responsive layout crafted specifically for mobile touchscreens',
			'Instant server power controls (Start, Stop, Restart)',
			'Live hardware resource dials and status indicators'
		]
	},
	{
		id: 'mobile-console',
		title: 'Mobile Live Console & ANSI Logs',
		kicker: 'MOBILE TERMINAL',
		category: 'mobile',
		src: '/screenshots/mobile-console.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Full interactive terminal on your mobile device. Stream color-coded server logs and send commands directly from your phone.',
		bullets: [
			'Responsive virtual keyboard toolbar with quick command buttons',
			'ANSI color formatting with pause and search capabilities',
			'Smart auto-scroll locking for reading fast log streams'
		]
	},
	{
		id: 'mobile-instances',
		title: 'Mobile Instance Selector',
		kicker: 'SERVER SWITCHING',
		category: 'mobile',
		src: '/screenshots/mobile-instances.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Switch between multiple server instances seamlessly. View active players, server version, and tunnel endpoints at a glance.',
		bullets: [
			'Smooth touch carousel for switching between instances',
			'Quick instance status cards with individual power controls',
			'Fast copy-button for public tunnel join addresses'
		]
	},
	{
		id: 'mobile-players',
		title: 'Live Player Monitor & Actions',
		kicker: 'PLAYER MANAGEMENT',
		category: 'mobile',
		src: '/screenshots/mobile-players.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'See who is currently online on your server. Kick, ban, op, or message players directly from your phone with a single tap.',
		bullets: [
			'Live connected player list with avatars and ping times',
			'One-touch moderation actions (Kick, Ban, Op, Deop)',
			'Direct player whisper and server-wide broadcast messaging'
		]
	},
	{
		id: 'mobile-backups',
		title: 'Mobile Backup Trigger & Status',
		kicker: 'CLOUD BACKUPS',
		category: 'mobile',
		src: '/screenshots/mobile-backups.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Trigger manual backups on the go or inspect automated backup schedules. Verify SHA-256 cloud replication status from anywhere.',
		bullets: [
			'One-tap manual backup trigger with safe RCON save flush',
			'Backup history log with cloud synchronization status',
			'Storage usage telemetry and snapshot sizes'
		]
	},
	{
		id: 'mobile-file-management',
		title: 'Mobile File Explorer',
		kicker: 'FILE SYSTEM',
		category: 'mobile',
		src: '/screenshots/mobile-file-management.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Browse server directories, inspect logs, edit config files, and manage world saves straight from your mobile browser.',
		bullets: [
			'Touch-friendly file and folder navigation',
			'Built-in text editor for rapid configuration adjustments',
			'Direct file download and upload support'
		]
	},
	{
		id: 'mobile-login',
		title: 'Mobile Authentication & Security',
		kicker: 'ACCESS SECURITY',
		category: 'mobile',
		src: '/screenshots/mobile-login.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Secure PIN-based authentication protecting your server from unauthorized remote access over local Wi-Fi or the internet.',
		bullets: [
			'Encrypted credential storage with rate-limiting brute force protection',
			'Persistent remember-me sessions for trusted mobile devices',
			'Immediate remote session revocation from the desktop app'
		]
	},
	{
		id: 'mobile-welcome',
		title: 'Mobile Quick Connect & Pairing',
		kicker: 'DEVICE PAIRING',
		category: 'mobile',
		src: '/screenshots/mobile-welcome.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		description:
			'Zero-friction pairing experience. Scan the QR code displayed on PocketMC desktop to instantly pair your phone without typing URLs.',
		bullets: [
			'Instant camera QR code detection with auto-login token',
			'Local LAN auto-discovery with zero configuration',
			'Seamless fallback to Cloudflare / Playit.gg encrypted tunnels'
		]
	}
];
