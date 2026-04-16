const types = [
  { name: "Vanilla", desc: "Pure Minecraft experience, no mods.", color: "bg-pmc-green/10 text-pmc-green border-pmc-green/20" },
  { name: "Paper", desc: "High-performance Spigot fork. Most popular choice.", color: "bg-pmc-blue/10 text-pmc-blue border-pmc-blue/20", popular: true },
  { name: "Fabric", desc: "Lightweight modding toolchain for modern mods.", color: "bg-pmc-purple/10 text-pmc-purple border-pmc-purple/20" },
  { name: "Forge", desc: "Classic modding platform with huge mod library.", color: "bg-pmc-gold/10 text-pmc-gold border-pmc-gold/20" },
];

export default function ServerTypes() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Pick Your <span className="text-gradient-green">Server Type</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {types.map((t, i) => (
            <div
              key={t.name}
              className={`relative glass rounded-xl p-5 text-center scroll-reveal border ${t.color.split(" ").pop()}`}
              data-delay={i * 80}
            >
              {t.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-pmc-blue text-background">
                  Most Popular
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${t.color}`}>
                <span className="text-xl">⛏</span>
              </div>
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
