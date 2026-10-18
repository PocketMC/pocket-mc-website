<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Remote Dashboard · PocketMC Docs</title>
	<meta
		name="description"
		content="Self-hosted responsive web panel, quick QR web dashboard URL access, and permission scopes."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Remote Dashboard</h1>
<p class="summary">
	PocketMC embeds an ASP.NET Core Kestrel HTTP web server that delivers a responsive mobile and desktop
	administration panel accessible over LAN or internet.
</p>

<h2 id="enabling-remote-control">Enabling Remote Control</h2>
<p>
	To turn on the remote web portal:
</p>
<ol>
	<li>Open PocketMC and navigate to <MenuPath steps={['Settings', 'Remote Control']} />.</li>
	<li>Toggle <strong>Enable Remote Control Server</strong> on.</li>
	<li>Specify the listening port (default is <code class="mono">25580</code>).</li>
	<li>Create an admin user and password.</li>
</ol>

<h2 id="mobile-qr-access">Quick QR Web Dashboard Access</h2>
<p>
	Opening the web dashboard from your smartphone or tablet requires no manual IP typing:
</p>
<ul>
	<li>View the <strong>Dashboard QR Code</strong> in the Remote Control settings.</li>
	<li>Scan the displayed QR code with your phone camera or QR reader.</li>
	<li>The QR code directly encodes your web dashboard URL so your browser opens the panel immediately.</li>
</ul>

<h2 id="granular-permissions">User Permission Scopes</h2>
<p>
	When inviting co-admins or moderators to your server, you can create multi-user accounts restricted to specific capabilities:
</p>

<table>
	<thead>
		<tr>
			<th>Permission Scope</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="mono">AllowRemoteConsoleCommands</code></td>
			<td>Stream real-time terminal output via WebSockets and execute console commands.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemotePlayerActions</code></td>
			<td>Kick, ban, pardon, op, or de-op connected and offline players.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerSettings</code></td>
			<td>View and edit server.properties configuration settings.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerAddons</code></td>
			<td>View installed plugins/mods and toggle them enabled or disabled.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteFileManager</code></td>
			<td>Browse files, edit text configurations under 1 MB, and upload files.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerBackups</code></td>
			<td>Inspect backup history and trigger manual RCON-safe world backups.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowedInstanceIds</code></td>
			<td>Restrict user access strictly to specific designated server instances.</td>
		</tr>
	</tbody>
</table>
