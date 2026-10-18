<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import EditLink from '$lib/components/EditLink.svelte';
	import Outline from '$lib/components/docs/Outline.svelte';
	import Search from '$lib/components/docs/Search.svelte';
	import '$lib/prose.css';
	import { groups, pages } from '$lib/data/docs';

	let { children } = $props();

	let article = $state<HTMLElement | null>(null);
	let picking = $state(false);

	const path = $derived(page.url.pathname.replace(/\/+$/, ''));
	const index = $derived(pages.findIndex((entry) => path === `/docs/${entry.slug}`));
	const current = $derived(index >= 0 ? pages[index] : null);
	const group = $derived(groups.find((entry) => current && entry.pages.includes(current)));
	const previous = $derived(index > 0 ? pages[index - 1] : null);
	const next = $derived(index >= 0 && index < pages.length - 1 ? pages[index + 1] : null);

	afterNavigate(() => (picking = false));
</script>

<svelte:head>
	{#if current}
		<meta property="og:title" content="{current.title} — Pocket MC Documentation (PocketMC)" />
		<meta property="og:description" content={current.summary} />
		<meta property="og:type" content="article" />
		<meta name="twitter:title" content="{current.title} — Pocket MC Documentation (PocketMC)" />
		<meta name="twitter:description" content={current.summary} />

		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'TechArticle',
			headline: current.title,
			description: current.summary,
			url: `https://pocketmc.github.io/docs/${current.slug}/`,
			articleSection: group?.label,
			isPartOf: {
				'@type': 'WebSite',
				name: 'Pocket MC',
				alternateName: 'PocketMC',
				url: 'https://pocketmc.github.io/'
			},
			inLanguage: 'en-US'
		})}</script>`}
		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
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
					name: 'Documentation',
					item: 'https://pocketmc.github.io/docs/introduction/'
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: current.title,
					item: `https://pocketmc.github.io/docs/${current.slug}/`
				}
			]
		})}</script>`}
	{/if}
</svelte:head>

{#snippet list()}
	{#each groups as grp (grp.label)}
		<div class="group">
			<span class="kicker">{grp.label}</span>
			{#each grp.pages as entry (entry.slug)}
				<a
					href="/docs/{entry.slug}"
					class:on={current?.slug === entry.slug}
					aria-current={current?.slug === entry.slug ? 'page' : undefined}>{entry.title}</a
				>
			{/each}
		</div>
	{/each}
{/snippet}

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page layout">
		<aside class="pages">
			<div class="rail">
				<Search />
				<nav class="sidebar" aria-label="Docs">
					{@render list()}
				</nav>
				<details class="picker" bind:open={picking}>
					<summary>
						<span class="where">
							{#if group}<span class="crumb">{group.label}</span>{/if}
							<span>{current?.title ?? 'Docs'}</span>
						</span>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<nav aria-label="Docs">
						{@render list()}
					</nav>
				</details>
			</div>
		</aside>

		<div class="main">
			<article class="prose" bind:this={article}>
				{@render children()}
			</article>

			{#if current}
				<div class="source">
					<EditLink path="src/routes/docs/{current.slug}/+page.svelte" />
				</div>
			{/if}

			{#if previous || next}
				<div class="pager">
					{#if previous}
						<a class="prev" href="/docs/{previous.slug}">
							<span class="kicker">Previous</span>
							<span>{previous.title}</span>
						</a>
					{/if}
					{#if next}
						<a class="next" href="/docs/{next.slug}">
							<span class="kicker">Next</span>
							<span>{next.title}</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>

		<aside class="outline">
			<div class="sticky">
				<Outline root={article} />
			</div>
		</aside>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr) 200px;
		gap: 48px;
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.rail,
	.sticky {
		position: sticky;
		top: calc(var(--header) + 32px);
	}

	.rail {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.picker {
		display: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
	}

	.picker summary {
		height: 46px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 0 14px;
		font-size: 14px;
		font-weight: 500;
		list-style: none;
		cursor: pointer;
	}

	.picker summary::-webkit-details-marker {
		display: none;
	}

	.where {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}

	.crumb {
		color: var(--dim);
		font-weight: 400;
	}

	.crumb::after {
		content: '/';
		margin-left: 8px;
		color: var(--faint);
	}

	.picker svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		fill: none;
		stroke: var(--dim);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.2s;
	}

	.picker[open] svg {
		transform: rotate(180deg);
	}

	.picker[open] summary {
		border-bottom: 1px solid var(--line);
	}

	.picker nav {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 18px 14px 14px;
		animation: drop 0.2s ease-out;
	}

	@keyframes drop {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	.picker .group a {
		margin-inline: -8px;
		padding: 10px 8px;
		font-size: 15px;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.group .kicker {
		margin-bottom: 8px;
	}

	.group a {
		margin-left: -10px;
		padding: 7px 10px;
		border-radius: 8px;
		font-size: 13.5px;
		color: var(--muted-fg);
	}

	.group a:hover {
		color: var(--fg);
	}

	.group a.on {
		background: var(--secondary);
		color: var(--fg);
		font-weight: 500;
	}

	.main {
		min-width: 0;
		max-width: 740px;
	}

	.source {
		margin-top: 48px;
	}

	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 24px;
	}

	.pager a {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
	}

	.pager a:hover {
		background: var(--secondary);
	}

	.pager .kicker {
		font-size: 11px;
		color: var(--dim);
	}

	.next {
		grid-column: 2;
		text-align: right;
	}

	@media (max-width: 1100px) {
		.layout {
			grid-template-columns: 210px minmax(0, 1fr);
		}

		.outline {
			display: none;
		}
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			gap: 32px;
			padding-top: 32px;
			padding-bottom: 64px;
		}

		.rail {
			position: static;
			gap: 20px;
		}

		.sidebar {
			display: none;
		}

		.picker {
			display: block;
		}
	}
</style>
