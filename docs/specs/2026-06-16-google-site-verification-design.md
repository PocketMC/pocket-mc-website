# Design: Add Google Site Verification

**Date:** 2026-06-16
**Status:** Approved

## Goal
Add a Google Search Console verification meta tag to the website to allow Google to verify ownership and index the site.

## Approach
Add the `<meta>` tag directly to the `<head>` section of `index.html`. This is the standard and most reliable method for static site verification.

## Implementation Details

### File: `index.html`
Add the following tag within the `<head>` section, preferably in the SEO metadata block:

```html
<meta name="google-site-verification" content="N3Nvo8fo2_VexoKoe00C6ss5b-hPNlpDbh2-Uu5XLy4" />
```

## Verification Plan
1. Manually verify the tag is present in `index.html`.
2. Run `npm run build` to ensure the tag is preserved in the production build.
3. Check the build output (`dist/index.html`) for the presence of the tag.
