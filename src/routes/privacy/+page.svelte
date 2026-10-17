<script lang="ts">
	import '$lib/prose.css';
</script>

<svelte:head>
	<title>Privacy & Security Policy · PocketMC</title>
	<meta
		name="description"
		content="PocketMC operates under a strict local-first philosophy. Your server files, worlds, credentials, and settings live on your own hardware."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Legal</span>
			<h1>Privacy &amp; Security Policy</h1>
			<p class="summary">
				PocketMC operates under a strict local-first architecture. Your server files, worlds, credentials,
				and configurations live exclusively on your personal hardware, never on remote commercial servers.
			</p>

			<h2 id="storage-and-encryption">Storage &amp; Local Encryption</h2>
			<p>
				All Minecraft world saves, player inventories, configuration files, terminal logs, and server databases
				are stored locally on the disk folder you designate. No cloud synchronization or off-site transmission
				occurs unless you explicitly authenticate and authorize a third-party cloud provider.
			</p>
			<p>
				On Windows, third-party credentials—including OAuth tokens for Google Drive, Dropbox, and OneDrive,
				as well as remote dashboard administrative passwords—are encrypted via the <strong>Windows Data Protection API (DPAPI)</strong>.
				These secrets are tied cryptographically to your Windows user account security identifier (SID) and cannot
				be read by other user accounts on the machine.
			</p>

			<h2 id="network-and-tunneling">Network Traffic &amp; Tunneling</h2>
			<p>
				When you enable the integrated <strong>Playit.gg</strong> agent, server game packets are encrypted
				and routed through Playit.gg's global edge infrastructure to allow friends to connect without port forwarding.
				PocketMC does not inspect, store, or log player network traffic.
			</p>

			<h2 id="ai-diagnostics-privacy">AI Diagnostics &amp; Log Sanitization</h2>
			<p>
				PocketMC's optional AI Log Summary feature translates complex server logs and crash traces into
				plain-English reports.
			</p>
			<ul>
				<li>
					<strong>Local Inference with Ollama:</strong> If you use local Ollama models, all processing takes place
					100% on your machine with zero data leaving your hardware.
				</li>
				<li>
					<strong>Cloud Providers:</strong> If you choose Google Gemini, OpenAI, Anthropic Claude, or Mistral,
					PocketMC pre-processes and scrubs the log before transmission—automatically stripping player IP addresses,
					email addresses, and sensitive tokens.
				</li>
			</ul>

			<h2 id="telemetry">Telemetry &amp; Crash Reports</h2>
			<p>
				PocketMC does not sell, license, or monetize user data. Any optional, anonymous diagnostic signals
				(such as application startup confirmation or error exceptions) are strictly non-identifiable and
				can be toggled off at any time in Settings.
			</p>
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
