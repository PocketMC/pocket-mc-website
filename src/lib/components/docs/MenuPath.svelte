<script lang="ts">
	let { steps }: { steps: string[] } = $props();
</script>

<strong class="path"
	>{#each steps as step, index (index)}{#if index > 0}<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-label="then"
				role="img"><path d="M9 6l6 6-6 6" /></svg
			>{/if}<span>{step}</span>{/each}</strong
>

<style>
	svg {
		margin: 0 4px;
		vertical-align: -1px;
		color: var(--dim);
	}

	span {
		white-space: nowrap;
	}
</style>
