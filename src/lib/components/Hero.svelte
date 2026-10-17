<script lang="ts">
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import Visualizer from './Visualizer.svelte';

	let { version = 'v1.9.10' }: { version?: string | null } = $props();
</script>

<section id="top" class="hero">
	<div class="page">
		<div class="mark" data-enter>
			<Logo size={72} />
		</div>

		<h1 data-enter style="--enter: 0.05s">PocketMC</h1>

		<p class="tagline" data-enter style="--enter: 0.09s">
			The local-first Minecraft server manager. Zero router setup, automated Adoptium Java
			provisioning, and seamless cloud backups.
		</p>

		<div class="cta" data-enter style="--enter: 0.14s">
			<a class="btn btn-primary" href="#steps">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M12 3v13" />
					<path d="M7 12l5 5 5-5" />
					<path d="M4 21h16" />
				</svg>
				Install PocketMC
			</a>
			<a class="btn btn-secondary" href={repo} target="_blank" rel="noopener noreferrer">
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<p class="fine" data-enter style="--enter: 0.19s">
			{#if version}
				<a class="mono" href="/changelog">{version}</a>
				<span class="dot">·</span>
			{/if}
			Free and open source
			<span class="dot">·</span>
			Windows, Linux, macOS
			<span class="dot">·</span>
			GPL-3.0
		</p>
	</div>

	<div class="band" data-enter style="--enter: 0.26s">
		<Visualizer />
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		scroll-margin-top: var(--header);
		min-height: calc(100vh - var(--header) - var(--fold-peek));
		min-height: calc(100svh - var(--header) - var(--fold-peek));
		background: radial-gradient(ellipse 70% 50% at 50% 12%, var(--glow-subtle), transparent 70%);
	}

	.hero .page {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: clamp(64px, 9vh, 110px);
		padding-bottom: 40px;
	}

	.mark {
		display: flex;
		border-radius: 20px;
		box-shadow: 0 0 50px -10px rgba(34, 197, 94, 0.45), var(--shadow);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.mark:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 65px -8px rgba(34, 197, 94, 0.6), var(--shadow);
	}

	h1 {
		margin-top: 24px;
		font-size: clamp(48px, 7vw, 84px);
		line-height: 1;
		letter-spacing: -0.045em;
		font-weight: 600;
	}

	.tagline {
		margin-top: 18px;
		max-width: 580px;
		font-size: clamp(15.5px, 2vw, 18px);
		line-height: 1.55;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	.cta {
		display: flex;
		justify-content: center;
		gap: 12px;
		margin-top: 36px;
	}

	.fine {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 24px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	.fine .mono {
		color: var(--muted-fg);
	}

	.fine a.mono:hover {
		color: var(--fg);
	}

	.dot {
		color: var(--faint);
	}

	.band {
		padding: 0 var(--gutter);
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 0;
		}

		.hero .page {
			padding-top: 52px;
			padding-bottom: 28px;
		}

		.tagline {
			font-size: 15px;
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
			margin-top: 28px;
		}
	}
</style>
