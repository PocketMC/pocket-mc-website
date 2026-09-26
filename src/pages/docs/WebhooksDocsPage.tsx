import { motion } from "motion/react";

interface WebhooksDocsPageProps {
  navigate?: (path: string) => void;
}

export default function WebhooksDocsPage({ navigate }: WebhooksDocsPageProps) {
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
          Event Streams &amp; WebSockets
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          Stream real-time console log output and monitor instance state changes using WebSocket connections and REST endpoints.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {/* WebSocket Stream */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            1. WebSocket Live Console Stream
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Connect to <code className="font-mono text-xs">ws://localhost:25580/ws/instances/&#123;id&#125;/console</code> to stream stdout/stderr lines and send stdin commands:
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`const ws = new WebSocket('ws://localhost:25580/ws/instances/paper-121/console');

ws.onmessage = (event) => {
  const logLine = JSON.parse(event.data);
  console.log('[Minecraft Console]', logLine);
};

// Send command to server stdin
ws.send(JSON.stringify({ command: 'say Hello from WebSocket client' }));`}
          </pre>
        </div>

        {/* Status Polling */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            2. System &amp; Instance Status Polling
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Query health and active instance states via standard REST endpoints:
          </p>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">GET /health</span>
              <span className="text-main-muted">Daemon uptime, memory usage, and host OS metadata.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">GET /api/status</span>
              <span className="text-main-muted">Overall service health, active server counts, and remote control settings.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">GET /api/instances</span>
              <span className="text-main-muted">Real-time status, engine versions, and running state for all local servers.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
