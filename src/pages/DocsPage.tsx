import { motion } from "motion/react";

interface DocsPageProps {
  navigate?: (path: string) => void;
}

export default function DocsPage({ navigate }: DocsPageProps) {
  const handleNav = (e: React.MouseEvent, path: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-4">
          Developer Portal
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          Technical specifications, local REST APIs, authentication protocols, network tunnels, and machine-readable contracts.
        </p>
      </motion.div>

      {/* 1. Core Guides */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Architecture &amp; Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a
            href="/docs/api/"
            onClick={(e) => handleNav(e, "/docs/api/")}
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-main tracking-tight group-hover:text-main">
                  REST API Reference
                </h3>
                <svg className="w-4 h-4 text-main-muted group-hover:text-main transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-sm text-main-muted leading-relaxed mb-4">
                Local loopback REST endpoints on port 25580 for controlling instances, sending console commands, and file management.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">GET /api/instances</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">POST /api/instances/&#123;id&#125;/start</span>
            </div>
          </a>

          <a
            href="/docs/auth/"
            onClick={(e) => handleNav(e, "/docs/auth/")}
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-main tracking-tight group-hover:text-main">
                  Authentication &amp; Security
                </h3>
                <svg className="w-4 h-4 text-main-muted group-hover:text-main transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-sm text-main-muted leading-relaxed mb-4">
                Windows DPAPI key protection, bcrypt session cookie authentication, and Google Drive PKCE cloud authorization.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">DPAPI Key Vault</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">Cookie Auth</span>
            </div>
          </a>

          <a
            href="/docs/mcp/"
            onClick={(e) => handleNav(e, "/docs/mcp/")}
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-main tracking-tight group-hover:text-main">
                  Model Context Protocol (MCP)
                </h3>
                <svg className="w-4 h-4 text-main-muted group-hover:text-main transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-sm text-main-muted leading-relaxed mb-4">
                Interoperability status and guide for connecting AI coding agents to PocketMC local REST API endpoints.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">REST API Bridge</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">Local Loopback</span>
            </div>
          </a>

          <a
            href="/docs/webhooks/"
            onClick={(e) => handleNav(e, "/docs/webhooks/")}
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-main tracking-tight group-hover:text-main">
                  Event Streams &amp; WebSockets
                </h3>
                <svg className="w-4 h-4 text-main-muted group-hover:text-main transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-sm text-main-muted leading-relaxed mb-4">
                Real-time WebSocket streaming on /ws/instances/&#123;id&#125;/console and event notification patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">WebSocket Console</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">Status Polling</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Schemas & Specs */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            Contracts &amp; Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/docs/openapi.json"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">openapi.json</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Full OpenAPI 3.1 JSON contract for SDK compilation.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">application/json</span>
          </a>

          <a
            href="/docs/openapi.yaml"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">openapi.yaml</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Human-readable YAML route definitions.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">application/yaml</span>
          </a>

          <a
            href="/.well-known/mcp.json"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">mcp.json</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Model Context Protocol manifest with tool signatures.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">protocol: 2024-11-05</span>
          </a>

          <a
            href="/llms.txt"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">llms.txt</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Curated documentation for AI coding agents.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">text/markdown</span>
          </a>
        </div>
      </div>

      {/* Developer Support */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Integration Support
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          Need technical guidance? Ask in our <a href="https://discord.gg/mWdMr8Mc2m" target="_blank" rel="noreferrer" className="text-main font-bold hover:underline">Discord community</a> or contact maintainers at <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
