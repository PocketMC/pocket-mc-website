<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Server Engines · PocketMC Docs</title>
	<meta
		name="description"
		content="Supported Minecraft engines: Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock Dedicated Server, and PocketMine-MP."
	/>
</svelte:head>

<span class="kicker">Start here</span>
<h1>Server Engines</h1>
<p class="summary">
	PocketMC supports 7 server engines across Minecraft Java Edition and Bedrock Edition with automated version indexing, SHA checksum verification, and one-click jar and binary provisioning.
</p>

<h2 id="vanilla">Vanilla (Official Mojang)</h2>
<p>
	Vanilla is the first and default server type selected in the PocketMC creation wizard. It delivers a pure, unmodded Minecraft experience using official server JARs downloaded directly from Mojang's distribution network.
</p>
<p>
	PocketMC queries Mojang's official version manifest (<code class="mono">launchermeta.mojang.com/mc/game/version_manifest_v2.json</code>) to index every official release and snapshot build from Minecraft 1.8.8 through the latest version. When a version is selected, PocketMC fetches the version metadata JSON, resolves the official Mojang server download URL, and validates the file against Mojang's SHA-1 checksum before launch.
</p>
<ul>
	<li>Default selection for new server creation.</li>
	<li>Direct downloads from Mojang's official CDN with SHA-1 integrity validation.</li>
	<li>Full support for release versions and snapshot builds.</li>
	<li>Auto-negotiated Eclipse Adoptium Java runtimes (Java 8, 11, 17, 21, or 25).</li>
</ul>

<h2 id="paper">Paper (High Performance)</h2>
<p>
	<a href="https://papermc.io" target="_blank" rel="noopener noreferrer">Paper</a> is the industry standard for high-performance Spigot-compatible servers, engineered to provide substantial performance improvements and tick rate stability.
</p>
<p>
	PocketMC queries PaperMC's official API (<code class="mono">api.papermc.io</code> / <code class="mono">fill.papermc.io</code>) to dynamically retrieve builds from Minecraft 1.8.8 through the latest release. PocketMC resolves the latest build (or a specified build number) and verifies the download against PaperMC's SHA-256 checksum.
</p>
<ul>
	<li>Full Spigot and Bukkit plugin compatibility.</li>
	<li>Asynchronous chunk loading and optimized entity ticking.</li>
	<li>Automated Geyser &amp; Floodgate cross-play installer integration.</li>
	<li>Direct in-app plugin installation and update checks.</li>
</ul>

<h2 id="fabric">Fabric</h2>
<p>
	<a href="https://fabricmc.net" target="_blank" rel="noopener noreferrer">Fabric</a> is a lightweight, modular modding toolchain with fast boot times and a minimal memory footprint.
</p>
<p>
	PocketMC queries Fabric's official meta service (<code class="mono">meta.fabricmc.net</code>) to combine the target Minecraft game version (1.14+), the latest stable Fabric Loader, and the official Fabric Installer into a runnable server JAR (<code class="mono">v2/versions/loader/{'{'}game_version{'}'}/{'{'}loader_version{'}'}/{'{'}installer_version{'}'}/server/jar</code>).
</p>
<ul>
	<li>Fast launch times and minimal overhead.</li>
	<li>Direct integration with the in-app Modrinth marketplace browser.</li>
	<li>Automated dependency resolution for required libraries (Fabric API, Cloth Config, etc.).</li>
	<li>Automatic Java version negotiation based on the target game version.</li>
</ul>

<h2 id="forge">Forge</h2>
<p>
	<a href="https://files.minecraftforge.net" target="_blank" rel="noopener noreferrer">Forge</a> is the classic modding framework powering thousands of extensive community modpacks for Minecraft 1.8.8 and above.
</p>
<p>
	PocketMC queries Forge promotional metadata to resolve recommended or latest builds. It downloads official installer JARs directly from Forge Maven (<code class="mono">maven.minecraftforge.net</code>) and automatically runs the headless installer within the instance directory to stage required libraries and server dependencies.
</p>
<ul>
	<li>Broadest compatibility with classic Minecraft modpacks.</li>
	<li>Automated headless installer execution during instance creation.</li>
	<li>Preflight Java runtime verification to match mod loader requirements.</li>
</ul>

<h2 id="neoforge">NeoForge</h2>
<p>
	<a href="https://neoforged.net" target="_blank" rel="noopener noreferrer">NeoForge</a> is the modern, community-driven fork of Forge designed for modern Minecraft releases (1.20.2+).
</p>
<p>
	PocketMC queries NeoForge metadata (<code class="mono">maven.neoforged.net</code>) to discover available builds for each supported Minecraft release. It downloads the verified installer JAR from NeoForge Maven and executes installation in a sandboxed directory.
</p>
<ul>
	<li>Optimized modding platform for modern Minecraft versions (1.20.2 and newer).</li>
	<li>Automated headless installation and dependency verification.</li>
	<li>In-app Modrinth and CurseForge marketplace filtering for NeoForge mods.</li>
</ul>

<h2 id="bedrock-dedicated-server">Bedrock Dedicated Server (BDS)</h2>
<p>
	Official Windows Bedrock Dedicated Server binaries from Mojang enable native cross-platform gameplay for Bedrock Edition players on Windows, Android, iOS, Xbox, PlayStation, and Nintendo Switch.
</p>
<p>
	PocketMC queries versioned release and preview manifests to download official Windows BDS ZIP packages directly from Mojang CDN. The binaries are extracted into an isolated instance workspace without touching system directories.
</p>
<ul>
	<li>Official Mojang Bedrock binaries for stable releases and preview builds.</li>
	<li>Automatic Windows loopback network isolation exemption (<code class="mono">CheckNetIsolation.exe</code>) so Bedrock clients on the host machine can connect to local instances.</li>
	<li>Persistent <code class="mono">pocketmc-bans.json</code> sidecar providing persistent player ban moderation across BDS server restarts.</li>
	<li>Zero Java dependency — runs natively on 64-bit Windows.</li>
</ul>

<h2 id="pocketmine-mp">PocketMine-MP (PHP)</h2>
<p>
	<a href="https://pmmp.io" target="_blank" rel="noopener noreferrer">PocketMine-MP</a> is an ultra-fast, extensible Bedrock server engine written in PHP.
</p>
<p>
	PocketMC queries GitHub releases from <code class="mono">pmmp/PocketMine-MP</code> to download the executable <code class="mono">PocketMine-MP.phar</code> package. It automatically provisions an app-local, pre-compiled PHP 8.2 PM5 runtime from <code class="mono">pmmp/PHP-Binaries</code> into the instance runtime folder, completely eliminating the need to install PHP system-wide or adjust Windows environment variables.
</p>
<ul>
	<li>App-local managed PHP 8.2 runtime configured for PM5.</li>
	<li>Direct integration with the <a href="https://poggit.pmmp.io" target="_blank" rel="noopener noreferrer">Poggit</a> plugin repository.</li>
	<li>Ultra-fast startup times and low CPU/memory utilization.</li>
</ul>
