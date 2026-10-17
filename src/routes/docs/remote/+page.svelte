<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Remote Dashboard · PocketMC Docs</title>
	<meta
		name="description"
		content="Self-hosted responsive web panel, QR code mobile pairing, and permission scopes."
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

<h2 id="mobile-qr-pairing">Instant Mobile QR Pairing</h2>
<p>
	Connecting from your smartphone requires no manual IP typing:
</p>
<ul>
	<li>Click the <strong>Pair Mobile Device</strong> button in the Remote Control settings.</li>
	<li>Scan the displayed QR code with your phone camera.</li>
	<li>The browser automatically opens the portal and completes authenticated token exchange.</li>
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
			<td><code class="mono">Console:Read</code></td>
			<td>View live colorized server console output in real-time.</td>
		</tr>
		<tr>
			<td><code class="mono">Console:Write</code></td>
			<td>Send commands to the running server terminal.</td>
		</tr>
		<tr>
			<td><code class="mono">Server:Lifecycle</code></td>
			<td>Start, stop, and restart server instances.</td>
		</tr>
		<tr>
			<td><code class="mono">Files:Manage</code></td>
			<td>Browse directories, upload configs, and edit server properties.</td>
		</tr>
		<tr>
			<td><code class="mono">Backups:Manage</code></td>
			<td>Trigger manual backups and restore previous save states.</td>
		</tr>
	</tbody>
</table>
