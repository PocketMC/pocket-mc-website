# PocketMC Website 🌐

The official landing page for **PocketMC**, the free local-first Windows client for automated Minecraft server management.

🚀 **Live Website**: [pocketmc.github.io/pocket-mc-website](https://pocketmc.github.io/pocket-mc-website/)
📦 **App Repository**: [PocketMC/pocket-mc-windows](https://github.com/PocketMC/pocket-mc-windows)

---

## 🎨 Tech Stack & Features

This website is designed with a premium, game-inspired aesthetic featuring rich interactive micro-animations, a fully responsive light/dark theme system, and complete modern SEO structures.

### Core Stack
* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Animation & Rendering**: Motion (Framer Motion v12) & Three.js (via WebGL)

### Page Sections
| Section | Description |
|---|---|
| **Hero** | Headline, tagline, download CTA, and a scroll-driven WebP animation backdrop |
| **Features Overview** | Four key feature cards: Runtime Management, Backups, Tunneling, and Marketplace |
| **Screenshot Tour** | Interactive carousel of the PocketMC desktop UI navigated by a floating Dock |
| **Feature Details** | Deep-dive cards per feature with animated ElectricBorder canvas effects |
| **Server Software** | Visual grid of all 7 supported server engines with platform badges |
| **Requirements & Quickstart** | System requirements table and step-by-step quick-start guide |
| **Comparison Table** | Side-by-side comparison of PocketMC vs. Crafty Controller, MCSManager, AMP, Pterodactyl, and CLI |
| **FAQ** | Animated accordion FAQ with 6 common questions about setup, cross-play, pricing, and privacy |
| **Call to Action** | Download button linking to the latest GitHub release |

### Key UI Components
* **`<ElectricBorder />`**: Neon electric canvas trace with random noise wave algorithms (feature detail cards).
* **`<BorderGlow />`**: Mouse-proximity edge lighting with multi-colour gradients (server software stack).
* **`<LiquidEther />`**: Interactive WebGL liquid shader background (requirements / quickstart section).
* **`<StarBorder />`**: Rotating animated star orbit border (quickstart steps).
* **`<ClickSpark />`**: Cursor-click physics particle burst.
* **`<PixelSnow />`**: Retro pixelated snow fall overlay (pre-footer CTA section).
* **`<Dock />`**: Custom floating screenshot navigation dock with client-coordinate hover scaling.
* **Fullscreen Lightbox Viewer**: Touch gestures (swipe), `Escape`/backdrop close, keyboard arrows.

### Theme Adaptivity
All dynamic effects dynamically adjust colour palettes, opacities, and canvas blend-modes:
* **Light mode** (`#f7f5ef` beige): `mix-blend-mode: normal`, muted glow intensities, indigo accent palette.
* **Dark mode** (`#09090b` slate): `mix-blend-mode: plus-lighter`, vibrant violet/purple accent palette.

### SEO & Discoverability
* **Structured Metadata**: Canonical URL, Open Graph headers, Twitter Card, and `robots.txt` controls.
* **JSON-LD Rich Snippets**: Both `SoftwareApplication` (for Google Search download cards) and `FAQPage` (for Google FAQ accordions in SERPs) schemas.
* **Sitemap**: `public/sitemap.xml` for search engine crawling.
* **LLM Context (`llm.txt`)**: Machine-readable developer log at `public/llm.txt` — a codebase summary for AI agents and LLM-based search tools.

---

## 🛠️ Development & Commands

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* npm

### Installation
```bash
# Clone the repository
git clone https://github.com/PocketMC/pocket-mc-website.git
cd pocket-mc-website

# Install dependencies
npm install
```

### Local Development
```bash
# Run the Vite local development server
npm run dev
```

### Linting
```bash
# Run ESLint to check for code quality and style guidelines
npm run lint
```

### Production Build & Preview
```bash
# Validate TypeScript compiles and build production distribution bundle
npm run build

# Locally preview the built production bundle
npm run preview
```
The compiled output is emitted to the `dist/` directory, configured for sub-folder routing under the base path `/pocket-mc-website/`.

### Deployment
This website is hosted on **GitHub Pages**. Deployments are automated: pushing changes to the main repository triggers a GitHub Actions workflow that compiles, builds, and deploys the assets to the live page at [pocketmc.github.io/pocket-mc-website](https://pocketmc.github.io/pocket-mc-website/).

---

## 📂 Project Structure

```text
├── public/                     # Static assets served as-is
│   ├── screenshots/            # Desktop UI screenshot PNGs used in the tour
│   ├── icons/                  # Server software logos (Paper, Fabric, Forge, etc.)
│   ├── bg_animation/           # WebP frames for the scroll-driven background
│   ├── Hero_bg_animation/      # WebP frames for the hero background
│   ├── favicon.ico / .svg      # Site icon
│   ├── logo.png                # PocketMC logo
│   ├── robots.txt              # Search engine crawl rules
│   ├── sitemap.xml             # XML sitemap for search indexing
│   └── llm.txt                 # Machine-readable context for LLM/AI agents
├── src/
│   ├── components/             # All interactive and layout components
│   │   ├── ui/                 # Core skeleton/table components (shadcn-style)
│   │   ├── BorderGlow.tsx      # Mouse-proximity edge-lighting canvas effect
│   │   ├── ClickSpark.tsx      # Click-triggered physics spark burst
│   │   ├── Dock.tsx            # Floating screenshot navigation dock
│   │   ├── ElectricBorder.tsx  # Neon electric canvas path distortion
│   │   ├── LiquidEther.tsx     # Fluid interactive WebGL background shader
│   │   ├── PixelSnow.tsx       # Retro pixelated snowfall overlay
│   │   └── StarBorder.tsx      # Animated star orbit border wrapper
│   ├── App.tsx                 # Main page layout, all sections & state coordination
│   ├── index.css               # Global Tailwind v4 design tokens & CSS variables
│   └── main.tsx                # React application entry point
├── index.html                  # Root HTML with all SEO metadata & JSON-LD schemas
├── package.json
└── vite.config.ts
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/PocketMC/pocket-mc-windows/blob/main/LICENSE) in the main app repository for details.
