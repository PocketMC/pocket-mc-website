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

<span class="kicker">Operations &amp; Safety</span>
<h1>Cloud Backups</h1>
<p class="summary">
	PocketMC creates non-corrupting world backups using RCON save-holding, calculates SHA-256 integrity
	checksums, syncs to cloud storage providers, and performs atomic world restores with automatic rollback.
</p>

<h2 id="save-sync">World Save Synchronization</h2>
<p>
	Copying world region files while a Minecraft server writes to disk causes corrupt chunk boundaries and broken save files.
	PocketMC coordinates disk synchronization before packaging the world:
</p>
<ol>
	<li>If RCON is enabled in <code class="mono">server.properties</code>, PocketMC connects via loopback RCON and issues <code class="mono">save-off</code>, followed by <code class="mono">save-all</code>.</li>
	<li>If RCON is disabled, PocketMC sends <code class="mono">save-off</code> and <code class="mono">save-all</code> directly to process standard input and monitors console logs for save confirmation output (<code class="mono">saved the chunks</code> or <code class="mono">all dimensions are saved</code>).</li>
	<li>Skips transient lock files like <code class="mono">session.lock</code> that prevent archive extraction.</li>
	<li>Compresses the world folder into a timestamped zip archive (<code class="mono">world-yyyy-MM-dd-HH-mm-ss.zip</code>).</li>
	<li>Executes <code class="mono">save-on</code> in a guaranteed cleanup block to resume normal background saving.</li>
</ol>

<h2 id="manifest-integrity">Checksums &amp; Backup Manifest</h2>
<p>
	Every backup produces a SHA-256 checksum and is logged into the instance manifest (<code class="mono">.pocket-mc-backups.json</code>):
</p>
<ul>
	<li>Integrity validation: Checks the hash of each backup file against the recorded checksum before any restore attempt.</li>
	<li>Trigger tracking: Records whether each backup was initiated manually or by the background scheduler.</li>
	<li>Size delta: Calculates byte differences between consecutive backups so you can monitor world growth.</li>
	<li>Local retention: Automatically keeps the configured number of backups (default: 5), deleting older zip files and pruning orphaned manifest entries.</li>
</ul>

<h2 id="cloud-providers">Cloud Storage Providers</h2>
<p>
	Backups can replicate automatically to external storage and cloud providers:
</p>
<ul>
	<li>Google Drive: Uses dedicated application folders with token authorization.</li>
	<li>Dropbox: Streams chunked uploads with version retention.</li>
	<li>Microsoft OneDrive: Connects through Microsoft Graph API.</li>
	<li>External directory replication: If you configure a secondary internal drive or USB disk in settings (<code class="mono">ExternalBackupDirectory</code>), backups clone to local disk storage as well.</li>
	<li>Deduplication: PocketMC checks the local SHA-256 against upload history to avoid re-uploading identical archives.</li>
	<li>Cloud retention: Enforces retention counts per target provider, removing older remote files after successful uploads.</li>
</ul>

<h2 id="atomic-restore">Safe Atomic Restore Pipeline</h2>
<p>
	Restoring a world backup uses a staged replacement pipeline to protect against partial extraction failures:
</p>
<ol>
	<li>Integrity check: Verifies that the backup ZIP is readable and that its SHA-256 matches the manifest.</li>
	<li>Staged extraction: Unpacks the archive into a temporary staging folder (<code class="mono">.restore-stage-{'{'}guid{'}'}</code>).</li>
	<li>World validation: Confirms that <code class="mono">level.dat</code> is present in the extracted folder to ensure the archive is a valid Minecraft world.</li>
	<li>Safety backup: Moves the current active world directory to <code class="mono">.restore-backup-{'{'}timestamp{'}'}</code>.</li>
	<li>Atomic swap: Moves the staged directory into the active world location. If the folder move fails, PocketMC immediately restores your original world from the safety backup.</li>
</ol>
