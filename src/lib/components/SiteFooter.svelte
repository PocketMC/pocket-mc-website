<script lang="ts">
	import { page } from '$app/state';
	import { discord, reddit, youtube, buymeacoffee, repo, website, email } from '$lib/data/links';
	import Logo from './Logo.svelte';

	const home = $derived(page.url.pathname === '/' ? '' : '/');
</script>

<footer class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="cols">
			<div class="about">
				<a href="{home}#top" class="brand">
					<Logo size={20} />
					<span>PocketMC</span>
				</a>
				<p>
					The local-first Minecraft server manager. Zero router setup, app-local Java provisioning,
					and seamless cloud backups.
				</p>
			</div>

			<div class="links">
				<div>
					<h3>Site</h3>
					<a href="{home}#steps">Install</a>
					<a href="{home}#about">Features</a>
					<a href="{home}#tour">Showcase</a>
					<a href="/gallery">Gallery</a>
					<a href="{home}#softwares">Softwares</a>
					<a href="{home}#comparison">Comparison</a>
					<a href="/docs">Docs</a>
					<a href="/faq">FAQ</a>
				</div>
				<div>
					<h3>Project</h3>
					<a href={repo} target="_blank" rel="noopener noreferrer">GitHub (Windows)</a>
					<a href="https://github.com/PocketMC/pocket-mc-linux-mac" target="_blank" rel="noopener noreferrer">GitHub (Linux/Mac)</a>
					<a href={website} target="_blank" rel="noopener noreferrer">Website Source</a>
					<a href="/changelog">Changelog</a>
					<a href="/about">About Us</a>
					<a href="/contact">Contact</a>
				</div>
				<div>
					<h3>Community</h3>
					<a href={discord} target="_blank" rel="noopener noreferrer">Discord Server</a>
					<a href={reddit} target="_blank" rel="noopener noreferrer">Reddit Community</a>
					<a href={youtube} target="_blank" rel="noopener noreferrer">YouTube Channel</a>
					<a href={buymeacoffee} target="_blank" rel="noopener noreferrer">Support Creator</a>
					<a href="{repo}/issues" target="_blank" rel="noopener noreferrer">Report Issue</a>
				</div>
				<div>
					<h3>Legal</h3>
					<a href="/terms">Terms of Service</a>
					<a href="/privacy">Privacy Policy</a>
					<a href="{repo}/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License (GPL-3.0)</a>
					<a href="mailto:{email}">Security Contact</a>
				</div>
			</div>
		</div>

		<div class="legal">
			<p>
				PocketMC is free and open-source software licensed under the GNU General Public License v3.0.
				NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
			</p>
			<p>
				Minecraft is a trademark of Mojang Synergies AB. All other trademarks, product names, and company
				logos referenced on this website are the property of their respective owners.
			</p>
		</div>
	</div>
</footer>

<style>
	.page {
		padding-top: 48px;
		padding-bottom: 40px;
	}

	.cols {
		display: flex;
		justify-content: space-between;
		gap: 48px;
		flex-wrap: wrap;
	}

	.about {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 280px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.about p {
		font-size: 13px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.links {
		display: flex;
		gap: 56px;
		flex-wrap: wrap;
	}

	.links > div {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	.links a:hover {
		color: var(--fg);
	}

	h3 {
		margin: 0 0 4px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--muted-fg);
	}

	.legal {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 48px;
		padding-top: 20px;
		border-top: 1px solid var(--line);
	}

	.legal p {
		max-width: 72ch;
		font-size: 12px;
		line-height: 1.6;
		color: var(--dim);
		text-wrap: pretty;
	}

	@media (max-width: 900px) {
		.page {
			padding-top: 36px;
		}

		.cols {
			gap: 36px;
		}

		.links {
			gap: 36px;
		}
	}
</style>
