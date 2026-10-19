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
<h1>Java &amp; Runtimes</h1>
<p class="summary">
	PocketMC downloads and isolates Eclipse Adoptium JRE builds and PHP binaries directly inside your
	application directory, avoiding system PATH edits and global version conflicts.
</p>

<h2 id="version-matrix">Version Compatibility Matrix</h2>
<p>
	Minecraft versions require specific Java bytecode releases. PocketMC inspects server JAR manifests and
	assigns the matching Adoptium runtime:
</p>

<table>
	<thead>
		<tr>
			<th>Minecraft Version</th>
			<th>Java Version</th>
			<th>Compatible Engines</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Minecraft 1.20.5 to Latest</td>
			<td>Java 21 / Java 25</td>
			<td>Vanilla, Paper, Fabric, NeoForge</td>
		</tr>
		<tr>
			<td>Minecraft 1.18 to 1.20.4</td>
			<td>Java 17</td>
			<td>Vanilla, Paper, Fabric, Forge</td>
		</tr>
		<tr>
			<td>Minecraft 1.17 to 1.17.1</td>
			<td>Java 16</td>
			<td>Vanilla, Paper, Fabric</td>
		</tr>
		<tr>
			<td>Minecraft 1.12 to 1.16.5</td>
			<td>Java 11 / Java 8</td>
			<td>Vanilla, Paper, Forge</td>
		</tr>
		<tr>
			<td>Minecraft 1.8.8 to 1.11.2</td>
			<td>Java 8</td>
			<td>Vanilla, Paper, Classic Forge</td>
		</tr>
	</tbody>
</table>

<h2 id="adoptium-provisioning">Automated Adoptium JRE Provisioning</h2>
<p>
	When an instance requires a Java runtime that is not yet installed locally:
</p>
<ol>
	<li>PocketMC queries the Adoptium API for Windows x64 HotSpot packages (<code class="mono">image_type=jre</code>).</li>
	<li>If a standalone JRE is unavailable for that release, it falls back to the full JDK package.</li>
	<li>Network requests use an exponential retry policy (2s, 5s, 10s delays across 3 attempts).</li>
	<li>Downloads are saved to <code class="mono">runtimes/java-{'{'}version{'}'}/</code> and verified by running <code class="mono">java -version</code> against the extracted executable.</li>
</ol>

<h2 id="memory-guards">Memory Limits &amp; Hardware Allocation Checks</h2>
<p>
	Before launching a server with custom heap limits (<code class="mono">-Xms</code> and <code class="mono">-Xmx</code>),
	PocketMC queries total and available physical RAM via the Windows API (<code class="mono">GlobalMemoryStatusEx</code> in <code class="mono">kernel32.dll</code>).
</p>
<p>
	If your requested heap allocation exceeds 80% of total physical RAM or leaves insufficient memory for Windows system processes, PocketMC displays an allocation warning to prevent system freezing and out-of-memory crashes.
</p>

<h2 id="custom-java-override">Custom Java Paths</h2>
<p>
	If you prefer to use GraalVM, OpenJ9, or a pre-installed JDK binary already on your machine, open
	<MenuPath steps={['Settings', 'Runtimes']} /> and enter a direct file path to your chosen <code class="mono">java.exe</code>.
	PocketMC will validate the binary's version string before applying it to your instances.
</p>

<h2 id="php-runtime">PocketMine-MP (PHP 8.2 PM5)</h2>
<p>
	PocketMine-MP runs on PHP rather than Java. PocketMC automatically downloads a Windows x64 PHP 8.2 binary package
	from the official <code class="mono">pmmp/PHP-Binaries</code> repository into <code class="mono">runtime/php8.2/</code>.
</p>
<p>
	The runtime contains required extensions (such as <code class="mono">pocketmine-chunkutils</code>, <code class="mono">curl</code>,
	and <code class="mono">yaml</code>) configured for PM5. It runs entirely inside PocketMC's directory tree without adding PHP to your Windows PATH.
</p>
