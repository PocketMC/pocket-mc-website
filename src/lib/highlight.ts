export type Token = {
	kind: 'key' | 'string' | 'number' | 'literal' | 'punct' | 'plain';
	text: string;
};

const JSON_TOKEN =
	/("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\],:])/g;

export function highlightJson(source: string): Token[] {
	const tokens: Token[] = [];
	let last = 0;

	for (const match of source.matchAll(JSON_TOKEN)) {
		const [whole, string, colon, number, literal] = match;
		if (match.index > last) tokens.push({ kind: 'plain', text: source.slice(last, match.index) });

		if (string && colon) {
			tokens.push({ kind: 'key', text: string });
			tokens.push({ kind: 'punct', text: colon });
		} else if (string) tokens.push({ kind: 'string', text: string });
		else if (number) tokens.push({ kind: 'number', text: number });
		else if (literal) tokens.push({ kind: 'literal', text: literal });
		else tokens.push({ kind: 'punct', text: whole });

		last = match.index + whole.length;
	}

	if (last < source.length) tokens.push({ kind: 'plain', text: source.slice(last) });
	return tokens;
}
