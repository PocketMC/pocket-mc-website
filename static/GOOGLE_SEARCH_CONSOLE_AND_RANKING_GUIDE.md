# PocketMC - Complete Google Search Console & #1 Ranking Master Guide

> **Target Domain:** `https://pocketmc.github.io/`  
> **Brand Identity:** PocketMC  
> **Value Proposition:** #1 Local Minecraft Server Manager for Windows

---

## Part 1: Migrating from `pocketmc.github.io/pocket-mc-website` to `pocketmc.github.io`

### 1. Understanding GSC Data Transfer
In Google Search Console, performance metrics (impressions, clicks, queries, click-through rates) are permanently tied to the exact URL prefix where they were served. 

* **Change of Address Tool:** Google's "Change of Address" feature is strictly restricted to whole domain migrations (e.g., `pocketmc.org` -> `pocketmc.io`). Google **does not** allow using this tool for subfolder-to-root moves on the same domain (`/pocket-mc-website/` -> `/`).
* **How Google Actually Transfers Your Ranking & Authority:** Google transfers all ranking power, PageRank, backlinks, and brand equity through:
  1. **Canonical URLs:** Every page on `https://pocketmc.github.io/` now emits a strict canonical tag pointing to itself as the root canonical source.
  2. **Legacy Path Fallbacks:** Any user or bot visiting `/pocket-mc-website/` is greeted with fallback redirects pointing directly to the root counterparts.
  3. **Googlebot Signal Consolidation:** When Google crawls the new root sitemap and sees the matching canonical tags and superior performance, it automatically consolidates search equity into `https://pocketmc.github.io/`.

### 2. Action Plan for Your Existing GSC Profile
1. **DO NOT delete** your old `https://pocketmc.github.io/pocket-mc-website/` property in Search Console.
   * Keep it active so you can watch historical impressions transfer over.
   * Over the next 2 to 4 weeks, you will see impressions in the old property decline to near zero while the new root property surges.
2. **Add the New Root Property Immediately:**
   * Go to [Google Search Console](https://search.google.com/search-console).
   * Click the property selector (top left) > **+ Add Property**.
   * Under **URL prefix**, enter:
     ```text
     https://pocketmc.github.io/
     ```
   * Click **Continue**.
3. **Verification:**
   * Since `https://pocketmc.github.io/` is hosted on GitHub Pages, verification is automatic if you use the HTML tag method (already in `<head>`), or GitHub OAuth / Google Analytics account linked to the organization.

---

## Part 2: Step-by-Step Google Search Console Indexing Plan

### Step 1: Submit the Master Sitemap
1. Inside the new `https://pocketmc.github.io/` property, open **Indexing > Sitemaps** from the sidebar.
2. In the "Add a new sitemap" box, type:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Refresh after 10-30 seconds. The status must display **Success** and indicate **21 discovered URLs**.

---

### Step 2: Request Fast-Track Indexing (Overcoming Daily Quotas)
Google imposes a strict daily quota of roughly **10 to 12 manual URL inspection requests per day**. Do not attempt to submit all 21 URLs at once, or Google will block further requests for 24 hours. Follow this 2-day priority sequence:

#### Day 1: Priority Hubs & Sitelinks Candidates
Paste each URL into the top search bar ("Inspect any URL in..."), click **Test Live URL**, wait for the green checkmark, then click **Request Indexing**:

- [ ] `https://pocketmc.github.io/` (Homepage - Core Brand Hub)
- [ ] `https://pocketmc.github.io/download/` (Download Hub - Direct setup.exe, winget, zip)
- [ ] `https://pocketmc.github.io/gallery/` (Screenshot Tour & Visual UI)
- [ ] `https://pocketmc.github.io/faq/` (FAQ Hub & Troubleshooting Q&A)
- [ ] `https://pocketmc.github.io/about/` (About & Open Source Philosophy)
- [ ] `https://pocketmc.github.io/contact/` (Contact, Discord & Community)
- [ ] `https://pocketmc.github.io/privacy/` (Privacy Policy & DPAPI Security)
- [ ] `https://pocketmc.github.io/terms/` (Terms of Service & MIT License)
- [ ] `https://pocketmc.github.io/docs/introduction/` (Docs Root & Architecture)
- [ ] `https://pocketmc.github.io/docs/servers/` (Engines: Vanilla, Paper, Fabric, BDS)
- [ ] `https://pocketmc.github.io/docs/tunnels/` (Networking & Playit.gg Tunnels)

#### Day 2: Deep Technical & Developer Guides
Submit the remaining 10 pages once the quota resets (24 hours later):

- [ ] `https://pocketmc.github.io/docs/runtimes/` (Adoptium Java 8-25 & PHP Management)
- [ ] `https://pocketmc.github.io/docs/addons/` (Modrinth & CurseForge Marketplace)
- [ ] `https://pocketmc.github.io/docs/management/` (Instance & World Management)
- [ ] `https://pocketmc.github.io/docs/backups/` (Google Drive & Cloud Backups)
- [ ] `https://pocketmc.github.io/docs/recovery/` (Crash Recovery Watchdog)
- [ ] `https://pocketmc.github.io/docs/remote/` (Remote Web Panel & Dashboard)
- [ ] `https://pocketmc.github.io/docs/discord/` (Discord RPC Integration)
- [ ] `https://pocketmc.github.io/docs/api/` (Kestrel REST & WebSocket API)
- [ ] `https://pocketmc.github.io/docs/auth/` (Granular Roles & Authentication)
- [ ] `https://pocketmc.github.io/docs/ai/` (Local Ollama & AI Log Summaries)

---

## Part 3: Winning #1 on Google for Minecraft Server Queries

To rank #1 against competitors like SquidServers, Crafty Controller, and commercial hosts, Google evaluates 5 specific ranking pillars:

### Pillar 1: Branded SERP Dominance & Sitelinks
* **The Goal:** When someone searches `Pocket MC` or `PocketMC`, our result must take up the entire top half of Google with a **6-pack sitelinks layout** (Home, Download, Docs, Gallery, FAQ, About).
* **What We Built:**
  * Clean, independent URL paths (e.g. `/download/`, `/gallery/`, `/docs/introduction/`) rather than hash links (`#steps`).
  * Explicit internal links in `<header>` and `<footer>` with exact anchor text ("Download", "Docs", "Gallery", "FAQ").
  * Structured Schema.org graph with brand variations (`Pocket MC` and `PocketMC`) and `WebSite` navigation.

### Pillar 2: Target Keywords & Intent Clusters
We target users searching for **local, free, and zero-headache hosting** rather than expensive monthly VPS subscriptions:

| Search Query | Search Intent | Optimized URL | SERP Differentiation |
|:---|:---|:---|:---|
| **Pocket MC download** | Transactional | `/download/` | Direct Windows installer, Winget terminal command, portable zip |
| **Minecraft server manager for Windows** | Commercial / Category | `/` | #1 Local Minecraft Server Manager, native Windows WPF app, 0 Java conflicts |
| **Host Minecraft server on PC without port forwarding** | High-Pain Problem Solving | `/docs/tunnels/` | Automated Playit.gg encrypted tunnels, free public domain, no router password needed |
| **Minecraft Java and Bedrock crossplay server local** | Feature Specific | `/docs/addons/` | Automatic GeyserMC and Floodgate provisioning with Bedrock loopback exemption |
| **Minecraft server automatic cloud backup Google Drive** | Utility Specific | `/docs/backups/` | Safe RCON save-holding, SHA-256 archive verification, zero lock conflicts |
| **Minecraft server control panel Windows desktop** | Category Comparison | `/` & `#comparison` | Local-first, zero Docker overhead, desktop UI with mobile web dashboard companion |

### Pillar 3: Title & Meta Description Formula (Zero Em Dashes, Clean Branding)
Google prioritizes clean, high-CTR titles without formatting artifacts:
* **Homepage Title:** `PocketMC - #1 Local Minecraft Server Manager for Windows`
* **Download Title:** `Download PocketMC - Windows Setup, Winget & Portable`
* **Docs Title:** `[Page Name] - PocketMC Documentation`
* **Formula:** `[Primary Keyword] - [Clear Value Proposition / Feature]`

### Pillar 4: High-Authority Backlink Acquisition (How to Trigger Google Rank #1)
Google algorithms require external domain authority signals to place a new website at position #1. Execute these high-leverage steps:

1. **GitHub Ecosystem Backlinks:**
   * Ensure `https://github.com/PocketMC/pocket-mc-windows` lists `https://pocketmc.github.io/` in its About website field.
   * Add a badge to the `README.md` pointing directly to `https://pocketmc.github.io/download/`.
2. **Minecraft Community Portals:**
   * **Planet Minecraft:** Submit Pocket MC under Software & Tools with a link to `https://pocketmc.github.io/`.
   * **SpigotMC & PaperMC Forums:** Create a resource showcase thread in the "Tools" or "Server Management" section.
   * **Reddit (`r/admincraft`, `r/Minecraft`):** Share a high-value community post ("We built a free, local-first Minecraft server manager for Windows with automated Playit.gg tunnels and zero port forwarding").
3. **Modding Community Indexing:**
   * If any community plugins, mods, or utilities link to Pocket MC, ensure they use the clean URL: `https://pocketmc.github.io/`.

### Pillar 5: AI Crawler & Semantic Search Domination
Modern search discovery is increasingly driven by AI search engines (Perplexity, ChatGPT Search, Gemini, Claude).
* We have equipped the website with:
  * `https://pocketmc.github.io/llms.txt` (clean overview of capabilities and decision criteria).
  * `https://pocketmc.github.io/llms-full.txt` (full 30KB full-text corpus of technical documentation).
  * `<meta name="ai-agent" content="enabled">` on every page.
  * Verified comparisons with proof dialogs and zero unsubstantiated claims.
* When users ask an AI: *"What is the easiest free tool to host a Minecraft server on Windows with friends without port forwarding?"*, Pocket MC matches 10/10 criteria.

---

## Part 4: Ongoing Monitoring & Health Checklist

| Frequency | Task | Tool | Target Metric |
|:---|:---|:---|:---|
| **Weekly** | Check Indexed Pages count | GSC > Pages | 21 Indexed, 0 Excluded with errors |
| **Weekly** | Monitor Top Queries & CTR | GSC > Performance | Rising clicks for "Pocket MC" and "Minecraft server manager" |
| **Monthly** | Audit Sitemaps & Robots | `audit-agent-crawler.cjs` | 100/100 Benchmark score |
| **Per Release** | Verify latest version in metadata | `scripts/inspect-repo.cjs` | Release tag matches latest GitHub .exe |
