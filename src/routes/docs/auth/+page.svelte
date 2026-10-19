<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Authentication & Security · PocketMC Docs</title>
	<meta
		name="description"
		content="DPAPI v2 entropy credential encryption, ZeroMemory scrubbing, cookie session security, rate limiting, and UWP loopback isolation."
	/>
</svelte:head>

<span class="kicker">Developer & Security</span>
<h1>Authentication and Security</h1>
<p class="summary">
	PocketMC secures server credentials, remote administrative access, and operating system resources through native Windows APIs, cryptographic memory scrubbing, and isolated process boundaries.
</p>

<h2 id="dpapi-encryption">DPAPI Credential Encryption</h2>
<p>
	Sensitive credentials are never written to disk in plaintext. This includes cloud backup OAuth refresh tokens (Google Drive, Dropbox, OneDrive), Playit.gg agent secrets, CurseForge API keys, LLM provider tokens, and Remote Control user password hashes.
</p>
<p>
	On Windows, PocketMC encrypts every secret using the native Windows Data Protection API (<code class="mono">ProtectedData.Protect</code>) scoped to <code class="mono">DataProtectionScope.CurrentUser</code>. PocketMC applies a v2 protection scheme:
</p>

<ul>
	<li><strong>SID-Bound Entropy:</strong> The encryption operation incorporates optional entropy derived from the SHA-256 hash of your Windows user Security Identifier (SID) combined with an internal application salt string. Even if another user account on the same machine reads the configuration file, Windows DPAPI rejects decryption.</li>
	<li><strong>Format Prefix:</strong> Encrypted payloads are formatted as <code class="mono">dpapi:v2:&lt;base64&gt;</code>, allowing seamless version migration if encryption parameters change.</li>
	<li><strong>Memory Scrubbing:</strong> Immediately after encryption or decryption completes, PocketMC calls <code class="mono">CryptographicOperations.ZeroMemory</code> on all plaintext byte buffers and intermediate arrays. This ensures raw credentials do not linger in managed garbage collection heaps or memory dump files.</li>
</ul>

<h2 id="session-authentication">Session Authentication and Invalidation</h2>
<p>
	The embedded Kestrel web server authenticates administrators using ASP.NET Core cookie authentication:
</p>

<ul>
	<li><strong>Cookie Name:</strong> <code class="mono">PocketMCRemoteAuth</code>.</li>
	<li><strong>Security Flags:</strong> Configured with <code class="mono">HttpOnly</code>, <code class="mono">SameSite=Strict</code>, and a 24-hour expiration lifespan.</li>
	<li><strong>Password Storage:</strong> User passwords are encrypted using PBKDF2 with SHA-256 and individual per-user salts.</li>
	<li><strong>Security Stamp Invalidation:</strong> Each user profile holds a GUID security stamp. Whenever you change a password or modify permission flags, PocketMC rotates this stamp. Every incoming request validates the cookie claims against the live security stamp in memory; if they do not match, the session is rejected immediately.</li>
</ul>

<h2 id="granular-permissions">User Permission Flags</h2>
<p>
	Sub-user accounts can be granted selective capabilities to manage servers without granting full administrative ownership:
</p>

<table>
	<thead>
		<tr>
			<th>Permission Flag</th>
			<th>Capabilities Granted</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="mono">AllowRemoteConsoleCommands</code></td>
			<td>Stream real-time terminal output and submit commands to the server STDIN.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemotePlayerActions</code></td>
			<td>Execute Kick, Ban, Pardon, Op, and De-op operations on players.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerSettings</code></td>
			<td>View and update values in <code class="mono">server.properties</code>.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerAddons</code></td>
			<td>Inspect installed plugins and mods, toggle their state, or uninstall them.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteFileManager</code></td>
			<td>Browse directories, read text files under 1 MB, upload files up to 100 MB, and delete files.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerBackups</code></td>
			<td>Inspect backup history and trigger manual RCON-safe backups.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowedInstanceIds</code></td>
			<td>Restricts account visibility strictly to the listed server GUIDs.</td>
		</tr>
	</tbody>
</table>

<h2 id="rate-limiting">Brute-Force Rate Limiting</h2>
<p>
	The Remote Control host protects endpoints using an in-memory token bucket rate limiter:
</p>

<ul>
	<li><strong>Login Protection:</strong> Authentication requests to <code class="mono">/api/login</code> are capped at 5 failed attempts per minute per IP address. Additional attempts are blocked with HTTP 429 until the cooldown expires.</li>
	<li><strong>Terminal Flooding:</strong> Console commands submitted through the REST API or WebSocket are limited to 30 requests per minute per instance.</li>
</ul>

<h2 id="loopback-isolation">Windows UWP Loopback Exemption</h2>
<p>
	Minecraft Bedrock Edition on Windows runs inside a Universal Windows Platform (UWP) AppContainer sandbox. By default, Windows network isolation prohibits UWP applications from sending network traffic to loopback addresses (<code class="mono">127.0.0.1</code> or <code class="mono">localhost</code>).
</p>
<p>
	When hosting a Bedrock server locally, this policy prevents the host player from joining their own game. PocketMC registers the official network isolation exemption using the Windows native utility:
</p>

<Code
	label="Loopback Exemption Command"
	text={`CheckNetIsolation.exe LoopbackExempt -a -p="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`}
/>
