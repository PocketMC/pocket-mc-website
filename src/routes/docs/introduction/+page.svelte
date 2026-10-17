<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Introduction · PocketMC Docs</title>
	<meta
		name="description"
		content="Architecture overview, local-first principles, and core capabilities of PocketMC."
	/>
</svelte:head>

<span class="kicker">Start here</span>
<h1>Introduction</h1>
<p class="summary">
	PocketMC is a local-first Minecraft server manager engineered to eliminate terminal complexity,
	safeguard data sovereignty, and automate runtime operations on your personal computer.
</p>

<h2 id="core-principles">Core Principles</h2>
<p>
	Traditional Minecraft hosting forces a false dilemma: either pay recurring monthly fees to
	underpowered shared hosting services, or spend hours manually installing JDKs, configuring router
	port forwarding, and wrangling fragile batch scripts.
</p>
<p>
	PocketMC was created to bridge this gap: it turns your existing Windows, Linux, or macOS hardware
	into an automated, production-grade Minecraft server hub.
</p>

<ul>
	<li>
		<strong>100% Data Sovereignty:</strong> All server instances, worlds, plugins, player data, and configurations
		remain exclusively on your local disk. PocketMC never locks your files inside proprietary cloud silos.
	</li>
	<li>
		<strong>Zero Administrator Privileges:</strong> Runs entirely within user-space. Never pollutes system
		environment variables, registry keys, or global PATH directives.
	</li>
	<li>
		<strong>Automated Runtimes:</strong> Downloads and manages Eclipse Adoptium JRE binaries (Java 8, 11,
		17, 21, and 25) locally, assigning the exact version needed for each server build.
	</li>
	<li>
		<strong>Zero Router Setup:</strong> Features native Playit.gg network tunneling and Cloudflare Quick
		Tunnels, routing connections over public endpoints without router port forwarding.
	</li>
</ul>

<h2 id="architecture-overview">Architecture Overview</h2>
<p>
	The application is architected around isolated instance worktrees and a resilient background daemon.
	On Windows, it runs natively with WPF, hardware-accelerated Mica/Acrylic materials, and 120Hz+ display
	synchronization.
</p>

<Code
	label="Directory Layout"
	text={`PocketMC/
├── runtimes/
│   ├── java-8/
│   ├── java-17/
│   ├── java-21/
│   └── java-25/
├── servers/
│   ├── survival-paper/
│   │   ├── server.properties
│   │   ├── server.jar
│   │   └── plugins/
│   └── fabric-creative/
└── backups/`}
/>

<h2 id="quick-start">Quick Start</h2>
<p>
	Getting your first server running takes less than two minutes:
</p>
<ol>
	<li>Download and run <strong class="mono">PocketMC-Setup.exe</strong> from the home page.</li>
	<li>Click <MenuPath steps={['Create Server', 'Select Engine']} /> and choose Paper, Fabric, or Vanilla.</li>
	<li>Pick your preferred Minecraft version. PocketMC automatically provisions the required Java runtime.</li>
	<li>Click <strong>Start Server</strong>. Your live console will initialize immediately.</li>
	<li>Copy your tunnel join address from the dashboard to share with friends.</li>
</ol>
