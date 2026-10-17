export type GalleryItem = {
	id: string;
	title: string;
	category: 'desktop' | 'mobile';
	src: string;
	width: number;
	height: number;
	orientation: 'landscape' | 'portrait';
	caption: string;
};

export const galleryItems: GalleryItem[] = [
	// Desktop
	{
		id: 'dashboard',
		title: 'Dashboard',
		category: 'desktop',
		src: '/screenshots/screenshot-dashboard.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Manage and monitor all your server instances from one central hub.'
	},
	{
		id: 'console',
		title: 'Terminal & logs',
		category: 'desktop',
		src: '/screenshots/screenshot-console.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Real-time ANSI colored terminal with command history and log search.'
	},
	{
		id: 'mod-management',
		title: 'Mod manager',
		category: 'desktop',
		src: '/screenshots/screenshot-mod-management.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Enable or disable mods with a toggle and jump directly to files.'
	},
	{
		id: 'marketplace',
		title: 'Marketplace',
		category: 'desktop',
		src: '/screenshots/mod-marketplace.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Search and install mods and modpacks directly from Modrinth and CurseForge.'
	},
	{
		id: 'plugins',
		title: 'Plugins',
		category: 'desktop',
		src: '/screenshots/screenshot-plugins.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Browse and manage server plugins for Paper, Purpur, and PocketMine.'
	},
	{
		id: 'backups',
		title: 'Backups',
		category: 'desktop',
		src: '/screenshots/screenshot-backups.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Scheduled world backups with safe RCON save flushes and cloud sync.'
	},
	{
		id: 'tunnels',
		title: 'Playit.gg tunnels',
		category: 'desktop',
		src: '/screenshots/tunnels.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Zero-config tunneling so friends can connect without port forwarding.'
	},
	{
		id: 'remote-control',
		title: 'Remote control',
		category: 'desktop',
		src: '/screenshots/remote-control.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Secure web interface to manage servers from phones or laptops on your LAN.'
	},
	{
		id: 'permissions',
		title: 'Permissions & roles',
		category: 'desktop',
		src: '/screenshots/remote-control-permissions.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Role-based access control for console, players, and server files.'
	},
	{
		id: 'java-runtimes',
		title: 'Adoptium Java runtimes',
		category: 'desktop',
		src: '/screenshots/java-runtimes.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Automatic download and isolation of Adoptium Java 8 through 25.'
	},
	{
		id: 'server-settings',
		title: 'Server properties',
		category: 'desktop',
		src: '/screenshots/server-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Visual editor for server.properties with inline descriptions and tooltips.'
	},
	{
		id: 'ports-map',
		title: 'Port mapping',
		category: 'desktop',
		src: '/screenshots/ports-map.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Visual overview of allocated ports to prevent conflicts.'
	},
	{
		id: 'themes',
		title: 'Themes & styling',
		category: 'desktop',
		src: '/screenshots/themes-showcase.webp',
		width: 7736,
		height: 3085,
		orientation: 'landscape',
		caption: 'Custom wallpapers, blur adjustments, and Windows 11 Mica materials.'
	},
	{
		id: 'app-settings',
		title: 'App settings',
		category: 'desktop',
		src: '/screenshots/app-settings.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Preferences for startup, crash watchdogs, and Discord Rich Presence.'
	},
	{
		id: 'about',
		title: 'About PocketMC',
		category: 'desktop',
		src: '/screenshots/about.webp',
		width: 1920,
		height: 1040,
		orientation: 'landscape',
		caption: 'Free, local-first, and open source under GPL-3.0.'
	},

	// Mobile
	{
		id: 'mobile-home',
		title: 'Mobile dashboard',
		category: 'mobile',
		src: '/screenshots/mobile-home.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Touch-friendly dashboard to check server health and player counts.'
	},
	{
		id: 'mobile-console',
		title: 'Mobile console',
		category: 'mobile',
		src: '/screenshots/mobile-console.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Live streaming terminal with quick command buttons on your phone.'
	},
	{
		id: 'mobile-instances',
		title: 'Mobile instance selector',
		category: 'mobile',
		src: '/screenshots/mobile-instances.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Switch between multiple server instances with a quick swipe.'
	},
	{
		id: 'mobile-players',
		title: 'Live players',
		category: 'mobile',
		src: '/screenshots/mobile-players.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'See who is online and manage player status from your phone.'
	},
	{
		id: 'mobile-backups',
		title: 'Mobile backups',
		category: 'mobile',
		src: '/screenshots/mobile-backups.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Trigger a manual world snapshot on the go.'
	},
	{
		id: 'mobile-file-management',
		title: 'Mobile file manager',
		category: 'mobile',
		src: '/screenshots/mobile-file-management.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Browse server folders and tweak configs straight from mobile.'
	},
	{
		id: 'mobile-login',
		title: 'Mobile PIN login',
		category: 'mobile',
		src: '/screenshots/mobile-login.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'PIN-protected access to safeguard your server from remote access.'
	},
	{
		id: 'mobile-welcome',
		title: 'QR code pairing',
		category: 'mobile',
		src: '/screenshots/mobile-welcome.webp',
		width: 1206,
		height: 2622,
		orientation: 'portrait',
		caption: 'Scan the desktop QR code to pair your phone instantly.'
	}
];
