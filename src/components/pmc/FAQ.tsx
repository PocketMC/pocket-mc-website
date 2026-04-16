import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is PocketMC really free?", a: "Yes! PocketMC is 100% free and open source under the MIT license. No ads, no subscriptions, no hidden costs." },
  { q: "What operating systems are supported?", a: "Windows 10+, macOS 10.15+, and Ubuntu 20.04+ (and most Linux distros). We build native binaries for all three platforms." },
  { q: "Do I need to install Java separately?", a: "No. PocketMC automatically detects, downloads, and manages the correct Java version for your server type." },
  { q: "Can I run multiple servers at once?", a: "Absolutely. PocketMC supports running and managing multiple servers simultaneously with independent configurations." },
  { q: "Does PocketMC collect any data?", a: "No. PocketMC runs entirely on your machine. We don't collect telemetry, usage data, or any personal information." },
  { q: "How do I install plugins?", a: "Use the built-in Plugin Marketplace to browse, install, and update plugins with one click. You can also manually add JAR files." },
  { q: "Can I use PocketMC for modded servers?", a: "Yes! PocketMC supports Forge, Fabric, and other modding platforms with automatic mod loader installation." },
  { q: "How do backups work?", a: "PocketMC supports both scheduled automatic backups and manual one-click backups. Restore any backup instantly from the UI." },
  { q: "Is port forwarding handled automatically?", a: "PocketMC provides guided port forwarding instructions and can detect your router type, but actual port forwarding requires router access." },
  { q: "How do I update PocketMC?", a: "PocketMC checks for updates on launch and can update itself with one click. You can also download the latest release from GitHub." },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Frequently Asked <span className="text-gradient-green">Questions</span>
          </h2>
        </div>
        <div className="max-w-2xl mx-auto scroll-reveal" data-delay="100">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-xl px-5 border-border/30">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
