export type FaqItem = {
	id: string;
	category: string;
	question: string;
	answer: string[];
	code?: string;
	menuPath?: string[];
};

export const faqItems: FaqItem[] = [
	{
		id: 'multiplayer-remote',
		category: 'Networking & Access',
		question: 'How do my friends join the server, and how can I manage it remotely?',
		answer: [
			'PocketMC supports remote access for both gaming and administration without router configuration:',
			'1. For Players (Joining Minecraft): Use the built-in Playit.gg tunnel agent. It routes your local port to a public address (for example, example.playit.gg). Friends can paste this address directly into their Minecraft multiplayer menu to connect instantly.',
			'2. For Admins (Managing Remotely): Enable the Remote Control Dashboard in settings. This hosts a secure, password-protected web panel accessible over LAN or over the internet via Playit.gg HTTPS or Cloudflare Quick Tunnels. You can open the dashboard URL directly on your phone or tablet by scanning the displayed QR code.'
		]
	},
	{
		id: 'lan-same-network',
		category: 'Networking & Access',
		question: 'Why can’t friends on my home Wi-Fi join using my LAN IP?',
		answer: [
			'Make sure your host machine’s Windows Firewall is allowing incoming connections on Minecraft’s port (Java: 25565, Bedrock: 19132).',
			'If your network profile in Windows is set to "Public Network", Windows Firewall will block connections from other devices on your local network. Change your Wi-Fi or Ethernet connection profile to "Private Network" in Windows Settings.'
		],
		menuPath: ['Windows Settings', 'Network & Internet', 'Network Profile', 'Private']
	},
	{
		id: 'static-public-ip-port-forward',
		category: 'Networking & Access',
		question: 'Can I use traditional router port forwarding and a static public IP with PocketMC?',
		answer: [
			'Yes. While PocketMC includes built-in Playit.gg and Cloudflare Quick Tunnels so you do not need to port forward, traditional router port forwarding works directly out of the box.',
			'If you forward port 25565 (or your custom instance port) in your home router to your local machine IP, players can connect using your static public IP or custom domain directly.'
		]
	},
	{
		id: 'playit-tunneling',
		category: 'Networking & Access',
		question: 'How does Playit.gg tunneling work? Do I need to configure port forwarding?',
		answer: [
			'Zero router configuration or port forwarding is required. PocketMC features an integrated Playit.gg agent setup wizard.',
			'Once linked, it automatically provisions background agent processes, maps local ports (Java 25565, Bedrock 19132, Geyser, PocketMine, and Simple Voice Chat), and creates public addresses for your players.'
		]
	},
	{
		id: 'remote-control-tunnel-duration',
		category: 'Networking & Access',
		question: 'Why does my Cloudflare Quick Tunnel remote control URL change when I restart PocketMC?',
		answer: [
			'Cloudflare Quick Tunnels generate temporary, ephemeral URLs designed for quick, zero-config access without signing into a Cloudflare account.',
			'Whenever PocketMC or the remote control tunnel restarts, a fresh secure URL is generated.',
			'If you want a permanent custom URL for your web panel, you can use Playit.gg tunnels with a custom domain or access the panel directly via your local network LAN address.'
		]
	},
	{
		id: 'discord-remote-alerts',
		category: 'Networking & Access',
		question: 'How do I link PocketMC with Discord to receive server alerts and remote commands?',
		answer: [
			'Join the official PocketMC Discord server, head to the #bot-commands channel, and type /link.',
			'The bot will generate a pairing token. Click "Connect Desktop App" or paste the token into your PocketMC Remote Control settings to link your account.',
			'Once paired, you will receive real-time direct messages for server startup, shutdown, crash warnings, and automated backup status.'
		],
		menuPath: ['Settings', 'Remote Control', 'Discord Integration']
	},
	{
		id: 'admin-privileges',
		category: 'Installation & Security',
		question: 'Does PocketMC require Windows administrator privileges?',
		answer: [
			'No. PocketMC runs entirely in standard user-space and installs per-user. It downloads Adoptium JRE runtimes locally and maps isolated instance directories without requiring administrative elevation or polluting your Windows system environment variables.'
		]
	},
	{
		id: 'ai-privacy',
		category: 'Installation & Security',
		question: 'Are my server logs shared with third-party AI systems?',
		answer: [
			'Only if you explicitly configure an AI provider and request a log summary.',
			'PocketMC pre-processes and sanitizes all logs locally (automatically scrubbing IP addresses, player emails, and personal info) before sending them to your provider of choice (Google Gemini, OpenAI, Claude, Mistral, Groq, or local Ollama).'
		]
	},
	{
		id: 'windows-publisher',
		category: 'Installation & Security',
		question: 'Why does Windows SmartScreen warn about an unknown publisher?',
		answer: [
			'The Windows builds are signed through community certificates. When SmartScreen appears on first run, click "More info" and then "Run anyway" to launch the installer.',
			'PocketMC is 100% free, open source, and auditable on GitHub.'
		],
		menuPath: ['More info', 'Run anyway']
	},
	{
		id: 'java-runtimes',
		category: 'Runtimes & Compatibility',
		question: 'Do I need to install Java or PHP on my computer beforehand?',
		answer: [
			'No. PocketMC manages all runtimes locally. It automatically provisions the correct Adoptium Java version (Java 8, 11, 17, 21, or 25) based on your Minecraft server type and version.',
			'For Bedrock PocketMine-MP servers, it installs an app-local, optimized PHP 8.2 PM5 runtime automatically.'
		]
	},
	{
		id: 'bedrock-crossplay',
		category: 'Gameplay & Engines',
		question: 'Can Bedrock (console/mobile) players join a Java server managed by PocketMC?',
		answer: [
			'Yes. PocketMC supports automatic GeyserMC and Floodgate setup during server creation for supported Java server loaders (Paper, Fabric).',
			'It also scans your mod and plugin folders to verify cross-play status and displays active cross-play indicators on your dashboard.'
		]
	},
	{
		id: 'import-worlds',
		category: 'Gameplay & Engines',
		question: 'Can I import existing worlds or custom Bedrock add-ons?',
		answer: [
			'Yes. You can import existing world folders directly, place custom JAR files, or ingest Bedrock .mcpack, .mcaddon, and world .zip files.',
			'PocketMC automatically parses manifests, maps dependency requirements, and registers packs.'
		]
	},
	{
		id: 'manual-mods-installation',
		category: 'Gameplay & Engines',
		question: 'Can I add or paste custom mods directly into the mods folder?',
		answer: [
			'Yes. You can paste custom .jar mod files directly into your server instance’s mods folder via your file manager.',
			'Ensure the mods you install match your exact server loader (Fabric, Forge, NeoForge) and Minecraft version. Some client-only mods (such as visual HUDs or minimaps) will crash dedicated servers if placed in the server mods directory.'
		]
	},
	{
		id: 'curseforge-api-key',
		category: 'Gameplay & Engines',
		question: 'How do I resolve "No compatible version found" or API errors when downloading CurseForge modpacks?',
		answer: [
			'Most CurseForge modpacks are packaged specifically for Minecraft client launchers rather than dedicated servers.',
			'If you encounter API errors, you can download the server pack .zip directly from CurseForge in your browser and import it locally into PocketMC using the Import option, or reset your free CurseForge API key in Settings.'
		],
		menuPath: ['Settings', 'Integrations', 'CurseForge API Key']
	},
	{
		id: 'bedrock-addons-order',
		category: 'Gameplay & Engines',
		question: 'How does PocketMC handle Bedrock resource packs and behavior packs?',
		answer: [
			'PocketMC automatically extracts, validates manifests, and registers both Behavior Packs and Resource Packs when you import .mcaddon, .mcpack, or .zip files.',
			'Packs are applied to your valid_known_packs.json and instance configuration automatically so players on console or mobile download the required textures upon joining.'
		]
	},
	{
		id: 'storage-backups',
		category: 'Storage & Safety',
		question: 'Where are my server files stored and how secure are the backups?',
		answer: [
			'All server files are stored 100% locally on your machine in the root folder you choose.',
			"PocketMC's built-in backup engine locks active servers using RCON save-holding before copying, skips lock files like session.lock to avoid write conflicts, and offers secure, OAuth-based replication directly to Google Drive, Dropbox, and OneDrive."
		]
	},
	{
		id: 'sleep-mode',
		category: 'System & Performance',
		question: 'Will my server stay online if my Windows PC goes to sleep?',
		answer: [
			'PocketMC includes native Windows power integration that automatically prevents your PC from entering sleep mode while any Minecraft server instance is actively running.',
			'Once all servers are stopped, standard Windows power saving behaviors resume immediately.'
		]
	},
	{
		id: 'autostart-system-boot',
		category: 'System & Performance',
		question: 'Can PocketMC start my Minecraft servers automatically when the computer boots up?',
		answer: [
			'Yes. You can enable "Start with Windows" in PocketMC Settings, and set individual server instances to "Auto-Start with PocketMC" in their respective instance settings.',
			'For dedicated headless servers, PocketMC can be scheduled via Windows Task Scheduler to initiate at system startup even before desktop login.'
		],
		menuPath: ['Instance Settings', 'General', 'Auto-Start Server']
	},
	{
		id: 'console-copy-logs',
		category: 'System & Performance',
		question: 'How do I export or share server console logs if my server crashes?',
		answer: [
			'You can highlight and copy text directly from the live console, or go to Settings > Diagnostics and click "Generate Bundle".',
			'PocketMC automatically compiles your crash logs into a sanitized .zip file with all passwords, tokens, and personal IP addresses redacted so you can safely share it on Discord or GitHub for support.'
		],
		menuPath: ['Settings', 'Diagnostics', 'Generate Bundle']
	}
];

