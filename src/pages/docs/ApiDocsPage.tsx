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
          REST API Reference
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          The PocketMC desktop service hosts a local loopback HTTP daemon on port <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-base-muted text-main border border-divider">25585</code> by default. All endpoints accept and return JSON.
        </p>
      </motion.div>

      {/* Server Base URL Box */}
      <div className="p-4 sm:p-5 rounded-xl border border-divider bg-base-card mb-10 font-mono text-xs text-main-muted flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-main">Base URL:</span>
          <span className="text-main">http://127.0.0.1:25585</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span>Auth Header:</span>
          <span className="text-main">Authorization: Bearer &lt;token&gt;</span>
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
            <span className="font-mono text-sm font-semibold text-main">/api/v1/health</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Returns health status, active application version, host OS platform, and count of running Minecraft instances.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok",
  "version": "1.9.3",
  "platform": "win-x64",
  "activeInstances": 2
}`}
          </pre>
        </div>

        {/* Instances List */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/v1/instances</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Lists all configured server instances with their live runtime statuses, CPU and RAM metrics, allocated memory, and player counts.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "paper-121",
    "name": "PaperMC Survival",
    "software": "PaperMC",
    "version": "1.21.1",
    "javaVersion": "21",
    "port": 25565,
    "status": "running",
    "playersOnline": 4,
    "maxPlayers": 20,
    "memoryMb": 4096
  }
]`}
          </pre>
        </div>

        {/* Start Instance */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/v1/instances/&#123;id&#125;/start</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Starts the target server instance. Automatically provisions required Adoptium Java runtimes and binds active network tunnels.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Instance paper-121 started successfully."
}`}
          </pre>
        </div>

        {/* Stop Instance */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/v1/instances/&#123;id&#125;/stop</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Initiates a graceful server shutdown via RCON <code className="font-mono text-xs">save-all</code> and <code className="font-mono text-xs">stop</code> to prevent chunk corruption.
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Instance paper-121 shutdown initiated."
}`}
          </pre>
        </div>

        {/* Logs */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              GET
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/v1/instances/&#123;id&#125;/logs</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
            Retrieves recent console log output. Sensitive strings (passwords, IP addresses, tokens) are automatically redacted by the daemon before delivery.
          </p>
        </div>

        {/* Backup */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-base-muted border border-divider text-main">
              POST
            </span>
            <span className="font-mono text-sm font-semibold text-main">/api/v1/instances/&#123;id&#125;/backup</span>
          </div>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed">
            Creates an atomic ZIP snapshot of the world and instance directory with SHA-256 verification, replicating directly to configured cloud providers.
          </p>
        </div>
      </div>
    </div>
  );
}
