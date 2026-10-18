<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { anchors } from '$lib/anchors';

	let { children, data } = $props();

	onMount(() => {
		if (!location.hash) requestAnimationFrame(() => scrollTo(0, 0));
		return anchors();
	});
</script>

<svelte:head>
	<link rel="alternate" type="text/markdown" href="https://pocketmc.github.io/llms-full.txt" title="Full Markdown Context for LLMs" />
	<link rel="alternate" type="text/plain" href="https://pocketmc.github.io/llms.txt" title="LLM Index" />
	<link rel="help" href="https://pocketmc.github.io/agent-instructions.md" title="AI Agent Instructions" />
	<link rel="sitemap" type="application/xml" href="https://pocketmc.github.io/sitemap.xml" />
	<meta name="ai-agent" content="enabled" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': 'https://pocketmc.github.io/#website',
				url: 'https://pocketmc.github.io/',
				name: 'PocketMC',
				alternateName: ['Pocket MC', 'PocketMC Windows', 'PocketMC Server Manager'],
				description: 'Free and open-source local Minecraft server manager for Windows with Playit.gg tunnels, Adoptium Java runtimes, and cloud backups.',
				inLanguage: 'en-US'
			},
			{
				'@type': 'SoftwareApplication',
				'@id': 'https://pocketmc.github.io/#software',
				name: 'PocketMC',
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'Windows 10, Windows 11 (64-bit)',
				softwareVersion: data.version || 'v1.9.10',
				license: 'https://github.com/PocketMC/pocket-mc-windows/blob/master/LICENSE',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD'
				},
				downloadUrl: 'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe',
				featureList: [
					'One-click server installation for Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock BDS, and PocketMine-MP',
					'Automated Adoptium Java (8-25) and PHP 8.2 runtime provisioning without global PATH conflicts',
					'Zero-port-forwarding Playit.gg network tunneling and Simple Voice Chat UDP mapping',
					'Automated cloud backup replication to Google Drive, OneDrive, and Dropbox with RCON save-holding',
					'Embedded responsive web dashboard accessible via quick QR code URL',
					'Built-in Modrinth and CurseForge addon marketplaces',
					'Local and cloud AI log summarization with Ollama model management',
					'Crash recovery watchdog and Windows sleep inhibition'
				]
			},
			{
				'@type': 'Organization',
				'@id': 'https://pocketmc.github.io/#organization',
				name: 'PocketMC',
				url: 'https://pocketmc.github.io/',
				sameAs: ['https://github.com/PocketMC', 'https://discord.gg/mWdMr8Mc2m']
			}
		]
	})}</script>`}
</svelte:head>

<SiteHeader stars={data.stars} />

<div class="page-column">
	{@render children()}
	<SiteFooter license={data.license} />
</div>
