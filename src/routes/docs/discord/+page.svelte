<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Discord Integration · PocketMC Docs</title>
	<meta
		name="description"
		content="Discord Rich Presence via local IPC pipe, multi-server priority rules, Geyser dual endpoint detection, and webhook notifications."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Discord Integration</h1>
<p class="summary">
	PocketMC integrates with Discord through two independent channels: local Rich Presence (RPC) over named pipes to show live server activity on your profile, and outbound Discord webhooks to alert your community when servers start, stop, or crash.
</p>

<h2 id="rich-presence">Discord Rich Presence (RPC)</h2>
<p>
	The desktop client connects directly to the Discord desktop app via the local Windows named pipe (<code class="mono">\\.\pipe\discord-ipc-0</code>) using registered application ID <code class="mono">1507742265240715354</code>. It requires no Discord bot tokens or web requests to update your profile status.
</p>

<ul>
	<li><strong>Activity Status:</strong> Shows current lifecycle phase (Starting, Online, or Stopping) along with an elapsed uptime timer.</li>
	<li><strong>Player Counts:</strong> Streams live player counts against max server capacity (for example, <code class="mono">5/20 Players</code>).</li>
	<li><strong>Engine Branding:</strong> Loads matching high-resolution logos for Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock Dedicated Server, and PocketMine-MP.</li>
	<li><strong>Public Join Address:</strong> When Playit.gg tunneling is enabled, your public tunnel host and port display directly in your presence details so friends can connect.</li>
	<li><strong>Geyser Crossplay Formatting:</strong> When PocketMC detects the Geyser plugin or mod installed alongside a Bedrock UDP tunnel, it displays both endpoints simultaneously:
		<br />
		<code class="mono">Java: play.example.gg:25565 | Bedrock: play.example.gg:19132</code>
	</li>
	<li><strong>Download Button:</strong> Renders a clickable button on your Discord profile card linking friends directly to the PocketMC download page.</li>
</ul>

<h2 id="multi-server-priority">Multi-Server Display Priority</h2>
<p>
	If you run multiple Minecraft servers simultaneously on one machine, Discord only allows a single Rich Presence activity at a time. PocketMC evaluates running instances and selects which server to broadcast using this deterministic priority order:
</p>

<ol>
	<li><strong>Lifecycle Phase:</strong> An <code class="mono">Online</code> server takes precedence over a <code class="mono">Starting</code> server, which takes precedence over a <code class="mono">Stopping</code> server.</li>
	<li><strong>Player Count:</strong> If multiple servers share the same lifecycle phase, the server with the highest number of active connected players is displayed.</li>
	<li><strong>Uptime:</strong> If player counts are equal, the server with the longest running uptime is selected.</li>
</ol>

<h2 id="presence-settings">Presence Display Toggles</h2>
<p>
	In <MenuPath steps={['Settings', 'Discord RPC']} />, you can customize every field broadcast to Discord:
</p>

<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Enable Discord RPC</strong></td>
			<td>Enabled</td>
			<td>Master toggle for connecting to the local Discord IPC socket.</td>
		</tr>
		<tr>
			<td><strong>Show Server Name</strong></td>
			<td>Enabled</td>
			<td>Displays your custom instance name rather than generic text.</td>
		</tr>
		<tr>
			<td><strong>Show Engine and Version</strong></td>
			<td>Enabled</td>
			<td>Displays the server platform and version string (for example, <code class="mono">Paper 1.21.4</code>).</td>
		</tr>
		<tr>
			<td><strong>Show Player Count</strong></td>
			<td>Enabled</td>
			<td>Displays real-time player counts reported by the server process.</td>
		</tr>
		<tr>
			<td><strong>Show Server Address</strong></td>
			<td>Enabled</td>
			<td>Displays the public Playit tunnel address in the details field.</td>
		</tr>
		<tr>
			<td><strong>Show Software Icon</strong></td>
			<td>Enabled</td>
			<td>Renders the platform logo as the primary presence image asset.</td>
		</tr>
		<tr>
			<td><strong>Show Download Button</strong></td>
			<td>Enabled</td>
			<td>Adds a profile button linking to the PocketMC project website.</td>
		</tr>
		<tr>
			<td><strong>Show Idle Status</strong></td>
			<td>Disabled</td>
			<td>Displays an idle status ("Managing Servers") when PocketMC is open without any active running servers.</td>
		</tr>
	</tbody>
</table>

<h2 id="discord-webhooks">Discord Webhook Notifications</h2>
<p>
	In addition to client Rich Presence, PocketMC can dispatch automated embed notifications to any Discord channel through incoming webhooks. Configure your webhook URL in <MenuPath steps={['Settings', 'Notifications']} /> to receive events:
</p>

<ul>
	<li><strong>Server Online Alerts:</strong> Dispatches a green embed when a server finishes loading chunks and starts listening for player connections, including the join address.</li>
	<li><strong>Tunnel Status Changes:</strong> Alerts when Playit.gg establishes a new connection or recovers from an agent disconnect.</li>
	<li><strong>Remote Dashboard Logins:</strong> Notifies administrators when a user logs into the remote web panel, noting the IP address.</li>
	<li><strong>AI Crash Post-Mortems:</strong> Automatically posts sanitized AI incident summaries directly to your moderator channel after an unhandled server crash.</li>
</ul>
