import { parse, source, type Release } from '$lib/changelog';

export async function load({ fetch }): Promise<{ releases: Release[] }> {
	try {
		// First try local static copy
		const localRes = await fetch('/CHANGELOG.md');
		if (localRes.ok) {
			return { releases: parse(await localRes.text()) };
		}
	} catch {}

	try {
		// Fallback to GitHub raw
		const res = await fetch(source);
		if (res.ok) {
			return { releases: parse(await res.text()) };
		}
	} catch {}

	return { releases: [] };
}
