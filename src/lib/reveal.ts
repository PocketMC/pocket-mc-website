const EDGE = 0.92;
const STEP = 50;

export function reveal(
	node: HTMLElement,
	options: { stagger?: boolean } = {}
): { destroy(): void } {
	const still = { destroy() {} };

	if (typeof window === 'undefined') return still;
	if (typeof navigator !== 'undefined' && navigator.webdriver) return still;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return still;
	if (node.getBoundingClientRect().top < innerHeight * EDGE) return still;

	const targets = (options.stagger ? Array.from(node.children) : [node]) as HTMLElement[];

	for (const target of targets) target.dataset.reveal = 'idle';

	let watch: IntersectionObserver | null = null;
	const showAll = () => {
		targets.forEach((target, index) => {
			target.style.transitionDelay = `${index * STEP}ms`;
			target.dataset.reveal = 'shown';
		});
		if (watch) {
			watch.disconnect();
			watch = null;
		}
	};

	// Fallback to guarantee elements are never trapped in hidden state
	const safetyTimer = setTimeout(showAll, 800);

	watch = new IntersectionObserver(
		(entries) => {
			if (!entries.some((entry) => entry.isIntersecting)) return;
			clearTimeout(safetyTimer);
			showAll();
		},
		{ rootMargin: '250px 0px 250px 0px' }
	);

	watch.observe(node);

	return {
		destroy: () => {
			clearTimeout(safetyTimer);
			if (watch) watch.disconnect();
		}
	};
}
