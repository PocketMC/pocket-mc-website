<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Java & Runtimes · PocketMC Docs</title>
	<meta
		name="description"
		content="App-local Adoptium JRE management, PHP 8.2 PM5, memory limits, and auto-selection."
	/>
</svelte:head>

<span class="kicker">Start here</span>
<h1>Java & Runtimes</h1>
<p class="summary">
	PocketMC eliminates system-wide Java conflicts by downloading, isolating, and managing Eclipse Adoptium
	JRE binaries directly inside your application data directory.
</p>

<h2 id="version-matrix">Version Compatibility Matrix</h2>
<p>
	Minecraft versions have strict Java bytecode requirements. PocketMC automatically inspects your
	server jar and selects the verified matching Adoptium runtime:
</p>

<table>
	<thead>
		<tr>
			<th>Minecraft Version</th>
			<th>Required Java</th>
			<th>Engine Types</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Minecraft 1.20.5 – Latest</td>
			<td>Java 21 / Java 25</td>
			<td>Paper, Fabric, NeoForge, Vanilla</td>
		</tr>
		<tr>
			<td>Minecraft 1.18 – 1.20.4</td>
			<td>Java 17</td>
			<td>Paper, Fabric, Forge, Vanilla</td>
		</tr>
		<tr>
			<td>Minecraft 1.17 – 1.17.1</td>
			<td>Java 16</td>
			<td>Spigot, Paper, Fabric</td>
		</tr>
		<tr>
			<td>Minecraft 1.12 – 1.16.5</td>
			<td>Java 11 / Java 8</td>
			<td>Forge, Spigot, Vanilla</td>
		</tr>
		<tr>
			<td>Minecraft 1.8.8 – 1.11.2</td>
			<td>Java 8</td>
			<td>Classic Forge, Paper, Spigot</td>
		</tr>
	</tbody>
</table>

<h2 id="storage-optimization">Disk Storage Optimization</h2>
<p>
	To conserve disk space on initial installation, PocketMC pre-fetches the latest Long-Term Support (LTS)
	runtime (Java 25/21). Older runtimes (Java 17, 11, 8) are pulled on-demand only when creating an older
	server instance.
</p>

<h2 id="memory-guards">Memory Guards &amp; Allocation Limits</h2>
<p>
	When configuring minimum and maximum heap memory (<code class="mono">-Xms</code> and <code class="mono">-Xmx</code>),
	PocketMC evaluates your total physical RAM. If your requested server allocation exceeds <strong>80% of available system memory</strong>,
	an allocation guard triggers to prevent Windows memory exhaustion and desktop lockups.
</p>

<h2 id="custom-java-override">Custom Java Path Override</h2>
<p>
	If you prefer to use a custom GraalVM, OpenJ9, or pre-installed JDK binary, you can navigate to
	<MenuPath steps={['Settings', 'Runtimes']} /> and provide a custom path to any <code class="mono">java.exe</code> binary.
</p>
