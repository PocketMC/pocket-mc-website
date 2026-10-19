<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>PocketMC Documentation - Overview & Setup Guide</title>
	<meta
		name="description"
		content="Official PocketMC documentation: architecture overview, server engine setup, Adoptium Java runtimes, zero-port Playit.gg tunnels, and backup configuration."
	/>
</svelte:head>

<span class="kicker">Start here</span>
<h1>Introduction</h1>
<p class="summary">
	PocketMC is a local-first Minecraft server manager for Windows. It runs directly on your machine,
	isolates server runtimes into dedicated folders, and automates Java provisioning, networking tunnels,
	backups, and remote management.
</p>

<h2 id="core-principles">Design Principles</h2>
<p>
	Running a Minecraft server at home usually involves manual Java installations, router port forwarding,
	fragile startup scripts, and keeping track of mod dependencies by hand. PocketMC handles these operations
	locally while giving you direct access to server files on your drive.
</p>

<ul>
	<li>
		Local storage: All server files, worlds, plugins, player records, and settings remain on your
		local drive in standard Minecraft formats. You can move, edit, or back up folders directly in File Explorer.
	</li>
	<li>
		Isolated runtimes: Eclipse Adoptium JRE builds and PHP binaries are downloaded into dedicated runtime
		subdirectories. PocketMC launches each server with its required runtime without altering your system PATH or Windows registry.
	</li>
	<li>
		Outbound tunneling: An integrated Playit.gg daemon and Cloudflare Quick Tunnel provider route traffic over
		secure outbound tunnels. Friends can connect over the internet without modifying router firewall settings.
	</li>
	<li>
		Process supervision: Servers run inside Win32 Job Objects. When PocketMC closes, child processes terminate
		predictably without leaving orphaned Java instances running in the background.
	</li>
</ul>

<h2 id="architecture-overview">Directory Layout</h2>
<p>
	PocketMC organizes instances, runtimes, and tunnels inside a central root folder (by default,
	<code class="mono">%USERPROFILE%\Documents\PocketMC</code>, or any folder you choose during initial setup):
</p>

<Code
	label="Filesystem Layout"
	text={`PocketMC/
├── instances/
│   └── survival-paper/
│       ├── .pocket-mc.json          # Instance metadata and runtime configuration
│       ├── server.properties        # Standard Minecraft server configuration
│       ├── server.jar               # Versioned engine binary (Paper, Fabric, etc.)
│       ├── plugins/                 # Addons, mods, or datapacks
│       ├── world/                   # Dimension save folders
│       └── backups/
│           ├── .pocket-mc-backups.json  # Checksum manifest and trigger history
│           └── world-2026-03-15.zip # Local world archives
├── runtimes/
│   ├── java-8/                      # Adoptium JRE binaries for classic builds
│   ├── java-17/                     # Adoptium JRE for 1.18 - 1.20.4
│   └── java-21/                     # Adoptium JRE for modern 1.20.5+
├── runtime/
│   └── php8.2/                      # App-local PHP runtime for PocketMine-MP
├── tunnel/
│   ├── playit.exe                   # Verified tunnel agent binary
│   └── playit.toml                  # Active session credentials
├── settings.json                    # DPAPI-encrypted user settings
└── logs/                            # Application diagnostic logs`}
/>

<h2 id="quick-start">Quick Start</h2>
<p>
	Setting up your first server takes a few steps:
</p>
<ol>
	<li>Run <strong class="mono">PocketMC-Setup.exe</strong> and complete initial folder selection.</li>
	<li>Click <MenuPath steps={['Create Server', 'Select Engine']} /> and choose your preferred engine (Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock BDS, or PocketMine-MP).</li>
	<li>Pick a Minecraft version. PocketMC checks whether the required Java or PHP runtime is present and downloads it automatically if needed.</li>
	<li>Click <strong>Start Server</strong>. The terminal will initialize and stream startup output in real time.</li>
	<li>Copy your tunnel join address from the server dashboard to share with friends.</li>
</ol>
