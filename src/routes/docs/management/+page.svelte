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
	PocketMC manages server configuration, world imports, full-instance export archives, player moderation,
	and Windows background execution guards.
</p>

<h2 id="world-importing">World Archive Importing</h2>
<p>
	Community world downloads and backups are packaged in many folder layouts. PocketMC's <code class="mono">WorldManager</code>
	locates and extracts world saves safely:
</p>
<ul>
	<li>Archive formats: Accepts standard <code class="mono">.zip</code> archives and Bedrock <code class="mono">.mcworld</code> export packages.</li>
	<li>Root detection: Recursively scans the archive for <code class="mono">level.dat</code> to locate the world root, even if the files are buried several folders deep.</li>
	<li>Placement: Places world files in <code class="mono">world/</code> for Java Edition servers, or under <code class="mono">worlds/{'{'}level-name{'}'}</code> for Bedrock Dedicated Server.</li>
	<li>Path safety: Uses <code class="mono">SafeZipExtractor</code> to verify that extracted paths remain inside the target instance directory, blocking directory traversal (Zip Slip) attacks.</li>
</ul>

<h2 id="instance-portability">Instance Export and Import</h2>
<p>
	PocketMC includes an export and import system to transfer configured servers between Windows PCs or create standalone backups.
</p>

<h3>Exporting an Instance</h3>
<p>
	Under <MenuPath steps={['Instance Card', 'Actions', 'Export Instance']} />, PocketMC packages your server into a single archive:
</p>
<ul>
	<li>Server configuration: Engine settings, <code class="mono">server.properties</code>, <code class="mono">eula.txt</code>, and loader files (<code class="mono">paper.yml</code>, <code class="mono">spigot.yml</code>).</li>
	<li>Player data: Permissions (<code class="mono">ops.json</code>), allowlists (<code class="mono">whitelist.json</code>), ban records, and Bedrock sidecar files.</li>
	<li>Addon files: Installed plugins and mods, their active states (including <code class="mono">.disabled</code> markers), and <code class="mono">pocket-mc-addons.json</code> metadata.</li>
	<li>World saves: Overworld, Nether, and End dimensions. Transient lock files like <code class="mono">session.lock</code> are skipped automatically.</li>
</ul>

<h3>Importing an Instance</h3>
<p>
	Click <strong>Import Instance</strong> on the home screen and select a compatible <code class="mono">.zip</code> bundle.
	PocketMC checks the archive manifest, confirms port availability, unpacks the files safely, and registers the server in your active instance list.
</p>

<h2 id="server-properties">Configuration Editor</h2>
<p>
	PocketMC provides a structured interface for <code class="mono">server.properties</code>:
</p>
<ul>
	<li>Common settings: MOTD, game mode, difficulty, max player count, and world seed.</li>
	<li>Gameplay rules: PvP, flight allowance, command blocks, Nether access, and whitelist enforcement.</li>
	<li>Render settings: View distance and simulation distance sliders.</li>
	<li>Preserves custom fields: Comments and unrecognized engine-specific configuration flags remain intact when saving.</li>
</ul>

<h2 id="player-moderation">Player Moderation &amp; Bedrock Ban Sidecar</h2>
<p>
	The server dashboard includes tools to manage connected players:
</p>
<ul>
	<li>Player tracking: Displays real-time online players, operator privileges, and ping latency.</li>
	<li>Moderation: Execute Kick, Ban, Pardon, Op, and De-op actions directly from the user interface.</li>
	<li>Bedrock ban sidecar: Vanilla Bedrock Dedicated Server does not include a persistent ban file format. PocketMC maintains <code class="mono">pocketmc-bans.json</code> in the instance folder, recording banned player names, XUIDs, reasons, and timestamps to enforce moderation across server reboots.</li>
</ul>

<h2 id="power-and-safety">Preflight Guards &amp; Process Supervision</h2>
<p>
	PocketMC performs system checks before launching servers and monitors background execution:
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
			<td>Windows Sleep Inhibitor</td>
			<td>Calls <code class="mono">SetThreadExecutionState(ES_SYSTEM_REQUIRED | ES_CONTINUOUS)</code> in <code class="mono">kernel32.dll</code> while any server runs. This prevents Windows from entering sleep mode while idle, restoring your normal sleep schedule when all instances stop.</td>
		</tr>
		<tr>
			<td>Process Tree Management</td>
			<td>Assigns server processes to a Win32 Job Object configured with <code class="mono">JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE</code>. If PocketMC exits or closes unexpectedly, child Java and Bedrock processes terminate immediately without leaving background JVMs.</td>
		</tr>
		<tr>
			<td>Socket Collision Probe</td>
			<td>Probes game and voice ports (<code class="mono">25565</code> TCP, <code class="mono">19132</code> UDP, Voice Chat <code class="mono">24454</code> UDP) with exclusive address binding before starting the server, alerting you if another program already owns the port.</td>
		</tr>
		<tr>
			<td>Disk Storage Guard</td>
			<td>Monitors free storage on your installation drive, warning if available disk headroom drops below 2 GB to prevent world corruption from incomplete writes.</td>
		</tr>
	</tbody>
</table>
