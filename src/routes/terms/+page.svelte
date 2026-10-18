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
				PocketMC is free, open-source software distributed under the terms of the MIT License.
			</p>

			<h2 id="software-license">Software License</h2>
			<p>
				By downloading, compiling, or executing PocketMC, you agree to the conditions of the open-source
				license governing the codebase.
			</p>

			<Code
				label="MIT License"
				text={`MIT License

Copyright (c) 2026 PocketMC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
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
