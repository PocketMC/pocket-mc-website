import {
  Server, Terminal, Settings, Puzzle, FolderDown,
  Shield, Activity, Bell, Users, Globe,
  Cpu, HardDrive, Palette, Zap
} from "lucide-react";

const features = [
  { icon: Server, title: "One-Click Server Setup", desc: "Create servers instantly with guided setup wizard.", badge: "Core" },
  { icon: Terminal, title: "Live Console", desc: "Built-in terminal with syntax highlighting and command history.", badge: "Core" },
  { icon: Settings, title: "Visual Config Editor", desc: "Edit server.properties with a friendly UI — no text files.", badge: "Core" },
  { icon: Puzzle, title: "Plugin Marketplace", desc: "Browse, install, and update plugins from a curated catalog." },
  { icon: FolderDown, title: "Auto Java Management", desc: "Detects, downloads, and manages the right Java version.", badge: "Smart" },
  { icon: Shield, title: "Backup & Restore", desc: "Scheduled and manual backups with one-click restore." },
  { icon: Activity, title: "Performance Monitor", desc: "Real-time CPU, RAM, TPS, and player count graphs.", badge: "Pro" },
  { icon: Bell, title: "Notifications", desc: "Desktop alerts for crashes, low memory, or player events." },
  { icon: Users, title: "Player Management", desc: "Whitelist, ban, op, and manage players from one panel." },
  { icon: Globe, title: "Multi-Server Support", desc: "Run and switch between multiple servers seamlessly." },
  { icon: Cpu, title: "Resource Allocation", desc: "Fine-tune RAM, CPU threads, and JVM flags per server." },
  { icon: HardDrive, title: "World Management", desc: "Import, export, and swap worlds with drag-and-drop." },
  { icon: Palette, title: "Themes & Customization", desc: "Dark/light themes and customizable dashboard layout." },
  { icon: Zap, title: "Auto Updates", desc: "One-click server JAR updates for Paper, Fabric, and more." },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Everything You Need,{" "}
            <span className="text-gradient-green">Nothing You Don't</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto scroll-reveal" data-delay="100">
            14 powerful features packed into one beautiful, lightweight app.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="scroll-reveal glass rounded-xl p-5 hover:bg-[hsl(var(--pmc-surface-hover))] transition-colors group"
              data-delay={i * 50}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <f.icon className="w-5 h-5" />
                </div>
                {f.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {f.badge}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
