<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span>{@render children()}</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		height: 26px;
		padding: 0 8.75px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--secondary);
		color: var(--fg);
		font-size: 12px;
		line-height: 1;
		white-space: nowrap;
		vertical-align: middle;
	}
</style>
