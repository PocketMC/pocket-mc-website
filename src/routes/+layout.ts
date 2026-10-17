import { browser } from '$app/environment';

export const prerender = true;
export const trailingSlash = 'always';

const API = 'https://api.github.com/repos/PocketMC/pocket-mc-windows';

let cached: { stars: number | null; version: string | null } | null = null;

export async function load({ fetch }) {
	if (cached) return cached;

	const result = { stars: null as number | null, version: 'v1.9.9' as string | null };

	try {
		const res = await fetch(API);
		if (res.ok) result.stars = (await res.json()).stargazers_count;
	} catch {}

	try {
		const res = await fetch(`${API}/releases/latest`);
		if (res.ok) result.version = (await res.json()).tag_name;
	} catch {}

	if (browser) cached = result;
	return result;
}
