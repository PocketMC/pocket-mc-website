<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Comparison from '$lib/components/Comparison.svelte';
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
</svelte:head>

<Hero version={data.version} license={data.license} />
<Preview />
<Install />
<About />
<Softwares />
<Comparison />
