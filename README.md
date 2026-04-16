# Pocket MC Website

This project is a Vite + React + TypeScript app.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

1. Builds the app on pushes to `master`
2. Publishes `dist/` to GitHub Pages

### One-time GitHub setup

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to `/ (root)`

After that, every push to `master` will build and publish automatically.
