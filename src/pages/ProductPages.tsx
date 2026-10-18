import { GithubIcon, DiscordIcon } from "../components/ui/SocialIcons";
import {
  HeroLogo,
  Icon,
  PageHeading,
  Screenshot,
  Section,
  SectionHead,
} from "../components/site/Primitives";
import InstallPanel from "../components/site/InstallPanel";
import HeroVideoPlayer from "../components/site/HeroVideoPlayer";
import ComparisonSection from "../components/site/ComparisonSection";
import {
  discord,
  featureGroups,
  repo,
  screenshots,
  unixRepo,
} from "../data/site";
import { getAssetUrl as url } from "../utils/getAssetUrl";

export function FeatureGrid() {
  return (
    <div className="feature-grid wire">
      {featureGroups.map((group) => (
        <div key={group.title} className="feature-group-col">
          <h3 className="kicker">{group.title}</h3>
          <ul className="feature-item-list">
            {group.items.map((item) => {
              if (item.parts && item.parts.length > 0) {
                return (
                  <li key={item.name} className="feature-item-row">
                    <div className="engine-parts-row">
                      {item.parts.map((part, pIdx) => {
                        const isForge =
                          part.image.includes("forge.png") &&
                          !part.image.includes("neoforge");
                        return (
                          <span key={part.name} className="engine-part">
                            {pIdx > 0 && <span className="engine-sep">&amp;</span>}
                            <img
                              src={url(part.image)}
                              alt=""
                              className={`engine-icon ${isForge ? "invert-forge" : ""}`}
                              width="18"
                              height="18"
                              loading="eager"
                            />
                            <span>{part.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </li>
                );
              }

              const hasImages = item.images && item.images.length > 0;
              return (
                <li key={item.name} className="feature-item-row">
                  {hasImages ? (
                    <div className="engine-icon-group" aria-hidden="true">
                      {item.images!.map((imgPath) => {
                        const isForge =
                          imgPath.includes("forge.png") &&
                          !imgPath.includes("neoforge");
                        return (
                          <img
                            key={imgPath}
                            src={url(imgPath)}
                            alt=""
                            className={`engine-icon ${isForge ? "invert-forge" : ""}`}
                            width="18"
                            height="18"
                            loading="eager"
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <span className="feature-icon-wrapper" aria-hidden="true">
                      <Icon name={item.icon || group.icon} size={15} />
                    </span>
                  )}
                  <span className="feature-item-name">{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
export function CommunityPanel() {
  return (
    <div className="community-panel wire">
      <div className="community-left">
        <div className="community-chat">
          <span className="kicker">Chat</span>
          <h3>Good servers start with good company.</h3>
          <p>
            Share your setup, ask a question, or help someone get their first
            world running.
          </p>
          <div className="button-row">
            <a className="button primary" href={discord}>
              <DiscordIcon className="social-icon" />
              Discord
            </a>
            <a
              className="button secondary"
              href="https://www.reddit.com/r/PocketMC/"
            >
              Reddit <Icon name="external" />
            </a>
          </div>
        </div>
        <div className="community-project">
          <span className="kicker">Made in the open</span>
          <p>Built by people who like hosting their own worlds.</p>
          <a href={`${repo}/issues`}>Issues ↗</a>
          <a href={`${repo}/blob/master/CONTRIBUTING.md`}>Contributing ↗</a>
          <a href={url("changelog/")}>Changelog →</a>
        </div>
      </div>
      <div className="community-resources">
        <span className="kicker">Find your way</span>
        {[
          [
            "book",
            "Read the docs",
            "From your first server to your next modpack.",
            url("docs/"),
          ],
          [
            "terminal",
            "Explore the source",
            "Follow development. Make something better.",
            repo,
          ],
          [
            "chat",
            "Ask for help",
            "Troubleshooting and answers to common questions.",
            url("faq/"),
          ],
          [
            "grid",
            "Share what you build",
            "Show your world to the PocketMC community.",
            discord,
          ],
        ].map(([icon, title, text, href]) => (
          <a className="resource-row" href={href} key={title}>
            <Icon name={icon} size={18} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <Icon name="arrow" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-ambient-glow" aria-hidden="true" />
        <div className="page hero-content">
          <HeroLogo size={108} />
          <h1>PocketMC</h1>
          <p className="hero-tagline">Your worlds. Your hardware.</p>
          <div className="button-row hero-cta">
            <a className="button primary" href={url("install/")}>
              <Icon name="download" />
              Install
            </a>
            <a className="button secondary" href={repo}>
              <GithubIcon className="social-icon" />
              Source
            </a>
          </div>
          <p className="hero-fine">
            <a href={url("changelog/#v1.9.10")} className="mono">
              v1.9.10
            </a>
            <b>·</b>
            <span>Free and open source</span>
            <b>·</b>
            <span>Windows, Linux, macOS</span>
            <b>·</b>
            <span>MIT License</span>
          </p>
        </div>
        <div className="signal-band page" aria-hidden="true">
          {Array.from({ length: 81 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${5 + 40 * Math.exp(-Math.pow((i - 40) / 17, 2)) * (0.35 + 0.65 * Math.abs(Math.cos(i * 0.31)))}px`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Hero Video Demo Showcase */}
      <Section className="hero-video-section">
        <div className="page">
          <HeroVideoPlayer />
          <div className="hero-gallery-action">
            <a href={url("gallery/")} className="hero-gallery-pill font-mono">
              <span>View screenshot gallery</span>
              <span className="pill-arrow">→</span>
            </a>
          </div>
        </div>
      </Section>

      <Section id="features">
        <div className="page section-body">
          <SectionHead label="Features" title="What it does" href="features/" />
          <FeatureGrid />
        </div>
      </Section>

      {/* Comparison Section from Commit cfbac0b */}
      <ComparisonSection />

      <Section id="install">
        <div className="page section-body">
          <SectionHead label="Install" title="Step by step" href="install/" />
          <InstallPanel />
        </div>
      </Section>

      <Section id="community">
        <div className="page section-body">
          <SectionHead
            label="Community"
            title="Come say hi"
            href="community/"
          />
          <CommunityPanel />
        </div>
      </Section>
    </>
  );
}
export function InstallPage() {
  return (
    <Section>
      <div className="page standalone">
        <PageHeading
          label="Install"
          title="Make room for your next world."
          description="A native app for the computer you already have. Pick your platform and get started."
        />
        <InstallPanel />
        <div className="install-bottom prose">
          <h2>Before you begin</h2>
          <p>
            You provide the hardware and internet connection. Leave enough
            memory and storage for your server, and keep a separate copy of
            worlds you care about.
          </p>
          <div className="link-pair">
            <a href={url("docs/first-server/")}>
              <span className="kicker">Next step</span>
              <strong>
                Create your first server <Icon name="arrow" />
              </strong>
            </a>
            <a href={url("faq/")}>
              <span className="kicker">Need a hand?</span>
              <strong>
                Installation questions <Icon name="arrow" />
              </strong>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
export function FeaturesPage() {
  return (
    <>
      <Section>
        <div className="page standalone">
          <PageHeading
            label="Features"
            title="Less setup. More Minecraft."
            description="The everyday tools for running a server, together in one desktop app."
          />
          <FeatureGrid />
          <div className="features-gallery-banner">
            <div>
              <h3>Looking for the full interface tour?</h3>
              <p>Explore all 18 application views across Windows desktop and mobile remote control.</p>
            </div>
            <a
              href={url("gallery/")}
              className="button secondary small"
            >
              <Icon name="images" size={14} />
              Open Screenshot Gallery
            </a>
          </div>
          <p className="edition-note">
            The screenshots below show the Windows edition. Features may differ
            on Linux and macOS.
          </p>
        </div>
      </Section>
      {screenshots.map((shot, i) => (
        <Section key={shot.file}>
          <div className="page feature-story">
            <div>
              <span className="kicker">
                0{i + 1} / {shot.label}
              </span>
              <h2>{shot.description.split(". ")[0].replace(/\.$/, "")}.</h2>
              <p>
                {
                  [
                    "Create isolated instances, choose your server engine, and keep an eye on CPU, memory, and players from the dashboard.",
                    "Search and filter the console, send commands, and revisit the last session. Optional AI summaries can help explain logs.",
                    "Browse Modrinth, connect CurseForge with your API key, and manage mods, plugins, and Bedrock packs.",
                    "Schedule backups, set retention, and optionally send copies to Google Drive, Dropbox, or OneDrive.",
                    "Link Playit.gg and map the ports your server needs. Geyser and Floodgate enable cross-play on supported setups.",
                    "Enable the remote dashboard and pair your browser. Grant access to the people and instances you choose.",
                  ][i]
                }
              </p>
              <a
                className="text-link"
                href={url(
                  `docs/${["first-server", "help", "mods", "backups", "tunnels", "remote-control"][i]}/`,
                )}
              >
                Read the guide <Icon name="arrow" />
              </a>
            </div>
            <Screenshot file={shot.file} alt={`PocketMC ${shot.label}`} />
          </div>
        </Section>
      ))}
    </>
  );
}
export function CommunityPage() {
  return (
    <Section>
      <div className="page standalone">
        <PageHeading
          label="Community"
          title="Come say hi."
          description="A small open-source project, and a shared love of building our own worlds."
        />
        <CommunityPanel />
        <div className="community-contribute prose">
          <h2>There’s more than one way to contribute.</h2>
          <p>
            Report a reproducible bug, improve a guide, test a release, or send
            a code contribution. A clear question or a helpful answer is a
            contribution too.
          </p>
          <div className="repository-grid wire">
            <a href={repo}>
              <GithubIcon className="social-icon" />
              <h3>Windows</h3>
              <p>Native WPF desktop application</p>
              <span>Explore repository ↗</span>
            </a>
            <a href={unixRepo}>
              <GithubIcon className="social-icon" />
              <h3>Linux & macOS</h3>
              <p>Cross-platform Avalonia application</p>
              <span>Explore repository ↗</span>
            </a>
          </div>
          <a className="text-link" href="https://www.buymeacoffee.com/sahaj33">
            Support development <Icon name="external" />
          </a>
        </div>
      </div>
    </Section>
  );
}
