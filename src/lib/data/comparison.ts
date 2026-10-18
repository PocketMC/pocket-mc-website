export const comparisonCategories = [
	{
		title: 'Cost & Freedom',
		items: [
			{
				feature: 'Monthly Cost',
				pocketmc: 'Free forever ($0)',
				pocketmcHighlight: true,
				vps: '$5 - $40 / month',
				aternos: 'Free (heavy ads / queues)',
				manual: 'Free'
			},
			{
				feature: 'Hardware Limits',
				pocketmc: 'Uncapped (full PC specs with 80% RAM guard)',
				pocketmcHighlight: true,
				vps: 'Capped at paid tier specs',
				aternos: 'Strict 2–4 GB RAM cap',
				manual: 'Uses PC specs'
			},
			{
				feature: 'Always Online',
				pocketmc: 'Runs while PC is on (sleep inhibitor)',
				pocketmcHighlight: true,
				vps: '24/7 cloud server',
				aternos: 'Auto-shuts down when empty',
				manual: 'Runs while PC is on'
			}
		]
	},
	{
		title: 'Networking & Access',
		items: [
			{
				feature: 'Port Forwarding Required',
				pocketmc: 'No (built-in Playit tunnel)',
				pocketmcHighlight: true,
				vps: 'No (public cloud IP)',
				aternos: 'No (dynamic IP)',
				manual: 'Yes (router port forward)'
			},
			{
				feature: 'Remote Web Control',
				pocketmc: 'Built-in web panel & QR mobile pair',
				pocketmcHighlight: true,
				vps: 'Requires custom panel setup',
				aternos: 'Web panel only',
				manual: 'None'
			},
			{
				feature: 'Data Sovereignty',
				pocketmc: '100% local on your disk',
				pocketmcHighlight: true,
				vps: 'Stored on provider hardware',
				aternos: 'Hosted remotely, deleted if inactive',
				manual: '100% local'
			}
		]
	},
	{
		title: 'Ease of Use & Tooling',
		items: [
			{
				feature: 'Adoptium Java Provisioning',
				pocketmc: 'Automatic per-instance (8-25)',
				pocketmcHighlight: true,
				vps: 'Manual CLI package installation',
				aternos: 'Fixed container version',
				manual: 'Manual JDK install & PATH setup'
			},
			{
				feature: 'Mod & Plugin Marketplaces',
				pocketmc: 'In-app Modrinth & CurseForge',
				pocketmcHighlight: true,
				vps: 'Manual SFTP / wget download',
				aternos: 'Limited curated catalog',
				manual: 'Manual browser download & drop'
			},
			{
				feature: 'Backups & Cloud Sync',
				pocketmc: 'RCON-safe ZIP + Drive, Dropbox, OneDrive',
				pocketmcHighlight: true,
				vps: 'Paid addon or custom bash cron',
				aternos: 'Google Drive backup only',
				manual: 'Manual copy or custom script'
			},
			{
				feature: 'AI Crash Post-Mortems',
				pocketmc: 'Built-in Ollama, Gemini, Claude, OpenAI',
				pocketmcHighlight: true,
				vps: 'None',
				aternos: 'None',
				manual: 'None'
			}
		]
	}
];
