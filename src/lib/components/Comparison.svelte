<script lang="ts">
	import { toolComparisons } from '$lib/data/comparison';
	import { reveal } from '$lib/reveal';
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
				against alternative hosting tools.
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
										{#if item.isPocketMC}
											<span class="pulse-dot" aria-hidden="true"></span>
										{/if}
										<span class="tool-name" class:highlight-name={item.isPocketMC}>{item.tool}</span>
										{#if item.badge}
											<span class="badge best-badge">{item.badge}</span>
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
		color: var(--fg);
		font-size: 14.5px;
	}

	.pulse-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
		flex-shrink: 0;
	}

	.best-badge {
		padding: 2px 7px;
		font-size: 10.5px;
		font-weight: 600;
		border-radius: 999px;
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.28);
		white-space: nowrap;
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

	.highlight-row td {
		background: rgba(255, 255, 255, 0.02);
	}

	.highlight-wins {
		color: var(--fg);
		font-weight: 450;
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
	}
</style>
