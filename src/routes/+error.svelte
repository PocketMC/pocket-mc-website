<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Page Not Found · PocketMC</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="section error-page">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="content">
			<span class="mono kicker">{page.status}</span>
			<h1>{page.error?.message ?? 'Page not found'}</h1>
			<p class="lead">
				The page you requested could not be located. It may have moved or been updated.
			</p>
			<a class="btn btn-primary" href="/">Return to Home</a>
		</div>
	</div>
</section>

<style>
	.error-page {
		min-height: calc(100vh - var(--header) - 200px);
		display: flex;
		align-items: center;
	}

	.page {
		width: 100%;
		padding-top: 80px;
		padding-bottom: 80px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		max-width: 500px;
		margin: 0 auto;
	}

	.kicker {
		font-size: 24px;
		font-weight: 600;
		color: var(--dim);
	}

	h1 {
		font-size: clamp(28px, 4vw, 40px);
	}

	.lead {
		margin: 0 0 16px;
	}
</style>
