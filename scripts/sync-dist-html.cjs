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

// Two-way synchronization and pruning to mirror directory
if (fs.existsSync(mirrorDir)) {
  const syncDirectory = (src, dest, ignoreTopLevel = []) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    // 1. Copy or update from src to dest
    const srcEntries = fs.readdirSync(src, { withFileTypes: true });
    const srcNames = new Set(srcEntries.map(e => e.name));

    for (const entry of srcEntries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        syncDirectory(srcPath, destPath);
      } else {
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(srcPath);
          const destStat = fs.statSync(destPath);
          if (srcStat.size === destStat.size && Math.abs(srcStat.mtimeMs - destStat.mtimeMs) < 1000) {
            shouldCopy = false;
          }
        }
        if (shouldCopy) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }

    // 2. Prune orphaned files/directories in dest that are not in src
    const destEntries = fs.readdirSync(dest, { withFileTypes: true });
    for (const entry of destEntries) {
      if (ignoreTopLevel.includes(entry.name)) {
        continue;
      }
      if (!srcNames.has(entry.name)) {
        const targetPath = path.join(dest, entry.name);
        fs.rmSync(targetPath, { recursive: true, force: true });
        console.log(`Pruned obsolete mirror entry: ${path.relative(mirrorDir, targetPath)}`);
      }
    }
  };

  // Sync dist to root of mirror (preserving git configuration & CNAME)
  syncDirectory(distDir, mirrorDir, ['.git', '.gitignore', 'CNAME']);

  console.log('Successfully synchronized and pruned pocketmc.github.io mirror.');
}
