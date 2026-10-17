<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<img
	src="/logo.webp"
	alt="PocketMC"
	width={size}
	height={size}
	class="logo-img"
	style="width: {size}px; height: {size}px;"
/>

<style>
	.logo-img {
		flex-shrink: 0;
		border-radius: 22%;
		object-fit: contain;
		display: block;
	}
</style>
