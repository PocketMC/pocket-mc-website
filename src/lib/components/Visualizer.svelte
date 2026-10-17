<script lang="ts">
	import { onMount } from 'svelte';

	const BARS = 64;
	const FLOOR = 0.06;
	const IDLE = 0.55;

	let heights = $state<number[]>(shape(0, IDLE));

	function shape(time: number, amplitude: number): number[] {
		const out: number[] = [];
		for (let at = 0; at < BARS; at += 1) {
			const x = at / (BARS - 1) - 0.5;
			const envelope = Math.exp(-(x * x) / (2 * 0.19 * 0.19));
			const wave =
				0.5 +
				0.25 * Math.sin(time * 1.7 + at * 0.55) +
				0.15 * Math.sin(time * 0.9 - at * 0.23) +
				0.1 * Math.sin(time * 2.6 + at * 1.3);
			out.push(FLOOR + envelope * wave * amplitude);
		}
		return out;
	}

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		let last = performance.now();
		let time = 0;
		let amplitude = IDLE;

		const step = (now: number) => {
			const delta = Math.min(now - last, 64) / 1000;
			last = now;
			time += delta * 1.0;
			heights = shape(time, amplitude);
			frame = requestAnimationFrame(step);
		};

		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	});
</script>

<div class="viz" aria-hidden="true">
	{#each heights as height, at (at)}
		<span style:height="{height * 100}%"></span>
	{/each}
</div>

<style>
	.viz {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;
		height: 96px;
	}

	span {
		width: 1px;
		min-height: 3px;
		border-radius: 1px;
		background: var(--muted-fg);
		opacity: 0.85;
		transition: opacity 0.2s ease;
	}

	@media (max-width: 900px) {
		.viz {
			height: 64px;
		}

		span:nth-child(odd) {
			display: none;
		}
	}
</style>
