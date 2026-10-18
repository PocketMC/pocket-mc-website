<script lang="ts">
	import { repo } from '$lib/data/links';
	import { reveal } from '$lib/reveal';
	import Mark from './Mark.svelte';
</script>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="wire box" use:reveal>
			<div class="inner">
				<span class="kicker">Get Started</span>
				<h2>Run your server on your own terms</h2>
				<p class="lead">
					Free, local, private, and always under your control.
				</p>
				<div class="actions">
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
						View on GitHub
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.page {
		padding-top: 56px;
		padding-bottom: 72px;
	}

	.box {
		width: 100%;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow);
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: clamp(48px, 6vw, 72px) 24px;
		background: var(--card);
		gap: 14px;
	}

	h2 {
		font-size: clamp(26px, 4vw, 36px);
		max-width: 600px;
	}

	.lead {
		max-width: 520px;
		margin: 0;
	}

	.actions {
		display: flex;
		gap: 12px;
		margin-top: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (max-width: 900px) {
		.page {
			padding-top: 40px;
			padding-bottom: 48px;
		}

		.actions {
			flex-direction: column;
			width: 100%;
		}
	}
</style>
