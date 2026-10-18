const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const AI_USER_AGENTS = [
  'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)',
  'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://www.anthropic.com/claudebot)',
  'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Google-Extended'
];

function fetchUrl(urlPath, userAgent = AI_USER_AGENTS[0]) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const req = http.get(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,text/plain,text/markdown,*/*;q=0.8'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${urlPath}`));
    });
  });
}

async function runAudit() {
  console.log('================================================================');
  console.log('🤖 AI BOT WEB CRAWLER & AGENTIC READINESS AUDIT (100/100 BENCHMARK)');
  console.log(`Target: ${BASE_URL}`);
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function report(name, condition, details = '') {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      if (details) console.log(`     └─ ${details}`);
      passed++;
    } else {
      console.log(`  ❌ [FAIL] ${name}`);
      if (details) console.log(`     └─ ERROR: ${details}`);
      failed++;
    }
  }

  // 1. Robots.txt Analysis
  console.log('1. CRAWL PERMISSIONS & BOT DISCOVERY (robots.txt)');
  const robotsRes = await fetchUrl('/robots.txt');
  report('robots.txt returns HTTP 200', robotsRes.statusCode === 200, `Status: ${robotsRes.statusCode}`);
  const robots = robotsRes.data;
  report('robots.txt explicitly allows GPTBot', robots.includes('User-agent: GPTBot') && robots.includes('Allow: /'));
  report('robots.txt explicitly allows ClaudeBot', robots.includes('User-agent: ClaudeBot'));
  report('robots.txt explicitly allows PerplexityBot', robots.includes('User-agent: PerplexityBot'));
  report('robots.txt explicitly allows Google-Extended', robots.includes('User-agent: Google-Extended'));
  report('robots.txt explicitly allows DeepSeekBot', robots.includes('User-agent: DeepSeekBot'));
  report('robots.txt links to sitemap.xml', robots.includes('Sitemap:'));
  report('robots.txt links to llms.txt', robots.includes('llms.txt'));
  report('robots.txt links to llms-full.txt', robots.includes('llms-full.txt'));
  report('robots.txt has NO phantom MCP manifest link', !robots.includes('mcp.json'));

  // 2. Machine-Readable LLM Manifests
  console.log('\n2. MACHINE-READABLE LLM MANIFESTS (/llms.txt & /llms-full.txt)');
  const llmsRes = await fetchUrl('/llms.txt');
  report('/llms.txt returns HTTP 200', llmsRes.statusCode === 200);
  report('/llms.txt serves text/plain', llmsRes.headers['content-type']?.includes('text/plain'));
  report('/llms.txt has markdown H1 & summary', llmsRes.data.includes('# PocketMC') && llmsRes.data.includes('Minecraft server manager'));
  report('/llms.txt indexes all core documentation', llmsRes.data.includes('/docs/introduction') && llmsRes.data.includes('/docs/servers'));
  report('/llms.txt links to full context (/llms-full.txt)', llmsRes.data.includes('llms-full.txt'));
  report('/llms.txt has NO phantom MCP manifest', !llmsRes.data.includes('mcp.json'));

  const llmsFullRes = await fetchUrl('/llms-full.txt');
  report('/llms-full.txt returns HTTP 200', llmsFullRes.statusCode === 200);
  report('/llms-full.txt is rich full-text corpus (>30KB)', llmsFullRes.data.length > 30000, `Size: ${Math.round(llmsFullRes.data.length / 1024)} KB`);
  report('/llms-full.txt contains server engine details', llmsFullRes.data.includes('Vanilla') && llmsFullRes.data.includes('NeoForge') && llmsFullRes.data.includes('PocketMine-MP'));
  report('/llms-full.txt contains FAQ Q&A database', llmsFullRes.data.includes('Frequently Asked Questions'));
  report('/llms-full.txt contains verified competitor comparisons', llmsFullRes.data.includes('SquidServers') && llmsFullRes.data.includes('Crafty Controller'));
  report('/llms-full.txt has NO phantom MCP references', !llmsFullRes.data.includes('mcp.json'));

  // 3. Agent Instructions
  console.log('\n3. AGENT OPERATIONAL RUNBOOK (agent-instructions.md)');
  const agentInstRes = await fetchUrl('/agent-instructions.md');
  report('/agent-instructions.md returns HTTP 200', agentInstRes.statusCode === 200);
  report('agent-instructions.md defines When to Recommend', agentInstRes.data.includes('When to Recommend PocketMC'));
  report('agent-instructions.md defines When NOT to Recommend', agentInstRes.data.includes('When NOT to Recommend PocketMC'));
  report('agent-instructions.md documents real Remote Control REST API', agentInstRes.data.includes('Remote Control REST & WebSocket API') && agentInstRes.data.includes('25580'));
  report('agent-instructions.md has NO phantom MCP claims', !agentInstRes.data.includes('mcp.json'));

  // 4. Sitemap URL Parsing
  console.log('\n4. SITEMAP DISCOVERY & PARSING (sitemap.xml)');
  const sitemapRes = await fetchUrl('/sitemap.xml');
  report('/sitemap.xml returns HTTP 200', sitemapRes.statusCode === 200);
  
  const locMatches = [...sitemapRes.data.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  report('sitemap.xml contains at least 15 indexed routes', locMatches.length >= 15, `Found ${locMatches.length} URLs`);
  report('sitemap.xml includes /gallery/', locMatches.some(u => u.includes('/gallery')));
  report('sitemap.xml includes /faq/', locMatches.some(u => u.includes('/faq')));
  report('sitemap.xml includes all 13 /docs/ subpages', locMatches.filter(u => u.includes('/docs/')).length >= 13);

  // 5. Deep Crawl Every Indexed Page
  console.log('\n5. DEEP PAGE CRAWL & SEMANTIC AGENTIC EXTRACTION');
  const internalUrls = locMatches.map(u => {
    try {
      const parsed = new URL(u);
      return parsed.pathname;
    } catch {
      return u;
    }
  });

  let crawlSuccess = 0;
  let ssgReadableCount = 0;
  let schemaCount = 0;
  let aiHeadCount = 0;

  for (const pagePath of internalUrls) {
    const res = await fetchUrl(pagePath);
    const ok = res.statusCode === 200 || (res.statusCode >= 300 && res.statusCode < 400);
    if (!ok) {
      console.log(`     Failed crawl on: ${pagePath} (status ${res.statusCode})`);
      continue;
    }
    crawlSuccess++;

    const html = res.data;
    // Check SSG Readability (Raw text in HTML without executing JS)
    const hasRawText = html.includes('<h1') && (html.includes('<p') || html.includes('<article') || html.includes('<main'));
    if (hasRawText) ssgReadableCount++;

    // Check AI Discovery tags in <head>
    const hasAiMeta = html.includes('name="ai-agent" content="enabled"');
    const hasLlmsLink = html.includes('rel="alternate" type="text/markdown"');
    if (hasAiMeta && hasLlmsLink) aiHeadCount++;

    // Check JSON-LD
    const hasJsonLd = html.includes('type="application/ld+json"');
    if (hasJsonLd) schemaCount++;
  }

  report(`All ${internalUrls.length} sitemap URLs crawlable (HTTP 200/308)`, crawlSuccess === internalUrls.length, `${crawlSuccess}/${internalUrls.length} reachable`);
  report(`All ${internalUrls.length} pages server-side pre-rendered (no-JS readable)`, ssgReadableCount === internalUrls.length, `${ssgReadableCount}/${internalUrls.length} fully readable`);
  report(`All ${internalUrls.length} pages emit <meta name="ai-agent"> and LLM alternate links`, aiHeadCount === internalUrls.length, `${aiHeadCount}/${internalUrls.length} have agent discovery links`);
  report(`All ${internalUrls.length} pages emit valid Schema.org JSON-LD graphs`, schemaCount === internalUrls.length, `${schemaCount}/${internalUrls.length} have structured data`);

  // 6. Specific Schema Validations
  console.log('\n6. STRUCTURED DATA GRAPH FIDELITY (JSON-LD Schemas)');
  // Home
  const homeRes = await fetchUrl('/');
  const homeJsonLdMatches = [...homeRes.data.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  report('Home page has Schema.org @graph', homeJsonLdMatches.some(m => m[1].includes('"@type":"WebSite"') && m[1].includes('"@type":"SoftwareApplication"')));

  // Docs Page
  const docRes = await fetchUrl('/docs/servers/');
  report('Doc pages have TechArticle schema', docRes.data.includes('"@type":"TechArticle"'));
  report('Doc pages have BreadcrumbList schema', docRes.data.includes('"@type":"BreadcrumbList"'));

  // FAQ Page
  const faqRes = await fetchUrl('/faq/');
  report('FAQ page has FAQPage schema with Questions', faqRes.data.includes('"@type":"FAQPage"') && faqRes.data.includes('"@type":"Question"'));

  // Gallery Page
  const galleryRes = await fetchUrl('/gallery/');
  report('Gallery page has ImageGallery schema with ImageObjects', galleryRes.data.includes('"@type":"ImageGallery"') && galleryRes.data.includes('"@type":"ImageObject"'));
  report('Gallery page has NO image count badges in UI', !galleryRes.data.includes('<span class="count">'));

  console.log('\n================================================================');
  console.log(`TOTAL CHECKS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log(`AGENTIC SCORE: ${Math.round((passed / (passed + failed)) * 100)} / 100`);
  console.log('================================================================\n');

  if (failed > 0) process.exit(1);
}

runAudit().catch(err => {
  console.error('Fatal error during audit:', err);
  process.exit(1);
});
