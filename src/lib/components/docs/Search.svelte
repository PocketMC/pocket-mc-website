<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { loadIndex, search, type Hit, type Section } from '$lib/docs/search';

	let dialog = $state<HTMLDialogElement | null>(null);
	let input = $state<HTMLInputElement | null>(null);
	let list = $state<HTMLElement | null>(null);

	let index = $state<Section[] | null>(null);
	let query = $state('');
	let active = $state(0);

	const hits = $derived<Hit[]>(index ? search(index, query) : []);

	$effect(() => {
		void query;
		active = 0;
	});

	async function open() {
		if (!dialog || dialog.open) return;
		dialog.showModal();
		await tick();
		input?.select();
		index ??= await loadIndex();
	}

	function close() {
		dialog?.close();
	}

	function href(hit: Hit) {
		return `${hit.section.path}${hit.section.id ? `#${hit.section.id}` : ''}`;
	}

	function choose(hit: Hit | undefined) {
		if (!hit) return;
		close();
		goto(href(hit));
	}

	async function move(step: number) {
		if (!hits.length) return;
		active = (active + step + hits.length) % hits.length;
		await tick();
		list?.querySelector('.on')?.scrollIntoView({ block: 'nearest' });
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			choose(hits[active]);
		}
	}

	onMount(() => {
		const onkey = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				if (dialog?.open) close();
				else open();
			}
		};
		addEventListener('keydown', onkey);
		return () => removeEventListener('keydown', onkey);
	});
</script>

<button type="button" class="trigger" onclick={open}>
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<circle cx="11" cy="11" r="7" />
		<path d="M20 20l-3.5-3.5" />
	</svg>
	<span class="placeholder">Search docs</span>
	<kbd>Ctrl K</kbd>
</button>

<dialog
	bind:this={dialog}
	aria-label="Search docs"
	onclick={(event) => {
		if (event.target === dialog) close();
	}}
	onclose={() => (query = '')}
>
	<div class="panel">
		<div class="field">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="7" />
				<path d="M20 20l-3.5-3.5" />
			</svg>
			<input
				bind:this={input}
				bind:value={query}
				{onkeydown}
				type="search"
				placeholder="Search docs"
				aria-label="Search docs"
				autocomplete="off"
				spellcheck="false"
			/>
			<kbd>Esc</kbd>
		</div>

		{#if query.trim()}
			<div class="results" bind:this={list} role="listbox" aria-label="Results">
				{#if !index}
					<p class="empty">Loading…</p>
				{:else if !hits.length}
					<p class="empty">Nothing matches "{query.trim()}".</p>
				{:else}
					{#each hits as hit, position (href(hit))}
						<a
							href={href(hit)}
							class:on={position === active}
							role="option"
							aria-selected={position === active}
							onmouseenter={() => (active = position)}
							onclick={(event) => {
								event.preventDefault();
								choose(hit);
							}}
						>
							<span class="where">
								{hit.section.page}{#if hit.section.id}<span class="sep">›</span>{hit.section.title}{/if}
							</span>
							<span class="snippet"
								>{#each hit.snippet as part, at (at)}{#if part.hit}<mark>{part.text}</mark
										>{:else}{part.text}{/if}{/each}</span
							>
						</a>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</dialog>

<style>
	.trigger {
		width: 100%;
		height: 34px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 6px 0 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--dim);
		font-size: 13px;
		text-align: left;
	}

	.trigger:hover {
		background: var(--secondary);
		color: var(--muted-fg);
	}

	.placeholder {
		flex: 1;
	}

	kbd {
		padding: 2px 6px;
		border: 1px solid var(--border);
		border-radius: 6px;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--dim);
	}

	@media (hover: none) and (pointer: coarse) {
		.trigger kbd,
		.field kbd {
			display: none;
		}
	}

	dialog {
		width: min(620px, calc(100vw - 32px));
		max-height: min(560px, calc(100vh - 120px));
		margin: 12vh auto 0;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		color: var(--fg);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.5);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.panel {
		display: flex;
		flex-direction: column;
		max-height: inherit;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 14px;
		border-bottom: 1px solid var(--line);
		color: var(--dim);
	}

	input {
		flex: 1;
		height: 52px;
		border: none;
		outline: none;
		background: none;
		color: var(--fg);
		font: inherit;
		font-size: 15px;
	}

	input::-webkit-search-cancel-button {
		display: none;
	}

	.results {
		overflow-y: auto;
		padding: 6px;
	}

	.results a {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px 12px;
		border-radius: 8px;
	}

	.results a.on {
		background: var(--secondary-hover);
	}

	.where {
		font-size: 13.5px;
		font-weight: 500;
	}

	.sep {
		margin: 0 6px;
		color: var(--dim);
	}

	.snippet {
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	mark {
		background: none;
		color: var(--fg);
		font-weight: 600;
	}

	.empty {
		padding: 18px 12px;
		font-size: 13px;
		color: var(--dim);
	}
</style>
