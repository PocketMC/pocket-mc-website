import { Download, Settings, Play, Rocket } from "lucide-react";

const steps = [
  { icon: Download, title: "Download & Install", desc: "Grab PocketMC from GitHub releases. Available for Windows, macOS, and Linux." },
  { icon: Settings, title: "Configure Your Server", desc: "Choose server type, version, and settings with the visual setup wizard." },
  { icon: Play, title: "Start & Play", desc: "Hit start — PocketMC handles Java, port forwarding hints, and everything else." },
  { icon: Rocket, title: "Manage & Scale", desc: "Monitor performance, install plugins, manage players, and add more servers." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Up and Running in{" "}
            <span className="text-gradient-green">4 Steps</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="flex items-start gap-5 scroll-reveal"
                data-delay={i * 100}
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Step {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
