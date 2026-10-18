export const repo = "https://github.com/PocketMC/pocket-mc-windows";
export const unixRepo = "https://github.com/PocketMC/pocket-mc-linux-mac";
export const discord = "https://discord.gg/mWdMr8Mc2m";
export const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/PocketMC/pocket-mc-linux-mac/main/install.sh | bash";

export interface EnginePart {
  name: string;
  image: string;
}

export interface FeatureItem {
  name: string;
  icon?: string;
  images?: string[];
  parts?: EnginePart[];
}

export interface FeatureGroup {
  title: string;
  icon: string;
  items: FeatureItem[];
}

export const featureGroups: FeatureGroup[] = [
  {
    title: "Server software",
    icon: "server",
    items: [
      { name: "Vanilla Java", images: ["icons/vanilla.png"] },
      { name: "Paper", images: ["icons/papermc.png"] },
      { name: "Fabric", images: ["icons/fabric.png"] },
      {
        name: "Forge & NeoForge",
        parts: [
          { name: "Forge", image: "icons/forge.png" },
          { name: "NeoForge", image: "icons/neoforge.png" },
        ],
      },
      {
        name: "Bedrock & PocketMine-MP",
        parts: [
          { name: "Bedrock", image: "icons/bds.png" },
          { name: "PocketMine-MP", image: "icons/pocketmine-mp.png" },
        ],
      },
    ],
  },
  {
    title: "Management",
    icon: "terminal",
    items: [
      { name: "Live console & metrics", icon: "terminal" },
      { name: "Player management", icon: "users" },
      { name: "Scheduled restarts", icon: "clock" },
      { name: "Automatic Java runtimes", icon: "cpu" },
      { name: "Instance import & export", icon: "sync" },
    ],
  },
  {
    title: "Your worlds",
    icon: "archive",
    items: [
      { name: "Scheduled backups", icon: "archive" },
      { name: "Cloud replication", icon: "cloud" },
      { name: "Restore validation", icon: "shield" },
      { name: "Custom backup folders", icon: "folder" },
      { name: "World imports", icon: "globe" },
    ],
  },
  {
    title: "Add-ons",
    icon: "grid",
    items: [
      { name: "Modrinth", icon: "modrinth" },
      { name: "CurseForge", icon: "curseforge" },
      { name: "Poggit", icon: "package" },
      { name: "Mods & plugins", icon: "puzzle" },
      { name: "Bedrock packs", icon: "layers" },
    ],
  },
  {
    title: "Connections",
    icon: "network",
    items: [
      { name: "Playit.gg tunnels", icon: "tunnel" },
      { name: "Geyser & Floodgate", icon: "bridge" },
      { name: "Remote web dashboard", icon: "devices" },
      { name: "Discord integration", icon: "discord" },
      { name: "Optional AI log summaries", icon: "sparkles" },
    ],
  },
  {
    title: "Make it yours",
    icon: "settings",
    items: [
      { name: "Light & dark themes", icon: "sun" },
      { name: "Custom wallpapers", icon: "wallpaper" },
      { name: "Accent colors", icon: "palette" },
      { name: "Windows", icon: "windows" },
      { name: "Linux & macOS", icon: "monitor" },
    ],
  },
];

export const screenshots = [
  {
    label: "Dashboard",
    file: "screenshot-dashboard.webp",
    description:
      "Every instance, in one place. Start, stop, and monitor your servers.",
  },
  {
    label: "Console",
    file: "screenshot-console.webp",
    description:
      "Follow live logs, run commands, and see what your server is doing.",
  },
  {
    label: "Mods & plugins",
    file: "screenshot-plugins.webp",
    description: "Find and manage the add-ons that make your world your own.",
  },
  {
    label: "Backups",
    file: "screenshot-backups.webp",
    description: "Keep local snapshots and configure backups for your worlds.",
  },
  {
    label: "Tunnels",
    file: "tunnels.webp",
    description:
      "Share your server with friends using the built-in Playit.gg integration.",
  },
  {
    label: "Remote control",
    file: "remote-control.webp",
    description:
      "Manage your server from a paired browser, even away from your desk.",
  },
];

export interface GalleryItem {
  id: string;
  label: string;
  category: "Desktop" | "Management" | "Remote Mobile";
  file: string;
  description: string;
}

export const galleryScreenshots: GalleryItem[] = [
  {
    id: "dashboard",
    label: "Instances Dashboard",
    category: "Desktop",
    file: "screenshot-dashboard.webp",
    description: "Multi-instance overview with live CPU, memory, uptime, and player telemetry.",
  },
  {
    id: "console",
    label: "Smart Console",
    category: "Desktop",
    file: "screenshot-console.webp",
    description: "Real-time colorized server logs, command input, and automated AI session summaries.",
  },
  {
    id: "plugins",
    label: "Installed Plugins",
    category: "Desktop",
    file: "screenshot-plugins.webp",
    description: "Organize, update, and toggle server plugins with direct file directory access.",
  },
  {
    id: "mod-mgmt",
    label: "Mod Management",
    category: "Desktop",
    file: "screenshot-mod-management.webp",
    description: "Manage Forge, NeoForge, and Fabric mods without manual folder navigation.",
  },
  {
    id: "marketplace",
    label: "Modrinth & CurseForge Marketplace",
    category: "Desktop",
    file: "mod-marketplace.webp",
    description: "One-click downloads from Modrinth, CurseForge, and Poggit ecosystems.",
  },
  {
    id: "backups",
    label: "Automated Cloud Backups",
    category: "Desktop",
    file: "screenshot-backups.webp",
    description: "Scheduled RCON-secured archives synced directly to Google Drive, Dropbox, or OneDrive.",
  },
  {
    id: "tunnels",
    label: "Playit.gg Zero-Port Tunnels",
    category: "Management",
    file: "tunnels.webp",
    description: "Zero-port-forwarding public connections so friends can join from anywhere.",
  },
  {
    id: "ports-map",
    label: "Visual Ports Map",
    category: "Management",
    file: "ports-map.webp",
    description: "Interactive visual diagram mapping local server ports to active public endpoints.",
  },
  {
    id: "remote",
    label: "Remote Control Dashboard",
    category: "Management",
    file: "remote-control.webp",
    description: "Embedded HTTPS web dashboard for pairing phones and browsers with QR codes.",
  },
  {
    id: "permissions",
    label: "Granular Operator Permissions",
    category: "Management",
    file: "remote-control-permissions.webp",
    description: "Role-based access controls for remote web users, limiting commands and file editing.",
  },
  {
    id: "server-settings",
    label: "Server Configuration Editor",
    category: "Management",
    file: "server-settings.webp",
    description: "Interactive server.properties grid with live parameter validation and preflight checks.",
  },
  {
    id: "app-settings",
    label: "Application Preferences",
    category: "Management",
    file: "app-settings.webp",
    description: "Discord Rich Presence, automatic update channels, and startup options.",
  },
  {
    id: "runtimes",
    label: "Adoptium Java Runtimes",
    category: "Management",
    file: "java-runtimes.webp",
    description: "App-isolated Adoptium JDK 8 to 25 provisioning and PHP 8.2 PocketMine-MP manager.",
  },
  {
    id: "themes",
    label: "Themes & Visual Customization",
    category: "Management",
    file: "themes-showcase.webp",
    description: "Custom wallpapers, acrylic and mica material backdrops, and accent color palettes.",
  },
  {
    id: "mobile-home",
    label: "Mobile Remote Overview",
    category: "Remote Mobile",
    file: "mobile-home.webp",
    description: "Responsive smartphone dashboard for real-time monitoring on the go.",
  },
  {
    id: "mobile-console",
    label: "Mobile Live Terminal",
    category: "Remote Mobile",
    file: "mobile-console.webp",
    description: "Execute console commands and monitor server logs from any mobile browser.",
  },
  {
    id: "mobile-files",
    label: "Mobile File Explorer",
    category: "Remote Mobile",
    file: "mobile-file-management.webp",
    description: "Browse server folders, edit configuration files, and check logs remotely.",
  },
  {
    id: "mobile-backups",
    label: "Mobile Backups Manager",
    category: "Remote Mobile",
    file: "mobile-backups.webp",
    description: "Trigger manual backups and check restore points directly from your smartphone.",
  },
];

export type DocSection = {
  title: string;
  text: string;
  bullets?: string[];
  code?: string;
  image?: string;
};
export type Doc = {
  slug: string;
  title: string;
  group: string;
  description: string;
  sections: DocSection[];
};
export const docs: Doc[] = [
  {
    slug: "introduction",
    title: "Introduction",
    group: "Getting started",
    description:
      "Your Minecraft servers. Your machine. One place to manage it all.",
    sections: [
      {
        title: "What is PocketMC?",
        text: "PocketMC is a free, open-source desktop manager for local Minecraft servers. Create, run, monitor, and back up Java and Bedrock instances from a native app. Your worlds and server files stay in the app root you choose.",
        image: "screenshot-dashboard.webp",
      },
      {
        title: "A few things to know",
        text: "PocketMC manages servers on your computer. It is not a cloud hosting service or a Minecraft client launcher.",
        bullets: [
          "Your host computer must be on for players to connect.",
          "Windows uses a native WPF app. Linux and macOS use the Avalonia edition.",
          "Some features and release schedules differ between the two editions.",
          "Minecraft players still need the appropriate game client.",
        ],
      },
      {
        title: "Where to start",
        text: "Install the edition for your operating system, choose a writable app root, and create your first instance. PocketMC downloads the server software and manages the required runtime for you.",
      },
    ],
  },
  {
    slug: "first-server",
    title: "Your first server",
    group: "Getting started",
    description: "Go from a fresh install to a running world.",
    sections: [
      {
        title: "Choose your server software",
        text: "Create an instance from the dashboard. Pick an engine, Minecraft version, and a name you will recognize. Vanilla is a good starting point; Paper supports plugins, while Fabric, Forge, and NeoForge support their respective mods.",
      },
      {
        title: "Configure your world",
        text: "Choose your world settings, difficulty, player limit, and memory allocation. Read and accept the Minecraft EULA before starting a Java server. Leave enough memory for your operating system and game client.",
      },
      {
        title: "Start and connect",
        text: "Start the instance and watch the console until the server finishes loading. On the same computer, connect using localhost and the configured port. On your local network, use the host computer’s LAN address.",
        image: "screenshot-console.webp",
      },
      {
        title: "Invite your friends",
        text: "For friends outside your network, link Playit.gg and assign a tunnel to your instance. Share its public address. Keep PocketMC, the server, and the tunnel agent running.",
      },
    ],
  },
  {
    slug: "server-software",
    title: "Server software",
    group: "Using PocketMC",
    description: "Pick the right engine for the world you want to run.",
    sections: [
      {
        title: "Java Edition",
        text: "Vanilla provides the standard Minecraft server experience. Paper adds a plugin ecosystem. Fabric, Forge, and NeoForge support modded servers; players may need matching client-side mods.",
        bullets: [
          "Vanilla - the official Java server.",
          "Paper - plugins and server configuration.",
          "Fabric - a lightweight mod loader.",
          "Forge and NeoForge - modded server ecosystems.",
        ],
      },
      {
        title: "Bedrock Edition",
        text: "Bedrock Dedicated Server runs the official Bedrock server software. PocketMine-MP is a separate PHP-based server with its own plugin ecosystem and gameplay differences.",
      },
      {
        title: "Java and Bedrock together",
        text: "PocketMC can provision Geyser and Floodgate for supported Java configurations. Compatibility depends on the server engine and version. Console clients may require additional connection steps; check Geyser’s documentation for your device.",
      },
    ],
  },
  {
    slug: "mods",
    title: "Mods & plugins",
    group: "Using PocketMC",
    description:
      "Build your server’s collection without juggling download folders.",
    sections: [
      {
        title: "Browse the marketplaces",
        text: "Browse Modrinth for mods, plugins, and modpacks. CurseForge requires your own API key. PocketMine plugins are available through Poggit.",
        image: "mod-marketplace.webp",
      },
      {
        title: "Check compatibility",
        text: "Choose add-ons for your Minecraft version and loader. Read dependency requirements and side-support labels before installation. A client-only mod cannot provide server functionality.",
      },
      {
        title: "Manage installed add-ons",
        text: "Enable, disable, or update add-ons from their management view. Use the item menu to find its files or configuration. Restart the server when the add-on requires it, and take a backup before changing a modpack.",
      },
    ],
  },
  {
    slug: "backups",
    title: "Backups & restore",
    group: "Using PocketMC",
    description: "Keep a way back before you change your world.",
    sections: [
      {
        title: "Create a backup",
        text: "Take manual snapshots or configure scheduled backups and retention. PocketMC coordinates a save before backing up a running server and records backup metadata.",
        image: "screenshot-backups.webp",
      },
      {
        title: "Keep another copy",
        text: "Choose a custom local or external backup directory. Optional Google Drive, Dropbox, and OneDrive integrations replicate backups to your own account. Check upload history to confirm a copy completed.",
      },
      {
        title: "Restore carefully",
        text: "The Windows edition checks archive integrity and world structure, stages the restore, and backs up the current world before applying it. Stop the server and verify the selected snapshot before restoring. Periodically test your backup recovery process.",
      },
    ],
  },
  {
    slug: "tunnels",
    title: "Tunnels & cross-play",
    group: "Using PocketMC",
    description: "Give friends a public address for your local server.",
    sections: [
      {
        title: "Link Playit.gg",
        text: "Open Tunnels and follow the Playit.gg setup flow. Claim the agent with your account, then map your instance’s local port. Account limits and available tunnel types depend on Playit.gg.",
        image: "tunnels.webp",
      },
      {
        title: "Find the right address",
        text: "Use the Ports Map to see local bindings and public endpoints. Java and Bedrock use different protocols; use the address and port assigned to the relevant connection.",
      },
      {
        title: "If a friend cannot connect",
        text: "Confirm the server is running, the tunnel agent is connected, and the local port matches the instance. Check the firewall and the console for errors. A tunnel does not keep a sleeping or powered-off computer online.",
      },
    ],
  },
  {
    slug: "remote-control",
    title: "Remote control",
    group: "Using PocketMC",
    description: "Check in on your server from another screen.",
    sections: [
      {
        title: "Enable the dashboard",
        text: "Enable Remote Control in settings and configure authentication. Pair a browser using the provided URL or QR code. The host app must stay running.",
        image: "remote-control.webp",
      },
      {
        title: "Give each person the access they need",
        text: "The Windows edition supports multiple remote users and granular permissions. Review each user’s allowed instances and actions before sharing access.",
      },
      {
        title: "Access outside your network",
        text: "Use the supported HTTPS tunnel flow when you need internet access. Keep credentials and pairing links private. Revoke access when it is no longer needed.",
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings & appearance",
    group: "Reference",
    description: "Make PocketMC fit your setup.",
    sections: [
      {
        title: "App settings",
        text: "Set your app root, startup behavior, theme, and integrations from App Settings. Windows offers custom accent colors, wallpapers, and blur and dimming controls.",
        image: "app-settings.webp",
      },
      {
        title: "Server settings",
        text: "Configure each instance independently: memory, ports, server properties, recovery, and scheduled maintenance. Check available memory and port conflicts before starting.",
      },
      {
        title: "Optional AI summaries",
        text: "Configure a supported provider if you want help reading console logs. Hosted providers receive the submitted log content after sanitization. Local Ollama is an alternative. Review logs before sharing them and check your provider’s terms.",
      },
    ],
  },
  {
    slug: "help",
    title: "Getting help",
    group: "Reference",
    description:
      "A useful report starts with what happened and the log around it.",
    sections: [
      {
        title: "Check the console",
        text: "Read the first relevant error, not just the last line. Check the engine, Minecraft version, runtime, and recently changed mods. Keep a copy of the last-session log.",
      },
      {
        title: "Report a problem",
        text: "Open an issue in the repository for your operating system. Include your PocketMC version, operating system, server type, reproduction steps, and what you expected to happen. Remove tokens, IP addresses, and other sensitive details from logs.",
      },
      {
        title: "Ask the community",
        text: "Join the PocketMC Discord or Reddit community for setup questions and ideas. Search existing issues before filing a new report.",
      },
    ],
  },
];

export const developerDocs = [
  { slug: "api", title: "REST API", group: "Developers" },
  { slug: "auth", title: "Authentication", group: "Developers" },
  { slug: "mcp", title: "MCP & AI tools", group: "Developers" },
  { slug: "webhooks", title: "Events & WebSockets", group: "Developers" },
];

export const faqGroups = [
  {
    title: "Getting started",
    items: [
      {
        id: "free",
        q: "Is PocketMC really free?",
        a: "Yes. PocketMC is open-source software under the MIT License. You supply the computer and internet connection. Optional third-party services may have their own charges or limits.",
      },
      {
        id: "platforms",
        q: "Which operating systems are supported?",
        a: "There is a native Windows edition and a separate Linux and macOS edition. Download the build for your operating system from Install. Features and release schedules can differ between editions.",
      },
      {
        id: "runtimes",
        q: "Do I need to install Java or PHP first?",
        a: "PocketMC manages app-local Java runtimes for supported Java servers and PHP for PocketMine-MP. You do not need to change your system PATH. An internet connection is needed to download runtimes and server software.",
      },
    ],
  },
  {
    title: "Playing together",
    items: [
      {
        id: "friends",
        q: "How do my friends join?",
        a: "For local play, use your computer’s LAN address. For friends outside your network, set up the built-in Playit.gg integration and share the public server address. Keep the server and tunnel agent running.",
      },
      {
        id: "crossplay",
        q: "Can Java and Bedrock players play together?",
        a: "Geyser and Floodgate can bridge supported Java servers to Bedrock clients. Compatibility depends on your server engine and version. Some consoles need additional steps to connect to custom servers.",
      },
      {
        id: "offline",
        q: "Will my server run when my computer is off?",
        a: "No. The server runs on your hardware. Windows can prevent sleep while an instance is running, but PocketMC cannot keep a powered-off computer online.",
      },
    ],
  },
  {
    title: "Worlds, privacy & troubleshooting",
    items: [
      {
        id: "files",
        q: "Where are my worlds and backups stored?",
        a: "Server files stay in the app root you select. Backups are local unless you configure an external folder or connect Google Drive, Dropbox, or OneDrive. Always verify that scheduled backups and uploads completed.",
      },
      {
        id: "logs",
        q: "Are my logs sent to an AI service?",
        a: "AI summaries are optional. If you configure a hosted provider and request analysis, sanitized logs are sent to that provider. You can choose local Ollama instead. Review the submitted content before sharing it.",
      },
      {
        id: "start",
        q: "What should I check if a server will not start?",
        a: "Read the console for the first error. Check the selected Java version, available memory, port conflicts, and mod compatibility. Try reproducing the issue without recently added mods, after backing up your world.",
      },
    ],
  },
];
