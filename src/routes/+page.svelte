<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Comparison from '$lib/components/Comparison.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import HomeFaq from '$lib/components/HomeFaq.svelte';
	import Install from '$lib/components/Install.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Softwares from '$lib/components/Softwares.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>PocketMC · Best Local Minecraft Server Host for Windows</title>
	<meta
		name="description"
		content="Free, open-source local Minecraft server host for Windows. Run Paper, Fabric, Forge, and Bedrock with zero port forwarding, automatic Java, and cloud backups."
	/>
	<meta
		name="keywords"
		content="local minecraft server hosting, best local minecraft server software, self host minecraft server windows, free minecraft server host on pc, host minecraft server without port forwarding, minecraft server manager windows, pocketmc"
	/>
	<meta property="og:title" content="PocketMC · Best Local Minecraft Server Host for Windows" />
	<meta
		property="og:description"
		content="Free, open-source local Minecraft server host for Windows. Zero port forwarding, automatic Adoptium Java, and cloud backups."
	/>
	<meta name="twitter:title" content="PocketMC · Best Local Minecraft Server Host for Windows" />
	<meta
		name="twitter:description"
		content="Free, open-source local Minecraft server host for Windows. Zero port forwarding, automatic Adoptium Java, and cloud backups."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': 'https://pocketmc.github.io/#faq',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How does PocketMC host servers without router port forwarding?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'PocketMC embeds Playit.gg and Cloudflare Quick Tunnels directly into its Windows process. Friends connect using an assigned public domain that relays traffic securely to your local port without router configuration or exposing your home IP.'
				}
			},
			{
				'@type': 'Question',
				name: 'How does automated Java runtime provisioning prevent system conflicts?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'PocketMC automatically provisions isolated Eclipse Adoptium OpenJDK runtimes (Java 8, 11, 17, 21, and 25) without modifying your global Windows system PATH.'
				}
			},
			{
				'@type': 'Question',
				name: 'Which Minecraft server engines and mod loaders are supported?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'PocketMC supports Minecraft Java Edition (Vanilla, Paper, Fabric, Forge, NeoForge) and Bedrock Edition (Bedrock Dedicated Server BDS and PocketMine-MP).'
				}
			},
			{
				'@type': 'Question',
				name: 'Where are world files stored, and how do cloud backups work?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'All world files, plugins, and mods live directly on your local storage drive. Automated backups mirror your instances to Google Drive, OneDrive, or Dropbox with RCON write-holding to eliminate save corruption.'
				}
			},
			{
				'@type': 'Question',
				name: 'How does crash recovery protect local servers from downtime?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'A built-in process watchdog tracks process health, RAM, and CPU usage. It restarts crashed servers with backoff limits and inhibits Windows sleep mode while servers run.'
				}
			}
		]
	})}</script>`}
</svelte:head>

<Hero version={data.version} license={data.license} />
<Preview />
<Install />
<About />
<Softwares />
<HomeFaq />
<Comparison />
