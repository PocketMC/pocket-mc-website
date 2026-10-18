<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Comparison from '$lib/components/Comparison.svelte';
	import Cta from '$lib/components/Cta.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Install from '$lib/components/Install.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Softwares from '$lib/components/Softwares.svelte';
	import Stability from '$lib/components/Stability.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>PocketMC · Free Local Minecraft Server Manager</title>
	<meta
		name="description"
		content="The #1 local-first Minecraft server manager for Windows, Linux and macOS. Paper, Fabric, Forge, NeoForge & Bedrock with Playit.gg tunnels, Adoptium runtimes and cloud backups."
	/>
</svelte:head>

<Hero version={data.version} license={data.license} />
<Preview />
<Install />
<About />
<Softwares />
<Comparison />
<Stability />
<Cta />
