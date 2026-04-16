import { Github } from "lucide-react";

const GITHUB_URL = "https://github.com/divyviradiya2/pocket-mc-desktop";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Screenshots", href: "#screenshots" },
    { label: "Download", href: "https://github.com/divyviradiya2/pocket-mc-desktop/releases/latest" },
  ],
  Resources: [
    { label: "Documentation", href: GITHUB_URL + "#readme" },
    { label: "Changelog", href: GITHUB_URL + "/releases" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  Community: [
    { label: "GitHub", href: GITHUB_URL },
    { label: "Issues", href: GITHUB_URL + "/issues" },
    { label: "Discussions", href: GITHUB_URL + "/discussions" },
  ],
  Legal: [
    { label: "MIT License", href: GITHUB_URL + "/blob/main/LICENSE" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-gradient-green">⛏</span>
              <span>Pocket</span>
              <span className="text-gradient-green">MC</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              The ultimate Minecraft server manager. Free and open source.
            </p>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </a>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PocketMC. Released under the MIT License.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for the Minecraft community
          </p>
        </div>
      </div>
    </footer>
  );
}
