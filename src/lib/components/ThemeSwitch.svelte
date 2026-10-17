<script lang="ts">
	import { onMount } from 'svelte';
	import { theme, options } from '$lib/theme.svelte';

	onMount(() => theme.sync());
</script>

<div class="switch">
	{#each options as option (option.id)}
		<button
			title={option.label}
			aria-label={option.label}
			aria-pressed={theme.choice === option.id}
			class:on={theme.choice === option.id}
			onclick={() => theme.select(option.id)}
		>
			{#if option.id === 'system'}
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<rect x="3" y="4" width="18" height="12" rx="2" />
					<path d="M8 20h8" />
				</svg>
			{:else if option.id === 'light'}
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="M4.9 4.9l1.4 1.4" />
					<path d="M17.7 17.7l1.4 1.4" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="M4.9 19.1l1.4-1.4" />
					<path d="M17.7 6.3l1.4-1.4" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
				</svg>
			{/if}
		</button>
	{/each}
</div>

<style>
	.switch {
		height: var(--control);
		display: flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	button {
		width: 24px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: calc(var(--radius) - 4px);
		color: var(--dim);
	}

	button:hover {
		color: var(--fg);
	}

	button.on {
		background: var(--secondary-active);
		color: var(--fg);
	}

	svg {
		width: 13px;
		height: 13px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@media (max-width: 900px) {
		.switch {
			height: 36px;
		}

		button {
			width: 28px;
		}
	}
</style>
