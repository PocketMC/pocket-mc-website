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
          Webhooks &amp; Events
        </h1>
        <p className="text-base sm:text-lg text-main-muted leading-relaxed max-w-3xl">
          Subscribe Discord bots, monitoring dashboards, and automation scripts to real-time server lifecycle and player activity events.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {/* Event Types */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-4">
            Supported Event Types
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">server.state_changed</span>
              <span className="text-main-muted">Fired on instance start, stop, restarting, or crashed.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">player.joined / left</span>
              <span className="text-main-muted">Fired when players connect or disconnect from a server.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">backup.completed</span>
              <span className="text-main-muted">Fired when local or cloud snapshot upload succeeds.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-base-muted border border-divider">
              <span className="font-bold text-main block mb-1">tunnel.bound</span>
              <span className="text-main-muted">Fired when Playit assigns or updates a public domain.</span>
            </div>
          </div>
        </div>

        {/* Payload Example */}
        <div className="p-6 rounded-xl border border-divider bg-base-card">
          <h2 className="text-lg font-bold text-main tracking-tight mb-2">
            Webhook Delivery Payload
          </h2>
          <p className="text-xs sm:text-sm text-main-muted leading-relaxed mb-4">
            Dispatches an HTTP POST request with a JSON body and HMAC-SHA256 signature in the <code className="font-mono text-xs">X-PocketMC-Signature</code> header:
          </p>
          <pre className="p-4 rounded-lg bg-base-muted border border-divider font-mono text-xs text-main overflow-x-auto">
{`POST /your-webhook-endpoint HTTP/1.1
Host: your-service.com
Content-Type: application/json
X-PocketMC-Signature: sha256=d3b07384d113edec49eaa6238ad5ff00

{
  "event": "server.state_changed",
  "timestamp": "2026-09-26T10:00:00Z",
  "data": {
    "instanceId": "paper-121",
    "previousState": "starting",
    "currentState": "running",
    "port": 25565
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
