<script lang="ts">
	import { categories, galleryItems, type CategoryId, type GalleryItem } from '$lib/data/gallery';

	let activeCategory = $state<CategoryId>('all');
	let lightboxItem = $state<GalleryItem | null>(null);

	const visibleItems = $derived.by(() => {
		if (activeCategory === 'all') return galleryItems;
		return galleryItems.filter((item) => item.categoryId === activeCategory);
	});

	// Distinct sections when viewing "all"
	const sections = $derived.by(() => {
		const distinct = categories.filter((c) => c.id !== 'all');
		return distinct
			.map((cat) => ({
				...cat,
				items: galleryItems.filter((i) => i.categoryId === cat.id)
			}))
			.filter((sec) => sec.items.length > 0);
	});

	function openLightbox(item: GalleryItem) {
		lightboxItem = item;
	}

	function closeLightbox() {
		lightboxItem = null;
	}

	function nextLightbox() {
		if (!lightboxItem) return;
		const list = visibleItems;
		const idx = list.findIndex((i) => i.id === lightboxItem?.id);
		if (idx !== -1) lightboxItem = list[(idx + 1) % list.length];
	}

	function prevLightbox() {
		if (!lightboxItem) return;
		const list = visibleItems;
		const idx = list.findIndex((i) => i.id === lightboxItem?.id);
		if (idx !== -1) lightboxItem = list[(idx - 1 + list.length) % list.length];
	}
</script>

<svelte:head>
	<title>PocketMC Screenshot Gallery - Desktop & Mobile UI</title>
	<meta
		name="description"
		content="Explore high-resolution screenshots of PocketMC: server console, instance creation, Modrinth addon marketplace, cloud backups, and mobile companion dashboard."
	/>
	<meta property="og:title" content="PocketMC Screenshot Gallery - Desktop & Mobile UI" />
	<meta
		property="og:description"
		content="Explore high-resolution screenshots of PocketMC: server console, instance creation, Modrinth addon marketplace, cloud backups, and mobile companion dashboard."
	/>
	<meta name="twitter:title" content="PocketMC Screenshot Gallery - Desktop & Mobile UI" />
	<meta
		name="twitter:description"
		content="Explore high-resolution screenshots of PocketMC: server console, instance creation, Modrinth addon marketplace, cloud backups, and mobile companion dashboard."
	/>
	<link rel="preload" as="image" href="/screenshots/screenshot-dashboard.webp" />
	<link rel="preload" as="image" href="/screenshots/screenshot-console.webp" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://pocketmc.github.io/'
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Gallery',
						item: 'https://pocketmc.github.io/gallery/'
					}
				]
			},
			{
				'@type': 'ImageGallery',
				name: 'Pocket MC Screenshot Gallery',
				description: 'Screenshots and visual overview of Pocket MC across desktop and mobile companion dashboard.',
				url: 'https://pocketmc.github.io/gallery/',
				image: galleryItems.map((item) => ({
					'@type': 'ImageObject',
					name: item.title,
					description: item.caption,
					contentUrl: `https://pocketmc.github.io${item.src}`,
					width: item.width,
					height: item.height
				}))
			}
		]
	})}</script>`}
</svelte:head>

<svelte:window
	onkeydown={(e) => {
		if (lightboxItem) {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowRight') nextLightbox();
			if (e.key === 'ArrowLeft') prevLightbox();
		}
	}}
/>

<div class="gallery-page">
	<!-- Clean Header -->
	<header class="section gallery-hero">
		<span class="cross start"></span>
		<span class="cross end"></span>

		<div class="page hero-content">
			<h1>Gallery</h1>
			<p class="subtitle">A visual tour of PocketMC across desktop and mobile.</p>

			<!-- Category pill switcher matching ThemeSwitch style -->
			<div class="category-bar">
				<div class="switch" role="tablist" aria-label="Screenshot categories">
					{#each categories as cat (cat.id)}
						<button
							type="button"
							role="tab"
							class="switch-btn"
							class:on={activeCategory === cat.id}
							aria-selected={activeCategory === cat.id}
							onclick={() => (activeCategory = cat.id)}
						>
							<span>{cat.label}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</header>

	<!-- Main Gallery Content: Natural page scroll, organized category-wise -->
	<main class="section gallery-content">
		<span class="cross start"></span>
		<span class="cross end"></span>

		<div class="page content-container">
			{#if activeCategory === 'all'}
				<!-- When viewing "All", render categorized sections with clear headers -->
				{#each sections as sec (sec.id)}
					<section class="category-block" id="sec-{sec.id}">
						<div class="section-heading">
							<h2>{sec.label}</h2>
							<p>{sec.description}</p>
						</div>

						{#if sec.id === 'mobile'}
							<!-- Dedicated portrait phone grid: perfectly fits natural smartphone aspect ratio -->
							<div class="mobile-grid">
								{#each sec.items as item (item.id)}
									<button
										type="button"
										class="phone-card"
										onclick={() => openLightbox(item)}
										aria-label="View {item.title} full size"
									>
										<div class="phone-frame" style="aspect-ratio: {item.width} / {item.height};">
											<img
												src={item.src}
												alt={item.title}
												width={item.width}
												height={item.height}
												loading="lazy"
												class="phone-img"
											/>
										</div>
										<div class="card-caption">
											<span class="card-title">{item.title}</span>
											<p class="card-desc">{item.caption}</p>
										</div>
									</button>
								{/each}
							</div>
						{:else}
							<!-- Desktop landscape grid: perfectly fits natural screenshot aspect ratio -->
							<div class="desktop-grid">
								{#each sec.items as item (item.id)}
									<button
										type="button"
										class="desktop-card"
										class:wide-card={item.width > 3000}
										onclick={() => openLightbox(item)}
										aria-label="View {item.title} full size"
									>
										<div
											class="desktop-frame"
											class:wide-frame={item.width > 3000}
											style="aspect-ratio: {item.width} / {item.height};"
										>
											<img
												src={item.src}
												alt={item.title}
												width={item.width}
												height={item.height}
												loading="lazy"
												class="desktop-img"
											/>
										</div>
										<div class="card-caption">
											<span class="card-title">{item.title}</span>
											<p class="card-desc">{item.caption}</p>
										</div>
									</button>
								{/each}
							</div>
						{/if}
					</section>
				{/each}
			{:else}
				<!-- Filtered single-category view -->
				<section class="category-block">
					<div class="section-heading">
						<h2>{categories.find((c) => c.id === activeCategory)?.label}</h2>
						<p>{categories.find((c) => c.id === activeCategory)?.description}</p>
					</div>

					{#if activeCategory === 'mobile'}
						<div class="mobile-grid">
							{#each visibleItems as item (item.id)}
								<button
									type="button"
									class="phone-card"
									onclick={() => openLightbox(item)}
									aria-label="View {item.title} full size"
								>
									<div class="phone-frame" style="aspect-ratio: {item.width} / {item.height};">
										<img
											src={item.src}
											alt={item.title}
											width={item.width}
											height={item.height}
											loading="lazy"
											class="phone-img"
										/>
									</div>
									<div class="card-caption">
										<span class="card-title">{item.title}</span>
										<p class="card-desc">{item.caption}</p>
									</div>
								</button>
							{/each}
						</div>
					{:else}
						<div class="desktop-grid">
							{#each visibleItems as item (item.id)}
								<button
									type="button"
									class="desktop-card"
									class:wide-card={item.width > 3000}
									onclick={() => openLightbox(item)}
									aria-label="View {item.title} full size"
								>
									<div
										class="desktop-frame"
										class:wide-frame={item.width > 3000}
										style="aspect-ratio: {item.width} / {item.height};"
									>
										<img
											src={item.src}
											alt={item.title}
											width={item.width}
											height={item.height}
											loading="lazy"
											class="desktop-img"
										/>
									</div>
									<div class="card-caption">
										<span class="card-title">{item.title}</span>
										<p class="card-desc">{item.caption}</p>
									</div>
								</button>
							{/each}
						</div>
					{/if}
				</section>
			{/if}
		</div>
	</main>

	<!-- Fullscreen Lightbox Modal -->
	{#if lightboxItem}
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeLightbox();
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') closeLightbox();
			}}
		>
			<div class="lb-bar">
				<div class="lb-title-wrap">
					<span class="lb-cat">{lightboxItem.categoryLabel}</span>
					<span class="lb-sep">·</span>
					<span class="lb-title">{lightboxItem.title}</span>
					<span class="lb-caption">{lightboxItem.caption}</span>
				</div>

				<button
					type="button"
					class="lb-close"
					aria-label="Close"
					onclick={closeLightbox}
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
					aria-label="Previous image"
					onclick={prevLightbox}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<button
					type="button"
					class="lb-arrow next"
					aria-label="Next image"
					onclick={nextLightbox}
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

	/* Hero Header */
	.gallery-hero {
		padding-top: 54px;
		padding-bottom: 24px;
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

	/* Category Filter Switcher */
	.category-bar {
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
		box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.3);
		max-width: 100%;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.switch::-webkit-scrollbar {
		display: none;
	}

	.switch-btn {
		height: 100%;
		padding: 0 13px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		border-radius: calc(var(--radius) - 4px);
		color: var(--dim);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		border: none;
		background: transparent;
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

	/* Content Sections */
	.gallery-content {
		padding-top: 36px;
		padding-bottom: 96px;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 64px;
		width: 100%;
		max-width: 1180px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	.category-block {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.section-heading {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: left;
	}

	.section-heading h2 {
		font-size: 20px;
		font-weight: 600;
		color: var(--fg);
		margin: 0;
	}

	.section-heading p {
		font-size: 13.5px;
		color: var(--muted-fg);
		margin: 0;
	}

	/* Desktop Grid: 16:10 aspect ratio matching application screenshots */
	.desktop-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 28px;
	}

	.desktop-card {
		display: flex;
		flex-direction: column;
		padding: 0;
		font: inherit;
		text-align: left;
		background: transparent;
		border: none;
		cursor: zoom-in;
		gap: 12px;
		transition: transform 0.2s ease;
	}

	.desktop-card:hover {
		transform: translateY(-2px);
	}

	.desktop-card.wide-card {
		grid-column: 1 / -1;
	}

	/* Desktop frame: exact rounded edges and shadows matching screenshot size */
	.desktop-frame {
		width: 100%;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow:
			var(--shadow),
			0 0 40px -10px rgba(34, 197, 94, 0.08);
		display: block;
		line-height: 0;
		transition: border-color 0.15s ease, box-shadow 0.2s ease;
	}

	.desktop-frame:hover {
		border-color: var(--dim);
		box-shadow:
			var(--shadow),
			0 0 60px -10px rgba(34, 197, 94, 0.18);
	}

	/* Desktop image: covers frame perfectly without any black bars or letterboxing */
	.desktop-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Mobile Grid: columns for smartphone screenshots */
	.mobile-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 28px;
	}

	.phone-card {
		display: flex;
		flex-direction: column;
		padding: 0;
		font: inherit;
		text-align: left;
		background: transparent;
		border: none;
		cursor: zoom-in;
		gap: 12px;
		transition: transform 0.2s ease;
	}

	.phone-card:hover {
		transform: translateY(-2px);
	}

	/* Phone frame: sized naturally to phone screenshot dimensions with zero black bars */
	.phone-frame {
		width: 100%;
		max-width: 270px;
		margin: 0 auto;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow:
			var(--shadow),
			0 0 35px -10px rgba(59, 130, 246, 0.12);
		display: block;
		line-height: 0;
		transition: border-color 0.15s ease, box-shadow 0.2s ease;
	}

	.phone-frame:hover {
		border-color: var(--dim);
		box-shadow:
			var(--shadow),
			0 0 50px -10px rgba(59, 130, 246, 0.22);
	}

	/* Phone image: covers frame perfectly with zero black bars */
	.phone-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Card Captions */
	.card-caption {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-inline: 2px;
	}

	.card-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--fg);
	}

	.card-desc {
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--muted-fg);
		margin: 0;
	}

	/* Lightbox Modal */
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
		flex-wrap: wrap;
	}

	.lb-cat {
		font-size: 12px;
		font-weight: 600;
		color: #22c55e;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.lb-sep {
		color: var(--dim);
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
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--fg);
		cursor: pointer;
		transition: background-color 0.15s ease;
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
		border-radius: var(--radius-lg);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95);
		border: 1px solid var(--border);
	}

	.lb-img.portrait {
		max-height: 88vh;
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
		cursor: pointer;
		transition: background-color 0.15s ease, transform 0.15s ease;
	}

	.lb-arrow:hover {
		background: var(--secondary-hover);
		transform: scale(1.05);
	}

	/* Responsive for tablets and mobile phones */
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

		.switch {
			height: 36px;
		}

		.switch-btn {
			padding: 0 10px;
			font-size: 12px;
		}

		.gallery-content {
			padding-top: 24px;
			padding-bottom: 64px;
		}

		.content-container {
			gap: 44px;
		}

		.desktop-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.mobile-grid {
			grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
			gap: 20px;
		}

		.phone-frame {
			max-width: 100%;
		}

		.lb-bar {
			padding: 12px 16px;
		}

		.lb-caption {
			display: none;
		}
	}
</style>
