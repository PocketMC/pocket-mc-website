<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Remote Control API · PocketMC Docs</title>
	<meta
		name="description"
		content="Embedded Kestrel HTTP and WebSocket endpoints for instance lifecycle, live console streaming, player moderation, and file management."
	/>
</svelte:head>

<span class="kicker">Developer & Security</span>
<h1>Remote Control API</h1>
<p class="summary">
	When Remote Control is active, PocketMC runs an embedded ASP.NET Core Kestrel web server on port 
	<code class="mono">25580</code>. It serves the responsive web dashboard and exposes a REST and WebSocket API
	for controlling your Minecraft servers.
</p>

<div class="note">
	<strong>Base Endpoint:</strong> <code class="mono">http://127.0.0.1:25580</code> &middot; 
	<strong>Authentication:</strong> Cookie session via <code class="mono">POST /api/login</code>
</div>

<h2 id="authentication">Authentication &amp; Sessions</h2>
<p>
	To interact with protected API endpoints, authenticate by sending your credentials to <code class="mono">/api/login</code>.
	Upon successful authentication, the daemon issues a secure <code class="mono">RemoteCookies</code> session cookie.
</p>

<Code
	label="POST /api/login"
	lang="json"
	text={`POST /api/login HTTP/1.1
Host: 127.0.0.1:25580
Content-Type: application/json

{
  "username": "admin",
  "password": "your-secure-password"
}`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`HTTP/1.1 200 OK
Set-Cookie: RemoteCookies=...; path=/; samesite=lax; httponly

{
  "success": true
}`}
/>

<p class="small text-muted">
	Note: The login endpoint enforces rate limiting (maximum 5 failed attempts per minute per IP address).
</p>

<h2 id="status-and-instances">Daemon Status &amp; Instances</h2>
<p>
	Query host status, local URLs, public tunnel endpoints, and list permitted server instances:
</p>

<Code
	label="GET /api/status"
	lang="json"
	text={`GET /api/status HTTP/1.1
Cookie: RemoteCookies=...`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`{
  "enabled": true,
  "hostRunning": true,
  "port": 25580,
  "accessMode": "LocalAndTunnel",
  "localUrls": ["http://127.0.0.1:25580", "http://192.168.1.50:25580"],
  "publicUrl": "https://random-words.trycloudflare.com",
  "tunnelRunning": true,
  "allowRemoteConsoleCommands": true,
  "allowRemotePlayerActions": true,
  "allowRemoteServerSettings": true,
  "allowRemoteServerAddons": true,
  "allowRemoteFileManager": true,
  "allowRemoteServerBackups": true
}`}
/>

<h2 id="instance-lifecycle">Instance Lifecycle Control</h2>
<p>
	Start, stop, or restart any instance by its UUID:
</p>

<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Endpoint</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="mono">GET</code></td>
			<td><code class="mono">/api/instances</code></td>
			<td>Lists all instances accessible to the authenticated user.</td>
		</tr>
		<tr>
			<td><code class="mono">GET</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/status</code></td>
			<td>Fetches live run state, player count, CPU %, and memory usage.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/start</code></td>
			<td>Spawns the server process and binds listening sockets.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/stop</code></td>
			<td>Sends graceful stop command with RCON save-flush before process exit.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/restart</code></td>
			<td>Stops the running instance cleanly, then initiates a fresh boot.</td>
		</tr>
	</tbody>
</table>

<h2 id="console-streaming">Live Console &amp; WebSockets</h2>
<p>
	PocketMC supports both buffered polling and bidirectional real-time WebSocket terminal streaming:
</p>

<ul>
	<li><strong>Buffered Output:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/console/history</code> returns recent console output lines stored in the circular memory buffer.</li>
	<li><strong>Command Input:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/console/command</code> accepts a JSON body <code class="mono">{'{'}"command": "say Hello"{'}'}</code>. Rate limited to 30 requests per minute.</li>
	<li><strong>WebSocket Stream:</strong> Connect to <code class="mono">/ws/instances/{'{'}id{'}'}/console</code> to stream live terminal log lines directly to your browser as they are written by the server process, and transmit commands through the persistent socket.</li>
</ul>

<h2 id="players-and-properties">Player Moderation &amp; Settings</h2>
<p>
	Manage connected players and server properties remotely:
</p>

<ul>
	<li><strong>Player List:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/players</code> returns online player usernames and player count.</li>
	<li><strong>Player Actions:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/players/{'{'}name{'}'}/[kick|ban|pardon|op|deop]</code> executes moderation commands directly through the server console or sidecar ban list.</li>
	<li><strong>Server Properties:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/properties</code> and <code class="mono">PUT /api/instances/{'{'}id{'}'}/properties</code> allow remote inspection and editing of MOTD, gamemode, difficulty, max-players, PvP, whitelist, and view distance.</li>
</ul>

<h2 id="files-and-backups">File Manager &amp; Backups</h2>
<p>
	PocketMC includes sandboxed file management and remote backup triggers:
</p>

<ul>
	<li><strong>Browse Files:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/files?path=plugins</code> lists directory contents with file sizes and timestamps.</li>
	<li><strong>Read/Write Configs:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/files/content?path=config.yml</code> and <code class="mono">PUT /api/instances/{'{'}id{'}'}/files/content</code> view and edit text files under 1 MB directly from the web browser.</li>
	<li><strong>Upload &amp; Delete:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/files/upload</code> uploads files via multipart form data; <code class="mono">DELETE /api/instances/{'{'}id{'}'}/files?path=...</code> removes files safely inside the instance folder sandbox.</li>
	<li><strong>Backups:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/backups</code> lists available backup archives with SHA-256 integrity status; <code class="mono">POST /api/instances/{'{'}id{'}'}/backups</code> triggers an immediate background RCON save-flush backup.</li>
</ul>
