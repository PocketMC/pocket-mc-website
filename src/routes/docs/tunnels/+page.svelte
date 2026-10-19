<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Network Tunnels · PocketMC Docs</title>
	<meta
		name="description"
		content="Zero-port-forward tunneling via integrated Playit.gg agent, Simple Voice Chat UDP mapping, and Cloudflare Quick Tunnels."
	/>
</svelte:head>

<span class="kicker">Connectivity</span>
<h1>Network Tunnels</h1>
<p class="summary">
	PocketMC routes player and dashboard traffic over outbound encrypted tunnels, bypassing carrier-grade NAT
	(CGNAT) and local firewall restrictions without router port forwarding.
</p>

<h2 id="playit-gg">Playit.gg Integration</h2>
<p>
	PocketMC embeds the official <a href="https://playit.gg" target="_blank" rel="noopener noreferrer">Playit.gg</a>
	agent into its application directory. When started, the agent maintains an encrypted outbound connection to Playit's anycast routing edge.
</p>
<ul>
	<li>No router configuration: Connections tunnel outbound over UDP/TCP, avoiding manual router port forwarding.</li>
	<li>Protocol support: Automatically maps Minecraft Java (25565 TCP), Bedrock (19132 UDP), Geyser crossplay, and Simple Voice Chat (24454 UDP).</li>
	<li>Process supervisor: Monitors agent output with automated secret redaction, tracks connection state, and retries with exponential backoff if the tunnel drops.</li>
	<li>Network change awareness: Reconnects the tunnel when network interfaces change or when Windows resumes from sleep.</li>
</ul>

<h2 id="setup-flow">Linking an Account</h2>
<ol>
	<li>Open <MenuPath steps={['Settings', 'Tunnels']} /> and click <strong>Setup Playit.gg</strong>.</li>
	<li>PocketMC initiates the partner provisioning flow and generates a 6-character setup code or claim URL.</li>
	<li>Approve the agent in your Playit account to link your account.</li>
	<li>PocketMC receives the persistent agent secret key, encrypts it via Windows DPAPI, and immediately launches the background tunnel daemon.</li>
	<li>Your assigned join address (such as <code class="mono">mc.playit.gg:12345</code>) displays on your server cards with a copy button.</li>
</ol>

<h2 id="simple-voice-chat">Simple Voice Chat UDP Tunneling</h2>
<p>
	Proximity voice chat mods like <a href="https://modrinth.com/plugin/simple-voice-chat" target="_blank" rel="noopener noreferrer">Simple Voice Chat</a>
	stream voice packets over UDP (<code class="mono">24454</code> by default). Because Minecraft clients connect to voice chat on a secondary port, home hosting behind CGNAT typically blocks audio packets.
</p>
<p>
	PocketMC automates voice tunnel allocation through <code class="mono">SimpleVoiceChatDetector</code>:
</p>
<ul>
	<li>Detection: Inspects addon manifests (Modrinth project ID <code class="mono">9eGKb6K1</code>) and scans <code class="mono">mods/</code> or <code class="mono">plugins/</code> for voice chat JARs.</li>
	<li>Port discovery: Reads the active voice port from <code class="mono">voicechat-server.properties</code> or parses the startup log regex (<code class="mono">Voice chat server started at port ...</code>).</li>
	<li>Dual tunnel mapping: Creates a dedicated UDP tunnel alongside your primary game tunnel, routing audio traffic cleanly.</li>
	<li>Address display: Surfaces the voice address on your instance cards, in the web dashboard, and in Discord Rich Presence.</li>
</ul>

<h2 id="cloudflare-tunnels">Cloudflare Quick Tunnels</h2>
<p>
	For remote access to the web dashboard, PocketMC supports Cloudflare Quick Tunnels:
</p>
<ul>
	<li>Provisions an app-local <code class="mono">cloudflared</code> binary.</li>
	<li>Launches an ad-hoc reverse tunnel pointing to Kestrel on <code class="mono">127.0.0.1:25580</code>.</li>
	<li>Generates a temporary HTTPS endpoint (<code class="mono">https://*.trycloudflare.com</code>) with TLS termination at Cloudflare's edge.</li>
	<li>Protected by the same authentication and rate-limiting rules as local LAN access.</li>
</ul>
