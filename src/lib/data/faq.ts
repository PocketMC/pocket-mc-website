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
			'1. For Players (Joining Minecraft): Use the built-in Playit.gg tunnel agent. It routes your local port to a public address (e.g. example.playit.gg). Friends can paste this address directly into their Minecraft multiplayer menu to connect instantly.',
			'2. For Admins (Managing Remotely): Enable the Remote Control Dashboard in settings. This hosts a secure, password-protected web panel accessible over LAN or over the internet via Playit.gg HTTPS or Cloudflare Quick Tunnels. You can open the dashboard URL directly on your phone or tablet by scanning the displayed QR code.'
		]
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
		id: 'java-runtimes',
		category: 'Runtimes & Compatibility',
		question: 'Do I need to install Java or PHP on my computer beforehand?',
		answer: [
			'No. PocketMC manages all runtimes locally. It automatically provisions the correct Adoptium Java version (Java 8, 11, 17, 21, or 25) based on your Minecraft server type and version.',
			'For Bedrock PocketMine-MP servers, it installs an app-local, optimized PHP 8.2 PM5 runtime automatically.'
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
		id: 'bedrock-crossplay',
		category: 'Gameplay & Engines',
		question: 'Can Bedrock (console/mobile) players join a Java server managed by PocketMC?',
		answer: [
			'Yes. PocketMC supports automatic GeyserMC and Floodgate setup during server creation for supported Java server loaders (Paper, Fabric).',
			'It also scans your mod and plugin folders to verify cross-play status and displays active cross-play indicators on your dashboard.'
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
		id: 'import-worlds',
		category: 'Gameplay & Engines',
		question: 'Can I import existing worlds or custom Bedrock add-ons?',
		answer: [
			'Yes. You can import existing world folders directly, place custom JAR files, or ingest Bedrock .mcpack, .mcaddon, and world .zip files.',
			'PocketMC automatically parses manifests, maps dependency requirements, and registers packs.'
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
		id: 'sleep-mode',
		category: 'System & Performance',
		question: 'Will my server stay online if my Windows PC goes to sleep?',
		answer: [
			'PocketMC includes native Windows power integration that automatically prevents your PC from entering sleep mode while any Minecraft server instance is actively running.',
			'Once all servers are stopped, standard Windows power saving behaviors resume immediately.'
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
	}
];
