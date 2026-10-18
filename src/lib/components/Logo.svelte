<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<img
	src="/logo.webp"
	srcset="/logo.webp 1x, /logo.webp 2x"
	alt="PocketMC"
	width={size}
	height={size}
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
