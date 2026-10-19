<script lang="ts">
	import { onMount } from 'svelte';
	import { youtube } from '$lib/data/links';

	const videoSrc = '/Video/PocketMC.mp4';
	const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

	let videoEl = $state<HTMLVideoElement | null>(null);
	let frameEl = $state<HTMLDivElement | null>(null);
	let progressBarEl = $state<HTMLDivElement | null>(null);

	let isPlaying = $state(false);
	let isMuted = $state(true);
	let volume = $state(0.5);
	let currentTime = $state(0);
	let duration = $state(0);
	let bufferedEnd = $state(0);
	let playbackRate = $state(1);
	let isLooping = $state(true);
	let isFullscreen = $state(false);
	let isPiPSupported = $state(false);
	let isPiPActive = $state(false);

	let showControls = $state(true);
	let isSpeedMenuOpen = $state(false);
	let badgeVisible = $state(false);
	let badgeType = $state<'play' | 'pause' | 'rewind5' | 'forward5' | 'replay'>('play');
	let isDragging = $state(false);
	let hoverRatio = $state<number | null>(null);

	let hideTimeout: ReturnType<typeof setTimeout> | null = null;
	let badgeTimeout: ReturnType<typeof setTimeout> | null = null;

	let progressPercent = $derived(
		duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0
	);
	let bufferedPercent = $derived(
		duration > 0 ? Math.min(100, Math.max(0, (bufferedEnd / duration) * 100)) : 0
	);

	function syncMediaState() {
		if (!videoEl) return;
		if (!isDragging) {
			currentTime = videoEl.currentTime || 0;
		}
		if (Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
			duration = videoEl.duration;
		}
		if (videoEl.buffered && videoEl.buffered.length > 0 && duration > 0) {
			try {
				bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
			} catch {}
		}
	}

	onMount(() => {
		if (videoEl) {
			videoEl.defaultMuted = true;
			videoEl.muted = true;
			videoEl.volume = volume;
			syncMediaState();
			videoEl.play().then(() => {
				isPlaying = true;
				syncMediaState();
			}).catch(() => {
				isPlaying = false;
			});
		}

		isPiPSupported = typeof document !== 'undefined' && 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;

		const handleFullscreenChange = () => {
			isFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
			if (isFullscreen) {
				showControls = true;
			}
		};

		const handleEnterPiP = () => { isPiPActive = true; };
		const handleLeavePiP = () => { isPiPActive = false; };

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		window.addEventListener('click', handleWindowClick);
		window.addEventListener('keydown', handleKeydown);

		if (videoEl) {
			videoEl.addEventListener('enterpictureinpicture', handleEnterPiP);
			videoEl.addEventListener('leavepictureinpicture', handleLeavePiP);
		}

		resetHideTimer();

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			window.removeEventListener('click', handleWindowClick);
			window.removeEventListener('keydown', handleKeydown);
			if (videoEl) {
				videoEl.removeEventListener('enterpictureinpicture', handleEnterPiP);
				videoEl.removeEventListener('leavepictureinpicture', handleLeavePiP);
			}
			if (hideTimeout) clearTimeout(hideTimeout);
			if (badgeTimeout) clearTimeout(badgeTimeout);
		};
	});

	function resetHideTimer() {
		showControls = true;
		if (hideTimeout) clearTimeout(hideTimeout);
		if (isPlaying && !isSpeedMenuOpen && !isDragging) {
			hideTimeout = setTimeout(() => {
				if (isPlaying && !isSpeedMenuOpen && !isDragging) {
					showControls = false;
				}
			}, 2500);
		}
	}

	function handleMouseMove() {
		resetHideTimer();
	}

	function handleMouseLeave() {
		if (isPlaying && !isSpeedMenuOpen && !isDragging) {
			showControls = false;
		}
	}

	function triggerCenterBadge(type: 'play' | 'pause' | 'rewind5' | 'forward5' | 'replay') {
		badgeType = type;
		badgeVisible = true;
		if (badgeTimeout) clearTimeout(badgeTimeout);
		badgeTimeout = setTimeout(() => {
			badgeVisible = false;
		}, 550);
	}

	function togglePlay() {
		if (!videoEl) return;
		if (videoEl.paused || videoEl.ended) {
			videoEl.play().then(() => {
				isPlaying = true;
				syncMediaState();
			}).catch(() => {});
			triggerCenterBadge('play');
		} else {
			videoEl.pause();
			isPlaying = false;
			syncMediaState();
			triggerCenterBadge('pause');
		}
		resetHideTimer();
	}

	function setMuted(muted: boolean) {
		isMuted = muted;
		if (videoEl) {
			videoEl.muted = muted;
			if (!muted && videoEl.volume === 0) {
				videoEl.volume = 0.5;
				volume = 0.5;
			}
			if (videoEl.paused) {
				videoEl.play().catch(() => {});
			}
		}
		resetHideTimer();
	}

	function handleVolumeChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseFloat(target.value);
		volume = val;
		if (videoEl) {
			videoEl.volume = val;
			if (val === 0) {
				videoEl.muted = true;
				isMuted = true;
			} else if (isMuted) {
				videoEl.muted = false;
				isMuted = false;
			}
		}
		resetHideTimer();
	}

	function seekRelative(offset: number) {
		if (!videoEl) return;
		const totalDuration = duration > 0 ? duration : (videoEl.duration || 60);
		const target = Math.max(0, Math.min(totalDuration, videoEl.currentTime + offset));
		videoEl.currentTime = target;
		currentTime = target;
		triggerCenterBadge(offset > 0 ? 'forward5' : 'rewind5');
		resetHideTimer();
	}

	function setPlaybackRate(rate: number) {
		playbackRate = rate;
		if (videoEl) {
			videoEl.playbackRate = rate;
		}
		isSpeedMenuOpen = false;
		resetHideTimer();
	}

	function toggleLoop() {
		isLooping = !isLooping;
		if (videoEl) {
			videoEl.loop = isLooping;
		}
		resetHideTimer();
	}

	async function togglePiP() {
		if (!videoEl) return;
		try {
			if (document.pictureInPictureElement) {
				await document.exitPictureInPicture();
			} else if (videoEl.requestPictureInPicture) {
				await videoEl.requestPictureInPicture();
			}
		} catch (err) {
			console.warn('PiP toggle failed:', err);
		}
	}

	async function toggleFullscreen() {
		if (!frameEl) return;
		try {
			if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
				if (document.exitFullscreen) {
					await document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					await (document as any).webkitExitFullscreen();
				}
			} else if (frameEl.requestFullscreen) {
				await frameEl.requestFullscreen();
			} else if ((frameEl as any).webkitRequestFullscreen) {
				await (frameEl as any).webkitRequestFullscreen();
			} else if (videoEl && (videoEl as any).webkitEnterFullscreen) {
				(videoEl as any).webkitEnterFullscreen();
			}
		} catch (err) {
			console.warn('Fullscreen toggle failed:', err);
		}
	}

	function formatTime(seconds: number): string {
		if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
		const s = Math.floor(seconds);
		const mins = Math.floor(s / 60);
		const secs = s % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	}

	function seekToEvent(e: PointerEvent) {
		if (!progressBarEl || !videoEl) return;
		const totalDuration = duration > 0 ? duration : (videoEl.duration || 60);
		const rect = progressBarEl.getBoundingClientRect();
		const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
		const targetTime = ratio * totalDuration;
		currentTime = targetTime;
		videoEl.currentTime = targetTime;
		if (Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
			duration = videoEl.duration;
		}
	}

	function handleScrubberPointerDown(e: PointerEvent) {
		if (!progressBarEl || !videoEl) return;
		isDragging = true;
		progressBarEl.setPointerCapture(e.pointerId);
		seekToEvent(e);
		resetHideTimer();
	}

	function handleScrubberPointerMove(e: PointerEvent) {
		if (!progressBarEl) return;
		const rect = progressBarEl.getBoundingClientRect();
		const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
		hoverRatio = ratio;
		if (isDragging) {
			seekToEvent(e);
		}
	}

	function handleScrubberPointerUp(e: PointerEvent) {
		if (isDragging && progressBarEl) {
			isDragging = false;
			try {
				progressBarEl.releasePointerCapture(e.pointerId);
			} catch {}
			resetHideTimer();
		}
	}

	function handleScrubberPointerLeave() {
		if (!isDragging) {
			hoverRatio = null;
		}
	}

	function handleScrubberKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			seekRelative(-5);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			seekRelative(5);
		} else if (e.key === 'Home') {
			e.preventDefault();
			if (videoEl) {
				videoEl.currentTime = 0;
				currentTime = 0;
			}
		} else if (e.key === 'End') {
			e.preventDefault();
			const totalDuration = duration > 0 ? duration : (videoEl?.duration || 60);
			if (videoEl) {
				videoEl.currentTime = totalDuration;
				currentTime = totalDuration;
			}
		}
	}

	function handleWindowClick(e: MouseEvent) {
		if (isSpeedMenuOpen) {
			const target = e.target as HTMLElement;
			if (!target.closest('.speed-menu-container')) {
				isSpeedMenuOpen = false;
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!frameEl) return;
		const target = e.target as HTMLElement;
		const isInside = frameEl.contains(target);
		if (!isInside && document.activeElement !== frameEl) return;

		if (target.tagName === 'INPUT' && target.getAttribute('type') !== 'range') return;

		if (e.key === ' ' || e.key === 'k') {
			e.preventDefault();
			togglePlay();
		} else if (e.key === 'm') {
			e.preventDefault();
			setMuted(!isMuted);
		} else if (e.key === 'f') {
			e.preventDefault();
			toggleFullscreen();
		} else if (e.key === 'ArrowLeft' || e.key === 'j') {
			e.preventDefault();
			seekRelative(-5);
		} else if (e.key === 'ArrowRight' || e.key === 'l') {
			e.preventDefault();
			seekRelative(5);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (videoEl) {
				const nextVol = Math.min(1, videoEl.volume + 0.1);
				videoEl.volume = nextVol;
				volume = nextVol;
				if (nextVol > 0 && isMuted) {
					videoEl.muted = false;
					isMuted = false;
				}
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (videoEl) {
				const nextVol = Math.max(0, videoEl.volume - 0.1);
				videoEl.volume = nextVol;
				volume = nextVol;
				if (nextVol === 0) {
					videoEl.muted = true;
					isMuted = true;
				}
			}
		} else if (e.key === 'Escape' && isSpeedMenuOpen) {
			e.preventDefault();
			isSpeedMenuOpen = false;
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
			<div class="frame-aura" aria-hidden="true"></div>

			<!-- Main video showcase frame -->
			<div
				bind:this={frameEl}
				class="frame live"
				class:fullscreen={isFullscreen}
				class:controls-hidden={!showControls && isPlaying}
				role="region"
				aria-label="PocketMC video showcase"
				onmouseenter={resetHideTimer}
				onmousemove={handleMouseMove}
				onmouseleave={handleMouseLeave}
			>
				<div class="media-container video-container">
					<video
						bind:this={videoEl}
						bind:duration={duration}
						src={videoSrc}
						poster="/screenshots/screenshot-dashboard.webp"
						preload="auto"
						autoplay
						loop={isLooping}
						muted={isMuted}
						playsinline
						class="showcase-media"
						onplay={() => { isPlaying = true; syncMediaState(); }}
						onpause={() => { isPlaying = false; showControls = true; syncMediaState(); }}
						ontimeupdate={syncMediaState}
						onloadedmetadata={syncMediaState}
						ondurationchange={syncMediaState}
						onloadeddata={syncMediaState}
						oncanplay={syncMediaState}
						onprogress={syncMediaState}
						onratechange={() => { if (videoEl) playbackRate = videoEl.playbackRate; }}
						onvolumechange={() => { if (videoEl) { isMuted = videoEl.muted; volume = videoEl.volume; } }}
						onended={() => { if (!isLooping) isPlaying = false; }}
					>
						<track kind="captions" label="English" src="data:text/vtt,WEBVTT" default />
						Your browser does not support the video tag.
					</video>

					<button
						type="button"
						class="video-click-target"
						onclick={togglePlay}
						ondblclick={toggleFullscreen}
						aria-label={isPlaying ? 'Pause video' : 'Play video'}
					></button>
				</div>

				<!-- Center feedback animation badge -->
				{#if badgeVisible}
					<div class="center-badge" aria-hidden="true">
						{#if badgeType === 'play'}
							<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						{:else if badgeType === 'pause'}
							<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
								<rect x="6" y="4" width="4" height="16" rx="1" />
								<rect x="14" y="4" width="4" height="16" rx="1" />
							</svg>
						{:else if badgeType === 'rewind5'}
							<div class="badge-jump">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M11 19l-7-7 7-7" />
									<path d="M18 19l-7-7 7-7" />
								</svg>
								<span>-5s</span>
							</div>
						{:else if badgeType === 'forward5'}
							<div class="badge-jump">
								<span>+5s</span>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M13 5l7 7-7 7" />
									<path d="M6 5l7 7-7 7" />
								</svg>
							</div>
						{:else}
							<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
								<path d="M3 3v5h5" />
							</svg>
						{/if}
					</div>
				{/if}

				<!-- Overlay Player Controls -->
				<div
					class="player-overlay"
					class:visible={showControls || !isPlaying}
					tabindex="-1"
					role="toolbar"
					aria-label="Video playback options"
				>
					<!-- Scrubber Timeline -->
					<div
						bind:this={progressBarEl}
						class="scrubber-container"
						class:dragging={isDragging}
						role="slider"
						tabindex="0"
						aria-label="Seek video timeline"
						aria-valuemin="0"
						aria-valuemax={Math.round(duration || 60)}
						aria-valuenow={Math.round(currentTime)}
						aria-valuetext={formatTime(currentTime)}
						onpointerdown={handleScrubberPointerDown}
						onpointermove={handleScrubberPointerMove}
						onpointerup={handleScrubberPointerUp}
						onpointerleave={handleScrubberPointerLeave}
						onkeydown={handleScrubberKeydown}
					>
						{#if hoverRatio !== null && duration > 0}
							<div class="scrubber-tooltip" style="left: {hoverRatio * 100}%">
								{formatTime(hoverRatio * duration)}
							</div>
						{/if}

						<div class="scrubber-track">
							<div
								class="scrubber-buffered"
								style="width: {bufferedPercent}%"
							></div>
							{#if hoverRatio !== null}
								<div
									class="scrubber-hover"
									style="width: {hoverRatio * 100}%"
								></div>
							{/if}
							<div
								class="scrubber-played"
								style="width: {progressPercent}%"
							>
								<div class="scrubber-thumb"></div>
							</div>
						</div>
					</div>

					<!-- Floating Controls Bar -->
					<div class="controls-bar">
						<div class="controls-left">
							<button
								type="button"
								class="ctrl-btn main-play-btn"
								onclick={togglePlay}
								aria-label={isPlaying ? 'Pause video (Space)' : 'Play video (Space)'}
								title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
							>
								{#if isPlaying}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
										<rect x="6" y="4" width="4" height="16" rx="1" />
										<rect x="14" y="4" width="4" height="16" rx="1" />
									</svg>
								{:else}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="5 3 19 12 5 21 5 3" />
									</svg>
								{/if}
							</button>

							<button
								type="button"
								class="ctrl-btn jump-btn"
								onclick={() => seekRelative(-5)}
								aria-label="Rewind 5 seconds"
								title="Rewind 5s (Left Arrow / J)"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
									<path d="M3 3v5h5" />
									<text x="12" y="15.5" font-size="8.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif">5</text>
								</svg>
							</button>

							<button
								type="button"
								class="ctrl-btn jump-btn"
								onclick={() => seekRelative(5)}
								aria-label="Forward 5 seconds"
								title="Forward 5s (Right Arrow / L)"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.74 2.74L21 8" />
									<path d="M21 3v5h-5" />
									<text x="12" y="15.5" font-size="8.5" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif">5</text>
								</svg>
							</button>

							<div class="volume-group">
								<button
									type="button"
									class="ctrl-btn"
									onclick={() => setMuted(!isMuted)}
									aria-label={isMuted ? 'Unmute (M)' : 'Mute (M)'}
									title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
								>
									{#if isMuted || volume === 0}
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
											<line x1="23" y1="9" x2="17" y2="15" />
											<line x1="17" y1="9" x2="23" y2="15" />
										</svg>
									{:else if volume < 0.5}
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
											<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
										</svg>
									{:else}
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
											<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
											<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
										</svg>
									{/if}
								</button>
								<div class="volume-slider-wrapper">
									<input
										type="range"
										min="0"
										max="1"
										step="0.05"
										value={isMuted ? 0 : volume}
										oninput={handleVolumeChange}
										aria-label="Volume slider"
										class="volume-slider"
									/>
								</div>
							</div>

							<div class="time-display" aria-label="Playback time">
								<span class="time-current">{formatTime(currentTime)}</span>
								<span class="time-sep">/</span>
								<span class="time-total">{formatTime(duration)}</span>
							</div>
						</div>

						<div class="controls-right">
							<div class="speed-menu-container">
								<button
									type="button"
									class="ctrl-btn speed-btn"
									class:active={isSpeedMenuOpen}
									onclick={() => { isSpeedMenuOpen = !isSpeedMenuOpen; }}
									aria-expanded={isSpeedMenuOpen}
									aria-haspopup="true"
									aria-label="Playback speed"
									title="Playback Speed"
								>
									<span>{playbackRate === 1 ? '1x' : `${playbackRate}x`}</span>
								</button>

								{#if isSpeedMenuOpen}
									<div class="speed-dropdown" role="menu" aria-label="Playback speed options">
										<div class="speed-menu-header">Playback Speed</div>
										{#each speeds as rate}
											<button
												type="button"
												role="menuitemradio"
												aria-checked={playbackRate === rate}
												class="speed-option"
												class:selected={playbackRate === rate}
												onclick={() => setPlaybackRate(rate)}
											>
												<span>{rate === 1 ? '1x (Normal)' : `${rate}x`}</span>
												{#if playbackRate === rate}
													<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
														<polyline points="20 6 9 17 4 12" />
													</svg>
												{/if}
											</button>
										{/each}
									</div>
								{/if}
							</div>

							<button
								type="button"
								class="ctrl-btn"
								class:active={isLooping}
								onclick={toggleLoop}
								aria-pressed={isLooping}
								aria-label={isLooping ? 'Looping enabled' : 'Looping disabled'}
								title={isLooping ? 'Looping: On' : 'Looping: Off'}
							>
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="17 1 21 5 17 9" />
									<path d="M3 11V9a4 4 0 0 1 4-4h14" />
									<polyline points="7 23 3 19 7 15" />
									<path d="M21 13v2a4 4 0 0 1-4 4H3" />
								</svg>
							</button>

							{#if isPiPSupported}
								<button
									type="button"
									class="ctrl-btn"
									class:active={isPiPActive}
									onclick={togglePiP}
									aria-label={isPiPActive ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'}
									title="Picture-in-Picture"
								>
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<rect x="2" y="4" width="20" height="16" rx="2" />
										<rect x="12" y="10" width="8" height="8" rx="1" fill="currentColor" fill-opacity="0.3" />
									</svg>
								</button>
							{/if}

							<button
								type="button"
								class="ctrl-btn"
								onclick={toggleFullscreen}
								aria-label={isFullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'}
								title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
							>
								{#if isFullscreen}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M8 3v3a2 2 0 0 1-2 2H3" />
										<path d="M21 8h-3a2 2 0 0 1-2-2V3" />
										<path d="M3 16h3a2 2 0 0 1 2 2v3" />
										<path d="M16 21v-3a2 2 0 0 1 2-2h3" />
									</svg>
								{:else}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M15 3h6v6" />
										<path d="M9 21H3v-6" />
										<path d="M21 3l-7 7" />
										<path d="M3 21l7-7" />
									</svg>
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- External actions below showcase frame (only official YouTube link preserved) -->
			<div class="preview-actions">
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

	.frame-aura {
		position: absolute;
		top: -15px;
		left: 8%;
		right: 8%;
		height: 420px;
		background: radial-gradient(ellipse 70% 50% at 50% 25%, rgba(255, 255, 255, 0.08), transparent 70%);
		filter: blur(55px);
		pointer-events: none;
		z-index: 0;
	}

	.frame {
		position: relative;
		z-index: 1;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: #000000;
		box-shadow:
			var(--shadow),
			0 0 120px -20px rgba(0, 0, 0, 0.8);
		transition: box-shadow 0.3s ease, border-color 0.2s ease;
		outline: none;
		user-select: none;
	}

	.frame:focus-visible {
		border-color: var(--fg);
	}

	.frame.fullscreen {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		max-width: none;
		aspect-ratio: auto;
		border: none;
		border-radius: 0;
		z-index: 9999;
	}

	.media-container {
		width: 100%;
		height: 100%;
		position: relative;
		background: #000000;
		overflow: hidden;
		cursor: pointer;
	}

	.showcase-media {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}

	.video-click-target {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
		background: transparent;
		cursor: pointer;
		z-index: 1;
		padding: 0;
		margin: 0;
		outline: none;
	}

	.frame.fullscreen .showcase-media {
		object-fit: contain;
	}

	/* Center feedback badge */
	.center-badge {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 76px;
		height: 76px;
		border-radius: 50%;
		background: rgba(10, 10, 10, 0.76);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 10;
		animation: badgePop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.badge-jump {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	@keyframes badgePop {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.75);
		}
		35% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.05);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(1.25);
		}
	}

	/* On-frame video player overlay */
	.player-overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 32px 18px 14px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%);
		display: flex;
		flex-direction: column;
		gap: 10px;
		z-index: 5;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.22s ease;
	}

	.player-overlay.visible {
		opacity: 1;
		pointer-events: auto;
	}

	.frame.controls-hidden .player-overlay:not(.visible) {
		opacity: 0;
		pointer-events: none;
	}

	/* Scrubber Timeline */
	.scrubber-container {
		position: relative;
		width: 100%;
		height: 18px;
		display: flex;
		align-items: center;
		cursor: pointer;
		touch-action: none;
		outline: none;
	}

	.scrubber-track {
		position: relative;
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.22);
		transition: height 0.15s ease;
		overflow: visible;
	}

	.scrubber-container:hover .scrubber-track,
	.scrubber-container:focus-visible .scrubber-track {
		height: 6px;
	}

	.scrubber-buffered {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.32);
	}

	.scrubber-hover {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.42);
		pointer-events: none;
	}

	.scrubber-played {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		border-radius: 2px;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: width 0.1s linear;
	}

	.scrubber-container.dragging .scrubber-played {
		transition: none;
	}

	.scrubber-thumb {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		transform: translateX(50%) scale(1);
		transition: transform 0.15s ease;
	}

	.scrubber-container:hover .scrubber-thumb,
	.scrubber-container.dragging .scrubber-thumb,
	.scrubber-container:focus-visible .scrubber-thumb {
		transform: translateX(50%) scale(1.3);
	}

	.scrubber-tooltip {
		position: absolute;
		bottom: 22px;
		transform: translateX(-50%);
		padding: 3px 7px;
		border-radius: 4px;
		background: rgba(10, 10, 10, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: #ffffff;
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		pointer-events: none;
	}

	/* Controls Bar */
	.controls-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 12px;
	}

	.controls-left,
	.controls-right {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ctrl-btn {
		width: 32px;
		height: 32px;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: rgba(255, 255, 255, 0.85);
		cursor: pointer;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.ctrl-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		color: #ffffff;
	}

	.ctrl-btn.active {
		background: rgba(255, 255, 255, 0.22);
		color: #ffffff;
	}

	.main-play-btn {
		width: 34px;
		height: 34px;
	}

	.jump-btn svg text {
		user-select: none;
	}

	/* Volume Group */
	.volume-group {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.volume-slider-wrapper {
		width: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		transition: width 0.2s ease, margin 0.2s ease;
	}

	.volume-group:hover .volume-slider-wrapper,
	.volume-group:focus-within .volume-slider-wrapper {
		width: 62px;
		margin-right: 4px;
	}

	.volume-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 58px;
		height: 4px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.25);
		outline: none;
		cursor: pointer;
	}

	.volume-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
	}

	.volume-slider::-moz-range-thumb {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: none;
		background: #ffffff;
		cursor: pointer;
	}

	/* Time Display */
	.time-display {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.85);
		font-variant-numeric: tabular-nums;
		margin-left: 4px;
		user-select: none;
	}

	.time-sep {
		color: rgba(255, 255, 255, 0.45);
	}

	/* Speed Selector Menu */
	.speed-menu-container {
		position: relative;
	}

	.speed-btn {
		width: auto;
		min-width: 36px;
		padding: 0 7px;
		font-size: 12px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.speed-dropdown {
		position: absolute;
		bottom: 40px;
		right: 0;
		min-width: 130px;
		padding: 5px;
		border-radius: 8px;
		background: rgba(14, 14, 14, 0.95);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.16);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
		display: flex;
		flex-direction: column;
		gap: 2px;
		z-index: 20;
	}

	.speed-menu-header {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: rgba(255, 255, 255, 0.4);
		padding: 4px 8px 3px;
	}

	.speed-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 8px;
		border-radius: 5px;
		border: none;
		background: transparent;
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.speed-option:hover {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
	}

	.speed-option.selected {
		background: rgba(255, 255, 255, 0.18);
		color: #ffffff;
		font-weight: 600;
	}

	/* Action controls below showcase frame */
	.preview-actions {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 24px;
	}

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
			padding: 28px 0 40px;
		}

		.player-overlay {
			padding: 24px 12px 10px;
		}

		.volume-slider-wrapper {
			display: none;
		}

		.preview-actions {
			margin-top: 16px;
		}

		.youtube-tab {
			height: 36px;
			font-size: 12px;
			padding: 0 11px;
		}
	}

	@media (max-width: 480px) {
		.time-total {
			display: none;
		}

		.time-sep {
			display: none;
		}
	}
</style>
