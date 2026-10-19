<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Plugins & Mods · PocketMC Docs</title>
	<meta
		name="description"
		content="In-app Modrinth and CurseForge marketplace browsing, automated dependency resolution, and Geyser crossplay."
	/>
</svelte:head>

<span class="kicker">Server Management</span>
<h1>Plugins &amp; Mods</h1>
<p class="summary">
	PocketMC includes an integrated addon browser for Modrinth, CurseForge, and Poggit. It handles
	dependency resolution, safe file placement, update tracking, and .mrpack modpack imports.
</p>

<h2 id="marketplace-browsing">Marketplace Search</h2>
<p>
	PocketMC queries the official <a href="https://modrinth.com" target="_blank" rel="noopener noreferrer">Modrinth</a>
	and <a href="https://curseforge.com" target="_blank" rel="noopener noreferrer">CurseForge</a> APIs directly from the desktop client.
</p>
<ul>
	<li>Contextual filtering: Search results automatically match the loader (Paper, Fabric, Forge, NeoForge) and game version of your active instance.</li>
	<li>Direct downloads: PocketMC sanitizes the filename and saves the validated JAR to your instance's <code class="mono">mods/</code> or <code class="mono">plugins/</code> folder.</li>
	<li>Poggit support: For PocketMine-MP instances, PocketMC searches the <a href="https://poggit.pmmp.io" target="_blank" rel="noopener noreferrer">Poggit</a> repository for compatible PHP plugins.</li>
	<li>CurseForge API key: If you use CurseForge, you can configure your personal API key in settings, encrypted locally via Windows DPAPI.</li>
</ul>

<h2 id="dependency-resolution">Dependency Resolution</h2>
<p>
	When you install a mod that requires libraries (such as Fabric API, Cloth Config, or Architectury):
</p>
<ol>
	<li>PocketMC inspects the addon's dependency manifest for required upstream packages.</li>
	<li>It checks your current <code class="mono">mods/</code> inventory to verify whether compatible versions already exist.</li>
	<li>If required dependencies are missing, PocketMC presents the list and stages them automatically before installing the primary mod.</li>
</ol>

<h2 id="modpacks">Modpack Importing (.mrpack)</h2>
<p>
	PocketMC includes a built-in parser for Modrinth modpack archives (<code class="mono">.mrpack</code>):
</p>
<ul>
	<li>Reads the embedded <code class="mono">modrinth.index.json</code> manifest to resolve required server-side mods, loaders, and Minecraft versions.</li>
	<li>Extracts bundled server configuration overrides from <code class="mono">overrides/</code> and <code class="mono">server-overrides/</code>.</li>
	<li>Downloads each declared file with SHA-1 and SHA-512 integrity checks.</li>
</ul>

<h2 id="addon-lifecycle">Addon Inventory &amp; State Management</h2>
<p>
	PocketMC tracks installed addons in an instance manifest (<code class="mono">pocket-mc-addons.json</code>):
</p>

<table>
	<thead>
		<tr>
			<th>Action</th>
			<th>Mechanism</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Enable or Disable</td>
			<td>Appends or strips <code class="mono">.disabled</code> from the filename. The server ignores disabled files on startup while preserving your configuration folders.</td>
		</tr>
		<tr>
			<td>Update Checks</td>
			<td>Compares local file hashes against upstream Modrinth and CurseForge versions for your Minecraft release.</td>
		</tr>
		<tr>
			<td>File Explorer</td>
			<td>Jumps directly to the selected mod or plugin file inside File Explorer.</td>
		</tr>
		<tr>
			<td>Safe Removal</td>
			<td>Deletes the addon file and asks whether to remove associated configuration folders.</td>
		</tr>
	</tbody>
</table>

<h2 id="geyser-crossplay">Geyser &amp; Floodgate Crossplay</h2>
<p>
	<a href="https://geysermc.org" target="_blank" rel="noopener noreferrer">Geyser</a> allows Minecraft Bedrock Edition players
	on consoles, phones, and Windows to join Java Edition servers.
</p>
<p>
	On Paper and Fabric servers, enabling the Bedrock Crossplay option prompts PocketMC to:
</p>
<ul>
	<li>Download the latest builds from the GeyserMC API (<code class="mono">download.geysermc.org</code>).</li>
	<li>Configure the Bedrock UDP listener (<code class="mono">19132</code> by default) alongside the Java TCP port (<code class="mono">25565</code>).</li>
	<li>Register both Java and Bedrock tunnel endpoints on Playit.gg and display both addresses on your dashboard and Discord Rich Presence.</li>
</ul>
