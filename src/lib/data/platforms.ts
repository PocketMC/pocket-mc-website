export const installerWindows =
	'https://github.com/PocketMC/pocket-mc-windows/releases/latest/download/PocketMC-Setup.exe';

export type Step = { caption: string; command: string; link?: string; hint?: string };

export const platforms: {
	id: string;
	mark: string;
	label: string;
	prompt: string;
	hero: string;
	pending?: string;
	steps: Step[];
	note: string;
}[] = [
	{
		id: 'windows',
		mark: 'windows',
		label: 'Windows',
		prompt: '>',
		hero: 'winget install pocketmc',
		pending: 'winget install pocketmc',
		steps: [
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
		],
		note: 'No administrator privileges required. PocketMC installs per-user and manages all server runtimes locally without touching system environment variables.'
	},
	{
		id: 'linux',
		mark: 'linux',
		label: 'Linux',
		prompt: '$',
		hero: 'curl -fsSL https://pocketmc.github.io/install.sh | bash',
		steps: [
			{
				caption: 'Clone or download the Linux daemon',
				link: 'https://github.com/PocketMC/pocket-mc-linux-mac',
				command: 'git clone https://github.com/PocketMC/pocket-mc-linux-mac.git'
			},
			{
				caption: 'Run the setup launcher',
				command: 'cd pocket-mc-linux-mac && chmod +x setup.sh && ./setup.sh',
				hint: 'Deploys the local instance manager and background daemon with automated Java provisioning.'
			}
		],
		note: 'Works across Ubuntu, Debian, Arch Linux, Fedora, and headless server environments with zero root requirements.'
	},
	{
		id: 'macos',
		mark: 'apple',
		label: 'macOS',
		prompt: '$',
		hero: 'brew install pocketmc',
		steps: [
			{
				caption: 'Fetch the macOS manager bundle',
				link: 'https://github.com/PocketMC/pocket-mc-linux-mac',
				command: 'git clone https://github.com/PocketMC/pocket-mc-linux-mac.git'
			},
			{
				caption: 'Launch server control services',
				command: 'cd pocket-mc-linux-mac && ./setup.sh',
				hint: 'Compatible with both Apple Silicon (M1/M2/M3/M4) and Intel Macs.'
			}
		],
		note: 'Native Apple Silicon ARM64 binaries and Adoptium JDKs are automatically provisioned.'
	}
];

export function detectPlatform() {
	if (typeof navigator === 'undefined') return 'windows';
	const hint =
		(navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
		'';
	const ua = navigator.userAgent;
	if (/Windows/i.test(hint) || /Windows/i.test(ua)) return 'windows';
	if (/macOS/i.test(hint) || (/Macintosh|Mac OS/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua)))
		return 'macos';
	if (/Linux|Chrome OS|X11/i.test(hint) || /Linux|X11/i.test(ua)) return 'linux';
	return 'windows';
}
