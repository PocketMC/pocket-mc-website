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

<span class="kicker">Operations &amp; Safety</span>
<h1>Crash Recovery</h1>
<p class="summary">
	PocketMC supervises running server processes, protects against crash loops, automates maintenance reboots
	with in-game warnings, and prevents Windows from entering sleep mode while servers are active.
</p>

<h2 id="crash-loop-protection">Crash Loop Protection</h2>
<p>
	When a server terminates unexpectedly due to an unhandled exception or memory error, PocketMC captures the exit code and crash report:
</p>
<ul>
	<li>Exponential backoff: PocketMC attempts up to 3 automated restarts with progressive delays (10s, 30s, 60s).</li>
	<li>Failure halt: If the server fails to complete its boot sequence within 3 consecutive attempts, PocketMC suspends further restarts, flags the instance in an error state, and logs the stack trace.</li>
	<li>Health reset: Once a server stays online and operational past the initial startup window, the failure counter resets to zero.</li>
</ul>

<h2 id="job-objects">Child Process Supervision (Job Objects)</h2>
<p>
	Traditional batch scripts can leave orphaned Java processes running in the background when the terminal window closes.
	PocketMC binds each launched server process to a Windows Job Object:
</p>
<ul>
	<li>Kernel-level tracking: Uses <code class="mono">CreateJobObject</code> and <code class="mono">AssignProcessToJobObject</code> from Windows <code class="mono">kernel32.dll</code>.</li>
	<li>Kill on close: Configured with <code class="mono">JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE</code> (0x2000). If PocketMC is closed, terminates, or crashes, the Windows kernel terminates all child Java, Bedrock, and tunnel processes automatically.</li>
	<li>Port release: Prevents orphaned JVMs from holding port leases or locking save files.</li>
</ul>

<h2 id="maintenance-scheduler">Scheduled Reboots &amp; In-Game Broadcasts</h2>
<p>
	Long-running Minecraft servers can experience memory fragmentation over days of continuous operation.
	PocketMC's <code class="mono">ServerRebootSchedulerService</code> manages scheduled restarts:
</p>

<h3>Reboot Modes</h3>
<p>
	Configure reboot behavior per instance under <MenuPath steps={['Instance Settings', 'Maintenance & Recovery']} />:
</p>
<ul>
	<li>Daily window: Restarts your server at a fixed local time each day (for example, <code class="mono">04:00 AM</code>). PocketMC tracks day boundaries to prevent duplicate restarts within the same window.</li>
	<li>Uptime interval: Restarts the server after a set number of operational hours (such as every 12 or 24 hours).</li>
	<li>Startup safeguard: The scheduler ignores restart triggers if the server was booted less than 60 seconds ago, preventing restart loops during boot.</li>
</ul>

<h3>In-Game Countdown Alerts</h3>
<p>
	When countdown warnings are enabled:
</p>
<ol>
	<li>PocketMC initiates a countdown before restarting (default: 60 seconds).</li>
	<li>Sends countdown alerts to in-game chat using <code class="mono">say</code> at staged intervals (60s, 30s, 15s, 10s, 5s down to 1s).</li>
	<li>Broadcasts a final message (<code class="mono">Server is rebooting now...</code>) immediately before issuing the shutdown command.</li>
	<li>If an administrator manually stops the instance during a countdown, the scheduled task cancels immediately.</li>
</ol>

<h2 id="windows-sleep-inhibition">Windows Sleep Inhibition</h2>
<p>
	Windows power settings normally put idle desktop computers to sleep, which drops active player connections.
</p>
<p>
	PocketMC includes a sleep prevention service that calls <code class="mono">SetThreadExecutionState</code> with
	<code class="mono">ES_SYSTEM_REQUIRED | ES_CONTINUOUS</code> while any server runs.
	A coordinator tracks running instances; when the last server stops, normal Windows power-saving behavior resumes automatically.
</p>
