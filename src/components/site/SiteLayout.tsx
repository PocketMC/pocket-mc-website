import { useEffect, useState } from "react";
import { GithubIcon } from "../ui/SocialIcons";
import { Icon, Logo, Section } from "./Primitives";
import { getAssetUrl as url } from "../../utils/getAssetUrl";
import { discord, repo, unixRepo } from "../../data/site";

type Theme = "system" | "light" | "dark";
const links = [
  ["Install", "install/"],
  ["What it does", "features/"],
  ["Gallery", "gallery/"],
  ["Community", "community/"],
  ["Docs", "docs/"],
  ["FAQ", "faq/"],
  ["Changelog", "changelog/"],
];

export function SiteHeader({ path }: { path: string }) {
  const [menu, setMenu] = useState(false);
  const [stars, setStars] = useState<number | null>(32);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    try {
      const saved = localStorage.getItem("theme");
      return saved === "light" || saved === "system" ? saved : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    let active = true;
    fetch("https://api.github.com/repos/PocketMC/pocket-mc-windows")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        /* Keep fallback */
      });
    return () => {
      active = false;
    };
  }, []);

  const starLabel =
    stars === null
      ? null
      : stars < 1000
        ? String(stars)
        : (stars / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const resolved =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.classList.toggle("dark", resolved === "dark");
    };
    sync();
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* Storage can be disabled. */
    }
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [theme]);
  useEffect(() => {
    if (!menu) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  const nav = links.map(([label, href]) => (
    <a
      key={href}
      href={url(href)}
      aria-current={
        path.startsWith(`/${href.replace(/\/$/, "")}`) ? "page" : undefined
      }
    >
      {label}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-bar">
          <div className="header-left">
            <a
              href={url("")}
              className="brand"
              aria-label="PocketMC home"
              onClick={() => {
                if (typeof window !== "undefined") {
                  const homeUrl = url("");
                  if (window.location.pathname === homeUrl || window.location.pathname === `${homeUrl}/`) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }
              }}
            >
              <Logo />
              PocketMC
            </a>
            <nav aria-label="Main navigation" className="desktop-nav">
              {nav}
            </nav>
          </div>
          <div className="header-right">
            <div className="theme-switch" role="group" aria-label="Color theme">
              {(["system", "light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  aria-label={`${t[0].toUpperCase() + t.slice(1)} theme`}
                  aria-pressed={theme === t}
                  onClick={() => setTheme(t)}
                  title={`${t} theme`}
                >
                  <Icon
                    name={
                      t === "system"
                        ? "monitor"
                        : t === "light"
                          ? "sun"
                          : "moon"
                    }
                    size={14}
                  />
                </button>
              ))}
            </div>
            <a
              className="github-button"
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`PocketMC GitHub repository${stars ? ` with ${stars} stars` : ""}`}
            >
              <GithubIcon className="social-icon" />
              <span>GitHub</span>
              {starLabel && (
                <span className="github-stars-badge">{starLabel}</span>
              )}
            </a>
            <a href={url("install/")} className="button primary small">
              Install
            </a>
            <button
              id="menu-toggle"
              className="icon-button mobile-toggle"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(!menu)}
            >
              <Icon name={menu ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            {nav}
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-repo-link"
              onClick={() => setMenu(false)}
            >
              <span className="mobile-repo-label">
                <GithubIcon className="social-icon" />
                GitHub
              </span>
              {starLabel && (
                <span className="github-stars-badge">{starLabel}</span>
              )}
            </a>
          </nav>
        )}
      </header>
      {menu && (
        <button
          className="menu-scrim"
          tabIndex={-1}
          aria-label="Dismiss menu"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="header-space" />
    </>
  );
}

export function SiteFooter() {
  const columns = [
    {
      name: "Site",
      links: [
        ["Install", url("install/")],
        ["What it does", url("features/")],
        ["Gallery", url("gallery/")],
        ["Community", url("community/")],
        ["Docs", url("docs/")],
        ["FAQ", url("faq/")],
      ],
    },
    {
      name: "Project",
      links: [
        ["GitHub", repo],
        ["Changelog", url("changelog/")],
        ["Contributing", `${repo}/blob/master/CONTRIBUTING.md`],
        ["Linux & macOS", unixRepo],
        ["About", url("about/")],
      ],
    },
    {
      name: "Talk",
      links: [
        ["Discord", discord],
        ["Reddit", "https://www.reddit.com/r/PocketMC/"],
        ["Issues", `${repo}/issues`],
        ["Contact", url("contact/")],
      ],
    },
    {
      name: "Legal",
      links: [
        ["License", `${repo}/blob/master/LICENSE`],
        ["Privacy", url("privacy/")],
        ["Terms", url("terms/")],
      ],
    },
  ];
  return (
    <Section className="footer-section">
      <footer className="page site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href={url("")}>
              <Logo />
              PocketMC
            </a>
            <p>
              A local Minecraft server manager.
              <br />
              Your worlds, on your hardware.
            </p>
          </div>
          <div className="footer-links">
            {columns.map((column) => (
              <div key={column.name}>
                <h2 className="kicker">{column.name}</h2>
                {column.links.map(([label, href]) => (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-note">
          <p>
            PocketMC is free and open-source software under the MIT License.
            <br />
            Not an official Minecraft product. Not approved by or associated
            with Mojang or Microsoft.
          </p>
          <span>Built by the community.</span>
        </div>
      </footer>
    </Section>
  );
}
