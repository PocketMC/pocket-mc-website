<script lang="ts">
	let { size = 22, loading = 'eager' }: { size?: number; loading?: 'eager' | 'lazy' } = $props();
</script>

<img
	src="/logo.webp"
	srcset="/logo.webp 1x, /logo.webp 2x"
	alt="PocketMC"
	width={size}
	height={size}
	{loading}
	decoding="async"
	class="logo-img"
	style="width: {size}px; height: {size}px;"
/>

<style>
	.logo-img {
		flex-shrink: 0;
		object-fit: contain;
		display: block;
	}
</style>
