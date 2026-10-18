const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function inspectRepo() {
  console.log('Inspecting PocketMC repository and GitHub API...');

  const repoDir = path.resolve(__dirname, '../../pocket-mc-windows');
  let localVersion = '1.9.10';
  let localLicense = 'MIT';
  let stars = 32;

  // 1. Inspect local pocket-mc-windows if present
  if (fs.existsSync(repoDir)) {
    // Read pocketmc.yml
    const yamlPath = path.join(repoDir, 'pocketmc.yml');
    if (fs.existsSync(yamlPath)) {
      const yamlContent = fs.readFileSync(yamlPath, 'utf8');
      const vMatch = yamlContent.match(/version:\s*([^\r\n#]+)/);
      if (vMatch) {
        localVersion = vMatch[1].trim();
        console.log('Found version in pocketmc.yml:', localVersion);
      }
    }

    // Read LICENSE
    const licensePath = path.join(repoDir, 'LICENSE');
    if (fs.existsSync(licensePath)) {
      const licContent = fs.readFileSync(licensePath, 'utf8');
      if (licContent.includes('MIT License') || licContent.includes('MIT')) {
        localLicense = 'MIT';
      }
      console.log('Found license in LICENSE:', localLicense);
    }

    // Inspect git tags
    try {
      const tags = execSync('git tag -l', { cwd: repoDir, encoding: 'utf8' }).trim().split(/\r?\n/);
      if (tags.length > 0) {
        const sorted = tags
          .filter(t => /^v?\d+\.\d+\.\d+/.test(t))
          .sort((a, b) => {
            const pa = a.replace(/^v/, '').split('.').map(Number);
            const pb = b.replace(/^v/, '').split('.').map(Number);
            for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
              const na = pa[i] || 0;
              const nb = pb[i] || 0;
              if (na !== nb) return nb - na;
            }
            return 0;
          });
        if (sorted[0]) {
          console.log('Latest git tag in repo:', sorted[0]);
          localVersion = sorted[0].replace(/^v/, '');
        }
      }
    } catch (e) {
      console.warn('Could not read git tags:', e.message);
    }
  }

  // 2. Fetch from GitHub API
  let apiStars = null;
  let apiVersion = null;
  let apiLicense = null;
  let repoDetails = {};

  try {
    const res = await fetch('https://api.github.com/repos/PocketMC/pocket-mc-windows', {
      headers: {
        'User-Agent': 'PocketMC-Website-Builder',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      apiStars = data.stargazers_count;
      apiLicense = data.license?.spdx_id || data.license?.name;
      repoDetails = {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        html_url: data.html_url,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        open_issues_count: data.open_issues_count,
        default_branch: data.default_branch,
        updated_at: data.updated_at,
        pushed_at: data.pushed_at
      };
      console.log('GitHub API repo fetch succeeded. Stars:', apiStars);
    } else {
      console.warn('GitHub API rate limit or error:', res.status, res.statusText);
    }
  } catch (e) {
    console.warn('GitHub API fetch failed:', e.message);
  }

  try {
    const relRes = await fetch('https://api.github.com/repos/PocketMC/pocket-mc-windows/releases/latest', {
      headers: {
        'User-Agent': 'PocketMC-Website-Builder',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (relRes.ok) {
      const relData = await relRes.json();
      apiVersion = relData.tag_name;
      console.log('GitHub API latest release fetch succeeded. Tag:', apiVersion);
    }
  } catch (e) {
    console.warn('GitHub API release fetch failed:', e.message);
  }

  // Preserve existing stars from previous repo-metadata.json if API is rate limited
  const metadataPath = path.resolve(__dirname, '../src/lib/data/repo-metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      if (typeof prev.stars === 'number' && prev.stars > 0) {
        stars = prev.stars;
      }
    } catch {}
  }

  const finalStars = apiStars ?? stars;
  const finalVersion = apiVersion ?? (localVersion.startsWith('v') ? localVersion : `v${localVersion}`);
  const finalLicense = apiLicense ?? localLicense;

  const metadata = {
    stars: finalStars,
    version: finalVersion,
    rawVersion: finalVersion.replace(/^v/, ''),
    license: finalLicense,
    repoUrl: 'https://github.com/PocketMC/pocket-mc-windows',
    releasesUrl: 'https://github.com/PocketMC/pocket-mc-windows/releases',
    downloadUrl: `https://github.com/PocketMC/pocket-mc-windows/releases/download/${finalVersion}/PocketMC-Setup.exe`,
    latestReleaseUrl: 'https://github.com/PocketMC/pocket-mc-windows/releases/latest',
    inspectedAt: new Date().toISOString(),
    ...repoDetails
  };

  console.log('Generated Repo Metadata:', metadata);

  // Write to src/lib/data/repo-metadata.json
  fs.mkdirSync(path.dirname(metadataPath), { recursive: true });
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

  // Also write to static/repo-metadata.json for client-side zero-rate-limit fallback
  const staticPath = path.resolve(__dirname, '../static/repo-metadata.json');
  fs.mkdirSync(path.dirname(staticPath), { recursive: true });
  fs.writeFileSync(staticPath, JSON.stringify(metadata, null, 2), 'utf8');

  console.log('Successfully written repo metadata to src/lib/data and static.');
}

inspectRepo().catch(err => {
  console.error('inspectRepo error:', err);
  process.exit(1);
});
