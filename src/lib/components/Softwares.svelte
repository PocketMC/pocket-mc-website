<script lang="ts">
	import { serverSoftwares } from '$lib/data/softwares';
	import { reveal } from '$lib/reveal';
</script>

<section id="softwares" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Ecosystem</span>
			<h2>Supported Server Engines</h2>
			<p class="lead">
				From vanilla survival to massive modded networks, PocketMC supports the industry's most popular
				Java and Bedrock loaders out of the box.
			</p>
		</div>

		<div class="wire grid" use:reveal={{ stagger: true }}>
			{#each serverSoftwares as s (s.name)}
				<article class="card">
					<div class="top">
						<img src={s.icon} alt={s.name} width="32" height="32" class="software-icon" />
						<div class="meta">
							<h3>{s.name}</h3>
							<span class="tag">{s.tag}</span>
						</div>
					</div>
					<p class="desc">{s.description}</p>
					<span class="mono versions">{s.versions}</span>
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
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 22px;
		background: var(--bg);
	}

	.top {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.software-icon {
		width: 32px;
		height: 32px;
		object-fit: contain;
		flex-shrink: 0;
	}

	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		gap: 8px;
	}

	.meta h3 {
		font-size: 16px;
		font-weight: 600;
	}

	.tag {
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--secondary);
		font-size: 11px;
		font-weight: 500;
		color: var(--chip-fg);
	}

	.desc {
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--muted-fg);
		flex: 1;
	}

	.versions {
		font-size: 11.5px;
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
