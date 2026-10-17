<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Server Engines · PocketMC Docs</title>
	<meta
		name="description"
		content="Supported Minecraft engines: Paper, Fabric, Forge, NeoForge, Bedrock Dedicated Server, and PocketMine."
	/>
</svelte:head>

<span class="kicker">Start here</span>
<h1>Server Engines</h1>
<p class="summary">
	PocketMC supports all major Minecraft Java Edition loaders and Bedrock Edition server software with
	automated version indexing and one-click jar provisioning.
</p>

<h2 id="paper">Paper</h2>
<p>
	<a href="https://papermc.io" target="_blank" rel="noopener noreferrer">Paper</a> is the industry standard for high-performance Spigot-compatible servers. PocketMC queries PaperMC's official v2 REST API to fetch builds for Minecraft 1.8.8 through the latest release.
</p>
<ul>
	<li>Full Spigot and Bukkit plugin compatibility.</li>
	<li>Asynchronous chunk loading and optimized entity ticking.</li>
	<li>Automated Geyser &amp; Floodgate cross-play installer integration.</li>
</ul>

<h2 id="fabric">Fabric</h2>
<p>
	<a href="https://fabricmc.net" target="_blank" rel="noopener noreferrer">Fabric</a> is a lightweight, modular modding framework. PocketMC queries Fabric's official meta service to combine the latest Fabric Loader and Minecraft Game Version into a runnable server jar.
</p>
<ul>
	<li>Fast boot times and minimal memory footprint.</li>
	<li>Integrated Modrinth in-app mod marketplace browser.</li>
	<li>Automatic Java version negotiation (Java 17, 21, or 25).</li>
</ul>

<h2 id="neoforge-and-forge">NeoForge &amp; Forge</h2>
<p>
	For large community modpacks, PocketMC provides native installer-based bootstrapping for both modern <a href="https://neoforged.net" target="_blank" rel="noopener noreferrer">NeoForge</a> (1.20.2+) and classic <a href="https://files.minecraftforge.net" target="_blank" rel="noopener noreferrer">Forge</a> (1.8.8+).
</p>
<p>
	When creating a Forge or NeoForge instance, PocketMC automatically executes the server installer in a headless sandbox, verifies jar dependencies, and prepares launch arguments.
</p>

<h2 id="bedrock-dedicated-server">Bedrock Dedicated Server (BDS)</h2>
<p>
	Official Windows BDS binaries from Mojang are downloaded and managed directly. PocketMC handles manifest parsing, loopback isolation workarounds (via <code class="mono">CheckNetIsolation.exe</code>), and automatic version staging.
</p>

<h2 id="pocketmine-mp">PocketMine-MP</h2>
<p>
	PocketMine-MP is an ultra-fast, extensible PHP-based Bedrock engine. PocketMC provisions an app-local PHP 8.2 PM5 binary runtime and integrates Poggit plugin repository browsing directly within your client.
</p>
