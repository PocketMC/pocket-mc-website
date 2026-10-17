<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Glyph from './Glyph.svelte';

	const pillars = [
		{
			glyph: 'shield',
			title: 'Crash Loop Protection',
			desc: 'Monitors server instance processes with automated backoff logic and a 3-loop crash limit to protect your CPU from runaway execution cycles.'
		},
		{
			glyph: 'hard-drive',
			title: 'RCON Save-Flush Safeguard',
			desc: 'Executes a clean save-off and save-all sequence before creating backups, guaranteeing zero chunk write corruption or lost player inventory.'
		},
		{
			glyph: 'cpu',
			title: 'Windows Sleep Inhibitor',
			desc: 'Seamlessly hooks into Windows power management to prevent your computer from sleeping while servers are active, resuming normal sleep upon shutdown.'
		},
		{
			glyph: 'sliders',
			title: '80% System RAM Safety Guard',
			desc: 'Validates requested server memory allocations against real-time system memory headroom to prevent Windows out-of-memory lockups and freezing.'
		},
		{
			glyph: 'cloud',
			title: 'SHA-256 Cloud Checksums',
			desc: 'Validates archive hashes during OAuth uploads to Google Drive, Dropbox, and OneDrive to ensure backups can always be restored with complete fidelity.'
		},
		{
			glyph: 'zap',
			title: 'Isolated Desktop User-Space',
			desc: 'Operates 100% inside your standard user profile. No administrative elevation, no driver installations, and zero pollution of your system PATH.'
		}
	];
</script>

<section id="stability" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Engineering</span>
			<h2>Production Stability</h2>
			<p class="lead">
				Built with native desktop resilience to protect your worlds, your hardware, and your player
				community around the clock.
			</p>
		</div>

		<div class="wire grid" use:reveal={{ stagger: true }}>
			{#each pillars as p (p.title)}
				<article class="card">
					<div class="icon-wrap">
						<Glyph name={p.glyph} size={18} />
					</div>
					<h3>{p.title}</h3>
					<p>{p.desc}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 26px 24px;
		background: var(--bg);
	}

	.icon-wrap {
		width: 36px;
		height: 36px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: var(--secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--fg);
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
	}

	p {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
