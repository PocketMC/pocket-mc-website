import { motion } from "motion/react";

interface McpDocsPageProps {
  navigate?: (path: string) => void;
}

export default function McpDocsPage({ navigate }: McpDocsPageProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigate) {
      navigate("/docs/");
    } else {
      window.location.href = "/pocket-mc-website/docs/";
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6">
        <a
          href="/pocket-mc-website/docs/"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-main-muted hover:text-main transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Developer Portal
        </a>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-main leading-tight mb-3">
          Model Context Protocol (MCP) &amp; AI Integration
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          Connect AI coding agents (Claude, Cursor, ChatGPT, and custom LLM tools) directly to your local PocketMC daemon via loopback REST API endpoints.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {/* Architecture Note */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            1. Direct Local REST Endpoint Bridge
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            PocketMC operates a local Kestrel web server on port <code className="font-mono text-xs">25580</code>. AI tools and MCP wrappers issue HTTP requests to local endpoints:
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`{
  "mcpServers": {
    "pocketmc": {
      "command": "node",
      "args": ["mcp-bridge.js"],
      "env": {
        "POCKETMC_API_URL": "http://localhost:25580"
      }
    }
  }
}`}
          </pre>
        </div>

        {/* Machine Readable Specs */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            2. Machine-Readable Contracts
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            AI agents consume standard OpenAPI and metadata manifests to infer available server tools:
          </p>
          <div className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main space-y-1">
            <div><span className="text-main-muted">Daemon URL:</span> http://localhost:25580</div>
            <div><span className="text-main-muted">OpenAPI Spec:</span> https://pocketmc.github.io/pocket-mc-website/docs/openapi.json</div>
            <div><span className="text-main-muted">MCP Manifest:</span> https://pocketmc.github.io/pocket-mc-website/.well-known/mcp.json</div>
          </div>
        </div>

        {/* Available Capabilities */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-4">
            3. Supported AI Agent Tool Actions
          </h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">list_instances (GET /api/instances)</span>
              <span className="text-main-muted">Returns all configured server instances with engine types and status.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">start_instance (POST /api/instances/&#123;id&#125;/start)</span>
              <span className="text-main-muted">Launches server process with isolated Adoptium Java runtime.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">stop_instance (POST /api/instances/&#123;id&#125;/stop)</span>
              <span className="text-main-muted">Initiates world save and graceful process termination.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">send_command (POST /api/instances/&#123;id&#125;/console/command)</span>
              <span className="text-main-muted">Executes in-game RCON or console commands programmatically.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">create_backup (POST /api/instances/&#123;id&#125;/backups)</span>
              <span className="text-main-muted">Creates local ZIP world snapshots with SHA-256 integrity verification.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
