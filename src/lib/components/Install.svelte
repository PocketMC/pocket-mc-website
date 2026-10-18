<script lang="ts">
	import { installSteps, installNote } from '$lib/data/platforms';
	import { reveal } from '$lib/reveal';
	import CopyButton from './CopyButton.svelte';
</script>

<section id="steps" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Install</span>
			<h2>Step by step</h2>
			<p class="lead">
				Deploy PocketMC in seconds with zero administrative elevation required.
			</p>
		</div>

		<div class="wire panel" use:reveal>
			<div class="steps">
				<div class="stack">
					{#each installSteps as step, index (step.caption)}
						<div class="step">
							<span class="mono index">{String(index + 1).padStart(2, '0')}</span>
							<div class="body">
								<p class="caption">{step.caption}</p>
								{#if step.link}
									<a class="code link" href={step.link} target="_blank" rel="noopener noreferrer">
										<span class="mono text">{step.command}</span>
										<svg
											width="14"
											height="14"
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
									</a>
								{:else}
									<div class="code">
										<pre class="mono text">{step.command}</pre>
										<CopyButton text={step.command} />
									</div>
								{/if}
								{#if step.hint}
									<p class="hint-text">{step.hint}</p>
								{/if}
							</div>
						</div>
					{/each}

					<p class="note">{installNote}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.panel {
		max-width: 840px;
		margin: 0 auto;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.steps {
		padding: 32px;
		background: var(--bg);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.step {
		display: flex;
		align-items: flex-start;
		gap: 18px;
	}

	.index {
		padding-top: 2px;
		font-size: 13px;
		color: var(--dim);
	}

	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.caption {
		font-size: 14px;
		font-weight: 500;
		color: var(--fg);
	}

	.code {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 14px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
	}

	.code.link {
		color: var(--fg);
		text-decoration: none;
		transition: border-color 0.15s ease, background-color 0.15s ease;
	}

	.code.link:hover {
		border-color: var(--fg);
		background: var(--secondary);
	}

	pre.text,
	span.text {
		margin: 0;
		font-family: var(--mono);
		font-size: 13px;
		overflow-x: auto;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.hint-text {
		font-size: 12.5px;
		color: var(--dim);
		line-height: 1.5;
	}

	.note {
		margin-top: 8px;
		padding: 12px 16px;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--secondary);
		font-size: 13px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	@media (max-width: 768px) {
		.page {
			padding-bottom: 48px;
		}

		.steps {
			padding: 20px 16px;
		}

		.step {
			gap: 12px;
		}
	}
</style>
