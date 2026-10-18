import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.resolve(root, process.env.DIST_DIR || "dist");
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
});
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const base = server.config.base;
const origin = (
  process.env.SITE_ORIGIN || "https://pocketmc.github.io"
).replace(/\/$/, "");
const absolute = (route) => `${origin}${base}${route.replace(/^\//, "")}`;

try {
  const { render, routes, faqGroups } = await server.ssrLoadModule(
    "/src/entry-server.tsx",
  );
  const notFound = {
    path: "/404/",
    title: "Page not found · PocketMC",
    description:
      "Find your way back to the PocketMC website, documentation, and downloads.",
  };
  for (const route of [...routes, notFound]) {
    const canonical = absolute(route.path);
    let html = template.replace("<!--app-html-->", render(route.path));
    html = html
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escape(route.title)}</title>`,
      )
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*/,
        `$1${escape(route.description)}`,
      )
      .replace(/(<link\s+rel="canonical"\s+href=")[^"]*/, `$1${canonical}`)
      .replace(
        /(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*/g,
        `$1${escape(route.title)}`,
      )
      .replace(
        /(<meta\s+(?:property="og:description"|name="twitter:description")\s+content=")[^"]*/g,
        `$1${escape(route.description)}`,
      )
      .replace(/(<meta\s+property="og:url"\s+content=")[^"]*/, `$1${canonical}`)
      .replace(
        /(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*/g,
        `$1${absolute("/screenshots/screenshot-dashboard.webp")}`,
      );
    const graph = [
      {
        "@type": "WebPage",
        name: route.title,
        description: route.description,
        url: canonical,
        isPartOf: { "@type": "WebSite", name: "PocketMC", url: absolute("/") },
      },
    ];
    if (route.path === "/")
      graph.push(
        {
          "@type": "SoftwareApplication",
          name: "PocketMC",
          applicationCategory: "GameApplication",
          operatingSystem: "Windows, Linux, macOS",
          url: canonical,
          license: "https://opensource.org/license/mit",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@type": "Organization",
          name: "PocketMC",
          url: canonical,
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "contactdslabs@gmail.com",
              contactType: "support",
            },
          ],
        },
      );
    if (route.path === "/faq/")
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqGroups.flatMap((group) =>
          group.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        ),
      });
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>${route === notFound ? '<meta name="robots" content="noindex" />' : ""}</head>`,
    );
    const output =
      route === notFound
        ? path.join(dist, "404.html")
        : path.join(dist, route.path, "index.html");
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${absolute(route.path)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
  const robots = await fs.readFile(
    path.join(root, "public/robots.txt"),
    "utf8",
  );
  await fs.writeFile(
    path.join(dist, "robots.txt"),
    robots.replace(/^Sitemap:.*$/m, `Sitemap: ${absolute("/sitemap.xml")}`),
  );
  await fs.writeFile(
    path.join(dist, "routes.json"),
    JSON.stringify(routes, null, 2),
  );
  console.log(
    `Prerendered ${routes.length} pages and 404.html, with page-specific metadata and sitemap. Output: ${dist}`,
  );
} finally {
  await server.close();
}
