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

			<!-- Centered link to screenshot gallery -->
			<div class="preview-action">
				<a href="/gallery" class="gallery-btn">
					<span>View screenshot gallery</span>
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

	/* Clean wireframe box matching Sonora design tokens */
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

	/* Centered action button below video */
	.preview-action {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 20px;
	}

	.gallery-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 38px;
		padding: 0 18px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--fg);
		font-size: 13.5px;
		font-weight: 500;
		white-space: nowrap;
		text-decoration: none;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
		transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
	}

	.gallery-btn:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
		transform: translateY(-1px);
	}

	.gallery-btn svg {
		color: var(--dim);
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.gallery-btn:hover svg {
		transform: translateX(3px);
		color: var(--fg);
	}

	@media (max-width: 768px) {
		.preview {
			padding: 0 0 48px;
		}

		.preview-action {
			margin-top: 16px;
		}

		.gallery-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
