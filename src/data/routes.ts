import { developerDocs, docs } from "./site";

export const routes = [
  {
    path: "/",
    title: "PocketMC - Your worlds. Your hardware.",
    description:
      "A free, open-source Minecraft server manager for Windows, Linux, and macOS. Run Java and Bedrock servers on your own hardware.",
  },
  {
    path: "/install/",
    title: "Install PocketMC",
    description:
      "Download PocketMC for Windows, Linux, or macOS. Installation steps and links to official releases.",
  },
  {
    path: "/features/",
    title: "What it does · PocketMC",
    description:
      "Explore PocketMC server management, live console, mods, backups, tunnels, and remote control.",
  },
  {
    path: "/community/",
    title: "Community · PocketMC",
    description:
      "Join the PocketMC community, get help, report issues, or contribute to the project.",
  },
  {
    path: "/faq/",
    title: "FAQ · PocketMC",
    description:
      "Answers about PocketMC installation, Minecraft servers, cross-play, backups, privacy, and troubleshooting.",
  },
  {
    path: "/changelog/",
    title: "Changelog · PocketMC",
    description:
      "Selected PocketMC Windows release notes, improvements, and fixes.",
  },
  {
    path: "/gallery/",
    title: "Screenshot Gallery · PocketMC",
    description:
      "Explore high-resolution screenshots of PocketMC server management, plugins, live console, backups, tunnels, and mobile remote.",
  },
  {
    path: "/docs/",
    title: "Documentation · PocketMC",
    description:
      "Learn how to install PocketMC, create a Minecraft server, and manage worlds, mods, backups, and remote access.",
  },
  ...[...docs, ...developerDocs].map((doc) => ({
    path: `/docs/${doc.slug}/`,
    title: `${doc.title} · PocketMC Docs`,
    description:
      "description" in doc
        ? doc.description
        : `${doc.title} reference for PocketMC developers.`,
  })),
  {
    path: "/about/",
    title: "About PocketMC",
    description:
      "Meet the free, open-source local Minecraft server manager and the people behind it.",
  },
  {
    path: "/contact/",
    title: "Contact · PocketMC",
    description:
      "Get in touch with PocketMC for support, feedback, security questions, and contributions.",
  },
  {
    path: "/privacy/",
    title: "Privacy & security · PocketMC",
    description:
      "How PocketMC handles local storage, optional integrations, telemetry, and credentials.",
  },
  {
    path: "/terms/",
    title: "Terms of service · PocketMC",
    description: "PocketMC licensing terms and self-hosting responsibilities.",
  },
];
