const milestones = [
  { version: "v1.0", title: "Initial Release", status: "Released", items: ["Server creation wizard", "Live console", "Config editor", "Java auto-management"], color: "bg-primary" },
  { version: "v1.1", title: "Plugin Ecosystem", status: "In Progress", items: ["Plugin marketplace", "Auto-updater for plugins", "Dependency resolution"], color: "bg-pmc-blue" },
  { version: "v1.5", title: "Performance Suite", status: "Planned", items: ["Real-time TPS/RAM graphs", "Performance recommendations", "Crash analytics"], color: "bg-pmc-purple" },
  { version: "v2.0", title: "Cloud Sync", status: "Planned", items: ["Optional cloud backup", "Remote server management", "Mobile companion app"], color: "bg-pmc-gold" },
];

const statusColor: Record<string, string> = {
  Released: "bg-primary/20 text-primary",
  "In Progress": "bg-pmc-blue/20 text-pmc-blue",
  Planned: "bg-muted text-muted-foreground",
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            <span className="text-gradient-green">Roadmap</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border/30 to-transparent" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div
                key={m.version}
                className={`relative flex flex-col md:flex-row items-start gap-6 scroll-reveal ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                data-delay={i * 100}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background z-10" style={{ backgroundColor: `hsl(var(--pmc-green))` }} />
                <div className={`md:w-1/2 pl-14 md:pl-0 ${i % 2 === 1 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-sm font-bold text-foreground">{m.version}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor[m.status]}`}>
                      {m.status}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{m.title}</h3>
                  <ul className="space-y-1">
                    {m.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
