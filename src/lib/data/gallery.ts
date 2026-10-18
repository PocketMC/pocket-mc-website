export type CategoryId =
	| 'all'
	| 'instances'
	| 'console'
	| 'mods'
	| 'backups'
	| 'networking'
	| 'runtimes'
	| 'mobile'
	| 'themes';

export type Category = {
	id: CategoryId;
	label: string;
	description: string;
};

export const categories: Category[] = [
	{ id: 'all', label: 'All', description: 'Complete screenshot collection of PocketMC across desktop and mobile.' },
	{ id: 'instances', label: 'Dashboard', description: 'Instance management, server control cards, and system preferences.' },
	{ id: 'console', label: 'Console', description: 'Real-time ANSI colored terminal with command execution and log search.' },
	{ id: 'mods', label: 'Mods & Plugins', description: 'Mod management, Modrinth/CurseForge marketplace, and plugin registry.' },
	{ id: 'backups', label: 'Backups & Config', description: 'Automated incremental cloud backups and server.properties editor.' },
	{ id: 'networking', label: 'Tunnels & Remote', description: 'Zero-router Playit.gg tunnels, port maps, and encrypted remote web control.' },
	{ id: 'runtimes', label: 'Java Runtimes', description: 'App-local Adoptium Java JRE provisioning for all Minecraft versions.' },
	{ id: 'mobile', label: 'Mobile App', description: 'Mobile-optimized companion web interface for smartphones and tablets.' },
	{ id: 'themes', label: 'Themes', description: 'Mica, Acrylic, and custom wallpaper personalization.' }
];

export type GalleryItem = {
	id: string;
	categoryId: CategoryId;
	categoryLabel: string;
	title: string;
	caption: string;
	src: string;
	width: number;
	height: number;
	orientation: 'landscape' | 'portrait';
};

export const galleryItems: GalleryItem[] = [
	// Dashboard & Core
	{
		id: 'dashboard',
		categoryId: 'instances',
		categoryLabel: 'Dashboard',
		title: 'Instance Dashboard',
		caption: 'Central control room showing active instances, CPU/RAM telemetry, player counts, and quick actions.',
		src: '/screenshots/screenshot-dashboard.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'app-settings',
		categoryId: 'instances',
		categoryLabel: 'Dashboard',
		title: 'Application Preferences',
		caption: 'Startup behavior, system tray persistence, crash watchdogs, and Discord Rich Presence broadcast.',
		src: '/screenshots/app-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'about',
		categoryId: 'instances',
		categoryLabel: 'Dashboard',
		title: 'About PocketMC',
		caption: 'Local-first architecture, MIT open source licensing, and project documentation.',
		src: '/screenshots/about.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Console & Logs
	{
		id: 'console',
		categoryId: 'console',
		categoryLabel: 'Console',
		title: 'ANSI Terminal & Logs',
		caption: 'High-speed terminal with ANSI color support, log filtering, auto-scroll lock, and command history.',
		src: '/screenshots/screenshot-console.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Mods & Plugins
	{
		id: 'mod-management',
		categoryId: 'mods',
		categoryLabel: 'Mods & Plugins',
		title: 'Mod Manager',
		caption: 'Enable or disable mods with a single toggle, view dependencies, and jump to folders in Explorer.',
		src: '/screenshots/screenshot-mod-management.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'marketplace',
		categoryId: 'mods',
		categoryLabel: 'Mods & Plugins',
		title: 'Mod Marketplace',
		caption: 'Direct in-app search and installation from Modrinth and CurseForge without opening a browser.',
		src: '/screenshots/mod-marketplace.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'plugins',
		categoryId: 'mods',
		categoryLabel: 'Mods & Plugins',
		title: 'Plugin Registry',
		caption: 'Plugin management for Paper and Bedrock PocketMine-MP servers.',
		src: '/screenshots/screenshot-plugins.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Backups & Config
	{
		id: 'backups',
		categoryId: 'backups',
		categoryLabel: 'Backups & Config',
		title: 'Cloud Backups',
		caption: 'Automated snapshots with safe RCON save flushes and cloud replication to Google Drive and Dropbox.',
		src: '/screenshots/screenshot-backups.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'server-settings',
		categoryId: 'backups',
		categoryLabel: 'Backups & Config',
		title: 'Server Properties Editor',
		caption: 'Visual configuration editor with inline descriptions, field validation, and instant conflict alerts.',
		src: '/screenshots/server-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Networking & Remote
	{
		id: 'tunnels',
		categoryId: 'networking',
		categoryLabel: 'Tunnels & Remote',
		title: 'Playit.gg Tunnels',
		caption: 'Zero-router port forwarding integration. Generates instant public join addresses for multiplayer.',
		src: '/screenshots/tunnels.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'ports-map',
		categoryId: 'networking',
		categoryLabel: 'Tunnels & Remote',
		title: 'Port Mapping & Diagnostics',
		caption: 'Live overview of active ports across Minecraft, RCON, Query, and tunnel agents to avoid conflicts.',
		src: '/screenshots/ports-map.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'remote-control',
		categoryId: 'networking',
		categoryLabel: 'Tunnels & Remote',
		title: 'Encrypted Remote Control',
		caption: 'Local web server allowing full server management from smartphones or laptops across your network.',
		src: '/screenshots/remote-control.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},
	{
		id: 'permissions',
		categoryId: 'networking',
		categoryLabel: 'Tunnels & Remote',
		title: 'Role-Based Permissions',
		caption: 'Granular access control scopes (Console, Players, Backups, Files) for co-administrators.',
		src: '/screenshots/remote-control-permissions.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Java Runtimes
	{
		id: 'java-runtimes',
		categoryId: 'runtimes',
		categoryLabel: 'Java Runtimes',
		title: 'App-Local Java Provisioning',
		caption: 'Zero system PATH conflicts. Automatic download and isolation of Adoptium Java 8 through 25.',
		src: '/screenshots/java-runtimes.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape'
	},

	// Themes & Personalization
	{
		id: 'themes',
		categoryId: 'themes',
		categoryLabel: 'Themes',
		title: 'Mica & Wallpaper Theming',
		caption: 'Custom background image uploads, blur intensity controls, and native Windows 11 Mica materials.',
		src: '/screenshots/themes-showcase.webp',
		width: 7736,
		height: 3085,
		orientation: 'landscape'
	},

	// Mobile Companion App (1206x2622 portrait)
	{
		id: 'mobile-home',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile Dashboard',
		caption: 'Touch-optimized overview of active servers, live CPU/RAM metrics, and server power controls.',
		src: '/screenshots/mobile-home.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-console',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile Terminal',
		caption: 'Stream live ANSI logs and send server commands directly with a virtual keyboard toolbar.',
		src: '/screenshots/mobile-console.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-instances',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile Instance Selector',
		caption: 'Switch between multiple server instances and copy public tunnel join links on the go.',
		src: '/screenshots/mobile-instances.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-players',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Live Player Management',
		caption: 'Inspect online players, kick/ban/op with one tap, or broadcast server-wide notifications.',
		src: '/screenshots/mobile-players.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-backups',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile Backup Trigger',
		caption: 'Trigger immediate world snapshots and verify cloud synchronization status from your phone.',
		src: '/screenshots/mobile-backups.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-file-management',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile File Explorer',
		caption: 'Navigate server directories, read log files, and edit configuration parameters on touchscreens.',
		src: '/screenshots/mobile-file-management.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-login',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Mobile PIN Login',
		caption: 'PIN-protected authentication safeguarding remote sessions from unauthorized access.',
		src: '/screenshots/mobile-login.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	},
	{
		id: 'mobile-welcome',
		categoryId: 'mobile',
		categoryLabel: 'Mobile App',
		title: 'Quick QR Dashboard Access',
		caption: 'Scan the desktop QR code with your phone or tablet to open the web dashboard URL instantly without typing IP addresses.',
		src: '/screenshots/mobile-welcome.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait'
	}
];
