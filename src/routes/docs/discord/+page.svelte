<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Discord Integration · PocketMC Docs</title>
	<meta
		name="description"
		content="Custom Discord Rich Presence (RPC) showing live server engine, player counts, tunnel join addresses, and uptime."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Discord Integration</h1>
<p class="summary">
	Connect your desktop client with Discord to display live server status, connected player counts,
	tunnel connection addresses, and active server software directly on your Discord profile.
</p>

<h2 id="rich-presence">Discord Rich Presence (RPC)</h2>
<p>
	PocketMC communicates directly with your local Discord desktop client via the native Discord IPC pipe
	using official application registration (<code class="mono">1507742265240715354</code>).
</p>

<ul>
	<li><strong>Real-Time Game Activity:</strong> Displays your active server state (Starting, Online, or Stopping) and elapsed uptime.</li>
	<li><strong>Player Counts:</strong> Shows live connected player metrics (e.g. <code class="mono">4/20 Players</code>) synchronized with the server process.</li>
	<li><strong>Engine Branding:</strong> Dynamically loads high-resolution badges matching your server engine (Vanilla, Paper, Fabric, Forge, NeoForge, BDS, or PocketMine-MP).</li>
	<li><strong>Public Join Address:</strong> When Playit tunneling is enabled, your public join address is displayed so friends can copy it directly from your Discord profile.</li>
	<li><strong>Geyser Crossplay Detection:</strong> If Geyser is installed on your server, PocketMC automatically detects both endpoints and formats both Java and Bedrock addresses in your presence status.</li>
	<li><strong>Website Link Button:</strong> Includes an interactive button linking friends directly to the official PocketMC website.</li>
</ul>

<h2 id="configuration-toggles">Customizable Display Preferences</h2>
<p>
	You have complete control over what information is broadcast to Discord. In <MenuPath steps={['Settings', 'Discord RPC']} />,
	you can toggle individual presence elements:
</p>

<table>
	<thead>
		<tr>
			<th>Setting</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Enable Discord RPC</strong></td>
			<td>Master toggle for initializing the Discord IPC client.</td>
		</tr>
		<tr>
			<td><strong>Show Server Name</strong></td>
			<td>Displays your custom instance name rather than a generic "Minecraft Server" label.</td>
		</tr>
		<tr>
			<td><strong>Show Engine &amp; Version</strong></td>
			<td>Shows the server loader and Minecraft version (e.g. <code class="mono">Paper • 1.21.4</code>).</td>
		</tr>
		<tr>
			<td><strong>Show Player Count</strong></td>
			<td>Displays real-time online players vs max player capacity.</td>
		</tr>
		<tr>
			<td><strong>Show Server Address</strong></td>
			<td>Shares your active Playit tunnel join address publicly on your Discord profile.</td>
		</tr>
		<tr>
			<td><strong>Show Software Icon</strong></td>
			<td>Renders the specific server loader logo as the large presence asset.</td>
		</tr>
		<tr>
			<td><strong>Show Download Button</strong></td>
			<td>Adds an interactive "Download PocketMC" button linking to the project website.</td>
		</tr>
		<tr>
			<td><strong>Show Idle Status</strong></td>
			<td>Displays "Managing Servers • Idle" when PocketMC is open with no servers currently running.</td>
		</tr>
	</tbody>
</table>
