<script lang="ts">
	import { page } from '$app/state';
	import { discord, reddit, youtube, buymeacoffee, repo, website } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Glyph from './Glyph.svelte';
	import Mark from './Mark.svelte';

	let { license = 'MIT' }: { license?: string | null } = $props();

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
					High-performance Minecraft server management right on your desktop, crafted by DS Labs. Zero port forwarding,
					instant public tunnels, and pure bare-metal power.
				</p>
			</div>

			<div class="links">
				<div>
					<h3>Site</h3>
					<a href="{home}#about">
						<Glyph name="sliders" size={13} />
						<span>Features</span>
					</a>
					<a href="/gallery">
						<Glyph name="image" size={13} />
						<span>Gallery</span>
					</a>
					<a href="{home}#comparison">
						<Glyph name="columns" size={13} />
						<span>Comparison</span>
					</a>
					<a href="/docs">
						<Glyph name="book-open" size={13} />
						<span>Docs</span>
					</a>
					<a href="/download">
						<Glyph name="download" size={13} />
						<span>Download</span>
					</a>
					<a href="/faq">
						<Glyph name="help-circle" size={13} />
						<span>FAQ</span>
					</a>
				</div>
				<div>
					<h3>Project</h3>
					<a href={repo} target="_blank" rel="noopener noreferrer">
						<Mark name="github" size={13} />
						<span>GitHub Repository</span>
					</a>
					<a href={website} target="_blank" rel="noopener noreferrer">
						<Glyph name="code" size={13} />
						<span>Website Source</span>
					</a>
					<a href="/about">
						<Glyph name="info" size={13} />
						<span>About Us</span>
					</a>
					<a href="/contact">
						<Glyph name="mail" size={13} />
						<span>Support &amp; Contact</span>
					</a>
				</div>
				<div>
					<h3>Community</h3>
					<a href={discord} target="_blank" rel="noopener noreferrer">
						<Mark name="discord" size={13} />
						<span>Discord Server</span>
					</a>
					<a href={reddit} target="_blank" rel="noopener noreferrer">
						<Mark name="reddit" size={13} />
						<span>Reddit Community</span>
					</a>
					<a href={youtube} target="_blank" rel="noopener noreferrer">
						<Mark name="youtube" size={13} />
						<span>YouTube Channel</span>
					</a>
					<a href={buymeacoffee} target="_blank" rel="noopener noreferrer">
						<Mark name="buymeacoffee" size={13} />
						<span>Support Creator</span>
					</a>
					<a href="{repo}/issues" target="_blank" rel="noopener noreferrer">
						<Glyph name="alert-circle" size={13} />
						<span>Report Issue</span>
					</a>
				</div>
				<div>
					<h3>Legal</h3>
					<a href="/terms">
						<Glyph name="file-text" size={13} />
						<span>Terms of Service</span>
					</a>
					<a href="/privacy">
						<Glyph name="lock" size={13} />
						<span>Privacy Policy</span>
					</a>
					<a href="{repo}/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
						<Glyph name="scale" size={13} />
						<span>License ({license ?? 'MIT'})</span>
					</a>
				</div>
			</div>
		</div>

		<div class="legal">
			<p>
				PocketMC is crafted by DS Labs. Free and open-source software licensed under the {license ?? 'MIT'} License.
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

	.links a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--muted-fg);
		transition: color 0.15s ease;
	}

	.links a :global(svg) {
		color: var(--dim);
		flex-shrink: 0;
		transition: color 0.15s ease;
	}

	.links a:hover {
		color: var(--fg);
	}

	.links a:hover :global(svg) {
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
