<script lang="ts">
	import { onMount } from 'svelte';
	import { galleryItems, type GalleryItem } from '$lib/data/gallery';

	type FilterCategory = 'all' | 'desktop' | 'mobile';
	type ViewMode = 'scroll' | 'grid';

	let activeFilter = $state<FilterCategory>('all');
	let viewMode = $state<ViewMode>('scroll');
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
		if (viewMode === 'scroll' && trackElement) {
			const y = trackElement.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
		}
	}

	function jumpTo(index: number) {
		if (index < 0 || index >= filteredItems.length) return;
		activeIndex = index;
		if (viewMode === 'scroll' && trackElement) {
			const totalScrollable = trackElement.offsetHeight - window.innerHeight;
			const targetScroll = (index / (filteredItems.length - 1 || 1)) * totalScrollable;
			const trackTop = trackElement.getBoundingClientRect().top + window.scrollY;
			isScrolling = true;
			window.scrollTo({ top: trackTop + targetScroll, behavior: 'smooth' });
			setTimeout(() => {
				isScrolling = false;
			}, 400);
		}
	}

	function next() {
		jumpTo((activeIndex + 1) % filteredItems.length);
	}

	function prev() {
		jumpTo((activeIndex - 1 + filteredItems.length) % filteredItems.length);
	}

	function handleScroll() {
		if (isScrolling || !trackElement || viewMode !== 'scroll') return;
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
	<title>Gallery · PocketMC</title>
	<meta
		name="description"
		content="Screenshots of PocketMC on desktop and mobile."
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
		} else if (viewMode === 'scroll') {
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		}
	}}
/>

<div class="gallery-page">
	<!-- Casual, simple header -->
	<header class="section gallery-hero">
		<span class="cross start"></span>
		<span class="cross end"></span>

		<div class="page hero-content">
			<h1>Gallery</h1>
			<p class="subtitle">Screenshots of PocketMC across desktop and mobile.</p>

			<!-- Simple clean control bar: category filter + view mode toggle -->
			<div class="controls-bar">
				<div class="switch" role="tablist" aria-label="Filter gallery">
					<button
						type="button"
						role="tab"
						class="switch-btn"
						class:on={activeFilter === 'all'}
						aria-selected={activeFilter === 'all'}
						onclick={() => setFilter('all')}
					>
						<span>All</span>
					</button>

					<button
						type="button"
						role="tab"
						class="switch-btn"
						class:on={activeFilter === 'desktop'}
						aria-selected={activeFilter === 'desktop'}
						onclick={() => setFilter('desktop')}
					>
						<span>Desktop</span>
					</button>

					<button
						type="button"
						role="tab"
						class="switch-btn"
						class:on={activeFilter === 'mobile'}
						aria-selected={activeFilter === 'mobile'}
						onclick={() => setFilter('mobile')}
					>
						<span>Mobile</span>
					</button>
				</div>

				<div class="switch view-switch" role="tablist" aria-label="Layout mode">
					<button
						type="button"
						role="tab"
						class="switch-btn"
						class:on={viewMode === 'scroll'}
						aria-selected={viewMode === 'scroll'}
						onclick={() => (viewMode = 'scroll')}
					>
						<span>Scroll</span>
					</button>

					<button
						type="button"
						role="tab"
						class="switch-btn"
						class:on={viewMode === 'grid'}
						aria-selected={viewMode === 'grid'}
						onclick={() => (viewMode = 'grid')}
					>
						<span>Grid</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	{#if viewMode === 'scroll'}
		<!-- Sticky Scroll Mode: page stays stick while photos change as you scroll -->
		<div
			class="scroll-track"
			bind:this={trackElement}
			style="--count: {filteredItems.length};"
		>
			<div class="sticky-stage">
				<!-- Subtle ambient backlight -->
				<div class="ambient-glow" aria-hidden="true"></div>

				<div class="page stage-inner">
					<!-- Clean, border-framed photo container -->
					<div class="frame-wrap" class:portrait-mode={currentItem.orientation === 'portrait'}>
						<button
							type="button"
							class="photo-frame"
							class:portrait={currentItem.orientation === 'portrait'}
							onclick={() => (lightboxItem = currentItem)}
							aria-label="View {currentItem.title} full size"
							title="Click to view full size"
						>
							<img
								src={currentItem.src}
								alt={currentItem.title}
								class="photo-img"
								class:portrait={currentItem.orientation === 'portrait'}
							/>
						</button>
					</div>

					<!-- Casual, minimal footer bar -->
					<div class="caption-bar">
						<div class="caption-text">
							<span class="photo-title">{currentItem.title}</span>
							<span class="caption-sep">·</span>
							<span class="photo-desc">{currentItem.caption}</span>
						</div>

						<div class="bar-controls">
							<span class="step-indicator">{activeIndex + 1} of {filteredItems.length}</span>

							<div class="arrows">
								<button
									type="button"
									class="ctrl-btn"
									aria-label="Previous screenshot"
									onclick={prev}
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="15 18 9 12 15 6" />
									</svg>
								</button>

								<button
									type="button"
									class="ctrl-btn"
									aria-label="Next screenshot"
									onclick={next}
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="9 18 15 12 9 6" />
									</svg>
								</button>
							</div>

							<button
								type="button"
								class="expand-btn"
								title="View full size"
								onclick={() => (lightboxItem = currentItem)}
							>
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="15 3 21 3 21 9" />
									<polyline points="9 21 3 21 3 15" />
									<line x1="21" y1="3" x2="14" y2="10" />
									<line x1="3" y1="21" x2="10" y2="14" />
								</svg>
							</button>
						</div>
					</div>

					<!-- Simple minimal dots -->
					<div class="dots-row">
						{#each filteredItems as item, idx (item.id)}
							<button
								type="button"
								class="dot"
								class:on={idx === activeIndex}
								aria-label="Screenshot {idx + 1}: {item.title}"
								onclick={() => jumpTo(idx)}
							></button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- Casual Grid View -->
		<section class="section grid-section">
			<div class="page grid-inner">
				<div class="cards-grid">
					{#each filteredItems as item (item.id)}
						<button
							type="button"
							class="grid-card"
							class:portrait-card={item.orientation === 'portrait'}
							onclick={() => (lightboxItem = item)}
							aria-label="View {item.title} full size"
						>
							<div class="card-thumb" class:portrait-thumb={item.orientation === 'portrait'}>
								<img src={item.src} alt={item.title} loading="lazy" />
							</div>
							<div class="card-meta">
								<span class="card-title">{item.title}</span>
								<p class="card-desc">{item.caption}</p>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Simple, clean Lightbox -->
	{#if lightboxItem}
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onkeydown={(e) => {
				if (e.key === 'Escape') lightboxItem = null;
			}}
			onclick={(e) => {
				if (e.target === e.currentTarget) lightboxItem = null;
			}}
		>
			<div class="lb-bar">
				<div class="lb-title-wrap">
					<span class="lb-title">{lightboxItem.title}</span>
					<span class="lb-caption">{lightboxItem.caption}</span>
				</div>

				<button
					type="button"
					class="lb-close"
					aria-label="Close"
					onclick={() => (lightboxItem = null)}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>

			<div class="lb-stage">
				<img
					src={lightboxItem.src}
					alt={lightboxItem.title}
					class="lb-img"
					class:portrait={lightboxItem.orientation === 'portrait'}
				/>
			</div>

			<div class="lb-nav-wrap">
				<button
					type="button"
					class="lb-arrow prev"
					aria-label="Previous"
					onclick={() => {
						const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
						if (idx !== -1)
							lightboxItem = filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length];
					}}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<button
					type="button"
					class="lb-arrow next"
					aria-label="Next"
					onclick={() => {
						const idx = filteredItems.findIndex((it) => it.id === lightboxItem?.id);
						if (idx !== -1) lightboxItem = filteredItems[(idx + 1) % filteredItems.length];
					}}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

	/* Hero Section: Simple, confident, human */
	.gallery-hero {
		padding-top: 54px;
		padding-bottom: 28px;
		text-align: center;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-content h1 {
		font-size: clamp(32px, 5vw, 44px);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--fg);
		margin: 0 0 8px;
	}

	.subtitle {
		font-size: 15px;
		color: var(--muted-fg);
		margin: 0 0 24px;
	}

	/* Controls row */
	.controls-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.switch {
		height: 36px;
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	.switch-btn {
		height: 100%;
		padding: 0 14px;
		display: inline-flex;
		align-items: center;
		border-radius: calc(var(--radius) - 4px);
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		transition: color 0.15s ease, background-color 0.15s ease;
	}

	.switch-btn:hover {
		color: var(--fg);
	}

	.switch-btn.on {
		background: var(--secondary-active);
		color: var(--fg);
	}

	/* Scroll Track: Casual scroll travel */
	.scroll-track {
		position: relative;
		height: calc(var(--count, 15) * 50vh + 100vh);
	}

	.sticky-stage {
		position: sticky;
		top: 72px;
		height: calc(100vh - 84px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		z-index: 5;
	}

	.ambient-glow {
		position: absolute;
		top: 10%;
		left: 15%;
		right: 15%;
		height: 360px;
		background: radial-gradient(ellipse 70% 50% at 50% 25%, rgba(34, 197, 94, 0.12), transparent 70%);
		filter: blur(60px);
		pointer-events: none;
		z-index: 0;
	}

	.stage-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1120px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	/* Photo container: adapts naturally to landscape and portrait */
	.frame-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.photo-frame {
		width: 100%;
		max-height: calc(100vh - 250px);
		aspect-ratio: 16 / 10;
		padding: 0;
		background: #000;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: zoom-in;
		transition: border-color 0.15s ease;
	}

	.photo-frame:hover {
		border-color: var(--dim);
	}

	/* Portrait screenshot on desktop: natural phone proportions with zero fake notch */
	.photo-frame.portrait {
		width: auto;
		max-width: 310px;
		aspect-ratio: 9 / 19.5;
		margin: 0 auto;
		border-radius: 24px;
	}

	.photo-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		transition: opacity 0.2s ease;
	}

	.photo-img.portrait {
		object-fit: cover;
	}

	/* Casual caption footer bar */
	.caption-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: 14px;
		padding: 0 4px;
		gap: 16px;
	}

	.caption-text {
		display: flex;
		align-items: baseline;
		gap: 8px;
		flex-wrap: wrap;
	}

	.photo-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--fg);
	}

	.caption-sep {
		color: var(--dim);
	}

	.photo-desc {
		font-size: 13.5px;
		color: var(--muted-fg);
	}

	.bar-controls {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.step-indicator {
		font-size: 12px;
		font-family: var(--mono);
		color: var(--dim);
		margin-right: 4px;
	}

	.arrows {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.ctrl-btn {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--dim);
		transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
	}

	.ctrl-btn:hover {
		color: var(--fg);
		background: var(--secondary-hover);
		border-color: var(--dim);
	}

	.expand-btn {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--dim);
		transition: color 0.15s ease, background-color 0.15s ease;
	}

	.expand-btn:hover {
		color: var(--fg);
		background: var(--secondary-hover);
	}

	/* Simple minimal dots */
	.dots-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		margin-top: 12px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.dots-row::-webkit-scrollbar {
		display: none;
	}

	.dot {
		width: 14px;
		height: 10px;
		padding: 0;
		border: none;
		background: transparent;
		position: relative;
	}

	.dot::before {
		content: '';
		position: absolute;
		top: 4px;
		left: 0;
		width: 100%;
		height: 2px;
		border-radius: 1px;
		background: var(--faint);
		transition: background-color 0.15s ease;
	}

	.dot:hover::before {
		background: var(--muted-fg);
	}

	.dot.on::before {
		background: var(--fg);
	}

	/* Grid View Mode */
	.grid-section {
		padding-bottom: 72px;
	}

	.grid-inner {
		width: 100%;
		max-width: 1180px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 24px;
	}

	.grid-card {
		padding: 0;
		font: inherit;
		text-align: left;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
		cursor: zoom-in;
		transition: border-color 0.15s ease, transform 0.15s ease;
	}

	.grid-card:hover {
		border-color: var(--border);
		transform: translateY(-2px);
	}

	.card-thumb {
		width: 100%;
		aspect-ratio: 16 / 10;
		background: #000;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.card-thumb.portrait-thumb {
		aspect-ratio: 9 / 16;
	}

	.card-meta {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.card-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--fg);
	}

	.card-desc {
		font-size: 12.5px;
		color: var(--muted-fg);
		margin: 0;
		line-height: 1.4;
	}

	/* Lightbox */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(5, 5, 5, 0.94);
		backdrop-filter: blur(14px);
		display: flex;
		flex-direction: column;
	}

	.lb-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px;
		border-bottom: 1px solid var(--border);
		background: rgba(10, 10, 10, 0.85);
	}

	.lb-title-wrap {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	.lb-title {
		font-size: 15px;
		font-weight: 600;
		color: var(--fg);
	}

	.lb-caption {
		font-size: 13px;
		color: var(--muted-fg);
	}

	.lb-close {
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--fg);
	}

	.lb-close:hover {
		background: var(--secondary-hover);
	}

	.lb-stage {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		overflow: hidden;
	}

	.lb-img {
		max-width: 95vw;
		max-height: 85vh;
		object-fit: contain;
		border-radius: var(--radius);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
	}

	.lb-img.portrait {
		max-height: 88vh;
		border-radius: 20px;
	}

	.lb-nav-wrap {
		position: absolute;
		inset: 0;
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
	}

	.lb-arrow {
		pointer-events: auto;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(20, 20, 20, 0.85);
		color: var(--fg);
		backdrop-filter: blur(8px);
	}

	.lb-arrow:hover {
		background: var(--secondary-hover);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.gallery-hero {
			padding-top: 36px;
			padding-bottom: 20px;
		}

		.hero-content h1 {
			font-size: 28px;
		}

		.subtitle {
			font-size: 13.5px;
			margin-bottom: 18px;
		}

		.controls-bar {
			gap: 8px;
		}

		.switch {
			height: 34px;
		}

		.switch-btn {
			padding: 0 10px;
			font-size: 12px;
		}

		.scroll-track {
			height: calc(var(--count, 15) * 45vh + 100vh);
		}

		.sticky-stage {
			top: 60px;
			height: calc(100vh - 68px);
		}

		.stage-inner {
			padding-inline: 12px;
		}

		.photo-frame {
			max-height: 250px;
			aspect-ratio: 16 / 10;
		}

		.photo-frame.portrait {
			max-width: 220px;
			max-height: 380px;
			border-radius: 20px;
		}

		.caption-bar {
			margin-top: 10px;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		.photo-title {
			font-size: 13px;
		}

		.photo-desc {
			font-size: 12px;
		}

		.bar-controls {
			width: 100%;
			justify-content: space-between;
		}

		.dots-row {
			margin-top: 8px;
		}

		.cards-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.lb-title-wrap {
			flex-direction: column;
			gap: 2px;
		}

		.lb-caption {
			display: none;
		}
	}
</style>
