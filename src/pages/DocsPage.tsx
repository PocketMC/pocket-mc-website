import { motion } from "motion/react";

interface DocsPageProps {
  navigate?: (path: string) => void;
}

export default function DocsPage(_props: DocsPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-4">
          PocketMC Developer Portal
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed">
          Architecture specifications, local REST APIs, authentication protocols, Model Context Protocol (MCP) toolkits, and webhook event streaming for the PocketMC server management ecosystem.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 p-4 sm:p-5 rounded-xl border border-divider bg-base-card font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">REST API</span>
            <span className="text-xs sm:text-sm font-bold text-main">Local Loopback + Proxy</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Agentic AI</span>
            <span className="text-xs sm:text-sm font-bold text-main">MCP Protocol</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Auth Protocol</span>
            <span className="text-xs sm:text-sm font-bold text-main">DPAPI + HMAC-SHA256</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-main-muted">Event Bus</span>
            <span className="text-xs sm:text-sm font-bold text-main">High-Frequency Webhooks</span>
          </div>
        </div>
      </motion.div>

      {/* 1. Core Guides & Protocols */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            1. Core Guides &amp; Protocol Documentation
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Interactive developer reference guides for controlling instances, security, and agentic integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a
            href="/pocket-mc-website/docs/api/"
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group"
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
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Explore the authenticated local REST endpoints exposed by the PocketMC desktop service. Programmatically trigger server power actions, monitor CPU/RAM metrics, and send console commands.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">GET /api/v1/servers</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">POST /api/v1/servers/&#123;id&#125;/power</span>
            </div>
          </a>

          <a
            href="/pocket-mc-website/docs/auth/"
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group"
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
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Deep dive into the platform security architecture: Windows DPAPI token encryption, LAN QR pairing, HMAC session handshakes, and OAuth 2.0 PKCE token management for zero-trust operation.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">Windows DPAPI</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">HMAC-SHA256</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">LAN QR Pairing</span>
            </div>
          </a>

          <a
            href="/pocket-mc-website/docs/mcp/"
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group"
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
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Connect Claude, Cursor, ChatGPT, and custom LLM agent frameworks directly to your PocketMC instances using official MCP tool declarations over streamable HTTP and stdio transports.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">stdio Transport</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">7 Core Tools</span>
            </div>
          </a>

          <a
            href="/pocket-mc-website/docs/webhooks/"
            className="flex flex-col justify-between p-6 rounded-xl border border-divider bg-base-card hover:border-main transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-main tracking-tight group-hover:text-main">
                  Webhooks &amp; Event Bus
                </h3>
                <svg className="w-4 h-4 text-main-muted group-hover:text-main transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
                Subscribe Discord bots, monitoring tools, and internal automation scripts to real-time events: server crashes, player joins, whitelist updates, and automated cloud backup completions.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-main-muted">
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">server.state_changed</span>
              <span className="px-2 py-0.5 rounded bg-base-muted border border-divider text-main">backup.completed</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Machine-Readable Contracts */}
      <div className="mb-14">
        <div className="border-b border-divider pb-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-main">
            2. Machine-Readable Contracts &amp; Schemas
          </h2>
          <p className="text-xs sm:text-sm text-main-muted mt-1">
            Raw contract definitions for code generation, SDK compilation, and AI agent ingestion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/pocket-mc-website/docs/openapi.json"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">openapi.json</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Complete OpenAPI JSON schema for client SDK generation.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">application/json</span>
          </a>

          <a
            href="/pocket-mc-website/docs/openapi.yaml"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">openapi.yaml</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Clean, human-readable YAML representation of all API routes.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">application/yaml</span>
          </a>

          <a
            href="/pocket-mc-website/.well-known/mcp.json"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">mcp.json</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Model Context Protocol manifest declaring 7 server tools.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">protocol: 2024-11-05</span>
          </a>

          <a
            href="/pocket-mc-website/llms.txt"
            target="_blank"
            className="p-5 rounded-xl border border-divider bg-base-card hover:border-main transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-main tracking-tight mb-1">llms.txt</h3>
              <p className="text-xs text-main-muted leading-relaxed mb-3">
                Curated Markdown documentation designed for AI coding agents.
              </p>
            </div>
            <span className="font-mono text-[11px] text-main font-semibold">text/markdown</span>
          </a>
        </div>
      </div>

      {/* Developer Inquiries */}
      <div className="p-6 rounded-xl border border-divider bg-base-card border-l-4 border-l-main">
        <h3 className="text-base font-bold text-main tracking-tight mb-1">
          Developer Questions &amp; Integration Support
        </h3>
        <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
          Need technical guidance or want to integrate PocketMC with your tool? Join our active developer community on <a href="https://discord.gg/mWdMr8Mc2m" target="_blank" rel="noreferrer" className="text-main font-bold hover:underline">Discord</a> or email our engineering maintainers directly at <a href="mailto:contactdslabs@gmail.com" className="text-main font-mono font-bold hover:underline">contactdslabs@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
