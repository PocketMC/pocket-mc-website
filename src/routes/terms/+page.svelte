<script lang="ts">
	import '$lib/prose.css';
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Terms of Service — Pocket MC Open Source License & Terms (PocketMC)</title>
	<meta
		name="description"
		content="Pocket MC (PocketMC) Terms of Service. Review MIT open-source licensing terms, local execution rights, acceptable use guidelines, and Minecraft trademark disclaimers."
	/>
	<meta property="og:title" content="Terms of Service — Pocket MC Open Source License & Terms" />
	<meta
		property="og:description"
		content="Pocket MC (PocketMC) Terms of Service. Review MIT open-source licensing terms, local execution rights, acceptable use guidelines, and Minecraft trademark disclaimers."
	/>
	<meta name="twitter:title" content="Terms of Service — Pocket MC Open Source License & Terms" />
	<meta
		name="twitter:description"
		content="Pocket MC (PocketMC) Terms of Service. Review MIT open-source licensing terms, local execution rights, acceptable use guidelines, and Minecraft trademark disclaimers."
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
				name: 'Terms of Service',
				item: 'https://pocketmc.github.io/terms/'
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Legal</span>
			<h1>Terms of Service</h1>
			<p class="summary">
				PocketMC is an open-source desktop software application provided under the MIT License.
				By downloading, installing, or executing PocketMC, you agree to these Terms of Service.
			</p>

			<h2 id="software-license">1. Open-Source License &amp; Permitted Use</h2>
			<p>
				PocketMC is distributed free of charge under the terms of the MIT License. You are free to run, copy,
				modify, merge, publish, distribute, and sublicense the software in accordance with the license:
			</p>

			<Code
				label="MIT License"
				text={`MIT License

Copyright (c) 2026 PocketMC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
			/>

			<h2 id="minecraft-trademark">2. Minecraft Trademark Notice &amp; EULA</h2>
			<p>
				<strong>NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</strong>
			</p>
			<p>
				"Minecraft" is a registered trademark of Mojang Synergies AB. Neither PocketMC nor its maintainers are
				affiliated with, sponsored by, or endorsed by Mojang, Microsoft, or their affiliates.
			</p>
			<p>
				When downloading, hosting, or running Minecraft servers through PocketMC, you are solely responsible
				for complying with Mojang's <a href="https://www.minecraft.net/en-us/eula" target="_blank" rel="noopener noreferrer">End User License Agreement (EULA)</a>
				and <a href="https://www.minecraft.net/en-us/terms#terms-commercial" target="_blank" rel="noopener noreferrer">Commercial Usage Guidelines</a>.
			</p>

			<h2 id="user-responsibilities">3. User Responsibilities &amp; Acceptable Use</h2>
			<p>
				PocketMC enables you to operate servers directly on your personal hardware and expose them to local
				network or internet connections via tunneling. As the server operator, you agree that you will not:
			</p>
			<ul>
				<li>Use PocketMC to host, distribute, or facilitate illegal content, malware, spyware, or harmful binaries.</li>
				<li>Operate servers that violate local laws, ISP service agreements, or telecommunication regulations.</li>
				<li>Host fraudulent or predatory monetization schemes targeting Minecraft players in violation of Mojang's guidelines.</li>
				<li>Attempt to disrupt, abuse, or overload third-party tunneling, proxy, or download services used by the software.</li>
			</ul>

			<h2 id="third-party-services">4. Third-Party Software, Addons &amp; Services</h2>
			<p>
				PocketMC facilitates integration with third-party server engines (Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock BDS, PocketMine-MP),
				runtime providers (Eclipse Adoptium), addon repositories (Modrinth, CurseForge, Poggit), tunneling providers (Playit.gg, Cloudflare),
				and cloud storage services (Google Drive, Dropbox, OneDrive).
			</p>
			<ul>
				<li>Third-party software, mods, plugins, and services are subject to their own respective terms, licenses, and privacy policies.</li>
				<li>PocketMC does not develop, inspect, or guarantee the safety or functionality of community-authored mods or plugins installed through the marketplace.</li>
				<li>Third-party availability, API stability, and service quotas are governed entirely by their respective providers.</li>
			</ul>

			<h2 id="disclaimers">5. Limitation of Liability &amp; Disclaimers</h2>
			<p>
				The software is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether
				express or implied.
			</p>
			<p>
				To the maximum extent permitted by applicable law, neither PocketMC nor its contributors shall be liable
				for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
			</p>
			<ul>
				<li>Loss, corruption, or truncation of Minecraft world files, player inventories, or backup archives.</li>
				<li>Hardware crashes, overheating, power interruptions, or system resource exhaustion.</li>
				<li>Unauthorized network access, distributed denial-of-service (DDoS) events, or security breaches resulting from host exposure.</li>
				<li>Bans, enforcement actions, or penalties applied by Mojang, Microsoft, or third-party networks.</li>
			</ul>

			<h2 id="updates-and-contact">6. Updates, Changes &amp; Contact</h2>
			<p>
				These terms may be updated alongside major software releases. Continued use of PocketMC following an update
				signifies acceptance of the revised terms.
			</p>
			<p>
				For questions, license inquiries, or issue reporting, please visit our
				<a href="https://github.com/PocketMC/pocket-mc-windows" target="_blank" rel="noopener noreferrer">GitHub repository</a> or join our
				<a href="https://discord.gg/mWdMr8Mc2m" target="_blank" rel="noopener noreferrer">Discord community</a>.
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
