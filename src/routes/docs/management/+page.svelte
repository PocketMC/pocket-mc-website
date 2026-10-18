<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Instance & World Management · PocketMC Docs</title>
	<meta
		name="description"
		content="World importing (.zip/.mcworld), instance export/import bundles, server.properties editor, Bedrock ban sidecar, and Windows sleep prevention."
	/>
</svelte:head>

<span class="kicker">Server Management</span>
<h1>Instance &amp; World Management</h1>
<p class="summary">
	PocketMC automates server lifecycle operations, handles resilient world imports, provides structured
	property editing, and guards system resources while servers are active.
</p>

<h2 id="world-importing">Intelligent World Archive Importing</h2>
<p>
	Minecraft world archives downloaded from forums, backups, or community sites are packaged in wildly different ways.
	Some place world files directly at the ZIP root, while others bury them inside multiple nested folders.
</p>
<p>
	PocketMC's <code class="mono">WorldManager</code> handles world ingestion intelligently:
</p>

<ul>
	<li><strong>Supported Formats:</strong> Ingests standard <code class="mono">.zip</code> archives and Bedrock <code class="mono">.mcworld</code> export packages.</li>
	<li><strong>Recursive Root Detection:</strong> Searches archive contents recursively for <code class="mono">level.dat</code> to locate the true world root directory, regardless of nested packaging.</li>
	<li><strong>Engine-Specific Resolution:</strong> Automatically places world files in the correct location for each engine (<code class="mono">serverDir/world</code> for Java Edition, or <code class="mono">serverDir/worlds/{'{'}LevelName{'}'}</code> for Bedrock Dedicated Server).</li>
	<li><strong>Path Traversal Protection:</strong> Uses <code class="mono">SafeZipExtractor</code> to validate every relative entry path, preventing Zip Slip extraction exploits.</li>
</ul>

<h2 id="instance-portability">Full Instance Portability (Export &amp; Import)</h2>
<p>
	Beyond importing isolated world folders, PocketMC includes an end-to-end instance portability engine
	(<code class="mono">InstanceExportService</code> and <code class="mono">InstanceImportService</code>)
	that packages or restores entire server environments into clean, self-contained archive bundles.
</p>

<h3>Exporting an Instance</h3>
<p>
	To share a configured server with friends or migrate your server to another Windows machine:
</p>
<ol>
	<li>Open the instance card in PocketMC and select <MenuPath steps={['Actions', 'Export Instance']} />.</li>
	<li>Select an export destination on your disk.</li>
	<li>PocketMC streams server components into an optimized archive while ensuring active lock files (such as <code class="mono">session.lock</code>) and platform binaries are safely excluded.</li>
</ol>

<p>The exported archive bundle preserves:</p>
<ul>
	<li><strong>Server Core &amp; Configs:</strong> Engine metadata, <code class="mono">server.properties</code>, <code class="mono">eula.txt</code>, and engine-specific configurations (<code class="mono">paper.yml</code>, <code class="mono">spigot.yml</code>, <code class="mono">bukkit.yml</code>).</li>
	<li><strong>Player Security &amp; Permissions:</strong> <code class="mono">ops.json</code>, <code class="mono">whitelist.json</code> (or Bedrock <code class="mono">allowlist.json</code>), <code class="mono">banned-players.json</code>, <code class="mono">banned-ips.json</code>, and Bedrock ban sidecar storage.</li>
	<li><strong>Addon Inventory:</strong> All plugins and mods with active states preserved (including <code class="mono">.disabled</code> toggles) and <code class="mono">addon_manifest.json</code> metadata.</li>
	<li><strong>Complete World Dimensions:</strong> All dimension folders (<code class="mono">world</code>, <code class="mono">world_nether</code>, <code class="mono">world_the_end</code>, or Bedrock <code class="mono">worlds</code>).</li>
</ul>

<h3>Importing an Instance</h3>
<p>
	Restoring an exported server bundle or compatible archive is just as seamless:
</p>
<ol>
	<li>Click <strong>Import Instance</strong> on the PocketMC home screen.</li>
	<li>Select your exported <code class="mono">.zip</code> archive.</li>
	<li>PocketMC validates archive headers, detects server engine metadata (<code class="mono">pocket-mc.json</code> or server properties), and verifies port availability.</li>
	<li>The archive is unpacked through <code class="mono">SafeZipExtractor</code> with strict path sanitization to guard against Zip Slip attacks.</li>
	<li>The imported instance is registered immediately in your instance list, ready to launch.</li>
</ol>

<h2 id="server-properties">Structured Configuration Editor</h2>
<p>
	Instead of manually editing plaintext configuration files with a text editor and risking syntax errors,
	PocketMC provides a structured GUI editor for <code class="mono">server.properties</code>:
</p>

<ul>
	<li>Easily configure MOTD (Message of the Day), game mode, difficulty, max player count, and world seed.</li>
	<li>Toggle gameplay flags including PvP, flight allowance, command blocks, Nether access, and whitelist enforcement.</li>
	<li>Adjust simulation and view distances with visual sliders.</li>
	<li>The parser preserves unknown keys and comments, ensuring compatibility with custom engine builds.</li>
</ul>

<h2 id="player-moderation">Player Moderation &amp; Bedrock Ban Sidecar</h2>
<p>
	PocketMC includes a built-in player manager for active server instances:
</p>

<ul>
	<li><strong>Live Player Tracking:</strong> Monitors connected player names, operator status, and real-time player counts.</li>
	<li><strong>Moderation Actions:</strong> Execute Op, De-op, Kick, Ban, Pardon, and Whitelist commands directly from the UI without memorizing console syntax.</li>
	<li><strong>Bedrock Ban Sidecar:</strong> Official Bedrock Dedicated Server (BDS) lacks native persistent ban file support (like Java's <code class="mono">banned-players.json</code>). PocketMC solves this by maintaining a local sidecar file (<code class="mono">pocketmc-bans.json</code>) that tracks banned player names, reasons, and timestamps to enforce moderation across restarts.</li>
</ul>

<h2 id="power-and-safety">Preflight Guards &amp; Windows Power Management</h2>
<p>
	PocketMC enforces safety checks before and during server execution:
</p>

<table>
	<thead>
		<tr>
			<th>Guard</th>
			<th>Mechanism</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Windows Sleep Inhibitor</strong></td>
			<td>Invokes <code class="mono">SetThreadExecutionState</code> (<code class="mono">ES_SYSTEM_REQUIRED | ES_CONTINUOUS</code>) via Windows kernel32 while any server is running. This keeps your server online when your PC is idle, automatically restoring normal power-saving behavior once all instances stop.</td>
		</tr>
		<tr>
			<td><strong>Port Collision Detection</strong></td>
			<td>Probes target listening ports (<code class="mono">25565</code> TCP, <code class="mono">19132</code> UDP, Voice Chat <code class="mono">24454</code> UDP) prior to server launch, warning you immediately if another instance or background application already owns the socket.</td>
		</tr>
		<tr>
			<td><strong>Disk Space Guard</strong></td>
			<td>Checks available disk storage on the target partition, alerting you if free disk headroom drops below 2 GB to prevent world write truncation.</td>
		</tr>
		<tr>
			<td><strong>RAM Allocation Guard</strong></td>
			<td>Evaluates your physical RAM before applying Java heap parameters (<code class="mono">-Xmx</code>), preventing allocations that exceed 80% of total system memory.</td>
		</tr>
	</tbody>
</table>
