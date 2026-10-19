<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>AI Log Summaries · PocketMC Docs</title>
	<meta
		name="description"
		content="Local Ollama model management, cloud LLM providers, and automated offline log sanitization."
	/>
</svelte:head>

<span class="kicker">Operations & Safety</span>
<h1>AI Log Summaries</h1>
<p class="summary">
	PocketMC parses multi-megabyte server log files and generates concise diagnostic incident reports using local Ollama models or external cloud providers. All logs pass through an offline privacy sanitizer before analysis.
</p>

<h2 id="built-in-ollama">Local Ollama Model Manager</h2>
<p>
	For offline log analysis without sending server telemetry across the internet, PocketMC interfaces with a local or remote <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">Ollama</a> instance:
</p>

<ul>
	<li><strong>Daemon Detection:</strong> Connects to <code class="mono">http://localhost:11434</code> by default, verified via the Ollama <code class="mono">GET /api/version</code> endpoint. You can also point PocketMC to a custom remote Ollama URL or an Ollama Cloud endpoint with an API key.</li>
	<li><strong>Model Catalog:</strong> Queries installed models and sizes on disk using <code class="mono">GET /api/tags</code>.</li>
	<li><strong>Streaming Downloads:</strong> Pulls new models using <code class="mono">POST /api/pull</code>, decoding streaming NDJSON chunks to display real-time download and layer extraction progress.</li>
	<li><strong>Recommended Models:</strong> Defaults to <code class="mono">qwen3:8b</code> for balanced reasoning and crash analysis, with support for <code class="mono">llama3.2</code>, <code class="mono">qwen2.5-coder</code>, or any custom tag installed on your host.</li>
	<li><strong>Zero Cloud Costs:</strong> Model inference executes entirely on your local GPU or CPU.</li>
</ul>

<h2 id="cloud-providers">Cloud Provider Integrations</h2>
<p>
	If you prefer cloud models with larger context windows for parsing massive modpack stack traces, PocketMC integrates with five external providers:
</p>

<table>
	<thead>
		<tr>
			<th>Provider</th>
			<th>Default Model</th>
			<th>Typical Use Case</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Google Gemini</strong></td>
			<td><code class="mono">gemini-3.8-flash</code></td>
			<td>Large context windows capable of ingesting entire historical session logs in a single prompt.</td>
		</tr>
		<tr>
			<td><strong>OpenAI</strong></td>
			<td><code class="mono">gpt-4o-mini</code></td>
			<td>Quick post-mortems and structured JSON extraction of crash causes.</td>
		</tr>
		<tr>
			<td><strong>Anthropic Claude</strong></td>
			<td><code class="mono">claude-3-5-haiku-latest</code></td>
			<td>Detailed root-cause analysis of complex Java exceptions and conflicting mod bytecode.</td>
		</tr>
		<tr>
			<td><strong>Mistral</strong></td>
			<td><code class="mono">mistral-large-latest</code></td>
			<td>High-accuracy reasoning and multi-language error message diagnosis.</td>
		</tr>
		<tr>
			<td><strong>Groq</strong></td>
			<td><code class="mono">llama-3.3-70b-versatile</code></td>
			<td>Ultra-low latency inference returning summaries within seconds of a server crash.</td>
		</tr>
	</tbody>
</table>

<p>
	Cloud provider API keys are encrypted with Windows DPAPI v2 and stored securely in <code class="mono">settings.json</code>.
</p>

<h2 id="privacy-sanitization">Automated Offline Log Sanitization</h2>
<p>
	Raw server logs frequently record sensitive operational data, including public player IP addresses, webhook credentials, and local Windows usernames. Before any log excerpt is submitted to a local or cloud LLM, PocketMC's internal <code class="mono">LogSanitizer</code> service filters the text in memory:
</p>

<ul>
	<li><strong>ANSI Code Stripping:</strong> Removes terminal formatting and escape sequences (<code class="mono">\x1B\[[0-9;]*[a-zA-Z]</code>) to clean up raw console output.</li>
	<li><strong>IP Redaction:</strong> Matches IPv4 patterns (<code class="mono">\b\d{'{'}1,3{'}'}\.\d{'{'}1,3{'}'}\.\d{'{'}1,3{'}'}\.\d{'{'}1,3{'}'}\b</code>) and replaces them with <code class="mono">[IP_REDACTED]</code> while preserving Minecraft server timestamp formatting. Matches IPv6 addresses and replaces them with <code class="mono">[IPV6_REDACTED]</code>.</li>
	<li><strong>Credential Redaction:</strong> Redacts email addresses (<code class="mono">[EMAIL_REDACTED]</code>), Discord webhook URLs, secret bearer tokens, and Playit claim URLs (<code class="mono">https://playit.gg/claim/[REDACTED]</code>).</li>
	<li><strong>Filesystem Normalization:</strong> Replaces Windows user profile folder paths (for example, <code class="mono">C:\Users\username\AppData</code>) with generalized placeholders (<code class="mono">C:\Users\USER\AppData</code>) to prevent exposing your Windows user account name.</li>
</ul>

<h2 id="incident-reporting">Incident Reporting Workflow</h2>
<p>
	When an unexpected server crash occurs:
</p>
<ol>
	<li>PocketMC captures the trailing console output lines and the most recent crash report from the server's <code class="mono">crash-reports/</code> directory.</li>
	<li>The content is sanitized in memory by <code class="mono">LogSanitizer</code>.</li>
	<li>A prompt containing the sanitized stack trace is dispatched to your configured AI model.</li>
	<li>The resulting diagnosis outlines the crashing mod or plugin, the exact Java exception, and actionable steps to resolve the issue. If Discord webhook notifications are configured, the summary is posted directly to your staff channel.</li>
</ol>
