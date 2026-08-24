const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const websiteScreenshotsDir = path.join(root, 'public/screenshots');
const windowsScreenshotsDir = path.resolve(root, '../pocket-mc-windows/docs/assets/screenshots');

const blockImages = [
  path.join(root, 'public/logo.png'),
];

async function convertToWebP(inputPath, outputDir = path.dirname(inputPath)) {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(outputDir, `${baseName}.webp`);

  try {
    const info = await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    const inSize = fs.statSync(inputPath).size;
    const saving = (((inSize - info.size) / inSize) * 100).toFixed(1);
    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${(inSize / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB, -${saving}%)`);
  } catch (e) {
    console.error(`✗ ${path.basename(inputPath)}: ${e.message}`);
  }
}

async function main() {
  if (!fs.existsSync(websiteScreenshotsDir)) {
    fs.mkdirSync(websiteScreenshotsDir, { recursive: true });
  }

  const tasks = [];

  // 1. Source screenshots from pocket-mc-windows if present
  if (fs.existsSync(windowsScreenshotsDir)) {
    console.log(`Reading source screenshots from ${windowsScreenshotsDir}...`);
    const winFiles = fs.readdirSync(windowsScreenshotsDir)
      .filter(f => f.endsWith('.png'))
      .map(f => ({
        src: path.join(windowsScreenshotsDir, f),
        outDir: websiteScreenshotsDir,
      }));
    tasks.push(...winFiles);
  }

  // 2. Local screenshot PNG files in public/screenshots if present
  const localScreenshotFiles = fs.readdirSync(websiteScreenshotsDir)
    .filter(f => f.endsWith('.png'))
    .map(f => ({
      src: path.join(websiteScreenshotsDir, f),
      outDir: websiteScreenshotsDir,
    }));
  tasks.push(...localScreenshotFiles);

  // 3. Block and brand images
  const existingBlockImages = blockImages
    .filter(f => fs.existsSync(f))
    .map(f => ({
      src: f,
      outDir: path.dirname(f),
    }));
  tasks.push(...existingBlockImages);

  console.log(`Converting ${tasks.length} images to WebP...`);
  await Promise.all(tasks.map(t => convertToWebP(t.src, t.outDir)));
  console.log('Conversion complete!');
}

main();

