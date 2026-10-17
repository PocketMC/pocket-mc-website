<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Webhooks & Events · PocketMC Docs</title>
	<meta
		name="description"
		content="Event subscriptions, JSON payload signatures, and real-time state broadcasts."
	/>
</svelte:head>

<span class="kicker">Developer Portal</span>
<h1>Webhooks & Events</h1>
<p class="summary">
	Subscribe to real-time lifecycle and operational events from your Minecraft servers to trigger custom
	Discord bots, notifications, and monitoring automations.
</p>

<h2 id="supported-events">Supported Events</h2>
<p>
	PocketMC broadcasts webhook notifications when key state changes occur:
</p>

<table>
	<thead>
		<tr>
			<th>Event Name</th>
			<th>Trigger Condition</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="mono">instance.started</code></td>
			<td>Server process has spawned and completed listening socket binding.</td>
		</tr>
		<tr>
			<td><code class="mono">instance.stopped</code></td>
			<td>Server process has exited gracefully following RCON save-flush.</td>
		</tr>
		<tr>
			<td><code class="mono">instance.crashed</code></td>
			<td>Process terminated unexpectedly with a non-zero exit code or uncaught error.</td>
		</tr>
		<tr>
			<td><code class="mono">backup.completed</code></td>
			<td>World backup archive created, checksummed, and uploaded to cloud.</td>
		</tr>
		<tr>
			<td><code class="mono">player.joined</code></td>
			<td>A player authenticated and joined the Minecraft game world.</td>
		</tr>
		<tr>
			<td><code class="mono">player.left</code></td>
			<td>A player disconnected from the server instance.</td>
		</tr>
	</tbody>
</table>

<h2 id="payload-schema">Sample Event Payload</h2>
<p>
	Every event is dispatched as a JSON <code class="mono">POST</code> request with an envelope containing the event metadata:
</p>

<Code
	label="instance.crashed Payload"
	lang="json"
	text={`{
  "event": "instance.crashed",
  "timestamp": "2026-10-18T03:14:00Z",
  "instance": {
    "id": "e3b0c442-98fc-4c14-9afb-f4c8996fb924",
    "name": "Survival SMP",
    "engine": "Paper",
    "version": "1.21.1"
  },
  "data": {
    "exitCode": 1,
    "crashReport": "java.lang.OutOfMemoryError: Java heap space",
    "autoRestartTriggered": true,
    "crashAttempt": 1
  }
}`}
/>

<h2 id="signature-verification">HMAC Signature Verification</h2>
<p>
	To verify that the webhook request genuinely originated from your local PocketMC daemon, inspect the
	<code class="mono">X-PocketMC-Signature</code> header. The header contains an HMAC-SHA256 signature calculated
	using your configured webhook secret key.
</p>

<Code
	label="Node.js Verification Example"
	text={`const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}`}
/>
