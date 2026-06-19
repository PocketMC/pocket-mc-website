# Google Site Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Google Search Console verification meta tag to the website.

**Architecture:** Direct insertion into the `<head>` section of the main `index.html` file.

**Tech Stack:** HTML

---

### Task 1: Add Meta Tag to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Locate the SEO metadata block in `index.html`**

Find the section commented as `<!-- Primary SEO Metadata -->`.

- [ ] **Step 2: Add the Google site verification meta tag**

Insert the following line after the `<noscript>` block and before the `<title>` tag:

```html
        <!-- Google Site Verification -->
        <meta name="google-site-verification" content="N3Nvo8fo2_VexoKoe00C6ss5b-hPNlpDbh2-Uu5XLy4" />
```

- [ ] **Step 3: Verify the change locally**

Check the `index.html` file to ensure the tag is correctly placed and has the exact content.

- [ ] **Step 4: Commit the change**

```bash
git add index.html
git commit -m "feat: add google site verification meta tag"
```

### Task 2: Verify Build Output

**Files:**
- Test: `dist/index.html` (after build)

- [ ] **Step 1: Run the build command**

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 2: Check the production `index.html`**

Verify that `dist/index.html` contains the string `N3Nvo8fo2_VexoKoe00C6ss5b-hPNlpDbh2-Uu5XLy4`.

Run: `grep "google-site-verification" dist/index.html`
Expected: Output showing the meta tag.
