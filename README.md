# PocketMC website

A multi-page static website for PocketMC, the open-source local Minecraft server manager. Built with React 19, TypeScript, Vite 8, and Tailwind CSS 4.

## Design and pages

The design follows the local Sonora website: self-hosted Inter, a 1288px frame, thin section rules, compact controls, dark/light/system themes, and a three-column documentation layout. PocketMC branding, screenshots, download links, and product content are retained.

The build generates **24 HTML pages plus a custom 404**:

- Home, Install, Features, Community, FAQ, and Changelog.
- Documentation home and nine product guides.
- Existing API, Authentication, MCP, and Events references.
- About, Contact, Privacy, and Terms.

Each page includes rendered HTML, its own title, description, canonical URL, and structured data. The sitemap is generated from the same route registry. Navigation uses ordinary links, so direct entry, refresh, browser history, and opening pages in new tabs work on static hosts.

## Development

Use Node.js 24 or later.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4173
```

`npm test` verifies the generated output and discovery files; run the build first. Builds write only to `dist/` and do not copy or prune any sibling repository.

## Browser verification

With the production preview running on port 4173:

```sh
npm run test:browser
```

The Puppeteer audit captures every page at 1440px and 390px, checks internal links, metadata, overflow and image loading, then exercises themes, installer tabs, clipboard copying, mobile navigation, search, FAQ deep links, screenshot dialogs, browser history, 404 behavior, 320px layouts, and content without JavaScript. Output goes to `.ai/screenshots/pocketmc/` (ignored by Git).

The audit uses installed Windows Chrome by default. Set `CHROME_PATH` to another Chrome/Chromium executable and `AUDIT_ORIGIN` to another preview origin when needed.

`npm run capture:reference` captures the local Sonora project running on port 5174. `node scripts/contact-sheets.mjs` makes overview images from the captures.

## Deployment

GitHub Actions builds, lints, tests, and publishes `dist/` to GitHub Pages on the configured branches. Local work does not publish anything.

The default site base is `/`, matching `https://pocketmc.github.io/`. For a project-subdirectory deployment, set `SITE_BASE=/pocket-mc-website/` **for both build and preview**. Set `SITE_ORIGIN` for a different canonical origin. Assets, navigation, generated HTML, and sitemap use the configured base.

## Editing

- `src/data/site.ts`: product guides, FAQ content, feature groups, screenshots, and official links.
- `src/data/routes.ts`: route registry and page metadata.
- `src/pages/ProductPages.tsx`: home, installation, features, and community.
- `src/pages/DocumentationPage.tsx`: shared docs layout and navigation.
- `src/pages/HelpPages.tsx`: FAQ and selected release notes.
- `src/components/site/`: shared layout, installer, search, and UI primitives.
- `src/index.css`: design tokens and responsive styling.
- `scripts/prerender.mjs`: static React rendering, metadata, structured data, and sitemap.

Release notes are curated from the Windows repository changelog. Download buttons use official GitHub release assets. Windows and Linux/macOS editions have separate releases and may differ in features.

## Official links

- [Website](https://pocketmc.github.io/)
- [Windows source](https://github.com/PocketMC/pocket-mc-windows)
- [Linux and macOS source](https://github.com/PocketMC/pocket-mc-linux-mac)
- [Discord](https://discord.gg/mWdMr8Mc2m)
- [Contact](mailto:contactdslabs@gmail.com)
