<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Remote Dashboard · PocketMC Docs</title>
	<meta
		name="description"
		content="Embedded Kestrel HTTP server, access modes, mobile QR access, and granular permission scopes."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Remote Dashboard</h1>
<p class="summary">
	PocketMC embeds an ASP.NET Core Kestrel web server on port 25580. It serves an administration dashboard bundled inside the executable, letting you manage servers from a phone, tablet, or secondary computer without installing third-party web servers.
</p>

<h2 id="enabling-remote-control">Enabling Remote Control</h2>
<p>
	Turn on the web dashboard through the desktop settings:
</p>
<ol>
	<li>Open PocketMC and go to <MenuPath steps={['Settings', 'Remote Control']} />.</li>
	<li>Enable the <strong>Enable Remote Control Server</strong> switch.</li>
	<li>Confirm the listening port (default is <code class="mono">25580</code>).</li>
	<li>Add your initial administrator username and password.</li>
</ol>

<p>
	The server binds to <code class="mono">0.0.0.0:25580</code> by default, accepting connections from your local network. You can restrict binding to <code class="mono">127.0.0.1</code> if you only intend to access the panel locally or through an SSH tunnel.
</p>

<h2 id="access-modes">Access Modes</h2>
<p>
	PocketMC supports three connection modes depending on whether you are on the same local network or connecting remotely over the internet:
</p>

<table>
	<thead>
		<tr>
			<th>Mode</th>
			<th>Protocol</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>LAN Only</strong> (<code class="mono">0</code>)</td>
			<td>HTTP</td>
			<td>Binds to your local IP address (for example, <code class="mono">http://192.168.1.50:25580</code>). Accessible to devices connected to the same Wi-Fi or subnet.</td>
		</tr>
		<tr>
			<td><strong>Cloudflare Quick Tunnel</strong> (<code class="mono">1</code>)</td>
			<td>HTTPS</td>
			<td>Supervises an ephemeral <code class="mono">cloudflared.exe</code> process to expose the dashboard via a public <code class="mono">https://*.trycloudflare.com</code> address with automatic TLS certificates. Requires no Cloudflare account or router port forwarding.</td>
		</tr>
		<tr>
			<td><strong>Playit.gg HTTPS Tunnel</strong> (<code class="mono">2</code>)</td>
			<td>HTTPS</td>
			<td>Routes traffic through the managed Playit agent using a dedicated HTTP/HTTPS tunnel definition, keeping external access tied to your existing Playit account.</td>
		</tr>
	</tbody>
</table>

<h2 id="mobile-qr-access">Quick QR Access</h2>
<p>
	To open the dashboard on a mobile device without typing IP addresses or tunnel domains:
</p>
<ul>
	<li>Navigate to <MenuPath steps={['Settings', 'Remote Control']} /> in the desktop app.</li>
	<li>Click <strong>Dashboard QR Code</strong> to view the generated QR code.</li>
	<li>Scan the code with your phone camera. The QR code contains the full URL including port and protocol, opening the dashboard in your mobile browser.</li>
</ul>

<h2 id="security-and-sessions">Authentication and Session Lifecycles</h2>
<p>
	Remote requests authenticate through cookie-based sessions:
</p>
<ul>
	<li><strong>Cookie Name:</strong> <code class="mono">PocketMCRemoteAuth</code>.</li>
	<li><strong>Flags:</strong> Marked <code class="mono">HttpOnly</code>, <code class="mono">SameSite=Strict</code>, with a 24-hour expiration window.</li>
	<li><strong>Security Stamp Validation:</strong> Every account maintains a random GUID security stamp. Updating a user password or altering their permission flags rotates this stamp, immediately invalidating any active cookies across all devices.</li>
	<li><strong>Rate Limiting:</strong> The built-in request limiter restricts login attempts to 5 per minute per IP address. Failed attempts beyond this threshold return an immediate <code class="mono">429 Too Many Requests</code> HTTP response.</li>
	<li><strong>Command Rate Limiting:</strong> Console command submissions are capped at 30 commands per minute per instance to prevent process buffer saturation.</li>
</ul>

<h2 id="granular-permissions">User Accounts and Permission Scopes</h2>
<p>
	You can configure multiple user accounts with restricted capabilities so moderators or server co-hosts only access what they need:
</p>

<table>
	<thead>
		<tr>
			<th>Permission Scope</th>
			<th>Allowed Operations</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="mono">AllowRemoteConsoleCommands</code></td>
			<td>Connect to WebSocket terminal streams (<code class="mono">/ws/instances/{'{'}id{'}'}/console</code>) and submit commands via <code class="mono">POST /api/instances/{'{'}id{'}'}/console/command</code>.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemotePlayerActions</code></td>
			<td>Kick, ban, pardon, op, and de-op players through the web interface.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerSettings</code></td>
			<td>Read and modify <code class="mono">server.properties</code> configurations.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerAddons</code></td>
			<td>List installed plugins or mods, toggle them on or off, and uninstall packages.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteFileManager</code></td>
			<td>Browse directories, edit text files under 1 MB, upload files up to 100 MB, and delete files inside the instance directory.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerBackups</code></td>
			<td>View backup history and trigger manual RCON-safe world backups.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowedInstanceIds</code></td>
			<td>Array of server instance GUIDs. When populated, the user only sees and interacts with the listed instances.</td>
		</tr>
	</tbody>
</table>
