import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { WindowsIcon, LinuxIcon, AppleIcon } from "../ui/SocialIcons";
import { CodeBlock, Icon } from "./Primitives";
import { installCommand, repo, unixRepo } from "../../data/site";
import { getAssetUrl as url } from "../../utils/getAssetUrl";

const platforms = [
  { id: "windows", title: "Windows", format: ".exe", icon: WindowsIcon },
  { id: "linux", title: "Linux", format: ".tar.gz", icon: LinuxIcon },
  { id: "macos", title: "macOS", format: ".dmg", icon: AppleIcon },
];
export default function InstallPanel() {
  const [platform, setPlatform] = useState("windows");
  const id = useId();
  function keyboard(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (index + 1) % 3
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (index + 2) % 3
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 2
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setPlatform(platforms[next].id);
    document.getElementById(`${id}-${platforms[next].id}`)?.focus();
  }
  return (
    <div className="install-panel wire">
      <div
        className="platform-tabs"
        role="tablist"
        aria-label="Operating system"
      >
        {platforms.map((p, i) => (
          <button
            key={p.id}
            id={`${id}-${p.id}`}
            role="tab"
            aria-selected={platform === p.id}
            aria-controls={`${id}-panel`}
            tabIndex={platform === p.id ? 0 : -1}
            onClick={() => setPlatform(p.id)}
            onKeyDown={(e) => keyboard(e, i)}
          >
            <p.icon className="social-icon" />
            <span>{p.title}</span>
            <small>{p.format}</small>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${platform}`}
        className="install-steps"
        tabIndex={0}
      >
        {platform === "windows" ? (
          <>
            <div className="install-step">
              <span className="step-number">01</span>
              <div>
                <h3>Download and run the installer</h3>
                <a
                  className="download-file"
                  href={`${repo}/releases/latest/download/PocketMC-win-Setup.exe`}
                >
                  <code>PocketMC-win-Setup.exe</code>
                  <Icon name="download" />
                </a>
                <p>For Windows 10 (1809+) and Windows 11.</p>
              </div>
            </div>
            <div className="install-step">
              <span className="step-number">02</span>
              <div>
                <h3>Choose a home for your servers</h3>
                <p>
                  Open PocketMC and select your app root. Pick a writable folder
                  with enough space for your worlds and backups.
                </p>
              </div>
            </div>
            <div className="install-step">
              <span className="step-number">03</span>
              <div>
                <h3>Create your first instance</h3>
                <p>
                  Select your server software and Minecraft version. PocketMC
                  takes care of the server download and Java runtime.
                </p>
                <a className="text-link" href={url("docs/first-server/")}>
                  Follow the getting started guide <Icon name="arrow" />
                </a>
              </div>
            </div>
            <p className="install-note">
              Free and open source. No subscription.{" "}
              <a href={`${repo}/releases`}>All Windows releases ↗</a>
            </p>
          </>
        ) : (
          <>
            <div className="install-step">
              <span className="step-number">01</span>
              <div>
                <h3>
                  {platform === "macos"
                    ? "Download the macOS app"
                    : "Install with the universal installer"}
                </h3>
                {platform === "macos" ? (
                  <div className="download-options">
                    <a
                      className="download-file"
                      href={`${unixRepo}/releases/latest/download/PocketMC-osx-arm64.dmg`}
                    >
                      <span>
                        Apple Silicon <code>.dmg</code>
                      </span>
                      <Icon name="download" />
                    </a>
                    <a
                      className="download-file"
                      href={`${unixRepo}/releases/latest/download/PocketMC-osx-x64.dmg`}
                    >
                      <span>
                        Intel <code>.dmg</code>
                      </span>
                      <Icon name="download" />
                    </a>
                  </div>
                ) : (
                  <CodeBlock code={installCommand} />
                )}
                <p>
                  {platform === "macos"
                    ? "Open the disk image and drag PocketMC into Applications."
                    : "The installer downloads and sets up the Linux edition. Review the script before running it."}
                </p>
              </div>
            </div>
            <div className="install-step">
              <span className="step-number">02</span>
              <div>
                <h3>
                  {platform === "macos"
                    ? "Or use the universal installer"
                    : "Prefer a manual install?"}
                </h3>
                {platform === "macos" ? (
                  <CodeBlock code={installCommand} />
                ) : (
                  <a
                    className="download-file"
                    href={`${unixRepo}/releases/latest`}
                  >
                    <span>Browse Linux release archives</span>
                    <Icon name="external" />
                  </a>
                )}
                <p>
                  Choose a build for your system architecture, then create an
                  instance in PocketMC.
                </p>
              </div>
            </div>
            <p className="install-note">
              Linux and macOS are maintained in a separate repository.{" "}
              <a href={`${unixRepo}/blob/main/README.md`}>
                Platform instructions ↗
              </a>
            </p>
          </>
        )}
        <noscript>
          <p className="install-note">
            JavaScript is off.{" "}
            <a href={`${unixRepo}/releases/latest`}>
              Download Linux or macOS builds
            </a>{" "}
            or{" "}
            <a href={`${unixRepo}/blob/main/README.md`}>
              read their installation instructions
            </a>
            .
          </p>
        </noscript>
      </div>
    </div>
  );
}
