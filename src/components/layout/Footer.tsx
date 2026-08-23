import { getAssetUrl } from "../../utils/getAssetUrl";
import { SOCIAL_LINKS } from "../../data/socialLinks";

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenTerms, onOpenPrivacy }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-divider px-4 sm:px-6 py-8 sm:py-12 bg-base/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row items-center md:items-start">
        <div className="flex flex-col gap-2 items-center md:items-start flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={getAssetUrl("/logo.webp")}
              alt="PocketMC Logo"
              className="h-6 w-6 object-contain"
              width="24"
              height="24"
            />
            <p className="font-mono text-xs leading-tight text-main-muted">
              © {new Date().getFullYear()} PocketMC Contributors. Licensed under MIT.
            </p>
          </div>
          <p className="text-[11px] text-center md:text-left font-mono leading-tight text-main-muted">
            PocketMC is an open-source project maintained by{" "}
            <a
              href="https://github.com/sizwinz"
              target="_blank"
              rel="noreferrer"
              className="text-main hover:underline font-bold"
            >
              sizwinz
            </a>
            ,{" "}
            <a
              href="https://github.com/divyviradiya2"
              target="_blank"
              rel="noreferrer"
              className="text-main hover:underline font-bold"
            >
              divyviradiya2
            </a>
            , and the Minecraft community.
          </p>
          <div className="flex flex-wrap gap-3 mt-1.5 font-mono text-[11px] text-main-muted justify-center md:justify-start">
            <a
              href="/pocket-mc-website/about/"
              className="hover:text-main transition-colors hover:underline"
            >
              About
            </a>
            <span className="opacity-30 select-none">•</span>
            <a
              href="/pocket-mc-website/contact/"
              className="hover:text-main transition-colors hover:underline"
            >
              Contact
            </a>
            <span className="opacity-30 select-none">•</span>
            <a
              href="/pocket-mc-website/terms/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onOpenTerms();
                }
              }}
              className="hover:text-main transition-colors cursor-pointer hover:underline"
            >
              Terms
            </a>
            <span className="opacity-30 select-none">•</span>
            <a
              href="/pocket-mc-website/privacy/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onOpenPrivacy();
                }
              }}
              className="hover:text-main transition-colors cursor-pointer hover:underline"
            >
              Privacy
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-12 font-mono text-xs justify-center w-full md:w-auto text-left">
          <div className="flex flex-col gap-2.5">
            <p className="font-bold text-main uppercase tracking-wider text-[10px] opacity-60">
              Developers
            </p>
            <a
              href="/pocket-mc-website/docs/"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              Developer Portal
            </a>
            <a
              href="/pocket-mc-website/docs/openapi.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              OpenAPI Spec
            </a>
            <a
              href="/pocket-mc-website/.well-known/mcp.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              MCP Manifest
            </a>
            <a
              href="/pocket-mc-website/llms.txt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              llms.txt
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-bold text-main uppercase tracking-wider text-[10px] opacity-60">
              Project
            </p>
            <a
              href="https://github.com/PocketMC"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              GitHub Org
            </a>
            <a
              href="https://github.com/PocketMC/pocket-mc-windows"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              Windows App
            </a>
            <a
              href="https://github.com/PocketMC/pocket-mc-website"
              target="_blank"
              rel="noreferrer"
              className="hover:text-main transition-colors whitespace-nowrap text-main-muted"
            >
              Website Repo
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-bold text-main uppercase tracking-wider text-[10px] opacity-60">
              Community
            </p>
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-main-muted hover:text-main transition-colors whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
