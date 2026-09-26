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
          Model Context Protocol (MCP)
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          Connect AI agents (Claude Desktop, Cursor, ChatGPT, and custom LLM workflows) to manage local Minecraft servers programmatically.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {/* Claude / Cursor Config */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            1. Claude Desktop &amp; Cursor Setup
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Add the PocketMC MCP server configuration to your <code className="font-mono text-xs">claude_desktop_config.json</code> or Cursor settings:
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`{
  "mcpServers": {
    "pocketmc": {
      "command": "pocketmc-cli",
      "args": ["mcp"],
      "env": {
        "POCKETMC_API_PORT": "25585"
      }
    }
  }
}`}
          </pre>
        </div>

        {/* Remote Agent Transport */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            2. Streamable HTTP Transport
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            For headless containerized runners or remote agent environments:
          </p>
          <div className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main space-y-1">
            <div><span className="text-main-muted">Endpoint:</span> https://pocket-mc-proxy.onrender.com/mcp/v1</div>
            <div><span className="text-main-muted">Protocol:</span> Model Context Protocol 2024-11-05</div>
            <div><span className="text-main-muted">Manifest:</span> https://pocketmc.github.io/pocket-mc-website/.well-known/mcp.json</div>
          </div>
        </div>

        {/* Available Tools */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-4">
            3. Available MCP Tools
          </h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_list_instances</span>
              <span className="text-main-muted">Returns all configured server instances with status, RAM, and player counts.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_start_instance</span>
              <span className="text-main-muted">Launches server process with isolated Adoptium Java runtime.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_stop_instance</span>
              <span className="text-main-muted">Initiates safe world save and graceful shutdown.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_get_instance_status</span>
              <span className="text-main-muted">Retrieves real-time CPU %, RAM, TPS, and player list.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_create_backup</span>
              <span className="text-main-muted">Creates an atomic ZIP snapshot and triggers cloud synchronization.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_get_logs</span>
              <span className="text-main-muted">Returns sanitized live console log output with automated redaction.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">pocketmc_manage_playit_tunnel</span>
              <span className="text-main-muted">Inspects or provisions Playit.gg public domain tunnels.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
