<script lang="ts">
	import { onMount } from 'svelte';

	const videoSrc = '/Video/PocketMC.mp4';
	let videoEl = $state<HTMLVideoElement | null>(null);
	let isMuted = $state(false);

	onMount(() => {
		if (!videoEl) return;

		// Default volume to 50%
		videoEl.volume = 0.5;

		// Attempt unmuted autoplay at 50% volume
		videoEl.muted = false;
		const playPromise = videoEl.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					isMuted = false;
				})
				.catch(() => {
					// Browser blocked unmuted autoplay due to document interaction policy.
					// Fall back to muted autoplay to avoid playback freeze, and unmute on first interaction.
					if (videoEl) {
						videoEl.muted = true;
						videoEl.play();
						isMuted = true;
					}

					const enableSound = () => {
						if (videoEl) {
							videoEl.muted = false;
							videoEl.volume = 0.5;
							isMuted = false;
						}
						window.removeEventListener('pointerdown', enableSound);
						window.removeEventListener('keydown', enableSound);
						window.removeEventListener('scroll', enableSound);
					};

					window.addEventListener('pointerdown', enableSound, { once: true });
					window.addEventListener('keydown', enableSound, { once: true });
					window.addEventListener('scroll', enableSound, { once: true, passive: true });
				});
		}
	});

	function toggleSound() {
		if (!videoEl) return;
		if (videoEl.muted || videoEl.volume === 0) {
			videoEl.muted = false;
			videoEl.volume = 0.5;
			isMuted = false;
		} else {
			videoEl.muted = true;
			isMuted = true;
		}
	}
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

			<!-- Clean, border-framed video window with zero black bars and no controls -->
			<div class="frame live">
				<div class="media-container video-container">
					<video
						bind:this={videoEl}
						src={videoSrc}
						poster="/screenshots/screenshot-dashboard.webp"
						preload="auto"
						autoplay
						loop
						playsinline
						class="showcase-media"
					>
						Your browser does not support the video tag.
					</video>

					<!-- Minimal sound toggle at 50% default -->
					<button
						type="button"
						class="sound-toggle"
						onclick={toggleSound}
						aria-label={isMuted ? 'Unmute video' : 'Mute video'}
					>
						{#if isMuted}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
								<line x1="23" y1="9" x2="17" y2="15" />
								<line x1="17" y1="9" x2="23" y2="15" />
							</svg>
							<span>Sound off</span>
						{:else}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
								<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
							</svg>
							<span>50%</span>
						{/if}
					</button>
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

	/* Clean wireframe box matching Sonora design tokens: exact 16:9 ratio and zero black bars */
	.frame {
		position: relative;
		z-index: 1;
		width: 100%;
		aspect-ratio: 16 / 9;
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
		height: 100%;
		position: relative;
		background: #000;
		overflow: hidden;
	}

	/* Edge-to-edge video fill with zero letterboxing or side gaps */
	.showcase-media {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
		user-select: none;
	}

	/* Sleek, minimal sound toggle */
	.sound-toggle {
		position: absolute;
		bottom: 16px;
		right: 16px;
		z-index: 5;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 30px;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: rgba(10, 10, 10, 0.72);
		backdrop-filter: blur(8px);
		color: var(--fg);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
	}

	.sound-toggle:hover {
		background: rgba(24, 24, 27, 0.88);
		border-color: var(--dim);
		transform: scale(1.02);
	}

	.sound-toggle svg {
		color: var(--fg);
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

		.sound-toggle {
			bottom: 12px;
			right: 12px;
			height: 28px;
			padding: 0 10px;
			font-size: 11.5px;
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
