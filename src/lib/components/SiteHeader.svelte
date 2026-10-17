<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let { stars = null }: { stars?: number | null } = $props();

	let live = $state<number | null>(null);
	let open = $state(false);
	let header = $state<HTMLElement | null>(null);
	let duration = $state(200);

	const home = $derived(page.url.pathname === '/' ? '' : '/');

	const links = $derived([
		{ href: `${home}#steps`, label: 'Install' },
		{ href: `${home}#about`, label: 'Features' },
		{ href: `${home}#tour`, label: 'Showcase' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: `${home}#softwares`, label: 'Softwares' },
		{ href: `${home}#comparison`, label: 'Comparison' },
		{ href: '/docs', label: 'Docs' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	]);

	const label = $derived.by(() => {
		const count = live ?? stars;
		if (count === null) return null;
		if (count < 1000) return String(count);
		return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
	});

	afterNavigate(() => (open = false));

	onMount(async () => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;

		try {
			const res = await fetch('https://api.github.com/repos/PocketMC/pocket-mc-windows');
			if (res.ok) live = (await res.json()).stargazers_count;
		} catch {
			live = null;
		}
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (open && event.key === 'Escape') open = false;
	}}
	onclick={(event) => {
		if (open && header && !event.composedPath().includes(header)) open = false;
	}}
/>

<div class="slot"></div>

<header bind:this={header}>
	<div class="bar">
		<div class="left">
			<a href="{home}#top" class="brand">
				<Logo size={22} />
				<span>PocketMC</span>
			</a>
			<nav>
				{#each links as link (link.label)}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>

		<div class="right">
			<ThemeSwitch />
			<a href={repo} class="star" target="_blank" rel="noopener noreferrer">
				<Mark name="github" size={15} />
				GitHub
				{#if label}
					<span class="count">{label}</span>
				{/if}
			</a>
			<a href="{home}#steps" class="download">Install</a>
			<button
				type="button"
				class="toggle"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="menu"
				onclick={() => (open = !open)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					{#if open}
						<path d="M6 6l12 12" />
						<path d="M18 6L6 18" />
					{:else}
						<path d="M4 7h16" />
						<path d="M4 12h16" />
						<path d="M4 17h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if open}
		<nav id="menu" class="menu" aria-label="Menu" transition:fly={{ y: -8, duration }}>
			{#each links as link (link.label)}
				<a href={link.href} onclick={() => (open = false)}>{link.label}</a>
			{/each}
			<a href={repo} class="repo" target="_blank" rel="noopener noreferrer" onclick={() => (open = false)}>
				<Mark name="github" size={16} />
				GitHub
				{#if label}
					<span class="count">{label}</span>
				{/if}
			</a>
		</nav>
	{/if}
</header>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="scrim" transition:fade={{ duration }} onclick={() => (open = false)}></div>
{/if}

<style>
	.slot {
		height: var(--header);
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		height: var(--header);
		border-bottom: 1px solid var(--line);
		background: var(--header-bg);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.bar {
		height: 100%;
		max-width: var(--page);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: var(--gutter);
	}

	.left {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.left nav {
		display: flex;
		gap: 20px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	nav a:hover,
	.star:hover {
		color: var(--fg);
	}

	.star {
		height: var(--control);
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 13px;
		color: var(--chip-fg);
		white-space: nowrap;
	}

	.count {
		padding: 1px 6px;
		border-radius: 999px;
		background: var(--secondary);
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg);
	}

	.download {
		height: var(--control);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 14px;
		border-radius: var(--radius);
		background: var(--primary);
		color: var(--primary-fg);
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
		transition: background-color 0.15s ease;
	}

	.download:hover {
		background: var(--primary-hover);
	}

	.toggle {
		display: none;
		width: 36px;
		height: 36px;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius);
		color: var(--fg);
	}

	.toggle svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.menu {
		position: absolute;
		top: var(--header);
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		padding: 16px 20px 24px;
		border-bottom: 1px solid var(--line);
		background: var(--bg);
		gap: 14px;
		font-size: 15px;
	}

	.menu .repo {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
		padding-top: 14px;
		border-top: 1px solid var(--line);
		color: var(--muted-fg);
	}

	.scrim {
		position: fixed;
		inset: var(--header) 0 0 0;
		z-index: 40;
		background: rgb(0 0 0 / 0.5);
	}

	@media (max-width: 1040px) {
		.left nav,
		.star,
		.download {
			display: none;
		}

		.toggle {
			display: flex;
		}
	}
</style>
