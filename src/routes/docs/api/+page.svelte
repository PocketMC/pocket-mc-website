<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>REST API Reference · PocketMC Docs</title>
	<meta
		name="description"
		content="Local daemon HTTP endpoints for server lifecycle, console logs, and instances."
	/>
</svelte:head>

<span class="kicker">Developer Portal</span>
<h1>REST API Reference</h1>
<p class="summary">
	When Remote Control is active, PocketMC runs an embedded Kestrel HTTP server on port 
	<code class="mono">25580</code>. All endpoints accept and return JSON.
</p>

<div class="note">
	<strong>Base Endpoint:</strong> <code class="mono">http://127.0.0.1:25580</code> &middot; 
	<strong>Authentication:</strong> Session Cookie or Bearer Token via <code class="mono">POST /api/login</code>
</div>

<h2 id="authentication">Authentication</h2>
<p>
	Authenticate by exchanging credentials for a session cookie or bearer token.
</p>

<Code
	label="POST /api/login"
	lang="json"
	text={`POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`{
  "status": "authenticated",
  "token": "pmc_sec_89f0a2d1e4...",
  "expiresAt": "2026-10-18T14:30:00Z",
  "permissions": ["all"]
}`}
/>

<h2 id="system-status">System Status &amp; Health</h2>
<p>
	Query overall host daemon health, system architecture, CPU/RAM utilization, and active server counts.
</p>

<Code
	label="GET /api/status"
	lang="json"
	text={`GET /api/status HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`{
  "version": "1.9.9",
  "uptimeSeconds": 14280,
  "system": {
    "totalMemoryMb": 32768,
    "availableMemoryMb": 18450,
    "cpuUsagePercent": 14.2
  },
  "instances": {
    "total": 3,
    "running": 1
  }
}`}
/>

<h2 id="list-instances">List Server Instances</h2>
<p>
	Returns an array of all configured server instances with their current run states, ports, engines, and memory limits.
</p>

<Code
	label="GET /api/instances"
	lang="json"
	text={`GET /api/instances HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`[
  {
    "id": "e3b0c442-98fc-4c14-9afb-f4c8996fb924",
    "name": "Survival SMP",
    "engine": "Paper",
    "minecraftVersion": "1.21.1",
    "status": "Running",
    "port": 25565,
    "allocatedRamMb": 6144,
    "players": {
      "online": 4,
      "max": 20
    }
  }
]`}
/>

<h2 id="instance-lifecycle">Instance Lifecycle Controls</h2>
<p>
	Start, stop, or force-terminate a server instance. Stopping initiates a graceful RCON save-flush.
</p>

<Code
	label={'POST /api/instances/{id}/start'}
	lang="json"
	text={`POST /api/instances/e3b0c442-98fc-4c14-9afb-f4c8996fb924/start HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...`}
/>

<Code
	label={'POST /api/instances/{id}/stop'}
	lang="json"
	text={`POST /api/instances/e3b0c442-98fc-4c14-9afb-f4c8996fb924/stop HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...
Content-Type: application/json

{
  "graceful": true,
  "timeoutSeconds": 30
}`}
/>

<h2 id="console-commands">Console Commands</h2>
<p>
	Dispatch server commands directly into the server standard input stream.
</p>

<Code
	label={'POST /api/instances/{id}/console/command'}
	lang="json"
	text={`POST /api/instances/e3b0c442-98fc-4c14-9afb-f4c8996fb924/console/command HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...
Content-Type: application/json

{
  "command": "say Server rebooting in 5 minutes for maintenance"
}`}
/>

<Code
	label="200 OK Response"
	lang="json"
	text={`{
  "success": true,
  "timestamp": "2026-10-18T03:00:00Z"
}`}
/>

<h2 id="file-management">File Management</h2>
<p>
	Read, write, upload, and browse server files securely. Path traversal outside the instance root directory is strictly prohibited.
</p>

<Code
	label={'GET /api/instances/{id}/files?path=server.properties'}
	lang="json"
	text={`GET /api/instances/e3b0c442-98fc-4c14-9afb-f4c8996fb924/files?path=server.properties HTTP/1.1
Authorization: Bearer pmc_sec_89f0a2d1e4...`}
/>
