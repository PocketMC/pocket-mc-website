<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>AI Log Summaries · PocketMC Docs</title>
	<meta
		name="description"
		content="Log sanitization, token caching, and integration with Ollama, Gemini, and OpenAI."
	/>
</svelte:head>

<span class="kicker">Operations & Safety</span>
<h1>AI Log Summaries</h1>
<p class="summary">
	Turn multi-megabyte server log files into human-readable session reports and crash post-mortems using
	local Ollama models or cloud providers.
</p>

<h2 id="built-in-ollama">Built-in Ollama Model Manager</h2>
<p>
	For 100% private, offline log analysis without sending data over the network, PocketMC features a native
	manager for <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">Ollama</a>.
</p>
<ul>
	<li>Automatically detects local running Ollama daemons on port <code class="mono">11434</code>.</li>
	<li>One-click download of lightweight models like <code class="mono">llama3.2</code> or <code class="mono">qwen2.5-coder</code> with progress tracking.</li>
	<li>100% local inference with zero API token costs.</li>
</ul>

<h2 id="cloud-providers">Cloud Provider Support</h2>
<p>
	If you prefer cloud models, PocketMC supports:
</p>
<ul>
	<li><strong>Google Gemini:</strong> Fast and cost-effective generation with native long-context support.</li>
	<li><strong>Anthropic Claude:</strong> Deep reasoning for complex mod collision traces.</li>
	<li><strong>OpenAI:</strong> GPT-4o and o-series reasoning models.</li>
	<li><strong>Mistral &amp; Groq:</strong> Ultra-low latency analysis.</li>
</ul>

<h2 id="privacy-sanitization">Automated Log Sanitization</h2>
<p>
	Before log snippets are submitted to an AI model, PocketMC's local privacy pipeline scrubs sensitive
	information from the text:
</p>
<ul>
	<li>Player IP addresses and subnet masks are replaced with pseudonyms.</li>
	<li>Email addresses, webhooks, and private API keys are redacted.</li>
	<li>Local Windows user directory paths (e.g. <code class="mono">C:\Users\username\...</code>) are normalized.</li>
</ul>
