# Pocket MC Website

This project is a Vite + React + TypeScript app.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

1. Builds the app on pushes to `main`
2. Publishes `dist/` to GitHub Pages

### One-time GitHub setup

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **GitHub Actions**
3. Make sure your default branch is `main` (or update the workflow trigger)

After that, every push to `main` will deploy automatically.
