import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOWNLOAD_URL = "https://github.com/divyviradiya2/pocket-mc-desktop/releases/latest";

export default function DownloadCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--pmc-green)/0.06)] blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
          Ready to Get <span className="text-gradient-green">Started</span>?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8 scroll-reveal" data-delay="100">
          Download PocketMC today and take control of your Minecraft servers.
        </p>
        <div className="scroll-reveal" data-delay="200">
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 text-lg px-10 py-6 glow-green">
              <Download className="w-6 h-6" /> Download PocketMC
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Windows · macOS · Linux — Free forever
          </p>
        </div>
      </div>
    </section>
  );
}
