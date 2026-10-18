<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Instance & World Management · PocketMC Docs</title>
	<meta
		name="description"
		content="World importing (.zip/.mcworld), server.properties editor, Bedrock ban sidecar, and Windows sleep prevention."
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
