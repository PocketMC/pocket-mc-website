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
	Let friends and players connect to your local servers over the public internet without accessing your
	home router or opening insecure open ports.
</p>

<h2 id="playit-gg">Playit.gg Integration</h2>
<p>
	PocketMC embeds the official <a href="https://playit.gg" target="_blank" rel="noopener noreferrer">Playit.gg</a> daemon (v1.0.10) directly into its binary suite.
	When enabled, the agent initiates an outbound encrypted tunnel to Playit's global routing edge.
</p>

<ul>
	<li><strong>Zero Port Forwarding:</strong> Bypasses carrier-grade NAT (CGNAT) and ISP port restrictions.</li>
	<li><strong>Multi-Protocol Support:</strong> Automatically maps Java Edition (25565), Bedrock (19132), GeyserMC crossplay, and Simple Voice Chat UDP ports.</li>
	<li><strong>Integrated Agent Console:</strong> View live tunnel latency, connection status, and health metrics directly in PocketMC.</li>
</ul>

<h2 id="quick-setup">One-Click Setup Wizard</h2>
<ol>
	<li>Navigate to <MenuPath steps={['Settings', 'Tunnels']} /> and click <strong>Setup Playit.gg</strong>.</li>
	<li>PocketMC launches the agent and generates a unique claim URL.</li>
	<li>Open the link in your browser to attach the agent to your free Playit account.</li>
	<li>Once linked, your custom public address (e.g. <code class="mono">mc.playit.gg:12345</code>) appears with a one-click copy button.</li>
</ol>

<h2 id="simple-voice-chat">Simple Voice Chat (SVC) UDP Tunneling</h2>
<p>
	Proximity voice chat mods like <a href="https://modrinth.com/plugin/simple-voice-chat" target="_blank" rel="noopener noreferrer">Simple Voice Chat</a> transmit continuous low-latency audio streams over a separate UDP port (<code class="mono">24454</code> by default). For home servers behind CGNAT or strict firewalls, configuring UDP voice chat without port forwarding is often challenging.
</p>
<p>
	PocketMC automates this with built-in Voice Chat tunnel discovery:
</p>
<ul>
	<li><strong>Automatic Addon Detection:</strong> PocketMC's <code class="mono">SimpleVoiceChatDetector</code> inspects your server's <code class="mono">mods/</code> (Fabric, Forge, NeoForge) and <code class="mono">plugins/</code> (Paper, Purpur) directories and marketplace manifests to detect the Simple Voice Chat addon.</li>
	<li><strong>Dynamic Port Resolution:</strong> Reads your active port from <code class="mono">voicechat-server.properties</code> (or live console startup logs), automatically adapting if you configured a non-standard port.</li>
	<li><strong>Dual-Tunnel Provisioning:</strong> When Playit.gg is active, PocketMC allocates and maintains a dedicated UDP tunnel alongside your game port (TCP for Java or UDP for Bedrock).</li>
	<li><strong>Unified Address Display:</strong> The allocated voice tunnel address is shown alongside your server connection card, in the Remote Control web portal, and within Discord Rich Presence with one-click copy.</li>
</ul>

<h2 id="cloudflare-tunnels">Cloudflare Quick Tunnels</h2>
<p>
	For web dashboard remote access, PocketMC supports temporary, authenticated Cloudflare Quick Tunnels.
	This exposes your password-protected Remote Control web UI over a secure HTTPS URL without requiring domain configuration.
</p>
