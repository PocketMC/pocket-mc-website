<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { faqItems } from '$lib/data/faq';

	// Select 6 most helpful, high-impact questions for the homepage
	const featuredIds = [
		'playit-tunneling',
		'java-runtimes',
		'admin-privileges',
		'multiplayer-remote',
		'storage-backups',
		'bedrock-crossplay'
	];

	const featured = faqItems.filter((item) => featuredIds.includes(item.id));
</script>

<section id="faq" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Questions</span>
			<h2>Frequently Asked Questions</h2>
			<p class="lead">
				Quick answers to common questions about setting up and running local Minecraft servers with PocketMC.
			</p>
		</div>

		<div class="wire faq-list" use:reveal={{ stagger: true }}>
			{#each featured as item, index (item.id)}
				<details class="faq-card" open={index === 0}>
					<summary class="faq-summary">
						<span class="faq-question">{item.question}</span>
						<span class="faq-icon" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</span>
					</summary>
					<div class="faq-content">
						{#each item.answer as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</details>
			{/each}
		</div>

		<div class="faq-footer">
			<a href="/faq" class="btn btn-secondary">
				View all questions in full FAQ
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 860px;
		margin: 0 auto;
	}

	.faq-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
		transition: border-color 0.15s ease, background-color 0.15s ease;
	}

	.faq-card:hover {
		border-color: var(--dim);
	}

	.faq-card[open] {
		border-color: var(--line);
		background: var(--card);
	}

	.faq-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 22px;
		font-size: 15.5px;
		font-weight: 600;
		color: var(--fg);
		cursor: pointer;
		user-select: none;
		list-style: none;
	}

	.faq-summary::-webkit-details-marker {
		display: none;
	}

	.faq-question {
		flex: 1;
		line-height: 1.45;
	}

	.faq-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		color: var(--muted-fg);
		transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease;
		flex-shrink: 0;
	}

	.faq-card[open] .faq-icon {
		transform: rotate(180deg);
		color: var(--fg);
	}

	.faq-content {
		padding: 0 22px 20px;
		border-top: 1px solid var(--border);
		margin-top: -1px;
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--muted-fg);
	}

	.faq-content p {
		margin: 14px 0 0;
	}

	.faq-footer {
		display: flex;
		justify-content: center;
		margin-top: 36px;
	}

	@media (max-width: 768px) {
		.faq-summary {
			padding: 16px 18px;
			font-size: 14.5px;
		}

		.faq-content {
			padding: 0 18px 16px;
			font-size: 13.5px;
		}
	}
</style>
