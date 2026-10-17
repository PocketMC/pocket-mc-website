<script lang="ts" module>
	export type Accordion = { open: string | null };
</script>

<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide, type SlideParams } from 'svelte/transition';

	let { id, question, children }: { id: string; question: string; children: Snippet } = $props();

	const accordion = getContext<Accordion>('faq');
	const open = $derived(accordion.open === id);

	let duration = $state(260);

	function unfold(node: Element, params: SlideParams) {
		const base = slide(node, params);
		return { ...base, css: (t: number, u: number) => `${base.css?.(t, u) ?? ''}; opacity: ${t}` };
	}

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;
	});
</script>

<div class="question" {id}>
	<button
		type="button"
		aria-expanded={open}
		aria-controls="{id}-answer"
		onclick={() => (accordion.open = open ? null : id)}
	>
		<span class="label">{question}</span>
	</button>

	{#if open}
		<div class="panel" id="{id}-answer" transition:unfold={{ duration, easing: cubicInOut }}>
			<div class="answer">{@render children()}</div>
		</div>
	{:else}
		<div
			class="answer"
			id="{id}-answer"
			hidden="until-found"
			onbeforematch={() => (accordion.open = id)}
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.question {
		border-bottom: 1px solid var(--line);
		scroll-margin-top: calc(var(--header) + 24px);
	}

	.question:last-child {
		border-bottom: none;
	}

	button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		font-size: 15px;
		font-weight: 500;
		text-align: left;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	button:hover {
		background: var(--secondary);
	}

	button::after {
		content: '';
		flex-shrink: 0;
		width: 7px;
		height: 7px;
		margin-right: 4px;
		border-right: 1.5px solid var(--dim);
		border-bottom: 1.5px solid var(--dim);
		transform: translateY(-2px) rotate(45deg);
		transition: transform 0.26s ease-in-out;
	}

	button[aria-expanded='true']::after {
		transform: translateY(2px) rotate(-135deg);
	}

	.answer {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 10px 18px 20px;
	}

	.answer[hidden] {
		padding: 0;
	}
</style>
