export default function Changelog() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            <span className="text-gradient-green">Changelog</span>
          </h2>
        </div>
        <div className="max-w-2xl mx-auto glass rounded-xl p-6 scroll-reveal" data-delay="100">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono font-bold text-foreground">v1.0.0</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">Latest</span>
            <span className="text-xs text-muted-foreground">April 2024</span>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">✨ Features</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• One-click Minecraft server creation wizard</li>
                <li>• Built-in live console with syntax highlighting</li>
                <li>• Visual server.properties editor</li>
                <li>• Automatic Java detection and installation</li>
                <li>• Multi-server management dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-pmc-blue mb-2">🐛 Bug Fixes</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Fixed Java path detection on Windows with spaces</li>
                <li>• Resolved console encoding issues on macOS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-pmc-gold mb-2">📚 Documentation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Added comprehensive README and contributing guide</li>
                <li>• Published initial wiki with setup instructions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
