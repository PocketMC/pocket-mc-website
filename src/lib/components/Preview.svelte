<script lang="ts">
	import { tourTabs, type TourTab } from '$lib/data/tour';

	let activeId = $state('overview');
	const activeTab = $derived(tourTabs.find((t) => t.id === activeId) ?? tourTabs[0]);
</script>

<section id="tour" class="preview section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.32s">
			<!-- Subtle ambient backlight aura -->
			<div class="frame-aura" aria-hidden="true"></div>

			<!-- Clean wireframe showcase container matching Sonora website -->
			<div class="frame live">
				<!-- Showcase Tab Strip -->
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
							{#if tab.video}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="tab-icon" aria-hidden="true">
									<polygon points="5 3 19 12 5 21 5 3" />
								</svg>
							{/if}
							<span>{tab.label}</span>
						</button>
					{/each}
				</div>

				<!-- Screen Stage -->
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

					<!-- Feature Details Highlight Drawer -->
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
										aria-hidden="true"
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
		</figure>
	</div>
</section>

<style>
	.preview {
		position: relative;
		padding: 0 0 72px;
	}

	.preview .page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shot {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1180px;
		margin: 0;
	}

	/* Soft ambient backlight aura */
	.frame-aura {
		position: absolute;
		top: -15px;
		left: 8%;
		right: 8%;
		height: 360px;
		background: radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34, 197, 94, 0.18), transparent 70%);
		filter: blur(55px);
		pointer-events: none;
		z-index: 0;
	}

	.frame {
		position: relative;
		z-index: 1;
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--bg);
		box-shadow:
			var(--shadow),
			var(--glow);
		transition: box-shadow 0.3s ease;
	}

	/* Tab Strip */
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
		display: flex;
		align-items: center;
		gap: 6px;
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

	.tab-icon {
		color: #22c55e;
	}

	/* Stage Screen */
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

	/* Feature Highlights Drawer */
	.stage-footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 36px;
		padding: 26px 32px;
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
		color: var(--fg);
	}

	.stage-text p {
		font-size: 13.5px;
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
		line-height: 1.45;
		color: var(--muted-fg);
	}

	.check-icon {
		color: var(--syntax-string);
		flex-shrink: 0;
		margin-top: 2px;
	}

	@media (max-width: 900px) {
		.preview {
			padding: 0 0 48px;
		}

		.stage-footer {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 18px 20px;
		}
	}
</style>
