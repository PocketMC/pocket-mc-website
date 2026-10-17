<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { detectPlatform, platforms } from '$lib/data/platforms';
	import { reveal } from '$lib/reveal';
	import CopyButton from './CopyButton.svelte';
	import Mark from './Mark.svelte';

	let activeId = $state('windows');
	const current = $derived(platforms.find((p) => p.id === activeId) ?? platforms[0]);

	let list = $state<HTMLElement | null>(null);
	let height = $state(0);

	onMount(async () => {
		activeId = detectPlatform();
		await tick();
	});
</script>

<section id="steps" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Install</span>
			<h2>Step by step</h2>
			<p class="lead">
				Deploy PocketMC in seconds on your platform of choice. Zero administrative elevation required.
			</p>
		</div>

		<div class="wire panel" use:reveal>
			<div class="rail">
				<nav class="list" aria-label="Platforms" bind:this={list}>
					{#each platforms as entry (entry.id)}
						<button
							type="button"
							class="row"
							class:on={activeId === entry.id}
							aria-pressed={activeId === entry.id}
							onclick={() => (activeId = entry.id)}
						>
							<Mark name={entry.mark} size={15} />
							<span class="label">{entry.label}</span>
							<span class="mono hint">{entry.id === 'windows' ? 'exe' : 'sh'}</span>
						</button>
					{/each}
				</nav>
			</div>

			<div class="steps">
				<div class="clip">
					<div class="stack" bind:clientHeight={height}>
						{#key activeId}
							<div class="swap">
								{#each current.steps as step, index (step.caption)}
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

								<p class="note">{current.note}</p>
							</div>
						{/key}
					</div>
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
		grid-template-columns: 220px minmax(0, 1fr);
	}

	.rail {
		position: relative;
		border-right: 1px solid var(--line);
		background: var(--bg);
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 48px;
		padding: 0 16px;
		border-bottom: 1px solid var(--line);
		color: var(--muted-fg);
		text-align: left;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.row:last-child {
		border-bottom: none;
	}

	.row:hover {
		background: var(--secondary);
		color: var(--fg);
	}

	.row.on {
		background: var(--secondary);
		color: var(--fg);
		font-weight: 500;
	}

	.label {
		flex: 1;
		font-size: 14px;
	}

	.hint {
		font-size: 11px;
		color: var(--dim);
	}

	.steps {
		padding: 24px;
		background: var(--bg);
	}

	.swap {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.step {
		display: flex;
		align-items: flex-start;
		gap: 16px;
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
		margin-top: 12px;
		padding: 12px 14px;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--secondary);
		font-size: 13px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.panel {
			grid-template-columns: minmax(0, 1fr);
		}

		.rail {
			border-right: none;
			border-bottom: 1px solid var(--line);
		}

		.list {
			flex-direction: row;
			overflow-x: auto;
		}

		.row {
			border-bottom: none;
			border-right: 1px solid var(--line);
			white-space: nowrap;
		}

		.row:last-child {
			border-right: none;
		}

		.steps {
			padding: 16px;
		}
	}
</style>
