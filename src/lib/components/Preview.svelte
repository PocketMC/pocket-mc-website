<script lang="ts">
	import { onMount } from 'svelte';
	import { youtube } from '$lib/data/links';

	const videoSrc = '/Video/PocketMC.mp4';
	let videoEl = $state<HTMLVideoElement | null>(null);
	let isMuted = $state(true);

	onMount(() => {
		if (!videoEl) return;
		videoEl.defaultMuted = true;
		videoEl.muted = true;
		videoEl.volume = 0.5;
		videoEl.play().catch(() => {});
	});

	function setMuted(muted: boolean) {
		isMuted = muted;
		if (videoEl) {
			videoEl.muted = muted;
			if (!muted) {
				videoEl.volume = 0.5;
			}
			videoEl.play().catch(() => {});
		}
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href="/screenshots/screenshot-dashboard.webp" fetchpriority="high" />
</svelte:head>

<section id="tour" class="preview section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.32s">
			<figcaption class="sr-only">PocketMC desktop user interface preview</figcaption>
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
						<track kind="captions" label="English" src="data:text/vtt,WEBVTT" default />
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

				<!-- Classic YouTube tab button matching website themes and tabs -->
				<a
					href={youtube}
					target="_blank"
					rel="noopener noreferrer"
					class="youtube-tab"
					title="Official YouTube Channel"
					aria-label="Official YouTube Channel"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
					</svg>
					<span>YouTube</span>
				</a>
			</div>
		</figure>
	</div>
</section>

<style>
	.preview {
		position: relative;
		padding: 36px 0 56px;
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
		gap: 10px;
		width: 100%;
		margin-top: 24px;
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

	/* Classic YouTube tab button matching ThemeSwitch / audio-switch aesthetics */
	.youtube-tab {
		height: 38px;
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		white-space: nowrap;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
		transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.youtube-tab:hover {
		color: var(--fg);
		background: var(--secondary-active);
		border-color: var(--border);
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
	}

	.youtube-tab svg {
		width: 14px;
		height: 14px;
		fill: currentColor;
		transition: transform 0.15s ease;
	}

	.youtube-tab:hover svg {
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.preview {
			padding: 32px 0 44px;
		}

		.preview-actions {
			margin-top: 16px;
			gap: 8px;
		}

		.audio-switch {
			max-width: none;
		}

		.switch-btn {
			padding: 0 10px;
		}

		.youtube-tab {
			padding: 0 12px;
		}
	}
</style>
