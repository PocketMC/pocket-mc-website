<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Glyph from './Glyph.svelte';
	import Mark from './Mark.svelte';

	type CellItem = {
		text: string;
		glyph?: string;
		icon?: string;
		mark?: string;
	};

	const cells: { label: string; items: CellItem[] }[] = [
		{
			label: 'Server Engines',
			items: [
				{ icon: '/icons/vanilla.png', text: 'Vanilla (Official Mojang JARs)' },
				{ icon: '/icons/papermc.png', text: 'Paper (High-performance Spigot)' },
				{ icon: '/icons/fabric.png', text: 'Fabric (Lightweight & modular)' },
				{ icon: '/icons/forge.png', text: 'Forge (Classic mod loader)' },
				{ icon: '/icons/neoforge.png', text: 'NeoForge (Modern mod loader)' },
				{ icon: '/icons/bds.png', text: 'Bedrock Dedicated Server (BDS)' },
				{ icon: '/icons/pocketmine-mp.png', text: 'PocketMine-MP (PHP 8.2 PM5)' }
			]
		},
		{
			label: 'Lifecycle & Safety',
			items: [
				{ glyph: 'shield', text: 'RCON graceful save-holding flush' },
				{ glyph: 'refresh-cw', text: 'Crash recovery with auto-backoff' },
				{ glyph: 'zap', text: 'Port-collision preflight guard' },
				{ glyph: 'hard-drive', text: 'Low-disk warning (< 2 GB guard)' },
				{ mark: 'windows', text: 'Windows sleep mode inhibition' },
				{ glyph: 'sliders', text: '80% System RAM over-allocation alert' }
			]
		},
		{
			label: 'Java & Runtimes',
			items: [
				{ glyph: 'cpu', text: 'Adoptium JREs (Java 8, 11, 17, 21, 25)' },
				{ glyph: 'zap', text: 'Auto-selection based on server JAR' },
				{ glyph: 'hard-drive', text: 'Managed app-local dependencies' },
				{ glyph: 'folder-open', text: 'Isolated instance directories' },
				{ mark: 'windows', text: 'Runs in local user directory' },
				{ icon: '/icons/pocketmine-mp.png', text: 'Auto PHP PM5 for Bedrock' }
			]
		},
		{
			label: 'Networking & Remote',
			items: [
				{ glyph: 'globe', text: 'Integrated Playit.gg tunnel agent' },
				{ glyph: 'zap', text: 'Cloudflare Quick Tunnels support' },
				{ glyph: 'smartphone', text: 'Responsive mobile web dashboard' },
				{ glyph: 'smartphone', text: 'Quick QR access to web dashboard' },
				{ glyph: 'terminal', text: 'Multi-user roles & permission scopes' },
				{ mark: 'discord', text: 'Discord Rich Presence with live server status' }
			]
		},
		{
			label: 'Content & Add-ons',
			items: [
				{ glyph: 'package', text: 'In-app Modrinth marketplace browser' },
				{ glyph: 'package', text: 'CurseForge browser & Poggit integration' },
				{ glyph: 'folder-open', text: 'Three-dot menu Explorer folder jumps' },
				{ glyph: 'sliders', text: 'One-click mod & plugin enable/disable toggle' },
				{ glyph: 'layers', text: 'Bedrock .mcpack, .mcaddon ingestion' },
				{ glyph: 'sparkles', text: 'Automatic Geyser & Floodgate cross-play' }
			]
		},
		{
			label: 'Backups & Storage',
			items: [
				{ glyph: 'cloud', text: 'Automated Google Drive replication' },
				{ glyph: 'cloud', text: 'Dropbox & OneDrive OAuth sync' },
				{ glyph: 'shield', text: 'SHA-256 archive integrity checks' },
				{ glyph: 'refresh-cw', text: 'Automated Cron & reboot scheduling' },
				{ glyph: 'terminal', text: 'Pre-backup RCON save sync' },
				{ glyph: 'hard-drive', text: '100% data sovereignty on your disk' }
			]
		}
	];
</script>

<section id="about" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Features</span>
			<h2>What it does</h2>
			<p class="lead">
				Engineered to eliminate terminal complexity, safeguard data sovereignty, and automate local
				Minecraft server operations.
			</p>
		</div>

		<div class="wire cells" use:reveal={{ stagger: true }}>
			{#each cells as cell (cell.label)}
				<article>
					<span class="kicker">{cell.label}</span>
					<ul>
						{#each cell.items as item (item.text)}
							<li>
								{#if item.icon}
									<img src={item.icon} alt="" width="16" height="16" class="cell-icon" />
								{:else if item.mark}
									<Mark name={item.mark} size={15} />
								{:else if item.glyph}
									<Glyph name={item.glyph} size={15} />
								{/if}
								<span>{item.text}</span>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.cells {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px 22px 26px;
	}

	article .kicker {
		color: var(--fg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	li {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13.5px;
		line-height: 1.35;
		color: var(--muted-fg);
	}

	li :global(svg) {
		color: var(--dim);
		flex-shrink: 0;
	}

	.cell-icon {
		width: 15px;
		height: 15px;
		object-fit: contain;
		flex-shrink: 0;
		border-radius: 2px;
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.cells {
			grid-template-columns: minmax(0, 1fr);
		}

		article {
			padding: 18px 16px 20px;
		}
	}
</style>
