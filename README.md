# PocketMC Website

The official static landing page and showcase for **PocketMC**, the free, open-source local Minecraft server manager for Windows, Linux, and macOS.

[![Website](https://img.shields.io/badge/Website-Live%20Page-black?style=flat-square)](https://pocketmc.github.io/pocket-mc-website/)
[![GitHub Release](https://img.shields.io/github/v/release/PocketMC/pocket-mc-windows?style=flat-square&color=black&label=App%20Release)](https://github.com/PocketMC/pocket-mc-windows/releases/latest)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-black?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-black?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-black?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-black?style=flat-square&logo=vite)](https://vite.dev/)

---

## Overview

The PocketMC website is a high-performance, client-only landing page designed to communicate trust, demonstrate local-first Minecraft server management capabilities, and drive desktop application downloads.

* **Live Deployment**: [pocketmc.github.io/pocket-mc-website](https://pocketmc.github.io/pocket-mc-website/)
* **App Repository**: [PocketMC/pocket-mc-windows](https://github.com/PocketMC/pocket-mc-windows)
* **Linux/Mac Repository**: [PocketMC/pocket-mc-linux-mac](https://github.com/PocketMC/pocket-mc-linux-mac)

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **UI Framework** | React 19.2 (Client-Side Rendering) |
| **Language** | TypeScript 6.0 (Strict mode, explicit interfaces) |
| **Styling & Theme** | Tailwind CSS v4, dynamic CSS variable system (`index.css`) |
| **Motion & Animation** | Motion (`motion/react` v12), GSAP, native CSS transforms |
| **Tooling & Bundler** | Vite 8.0 with sub-path routing support (`/pocket-mc-website/`) |
| **Icons & Media** | Custom SVG vectors, optimized WebP graphics, lazy-loaded dialog portals |

---

## Design System & Principles

* **Monochrome Palette**: Built on a strict black, white, and neutral grey aesthetic mapped to semantic CSS tokens (`--base`, `--base-card`, `--base-muted`, `--main`, `--main-muted`, `--divider`).
* **Adaptive Theme Engine**: Smooth dark and light mode transitions with zero layout shift and persistent local storage synchronization.
* **Component Layering**: High-priority modal dialogs are teleported directly to `document.body` via React Portals (`z-[99999]`) to avoid stacking context collisions.
* **Mobile-First Responsiveness**: Tailored layout adaptations from ultra-compact viewports (320px) to ultra-wide displays with hardware-accelerated fixed headers and containment (`contain: layout paint`).

---

## Page Structure & Sections

| Section | Component | Purpose |
| :--- | :--- | :--- |
| **Header** | `Header.tsx` | Fixed navigation bar with IntersectionObserver scrollspy, theme switch, and mobile drawer. |
| **Hero** | `HeroSection.tsx` | Value proposition, download CTAs, video player with speed and fullscreen controls, and core statistics. |
| **Tour** | `TourSection.tsx` | 16:9 screenshot showcase (`Explore every screen.`) with multi-image gallery arrows and interactive dock navigation. |
| **Engines** | `SoftwaresSection.tsx` | Interactive matrix of supported engines (Vanilla, Paper, Fabric, Forge, NeoForge, BDS, PocketMine-MP) with Geyser crossplay details. |
| **Comparison** | `ComparisonSection.tsx` | Side-by-side technical matrix comparing PocketMC against alternatives (Pterodactyl Panel, SquidServers, auto-mcs, MCSManager, Crafty Controller, etc.) with technical audit proof modals. |
| **Stability** | `StabilitySection.tsx` | Collapsible 3-pillar breakdown of lifecycle safety, AI log diagnostics, and background file safeguards. |
| **FAQ** | `FaqSection.tsx` | Interactive accordion answering questions regarding runtimes, Bedrock crossplay, cloud backups, and zero-port-forwarding. |
| **Call to Action** | `CtaSection.tsx` | Final download prompts and direct links to GitHub repositories and community Discord. |
| **Footer** | `Footer.tsx` | Open-source MIT licensing attribution, legal modals (Terms of Service, Privacy Policy), and donation links. |

---

## SEO & Machine-Readable Metadata

* **Search Engine Optimization**: Enriched meta tags, high-intent Minecraft hosting keyword maps, and canonical URLs.
* **Schema.org Structured Data**:
  * `SoftwareApplication` schema with Google SERP `AggregateRating` (4.9 rating based on community reviews) and multi-OS attributes.
  * `FAQPage` schema enabling Google search rich snippet accordions.
* **Robots & Sitemap**: Automated crawling definitions in `public/robots.txt` and `public/sitemap.xml`.
* **AI Engine Indexing (`public/llm.txt`)**: Curated, machine-readable developer documentation for AI search engines (Perplexity, ChatGPT, Claude).

---

## Project Structure

```text
pocket-mc-website/
├── public/                         # Static assets served as-is
│   ├── bg_animation/               # Background WebP frame assets
│   ├── Hero_bg_animation/          # Hero animation assets
│   ├── icons/                      # Server engine SVGs (Paper, Fabric, etc.)
│   ├── screenshots/                # Application UI screenshots
│   ├── llm.txt                     # Machine-readable context for AI crawlers
│   ├── robots.txt                  # Search engine directives
│   └── sitemap.xml                 # XML sitemap
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx          # Page footer and legal triggers
│   │   │   └── Header.tsx          # Fixed header with theme and nav controls
│   │   ├── sections/
│   │   │   ├── ComparisonSection.tsx # Technical comparison table & cards
│   │   │   ├── CtaSection.tsx      # Bottom call to action
│   │   │   ├── FaqSection.tsx      # Animated FAQ accordion
│   │   │   ├── HeroSection.tsx     # Hero banner and media player
│   │   │   ├── PlatformsSection.tsx # Platform download targets
│   │   │   ├── SoftwaresSection.tsx # Supported server softwares
│   │   │   ├── StabilitySection.tsx # Collapsible stability pillar cards
│   │   │   └── TourSection.tsx     # Screenshot tour and gallery
│   │   └── ui/
│   │       ├── LightboxModal.tsx   # Fullscreen image viewer portal
│   │       ├── PlatformDownloadModal.tsx # Multi-OS download portal
│   │       ├── ProofModal.tsx      # Technical audit evidence portal
│   │       ├── TextModal.tsx       # Terms and Privacy modal portal
│   │       └── table.tsx           # Accessible data table primitives
│   ├── data/
│   │   ├── comparisonData.ts       # Competitor audit matrices and proofs
│   │   ├── detailFeatures.ts       # Stability pillar feature definitions
│   │   ├── faqData.ts              # Frequently asked questions and answers
│   │   ├── serverSoftwares.ts      # Server engine metadata and icons
│   │   ├── socialLinks.ts          # External community and repository links
│   │   └── tourTabs.ts             # Screenshot gallery tab configurations
│   ├── utils/
│   │   └── getAssetUrl.ts          # Base path resolver for GitHub Pages
│   ├── App.tsx                     # Root page coordinator and modal state
│   ├── index.css                   # Global Tailwind v4 styles and tokens
│   └── main.tsx                    # React application entry point
├── index.html                      # Root HTML and JSON-LD structured schemas
├── package.json                    # Project dependencies and build scripts
├── tsconfig.json                   # TypeScript project configuration
└── vite.config.ts                  # Vite bundler configuration
```

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version 20 or higher recommended)
* [npm](https://www.npmjs.com/) (version 10 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/PocketMC/pocket-mc-website.git
cd pocket-mc-website

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Starts the local development server at `http://localhost:5173/pocket-mc-website/`.

### Production Build

```bash
npm run build
```

Runs TypeScript type checks (`tsc -b`) and bundles optimized static assets into the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Locally serves the compiled `dist/` output for verification before deployment.

---

## Deployment

The website is hosted on **GitHub Pages**.

Deployments are automated through GitHub Actions. Pushing code changes to the `main` branch triggers a workflow that validates TypeScript types, builds the production distribution bundle, and deploys the output to the `gh-pages` branch.

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).
