const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const mirrorDir = path.resolve(rootDir, '..', 'pocketmc.github.io');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

// Inject Agent-Friendly Pre-rendered Body into dist/404.html
const dist404 = path.join(distDir, '404.html');
if (fs.existsSync(dist404)) {
  let content = fs.readFileSync(dist404, 'utf8');
  if (!content.includes('agent-404-fallback')) {
    const fallbackBody = `\t\t<main id="agent-404-fallback" style="padding: 40px; font-family: system-ui, sans-serif; color: #f0f0f0; background: #121212; max-width: 650px; margin: 40px auto; border: 1px solid #27272a; border-radius: 8px;">
\t\t\t<h1 style="color: #ef4444; margin-top: 0;">404 Not Found</h1>
\t\t\t<p><strong>Error:</strong> The requested resource does not exist on PocketMC. Please verify the URL path.</p>
\t\t\t<p>If you are an automated AI agent or developer crawler, use the following machine-readable links:</p>
\t\t\t<ul>
\t\t\t\t<li><strong>Documentation:</strong> <a href="https://pocketmc.github.io/docs/introduction/" style="color: #4ade80;">https://pocketmc.github.io/docs/introduction/</a></li>
\t\t\t\t<li><strong>AI Agent Manifest:</strong> <a href="https://pocketmc.github.io/llms.txt" style="color: #4ade80;">https://pocketmc.github.io/llms.txt</a></li>
\t\t\t\t<li><strong>Full LLM Corpus:</strong> <a href="https://pocketmc.github.io/llms-full.txt" style="color: #4ade80;">https://pocketmc.github.io/llms-full.txt</a></li>
\t\t\t\t<li><strong>XML Sitemap:</strong> <a href="https://pocketmc.github.io/sitemap.xml" style="color: #4ade80;">https://pocketmc.github.io/sitemap.xml</a></li>
\t\t\t\t<li><strong>Homepage:</strong> <a href="https://pocketmc.github.io/" style="color: #4ade80;">https://pocketmc.github.io/</a></li>
\t\t\t</ul>
\t\t\t<pre style="background: #18181b; padding: 16px; border-radius: 6px; overflow-x: auto; color: #a1a1aa; font-size: 13px; line-height: 1.5;"># 404 - Resource Not Found
The requested path does not exist on PocketMC.
Please refer to our machine-readable agent guides:
- Documentation: https://pocketmc.github.io/docs/introduction/
- LLM Index: https://pocketmc.github.io/llms.txt
- Sitemap: https://pocketmc.github.io/sitemap.xml</pre>
\t\t</main>
\t</body>`;
    content = content.replace('\t</body>', fallbackBody);
    fs.writeFileSync(dist404, content, 'utf8');
    console.log('Injected agent-friendly 404 fallback body into dist/404.html');
  }
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

  // Sync dist to root of mirror (preserving git configuration, workflows & CNAME)
  syncDirectory(distDir, mirrorDir, ['.git', '.github', '.gitignore', 'CNAME']);

  console.log('Successfully synchronized and pruned pocketmc.github.io mirror.');
}
