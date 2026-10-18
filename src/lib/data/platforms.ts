export const installerUrl =
	'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Setup.exe';

export const portableUrl =
	'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-win-Portable.zip';

export const wingetCommand = 'winget install PocketMC';

export interface InstallOption {
	id: 'installer' | 'winget' | 'portable';
	badge: string;
	title: string;
	description: string;
	actionType: 'download' | 'command';
	actionText: string;
	actionTarget: string;
	meta: string;
}

export const installOptions: InstallOption[] = [
	{
		id: 'installer',
		badge: 'Recommended',
		title: 'Setup Installer',
		description:
			'Standard Windows setup wizard. Creates desktop shortcuts and supports automatic in-app updates.',
		actionType: 'download',
		actionText: 'Download Installer',
		actionTarget: installerUrl,
		meta: 'Windows 10 / 11 · 64-bit'
	},
	{
		id: 'winget',
		badge: 'Terminal',
		title: 'Windows Package Manager',
		description:
			'Install and update automatically via Windows Terminal or PowerShell via Microsoft Winget.',
		actionType: 'command',
		actionText: wingetCommand,
		actionTarget: wingetCommand,
		meta: 'Official Microsoft Windows Package Manager'
	},
	{
		id: 'portable',
		badge: 'Standalone',
		title: 'Portable ZIP',
		description:
			'Zero installation required. Extract to any directory or USB drive and run standalone anywhere.',
		actionType: 'download',
		actionText: 'Download Portable',
		actionTarget: portableUrl,
		meta: 'Windows 10 / 11 · Portable'
	}
];
