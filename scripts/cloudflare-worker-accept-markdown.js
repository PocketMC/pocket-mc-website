/**
 * Cloudflare Worker / Edge Middleware for "Accept: text/markdown" Content Negotiation
 * (Compliant with acceptmarkdown.com and Is-Agentic / Ora Audit Standards)
 *
 * How to use:
 * If routing your domain or reverse proxy in front of https://pocketmc.github.io:
 * 1. Add this worker in Cloudflare Workers / Fastly / Vercel Edge.
 * 2. When a client sends "Accept: text/markdown", it fetches the clean markdown version
 *    (e.g. /llms-full.txt or /llms.txt) and serves it with Content-Type: text/markdown and Vary: Accept.
 * 3. When a client requests a nonexistent route with "Accept: text/markdown", it returns
 *    HTTP 404 with Content-Type: text/markdown and a structured markdown error body.
 * 4. Regular browser requests with Accept: text/html continue to receive standard HTML.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';
    const wantsMarkdown = accept.includes('text/markdown');

    // 1. Fetch origin response from GitHub Pages
    const originResponse = await fetch(request);

    // 2. Handle 404 with Agent-Friendly Markdown if requested
    if (originResponse.status === 404) {
      if (wantsMarkdown) {
        const markdown404 = `# 404 Not Found

The requested path "${url.pathname}" does not exist on PocketMC.

Please refer to our machine-readable agent guides:
- Documentation: https://pocketmc.github.io/docs/introduction/
- Developer Portal: https://pocketmc.github.io/developers
- LLM Index: https://pocketmc.github.io/llms.txt
- Full LLM Corpus: https://pocketmc.github.io/llms-full.txt
- Sitemap: https://pocketmc.github.io/sitemap.xml
`;
        return new Response(markdown404, {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      return originResponse;
    }

    // 3. Handle Homepage Content Negotiation
    if (url.pathname === '/' || url.pathname === '') {
      if (wantsMarkdown) {
        // Fetch pre-rendered machine-readable markdown
        const mdUrl = new URL('/llms-full.txt', url.origin);
        const mdResponse = await fetch(mdUrl);
        const markdownBody = await mdResponse.text();

        return new Response(markdownBody, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Standard HTML browser response: ensure Vary: Accept header
      const newHeaders = new Headers(originResponse.headers);
      newHeaders.set('Vary', 'Accept, Accept-Encoding');
      return new Response(originResponse.body, {
        status: originResponse.status,
        headers: newHeaders
      });
    }

    return originResponse;
  }
};
