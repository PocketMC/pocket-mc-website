<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Glyph from './Glyph.svelte';

	interface FaqItem {
		id: string;
		q: string;
		a: string[];
	}

	const homeFaqs: FaqItem[] = [
		{
			id: 'tunneling',
			q: 'How does PocketMC host servers without router port forwarding?',
			a: [
				'PocketMC embeds Playit.gg and Cloudflare Quick Tunnels directly into its Windows process. When you start your server, PocketMC establishes an encrypted outbound tunnel to global edge routing nodes.',
				'Your friends connect to an assigned public domain (such as custom-server.auto.playit.gg) that relays traffic safely to your local machine port. You never need to log into your home router, configure NAT rules, or expose your private home IP.'
			]
		},
		{
			id: 'java-runtimes',
			q: 'How does automated Java runtime provisioning prevent system conflicts?',
			a: [
				'Different Minecraft editions require distinct Java versions (such as Java 8 for legacy 1.12.2 modpacks, Java 17 for 1.18, and Java 21+ for modern 1.20.5+ builds).',
				'PocketMC downloads and isolates official Eclipse Adoptium OpenJDK runtimes in its application data directory. Each server instance launches with an explicit binary path to its required Java version without modifying your global Windows system PATH.'
			]
		},
		{
			id: 'engines',
			q: 'Which Minecraft server engines and mod loaders are supported?',
			a: [
				'PocketMC supports Java Edition servers including Vanilla, Paper, Fabric, Forge, and NeoForge. For Bedrock Edition, it runs official Bedrock Dedicated Server (BDS) and PocketMine-MP for PHP.',
				'You can switch loaders, update Minecraft versions, and install plugins from Modrinth, CurseForge, or Poggit directly through the built-in interface.'
			]
		},
		{
			id: 'storage-backups',
			q: 'Where are world files stored, and how do cloud backups work?',
			a: [
				'All worlds, plugins, configuration files, and player inventories live directly on your local storage drive in standard Minecraft folder structures. PocketMC never locks your files in proprietary containers.',
				'Automated backup jobs can mirror your instances to Google Drive, OneDrive, or Dropbox. Before copying, PocketMC holds world writes via RCON commands to ensure zero data corruption during backups.'
			]
		},
		{
			id: 'crash-recovery',
			q: 'How does crash recovery protect local servers from downtime?',
			a: [
				'PocketMC includes a built-in process watchdog that tracks process health, RAM limits, and CPU usage. If an unhandled exception or memory crash occurs, the watchdog logs the failure and restarts the server with backoff limits.',
				'PocketMC also inhibits Windows sleep mode while servers are active and verifies port availability before launch to prevent silent startup failures.'
			]
		}
	];
</script>

<section id="faq" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Frequently Asked Questions</span>
			<h2>Common Questions on Local Hosting</h2>
			<p class="lead">
				Key answers on network tunneling, runtime isolation, data ownership, and crash recovery.
			</p>
		</div>

		<div class="faq-list wire" use:reveal>
			{#each homeFaqs as item (item.id)}
				<details class="faq-item" id={item.id}>
					<summary class="faq-question">
						<span class="faq-q-text">{item.q}</span>
						<span class="faq-toggle" aria-hidden="true">
							<Glyph name="plus" size={14} />
						</span>
					</summary>
					<div class="faq-answer">
						{#each item.a as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</details>
			{/each}
		</div>

		<div class="faq-footer">
			<p>
				Have questions about firewall settings, Bedrock addon order, or custom domain setups?
				<a href="/faq" class="more-link">
					Browse all 15+ guides in our Knowledge Base &amp; FAQ
					<Glyph name="arrow-right" size={13} />
				</a>
			</p>
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		background: var(--card);
		border-radius: var(--radius);
		overflow: hidden;
		max-width: 860px;
		margin: 0 auto;
	}

	.faq-item {
		border-bottom: 1px solid var(--line);
		transition: background-color 0.15s ease;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item[open] {
		background: var(--card-hover);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 20px 24px;
		cursor: pointer;
		user-select: none;
		list-style: none;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.faq-q-text {
		font-size: 15.5px;
		font-weight: 600;
		color: var(--fg);
		line-height: 1.45;
	}

	.faq-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		color: var(--dim);
		flex-shrink: 0;
		transition: transform 0.2s ease, color 0.15s ease;
	}

	.faq-item[open] .faq-toggle {
		transform: rotate(45deg);
		color: var(--fg);
	}

	.faq-answer {
		padding: 0 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.faq-answer p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted-fg);
		margin: 0;
	}

	.faq-footer {
		text-align: center;
		margin-top: 32px;
	}

	.faq-footer p {
		font-size: 14px;
		color: var(--muted-fg);
		line-height: 1.6;
		margin: 0;
	}

	.more-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--fg);
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		margin-left: 6px;
		transition: color 0.15s ease;
	}

	.more-link:hover {
		color: var(--highlight);
	}

	@media (max-width: 640px) {
		.faq-question {
			padding: 16px 18px;
		}

		.faq-q-text {
			font-size: 14.5px;
		}

		.faq-answer {
			padding: 0 18px 16px;
		}
	}
</style>
