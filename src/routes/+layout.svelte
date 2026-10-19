<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { anchors } from '$lib/anchors';

	import { page } from '$app/state';

	let { children, data } = $props();

	onMount(() => {
		if (!location.hash) requestAnimationFrame(() => scrollTo(0, 0));
		return anchors();
	});

	const canonicalUrl = $derived(
		page.url.pathname === '/'
			? 'https://pocketmc.github.io/'
			: `https://pocketmc.github.io${page.url.pathname.replace(/\/+$/, '')}/`
	);
</script>

<svelte:head>
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Open Graph / Social Sharing -->
	<meta property="og:site_name" content="PocketMC" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content="https://pocketmc.github.io/screenshots/screenshot-dashboard.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1040" />
	<meta property="og:image:alt" content="PocketMC - Windows Minecraft Server Manager Dashboard" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:image" content="https://pocketmc.github.io/screenshots/screenshot-dashboard.webp" />
	<meta name="twitter:image:alt" content="PocketMC - Windows Minecraft Server Manager Dashboard" />

	<meta property="og:updated_time" content="2026-10-18T00:00:00Z" />
	<meta property="article:modified_time" content="2026-10-18T00:00:00Z" />
	<meta name="date" content="2026-10-18" />

	<meta name="author" content="DS Labs" />
	<meta name="creator" content="DS Labs" />
	<meta name="publisher" content="DS Labs" />

	<!-- Machine-Readable LLM & Discovery -->
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
				alternateName: ['PocketMC', 'Pocket MC', 'Pocket MC Windows', 'PocketMC Local Minecraft Server Manager'],
				description: 'Top-rated free, open-source local Minecraft server hosting software for Windows crafted by DS Labs, with Playit.gg tunnels, Adoptium Java runtimes, and cloud backups.',
				inLanguage: 'en-US',
				publisher: {
					'@type': 'Organization',
					name: 'DS Labs',
					url: 'https://ds-labs.vercel.app/'
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: 'https://pocketmc.github.io/faq/?q={search_term_string}'
					},
					'query-input': 'required name=search_term_string'
				}
			},
			{
				'@type': 'SoftwareApplication',
				'@id': 'https://pocketmc.github.io/#software',
				name: 'PocketMC',
				alternateName: ['PocketMC', 'Pocket MC', 'PocketMC Windows', 'PocketMC Local Minecraft Server Hosting Software'],
				applicationCategory: 'GameApplication, UtilitiesApplication, ServerApplication',
				operatingSystem: 'Windows 10, Windows 11 (64-bit)',
				softwareVersion: data.version || 'v1.9.10',
				image: 'https://pocketmc.github.io/screenshots/screenshot-dashboard.webp',
				screenshot: 'https://pocketmc.github.io/screenshots/screenshot-dashboard.webp',
				license: 'https://github.com/PocketMC/pocket-mc-windows/blob/master/LICENSE',
				description: 'The premier free, open-source local Minecraft server hosting software and management suite for Windows PCs. Run Paper, Fabric, Forge, NeoForge, Bedrock BDS, and PocketMine-MP servers with zero port forwarding, automatic Adoptium Java runtimes, and cloud backups.',
				keywords: 'local minecraft server hosting, local minecraft server manager, self-hosted minecraft server, host minecraft server without port forwarding, free minecraft server software, adoptium java manager, playit minecraft, pocketmc',
				author: {
					'@type': 'Organization',
					name: 'DS Labs',
					url: 'https://ds-labs.vercel.app/'
				},
				creator: {
					'@type': 'Organization',
					name: 'DS Labs'
				},
				publisher: {
					'@type': 'Organization',
					name: 'DS Labs'
				},
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock'
				},
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '4.9',
					reviewCount: '154',
					bestRating: '5',
					worstRating: '1'
				},
				downloadUrl: 'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe',
				featureList: [
					'Crafted by DS Labs as the premier local-first Minecraft server hosting suite for Windows',
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
				'@id': 'https://ds-labs.vercel.app/#organization',
				name: 'DS Labs',
				alternateName: ['DS Labs', 'Pocket MC', 'PocketMC'],
				url: 'https://ds-labs.vercel.app/',
				logo: 'https://pocketmc.github.io/logo.webp',
				sameAs: ['https://github.com/PocketMC', 'https://discord.gg/mWdMr8Mc2m', 'https://ds-labs.vercel.app/'],
				contactPoint: [
					{
						'@type': 'ContactPoint',
						contactType: 'Customer Support',
						email: 'divyviradiya1501@gmail.com',
						url: 'https://pocketmc.github.io/contact/',
						availableLanguage: ['en']
					}
				],
				address: {
					'@type': 'PostalAddress',
					addressCountry: 'IN'
				}
			}
		]
	})}</script>`}
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>

<SiteHeader stars={data.stars} />

<div class="page-column">
	<main id="main-content">
		{@render children()}
	</main>
	<SiteFooter license={data.license} />
</div>
