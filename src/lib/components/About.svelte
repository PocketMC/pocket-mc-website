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
			label: 'Terminal & Diagnostics',
			items: [
				{ glyph: 'terminal', text: 'ANSI color console with live logs and command history.' },
				{ glyph: 'zap', text: 'Offline crash summaries powered by local Ollama models.' },
				{ glyph: 'cpu', text: 'Real-time CPU, RAM, and tick stability telemetry.' },
				{ glyph: 'shield', text: 'One-click graceful stop and process termination.' },
				{ glyph: 'folder-open', text: 'Filter logs by keywords, warnings, and errors.' }
			]
		},
		{
			label: 'Lifecycle & Safety',
			items: [
				{ glyph: 'shield', text: 'Safe shutdown with world saves before closing.' },
				{ glyph: 'refresh-cw', text: 'Auto-restart after crashes with backoff limits.' },
				{ glyph: 'zap', text: 'Port collision checks before server launch.' },
				{ glyph: 'hard-drive', text: 'Low disk space warnings below 2 GB.' },
				{ mark: 'windows', text: 'Keeps Windows awake while servers run.' },
				{ glyph: 'sliders', text: 'Alerts when memory usage crosses 80%.' }
			]
		},
		{
			label: 'Java & Runtimes',
			items: [
				{ glyph: 'cpu', text: 'Adoptium runtimes for Java 8, 11, 17, 21, and 25.' },
				{ glyph: 'zap', text: 'Picks the right Java version based on your server.' },
				{ glyph: 'hard-drive', text: 'Kept inside PocketMC without touching system PATH.' },
				{ glyph: 'folder-open', text: 'Separate working folders for each server.' },
				{ mark: 'windows', text: 'Runs without requiring administrator rights.' },
				{ icon: '/icons/pocketmine-mp.webp', text: 'Includes PHP 8.2 for PocketMine-MP.' }
			]
		},
		{
			label: 'Networking & Remote',
			items: [
				{ glyph: 'globe', text: 'Playit.gg tunnels for sharing without port forwarding.' },
				{ glyph: 'zap', text: 'Optional Cloudflare Quick Tunnels support.' },
				{ glyph: 'smartphone', text: 'Mobile web dashboard via local network PIN or QR code.' },
				{ glyph: 'terminal', text: 'Operator and viewer roles for dashboard users.' },
				{ mark: 'discord', text: 'Discord Rich Presence with live player counts.' },
				{ glyph: 'globe', text: 'Built-in UDP tunnel mapping for Simple Voice Chat.' }
			]
		},
		{
			label: 'Content & Add-ons',
			items: [
				{ glyph: 'package', text: 'Search and download mods and plugins from Modrinth.' },
				{ glyph: 'package', text: 'CurseForge mod browser and Poggit plugin support.' },
				{ glyph: 'folder-open', text: 'One-click shortcuts to world, config, and plugin folders.' },
				{ glyph: 'sliders', text: 'Toggle individual mods and plugins on or off anytime.' },
				{ glyph: 'layers', text: 'Drag-and-drop installer for .mcpack and .mcaddon files.' },
				{ glyph: 'sparkles', text: 'One-click Geyser and Floodgate setup for Bedrock cross-play.' }
			]
		},
		{
			label: 'Backups & Storage',
			items: [
				{ glyph: 'cloud', text: 'Scheduled backups synced directly to Google Drive.' },
				{ glyph: 'cloud', text: 'Optional sync to OneDrive and Dropbox.' },
				{ glyph: 'shield', text: 'Zip archive integrity verification with SHA-256.' },
				{ glyph: 'refresh-cw', text: 'Automatic backup schedules with cron support.' },
				{ glyph: 'terminal', text: 'Flushes and disables world saves during backup creation.' },
				{ glyph: 'hard-drive', text: 'All server files remain stored directly on your PC.' }
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
			<h2>Built for Local Minecraft Server Hosting</h2>
			<p class="lead">
				Everything you need to run, configure, and share Minecraft servers locally on Windows without touching the command line.
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
									<img
										src={item.icon}
										alt={item.text}
										srcset="{item.icon} 1x, {item.icon} 2x"
										width="16"
										height="16"
										loading="lazy"
										decoding="async"
										class="cell-icon"
									/>
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
