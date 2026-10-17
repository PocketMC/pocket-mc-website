<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Cloud Backups · PocketMC Docs</title>
	<meta
		name="description"
		content="Safe RCON save-holding, SHA-256 integrity validation, and Google Drive / Dropbox / OneDrive sync."
	/>
</svelte:head>

<span class="kicker">Operations & Safety</span>
<h1>Cloud Backups</h1>
<p class="summary">
	Protect your Minecraft worlds from accidental corruption, hardware failures, and griefing with automated,
	checksummed cloud replication.
</p>

<h2 id="rcon-save-sync">Zero-Corruption RCON Save-Sync</h2>
<p>
	Backing up an active Minecraft world without pausing disk writes often leads to corrupted chunk boundaries
	and region file discrepancies.
</p>
<p>
	PocketMC uses native RCON automation before creating backup archives:
</p>
<ol>
	<li>Issues <code class="mono">save-off</code> to suspend world writes to disk.</li>
	<li>Issues <code class="mono">save-all flush</code> to force all memory chunks onto persistent storage.</li>
	<li>Skips ephemeral lock files (such as <code class="mono">session.lock</code>) that cause archive extraction errors.</li>
	<li>Packages the world and database into an optimized compressed zip archive.</li>
	<li>Issues <code class="mono">save-on</code> to resume standard in-game autosaving.</li>
</ol>

<h2 id="cloud-providers">Supported Cloud Providers</h2>
<p>
	PocketMC supports native OAuth 2.0 replication to three leading cloud storage platforms:
</p>
<ul>
	<li><strong>Google Drive:</strong> Dedicated application folder synchronization with automatic quota alerts.</li>
	<li><strong>Dropbox:</strong> Direct chunked upload stream with version retention.</li>
	<li><strong>Microsoft OneDrive:</strong> Graph API integration for personal and business accounts.</li>
</ul>

<h2 id="scheduled-cron">Automated Cron Backups</h2>
<p>
	Configure backups to trigger automatically at set intervals. In <MenuPath steps={['Instance Settings', 'Backups']} />,
	you can set standard hourly schedules, daily maintenance windows, or custom 5-field Cron expressions.
</p>
