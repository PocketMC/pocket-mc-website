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
	<code class="mono">25580</code>. It serves the bundled web dashboard and provides a REST and WebSocket API
	for controlling your Minecraft servers programmatically.
</p>

<div class="note">
	<strong>Base Address:</strong> <code class="mono">http://127.0.0.1:25580</code> &middot; 
	<strong>Authentication:</strong> Cookie session via <code class="mono">POST /api/login</code>
</div>

<h2 id="authentication">Authentication and Sessions</h2>
<p>
	To interact with protected API endpoints, authenticate with your administrator or sub-user credentials at <code class="mono">/api/login</code>.
	Upon successful authentication, the server sets a session cookie named <code class="mono">PocketMCRemoteAuth</code>.
</p>

<Code
	label="POST /api/login"
	lang="json"
	text={`POST /api/login HTTP/1.1
Host: 127.0.0.1:25580
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`HTTP/1.1 200 OK
Set-Cookie: PocketMCRemoteAuth=...; path=/; samesite=strict; httponly; max-age=86400

{
  "success": true
}`}
/>

<p class="small text-muted">
	The login endpoint limits requests to 5 failed attempts per minute per IP address. Exceeding this rate returns HTTP 429.
</p>

<h2 id="daemon-status">Daemon Status and Permissions</h2>
<p>
	Query server status, network endpoints, and the active session's permission flags:
</p>

<Code
	label="GET /api/status"
	lang="json"
	text={`GET /api/status HTTP/1.1
Cookie: PocketMCRemoteAuth=...`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`{
  "enabled": true,
  "hostRunning": true,
  "port": 25580,
  "accessMode": 0,
  "localUrls": ["http://127.0.0.1:25580", "http://192.168.1.50:25580"],
  "publicUrl": null,
  "tunnelRunning": false,
  "allowRemoteConsoleCommands": true,
  "allowRemotePlayerActions": true,
  "allowRemoteServerSettings": true,
  "allowRemoteServerAddons": true,
  "allowRemoteFileManager": true,
  "allowRemoteServerBackups": true
}`}
/>

<h2 id="instance-lifecycle">Instance Lifecycle Endpoints</h2>
<p>
	Control server processes using their instance GUID:
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
			<td>Lists all instances permitted for the current authenticated user account.</td>
		</tr>
		<tr>
			<td><code class="mono">GET</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/status</code></td>
			<td>Returns runtime status, player counts, CPU percentage, and memory usage in bytes.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/start</code></td>
			<td>Spawns the server process within its Win32 Job Object sandbox.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/stop</code></td>
			<td>Sends graceful stop command with RCON save-flush before process exit.</td>
		</tr>
		<tr>
			<td><code class="mono">POST</code></td>
			<td><code class="mono">/api/instances/{'{'}id{'}'}/restart</code></td>
			<td>Executes a clean shutdown followed by an automatic reboot.</td>
		</tr>
	</tbody>
</table>

<h2 id="console-streaming">Live Console and WebSockets</h2>
<p>
	Terminal output can be retrieved through polling or live WebSocket streaming:
</p>

<ul>
	<li><strong>Buffered Output:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/console/history</code> returns recent console output lines stored in the server's in-memory circular buffer.</li>
	<li><strong>Command Input:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/console/command</code> sends a command to the server STDIN. Body format: <code class="mono">{'{'}"command": "say Hello"{'}'}</code>. Submissions are limited to 30 requests per minute per instance.</li>
	<li><strong>WebSocket Stream:</strong> Connect your WebSocket client to <code class="mono">/ws/instances/{'{'}id{'}'}/console</code> with the <code class="mono">PocketMCRemoteAuth</code> session cookie. PocketMC pushes log lines over the socket in real time and processes text messages sent over the socket as server commands.</li>
</ul>

<h2 id="players-and-properties">Player Moderation and Settings</h2>
<p>
	Manage players and configuration options remotely:
</p>

<ul>
	<li><strong>Player List:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/players</code> returns online usernames and connection statistics.</li>
	<li><strong>Player Actions:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/players/{'{'}name{'}'}/{'{'}action{'}'}</code> executes moderation actions. Valid actions are <code class="mono">kick</code>, <code class="mono">ban</code>, <code class="mono">pardon</code>, <code class="mono">op</code>, and <code class="mono">deop</code>. On Bedrock servers, ban commands update the internal <code class="mono">pocketmc-bans.json</code> sidecar.</li>
	<li><strong>Server Properties:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/properties</code> returns current settings as a key-value object. <code class="mono">PUT /api/instances/{'{'}id{'}'}/properties</code> writes updated values back to the <code class="mono">server.properties</code> file.</li>
</ul>

<h2 id="addons-management">Addons and Modifications</h2>
<p>
	Manage plugins and mods over the API:
</p>

<ul>
	<li><strong>List Addons:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/addons</code> lists installed plugins and mods, file sizes, and enabled states.</li>
	<li><strong>Uninstall Addon:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/addons/uninstall</code> removes a mod or plugin file. Body format: <code class="mono">{'{'}"fileName": "example.jar", "addonType": 0{'}'}</code>.</li>
</ul>

<h2 id="files-and-backups">Files and World Backups</h2>
<p>
	Sandboxed filesystem access and backup controls:
</p>

<ul>
	<li><strong>List Files:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/files?path=plugins</code> returns files and directories inside the specified path. Access outside the instance root directory is blocked.</li>
	<li><strong>Read Text File:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/files/content?path=server.properties</code> retrieves file text. Files larger than 1 MB are rejected to preserve memory.</li>
	<li><strong>Save Text File:</strong> <code class="mono">PUT /api/instances/{'{'}id{'}'}/files/content</code> writes updated text back to disk. Body format: <code class="mono">{'{'}"path": "server.properties", "content": "..."{'}'}</code>.</li>
	<li><strong>Upload File:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/files/upload</code> accepts multipart form uploads up to 100 MB per file directly into the target directory.</li>
	<li><strong>Delete File:</strong> <code class="mono">DELETE /api/instances/{'{'}id{'}'}/files?path=...</code> permanently removes the designated file or directory.</li>
	<li><strong>Backup History:</strong> <code class="mono">GET /api/instances/{'{'}id{'}'}/backups</code> lists archive files with file size, creation timestamp, and SHA-256 integrity hash.</li>
	<li><strong>Create Backup:</strong> <code class="mono">POST /api/instances/{'{'}id{'}'}/backups</code> initiates an immediate background snapshot with an automatic RCON save-flush if the server is running.</li>
</ul>
