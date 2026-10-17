import { browser } from '$app/environment';

const KEY = 'theme';

export const options = [
	{ id: 'system', label: 'System' },
	{ id: 'light', label: 'Light' },
	{ id: 'dark', label: 'Dark' }
];

function stored() {
	try {
		const value = localStorage.getItem(KEY);
		return value === 'light' || value === 'dark' ? value : 'system';
	} catch {
		return 'system';
	}
}

let choice = $state('system');

export const theme = {
	get choice() {
		return choice;
	},

	sync() {
		if (browser) choice = stored();
	},

	select(value: string) {
		choice = value;
		if (!browser) return;

		try {
			if (value === 'system') localStorage.removeItem(KEY);
			else localStorage.setItem(KEY, value);
		} catch {}

		if (value === 'system') delete document.documentElement.dataset.theme;
		else document.documentElement.dataset.theme = value;
	}
};
