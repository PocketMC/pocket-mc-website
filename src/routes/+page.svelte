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
</svelte:head>

<Hero version={data.version} license={data.license} />
<Preview />
<Install />
<About />
<Softwares />
<Comparison />
