import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between glass rounded-xl px-6 py-4 text-left"
          >
            <span className="font-semibold">Privacy Policy</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="glass rounded-b-xl px-6 py-4 -mt-1 text-sm text-muted-foreground space-y-3">
              <p><strong className="text-foreground">Last updated:</strong> April 2024</p>
              <p>PocketMC is a desktop application that runs entirely on your local machine. We do not operate any servers that collect, store, or process your personal data.</p>
              <p><strong className="text-foreground">Data Collection:</strong> PocketMC does not collect any personal information, usage data, analytics, or telemetry. Your Minecraft server configurations, worlds, and player data remain exclusively on your computer.</p>
              <p><strong className="text-foreground">Network Requests:</strong> PocketMC may make network requests to download server JARs (from official sources like PaperMC, Mojang), check for app updates (from GitHub), and download Java runtimes (from Adoptium). These are direct downloads with no intermediary servers.</p>
              <p><strong className="text-foreground">Third Parties:</strong> We do not share any data with third parties because we do not collect any data.</p>
              <p><strong className="text-foreground">Contact:</strong> For questions, open an issue on our GitHub repository.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
