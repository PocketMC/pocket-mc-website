import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const screens = [
  {
    title: "Dashboard",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {["Survival SMP", "Creative", "Modded"].map((n, i) => (
            <div key={n} className="rounded-lg bg-secondary/40 p-3">
              <div className="text-xs font-medium mb-1">{n}</div>
              <div className={`text-[10px] ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                {i === 0 ? "● Online" : "○ Offline"}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-secondary/30 p-3 h-20 flex items-end gap-1">
          {[40, 65, 55, 80, 70, 90, 60, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Console",
    content: (
      <div className="bg-[hsl(240,20%,6%)] rounded-lg p-3 font-mono text-[10px] space-y-1 h-32 overflow-hidden">
        <div className="text-muted-foreground">[18:42:01] <span className="text-primary">INFO</span>: Server started on port 25565</div>
        <div className="text-muted-foreground">[18:42:03] <span className="text-pmc-blue">INFO</span>: Loading world "survival"</div>
        <div className="text-muted-foreground">[18:42:05] <span className="text-primary">INFO</span>: Done (2.1s)!</div>
        <div className="text-muted-foreground">[18:43:12] <span className="text-pmc-gold">WARN</span>: Player Steve joined</div>
        <div className="text-muted-foreground">[18:45:30] <span className="text-primary">INFO</span>: Saving world...</div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-primary">›</span>
          <span className="w-1.5 h-3 bg-primary/60 animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    title: "Settings",
    content: (
      <div className="space-y-3">
        {["Server Port", "Max Players", "View Distance", "Difficulty"].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{label}</span>
            <div className="w-20 h-6 rounded bg-secondary/50 border border-border/50" />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Plugin Marketplace",
    content: (
      <div className="grid grid-cols-2 gap-2">
        {["EssentialsX", "WorldEdit", "Vault", "LuckPerms"].map((name) => (
          <div key={name} className="rounded-lg bg-secondary/40 p-2">
            <div className="text-xs font-medium mb-1">{name}</div>
            <div className="text-[10px] text-muted-foreground mb-2">★★★★★</div>
            <div className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary w-fit">Install</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Java Setup",
    content: (
      <div className="space-y-2">
        {[
          { ver: "Java 21", status: "Installed", active: true },
          { ver: "Java 17", status: "Installed", active: false },
          { ver: "Java 8", status: "Not Installed", active: false },
        ].map((j) => (
          <div key={j.ver} className="flex items-center justify-between p-2 rounded-lg bg-secondary/40">
            <div>
              <div className="text-xs font-medium">{j.ver}</div>
              <div className={`text-[10px] ${j.active ? "text-primary" : "text-muted-foreground"}`}>{j.status}</div>
            </div>
            {j.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">Active</span>}
          </div>
        ))}
      </div>
    ),
  },
];

export default function Screenshots() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + screens.length) % screens.length);
  const next = () => setActive((a) => (a + 1) % screens.length);

  return (
    <section id="screenshots" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            See It in <span className="text-gradient-green">Action</span>
          </h2>
          <p className="text-muted-foreground scroll-reveal" data-delay="100">
            A peek at PocketMC's clean, powerful interface.
          </p>
        </div>

        <div className="max-w-2xl mx-auto scroll-reveal" data-delay="200">
          {/* Screen tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {screens.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  i === active
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Screen display */}
          <div className="glass rounded-2xl p-1">
            <div className="bg-[hsl(var(--pmc-surface))] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-pmc-gold/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                  PocketMC — {screens[active].title}
                </span>
              </div>
              <div className="min-h-[160px]">{screens[active].content}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button variant="ghost" size="icon" onClick={prev} className="w-8 h-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1.5">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === active ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={next} className="w-8 h-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
