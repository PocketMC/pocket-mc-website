<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount, setContext, tick } from 'svelte';
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
	import Search from '$lib/components/docs/Search.svelte';
	import Question, { type Accordion } from '$lib/components/faq/Question.svelte';
	import '$lib/prose.css';
	import { faqItems } from '$lib/data/faq';

	const accordion: Accordion = $state({ open: null });
	setContext('faq', accordion);

	async function reveal() {
		const target = document.getElementById(location.hash.slice(1));
		if (!target?.classList.contains('question')) return;
		accordion.open = target.id;
		await tick();
		target.scrollIntoView({ block: 'start' });
	}

	onMount(() => {
		addEventListener('hashchange', reveal);
		return () => removeEventListener('hashchange', reveal);
	});

	afterNavigate(reveal);

	const categories = $derived(
		Array.from(new Set(faqItems.map((item) => item.category)))
	);
</script>

<svelte:head>
	<title>PocketMC FAQ · Local Minecraft Server Hosting Setup & Troubleshooting</title>
	<meta
		name="description"
		content="Answers to frequently asked questions about local Minecraft server hosting on Windows. Learn how to host servers without port forwarding, resolve Java runtime errors, and configure cloud backups."
	/>
	<meta
		name="keywords"
		content="minecraft server hosting faq, local minecraft server setup, host minecraft server without port forwarding, pocketmc troubleshooting, adoptium java minecraft error"
	/>
	<meta property="og:title" content="PocketMC FAQ · Local Minecraft Server Hosting Setup & Troubleshooting" />
	<meta
		property="og:description"
		content="Frequently asked questions about local Minecraft server hosting on Windows. Learn how to host servers without port forwarding, resolve Java runtime errors, and configure cloud backups."
	/>
	<meta name="twitter:title" content="PocketMC FAQ · Local Minecraft Server Hosting Setup & Troubleshooting" />
	<meta
		name="twitter:description"
		content="Frequently asked questions about local Minecraft server hosting on Windows. Learn how to host servers without port forwarding, resolve Java runtime errors, and configure cloud backups."
	/>

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://pocketmc.github.io/'
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'FAQ',
						item: 'https://pocketmc.github.io/faq/'
					}
				]
			},
			{
				'@type': 'FAQPage',
				mainEntity: faqItems.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer.join(' ')
					}
				}))
			}
		]
	})}</script>`}
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page faq">
		<article class="prose">
			<span class="kicker">FAQ</span>
			<h1>Frequently Asked Questions</h1>
			<p class="summary">
				The problems and questions people run into most, and what fixes them. If yours is not listed
				here, join our <a href="https://discord.gg/mWdMr8Mc2m" target="_blank" rel="noopener noreferrer">Discord community</a> for live support.
			</p>

			<div class="search"><Search /></div>

			{#each categories as category (category)}
				<h2>{category}</h2>
				<div class="questions">
					{#each faqItems.filter((i) => i.category === category) as item (item.id)}
						<Question id={item.id} question={item.question}>
							{#each item.answer as paragraph}
								<p>{paragraph}</p>
							{/each}
							{#if item.code}
								<Code text={item.code} />
							{/if}
							{#if item.menuPath}
								<p>
									Navigate to: <MenuPath steps={item.menuPath} />
								</p>
							{/if}
						</Question>
					{/each}
				</div>
			{/each}
		</article>
	</div>
</section>

<style>
	.faq {
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.prose {
		max-width: 720px;
		margin: 0 auto;
	}

	.search {
		margin: 12px 0 24px;
	}

	.questions {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
	}

	@media (max-width: 900px) {
		.faq {
			padding-top: 32px;
			padding-bottom: 64px;
		}
	}
</style>
