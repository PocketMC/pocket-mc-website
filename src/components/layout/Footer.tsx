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
            <p
              className="font-mono text-xs leading-tight"
              style={{ color: "var(--main-muted)" }}
            >
              © {new Date().getFullYear()} PocketMC Contributors. Licensed
              under MIT.
            </p>
          </div>
          <p
            className="text-[10px] text-center md:text-left font-mono leading-tight"
            style={{ color: "var(--main-muted)" }}
          >
            PocketMC is an open-source project maintained by{" "}
            <a
              href="https://github.com/sizwinz"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline font-bold"
            >
              sizwinz
            </a>
            ,{" "}
            <a
              href="https://github.com/divyviradiya2"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline font-bold"
            >
              divyviradiya2
            </a>
            , and the Minecraft community.
          </p>
          <div className="flex flex-wrap gap-3 mt-1.5 font-mono text-[10px] text-main-muted justify-center md:justify-start">
            <button
              onClick={onOpenTerms}
              className="hover:text-accent transition-colors cursor-pointer hover:underline bg-transparent border-0 p-0 font-mono text-[10px] text-main-muted"
            >
              Terms of Service
            </button>
            <span className="opacity-30 select-none">•</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-accent transition-colors cursor-pointer hover:underline bg-transparent border-0 p-0 font-mono text-[10px] text-main-muted"
            >
              Privacy & Security
            </button>
          </div>
        </div>

        <div className="flex gap-12 sm:gap-16 font-mono text-xs justify-center w-full md:w-auto text-left">
          <div className="flex flex-col gap-2.5">
            <p className="font-bold text-main uppercase tracking-wider text-[10px] opacity-60">
              Project
            </p>
            <a
              href="https://github.com/PocketMC"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors whitespace-nowrap text-main-muted"
            >
              GitHub Org
            </a>
            <a
              href="https://github.com/PocketMC/pocket-mc-windows"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors whitespace-nowrap text-main-muted"
            >
              Windows App
            </a>
            <a
              href="https://github.com/PocketMC/pocket-mc-website"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors whitespace-nowrap text-main-muted"
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
                  className={`flex items-center gap-2 text-main-muted ${item.textHoverColor} transition-colors whitespace-nowrap`}
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

