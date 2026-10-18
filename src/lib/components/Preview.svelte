<script lang="ts">
	import { onMount } from 'svelte';

	const videoSrc = '/Video/PocketMC.mp4';
	let videoEl = $state<HTMLVideoElement | null>(null);
	let isMuted = $state(false);

	onMount(() => {
		if (!videoEl) return;
		videoEl.volume = 0.5;
		videoEl.muted = false;

		const playPromise = videoEl.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				// Browser policy blocked unmuted autoplay before interaction.
				// Keep video playing and restore unmuted state on first interaction.
				if (videoEl) {
					videoEl.muted = true;
					videoEl.play().catch(() => {});
				}

				const unmuteOnUserAction = () => {
					if (videoEl && !isMuted) {
						videoEl.muted = false;
						videoEl.volume = 0.5;
						videoEl.play().catch(() => {});
					}
					window.removeEventListener('click', unmuteOnUserAction);
					window.removeEventListener('keydown', unmuteOnUserAction);
					window.removeEventListener('pointerdown', unmuteOnUserAction);
					window.removeEventListener('touchstart', unmuteOnUserAction);
				};

				window.addEventListener('click', unmuteOnUserAction, { once: true });
				window.addEventListener('keydown', unmuteOnUserAction, { once: true });
				window.addEventListener('pointerdown', unmuteOnUserAction, { once: true });
				window.addEventListener('touchstart', unmuteOnUserAction, { once: true });
			});
		}
	});

	function setMuted(muted: boolean) {
		isMuted = muted;
		if (videoEl) {
			videoEl.muted = muted;
			if (!muted) {
				videoEl.volume = 0.5;
				videoEl.play().catch(() => {});
			}
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
						muted
						playsinline
						class="showcase-media"
					>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			<!-- External controls row below showcase frame -->
			<div class="preview-actions">
				<!-- Tab switcher for audio matching ThemeSwitch aesthetics -->
				<div class="audio-switch" role="group" aria-label="Video sound controls">
					<button
						type="button"
						class="switch-btn"
						class:on={isMuted}
						onclick={() => setMuted(true)}
						aria-pressed={isMuted}
						title="Mute video"
					>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
							<line x1="23" y1="9" x2="17" y2="15" />
							<line x1="17" y1="9" x2="23" y2="15" />
						</svg>
						<span>Mute</span>
					</button>
					<button
						type="button"
						class="switch-btn"
						class:on={!isMuted}
						onclick={() => setMuted(false)}
						aria-pressed={!isMuted}
						title="Unmute video"
					>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
							<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
							<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
						</svg>
						<span>Unmute</span>
					</button>
				</div>

				<!-- Link to screenshot gallery -->
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

	/* Centered action controls below video */
	.preview-actions {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		margin-top: 20px;
		flex-wrap: wrap;
	}

	/* Tab switcher matching ThemeSwitch aesthetic */
	.audio-switch {
		height: 38px;
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
	}

	.switch-btn {
		height: 100%;
		padding: 0 13px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border-radius: calc(var(--radius) - 4px);
		border: none;
		background: transparent;
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: color 0.15s ease, background-color 0.15s ease;
	}

	.switch-btn:hover {
		color: var(--fg);
	}

	.switch-btn.on {
		background: var(--secondary-active);
		color: var(--fg);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}

	.switch-btn svg {
		width: 13px;
		height: 13px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
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

		.preview-actions {
			margin-top: 16px;
			gap: 10px;
		}

		.gallery-btn,
		.audio-switch {
			width: 100%;
			justify-content: center;
		}

		.switch-btn {
			flex: 1;
			justify-content: center;
		}
	}
</style>
