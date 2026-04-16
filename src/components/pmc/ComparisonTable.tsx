import { Check, X } from "lucide-react";

const rows = [
  { feature: "Free & Open Source", pmc: true, a: false, b: false },
  { feature: "GUI Server Setup", pmc: true, a: true, b: false },
  { feature: "Auto Java Management", pmc: true, a: false, b: false },
  { feature: "Plugin Marketplace", pmc: true, a: true, b: false },
  { feature: "Performance Monitoring", pmc: true, a: true, b: false },
  { feature: "Multi-Server Support", pmc: true, a: true, b: true },
  { feature: "Backup & Restore", pmc: true, a: false, b: true },
  { feature: "Cross-Platform", pmc: true, a: false, b: true },
  { feature: "Privacy-First", pmc: true, a: false, b: false },
];

const Cell = ({ val }: { val: boolean }) =>
  val ? (
    <Check className="w-4 h-4 text-primary mx-auto" />
  ) : (
    <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
  );

export default function ComparisonTable() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Why <span className="text-gradient-green">PocketMC</span>?
          </h2>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto scroll-reveal" data-delay="100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                <th className="py-3 px-4 text-primary font-bold">PocketMC</th>
                <th className="py-3 px-4 text-muted-foreground font-medium">Panel A</th>
                <th className="py-3 px-4 text-muted-foreground font-medium">CLI Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-b border-border/20 hover:bg-secondary/20">
                  <td className="py-3 px-4 text-foreground">{r.feature}</td>
                  <td className="py-3 px-4 bg-primary/5"><Cell val={r.pmc} /></td>
                  <td className="py-3 px-4"><Cell val={r.a} /></td>
                  <td className="py-3 px-4"><Cell val={r.b} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
