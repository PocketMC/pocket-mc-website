import { redirect } from '@sveltejs/kit';
import { pages } from '$lib/data/docs';

export function load() {
	redirect(307, `/docs/${pages[0].slug}`);
}
