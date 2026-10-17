<script lang="ts">
	import { comparisonCategories } from '$lib/data/comparison';
	import { reveal } from '$lib/reveal';
</script>

<section id="comparison" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Benchmark</span>
			<h2>How PocketMC Compares</h2>
			<p class="lead">
				Why pay monthly subscription fees for underpowered cloud VPS containers when your home PC has
				vastly superior hardware ready to run for free?
			</p>
		</div>

		<div class="wire table-wrap" use:reveal>
			<div class="scroll-table">
				<table>
					<thead>
						<tr>
							<th class="feature-col">Feature</th>
							<th class="highlight-col">PocketMC</th>
							<th>Cloud VPS / Hostinger</th>
							<th>Free Hosts (Aternos)</th>
							<th>Manual Server Setup</th>
						</tr>
					</thead>
					<tbody>
						{#each comparisonCategories as category}
							<tr class="category-row">
								<td colspan="5">{category.title}</td>
							</tr>
							{#each category.items as item}
								<tr>
									<td class="feature-title">{item.feature}</td>
									<td class="highlight-val">{item.pocketmc}</td>
									<td>{item.vps}</td>
									<td>{item.aternos}</td>
									<td>{item.manual}</td>
								</tr>
							{/each}
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
		scrollbar-width: none;
	}

	.scroll-table::-webkit-scrollbar {
		display: none;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
		text-align: left;
	}

	th,
	td {
		padding: 14px 20px;
		border-bottom: 1px solid var(--line);
		border-right: 1px solid var(--line);
		background: var(--bg);
	}

	th:last-child,
	td:last-child {
		border-right: none;
	}

	thead th {
		background: var(--secondary);
		font-size: 13px;
		font-weight: 600;
		color: var(--muted-fg);
	}

	thead th.highlight-col {
		color: var(--fg);
		background: var(--secondary-hover);
		border-bottom: 2px solid var(--fg);
	}

	.category-row td {
		background: var(--secondary);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dim);
		padding-top: 18px;
		padding-bottom: 10px;
	}

	.feature-title {
		font-weight: 500;
		color: var(--fg);
		white-space: nowrap;
	}

	.highlight-val {
		color: var(--syntax-string);
		font-weight: 500;
		background: var(--secondary-hover);
	}

	td {
		color: var(--muted-fg);
		line-height: 1.5;
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		th,
		td {
			padding: 10px 14px;
			font-size: 12.5px;
		}
	}
</style>
