<script lang="ts">
	import '$lib/prose.css';
</script>

<svelte:head>
	<title>Privacy Policy - Pocket MC Local-First Data Sovereignty & DPAPI (PocketMC)</title>
	<meta
		name="description"
		content="Review the Pocket MC (PocketMC) Privacy Policy. Learn about local-first architecture, Windows DPAPI encryption, zero remote data collection, and local telemetry controls."
	/>
	<meta property="og:title" content="Privacy Policy - Pocket MC Local-First Data Sovereignty" />
	<meta
		property="og:description"
		content="Review the Pocket MC (PocketMC) Privacy Policy. Learn about local-first architecture, Windows DPAPI encryption, zero remote data collection, and local telemetry controls."
	/>
	<meta name="twitter:title" content="Privacy Policy - Pocket MC Local-First Data Sovereignty" />
	<meta
		name="twitter:description"
		content="Review the Pocket MC (PocketMC) Privacy Policy. Learn about local-first architecture, Windows DPAPI encryption, zero remote data collection, and local telemetry controls."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://pocketmc.github.io/'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Privacy Policy',
				item: 'https://pocketmc.github.io/privacy/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Legal</span>
			<h1>Privacy Policy</h1>
			<p class="summary">
				PocketMC operates under a strict local-first architecture. Your Minecraft server instances, worlds,
				credentials, and logs live on your own hardware. This policy describes all verified data flows,
				local encryption mechanisms, third-party integrations, and optional telemetry.
			</p>

			<h2 id="local-storage-and-dpapi">1. Local Storage &amp; Credential Protection</h2>
			<p>
				All Minecraft server files, game worlds, player save data, whitelist/ban files, properties, and runtime
				logs are stored exclusively on your local disk (in your chosen server root directory or
				<code class="mono">%LOCALAPPDATA%\PocketMC</code>).
			</p>
			<p>
				Sensitive credentials (including OAuth refresh tokens for cloud backup providers Google Drive, Dropbox,
				and OneDrive, as well as Remote Control user password hashes) are never stored in plaintext. On Windows, they are
				encrypted using the native <strong>Windows Data Protection API (DPAPI)</strong>
				(<code class="mono">ProtectedData.Protect</code>) scoped to the current user SID. A copy of the
				configuration files transferred to another account or computer cannot be decrypted.
			</p>

			<h2 id="telemetry-data-flows">2. Telemetry &amp; Diagnostics (Opt-in)</h2>
			<p>
				PocketMC includes an optional telemetry service (<code class="mono">TelemetryService</code>) designed
				solely to measure application adoption, active server counts, and crash stability.
			</p>

			<ul>
				<li>
					<strong>Master Control:</strong> Telemetry is controllable via the <code class="mono">EnableTelemetry</code>
					setting in <code class="mono">settings.json</code> and can be toggled on or off at any time in Settings.
				</li>
				<li>
					<strong>Identifiers:</strong> PocketMC generates a random GUID (<code class="mono">TelemetryClientId</code>)
					stored in your local settings, along with a salted SHA-256 hash of your Windows Machine GUID
					(<code class="mono">DeviceIdentifier.GetMachineId</code>) to deduplicate install events without storing hardware serials or personal identities.
				</li>
				<li>
					<strong>Installation &amp; Upgrade Events:</strong> Sent once upon first launch or version update. Contains
					the client ID, salted machine ID hash, application version, upgrade flag, and approximate country.
				</li>
				<li>
					<strong>Periodic Heartbeat:</strong> Sent every 5 minutes while the application is active. Contains the
					client ID, salted machine ID hash, app version, running state, active server count, and engine types (e.g. Vanilla, Paper, Fabric).
				</li>
				<li>
					<strong>Server Action Counters:</strong> Reports high-level operational counts (such as server creation or start events) without instance names, paths, or file contents.
				</li>
				<li>
					<strong>Approximate Country Lookup:</strong> To understand regional distribution, PocketMC makes a single request to <code class="mono">ip-api.com</code> or <code class="mono">ipapi.co</code>. Only the returned country name string is cached and reported. IP addresses are not stored in PocketMC telemetry databases.
				</li>
				<li>
					<strong>Destination Infrastructure:</strong> Telemetry payloads are transmitted over encrypted HTTPS to PocketMC backend services hosted on Render (<code class="mono">pocket-mc-proxy.onrender.com</code>).
				</li>
			</ul>

			<h2 id="ai-diagnostics">3. Application Logs &amp; AI Analysis</h2>
			<p>
				Server terminal logs and crash stack traces remain 100% on your local disk. They are never automatically
				uploaded to any remote server.
			</p>
			<p>
				If you explicitly choose to run an <strong>AI Log Summary</strong> or <strong>Crash Post-Mortem Analysis</strong>:
			</p>
			<ul>
				<li>
					<strong>Local Inference (Ollama):</strong> When using a local Ollama model (<code class="mono">http://localhost:11434</code>), all analysis runs on your local CPU/GPU. Zero log data leaves your machine.
				</li>
				<li>
					<strong>Cloud Providers:</strong> When using cloud providers (Google Gemini, OpenAI, Anthropic Claude, Mistral, or Groq), PocketMC's <code class="mono">LogSanitizer</code> automatically scrubs player IP addresses, player email addresses, local Windows user profile paths (e.g. <code class="mono">C:\Users\username\...</code>), and private tokens before sending the excerpt to the provider using your configured API key.
				</li>
			</ul>

			<h2 id="third-party-integrations">4. Third-Party Services &amp; Connectivity</h2>
			<p>
				PocketMC integrates with external services to provide optional networking, downloads, and backups:
			</p>
			<ul>
				<li>
					<strong>Playit.gg:</strong> When game tunneling is enabled, PocketMC launches the official Playit.gg agent. Gameplay network packets flow through Playit.gg's edge routing infrastructure to allow players to join without port forwarding.
				</li>
				<li>
					<strong>Cloudflare Quick Tunnels:</strong> When Remote Control internet tunneling is active, PocketMC runs <code class="mono">cloudflared</code> to generate a temporary HTTPS ingress address. Traffic is encrypted in transit between your browser and local host daemon.
				</li>
				<li>
					<strong>Download Providers:</strong> Server JARs, vanilla assets, and Adoptium JREs are retrieved directly from official distribution CDNs (Adoptium, Mojang, PaperMC, Fabric, Forge, NeoForge, and PocketMine).
				</li>
				<li>
					<strong>Marketplaces (Modrinth &amp; CurseForge):</strong> Search queries and addon package downloads communicate directly with the Modrinth and CurseForge public APIs.
				</li>
				<li>
					<strong>Cloud Backup Providers (Google Drive, Dropbox, OneDrive):</strong> Backup archives are uploaded directly to your authenticated cloud storage account. OAuth token exchange for Google Drive is brokered through <code class="mono">pocket-mc-proxy</code> to protect application client credentials; Dropbox and OneDrive use direct PKCE.
				</li>
				<li>
					<strong>Discord Rich Presence:</strong> Communicates exclusively with the local Discord desktop application via the local IPC pipe to display status on your profile. No Discord server communication occurs from PocketMC.
				</li>
			</ul>

			<h2 id="user-controls">5. Data Deletion &amp; Retention</h2>
			<p>
				Because PocketMC is a local desktop application, you retain complete authority over your data:
			</p>
			<ul>
				<li>Deleting an instance folder or backup archive permanently removes the files from your storage.</li>
				<li>Uninstalling PocketMC and removing <code class="mono">%LOCALAPPDATA%\PocketMC</code> completely erases all local settings, cached runtimes, credentials, and logs.</li>
				<li>You can toggle telemetry off at any time in Settings, which permanently disables all background reporting loops.</li>
			</ul>
		</article>
	</div>
</section>

<style>
	.doc-container {
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.prose {
		max-width: 720px;
		margin: 0 auto;
	}

	@media (max-width: 900px) {
		.doc-container {
			padding-top: 32px;
			padding-bottom: 64px;
		}
	}
</style>
