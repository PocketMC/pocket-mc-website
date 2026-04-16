import { Download, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOWNLOAD_URL = "https://github.com/divyviradiya2/pocket-mc-desktop/releases/latest";
const GITHUB_URL = "https://github.com/divyviradiya2/pocket-mc-desktop";

const stats = [
  { label: "Open Source", value: "100%" },
  { label: "Server Types", value: "6+" },
  { label: "Price", value: "Free" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[hsl(var(--pmc-green)/0.08)] blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(var(--pmc-blue)/0.06)] blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[hsl(var(--pmc-purple)/0.05)] blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8 scroll-reveal">
            <Sparkles className="w-4 h-4 text-pmc-gold" />
            <span>v1.0 — Now Available</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 scroll-reveal" data-delay="100">
            Manage Minecraft Servers{" "}
            <span className="text-gradient-hero">Like a Pro</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 scroll-reveal" data-delay="200">
            The ultimate desktop app to create, configure, and monitor Minecraft servers.
            Open source, free forever, and built for everyone.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 scroll-reveal" data-delay="300">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 text-base px-8 glow-green">
                <Download className="w-5 h-5" /> Download Free
              </Button>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 text-base px-8">
                <Github className="w-5 h-5" /> View on GitHub
              </Button>
            </a>
          </div>

          {/* Stat chips */}
          <div className="flex items-center justify-center gap-6 md:gap-10 scroll-reveal" data-delay="400">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Dashboard mockup card */}
          <div className="mt-16 scroll-reveal" data-delay="500">
            <div className="glass rounded-2xl p-1 max-w-3xl mx-auto glow-green">
              <div className="bg-[hsl(var(--pmc-surface))] rounded-xl p-6">
                {/* Title bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-pmc-gold/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                  <span className="ml-3 text-xs text-muted-foreground font-mono">PocketMC — Dashboard</span>
                </div>
                {/* Mock content */}
                <div className="grid grid-cols-3 gap-3">
                  {["Survival SMP", "Creative Build", "Modded 1.20"].map((name, i) => (
                    <div key={name} className="rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{name}</span>
                        <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {i === 0 ? "Online • 3 players" : "Offline"}
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/60"
                          style={{ width: i === 0 ? "65%" : i === 1 ? "30%" : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
