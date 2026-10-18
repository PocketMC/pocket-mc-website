<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Authentication & Security · PocketMC Docs</title>
	<meta
		name="description"
		content="Cookie session authentication, DPAPI encryption, UWP loopback isolation, and rate limiting."
	/>
</svelte:head>

<span class="kicker">Developer & Security</span>
<h1>Authentication &amp; Security</h1>
<p class="summary">
	PocketMC implements a robust security model designed to safeguard user credentials, isolate instance
	sandboxes, prevent brute-force attacks, and protect local system resources.
</p>

<h2 id="dpapi-encryption">DPAPI Credential Encryption</h2>
<p>
	Sensitive secrets (including third-party cloud OAuth tokens for Google Drive, Dropbox, OneDrive, and
	Remote Control user password hashes) are never stored in plaintext on disk.
</p>
<p>
	On Windows, PocketMC encrypts all secrets using the native <strong>Windows Data Protection API (DPAPI)</strong>
	(<code class="mono">ProtectedData.Protect</code>) with <code class="mono">DataProtectionScope.CurrentUser</code>.
	Encryption keys are managed directly by the Windows kernel and cryptographically bound to your specific
	Windows User Account Security Identifier (SID). If another user or process copies your <code class="mono">settings.json</code>
	file to another machine or account, the secrets cannot be decrypted.
</p>

<h2 id="session-authentication">Cookie-Based Session Auth</h2>
<p>
	The embedded Remote Control server uses ASP.NET Core cookie authentication (<code class="mono">RemoteCookies</code>).
</p>

<ul>
	<li><strong>Password Hashing:</strong> User passwords are salted and hashed using cryptographic PBKDF2/SHA-256 before storage.</li>
	<li><strong>Security Stamps:</strong> Every user profile includes an internal security stamp. If a user password is changed or an account is modified, the security stamp rotates, immediately invalidating all active remote sessions.</li>
	<li><strong>24-Hour Expiration:</strong> Session cookies carry a strict 24-hour expiration policy and are flagged with <code class="mono">HttpOnly</code> and <code class="mono">SameSite=Lax</code> to prevent cross-site scripting (XSS) extraction.</li>
</ul>

<h2 id="granular-permissions">Multi-User Permission Scopes</h2>
<p>
	When inviting friends or co-admins to help manage your servers via the web dashboard, you can define individual user accounts with specific granular permissions:
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
			<td>Allows sending terminal commands and streaming live console output via WebSockets.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemotePlayerActions</code></td>
			<td>Allows executing Kick, Ban, Pardon, Op, and De-op player actions.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerSettings</code></td>
			<td>Allows viewing and modifying <code class="mono">server.properties</code>.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerAddons</code></td>
			<td>Allows viewing installed plugins/mods and toggling them enabled or disabled.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteFileManager</code></td>
			<td>Allows browsing directories, editing configs (&lt; 1 MB), and uploading files.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowRemoteServerBackups</code></td>
			<td>Allows viewing backup history and triggering manual world backups.</td>
		</tr>
		<tr>
			<td><code class="mono">AllowedInstanceIds</code></td>
			<td>Restricts the user's visibility and controls strictly to designated server instances.</td>
		</tr>
	</tbody>
</table>

<h2 id="rate-limiting">Brute-Force Rate Limiting</h2>
<p>
	The Remote Control daemon enforces proactive rate limiting (<code class="mono">RemoteRequestLimiter</code>)
	using an in-memory token bucket algorithm:
</p>

<ul>
	<li><strong>Login Protection:</strong> Authentication attempts to <code class="mono">/api/login</code> are capped at 5 attempts per minute per client IP. Excess attempts receive an immediate <code class="mono">429 Too Many Requests</code> response.</li>
	<li><strong>Console Command Flooding:</strong> Command submissions to running server instances are limited to 30 requests per minute to prevent accidental or malicious terminal flooding.</li>
</ul>

<h2 id="loopback-isolation">Windows UWP Loopback Isolation</h2>
<p>
	By default, Windows AppContainer security blocks Minecraft Bedrock Edition (which runs as a Universal Windows Platform app)
	from connecting to loopback network addresses (<code class="mono">127.0.0.1</code> or <code class="mono">localhost</code>) on the same machine.
</p>
<p>
	To allow Bedrock players on Windows to join their own local BDS or PocketMine servers without friction, PocketMC automatically
	executes the official Windows network isolation exemption:
</p>

<Code
	label="PowerShell (Executed Automatically by PocketMC)"
	text={`CheckNetIsolation.exe LoopbackExempt -a -p="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`}
/>
