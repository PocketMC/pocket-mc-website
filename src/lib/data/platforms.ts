export const installerWindows =
	'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-Setup.exe';

export type Step = { caption: string; command: string; link?: string; hint?: string };

export const installSteps: Step[] = [
	{
		caption: 'Download and run the installer',
		link: installerWindows,
		command: 'PocketMC-Setup.exe'
	},
	{
		caption: 'Or install via winget (command line)',
		command: 'winget install PocketMC.PocketMC',
		hint: 'Automates downloading and installing the latest release directly into your user profile.'
	},
	{
		caption: 'Portable release build',
		link: 'https://github.com/PocketMC/pocket-mc-windows/releases/latest',
		command: 'PocketMC-Portable.zip',
		hint: 'Extract and launch directly without installing system-wide.'
	}
];

export const installNote =
	'No administrator privileges required. PocketMC installs per-user and manages all server runtimes locally without touching system environment variables.';
