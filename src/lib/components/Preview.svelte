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
			<!-- Ambient lighting aura behind the frame -->
			<div class="frame-aura" aria-hidden="true"></div>

			<!-- Native Desktop App Window Frame -->
			<div class="frame live">
				<!-- Window Title Bar -->
				<div class="window-titlebar">
					<div class="window-dots" aria-hidden="true">
						<span class="dot close"></span>
						<span class="dot min"></span>
						<span class="dot max"></span>
					</div>

					<div class="window-center">
						<span class="app-name">PocketMC</span>
						<span class="app-sep">/</span>
						<span class="app-view">{activeTab.label}</span>
						<span class="status-indicator">
							<span class="pulse-dot"></span>
							<span>2 instances online</span>
						</span>
					</div>

					<div class="window-badges">
						<span class="badge runtime">JRE 21</span>
						<span class="badge tunnel">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10" />
								<line x1="2" y1="12" x2="22" y2="12" />
								<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
							</svg>
							Playit.gg
						</span>
					</div>
				</div>

				<!-- Window Toolbar Tabs -->
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

				<!-- Window Screen / Viewport -->
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

					<!-- Window Footer / Status Bar & Highlights -->
					<div class="stage-footer">
						<div class="stage-text">
							<div class="meta-row">
								<span class="kicker">Highlight</span>
								<span class="active-badge">Live Feature</span>
							</div>
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

	/* Ambient layered backlight glow aura */
	.frame-aura {
		position: absolute;
		top: -20px;
		left: 5%;
		right: 5%;
		height: 380px;
		background: radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34, 197, 94, 0.22), rgba(255, 255, 255, 0.05), transparent 70%);
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
			var(--glow),
			inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
		transition: box-shadow 0.3s ease;
	}

	/* Native Desktop Titlebar */
	.window-titlebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 38px;
		padding: 0 14px;
		background: var(--card);
		border-bottom: 1px solid var(--line);
		user-select: none;
	}

	.window-dots {
		display: flex;
		align-items: center;
		gap: 7px;
		width: 60px;
	}

	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		display: inline-block;
	}

	.dot.close {
		background: #ff5f57;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
	}

	.dot.min {
		background: #febc2e;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
	}

	.dot.max {
		background: #28c840;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
	}

	.window-center {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 500;
		color: var(--dim);
	}

	.app-name {
		font-weight: 600;
		color: var(--fg);
	}

	.app-sep {
		color: var(--faint);
	}

	.app-view {
		color: var(--muted-fg);
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-left: 6px;
		padding: 2px 7px;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.25);
		border-radius: 12px;
		font-size: 11px;
		color: #22c55e;
	}

	.pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 6px #22c55e;
	}

	.window-badges {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.badge {
		padding: 2px 8px;
		font-size: 11px;
		font-family: var(--mono);
		border-radius: 5px;
		background: var(--secondary);
		border: 1px solid var(--border);
		color: var(--muted-fg);
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.badge.tunnel {
		color: #93c5fd;
		border-color: rgba(147, 197, 253, 0.25);
		background: rgba(147, 197, 253, 0.08);
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
		padding: 10px 16px;
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
		border-bottom-color: #22c55e;
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

	/* Window Status Bar / Highlight Drawer */
	.stage-footer {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 36px;
		padding: 26px 30px;
		border-top: 1px solid var(--line);
		background: var(--card);
		text-align: left;
	}

	.stage-text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.meta-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.active-badge {
		font-size: 11px;
		font-family: var(--mono);
		padding: 1px 6px;
		border-radius: 4px;
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		font-weight: 500;
	}

	.stage-text h3 {
		font-size: 18px;
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
		color: #22c55e;
		flex-shrink: 0;
		margin-top: 2px;
	}

	@media (max-width: 900px) {
		.preview {
			padding: 0 0 48px;
		}

		.window-badges {
			display: none;
		}

		.status-indicator span:last-child {
			display: none;
		}

		.stage-footer {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 18px 20px;
		}
	}
</style>
