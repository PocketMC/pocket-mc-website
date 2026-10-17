<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Crash Recovery · PocketMC Docs</title>
	<meta
		name="description"
		content="Automated reboot scheduler, crash-loop backoff limits, and Windows sleep inhibition."
	/>
</svelte:head>

<span class="kicker">Operations & Safety</span>
<h1>Crash Recovery</h1>
<p class="summary">
	Automate server reboot schedules, protect against continuous crash-loops, and keep servers online
	when your desktop computer idles.
</p>

<h2 id="crash-loop-protection">Crash-Loop Protection &amp; Backoff</h2>
<p>
	If a mod throws an uncaught exception or an out-of-memory error causes a server instance to crash,
	PocketMC catches the exit signal and analyzes the crash output.
</p>
<p>
	To prevent burning CPU cycles in an infinite crash loop, PocketMC enforces a strict <strong>3-attempt crash limit</strong>
	with exponential backoff delays (10s, 30s, 60s). If the server fails to stay healthy across 3 boots, the instance is
	halted and an alert is flagged on your dashboard.
</p>

<h2 id="maintenance-scheduler">Scheduled Reboots &amp; In-Game Warnings</h2>
<p>
	Long-running Minecraft servers benefit from regular reboots to clear fragmented Java heap space.
	PocketMC includes a unified maintenance scheduler:
</p>
<ul>
	<li>Schedule daily reboots at low-traffic times (e.g. 04:00 AM).</li>
	<li>Automated in-game countdown announcements via <code class="mono">say</code> (at 10m, 5m, 1m, and 30s).</li>
	<li>Automatic player save-all before termination.</li>
</ul>

<h2 id="windows-sleep-inhibition">Windows Sleep Inhibition</h2>
<p>
	By default, Windows puts idle computers to sleep after a period of user inactivity, which terminates
	active multiplayer connections.
</p>
<p>
	PocketMC calls the Windows API (<code class="mono">SetThreadExecutionState</code>) with <code class="mono">ES_SYSTEM_REQUIRED | ES_CONTINUOUS</code>
	while any server instance is running. Once all servers are stopped, standard Windows power management resumes.
</p>
