<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { root }: { root: HTMLElement | null } = $props();

	let headings = $state<{ id: string; label: string }[]>([]);
	let active = $state('');
	let pinned = false;

	function collect() {
		if (!root) return;
		headings = Array.from(root.querySelectorAll<HTMLElement>('h2[id]')).map((heading) => ({
			id: heading.id,
			label: heading.textContent ?? ''
		}));
		pinned = false;
		track();
	}

	function track() {
		if (pinned || !headings.length) return;
		const line =
			parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header')) + 40;
		let current = headings[0].id;
		for (const { id } of headings) {
			const element = document.getElementById(id);
			if (element && element.getBoundingClientRect().top <= line) current = id;
		}
		if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
			current = headings[headings.length - 1].id;
		}
		active = current;
	}

	function release() {
		pinned = false;
	}

	onMount(() => {
		const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
		addEventListener('scroll', track, { passive: true });
		for (const event of events) addEventListener(event, release, { passive: true });
		return () => {
			removeEventListener('scroll', track);
			for (const event of events) removeEventListener(event, release);
		};
	});

	afterNavigate(collect);
</script>

{#if headings.length > 1}
	<nav aria-label="On this page">
		<span class="kicker">On this page</span>
		{#each headings as heading (heading.id)}
			<a
				href="#{heading.id}"
				class:on={active === heading.id}
				onclick={() => {
					active = heading.id;
					pinned = true;
				}}>{heading.label}</a
			>
		{/each}
	</nav>
{/if}

<style>
	nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.kicker {
		margin-bottom: 10px;
	}

	a {
		padding: 6px 0 6px 12px;
		border-left: 1px solid var(--line);
		font-size: 13px;
		color: var(--muted-fg);
		line-height: 1.4;
	}

	a:hover {
		color: var(--fg);
	}

	a.on {
		border-left-color: var(--fg);
		color: var(--fg);
		font-weight: 500;
	}
</style>
