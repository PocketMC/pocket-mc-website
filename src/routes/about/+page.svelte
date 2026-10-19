<script lang="ts">
	import '$lib/prose.css';
	import { repo, discord, reddit, dslabs } from '$lib/data/links';
</script>

<svelte:head>
	<title>About PocketMC · Open-Source Local Minecraft Server Hosting Project</title>
	<meta
		name="description"
		content="Learn about PocketMC, crafted by DS Labs: the premier open-source local Minecraft server hosting suite for Windows with zero port forwarding, Adoptium Java, and cloud backups."
	/>
	<meta
		name="keywords"
		content="about pocketmc, local minecraft server hosting, ds labs, open source minecraft server manager, self hosted minecraft windows"
	/>
	<meta property="og:title" content="About PocketMC · Open-Source Local Minecraft Server Hosting Project" />
	<meta
		property="og:description"
		content="Learn about PocketMC, crafted by DS Labs: local-first architecture, local file storage, user-space isolation, and MIT open-source mission."
	/>
	<meta name="twitter:title" content="About PocketMC · Open-Source Local Minecraft Server Hosting Project" />
	<meta
		name="twitter:description"
		content="Learn about PocketMC, crafted by DS Labs: local-first architecture, local file storage, user-space isolation, and MIT open-source mission."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://pocketmc.github.io/'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'About',
				item: 'https://pocketmc.github.io/about/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">About</span>
			<h1>About PocketMC</h1>
			<p class="summary">
				A local-first Minecraft server manager crafted by DS Labs to make running, configuring, and sharing
				servers on your PC simple.
			</p>

			<h2 id="ds-labs">Crafted by DS Labs</h2>
			<p>
				PocketMC is designed, engineered, and maintained by <strong><a href={dslabs} target="_blank" rel="noopener noreferrer">DS Labs</a></strong>, specializing in systems programming, C#/.NET Windows architecture, and local-first developer tooling. We believe software should run directly on your hardware without subscriptions, tracking, or vendor lock-in. Explore our work at <a href={dslabs} target="_blank" rel="noopener noreferrer">ds-labs.vercel.app</a>.
			</p>

			<h2 id="mission">Our Mission</h2>
			<p>
				Hosting a Minecraft server should be straightforward. For years, setting up a server meant either
				paying monthly subscription fees for cloud hosts or dealing with command-line scripts, manual Java version
				matching, and home router port forwarding.
			</p>
			<p>
				PocketMC lets you run dedicated Minecraft servers directly on your Windows PC with automated Java
				management, one-click sharing via Playit.gg tunnels, and full control over your files.
			</p>

			<h2 id="core-pillars">Core Architectural Pillars</h2>
			<ul>
				<li>
					<strong>Local File Storage:</strong> Your worlds, player data, and configurations stay on your
					hard drive, not locked in cloud subscriptions.
				</li>
				<li>
					<strong>User-Space Isolation:</strong> Runs without administrator rights and keeps Java runtimes
					inside the app folder without altering your system PATH.
				</li>
				<li>
					<strong>Tunnel Integration:</strong> Built-in Playit.gg and Cloudflare tunnels let friends join
					your server over the internet without opening router ports.
				</li>
			</ul>

			<h2 id="editorial-policy">Editorial &amp; Verification Policy</h2>
			<p>
				We hold our technical documentation, troubleshooting guides, and competitor comparisons to strict engineering standards:
			</p>
			<ul>
				<li>
					<strong>Audited Code Evidence:</strong> Product capabilities and architectural claims are verified against official documentation, license agreements, and public source repositories as of October 2026.
				</li>
				<li>
					<strong>Zero Sponsored Placement:</strong> All benchmarks and tool comparisons reflect empirical technical analysis without commercial influence, affiliate arrangements, or paid prioritization.
				</li>
				<li>
					<strong>Reproducible Testing:</strong> Memory footprints, process sandboxing, and backup write-holds are tested on clean Windows 10 and 11 environments. Corrections and reproduction reports can be submitted through our public issue tracker.
				</li>
			</ul>

			<h2 id="open-source">Free &amp; Open Source</h2>
			<p>
				PocketMC is free and open-source software released under the <strong>MIT License</strong>.
				The complete source code is public on GitHub for anyone to inspect, modify, or contribute to.
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
