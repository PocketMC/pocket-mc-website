<script lang="ts">
	import { page } from '$app/state';
	import { discord, reddit, youtube, buymeacoffee, repo, website, dslabs } from '$lib/data/links';
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
					<Logo size={20} loading="lazy" />
					<span>PocketMC</span>
				</a>
				<p>
					Local Minecraft server management for Windows, crafted by <a href={dslabs} target="_blank" rel="noopener noreferrer author" class="author-link">DS Labs</a>.
					Zero port forwarding, instant public tunnels, and full control over your files.
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
					<a href={dslabs} target="_blank" rel="noopener noreferrer">
						<Glyph name="globe" size={13} />
						<span>DS Labs</span>
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
					<a href="/about#editorial-policy">
						<Glyph name="shield" size={13} />
						<span>Editorial Policy</span>
					</a>
					<a href="{repo}/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
						<Glyph name="scale" size={13} />
						<span>License ({license ?? 'MIT'})</span>
					</a>
				</div>
			</div>
		</div>

		<div class="share-bar">
			<span class="share-label">Share PocketMC:</span>
			<div class="share-links">
				<a
					href="https://twitter.com/intent/tweet?text=PocketMC%20-%20Best%20free%20local%20Minecraft%20server%20hosting%20software%20for%20Windows&url=https%3A%2F%2Fpocketmc.github.io%2F"
					target="_blank"
					rel="noopener noreferrer"
					class="share-btn"
					aria-label="Share PocketMC on X / Twitter"
				>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
					<span>Post on X</span>
				</a>
				<a
					href="https://www.reddit.com/submit?url=https%3A%2F%2Fpocketmc.github.io%2F&title=PocketMC%20-%20Free%20Local%20Minecraft%20Server%20Hosting%20for%20Windows"
					target="_blank"
					rel="noopener noreferrer"
					class="share-btn"
					aria-label="Share PocketMC on Reddit"
				>
					<Mark name="reddit" size={12} />
					<span>Share on Reddit</span>
				</a>
			</div>
		</div>

		<div class="legal">
			<div class="legal-row">
				<span>
					Crafted by <a href={dslabs} target="_blank" rel="noopener noreferrer author" class="author-link">DS Labs</a>.
					Free and open-source software licensed under the {license ?? 'MIT'} License.
				</span>
				<span class="legal-date">
					<time datetime="2026-10-18">Updated: October 2026</time>
				</span>
			</div>
			<p class="disclaimer-note">
				<strong>Disclaimer:</strong> PocketMC is an independent open-source project created by DS Labs. It is NOT AN OFFICIAL MINECRAFT PRODUCT and is NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT. Minecraft is a trademark of Mojang Synergies AB. All other trademarks, product names, and company logos referenced on this website belong to their respective owners.
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

	.share-bar {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 36px;
		padding-top: 20px;
		border-top: 1px dashed var(--line);
		flex-wrap: wrap;
	}

	.share-label {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--dim);
		letter-spacing: 0.04em;
	}

	.share-links {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.share-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		font-size: 12px;
		color: var(--muted-fg);
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		text-decoration: none;
		transition: color 0.15s ease, border-color 0.15s ease;
	}

	.share-btn:hover {
		color: var(--fg);
		border-color: var(--border-hover);
	}

	.legal {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 48px;
		padding-top: 22px;
		border-top: 1px solid var(--line);
	}

	.legal-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	.legal-row a.author-link {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
	}

	.legal-row a.author-link:hover {
		text-decoration-color: var(--fg);
	}

	.legal-date {
		color: var(--dim);
		font-size: 12px;
	}

	.disclaimer-note {
		margin: 0;
		font-size: 11.5px;
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

	@media (max-width: 640px) {
		.cols {
			flex-direction: column;
			gap: 28px;
		}

		.about {
			max-width: 100%;
		}

		.links {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 28px 20px;
			width: 100%;
		}

		.links a {
			min-height: 28px;
			padding: 2px 0;
		}

		.share-bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.share-links {
			width: 100%;
			flex-wrap: wrap;
		}

		.legal {
			margin-top: 32px;
		}
	}

	@media (max-width: 360px) {
		.links {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
</style>
