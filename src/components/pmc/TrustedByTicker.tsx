const SERVER_TYPES = [
  "Vanilla", "Paper", "Fabric", "Forge", "Spigot", "BungeeCord",
  "Purpur", "Velocity", "Waterfall", "Sponge",
];

export default function TrustedByTicker() {
  const items = [...SERVER_TYPES, ...SERVER_TYPES];

  return (
    <section className="py-12 border-y border-border/30 overflow-hidden">
      <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
        Supports All Major Server Types
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 text-lg font-semibold text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
