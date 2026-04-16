import { Monitor, Cpu } from "lucide-react";

const specs = [
  {
    title: "Minimum",
    icon: Monitor,
    items: ["Windows 10 / macOS 10.15 / Ubuntu 20.04", "4 GB RAM", "2-core CPU", "500 MB disk space", "Java 17 (auto-installed)"],
  },
  {
    title: "Recommended",
    icon: Cpu,
    items: ["Windows 11 / macOS 13+ / Ubuntu 22.04", "8 GB RAM", "4-core CPU", "2 GB disk space", "SSD for better performance"],
  },
];

export default function SystemRequirements() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            System <span className="text-gradient-green">Requirements</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {specs.map((s, i) => (
            <div key={s.title} className="glass rounded-xl p-6 scroll-reveal" data-delay={i * 100}>
              <div className="flex items-center gap-3 mb-4">
                <s.icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">{s.title}</h3>
              </div>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
