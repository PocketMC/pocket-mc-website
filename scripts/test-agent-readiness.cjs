const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passes++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failures++;
  }
}

console.log('--- PocketMC Agent Readiness Verification Suite ---\n');

// 1 & 3: Agent crawler reachability & Bot Allowlisting
console.log('1. Agent Crawler Reachability & Bot Detection Allowrules:');
const robotsTxtPath = path.join(rootDir, 'public', 'robots.txt');
assert(fs.existsSync(robotsTxtPath), 'public/robots.txt exists');
const robotsContent = fs.readFileSync(robotsTxtPath, 'utf8');
const expectedBots = ['ChatGPT-User', 'ClaudeBot', 'Google-Extended', 'ora-agent', 'DeepSeekBot', 'PerplexityBot', 'GPTBot', 'OAI-SearchBot'];
expectedBots.forEach(bot => {
  assert(robotsContent.includes(`User-agent: ${bot}`), `robots.txt explicitly allows User-agent: ${bot}`);
});
assert(robotsContent.includes('Sitemap: https://pocketmc.github.io/pocket-mc-website/sitemap.xml'), 'robots.txt links to sitemap.xml');

// 2: Content without JavaScript
console.log('\n2. Content without JavaScript in index.html:');
const indexPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexPath), 'index.html exists');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
assert(indexHtml.includes('<h1') && indexHtml.includes('PocketMC'), 'index.html contains <h1> with PocketMC brand');
const rootMatch = indexHtml.match(/<div id="root">([\s\S]*?)<\/div>/);
const rootContent = rootMatch ? rootMatch[1].trim() : '';
assert(rootContent.length >= 500, `Raw HTML inside root container contains ${rootContent.length} chars (>= 500 required)`);

// 4: Agent-friendly 404s
console.log('\n4. Agent-Friendly 404 with Markdown Recovery:');
const notFoundPath = path.join(rootDir, 'public', '404.html');
assert(fs.existsSync(notFoundPath), 'public/404.html exists');
const notFoundContent = fs.readFileSync(notFoundPath, 'utf8');
assert(notFoundContent.includes('# 404') || notFoundContent.includes('404 Recovery Index'), '404.html includes machine-readable recovery index');
assert(notFoundContent.includes('llms.txt') && notFoundContent.includes('sitemap.xml'), '404.html points agents to llms.txt and sitemap.xml');

// 5 & 7: Markdown Content Negotiation & Agent Instructions
console.log('\n5 & 7. Markdown Content Negotiation & Agent Instructions:');
const llmsPath = path.join(rootDir, 'public', 'llms.txt');
const llmsFullPath = path.join(rootDir, 'public', 'llms-full.txt');
const indexMdPath = path.join(rootDir, 'public', 'index.md');
const agentInstPath = path.join(rootDir, 'public', 'agent-instructions.md');
const headersPath = path.join(rootDir, 'public', '_headers');

assert(fs.existsSync(llmsPath), 'public/llms.txt exists');
assert(fs.existsSync(llmsFullPath), 'public/llms-full.txt exists');
assert(fs.existsSync(indexMdPath), 'public/index.md exists');
assert(fs.existsSync(agentInstPath), 'public/agent-instructions.md exists');
assert(fs.existsSync(headersPath), 'public/_headers exists');

const llmsContent = fs.readFileSync(llmsPath, 'utf8');
assert(llmsContent.includes('When to Use PocketMC'), 'llms.txt includes "When to Use PocketMC" guidance');
assert(llmsContent.includes('When NOT to Use PocketMC'), 'llms.txt includes "When NOT to Use PocketMC" alternatives');

const headersContent = fs.readFileSync(headersPath, 'utf8');
assert(headersContent.includes('Vary: Accept, Accept-Encoding'), '_headers includes Vary: Accept, Accept-Encoding');

// 6, 10, 11, 12: Brand discoverability, Metadata & JSON-LD Completeness
console.log('\n6, 10, 11, 12. Metadata Completeness, Brand Discovery & JSON-LD Schemas:');
assert(indexHtml.includes('<html lang="en">'), 'Metadata signal: <html lang="en"> is present');
assert(indexHtml.includes('rel="canonical"'), 'Metadata signal: <link rel="canonical"> is present');
assert(indexHtml.includes('property="og:image"'), 'Metadata signal: <meta property="og:image"> is present');
assert(indexHtml.includes('property="og:type"'), 'Metadata signal: <meta property="og:type"> is present');
assert(indexHtml.includes('name="twitter:card"'), 'Twitter card metadata is present');

// JSON-LD validation
const jsonLdMatches = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(jsonLdMatches.length > 0, 'index.html contains JSON-LD structured data script tags');
let foundSoftwareApp = false;
let foundOrgWithContactAndAddress = false;
let foundFaq = false;

jsonLdMatches.forEach((m) => {
  try {
    const parsed = JSON.parse(m[1]);
    const graph = parsed['@graph'] || [parsed];
    graph.forEach(entity => {
      if (entity['@type'] === 'SoftwareApplication') {
        foundSoftwareApp = true;
      }
      if (entity['@type'] === 'Organization') {
        const hasContact = Array.isArray(entity.contactPoint) && entity.contactPoint.length > 0 && entity.contactPoint[0].email;
        const hasAddress = entity.address && entity.address['@type'] === 'PostalAddress';
        if (hasContact && hasAddress) {
          foundOrgWithContactAndAddress = true;
        }
      }
      if (entity['@type'] === 'FAQPage') {
        foundFaq = true;
      }
    });
  } catch (e) {
    console.error('  [FAIL] Error parsing JSON-LD in index.html:', e.message);
    failures++;
  }
});

assert(foundSoftwareApp, 'JSON-LD includes SoftwareApplication with full metadata');
assert(foundOrgWithContactAndAddress, 'JSON-LD includes Organization with contactPoint (email/phone) and PostalAddress');
assert(foundFaq, 'JSON-LD includes FAQPage schema');

// 8: Sitemap
console.log('\n8. XML Sitemap:');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('<loc>https://pocketmc.github.io/pocket-mc-website/</loc>'), 'sitemap.xml contains canonical root URL');
assert(sitemapContent.includes('<lastmod>'), 'sitemap.xml contains <lastmod> timestamps');
assert(sitemapContent.includes('/about/') && sitemapContent.includes('/contact/') && sitemapContent.includes('/privacy/'), 'sitemap.xml lists trust anchor pages');

// 9: Trust anchor pages
console.log('\n9. Trust Anchor Pages (About, Contact, Privacy, Terms):');
const trustPages = [
  { file: path.join(rootDir, 'public', 'about', 'index.html'), name: '/about/' },
  { file: path.join(rootDir, 'public', 'contact', 'index.html'), name: '/contact/' },
  { file: path.join(rootDir, 'public', 'privacy', 'index.html'), name: '/privacy/' },
  { file: path.join(rootDir, 'public', 'terms', 'index.html'), name: '/terms/' },
];

trustPages.forEach(page => {
  assert(fs.existsSync(page.file), `${page.name} exists`);
  if (fs.existsSync(page.file)) {
    const content = fs.readFileSync(page.file, 'utf8');
    assert(content.length >= 500, `${page.name} contains ${content.length} chars (>= 500 required)`);
  }
});

// 13: MCP Server Manifest
console.log('\n13. Model Context Protocol (MCP) Manifest:');
const mcpPaths = [
  path.join(rootDir, 'public', '.well-known', 'mcp.json'),
  path.join(rootDir, 'public', '.well-known', 'mcp'),
  path.join(rootDir, 'public', 'mcp.json')
];
mcpPaths.forEach(p => {
  assert(fs.existsSync(p), `${path.relative(rootDir, p)} exists`);
});
const mcpJson = JSON.parse(fs.readFileSync(mcpPaths[0], 'utf8'));
assert(Array.isArray(mcpJson.tools) && mcpJson.tools.length >= 5, `MCP manifest defines ${mcpJson.tools?.length || 0} tools (>= 5 required)`);
assert(Array.isArray(mcpJson.transports) && mcpJson.transports.length >= 2, 'MCP manifest defines multiple transports (http-streamable, stdio)');

// 14: Developer Resources
console.log('\n14. Developer Resources Discoverability:');
const devPages = [
  path.join(rootDir, 'public', 'docs', 'index.html'),
  path.join(rootDir, 'public', 'docs', 'openapi.json'),
  path.join(rootDir, 'public', 'docs', 'openapi.yaml'),
  path.join(rootDir, 'public', 'docs', 'api', 'index.html'),
  path.join(rootDir, 'public', 'docs', 'auth', 'index.html'),
  path.join(rootDir, 'public', 'docs', 'mcp', 'index.html'),
  path.join(rootDir, 'public', 'docs', 'webhooks', 'index.html'),
];
devPages.forEach(dp => {
  assert(fs.existsSync(dp), `${path.relative(rootDir, dp)} exists`);
});

console.log(`\n========================================`);
console.log(`Summary: ${passes} passed, ${failures} failed.`);
console.log(`========================================\n`);

if (failures > 0) {
  process.exit(1);
} else {
  console.log('All agent readiness criteria successfully satisfied!');
  process.exit(0);
}
