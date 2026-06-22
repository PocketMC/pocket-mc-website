<!-- GSD:project-start source:PROJECT.md -->
## Project

**PocketMC Website**

PocketMC Website is a premium static landing page and product showcase for PocketMC, a free, open-source local Minecraft server manager for Windows. The website highlights the application's key capabilities such as automatic Java Adoptium provisioning, Playit.gg tunneling, mod marketplaces, cloud backups, and remote management.

**Core Value:** Provide a high-performance, responsive, and visually stunning product showcase that communicates open-source trust and drives Windows desktop application downloads.

### Constraints

- **Tech Stack**: Must remain a Vite + React + TypeScript static website.
- **Color Palette**: Strictly limited to black, white, grey, and their shades.
- **Base Path compatibility**: Must preserve the base path `/pocket-mc-website/` configuration for GitHub Pages deployment.
<!-- GSD:project-end --> 

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 6.0 - All application code (`src/`)
- JavaScript - Build scripts, configuration files (`vite.config.ts`, `eslint.config.js`, `scripts/convert-webp.cjs`)
## Runtime
- Browser environment (client-only web application)
- Built/served locally using Node.js 24.x
- npm 10.x
- Lockfile: `package-lock.json` present
## Frameworks
- React 19.2 - UI library
- Tailwind CSS v4 - Styling system
- None configured
- Vite 8.0 - Bundler and development server
- TypeScript 6.0 - Compilation and type-checking
## Key Dependencies
- `@react-three/fiber` 9.6 - Three.js wrapper for React (used for complex 3D WebGL canvases like `LiquidEther.tsx`)
- `three` 0.184 - 3D engine for WebGL graphics
- `motion` 12.40 - Animation library (formerly framer-motion)
- `gsap` 3.15 - GreenSock animation platform for high-performance timeline animations
- `@types/react`, `@types/react-dom`, `@types/three` - TypeScript declarations
## Configuration
- Configured via static build-time properties and standard React props.
- Vite base path configured to `/pocket-mc-website/`.
- `vite.config.ts` - Vite bundler settings
- `tsconfig.json` - Root TypeScript config
- `tsconfig.app.json` - App compile options
- `tsconfig.node.json` - Node compiler settings (for configs)
- `eslint.config.js` - Linter settings
## Platform Requirements
- Windows/macOS/Linux with Node.js and npm installed.
- Static web hosting (GitHub Pages, Netlify, Vercel, etc.)
- Hosted under the base URL `/pocket-mc-website/`.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- PascalCase for React component files (e.g., `ClickSpark.tsx`, `Dock.tsx`).
- PascalCase for component-specific stylesheets (e.g., `BorderGlow.css`, `StarBorder.css`).
- camelCase or lowercase for configuration and setup files (e.g., `vite.config.ts`, `main.tsx`).
- kebab-case for CommonJS scripts (e.g., `convert-webp.cjs`).
- camelCase for functions and callback handlers (e.g., `resizeCanvas`, `getAssetUrl`).
- Standard hooks naming rules (`useCallback`, `useEffect`).
- camelCase for normal variables and hooks references (e.g., `canvasRef`, `activeTab`).
- UPPER_SNAKE_CASE for static arrays and configurations (e.g., `tourTabs`, `serverSoftwares`, `comparisonData`).
- PascalCase for interfaces (e.g., `Spark`, `ClickSparkProps`). No special prefix like "I".
- Props interfaces should suffix the component name with "Props" (e.g., `DockProps`).
## Code Style
- 2-space indentation.
- Standard semicolons on statement lines.
- String declarations use both single and double quotes. ESLint checks formatting rules.
- ESLint with flat config (`eslint.config.js`).
- Enforces standard rulesets: `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, and `reactRefresh.configs.vite`.
- Built-in TypeScript compiler options restrict unused locals (`noUnusedLocals: true`) and unused parameters (`noUnusedParameters: true`).
## Import Organization
- A single blank line separates third-party dependencies from local/relative imports.
## Error Handling
- Browser-native exceptions. Canvas setups and WebGL bindings check for element existence before execution.
- Early return guard clauses:
- Component-specific cleanups are returned at the end of `useEffect` blocks to prevent memory leaks and event listener duplication.
## Comments
- Explain complex canvas sizing, resize timeouts, and event cleanup bindings (e.g., inside `useEffect` resize observers).
- Demarcate lazy-loaded chunk boundaries (e.g., WebGL wrappers).
- Document browser quirks (e.g., Tailwind v4 theme variable cascade issues).
## Function & Module Design
- **Component Design:** Prefer functional components exported as default (e.g., `export default function Dock`).
- **Destructuring:** Destructure props directly in function parameters, assigning default fallback values inline where applicable.
- **Asynchronous loading:** Heavy animation and canvas blocks are lazy-loaded (`lazy`, `Suspense`) to avoid blocking first paint on mobile devices.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Build-once, deploy-anywhere static application.
- Utilizes React with component lazy-loading to achieve near-instantaneous first paints.
- Implements rich micro-interactions and high-performance WebGL graphics to convey premium design aesthetics.
- **Client-only:** Zero backend dependencies or server-side rendering (fully static).
- **Interactive:** Local state management controls dynamic content tours, interactive comparisons, and accordion features.
- **Lazy Loading:** Heavy WebGL canvas components are split and loaded asynchronously.
## Layers
- Purpose: Set up HTML shell, load global assets, and mount the React application.
- Contains: `index.html`, `src/main.tsx`
- Used by: Browser directly.
- Purpose: Main landing page structure, grid designs, sections, and copy.
- Contains: `src/App.tsx` (monolithic landing page component holding all metadata, content structures, and core layout logic).
- Depends on: Component Layer, Entry Layer.
- Purpose: Custom visual effects and reusable UI widgets.
- Contains:
- Used by: Page Layer.
- Purpose: Modern utility styles, custom variables, theme mappings, and animations.
- Contains: `src/index.css` (Tailwind CSS v4 entry, custom HSL variable theme definitions, custom `@theme` block).
- Used by: All TSX files.
## Data Flow
## Key Abstractions
- Purpose: Isolate WebGL logic and performance-intensive calculations from initial load.
- Examples: `PixelSnow.tsx` and `ElectricBorder.tsx` wrapped in `React.lazy` and rendered inside a fallback `<Suspense>` container.
- Purpose: Map custom CSS variables to Tailwind utility classes, resolving v4 cascade layer bugs.
- Implementation: Declared in `src/index.css` `@theme` block referencing standard CSS variables (`var(--base)`, etc.).
## Entry Points
- Location: `index.html`
- Triggers: Browser page load.
- Responsibilities: Load SEO metadata, preload fonts, inject SoftwareApplication and FAQ Page JSON-LD schema, and define the root `#root` div.
- Location: `src/main.tsx`
- Triggers: Script load.
- Responsibilities: Mount `<App />` under `<StrictMode>` using `createRoot`.
## Error Handling
- Client-side error boundaries are not custom-defined. Uncaught React component errors will cascade normally.
- Runtime path helper `getAssetUrl` validates assets and base paths to prevent broken image references under sub-directories or custom GitHub Pages paths.
## Cross-Cutting Concerns
- Handled via `motion/react` for layout transformations and tab switching.
- CSS Keyframes for infinite loops (floating, pulsing, rotating) in `src/index.css`.
- GSAP in custom canvas wrappers for custom animation timelines.
- Injected via structural JSON-LD scripts in `index.html`.
- Head tags contain primary OpenGraph, Twitter, and keyword metadata.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
