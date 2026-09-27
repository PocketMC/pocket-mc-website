import { motion } from "motion/react";

interface ApiDocsPageProps {
  navigate?: (path: string) => void;
}

export default function ApiDocsPage({ navigate }: ApiDocsPageProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigate) {
      navigate("/docs/");
    } else {
      window.location.href = "/docs/";
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <div className="mb-6">
        <a
          href="/docs/"
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
          Remote Control REST API
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          PocketMC runs an embedded Kestrel HTTP server on port <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-base-muted text-main border border-divider">25580</code> when Remote Control is enabled. All endpoints accept and return JSON.
        </p>
      </motion.div>

      {/* Server Base URL Box */}
      <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-card mb-10 font-mono text-xs text-main-muted flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-main">Default Endpoint:</span>
          <span className="text-main">http://127.0.0.1:25580</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span>Auth Mechanism:</span>
          <span className="text-main">Session Cookie (POST /api/login)</span>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-6 mb-12">
        {/* Health */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET
            </span>
            <span className="font-mono text-sm font-semibold text-main">/health</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Unauthenticated health check endpoint returning server daemon status.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok"
}`}
          </pre>
        </div>

        {/* Login */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/login</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Authenticates remote control users against configured password hashes. Issues a secure <code className="font-mono text-xs">RemoteCookies</code> session token. Rate limited to 5 attempts per minute.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": "Admin",
  "password": "<your_password>"
}

HTTP/1.1 200 OK
Set-Cookie: RemoteCookies=<encrypted_session_stamp>; path=/; HttpOnly`}
          </pre>
        </div>

        {/* Status */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/status</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Returns overall system resource usage, active instances count, and network interface addresses.
          </p>
        </div>

        {/* Instances List */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/instances</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Lists configured Minecraft instances with runtime state, assigned port, and player counts.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "e3b0c442-98fc-4c14-9afb-f4c8996fb924",
    "name": "PaperMC Survival",
    "serverType": "Paper",
    "version": "1.21.1",
    "port": 25565,
    "status": "Running",
    "playerCount": 3,
    "allocatedMemoryMb": 4096
  }
]`}
          </pre>
        </div>

        {/* Start / Stop Instance */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/instances/&#123;id&#125;/start</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Launches the target server process under isolated Windows Job Objects with the designated Adoptium Java runtime.
          </p>
        </div>

        {/* Console Command */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/instances/&#123;id&#125;/console/command</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Sends a raw console command directly to the running server stdin stream. Rate limited to 30 commands per minute.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`POST /api/instances/e3b0c442-98fc-4c14-9afb-f4c8996fb924/console/command HTTP/1.1
Content-Type: application/json

{
  "command": "say Server maintenance starting in 5 minutes"
}

HTTP/1.1 200 OK
{ "sent": true }`}
          </pre>
        </div>

        {/* Console WebSocket */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              WS
            </span>
            <span className="font-mono text-sm font-semibold text-main">/ws/instances/&#123;id&#125;/console</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
            Real-time WebSocket connection for bi-directional console log streaming and interactive terminal sessions.
          </p>
        </div>

        {/* File Manager */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET / POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/instances/&#123;id&#125;/files</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
            Browse server directories, read file contents, upload new configurations, create folders, and delete files remotely.
          </p>
        </div>
      </div>
    </div>
  );
}
