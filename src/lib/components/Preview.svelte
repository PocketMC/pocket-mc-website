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

			<!-- Clean, 100% border-framed showcase window with zero clutter -->
			<div class="frame live">
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
			</div>

			<!-- Segmented pill switcher detached at the bottom, styled like ThemeSwitch -->
			<div class="switcher-bar">
				<div class="switch" role="tablist" aria-label="Feature Showcase Tabs">
					{#each tourTabs as tab (tab.id)}
						<button
							type="button"
							role="tab"
							class="tab-btn"
							class:on={tab.id === activeId}
							aria-selected={tab.id === activeId}
							onclick={() => (activeId = tab.id)}
						>
							{#if tab.video}
								<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" class="tab-icon" aria-hidden="true">
									<polygon points="5 3 19 12 5 21 5 3" />
								</svg>
							{/if}
							<span>{tab.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Feature Details Highlight Drawer -->
			<div class="feature-drawer">
				<div class="drawer-text">
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
		height: 420px;
		background: radial-gradient(ellipse 70% 50% at 50% 25%, rgba(34, 197, 94, 0.18), transparent 70%);
		filter: blur(55px);
		pointer-events: none;
		z-index: 0;
	}

	/* Clean wireframe box with zero top header */
	.frame {
		position: relative;
		z-index: 1;
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: #000;
		box-shadow:
			var(--shadow),
			var(--glow);
		transition: box-shadow 0.3s ease;
	}

	.media-container {
		width: 100%;
		position: relative;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 660px;
		overflow: hidden;
	}

	.showcase-media {
		width: 100%;
		height: auto;
		max-height: 660px;
		object-fit: contain;
		display: block;
	}

	/* Switcher Bar - Detached below frame */
	.switcher-bar {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 28px;
	}

	/* Segmented control pill matching ThemeSwitch */
	.switch {
		height: 38px;
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35);
		max-width: 100%;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.switch::-webkit-scrollbar {
		display: none;
	}

	.tab-btn {
		height: 100%;
		padding: 0 14px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border-radius: calc(var(--radius) - 4px);
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		transition: color 0.15s ease, background-color 0.15s ease;
	}

	.tab-btn:hover {
		color: var(--fg);
	}

	.tab-btn.on {
		background: var(--secondary-active);
		color: var(--fg);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}

	.tab-icon {
		color: #22c55e;
	}

	/* Feature Highlights Drawer */
	.feature-drawer {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 36px;
		margin-top: 28px;
		padding: 26px 32px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		text-align: left;
	}

	.drawer-text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.drawer-text h3 {
		font-size: 19px;
		font-weight: 600;
		color: var(--fg);
	}

	.drawer-text p {
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

		.switcher-bar {
			margin-top: 20px;
			justify-content: flex-start;
			padding-inline: 4px;
		}

		.switch {
			height: 36px;
		}

		.tab-btn {
			padding: 0 11px;
			font-size: 12.5px;
		}

		.feature-drawer {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 18px 20px;
			margin-top: 20px;
		}
	}
</style>
