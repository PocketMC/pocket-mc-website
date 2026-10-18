<script lang="ts">
	import '$lib/prose.css';
	import { discord, reddit, youtube, buymeacoffee, repo, email } from '$lib/data/links';
</script>

<svelte:head>
	<title>PocketMC Support & Contact - Community Discord & Help</title>
	<meta
		name="description"
		content="Get official PocketMC support and connect with the community. Join our Discord server, report bugs on GitHub, submit feature requests, or contact the team."
	/>
	<meta property="og:title" content="PocketMC Support & Contact" />
	<meta
		property="og:description"
		content="Get official PocketMC support and connect with the community. Join our Discord server, report bugs on GitHub, submit feature requests, or contact the team."
	/>
	<meta name="twitter:title" content="PocketMC Support & Contact" />
	<meta
		name="twitter:description"
		content="Get official PocketMC support and connect with the community. Join our Discord server, report bugs on GitHub, submit feature requests, or contact the team."
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
				name: 'Contact',
				item: 'https://pocketmc.github.io/contact/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Contact</span>
			<h1>Get in Touch</h1>
			<p class="summary">
				Connect with the core developers, join our community for real-time troubleshooting, or submit
				feature requests and private security vulnerability disclosures.
			</p>

			<h2 id="community-support">Community Support &amp; Chat</h2>
			<p>
				For setup assistance, general troubleshooting, and announcements, our Discord server is the
				fastest channel:
			</p>
			<ul>
				<li>
					<a href={discord} target="_blank" rel="noopener noreferrer">Official PocketMC Discord</a> - Live community support and development updates.
				</li>
				<li>
					<a href={reddit} target="_blank" rel="noopener noreferrer">r/PocketMC on Reddit</a> - Community showcases, guides, and discussions.
				</li>
				<li>
					<a href={youtube} target="_blank" rel="noopener noreferrer">Official YouTube Channel</a> - Video tutorials and showcase demonstrations.
				</li>
			</ul>

			<h2 id="bug-reports">Bug Reports &amp; Technical Issues</h2>
			<p>
				Found a reproducible bug or have a feature proposal? Submit an issue on our GitHub issue tracker:
			</p>
			<p>
				<a href="{repo}/issues" target="_blank" rel="noopener noreferrer">GitHub Issue Tracker</a>
			</p>
			<p>
				Please include your PocketMC version, operating system, server engine type, and any relevant sanitized
				terminal output to help us isolate the issue quickly.
			</p>

			<h2 id="direct-email">Direct Inquiries &amp; Security</h2>
			<p>
				For partnership inquiries, private security disclosures, or formal notices, reach out directly via email:
			</p>
			<p>
				<a href="mailto:{email}" class="mono">{email}</a>
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
