<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Discord Integration · PocketMC Docs</title>
	<meta
		name="description"
		content="Custom Discord Rich Presence (RPC) and automated welcome bot verification."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Discord Integration</h1>
<p class="summary">
	Connect your desktop client with Discord for live activity status, player join notifications, and
	direct DM delivery of remote control access tokens.
</p>

<h2 id="rich-presence">Discord Rich Presence (RPC)</h2>
<p>
	Show your friends what you are hosting in real-time. PocketMC provides deep Rich Presence customization
	with an in-app live preview card:
</p>
<ul>
	<li>Display active Minecraft version, server engine type, and uptime.</li>
	<li>Show current connected player counts (e.g. <code class="mono">Playing Survival (4/20)</code>).</li>
	<li>Add interactive buttons with direct links to your server's Discord or website.</li>
</ul>

<h2 id="welcome-bot">PocketMC Welcome Bot</h2>
<p>
	PocketMC operates an official community Discord bot (<code class="mono">pocketmc-welcome-bot</code>).
	When paired with your desktop client:
</p>
<ol>
	<li>The bot verifies server ownership and assigns member roles in your Discord server.</li>
	<li>When your PC reboots or launches, the bot DMs you your active Playit tunnel and remote web access URL.</li>
	<li>Crash alerts and memory warnings can be broadcasted to designated staff channels.</li>
</ol>
