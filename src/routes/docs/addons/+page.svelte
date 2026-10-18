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
	PocketMC features an integrated addon browser for Modrinth and CurseForge, automatic dependency resolution,
	safe file installation, and zero-deletion enable/disable toggles.
</p>

<h2 id="marketplace-browsing">In-App Marketplace Browsing</h2>
<p>
	Instead of manually hunting for mod files across external websites and worrying about compatibility errors,
	PocketMC queries the official <a href="https://modrinth.com" target="_blank" rel="noopener noreferrer">Modrinth</a>
	and <a href="https://curseforge.com" target="_blank" rel="noopener noreferrer">CurseForge</a> APIs directly inside the desktop client.
</p>

<ul>
	<li><strong>Context-Aware Filtering:</strong> The marketplace automatically filters search results to match the exact loader (Paper, Fabric, Forge, NeoForge, Quilt) and Minecraft version of your selected instance.</li>
	<li><strong>Direct One-Click Installation:</strong> Click <strong>Install</strong> to download the validated JAR file directly into your server's <code class="mono">mods/</code> or <code class="mono">plugins/</code> folder.</li>
	<li><strong>PocketMine-MP Support:</strong> For Bedrock PocketMine-MP instances, PocketMC connects directly to the <a href="https://poggit.pmmp.io" target="_blank" rel="noopener noreferrer">Poggit</a> plugin repository.</li>
</ul>

<h2 id="dependency-resolution">Automated Dependency Resolution</h2>
<p>
	Many modern Minecraft mods require prerequisite library mods (such as Fabric API, Cloth Config, or Architectury) to function.
	PocketMC includes an automated dependency resolver (<code class="mono">DependencyResolverService</code>):
</p>

<ol>
	<li>When you select a mod to install, PocketMC inspects its metadata manifest for declared required dependencies.</li>
	<li>It checks your instance's active addon inventory to determine if any dependencies are already installed.</li>
	<li>If missing dependencies are detected, PocketMC prompts you and automatically downloads compatible versions in the background before staging the primary mod.</li>
</ol>

<h2 id="addon-lifecycle">Addon Inventory &amp; State Management</h2>
<p>
	PocketMC maintains a structured inventory of all installed plugins and mods with safe file management:
</p>

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>Implementation</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Enable / Disable Toggle</strong></td>
			<td>Temporarily disables an addon by appending <code class="mono">.disabled</code> to the filename. The mod or plugin is ignored on server startup without losing config files or player data.</td>
		</tr>
		<tr>
			<td><strong>Update Checks</strong></td>
			<td>Queries Modrinth and CurseForge hashes to compare installed versions against the latest release for your Minecraft version.</td>
		</tr>
		<tr>
			<td><strong>Explorer Jump</strong></td>
			<td>Click the three-dot context menu on any addon card and select <strong>Show in Explorer</strong> to jump directly to the target file on disk.</td>
		</tr>
		<tr>
			<td><strong>Safe Uninstall</strong></td>
			<td>Safely removes the addon JAR and its corresponding configuration directory upon explicit user confirmation.</td>
		</tr>
	</tbody>
</table>

<h2 id="geyser-crossplay">Geyser &amp; Floodgate Crossplay</h2>
<p>
	PocketMC provides built-in automated provisioning for <a href="https://geysermc.org" target="_blank" rel="noopener noreferrer">Geyser</a>
	and <a href="https://floodgate.geysermc.org" target="_blank" rel="noopener noreferrer">Floodgate</a>, allowing Minecraft Bedrock Edition players
	(on Windows, Android, iOS, Xbox, PlayStation, and Nintendo Switch) to join Java Edition servers:
</p>

<ul>
	<li>During server creation or addon configuration on Paper, Purpur, or Fabric, check <strong>Enable Bedrock Crossplay</strong>.</li>
	<li>PocketMC automatically downloads the latest stable builds from the official GeyserMC API (<code class="mono">download.geysermc.org</code>).</li>
	<li>PocketMC automatically configures listening ports (<code class="mono">25565</code> TCP for Java and <code class="mono">19132</code> UDP for Bedrock).</li>
	<li>When Playit tunneling is enabled, PocketMC registers both Java and Bedrock tunnel endpoints and displays both join addresses on your dashboard and Discord Rich Presence.</li>
</ul>
