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
	<title>PocketMC · Best Local Minecraft Server Hosting for Windows</title>
	<meta
		name="description"
		content="Free, open-source local Minecraft server hosting software for Windows. Run Paper, Fabric, Forge, NeoForge, and Bedrock with zero port forwarding, automatic Java, and cloud backups."
	/>
	<meta
		name="keywords"
		content="local minecraft server hosting, best local minecraft server software, self host minecraft server windows, free minecraft server host on pc, host minecraft server without port forwarding, minecraft server manager windows, pocketmc"
	/>
	<meta property="og:title" content="PocketMC · Best Local Minecraft Server Hosting for Windows" />
	<meta
		property="og:description"
		content="Run Java, Paper, Fabric, Forge, NeoForge, Bedrock, and PocketMine servers locally on Windows with zero port forwarding and cloud backups."
	/>
	<meta name="twitter:title" content="PocketMC · Best Local Minecraft Server Hosting for Windows" />
	<meta
		name="twitter:description"
		content="Run Java, Paper, Fabric, Forge, NeoForge, Bedrock, and PocketMine servers locally on Windows with zero port forwarding and cloud backups."
	/>
</svelte:head>

<Hero version={data.version} license={data.license} />
<Preview />
<Install />
<About />
<Softwares />
<Comparison />
