const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const mirrorDir = path.resolve(rootDir, '..', 'pocketmc.github.io');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const indexHtmlPath = path.join(distDir, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

const scriptMatch = indexHtmlContent.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
const cssMatch = indexHtmlContent.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/);

if (!scriptMatch || !cssMatch) {
  console.warn('Could not extract script or css tags from dist/index.html');
} else {
  const scriptTag = scriptMatch[0];
  const cssTag = cssMatch[0];

  const htmlFilesToSync = [
    path.join(distDir, 'about', 'index.html'),
    path.join(distDir, 'contact', 'index.html'),
    path.join(distDir, 'privacy', 'index.html'),
    path.join(distDir, 'terms', 'index.html'),
    path.join(distDir, 'docs', 'index.html'),
    path.join(distDir, 'docs', 'api', 'index.html'),
    path.join(distDir, 'docs', 'auth', 'index.html'),
    path.join(distDir, 'docs', 'mcp', 'index.html'),
    path.join(distDir, 'docs', 'webhooks', 'index.html'),
  ];

  htmlFilesToSync.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace old assets or inject into head
    content = content.replace(/<script type="module" crossorigin src="[^"]+"><\/script>/g, scriptTag);
    content = content.replace(/<link rel="stylesheet" crossorigin href="[^"]+">/g, cssTag);

    if (!content.includes(scriptTag)) {
      content = content.replace('</head>', `        ${scriptTag}\n    </head>`);
    }
    if (!content.includes(cssTag)) {
      content = content.replace('</head>', `        ${cssTag}\n    </head>`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  });

  console.log('Synchronized latest asset tags across all static HTML templates.');
}

// Sync to mirror directory if present
if (fs.existsSync(mirrorDir)) {
  const copyRecursive = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };

  // Copy dist to root of mirror
  copyRecursive(distDir, mirrorDir);

  // Also copy dist to pocket-mc-website subfolder inside mirror
  const mirrorSubDir = path.join(mirrorDir, 'pocket-mc-website');
  copyRecursive(distDir, mirrorSubDir);

  // Clean old assets
  if (scriptMatch && cssMatch) {
    const activeJs = path.basename(scriptMatch[1]);
    const activeCss = path.basename(cssMatch[1]);

    const cleanAssets = (dir) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      files.forEach(f => {
        if ((f.endsWith('.js') && f !== activeJs) || (f.endsWith('.css') && f !== activeCss)) {
          fs.unlinkSync(path.join(dir, f));
        }
      });
    };

    cleanAssets(path.join(mirrorDir, 'assets'));
    cleanAssets(path.join(mirrorSubDir, 'assets'));
  }

  console.log('Successfully synced dist build output to pocketmc.github.io mirror.');
}
