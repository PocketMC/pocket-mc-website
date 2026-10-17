<script lang="ts">
	import Glyph from '$lib/components/Glyph.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
	import type { Inline } from '$lib/changelog';
	import { repo } from '$lib/data/links';
	import '$lib/prose.css';

	let { data } = $props();

	const glyphs = new Map([
		['added', 'circle-plus'],
		['changed', 'refresh-cw'],
		['fixed', 'wrench'],
		['removed', 'circle-minus'],
		['deprecated', 'circle-minus'],
		['security', 'circle-dot']
	]);
</script>

{#snippet line(parts: Inline[])}{#each parts as part, at (at)}{#if part.kind === 'code'}<code
				>{part.text}</code
			>{:else if part.kind === 'strong'}<strong>{part.text}</strong
			>{:else if part.kind === 'link'}<a href={part.href}>{part.text}</a
			>{:else if part.kind === 'path'}<MenuPath
				steps={part.steps}
			/>{:else}{part.text}{/if}{/each}{/snippet}

<svelte:head>
	<title>Changelog · PocketMC</title>
	<meta name="description" content="Every PocketMC release and what changed in it, newest first." />
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page changelog">
		<header class="prose">
			<span class="kicker">Changelog</span>
			<h1>What's new in PocketMC</h1>
			<p class="summary">Every release and what changed in it, newest first.</p>
		</header>

		{#if data.releases.length}
			<div class="releases">
				{#each data.releases as release, index (release.id)}
					<article class="release" id={release.id} class:latest={index === 0}>
						<div class="meta">
							<div class="sticky">
								<div class="title">
									<a class="version" href="#{release.id}">{release.version}</a>
									{#if index === 0 && release.tag}
										<span class="badge">Latest</span>
									{/if}
								</div>
								{#if release.date}
									<span class="date">{release.date}</span>
								{/if}
								{#if release.tag || release.compare}
									<div class="links">
										{#if release.tag}<a href={release.tag} target="_blank" rel="noopener noreferrer">Release</a>{/if}
										{#if release.compare}<a href={release.compare} target="_blank" rel="noopener noreferrer">Diff</a>{/if}
									</div>
								{/if}
							</div>
						</div>

						<div class="body prose">
							{#each release.intro as paragraph, at (at)}
								<p>{@render line(paragraph)}</p>
							{/each}

							{#each release.groups as group (group.title)}
								<div class="group" data-kind={group.title.toLowerCase()}>
									<h2>
										<Glyph name={glyphs.get(group.title.toLowerCase()) ?? 'circle-dot'} size={16} />
										{group.title}
									</h2>
									<ul>
										{#each group.items as item, at (at)}
											<li>{@render line(item)}</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<p class="empty">
				The changelog couldn't be loaded right now. Read it on
				<a href="{repo}/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">GitHub</a> instead.
			</p>
		{/if}
	</div>
</section>

<style>
	.changelog {
		max-width: 1040px;
		padding-top: 72px;
		padding-bottom: 96px;
	}

	header {
		max-width: 640px;
		margin-bottom: 56px;
	}

	.releases {
		display: flex;
		flex-direction: column;
	}

	.release {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr);
		gap: 40px;
		scroll-margin-top: var(--header);
	}

	.sticky {
		position: sticky;
		top: calc(var(--header) + 32px);
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-top: 2px;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.version {
		font-family: var(--mono);
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.version:hover {
		color: var(--muted-fg);
	}

	.badge {
		padding: 2px 8px;
		border: 1px solid var(--border);
		border-radius: 999px;
		font-size: 11px;
		font-weight: 500;
		color: var(--muted-fg);
		background: var(--secondary);
	}

	.date {
		font-size: 13px;
		color: var(--dim);
		line-height: 1.4;
	}

	.links {
		display: flex;
		gap: 14px;
		margin-top: 4px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	.links a:hover {
		color: var(--fg);
	}

	.body {
		position: relative;
		gap: 28px;
		padding: 0 0 64px 40px;
		border-left: 1px solid var(--line);
	}

	.meta {
		padding-bottom: 64px;
	}

	.release:last-child .meta,
	.release:last-child .body {
		padding-bottom: 0;
	}

	.body::before {
		content: '';
		position: absolute;
		top: 8px;
		left: -5px;
		width: 9px;
		height: 9px;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--bg);
	}

	.latest .body::before {
		border-color: var(--fg);
		background: var(--fg);
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 12px;
		--tint: var(--dim);
	}

	.group[data-kind='added'] {
		--tint: var(--syntax-string);
	}

	.group[data-kind='changed'] {
		--tint: var(--syntax-key);
	}

	.group[data-kind='fixed'] {
		--tint: var(--syntax-number);
	}

	.group[data-kind='removed'],
	.group[data-kind='deprecated'] {
		--tint: var(--syntax-literal);
	}

	.group h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.group h2 :global(svg) {
		color: var(--tint);
	}

	.empty {
		font-size: 15px;
		color: var(--muted-fg);
	}

	.empty a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	@media (max-width: 900px) {
		.changelog {
			padding-top: 48px;
			padding-bottom: 64px;
		}

		header {
			margin-bottom: 40px;
		}

		.release {
			grid-template-columns: minmax(0, 1fr);
			gap: 16px;
		}

		.sticky {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			column-gap: 14px;
		}

		.links {
			margin-top: 0;
		}

		.meta {
			padding-bottom: 0;
		}

		.release + .release {
			padding-top: 32px;
			border-top: 1px solid var(--line);
		}

		.body {
			padding: 0 0 40px;
			border-left: none;
		}

		.body::before {
			display: none;
		}
	}
</style>
