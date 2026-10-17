<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Authentication & Security · PocketMC Docs</title>
	<meta
		name="description"
		content="Token generation, DPAPI encryption, loopback isolation, and access controls."
	/>
</svelte:head>

<span class="kicker">Developer Portal</span>
<h1>Authentication & Security</h1>
<p class="summary">
	PocketMC implements a multi-layered security model protecting local files, network sockets, and
	remote administration sessions.
</p>

<h2 id="dpapi-encryption">DPAPI Credential Encryption</h2>
<p>
	Sensitive secrets—including cloud OAuth refresh tokens for Google Drive, Dropbox, and OneDrive, as
	well as Remote Control user passwords—are never stored in plaintext on disk.
</p>
<p>
	On Windows, secrets are encrypted using the <strong>Windows Data Protection API (DPAPI)</strong> bound
	specifically to the current Windows user SID. A copy of the configuration files transferred to another
	machine cannot be decrypted without the host machine's master key.
</p>

<h2 id="bearer-tokens">Bearer Tokens &amp; Cookies</h2>
<p>
	Client applications communicating with the Remote Control API can authenticate via HTTP-only session
	cookies or cryptographic Bearer tokens.
</p>

<Code
	label="Authorization Header"
	text={`Authorization: Bearer pmc_sec_89f0a2d1e4c74a89b...`}
/>

<h2 id="loopback-isolation">Windows UWP Loopback Isolation</h2>
<p>
	Windows AppContainer network isolation prevents Minecraft Bedrock Edition (a UWP application) from connecting
	to <code class="mono">127.0.0.1</code> or <code class="mono">localhost</code> on the same machine.
</p>
<p>
	PocketMC includes an automated helper executing the native Windows command to exempt the Bedrock package:
</p>

<Code
	label="PowerShell (Executed Automatically by PocketMC)"
	text={`CheckNetIsolation.exe LoopbackExempt -a -p="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`}
/>

<h2 id="rate-limiting">Brute-Force Rate Limiting</h2>
<p>
	The remote authentication endpoint enforces an exponential backoff rate limiter. After 5 failed attempts
	from an IP address, further authentication attempts are temporarily suspended for 15 minutes.
</p>
