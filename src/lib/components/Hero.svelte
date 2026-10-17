<script lang="ts">
	import { repo } from '$lib/data/links';
	import { tourTabs, type TourTab } from '$lib/data/tour';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';

	let { version = 'v1.9.9' }: { version?: string | null } = $props();

	let activeId = $state('overview');
	const activeTab = $derived(tourTabs.find((t) => t.id === activeId) ?? tourTabs[0]);
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

	<!-- High-definition product showcase framed in Sonora wire border -->
	<div id="tour" class="showcase-wrap" data-enter style="--enter: 0.26s">
		<div class="page">
			<div class="showcase-frame">
				<!-- Tab Bar -->
				<div class="tab-strip" role="tablist" aria-label="Feature Showcase Tabs">
					{#each tourTabs as tab (tab.id)}
						<button
							type="button"
							role="tab"
							class="tab-btn"
							class:active={tab.id === activeId}
							aria-selected={tab.id === activeId}
							onclick={() => (activeId = tab.id)}
						>
							{tab.label}
						</button>
					{/each}
				</div>

				<!-- Display Stage -->
				<div class="stage">
					{#if activeTab.video}
						<div class="media-container video-container">
							<video
								src={activeTab.video}
								autoplay
								loop
								muted
								playsinline
								controls
								class="showcase-media"
							>
								Your browser does not support the video tag.
							</video>
						</div>
					{:else if activeTab.image}
						<div class="media-container image-container">
							<img
								src={activeTab.image}
								alt={activeTab.title}
								loading="lazy"
								class="showcase-media"
							/>
						</div>
					{/if}

					<!-- Feature Details Caption Footer -->
					<div class="stage-footer">
						<div class="stage-text">
							<span class="kicker">Highlight</span>
							<h3>{activeTab.title}</h3>
							<p>{activeTab.description}</p>
						</div>

						<ul class="bullets">
							{#each activeTab.bullets as bullet}
								<li>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="check-icon"
									>
										<polyline points="20 6 9 17 4 12" />
									</svg>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		scroll-margin-top: var(--header);
	}

	.hero .page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: clamp(64px, 8vh, 100px);
		padding-bottom: 32px;
	}

	.mark {
		display: flex;
		border-radius: 20px;
		box-shadow: var(--shadow);
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
		max-width: 600px;
		font-size: clamp(16px, 2.2vw, 19px);
		line-height: 1.5;
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

	.showcase-wrap {
		width: 100%;
		padding-bottom: 72px;
	}

	.showcase-frame {
		width: 100%;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--card);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.tab-strip {
		display: flex;
		overflow-x: auto;
		background: var(--secondary);
		border-bottom: 1px solid var(--line);
		scrollbar-width: none;
	}

	.tab-strip::-webkit-scrollbar {
		display: none;
	}

	.tab-btn {
		padding: 12px 18px;
		font-size: 13px;
		font-weight: 500;
		color: var(--muted-fg);
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
	}

	.tab-btn:hover {
		color: var(--fg);
		background: var(--secondary-hover);
	}

	.tab-btn.active {
		color: var(--fg);
		border-bottom-color: var(--fg);
		background: var(--bg);
	}

	.stage {
		display: flex;
		flex-direction: column;
		background: var(--bg);
	}

	.media-container {
		width: 100%;
		position: relative;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 640px;
		overflow: hidden;
	}

	.showcase-media {
		width: 100%;
		height: auto;
		max-height: 640px;
		object-fit: contain;
		display: block;
	}

	.stage-footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 36px;
		padding: 28px 32px;
		border-top: 1px solid var(--line);
		background: var(--card);
		text-align: left;
	}

	.stage-text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.stage-text h3 {
		font-size: 19px;
		font-weight: 600;
	}

	.stage-text p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.bullets {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
	}

	.bullets li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	.check-icon {
		color: var(--syntax-string);
		flex-shrink: 0;
		margin-top: 2px;
	}

	@media (max-width: 900px) {
		.hero .page {
			padding-top: 48px;
			padding-bottom: 24px;
		}

		.tagline {
			font-size: 15px;
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
			margin-top: 24px;
		}

		.stage-footer {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 20px;
		}
	}
</style>
