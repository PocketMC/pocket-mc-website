import repoMetadata from '$lib/data/repo-metadata.json';

export const prerender = true;
export const trailingSlash = 'always';

export function load() {
	return {
		stars: (repoMetadata.stars ?? 32) as number | null,
		version: (repoMetadata.version ?? 'v1.9.10') as string | null,
		license: (repoMetadata.license ?? 'MIT') as string | null
	};
}
