<script lang="ts">
	import Install from '$lib/components/Install.svelte';
	import Glyph from '$lib/components/Glyph.svelte';
	import '$lib/prose.css';

	let { data } = $props();
</script>

<svelte:head>
	<title>Download PocketMC · Free Local Minecraft Server Hosting Software</title>
	<meta
		name="description"
		content="Download PocketMC for Windows 10 and 11. The premier free, open-source local Minecraft server hosting software with zero port forwarding, Adoptium Java, and cloud backups."
	/>
	<meta
		name="keywords"
		content="download pocketmc, local minecraft server hosting software, free minecraft server host windows, minecraft server manager download, pocketmc winget"
	/>
	<meta property="og:title" content="Download PocketMC · Free Local Minecraft Server Hosting Software" />
	<meta
		property="og:description"
		content="Download PocketMC for Windows 10 and 11. Choose between the official Windows installer (.exe), Microsoft Winget terminal command, or standalone portable ZIP."
	/>
	<meta name="twitter:title" content="Download PocketMC · Free Local Minecraft Server Hosting Software" />
	<meta
		name="twitter:description"
		content="Download PocketMC for Windows 10 and 11. Choose between the official Windows installer (.exe), Microsoft Winget terminal command, or standalone portable ZIP."
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
				name: 'Download',
				item: 'https://pocketmc.github.io/download/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section dl-header">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="head">
			<span class="kicker">Get Started</span>
			<h1>Download Pocket MC</h1>
			<p class="lead">
				High-performance, local-first Minecraft server management for Windows 10 and 11.
				100% free and open-source under the MIT license.
			</p>
		</div>
	</div>
</section>

<Install />

<section class="section reqs-section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<h2 id="system-requirements">System Requirements</h2>
			<div class="reqs-grid">
				<div class="req-card">
					<div class="req-title">
						<Glyph name="cpu" size={16} />
						<h3>Operating System</h3>
					</div>
					<p>Windows 10 (version 1809 or higher) or Windows 11 (64-bit x64 architecture). ARM64 supported via x64 emulation.</p>
				</div>

				<div class="req-card">
					<div class="req-title">
						<Glyph name="hard-drive" size={16} />
						<h3>Memory & Storage</h3>
					</div>
					<p>4 GB RAM minimum (8 GB+ recommended for modded servers). 500 MB disk space for Pocket MC; additional space for server jars and worlds.</p>
				</div>

				<div class="req-card">
					<div class="req-title">
						<Glyph name="package" size={16} />
						<h3>Java & Runtimes</h3>
					</div>
					<p>No pre-installed Java needed. Pocket MC automatically provisions isolated Eclipse Adoptium OpenJDK (Java 8, 17, 21, 25) without modifying system PATH.</p>
				</div>

				<div class="req-card">
					<div class="req-title">
						<Glyph name="globe" size={16} />
						<h3>Network Connectivity</h3>
					</div>
					<p>Standard internet connection for downloading server software. Zero router port forwarding required when using embedded Playit.gg tunnels.</p>
				</div>
			</div>

			<h2 id="installation-faq">Installation FAQ</h2>
			<div class="install-faq">
				<div class="faq-row">
					<h3>Does Pocket MC require administrator privileges?</h3>
					<p>No. Pocket MC installs strictly in user-space (<code>%LOCALAPPDATA%</code>) and runs without UAC elevation or administrator rights.</p>
				</div>
				<div class="faq-row">
					<h3>How do updates work?</h3>
					<p>The Setup Installer automatically checks for new releases on startup and applies verified GitHub releases in-place. If you use Microsoft Winget, run <code>winget upgrade PocketMC</code>.</p>
				</div>
				<div class="faq-row">
					<h3>Where are server files stored?</h3>
					<p>All server instances, worlds, plugins, and configuration files live on your local drive in your configured servers directory. You maintain 100% data sovereignty.</p>
				</div>
			</div>
		</article>
	</div>
</section>

<style>
	.dl-header {
		padding-top: 48px;
		padding-bottom: 0;
	}

	.head {
		text-align: center;
		max-width: 680px;
		margin: 0 auto;
	}

	.kicker {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--dim);
		margin-bottom: 8px;
		display: inline-block;
	}

	h1 {
		font-size: clamp(32px, 5vw, 44px);
		font-weight: 700;
		color: var(--fg);
		margin-bottom: 12px;
		letter-spacing: -0.02em;
	}

	.lead {
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.reqs-section {
		padding-bottom: 72px;
	}

	.reqs-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		margin-top: 20px;
		margin-bottom: 36px;
	}

	.req-card {
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.req-title {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--fg);
	}

	.req-title h3 {
		font-size: 15px;
		font-weight: 600;
		margin: 0;
		color: var(--fg);
	}

	.req-card p {
		font-size: 13.5px;
		color: var(--muted-fg);
		line-height: 1.55;
		margin: 0;
	}

	.install-faq {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-top: 16px;
	}

	.faq-row h3 {
		font-size: 15px;
		font-weight: 600;
		color: var(--fg);
		margin-bottom: 6px;
	}

	.faq-row p {
		font-size: 14px;
		color: var(--muted-fg);
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.reqs-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
