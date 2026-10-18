<script lang="ts">
	import { toolComparisons, type CompetitorComparison } from '$lib/data/comparison';
	import { reveal } from '$lib/reveal';

	let dialog = $state<HTMLDialogElement | null>(null);
	let selectedTool = $state<CompetitorComparison | null>(null);

	function openProof(item: CompetitorComparison) {
		selectedTool = item;
		dialog?.showModal();
	}

	function closeProof() {
		dialog?.close();
	}
</script>

<section id="comparison" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Comparison</span>
			<h2>How PocketMC Compares</h2>
			<p class="lead">
				From lightweight desktop launchers to distributed Linux web panels, see how PocketMC stacks up
				against alternative hosting tools. Click the <span class="lead-icon-hint">ⓘ</span> icon beside any tool to inspect verified documentation and official sources.
			</p>
		</div>

		<div class="wire table-wrap" use:reveal>
			<div class="scroll-table">
				<table>
					<thead>
						<tr>
							<th class="th-tool">Tool</th>
							<th class="th-category">Category</th>
							<th class="th-strength">Core Strength</th>
							<th class="th-wins">Where PocketMC Wins</th>
						</tr>
					</thead>
					<tbody>
						{#each toolComparisons as item (item.tool)}
							<tr class:highlight-row={item.isPocketMC}>
								<td class="cell-tool">
									<div class="tool-head">
										<span class="tool-name" class:highlight-name={item.isPocketMC}>{item.tool}</span>
										{#if item.proof}
											<button
												type="button"
												class="info-btn"
												aria-label="View verified comparison sources for {item.tool}"
												title="View verified sources & proof"
												onclick={() => openProof(item)}
											>
												<svg
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													aria-hidden="true"
												>
													<circle cx="12" cy="12" r="10" />
													<line x1="12" y1="16" x2="12" y2="12" />
													<line x1="12" y1="8" x2="12.01" y2="8" />
												</svg>
											</button>
										{/if}
									</div>
								</td>
								<td class="cell-category">
									<span class="category-pill">{item.category}</span>
								</td>
								<td class="cell-strength">
									{item.coreStrength}
								</td>
								<td class="cell-wins" class:highlight-wins={item.isPocketMC}>
									{item.pocketmcWins}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<dialog
		bind:this={dialog}
		class="proof-dialog"
		aria-labelledby="proof-title"
		onclick={(event) => {
			if (event.target === dialog) closeProof();
		}}
		onclose={() => {
			selectedTool = null;
		}}
	>
		{#if selectedTool && selectedTool.proof}
			<div class="proof-panel">
				<div class="proof-header">
					<div class="proof-header-left">
						<div class="proof-title-row">
							<h3 id="proof-title" class="proof-title">{selectedTool.tool}</h3>
							<span class="category-pill">{selectedTool.category}</span>
						</div>
						<p class="proof-subtitle">Verified Comparison & Official Sources</p>
					</div>
					<button type="button" class="close-btn" onclick={closeProof} aria-label="Close dialog">
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
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<div class="proof-body">
					<div class="proof-block">
						<span class="proof-label">Comparison Summary</span>
						<p class="proof-claim">{selectedTool.proof.claim}</p>
					</div>

					<div class="proof-block">
						<span class="proof-label">Official Sources & Documentation</span>
						<div class="sources-grid">
							{#each selectedTool.proof.officialLinks as link (link.url)}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="source-link"
								>
									<div class="source-content">
										<span class="source-name">{link.label}</span>
										<span class="source-url">{link.url.replace(/^https?:\/\//, '')}</span>
									</div>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="source-ext-icon"
										aria-hidden="true"
									>
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										<polyline points="15 3 21 3 21 9" />
										<line x1="10" y1="14" x2="21" y2="3" />
									</svg>
								</a>
							{/each}
						</div>
					</div>

					<div class="proof-block">
						<span class="proof-label">Documented Facts & Evidence</span>
						<ul class="evidence-list">
							{#each selectedTool.proof.evidence as point, i (i)}
								<li class="evidence-item">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="evidence-icon"
										aria-hidden="true"
									>
										<polyline points="20 6 9 17 4 12" />
									</svg>
									<span>{point}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div class="proof-footer-note">
						All technical citations are sourced directly from publicly accessible official documentation,
						terms, and repositories to ensure objective, verifiable evaluation.
					</div>
				</div>
			</div>
		{/if}
	</dialog>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.table-wrap {
		width: 100%;
		overflow: hidden;
	}

	.scroll-table {
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
		text-align: left;
	}

	th,
	td {
		padding: 16px 20px;
		border-bottom: 1px solid var(--line);
		border-right: 1px solid var(--line);
		background: var(--bg);
		vertical-align: top;
	}

	th:last-child,
	td:last-child {
		border-right: none;
	}

	tr:last-child td {
		border-bottom: none;
	}

	thead th {
		background: var(--secondary);
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--dim);
		white-space: nowrap;
	}

	.th-tool {
		width: 200px;
		min-width: 190px;
	}

	.th-category {
		width: 180px;
		min-width: 170px;
	}

	.th-strength {
		width: 28%;
		min-width: 260px;
	}

	.th-wins {
		min-width: 320px;
	}

	.tool-head {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tool-name {
		font-weight: 600;
		font-size: 14px;
		color: var(--fg);
	}

	.highlight-name {
		color: #ffffff;
		font-size: 15px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.category-pill {
		display: inline-block;
		padding: 3px 9px;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--secondary);
		font-size: 11.5px;
		font-weight: 500;
		color: var(--chip-fg);
		line-height: 1.4;
	}

	.cell-strength {
		color: var(--muted-fg);
		line-height: 1.55;
	}

	.cell-wins {
		color: var(--muted-fg);
		line-height: 1.55;
	}

	.highlight-row {
		background-color: rgba(255, 255, 255, 0.015);
		background-image: linear-gradient(
			115deg,
			transparent 0%,
			transparent 38%,
			rgba(34, 197, 94, 0.15) 45%,
			rgba(255, 255, 255, 0.28) 50%,
			rgba(34, 197, 94, 0.15) 55%,
			transparent 62%,
			transparent 100%
		);
		background-size: 300% 100%;
		animation: seamless-shine 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		border-top: 1px solid rgba(34, 197, 94, 0.3);
		border-bottom: 1px solid rgba(34, 197, 94, 0.3);
	}

	.highlight-row td {
		background: transparent;
		border-right: 1px solid rgba(255, 255, 255, 0.04);
	}

	.highlight-row td:first-child {
		border-left: 2px solid #22c55e;
	}

	.highlight-row td:last-child {
		border-right: none;
	}

	@keyframes seamless-shine {
		0% {
			background-position: 100% 0;
		}
		50% {
			background-position: 0% 0;
		}
		100% {
			background-position: 0% 0;
		}
	}

	.highlight-wins {
		color: #f1f5f9;
		font-weight: 450;
	}

	.lead-icon-hint {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--secondary);
		color: var(--fg);
		font-size: 11px;
		vertical-align: middle;
		margin: 0 2px;
	}

	.info-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		padding: 0;
		border-radius: 50%;
		background: var(--secondary);
		border: 1px solid var(--border);
		color: var(--dim);
		cursor: pointer;
		transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
		flex-shrink: 0;
	}

	.info-btn:hover {
		color: var(--fg);
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	.info-btn:focus-visible {
		outline: 2px solid var(--fg);
		outline-offset: 2px;
	}

	/* Dialog Modal */
	dialog.proof-dialog {
		width: min(620px, calc(100vw - 32px));
		max-height: min(760px, calc(100vh - 60px));
		margin: auto;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		color: var(--fg);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	dialog.proof-dialog[open] {
		display: flex;
		flex-direction: column;
	}

	dialog.proof-dialog::backdrop {
		background: rgb(0 0 0 / 0.65);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.proof-panel {
		display: flex;
		flex-direction: column;
		min-height: 0;
		height: 100%;
		overflow: hidden;
	}

	.proof-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 22px;
		border-bottom: 1px solid var(--line);
		background: var(--card);
		flex-shrink: 0;
	}

	.proof-header-left {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.proof-title-row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.proof-title {
		font-size: 17px;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin: 0;
	}

	.proof-subtitle {
		margin: 0;
		font-size: 12.5px;
		color: var(--dim);
	}

	.close-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: var(--secondary);
		color: var(--dim);
		cursor: pointer;
		transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
		flex-shrink: 0;
	}

	.close-btn:hover {
		background: var(--secondary-hover);
		color: var(--fg);
		border-color: var(--dim);
	}

	.proof-body {
		padding: 18px 22px 22px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
		font-size: 13.5px;
		line-height: 1.55;
		min-height: 0;
		flex: 1 1 auto;
		overscroll-behavior: contain;
	}

	.proof-body::-webkit-scrollbar {
		width: 6px;
	}

	.proof-body::-webkit-scrollbar-track {
		background: transparent;
	}

	.proof-body::-webkit-scrollbar-thumb {
		background: var(--border);
		border-radius: 999px;
	}

	.proof-body::-webkit-scrollbar-thumb:hover {
		background: var(--dim);
	}

	.proof-block {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.proof-label {
		font-size: 10.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dim);
	}

	.proof-claim {
		margin: 0;
		color: var(--fg);
		background: var(--secondary);
		padding: 10px 13px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		font-size: 13px;
		line-height: 1.5;
	}

	.sources-grid {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.source-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 9px 13px;
		background: var(--secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: inherit;
		transition: background-color 0.15s ease, border-color 0.15s ease;
	}

	.source-link:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	.source-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		overflow: hidden;
		min-width: 0;
	}

	.source-name {
		font-weight: 500;
		font-size: 13px;
		color: var(--fg);
	}

	.source-url {
		font-size: 11.5px;
		color: var(--dim);
		font-family: var(--mono);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source-ext-icon {
		color: var(--dim);
		flex-shrink: 0;
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.source-link:hover .source-ext-icon {
		color: var(--fg);
		transform: translate(1px, -1px);
	}

	.evidence-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.evidence-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		color: var(--muted-fg);
		font-size: 13px;
		line-height: 1.5;
	}

	.evidence-icon {
		color: #22c55e;
		flex-shrink: 0;
		margin-top: 3px;
	}

	.proof-footer-note {
		padding-top: 12px;
		border-top: 1px solid var(--line);
		font-size: 11.5px;
		color: var(--dim);
		line-height: 1.5;
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		th,
		td {
			padding: 12px 14px;
			font-size: 12.5px;
		}

		.proof-header {
			padding: 16px 18px;
		}

		.proof-body {
			padding: 16px 18px;
			gap: 16px;
		}
	}
</style>
