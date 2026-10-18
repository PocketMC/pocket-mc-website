<script lang="ts">
	import '$lib/prose.css';
	import Code from '$lib/components/docs/Code.svelte';
	import { repo, discord } from '$lib/data/links';
</script>

<svelte:head>
	<title>Developer Portal - PocketMC REST API, CLI & Agent Tools</title>
	<meta
		name="description"
		content="Official PocketMC Developer Portal: embedded Kestrel REST API on port 25580, CLI scripting, Model Context Protocol (MCP) server card, and AI agent integration guides."
	/>
	<meta property="og:title" content="Developer Portal - PocketMC REST API, CLI & Agent Tools" />
	<meta
		property="og:description"
		content="Official PocketMC Developer Portal: embedded Kestrel REST API on port 25580, CLI scripting, Model Context Protocol (MCP) server card, and AI agent integration guides."
	/>
	<meta name="twitter:title" content="Developer Portal - PocketMC REST API, CLI & Agent Tools" />
	<meta
		name="twitter:description"
		content="Official PocketMC Developer Portal: embedded Kestrel REST API on port 25580, CLI scripting, Model Context Protocol (MCP) server card, and AI agent integration guides."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://pocketmc.github.io/'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Developers',
				item: 'https://pocketmc.github.io/developers/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Developers &amp; AI Agents</span>
			<h1>PocketMC Developer Portal</h1>
			<p class="summary">
				Automate local Minecraft server operations, build custom management workflows, or connect autonomous AI agents to PocketMC via the local REST API, command-line interface (CLI), and Model Context Protocol (MCP).
			</p>

			<h2 id="overview">Overview &amp; Architecture</h2>
			<p>
				PocketMC runs an embedded ASP.NET Core Kestrel web server on your local PC. It exposes both a responsive web interface and a comprehensive REST and WebSocket API.
			</p>
			<ul>
				<li><strong>Default Local Endpoint:</strong> <code class="mono">http://127.0.0.1:25580</code></li>
				<li><strong>API Specification:</strong> <a href="/docs/openapi.json">OpenAPI 3.1.0 JSON</a></li>
				<li><strong>MCP Server Card:</strong> <a href="/.well-known/mcp.json">/.well-known/mcp.json</a></li>
				<li><strong>Agent Instructions:</strong> <a href="/agent-instructions.md">/agent-instructions.md</a></li>
			</ul>

			<h2 id="free-tier-and-keys">Free Tier &amp; Self-Serve API Keys</h2>
			<p>
				PocketMC is 100% free and open-source software licensed under the MIT License. There are no paid tiers, subscription limits, API rate quotas, or credit-card requirements.
			</p>
			<p>
				To generate API credentials with zero onboarding friction:
			</p>
			<ol>
				<li>Open the PocketMC desktop application on Windows.</li>
				<li>Navigate to <strong>App Settings</strong> &rarr; <strong>Remote Control</strong>.</li>
				<li>Enable Remote Control and set your desired username and administrative password.</li>
				<li>Authenticate programmatically via <code class="mono">POST /api/login</code> to receive a session cookie, or pass your configured security token in the <code class="mono">X-PocketMC-Token</code> header.</li>
			</ol>

			<Code
				label="Authentication Example (curl)"
				lang="bash"
				text={`curl -s -X POST http://127.0.0.1:25580/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "your-password"}' \\
  -c cookies.txt`}
			/>

			<h2 id="rest-api">Core REST Endpoints</h2>
			<p>
				All REST endpoints communicate using standard JSON payloads over HTTP.
			</p>

			<table>
				<thead>
					<tr>
						<th>Method</th>
						<th>Endpoint</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code class="mono">POST</code></td>
						<td><code class="mono">/api/login</code></td>
						<td>Authenticate and issue session cookie.</td>
					</tr>
					<tr>
						<td><code class="mono">GET</code></td>
						<td><code class="mono">/api/status</code></td>
						<td>Daemon status, active ports, and public tunnel URLs.</td>
					</tr>
					<tr>
						<td><code class="mono">GET</code></td>
						<td><code class="mono">/api/instances</code></td>
						<td>List all configured Minecraft server instances.</td>
					</tr>
					<tr>
						<td><code class="mono">GET</code></td>
						<td><code class="mono">/api/instances/{'{'}id{'}'}/status</code></td>
						<td>Retrieve CPU, RAM, player count, and run state.</td>
					</tr>
					<tr>
						<td><code class="mono">POST</code></td>
						<td><code class="mono">/api/instances/{'{'}id{'}'}/start</code></td>
						<td>Launch a Minecraft server instance.</td>
					</tr>
					<tr>
						<td><code class="mono">POST</code></td>
						<td><code class="mono">/api/instances/{'{'}id{'}'}/stop</code></td>
						<td>Gracefully shut down instance with RCON save-flush.</td>
					</tr>
					<tr>
						<td><code class="mono">POST</code></td>
						<td><code class="mono">/api/instances/{'{'}id{'}'}/console</code></td>
						<td>Execute server console command (e.g. <code class="mono">say Hello</code>).</td>
					</tr>
					<tr>
						<td><code class="mono">GET</code></td>
						<td><code class="mono">/api/ws/console</code></td>
						<td>WebSocket endpoint for real-time live console streaming.</td>
					</tr>
				</tbody>
			</table>

			<h2 id="json-errors">Structured JSON Error Responses</h2>
			<p>
				When an error occurs, the PocketMC API returns structured, machine-parsable JSON with standardized error codes, human-readable explanations, and resolution hints:
			</p>

			<Code
				label="Standard JSON Error Response"
				lang="json"
				text={`{
  "error": {
    "code": "INSTANCE_NOT_FOUND",
    "message": "The server instance with the specified ID could not be found.",
    "resolution": "Verify the instance ID via GET /api/instances or create a new instance via the UI."
  }
}`}
			/>

			<p>Common API error codes include:</p>
			<ul>
				<li><code class="mono">UNAUTHORIZED</code>: Session expired or invalid authentication token.</li>
				<li><code class="mono">INSTANCE_NOT_FOUND</code>: The targeted instance UUID does not exist.</li>
				<li><code class="mono">INSTANCE_ALREADY_RUNNING</code>: Attempted to start an instance that is already active.</li>
				<li><code class="mono">PORT_CONFLICT</code>: Target server port is already bound by another process.</li>
				<li><code class="mono">JAVA_RUNTIME_MISSING</code>: The required JDK version is not provisioned.</li>
			</ul>

			<h2 id="cli">Official CLI &amp; Terminal Scripting</h2>
			<p>
				PocketMC can be installed and scripted directly via the Windows command line:
			</p>

			<Code
				label="Install via Windows Package Manager (Winget)"
				lang="bash"
				text={`winget install PocketMC.PocketMC`}
			/>

			<Code
				label="Headless Daemon Execution"
				lang="bash"
				text={`pocketmc.exe --headless --port 25580`}
			/>

			<h2 id="sandbox">Sandbox &amp; Testing Environment</h2>
			<p>
				For automated testing and AI agent verification without modifying production servers:
			</p>
			<ul>
				<li><strong>Mock Mode:</strong> Launch the daemon with <code class="mono">--mock</code> to simulate server start, stop, and console responses without spawning real Java processes.</li>
				<li><strong>Isolated Workspaces:</strong> Use <code class="mono">--data-dir &lt;path&gt;</code> to isolate test configurations, instances, and logs in a temporary scratch folder.</li>
			</ul>

			<h2 id="mcp">Model Context Protocol (MCP) Integration</h2>
			<p>
				PocketMC exposes native tools for AI assistants (such as Claude Code, Cursor, and OpenCode) via the Model Context Protocol. AI clients can discover capabilities through our official server card:
			</p>

			<Code
				label="MCP Discovery Card (/.well-known/mcp.json)"
				lang="json"
				text={`{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json",
  "name": "pocketmc",
  "title": "PocketMC Server Manager",
  "remotes": [
    {
      "type": "streamable-http",
      "url": "http://127.0.0.1:25580/mcp"
    }
  ]
}`}
			/>

			<h2 id="machine-readable">Machine-Readable Context for LLMs</h2>
			<p>
				AI agents and automated crawlers should ingest our dedicated context files:
			</p>
			<ul>
				<li><a href="/llms.txt"><strong>/llms.txt</strong></a>: Lightweight markdown index for LLMs and developer assistants.</li>
				<li><a href="/llms-full.txt"><strong>/llms-full.txt</strong></a>: Complete technical specification, FAQ, and comparison corpus.</li>
				<li><a href="/agent-instructions.md"><strong>/agent-instructions.md</strong></a>: Operational guidelines and decision framework for AI bots.</li>
				<li><a href="/docs/openapi.json"><strong>/docs/openapi.json</strong></a>: Full OpenAPI 3.1 REST API specification.</li>
			</ul>

			<div class="note">
				Need help integrating? Join our <a href={discord} target="_blank" rel="noopener noreferrer">Discord community</a> or explore the <a href={repo} target="_blank" rel="noopener noreferrer">GitHub repository</a>.
			</div>
		</article>
	</div>
</section>
