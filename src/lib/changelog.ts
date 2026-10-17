import { repo } from '$lib/data/links';

export const source = 'https://raw.githubusercontent.com/PocketMC/pocket-mc-windows/master/CHANGELOG.md';

export type Inline =
	| { kind: 'text'; text: string }
	| { kind: 'code'; text: string }
	| { kind: 'strong'; text: string }
	| { kind: 'link'; text: string; href: string }
	| { kind: 'path'; steps: string[] };

export type Group = { title: string; items: Inline[][] };

export type Release = {
	version: string;
	id: string;
	date: string | null;
	tag: string | null;
	compare: string | null;
	intro: Inline[][];
	groups: Group[];
};

const RELEASE = /^##\s+\[?v?([0-9]+\.[0-9]+(?:\.[0-9]+)?(?:-[a-zA-Z0-9.]+)?)(?:\]|\b)(?:[ -]+(.+))?/;
const REFERENCE = /^\[([^\]]+)\]:\s*(\S+)/;
const TOKEN = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const PATH = /\bSettings(?: [>→] [A-Z][\w-]*(?: [A-Z][\w-]*)*(?: [a-z]+(?=[,.;:)]| \())?)+/g;

function paths(text: string): Inline[] {
	const out: Inline[] = [];
	let last = 0;
	for (const match of text.matchAll(PATH)) {
		if (match.index > last) out.push({ kind: 'text', text: text.slice(last, match.index) });
		out.push({ kind: 'path', steps: match[0].split(/ [>→] /) });
		last = match.index + match[0].length;
	}
	if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
	return out;
}

export function inline(text: string): Inline[] {
	const out: Inline[] = [];
	let last = 0;
	for (const match of text.matchAll(TOKEN)) {
		if (match.index > last) out.push(...paths(text.slice(last, match.index)));
		const [, code, strong, label, href] = match;
		if (code !== undefined) out.push({ kind: 'code', text: code });
		else if (strong !== undefined) out.push({ kind: 'strong', text: strong });
		else out.push({ kind: 'link', text: label, href });
		last = match.index + match[0].length;
	}
	if (last < text.length) out.push(...paths(text.slice(last)));
	return out;
}

export function parse(markdown: string): Release[] {
	const lines = markdown.split(/\r?\n/);
	const references = new Map<string, string>();
	for (const line of lines) {
		const match = line.match(REFERENCE);
		if (match) references.set(match[1].toLowerCase(), match[2]);
	}

	const releases: Release[] = [];
	let release: Release | null = null;
	let group: Group | null = null;
	let buffer: string[] = [];
	let target: Inline[][] | null = null;

	const flush = () => {
		if (target && buffer.length) target.push(inline(buffer.join(' ')));
		buffer = [];
		target = null;
	};

	for (const line of lines) {
		const heading = line.match(RELEASE);
		if (heading) {
			flush();
			const [, version, subtitle] = heading;
			const unreleased = version.toLowerCase() === 'unreleased';
			const reference = references.get(version.toLowerCase());
			release = {
				version: unreleased ? 'Unreleased' : `v${version}`,
				id: unreleased ? 'unreleased' : `v${version}`,
				date: subtitle ? subtitle.trim() : null,
				tag: unreleased ? null : `${repo}/releases/tag/v${version}`,
				compare: reference?.includes('/compare/') ? reference : null,
				intro: [],
				groups: []
			};
			releases.push(release);
			group = null;
			continue;
		}

		if (!release || REFERENCE.test(line)) {
			flush();
			continue;
		}

		if (line.startsWith('### ')) {
			flush();
			const title = line.slice(4).trim();
			group = release.groups.find((entry) => entry.title === title) ?? null;
			if (!group) {
				group = { title, items: [] };
				release.groups.push(group);
			}
		} else if (line.startsWith('- ')) {
			flush();
			target = group ? group.items : release.intro;
			buffer.push(line.slice(2).trim());
		} else if (!line.trim()) {
			flush();
		} else {
			if (!target) target = group ? group.items : release.intro;
			buffer.push(line.trim());
		}
	}
	flush();

	return releases.filter((entry) => entry.intro.length || entry.groups.length);
}
