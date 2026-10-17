<script lang="ts">
	import { highlightJson } from '$lib/highlight';
	import CopyButton from '../CopyButton.svelte';

	let { text, label, lang }: { text: string; label?: string; lang?: 'json' | 'bash' | 'yaml' } =
		$props();

	const tokens = $derived(lang === 'json' ? highlightJson(text) : null);
</script>

<figure>
	{#if label}
		<figcaption class="mono">{label}</figcaption>
	{/if}
	<div class="body">
		<!-- prettier-ignore -->
		<pre class="mono">{#if tokens}{#each tokens as token, index (index)}<span class={token.kind}>{token.text}</span>{/each}{:else}{text}{/if}</pre>
		<CopyButton {text} />
	</div>
</figure>

<style>
	figure {
		margin: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
	}

	figcaption {
		padding: 9px 16px;
		border-bottom: 1px solid var(--line);
		font-size: 12px;
		color: var(--dim);
		background: var(--secondary);
	}

	.body {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 12px 12px 16px;
	}

	pre {
		margin: 0;
		padding-top: 4px;
		overflow-x: auto;
		font-size: 13px;
		line-height: 1.6;
		flex: 1;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.key {
		color: var(--syntax-key);
	}

	.string {
		color: var(--syntax-string);
	}

	.number {
		color: var(--syntax-number);
	}

	.literal {
		color: var(--syntax-literal);
	}

	.punct {
		color: var(--dim);
	}
</style>
