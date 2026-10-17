<script lang="ts">
	import { onMount } from 'svelte';
	import { galleryItems, type GalleryItem } from '$lib/data/gallery';

	type FilterCategory = 'all' | 'desktop' | 'mobile';

	let activeFilter = $state<FilterCategory>('all');
	let activeIndex = $state(0);
	let trackElement = $state<HTMLElement | null>(null);
	let isScrolling = false;
	let lightboxItem = $state<GalleryItem | null>(null);

	const filteredItems = $derived.by(() => {
		if (activeFilter === 'all') return galleryItems;
		return galleryItems.filter((item) => item.category === activeFilter);
	});

	const currentItem = $derived(filteredItems[activeIndex] ?? filteredItems[0]);

	function setFilter(filter: FilterCategory) {
		activeFilter = filter;
		activeIndex = 0;
		if (trackElement) {
			const y = trackElement.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
		}
	}

	function jumpTo(index: number) {
		if (index < 0 || index >= filteredItems.length) return;
		activeIndex = index;
		if (trackElement) {
			const totalScrollable = trackElement.offsetHeight - window.innerHeight;
			const targetScroll = (index / (filteredItems.length - 1 || 1)) * totalScrollable;
			const trackTop = trackElement.getBoundingClientRect().top + window.scrollY;
			isScrolling = true;
			window.scrollTo({ top: trackTop + targetScroll, behavior: 'smooth' });
			setTimeout(() => {
				isScrolling = false;
			}, 600);
		}
	}

	function next() {
		jumpTo((activeIndex + 1) % filteredItems.length);
	}

	function prev() {
		jumpTo((activeIndex - 1 + filteredItems.length) % filteredItems.length);
	}

	function handleScroll() {
		if (isScrolling || !trackElement) return;
		const rect = trackElement.getBoundingClientRect();
		const totalScrollable = trackElement.offsetHeight - window.innerHeight;
		if (totalScrollable <= 0) return;

		const currentScroll = -rect.top;
		const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
		const calculatedIndex = Math.min(
			Math.floor(progress * filteredItems.length),
			filteredItems.length - 1
		);

		if (calculatedIndex !== activeIndex && calculatedIndex >= 0) {
			activeIndex = calculatedIndex;
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Interface Gallery · PocketMC</title>
	<meta
		name="description"
		content="Explore PocketMC's native interface across desktop and mobile. Zero router setup, Adoptium Java provisioning, and automated cloud backups."
	/>
</svelte:head>

<svelte:window
	onkeydown={(e) => {
		if (lightboxItem) {
			if (e.key === 'Escape') lightboxItem = null;
			if (e.key === 'ArrowRight') {
				const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
				if (idx !== -1) lightboxItem = filteredItems[(idx + 1) % filteredItems.length];
			}
			if (e.key === 'ArrowLeft') {
				const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
				if (idx !== -1)
					lightboxItem = filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length];
			}
		} else {
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		}
	}}
/>

<div class="gallery-page">
	<!-- Page Header -->
	<header class="section gallery-hero">
		<span class="cross start"></span>
		<span class="cross end"></span>

		<div class="page hero-content">
			<div class="kicker-pill">
				<span class="dot-kicker" aria-hidden="true"></span>
				<span>Visual Showcase</span>
			</div>

			<h1 class="hero-title">Interface Gallery</h1>
			<p class="hero-subtitle">
				Scroll through the native desktop application and companion mobile interface. Built with
				Rust, modern web standards, and zero system dependencies.
			</p>

			<!-- Filter segmented switcher matching ThemeSwitch -->
			<div class="filter-bar">
				<div class="switch" role="tablist" aria-label="Gallery category filters">
					<button
						type="button"
						role="tab"
						class="filter-btn"
						class:on={activeFilter === 'all'}
						aria-selected={activeFilter === 'all'}
						onclick={() => setFilter('all')}
					>
						<span>All Screens ({galleryItems.length})</span>
					</button>

					<button
						type="button"
						role="tab"
						class="filter-btn"
						class:on={activeFilter === 'desktop'}
						aria-selected={activeFilter === 'desktop'}
						onclick={() => setFilter('desktop')}
					>
						<span>Desktop UI ({galleryItems.filter((i) => i.category === 'desktop').length})</span>
					</button>

					<button
						type="button"
						role="tab"
						class="filter-btn"
						class:on={activeFilter === 'mobile'}
						aria-selected={activeFilter === 'mobile'}
						onclick={() => setFilter('mobile')}
					>
						<span>Mobile App ({galleryItems.filter((i) => i.category === 'mobile').length})</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Sticky Scroll Track Container -->
	<!-- The height expands based on item count so scrolling stays smooth -->
	<div
		class="scroll-track"
		bind:this={trackElement}
		style="--slides-count: {filteredItems.length};"
	>
		<div class="sticky-viewport">
			<!-- Subtle ambient backlight glow -->
			<div class="stage-aura" aria-hidden="true"></div>

			<div class="page stage-container">
				<!-- Stage Control HUD -->
				<div class="stage-hud">
					<div class="hud-left">
						<span class="count-pill">
							<span class="count-current">{String(activeIndex + 1).padStart(2, '0')}</span>
							<span class="count-sep">/</span>
							<span class="count-total">{String(filteredItems.length).padStart(2, '0')}</span>
						</span>

						<span class="badge-category" class:mobile={currentItem.category === 'mobile'}>
							{currentItem.category === 'mobile' ? 'Mobile Companion' : 'Desktop Interface'}
						</span>

						<span class="kicker-tag">{currentItem.kicker}</span>
					</div>

					<div class="hud-right">
						<button
							type="button"
							class="nav-btn"
							aria-label="Previous screenshot"
							onclick={prev}
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						<button
							type="button"
							class="nav-btn"
							aria-label="Next screenshot"
							onclick={next}
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>

						<button
							type="button"
							class="inspect-btn"
							title="Inspect full resolution"
							onclick={() => (lightboxItem = currentItem)}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="15 3 21 3 21 9" />
								<polyline points="9 21 3 21 3 15" />
								<line x1="21" y1="3" x2="14" y2="10" />
								<line x1="3" y1="21" x2="10" y2="14" />
							</svg>
							<span>Inspect</span>
						</button>
					</div>
				</div>

				<!-- Main Display Stage: Adapts to Desktop vs Mobile Aspect Ratios -->
				<div class="media-stage">
					{#if currentItem.orientation === 'portrait'}
						<!-- Authentic Mobile Device Mockup Frame -->
						<div class="device-phone" role="region" aria-label="Mobile phone preview">
							<div class="notch-island" aria-hidden="true"></div>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<img
								src={currentItem.src}
								alt={currentItem.title}
								class="phone-media"
								onclick={() => (lightboxItem = currentItem)}
							/>
						</div>
					{:else}
						<!-- Clean Desktop Window Frame -->
						<div class="desktop-frame" role="region" aria-label="Desktop screenshot preview">
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<img
								src={currentItem.src}
								alt={currentItem.title}
								class="desktop-media"
								onclick={() => (lightboxItem = currentItem)}
							/>
						</div>
					{/if}
				</div>

				<!-- Info Drawer with Bullets -->
				<div class="stage-footer">
					<div class="info-meta">
						<div class="meta-heading">
							<h2>{currentItem.title}</h2>
							<span class="aspect-badge">
								{currentItem.orientation === 'portrait' ? '9:19.5 Mobile' : '16:10 Desktop'} · {currentItem.width}×{currentItem.height}
							</span>
						</div>
						<p>{currentItem.description}</p>
					</div>

					<ul class="bullets">
						{#each currentItem.bullets as bullet}
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

				<!-- Step Indicator Scrubber -->
				<div class="scrubber-bar">
					<div class="progress-track">
						<div
							class="progress-fill"
							style="width: {((activeIndex + 1) / filteredItems.length) * 100}%;"
						></div>
					</div>

					<div class="scrub-dots">
						{#each filteredItems as item, idx (item.id)}
							<button
								type="button"
								class="dot-btn"
								class:on={idx === activeIndex}
								title="{item.title} ({idx + 1}/{filteredItems.length})"
								aria-label="Jump to {item.title}"
								onclick={() => jumpTo(idx)}
							></button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Fullscreen Lightbox Modal -->
	{#if lightboxItem}
		<div
			class="lightbox-overlay"
			role="dialog"
			aria-modal="true"
			aria-label="Image Lightbox"
			tabindex="-1"
			onkeydown={(e) => {
				if (e.key === 'Escape') lightboxItem = null;
			}}
			onclick={(e) => {
				if (e.target === e.currentTarget) lightboxItem = null;
			}}
		>
			<div class="lightbox-header">
				<div class="lightbox-info">
					<span class="lightbox-kicker">{lightboxItem.kicker}</span>
					<span class="lightbox-title">{lightboxItem.title}</span>
					<span class="lightbox-dims">{lightboxItem.width}×{lightboxItem.height} px</span>
				</div>

				<button
					type="button"
					class="close-btn"
					aria-label="Close lightbox"
					onclick={() => (lightboxItem = null)}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>

			<div class="lightbox-body">
				<img
					src={lightboxItem.src}
					alt={lightboxItem.title}
					class="lightbox-img"
					class:portrait={lightboxItem.orientation === 'portrait'}
				/>
			</div>

			<div class="lightbox-controls">
				<button
					type="button"
					class="lb-nav-btn prev"
					aria-label="Previous image"
					onclick={() => {
						const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
						if (idx !== -1)
							lightboxItem = filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length];
					}}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<button
					type="button"
					class="lb-nav-btn next"
					aria-label="Next image"
					onclick={() => {
						const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
						if (idx !== -1) lightboxItem = filteredItems[(idx + 1) % filteredItems.length];
					}}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.gallery-page {
		position: relative;
		min-height: 100vh;
	}

	/* Hero Section */
	.gallery-hero {
		padding-top: 54px;
		padding-bottom: 36px;
		text-align: center;
		position: relative;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.kicker-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 13px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: var(--card);
		font-size: 12px;
		font-weight: 500;
		color: var(--muted-fg);
		margin-bottom: 18px;
	}

	.dot-kicker {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 10px rgba(34, 197, 94, 0.7);
	}

	.hero-title {
		font-size: clamp(32px, 5vw, 48px);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--fg);
		margin-bottom: 12px;
	}

	.hero-subtitle {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted-fg);
		max-width: 620px;
		margin-bottom: 28px;
	}

	/* Segmented Filter Switch */
	.filter-bar {
		display: flex;
		justify-content: center;
		width: 100%;
	}

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

	.filter-btn {
		height: 100%;
		padding: 0 16px;
		display: inline-flex;
		align-items: center;
		border-radius: calc(var(--radius) - 4px);
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		transition: color 0.15s ease, background-color 0.15s ease;
	}

	.filter-btn:hover {
		color: var(--fg);
	}

	.filter-btn.on {
		background: var(--secondary-active);
		color: var(--fg);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}

	/* Sticky Scroll Track: outer container provides vertical scroll budget */
	.scroll-track {
		position: relative;
		/* Each slide affords roughly 65vh of intuitive scroll travel */
		height: calc(var(--slides-count, 15) * 65vh + 100vh);
	}

	/* Inner viewport stays firmly sticky on screen */
	.sticky-viewport {
		position: sticky;
		top: 68px;
		height: calc(100vh - 78px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		z-index: 10;
	}

	/* Ambient backlight glow */
	.stage-aura {
		position: absolute;
		top: 5%;
		left: 10%;
		right: 10%;
		height: 380px;
		background: radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34, 197, 94, 0.14), transparent 70%);
		filter: blur(65px);
		pointer-events: none;
		z-index: 0;
	}

	.stage-container {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1160px;
		height: 100%;
		max-height: 820px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	/* HUD Header Bar */
	.stage-hud {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 14px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		margin-bottom: 12px;
		flex-shrink: 0;
	}

	.hud-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.count-pill {
		font-size: 13px;
		font-family: var(--mono);
		font-weight: 600;
		color: var(--fg);
		background: var(--secondary);
		padding: 3px 8px;
		border-radius: 6px;
		border: 1px solid var(--border);
	}

	.count-sep {
		color: var(--dim);
		margin: 0 1px;
	}

	.count-total {
		color: var(--muted-fg);
	}

	.badge-category {
		font-size: 11.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 3px 9px;
		border-radius: 6px;
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.25);
	}

	.badge-category.mobile {
		background: rgba(59, 130, 246, 0.12);
		color: #60a5fa;
		border-color: rgba(59, 130, 246, 0.25);
	}

	.kicker-tag {
		font-size: 11.5px;
		font-weight: 500;
		color: var(--muted-fg);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.hud-right {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.nav-btn {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
		color: var(--fg);
		transition: background-color 0.15s ease, border-color 0.15s ease;
	}

	.nav-btn:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	.inspect-btn {
		height: 32px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
		color: var(--fg);
		font-size: 12.5px;
		font-weight: 500;
		transition: background-color 0.15s ease, border-color 0.15s ease;
	}

	.inspect-btn:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	/* Media Stage Container */
	.media-stage {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding-block: 4px;
	}

	/* Desktop Screenshot Frame */
	.desktop-frame {
		width: 100%;
		height: 100%;
		max-height: 460px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow), var(--glow);
		overflow: hidden;
		position: relative;
		cursor: zoom-in;
	}

	.desktop-media {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		transition: opacity 0.25s ease, transform 0.25s ease;
	}

	/* Mobile Phone Mockup Frame */
	.device-phone {
		width: 100%;
		max-width: 250px;
		height: 100%;
		max-height: 480px;
		aspect-ratio: 9 / 19.5;
		margin: 0 auto;
		background: #000;
		border: 4px solid var(--border);
		border-radius: 36px;
		box-shadow:
			0 25px 60px -15px rgba(0, 0, 0, 0.85),
			0 0 35px rgba(34, 197, 94, 0.15);
		overflow: hidden;
		position: relative;
		cursor: zoom-in;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notch-island {
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 68px;
		height: 16px;
		border-radius: 8px;
		background: #000;
		border: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 10;
		pointer-events: none;
	}

	.phone-media {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: opacity 0.25s ease;
	}

	/* Info & Feature Highlights Footer Drawer */
	.stage-footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		padding: 16px 22px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		margin-top: 10px;
		flex-shrink: 0;
		text-align: left;
	}

	.info-meta {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meta-heading {
		display: flex;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
	}

	.meta-heading h2 {
		font-size: 17px;
		font-weight: 600;
		color: var(--fg);
		margin: 0;
	}

	.aspect-badge {
		font-size: 11px;
		font-family: var(--mono);
		color: var(--dim);
	}

	.info-meta p {
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted-fg);
		margin: 0;
	}

	.bullets {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
		justify-content: center;
	}

	.bullets li {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 12.5px;
		line-height: 1.4;
		color: var(--fg);
	}

	.check-icon {
		flex-shrink: 0;
		margin-top: 1px;
		color: #22c55e;
	}

	/* Scrubber Progress Bar */
	.scrubber-bar {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 10px;
		flex-shrink: 0;
	}

	.progress-track {
		width: 100%;
		height: 3px;
		background: var(--secondary);
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #22c55e;
		box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
		transition: width 0.2s ease;
	}

	.scrub-dots {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		overflow-x: auto;
		padding-block: 2px;
		scrollbar-width: none;
	}

	.scrub-dots::-webkit-scrollbar {
		display: none;
	}

	.dot-btn {
		width: 14px;
		height: 8px;
		padding: 0;
		position: relative;
		border: none;
		background: transparent;
	}

	.dot-btn::before {
		content: '';
		position: absolute;
		top: 3px;
		left: 0;
		width: 100%;
		height: 2px;
		border-radius: 1px;
		background: var(--faint);
		transition: background-color 0.15s ease, transform 0.15s ease;
	}

	.dot-btn:hover::before {
		background: var(--muted-fg);
	}

	.dot-btn.on::before {
		background: #22c55e;
		transform: scaleY(1.5);
	}

	/* Fullscreen Lightbox */
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(5, 5, 5, 0.94);
		backdrop-filter: blur(14px);
		display: flex;
		flex-direction: column;
	}

	.lightbox-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 24px;
		border-bottom: 1px solid var(--border);
		background: rgba(10, 10, 10, 0.85);
	}

	.lightbox-info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.lightbox-kicker {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #22c55e;
	}

	.lightbox-title {
		font-size: 15px;
		font-weight: 600;
		color: var(--fg);
	}

	.lightbox-dims {
		font-size: 12px;
		font-family: var(--mono);
		color: var(--dim);
	}

	.close-btn {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
		color: var(--fg);
	}

	.close-btn:hover {
		background: var(--secondary-hover);
	}

	.lightbox-body {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		overflow: hidden;
	}

	.lightbox-img {
		max-width: 95vw;
		max-height: 85vh;
		object-fit: contain;
		border-radius: var(--radius);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
	}

	.lightbox-img.portrait {
		max-height: 88vh;
		border-radius: 24px;
		border: 3px solid var(--border);
	}

	.lightbox-controls {
		position: absolute;
		inset: 0;
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
	}

	.lb-nav-btn {
		pointer-events: auto;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(20, 20, 20, 0.85);
		color: var(--fg);
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
	}

	.lb-nav-btn:hover {
		background: var(--secondary-hover);
	}

	/* Responsive Optimization for Smartphones & Small Screens */
	@media (max-width: 768px) {
		.gallery-hero {
			padding-top: 36px;
			padding-bottom: 24px;
		}

		.hero-title {
			font-size: 28px;
		}

		.hero-subtitle {
			font-size: 13.5px;
			margin-bottom: 20px;
		}

		.filter-bar .switch {
			height: 36px;
		}

		.filter-btn {
			padding: 0 12px;
			font-size: 12px;
		}

		/* Mobile sticky height & layout */
		.scroll-track {
			height: calc(var(--slides-count, 15) * 55vh + 100vh);
		}

		.sticky-viewport {
			top: 60px;
			height: calc(100vh - 68px);
		}

		.stage-container {
			padding-inline: 12px;
		}

		.stage-hud {
			padding: 6px 10px;
			margin-bottom: 8px;
		}

		.kicker-tag {
			display: none;
		}

		.desktop-frame {
			max-height: 240px;
			aspect-ratio: 16 / 10;
		}

		.device-phone {
			max-width: 190px;
			max-height: 340px;
			border-radius: 28px;
		}

		.notch-island {
			width: 50px;
			height: 12px;
			top: 6px;
		}

		.stage-footer {
			grid-template-columns: 1fr;
			gap: 12px;
			padding: 12px 14px;
			margin-top: 8px;
		}

		.meta-heading h2 {
			font-size: 15px;
		}

		.info-meta p {
			font-size: 12px;
			line-height: 1.4;
		}

		.bullets {
			gap: 6px;
		}

		.bullets li {
			font-size: 11.5px;
		}

		.scrubber-bar {
			margin-top: 6px;
		}

		.dot-btn {
			width: 10px;
		}
	}
</style>
