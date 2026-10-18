import { browser } from '$app/environment';
import repoMetadata from '$lib/data/repo-metadata.json';

export const prerender = true;
export const trailingSlash = 'always';

const API = 'https://api.github.com/repos/PocketMC/pocket-mc-windows';

let cached: { stars: number | null; version: string | null; license: string | null } | null = null;

export async function load({ fetch }) {
	if (cached) return cached;

	const result = {
		stars: (repoMetadata.stars ?? 32) as number | null,
		version: (repoMetadata.version ?? 'v1.9.10') as string | null,
		license: (repoMetadata.license ?? 'MIT') as string | null
	};

	try {
		const res = await fetch(API, {
			headers: { Accept: 'application/vnd.github.v3+json' }
		});
		if (res.ok) {
			const data = await res.json();
			if (typeof data.stargazers_count === 'number') result.stars = data.stargazers_count;
			if (data.license?.spdx_id) result.license = data.license.spdx_id;
		}
	} catch {}

	try {
		const res = await fetch(`${API}/releases/latest`, {
			headers: { Accept: 'application/vnd.github.v3+json' }
		});
		if (res.ok) {
			const release = await res.json();
			if (release.tag_name) result.version = release.tag_name;
		}
	} catch {}

	if (browser) cached = result;
	return result;
}
