<script lang="ts">
	import '$lib/prose.css';
	import { repo, discord, reddit } from '$lib/data/links';
</script>

<svelte:head>
	<title>About · PocketMC</title>
	<meta
		name="description"
		content="About PocketMC: local-first architecture, open-source principles, and team."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">About</span>
			<h1>About PocketMC</h1>
			<p class="summary">
				A local-first Minecraft server manager engineered to eliminate terminal complexity, safeguard
				data sovereignty, and automate runtime operations on your personal computer.
			</p>

			<h2 id="mission">Our Mission</h2>
			<p>
				Hosting a Minecraft server should be as effortless as launching the game itself. For over a
				decade, players have had to choose between paying recurring subscription fees for underpowered
				cloud hosting or navigating complex terminal environments, manual Java installations, and home
				router configurations.
			</p>
			<p>
				PocketMC transforms your existing desktop or laptop computer into a powerful, automated Minecraft
				server host with zero router port forwarding and zero system pollution.
			</p>

			<h2 id="core-pillars">Core Architectural Pillars</h2>
			<ul>
				<li>
					<strong>Data Sovereignty:</strong> Your worlds, player inventories, and server configurations
					live on your local drive. They are never locked inside proprietary cloud silos or held hostage
					behind subscription plans.
				</li>
				<li>
					<strong>Desktop User-Space:</strong> PocketMC installs per-user and never requires administrative
					elevation. It isolates Adoptium runtimes and instance directories completely from system
					environment variables.
				</li>
				<li>
					<strong>Zero-Friction Networking:</strong> With embedded Playit.gg and Cloudflare tunnels, friends
					can connect to your local server over the public internet immediately.
				</li>
			</ul>

			<h2 id="open-source">Free &amp; Open Source</h2>
			<p>
				PocketMC is 100% free and open-source software released under the <strong>MIT License</strong>.
				The complete source code is public and transparent on GitHub. You are free to inspect, audit, fork,
				and contribute.
			</p>
			<p>
				Join our community on <a href={discord} target="_blank" rel="noopener noreferrer">Discord</a> or
				participate in discussions on <a href={reddit} target="_blank" rel="noopener noreferrer">Reddit</a>.
			</p>
		</article>
	</div>
</section>

<style>
	.doc-container {
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.prose {
		max-width: 720px;
		margin: 0 auto;
	}

	@media (max-width: 900px) {
		.doc-container {
			padding-top: 32px;
			padding-bottom: 64px;
		}
	}
</style>
