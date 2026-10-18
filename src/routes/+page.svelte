<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Comparison from '$lib/components/Comparison.svelte';
	import FaqPreview from '$lib/components/FaqPreview.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Install from '$lib/components/Install.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Softwares from '$lib/components/Softwares.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>PocketMC - #1 Local Minecraft Server Manager for Windows</title>
	<meta
		name="description"
		content="Free, open-source Minecraft server manager for Windows by DS Labs. Setup Java, Paper, Fabric & Bedrock with zero-port Playit.gg tunnels."
	/>
	<meta property="og:title" content="PocketMC - #1 Local Minecraft Server Manager for Windows" />
	<meta
		property="og:description"
		content="One-click Minecraft server setup for Java, Paper, Fabric, Forge, NeoForge, Bedrock BDS & PocketMine-MP. Zero-port Playit.gg tunnels, Adoptium Java & cloud backups."
	/>
	<meta name="twitter:title" content="PocketMC - #1 Local Minecraft Server Manager for Windows" />
	<meta
		name="twitter:description"
		content="One-click Minecraft server setup for Java, Paper, Fabric, Forge, NeoForge, Bedrock BDS & PocketMine-MP. Zero-port Playit.gg tunnels, Adoptium Java & cloud backups."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How does Playit.gg tunneling work? Do I need to configure port forwarding?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Zero router configuration or port forwarding is required. PocketMC features an integrated Playit.gg agent setup wizard that automatically maps local ports to public addresses.'
				}
			},
			{
				'@type': 'Question',
				name: 'Do I need to install Java or PHP on my computer beforehand?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'No. PocketMC manages all runtimes locally. It automatically provisions the correct Adoptium Java version (Java 8, 11, 17, 21, or 25) and local PHP 8.2 PM5 for Bedrock.'
				}
			},
			{
				'@type': 'Question',
				name: 'Does PocketMC require Windows administrator privileges?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'No. PocketMC runs entirely in standard user-space and installs per-user without requiring administrative elevation or polluting global environment variables.'
				}
			},
			{
				'@type': 'Question',
				name: 'How do my friends join the server, and how can I manage it remotely?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Friends join via free Playit.gg tunnels. Admins can manage instances from a mobile web dashboard by scanning a quick QR code.'
				}
			},
			{
				'@type': 'Question',
				name: 'Where are my server files stored and how secure are the backups?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'All server files are stored 100% locally on your machine. PocketMC features RCON save-holding and automated replication to Google Drive, Dropbox, and OneDrive.'
				}
			},
			{
				'@type': 'Question',
				name: 'Can Bedrock (console/mobile) players join a Java server managed by PocketMC?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. PocketMC supports automatic GeyserMC and Floodgate setup during server creation for supported Java server loaders.'
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
<Comparison />
<FaqPreview />
