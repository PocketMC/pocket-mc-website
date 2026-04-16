import { useState, useEffect } from "react";
import { Menu, X, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Roadmap", href: "#roadmap" },
];

const GITHUB_URL = "https://github.com/divyviradiya2/pocket-mc-desktop";
const DOWNLOAD_URL = "https://github.com/divyviradiya2/pocket-mc-desktop/releases/latest";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-gradient-green">⛏</span>
          <span className="text-foreground">Pocket</span>
          <span className="text-gradient-green">MC</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </a>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" /> Download
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-border/50 px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </a>
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
