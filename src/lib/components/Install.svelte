<script lang="ts">
	import { installOptions } from '$lib/data/platforms';
	import { reveal } from '$lib/reveal';
	import CopyButton from './CopyButton.svelte';
</script>

<section id="steps" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Install</span>
			<h2>Get PocketMC</h2>
			<p class="lead">
				Choose how you want to install PocketMC on Windows 10 and 11.
			</p>
		</div>

		<div class="wire grid" use:reveal={{ stagger: true }}>
			{#each installOptions as opt (opt.id)}
				<article class="card {opt.id}">
					<div class="card-head">
						<div class="icon-wrap">
							{#if opt.id === 'installer'}
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="7 10 12 15 17 10" />
									<line x1="12" y1="15" x2="12" y2="3" />
								</svg>
							{:else if opt.id === 'winget'}
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<polyline points="4 17 10 11 4 5" />
									<line x1="12" y1="19" x2="20" y2="19" />
								</svg>
							{:else}
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<polyline points="21 8 21 21 3 21 3 8" />
									<rect x="1" y="3" width="22" height="5" />
									<line x1="10" y1="12" x2="14" y2="12" />
								</svg>
							{/if}
						</div>
						<span class="badge mono {opt.id === 'installer' ? 'highlight' : ''}">{opt.badge}</span>
					</div>

					<div class="card-body">
						<h3>{opt.title}</h3>
						<p class="desc">{opt.description}</p>
					</div>

					<div class="card-action">
						{#if opt.actionType === 'download'}
							<a
								class="action-btn {opt.id === 'installer' ? 'btn-primary' : 'btn-secondary'}"
								href={opt.actionTarget}
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									width="15"
									height="15"
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
								<span>{opt.actionText}</span>
							</a>
						{:else}
							<div class="cmd-box">
								<div class="cmd-inner">
									<span class="prompt mono" aria-hidden="true">&gt;</span>
									<code class="cmd-text mono">{opt.actionTarget}</code>
								</div>
								<CopyButton text={opt.actionTarget} />
							</div>
						{/if}
					</div>

					<div class="card-footer">
						<span class="meta">{opt.meta}</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.lead {
		max-width: 680px;
		text-wrap: balance;
	}

	.grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-radius: var(--radius-lg);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 26px 22px;
		background: var(--bg);
		transition: background-color 0.18s ease;
	}

	.card:hover {
		background: var(--card);
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.badge {
		font-size: 11px;
		padding: 3px 9px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--secondary);
		color: var(--dim);
		letter-spacing: 0.04em;
	}

	.badge.highlight {
		color: var(--fg);
		border-color: var(--border-hover, #404040);
		background: var(--secondary-hover);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		color: var(--fg);
	}

	.desc {
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--muted-fg);
	}

	.card-action {
		margin-top: auto;
		padding-top: 4px;
	}

	.action-btn {
		width: 100%;
		height: 42px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0 16px;
		border-radius: var(--radius);
		font-size: 13.5px;
		font-weight: 500;
		text-decoration: none;
		transition:
			background-color 0.18s ease,
			border-color 0.18s ease,
			color 0.18s ease,
			transform 0.12s ease;
	}

	.action-btn:hover {
		transform: translateY(-1px);
	}

	.action-btn:active {
		transform: translateY(0);
	}

	.action-btn.btn-primary {
		background: var(--primary);
		color: var(--primary-fg);
		font-weight: 600;
	}

	.action-btn.btn-primary:hover {
		background: var(--primary-hover);
	}

	.action-btn.btn-secondary {
		border: 1px solid var(--border);
		background: var(--secondary);
		color: var(--fg);
	}

	.action-btn.btn-secondary:hover {
		border-color: var(--dim);
		background: var(--secondary-hover);
	}

	.cmd-box {
		width: 100%;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 0 6px 0 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
		transition: border-color 0.18s ease;
	}

	.cmd-box:hover {
		border-color: var(--dim);
	}

	.cmd-inner {
		display: flex;
		align-items: center;
		gap: 8px;
		overflow: hidden;
		min-width: 0;
	}

	.prompt {
		font-size: 12px;
		color: var(--dim);
		user-select: none;
		flex-shrink: 0;
	}

	.cmd-text {
		font-size: 12.5px;
		color: var(--fg);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-footer {
		display: flex;
		align-items: center;
		padding-top: 2px;
	}

	.meta {
		font-size: 12px;
		color: var(--dim);
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
