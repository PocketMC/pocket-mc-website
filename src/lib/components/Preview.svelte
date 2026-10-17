<script lang="ts">
	const videoSrc = '/Video/PocketMC.mp4';
	const title = 'Complete Native Server Control';
	const description =
		'Watch PocketMC in action: 1-click server provisioning, real-time Adoptium Java runtime installation, colorized live terminal logging, and zero-router Playit.gg network tunneling.';
	const bullets = [
		'Single-click instance creation for Paper, Fabric, Forge, NeoForge, Vanilla & Bedrock',
		'Interactive live terminal with ANSI color support, auto-scroll, and command auto-completion',
		'Integrated Playit.gg tunnel agent with instant copy-to-clipboard public join address',
		'Zero-friction user experience running entirely in desktop user-space'
	];
</script>

<section id="tour" class="preview section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.32s">
			<!-- Subtle ambient backlight aura -->
			<div class="frame-aura" aria-hidden="true"></div>

			<!-- Clean, 100% border-framed showcase window with zero clutter -->
			<div class="frame live">
				<div class="media-container video-container">
					<video
						src={videoSrc}
						autoplay
						loop
						muted
						playsinline
						controls
						class="showcase-media"
					>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			<!-- Detached Gallery Link Bar -->
			<div class="action-bar">
				<div class="badge-tag">
					<span class="dot-live" aria-hidden="true"></span>
					<span>Live Application Demo</span>
				</div>

				<a href="/gallery" class="gallery-link-btn">
					<span>Browse Full UI Gallery (20+ Screens)</span>
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</a>
			</div>

			<!-- Feature Details Highlight Drawer -->
			<div class="feature-drawer">
				<div class="drawer-text">
					<span class="kicker">Highlight</span>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>

				<ul class="bullets">
					{#each bullets as bullet}
						<li>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="check-icon"
								aria-hidden="true"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
							<span>{bullet}</span>
						</li>
					{/each}
				</ul>
			</div>
		</figure>
	</div>
</section>

<style>
	.preview {
		position: relative;
		padding: 0 0 72px;
	}

	.preview .page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shot {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1180px;
		margin: 0;
	}

	/* Soft ambient backlight aura */
	.frame-aura {
		position: absolute;
		top: -15px;
		left: 8%;
		right: 8%;
		height: 420px;
		background: radial-gradient(ellipse 70% 50% at 50% 25%, rgba(34, 197, 94, 0.18), transparent 70%);
		filter: blur(55px);
		pointer-events: none;
		z-index: 0;
	}

	/* Clean wireframe box with zero top header */
	.frame {
		position: relative;
		z-index: 1;
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: #000;
		box-shadow:
			var(--shadow),
			var(--glow);
		transition: box-shadow 0.3s ease;
	}

	.media-container {
		width: 100%;
		position: relative;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 660px;
		overflow: hidden;
	}

	.showcase-media {
		width: 100%;
		height: auto;
		max-height: 660px;
		object-fit: contain;
		display: block;
	}

	/* Action bar below video frame */
	.action-bar {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: 24px;
		gap: 16px;
		flex-wrap: wrap;
	}

	.badge-tag {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 14px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		font-size: 12.5px;
		font-weight: 500;
		color: var(--muted-fg);
	}

	.dot-live {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
		animation: pulse-dot 2.2s infinite;
	}

	@keyframes pulse-dot {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.85);
		}
	}

	.gallery-link-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 18px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--fg);
		font-size: 13.5px;
		font-weight: 500;
		text-decoration: none;
		box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.3);
		transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
	}

	.gallery-link-btn:hover {
		background: var(--secondary-hover);
		border-color: var(--dim);
		transform: translateY(-1px);
	}

	.gallery-link-btn svg {
		color: #22c55e;
		transition: transform 0.15s ease;
	}

	.gallery-link-btn:hover svg {
		transform: translateX(3px);
	}

	/* Feature Highlights Drawer */
	.feature-drawer {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 36px;
		margin-top: 24px;
		padding: 26px 32px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		text-align: left;
	}

	.drawer-text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.drawer-text h3 {
		font-size: 19px;
		font-weight: 600;
		color: var(--fg);
	}

	.drawer-text p {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.kicker {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #22c55e;
	}

	.bullets {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
		justify-content: center;
	}

	.bullets li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg);
	}

	.check-icon {
		flex-shrink: 0;
		margin-top: 2px;
		color: #22c55e;
	}

	@media (max-width: 768px) {
		.preview {
			padding: 0 0 48px;
		}

		.action-bar {
			margin-top: 18px;
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
		}

		.badge-tag {
			justify-content: center;
		}

		.gallery-link-btn {
			justify-content: center;
		}

		.feature-drawer {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 18px 20px;
			margin-top: 18px;
		}
	}
</style>
