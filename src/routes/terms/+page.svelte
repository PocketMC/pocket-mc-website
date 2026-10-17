<script lang="ts">
	import '$lib/prose.css';
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Terms of Service · PocketMC</title>
	<meta
		name="description"
		content="PocketMC Terms of Service, open-source licensing, and usage terms."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page doc-container">
		<article class="prose">
			<span class="kicker">Legal</span>
			<h1>Terms of Service</h1>
			<p class="summary">
				PocketMC is free, open-source software distributed under the terms of the GNU General Public
				License v3.0 (GPL-3.0) and permissive open-source licenses.
			</p>

			<h2 id="software-license">Software License</h2>
			<p>
				By downloading, compiling, or executing PocketMC, you agree to the conditions of the open-source
				license governing the codebase.
			</p>

			<Code
				label="License Notice"
				text={`Copyright (c) 2026 PocketMC Contributors

PocketMC is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.`}
			/>

			<h2 id="minecraft-trademark">Minecraft Trademark Notice</h2>
			<p>
				<strong>NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</strong>
			</p>
			<p>
				PocketMC is an independent community project. "Minecraft" is a registered trademark of Mojang Synergies AB.
				Neither PocketMC nor its creators are affiliated with, endorsed by, or sponsored by Mojang, Microsoft, or their affiliates.
			</p>

			<h2 id="user-responsibility">User Responsibility</h2>
			<p>
				You are solely responsible for ensuring that server content, community plugins, worlds, and mods
				hosted through PocketMC comply with Minecraft's Commercial Usage Guidelines and End User License
				Agreement (EULA), as well as applicable local laws regarding network hosting and telecommunications.
			</p>

			<h2 id="limitation-of-liability">Limitation of Liability</h2>
			<p>
				Under no circumstances shall the PocketMC authors, maintainers, or contributors be held liable
				for any direct, indirect, incidental, or consequential damages resulting from the use or inability
				to use this software, including but not limited to loss of world data, hardware malfunctions, or
				network interruptions.
			</p>
		</article>
	</div>
</section>

<style>
	.doc-container {
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.prose {
		max-width: 720px;
		margin: 0 auto;
	}

	@media (max-width: 900px) {
		.doc-container {
			padding-top: 32px;
			padding-bottom: 64px;
		}
	}
</style>
