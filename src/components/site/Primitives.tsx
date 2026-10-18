import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";

const paths: Record<string, ReactNode> = {
  download: (
    <>
      <path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  external: <path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V4H4v12h4" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
    </>
  ),
  moon: <path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" />,
  monitor: (
    <>
      <rect x="3" y="3" width="18" height="13" rx="2" />
      <path d="M12 16v5m-4 0h8" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="3" width="18" height="7" rx="2" />
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M7 6.5h.01M7 17.5h.01" />
    </>
  ),
  terminal: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <path d="m6 8 4 4-4 4m7 0h5" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="3" width="18" height="5" rx="1" />
      <path d="M5 8v13h14V8m-10 5h6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="M12 8v5M5 16v-3h14v3" />
    </>
  ),
  settings: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <path d="M8 3v6m8 0v6M9 15v6" />
    </>
  ),
  book: (
    <>
      <path d="M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z" />
    </>
  ),
  chat: <path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z" />,
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </>
  ),
  sync: (
    <>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  folder: (
    <>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  modrinth: (
    <>
      <path d="M12 2a10 10 0 0 0-7.07 17.07L12 12V2Z" />
      <circle cx="12" cy="12" r="10" />
      <path d="M12 12l5.5 5.5" />
    </>
  ),
  curseforge: (
    <>
      <path d="M18.8 4H5.2A1.2 1.2 0 0 0 4 5.2v13.6c0 .66.54 1.2 1.2 1.2h13.6c.66 0 1.2-.54 1.2-1.2V5.2c0-.66-.54-1.2-1.2-1.2ZM12 7l4 4h-3v6h-2v-6H8l4-4Z" />
    </>
  ),
  package: (
    <>
      <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  puzzle: (
    <>
      <path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a1.5 1.5 0 0 0-2.121-2.122l-1.568 1.569a1.002 1.002 0 0 1-.879.289c-.611-.092-1.242.063-1.73.435-.49.373-.798.945-.798 1.56v.865H11v-.865c0-.615-.308-1.187-.798-1.56-.488-.372-1.119-.527-1.73-.435a1.002 1.002 0 0 1-.879-.289L6.025 3.282A1.5 1.5 0 0 0 3.904 5.403l1.568 1.569c.23.23.338.556.289.878-.092.611-.527 1.119-.9 1.608-.372.489-.865.797-1.48.797H2.5v3.185h.881c.615 0 1.108.308 1.48.797.373.489.808.997.9 1.608.049.322-.059.648-.289.878l-1.568 1.568a1.5 1.5 0 1 0 2.121 2.122l1.568-1.569a1.002 1.002 0 0 1 .879-.289c.611.092 1.242-.063 1.73-.435.49-.373.798-.945.798-1.56v-.865h3.181v.865c0 .615.308 1.187.798 1.56.488.372 1.119.527 1.73.435a1.002 1.002 0 0 1 .879.289l1.568 1.569a1.5 1.5 0 0 0 2.121-2.122l-1.568-1.568a1.002 1.002 0 0 1-.289-.878c.092-.611.527-1.119.9-1.608.372-.489.865-.797 1.48-.797h.881V9.865h-.881c-.615 0-1.108-.308-1.48-.797-.373-.489-.808-.997-.9-1.608z" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  tunnel: (
    <>
      <path d="M4 19V9a8 8 0 0 1 16 0v10" />
      <path d="M8 19v-6a4 4 0 0 1 8 0v6" />
      <line x1="2" y1="19" x2="22" y2="19" />
    </>
  ),
  bridge: (
    <>
      <path d="M4 18V9c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v9" />
      <path d="M2 18h20" />
      <path d="M9 18v-5a3 3 0 0 1 6 0v5" />
    </>
  ),
  devices: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <rect x="15" y="11" width="6" height="9" rx="1" />
    </>
  ),
  discord: (
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  ),
  sparkles: (
    <>
      <path d="m12 3 1.91 5.09L19 10l-5.09 1.91L12 17l-1.91-5.09L5 10l5.09-1.91L12 3z" />
      <path d="M19 17l.95 2.05L22 20l-2.05.95L19 23l-.95-2.05L16 20l2.05-.95L19 17z" />
      <path d="M5 18l.76 1.64L7.4 20.4l-1.64.76L5 22.8l-.76-1.64L2.6 20.4l1.64-.76L5 18z" />
    </>
  ),
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.23-.13-.37 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z" />
    </>
  ),
  wallpaper: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  windows: (
    <>
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  play: (
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  ),
  pause: (
    <>
      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
    </>
  ),
  volume: (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </>
  ),
  "volume-x": (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </>
  ),
  maximize: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </>
  ),
  minimize: (
    <>
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </>
  ),
  images: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <circle cx="7.5" cy="7.5" r="1.5" />
      <path d="m17 12-4-4L5 16" />
      <path d="M21 7v12a2 2 0 0 1-2 2H7" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
};
export function Icon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.grid}
    </svg>
  );
}
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <img
      className="brand-mark"
      src={getAssetUrl("logo.webp")}
      width={size}
      height={size}
      alt=""
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
export function HeroLogo({ size = 104 }: { size?: number }) {
  return (
    <div className="hero-logo-wrapper">
      <div className="hero-logo-glow" aria-hidden="true" />
      <img
        className="brand-mark hero-brand-mark"
        src={getAssetUrl("logo.webp")}
        width={size}
        height={size}
        alt="PocketMC"
      />
    </div>
  );
}
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <span className="cross start" aria-hidden="true" />
      <span className="cross end" aria-hidden="true" />
      {children}
    </section>
  );
}
export function SectionHead({
  label,
  title,
  href,
}: {
  label: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <span className="kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <a className="text-link" href={getAssetUrl(href)}>
          Explore <Icon name="arrow" />
        </a>
      )}
    </div>
  );
}
export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <span className="kicker">{label}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
export function CodeBlock({ code }: { code: string }) {
  const [status, setStatus] = useState("Copy command");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select and copy the command");
    }
  }
  return (
    <div className="code-block">
      <pre>
        <code>{code}</code>
      </pre>
      <button aria-label={status} title={status} onClick={copy}>
        <Icon name={status === "Copied" ? "check" : "copy"} />
      </button>
      <span role="status" className="sr-only">
        {status === "Copy command" ? "" : status}
      </span>
    </div>
  );
}
export function Screenshot({
  file,
  alt,
  priority = false,
}: {
  file: string;
  alt: string;
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className="screenshot"
        aria-label={`Enlarge ${alt}`}
        onClick={() => dialog.current?.showModal()}
      >
        <img
          src={getAssetUrl(`screenshots/${file}`)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          width="1920"
          height="1080"
        />
        <span className="enlarge">
          <Icon name="search" /> Enlarge
        </span>
      </button>
      <dialog
        ref={dialog}
        className="image-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div>
          <button
            className="icon-button dialog-close"
            aria-label="Close image"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
          <img src={getAssetUrl(`screenshots/${file}`)} alt={alt} />
          <p>{alt}</p>
        </div>
      </dialog>
    </>
  );
}
