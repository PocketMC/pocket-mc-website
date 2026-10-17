export function anchors(): () => void {
	if (typeof window === 'undefined') return () => {};

	const gentle = !matchMedia('(prefers-reduced-motion: reduce)').matches;

	const onclick = (event: MouseEvent) => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

		const link = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
		if (!(link instanceof HTMLAnchorElement)) return;

		const id = link.hash.slice(1);
		const target = id && document.getElementById(id);
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({ behavior: gentle ? 'smooth' : 'auto', block: 'start' });
	};

	document.addEventListener('click', onclick);
	return () => document.removeEventListener('click', onclick);
}
