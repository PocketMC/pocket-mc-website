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
	PocketMC supports 7 server engines across Minecraft Java Edition and Bedrock Edition. It resolves
	official version manifests, checks checksums before launch, and provisions server JARs and native binaries automatically.
</p>

<h2 id="vanilla">Vanilla (Official Mojang)</h2>
<p>
	Vanilla runs unmodded Minecraft server JARs downloaded directly from Mojang CDN.
</p>
<p>
	PocketMC queries Mojang's version manifest at <code class="mono">launchermeta.mojang.com/mc/game/version_manifest_v2.json</code>
	to index releases and snapshots from Minecraft 1.8.8 through the latest snapshot. When you select a version,
	PocketMC reads the version JSON, resolves the server download URL, and validates the downloaded file against Mojang's official SHA-1 hash.
</p>
<ul>
	<li>Direct downloads from Mojang's CDN with SHA-1 validation.</li>
	<li>Supports both stable releases and snapshot builds.</li>
	<li>Selects the required Adoptium JRE version automatically based on game release requirements.</li>
</ul>

<h2 id="paper">Paper</h2>
<p>
	<a href="https://papermc.io" target="_blank" rel="noopener noreferrer">Paper</a> is a Spigot-compatible server engine with asynchronous chunk loading and entity optimizations.
</p>
<p>
	PocketMC queries PaperMC's API at <code class="mono">api.papermc.io</code> to retrieve available builds from Minecraft 1.8.8 to the latest release. It downloads the newest stable build (or your chosen build number) and validates it against PaperMC's SHA-256 checksum.
</p>
<ul>
	<li>Compatible with Bukkit, Spigot, and Paper plugins.</li>
	<li>In-app marketplace installation for Modrinth plugins.</li>
	<li>One-click Geyser and Floodgate crossplay provisioning for Bedrock players.</li>
</ul>

<h2 id="fabric">Fabric</h2>
<p>
	<a href="https://fabricmc.net" target="_blank" rel="noopener noreferrer">Fabric</a> is a modular mod loader with low memory overhead and fast boot times.
</p>
<p>
	PocketMC queries Fabric's metadata service at <code class="mono">meta.fabricmc.net</code>. It resolves the target game version (1.14 and higher), the latest stable Fabric Loader, and the official Fabric Installer to request a server JAR from <code class="mono">v2/versions/loader/{'{'}game_version{'}'}/{'{'}loader_version{'}'}/{'{'}installer_version{'}'}/server/jar</code>.
</p>
<ul>
	<li>Low baseline RAM consumption and quick startup.</li>
	<li>Searches Modrinth and CurseForge with Fabric loader filters.</li>
	<li>Dependency detection for Fabric API and core runtime libraries.</li>
</ul>

<h2 id="forge">Forge</h2>
<p>
	<a href="https://files.minecraftforge.net" target="_blank" rel="noopener noreferrer">Forge</a> is the traditional mod loader for older and heavy community modpacks from Minecraft 1.8.8 through 1.20.1.
</p>
<p>
	PocketMC reads Forge promotional metadata to find recommended and latest builds. It downloads the installer JAR from <code class="mono">maven.minecraftforge.net</code> and executes the headless installer (<code class="mono">java -jar forge-installer.jar --installServer</code>) inside the instance folder to generate the server JAR and unpack required libraries into <code class="mono">libraries/</code>.
</p>
<ul>
	<li>Compatible with classic 1.12.2 and 1.16.5 modpacks.</li>
	<li>Automated headless installer execution during instance creation.</li>
	<li>Validates that the selected Java version matches Forge's loader constraints.</li>
</ul>

<h2 id="neoforge">NeoForge</h2>
<p>
	<a href="https://neoforged.net" target="_blank" rel="noopener noreferrer">NeoForge</a> is the community fork of Forge built for modern Minecraft versions (1.20.2 and newer).
</p>
<p>
	PocketMC queries <code class="mono">maven.neoforged.net</code> to index builds for each supported release. It downloads the installer JAR and executes installation in the server folder to stage runtime dependencies.
</p>
<ul>
	<li>Modding platform for modern Minecraft versions (1.20.2+).</li>
	<li>Headless installation and dependency extraction.</li>
	<li>Modrinth and CurseForge marketplace browsing filtered for NeoForge.</li>
</ul>

<h2 id="bedrock-dedicated-server">Bedrock Dedicated Server (BDS)</h2>
<p>
	Mojang's official Windows Bedrock Dedicated Server allows native connections from Bedrock Edition clients on Windows, Android, iOS, Xbox, PlayStation, and Nintendo Switch.
</p>
<p>
	PocketMC indexes stable and preview release archives directly from Mojang CDN. It extracts the package into an isolated instance workspace without requiring a Java runtime.
</p>
<ul>
	<li>Direct downloads of official Windows x64 BDS binaries.</li>
	<li>Executes <code class="mono">CheckNetIsolation.exe</code> loopback exemption so Windows Bedrock clients on the host machine can connect to local servers.</li>
	<li>Maintains a persistent <code class="mono">pocketmc-bans.json</code> sidecar file to track and enforce player bans across BDS restarts.</li>
</ul>

<h2 id="pocketmine-mp">PocketMine-MP (PHP)</h2>
<p>
	<a href="https://pmmp.io" target="_blank" rel="noopener noreferrer">PocketMine-MP</a> is a Bedrock server engine written in PHP.
</p>
<p>
	PocketMC queries GitHub releases from <code class="mono">pmmp/PocketMine-MP</code> to download <code class="mono">PocketMine-MP.phar</code>. It provisions an app-local PHP 8.2 runtime from <code class="mono">pmmp/PHP-Binaries</code> into <code class="mono">runtime/php8.2/</code>, keeping your system PHP and environment variables untouched.
</p>
<ul>
	<li>App-local PHP 8.2 runtime managed by PocketMC.</li>
	<li>Plugin support via the <a href="https://poggit.pmmp.io" target="_blank" rel="noopener noreferrer">Poggit</a> repository.</li>
	<li>Low resource usage suitable for lightweight Bedrock worlds.</li>
</ul>
