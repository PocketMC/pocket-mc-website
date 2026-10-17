<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Network Tunnels · PocketMC Docs</title>
	<meta
		name="description"
		content="Zero-port-forward tunneling via integrated Playit.gg agent and Cloudflare Quick Tunnels."
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
	<li><strong>Multi-Protocol Support:</strong> Automatically maps Java Edition (25565), Bedrock (19132), GeyserMC, and Simple Voice Chat UDP ports.</li>
	<li><strong>Integrated Agent Console:</strong> View live tunnel latency, connection status, and health metrics directly in PocketMC.</li>
</ul>

<h2 id="quick-pairing">One-Click Pairing Wizard</h2>
<ol>
	<li>Navigate to <MenuPath steps={['Settings', 'Tunnels']} /> and click <strong>Setup Playit.gg</strong>.</li>
	<li>PocketMC launches the agent and generates a unique claim URL.</li>
	<li>Open the link in your browser to attach the agent to your free Playit account.</li>
	<li>Once linked, your custom public address (e.g. <code class="mono">mc.playit.gg:12345</code>) appears with a one-click copy button.</li>
</ol>

<h2 id="cloudflare-tunnels">Cloudflare Quick Tunnels</h2>
<p>
	For web dashboard remote access, PocketMC supports temporary, authenticated Cloudflare Quick Tunnels.
	This exposes your password-protected Remote Control web UI over a secure HTTPS URL without requiring domain configuration.
</p>
