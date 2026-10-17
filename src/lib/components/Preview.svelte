<script lang="ts">
	const videoSrc = '/Video/PocketMC.mp4';
</script>

<svelte:head>
	<link rel="preload" as="video" href={videoSrc} type="video/mp4" />
	<link rel="preload" as="image" href="/screenshots/screenshot-dashboard.webp" />
</svelte:head>

<section id="tour" class="preview section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.32s">
			<!-- Subtle ambient backlight aura -->
			<div class="frame-aura" aria-hidden="true"></div>

			<!-- Clean, border-framed video window -->
			<div class="frame live">
				<div class="media-container video-container">
					<video
						src={videoSrc}
						poster="/screenshots/screenshot-dashboard.webp"
						preload="auto"
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
			</div>

			<!-- Clean casual footer bar below video -->
			<div class="preview-footer">
				<p class="summary-text">
					Single-click server creation, live ANSI console, and zero-router Playit.gg tunnels.
				</p>

				<a href="/gallery" class="gallery-btn">
					<span>View screenshots</span>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</a>
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
		background: radial-gradient(ellipse 70% 50% at 50% 25%, rgba(34, 197, 94, 0.16), transparent 70%);
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

	/* Casual footer bar below video */
	.preview-footer {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: 18px;
		gap: 16px;
		padding: 0 4px;
	}

	.summary-text {
		font-size: 14px;
		color: var(--muted-fg);
		margin: 0;
	}

	.gallery-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 34px;
		padding: 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--fg);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		text-decoration: none;
		transition: background-color 0.15s ease, border-color 0.15s ease;
	}

	.gallery-btn:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	.gallery-btn svg {
		color: var(--muted-fg);
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.gallery-btn:hover svg {
		transform: translateX(2px);
		color: var(--fg);
	}

	@media (max-width: 768px) {
		.preview {
			padding: 0 0 48px;
		}

		.preview-footer {
			margin-top: 14px;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.gallery-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
