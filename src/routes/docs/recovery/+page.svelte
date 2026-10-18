<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Crash Recovery · PocketMC Docs</title>
	<meta
		name="description"
		content="Automated reboot scheduler with in-game countdowns, crash-loop backoff limits, and Windows sleep inhibition."
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

<h2 id="maintenance-scheduler">Automated Reboot Scheduler &amp; In-Game Countdown</h2>
<p>
	Long-running Minecraft servers accumulate fragmented Java heap allocations, uncollected entity references,
	and memory leaks from complex plugins over days of continuous operation. PocketMC features an intelligent background
	reboot scheduler (<code class="mono">ServerRebootSchedulerService</code>) that automates periodic maintenance
	while keeping online players informed.
</p>

<h3>Reboot Modes</h3>
<p>
	Configure reboot behavior per instance under <MenuPath steps={['Instance Settings', 'Maintenance & Recovery']} />:
</p>
<ul>
	<li><strong>Daily Maintenance Window:</strong> Reboots your server at a fixed local time each day (e.g. <code class="mono">04:00 AM</code>). PocketMC verifies local day boundaries to prevent duplicate restarts within the same window.</li>
	<li><strong>Interval Recurrence:</strong> Reboots the server after a fixed number of operational uptime hours (e.g. every <code class="mono">12</code> or <code class="mono">24</code> hours) measured from the last reboot or initial session launch.</li>
	<li><strong>Minimum Uptime Safeguard:</strong> The scheduler automatically suppresses reboot triggers if the server was booted less than 1 minute ago, preventing unintended reboot cascades during startup.</li>
</ul>

<h3>Staged In-Game Broadcast Warnings</h3>
<p>
	Sudden server restarts disrupt active player gameplay and risk lost progress. When warnings are enabled:
</p>
<ol>
	<li>PocketMC initiates a countdown based on your configured warning duration (default: <code class="mono">60</code> seconds).</li>
	<li>Broadcasts countdown alerts directly into the in-game chat using <code class="mono">say</code> at staged intervals (<code class="mono">60s</code>, <code class="mono">30s</code>, <code class="mono">15s</code>, <code class="mono">10s</code>, <code class="mono">5s</code> down to <code class="mono">1s</code>).</li>
	<li>Emits corresponding timestamps to the PocketMC console and logs.</li>
	<li>Dispatches a final broadcast (<code class="mono">"Server is rebooting now..."</code>) immediately prior to initiating engine shutdown.</li>
</ol>

<h3>Safe Termination &amp; Cancellation</h3>
<ul>
	<li><strong>In-Flight Cancellation:</strong> If a server administrator manually stops, restarts, or kills the instance while a reboot countdown is ticking, the scheduled task is aborted immediately with zero orphaned timers.</li>
	<li><strong>Crash-Loop Intercept:</strong> If the server crashes during or immediately following a reboot, PocketMC's crash-loop protection engages, suspending the maintenance schedule until the root cause is resolved.</li>
	<li><strong>Desktop Notification:</strong> On completion, PocketMC displays a native Windows desktop toast notification confirming that the server was cleanly rebooted per schedule.</li>
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
