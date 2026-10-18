import { useEffect, useState } from "react";
import DocSearch from "../components/site/DocSearch";
import { Icon, PageHeading, Section } from "../components/site/Primitives";
import { faqGroups, repo, unixRepo } from "../data/site";
import { getAssetUrl as url } from "../utils/getAssetUrl";

export function FaqPage() {
  const [open, setOpen] = useState("");
  useEffect(() => {
    const reveal = () => setOpen(location.hash.slice(1));
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return (
    <Section>
      <div className="page standalone faq-page">
        <PageHeading
          label="FAQ"
          title="A little help goes a long way."
          description="Answers to the questions that come up most. If yours isn’t here, the console log is a good place to start."
        />
        <DocSearch />
        {faqGroups.map((group) => (
          <section className="faq-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="questions">
              {group.items.map((item) => (
                <div className="question" id={item.id} key={item.id}>
                  <h3>
                    <button
                      aria-expanded={open === item.id}
                      aria-controls={`answer-${item.id}`}
                      onClick={() => setOpen(open === item.id ? "" : item.id)}
                    >
                      {item.q}
                      <Icon name="chevron" />
                    </button>
                  </h3>
                  <div id={`answer-${item.id}`} hidden={open !== item.id}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        <p className="help-note">
          Still stuck? <a href={url("docs/help/")}>See Getting help</a> or{" "}
          <a href={url("community/")}>ask the community</a>.
        </p>
      </div>
    </Section>
  );
}

const releases = [
  {
    version: "v1.9.10",
    date: "2026-09-30",
    title: "News, model management, and safer settings",
    summary:
      "In-app announcements, more control over local Ollama models, and improvements to runtime and settings recovery.",
    groups: [
      {
        name: "Added",
        items: [
          "An in-app News page with cached announcements, unread counts, and notifications.",
          "Installed, Download, and Manual tabs for local Ollama models, including model deletion and cancellable downloads.",
        ],
      },
      {
        name: "Improved",
        items: [
          "Playit runtime compatibility checks and staged repair while retaining agent credentials.",
          "Structured settings migration that preserves existing preferences, unknown fields, and protected credentials.",
        ],
      },
      {
        name: "Fixed",
        items: [
          "Appearance preferences being replaced during settings migration.",
          "Restoring a maximized window as a large normal window.",
        ],
      },
    ],
  },
  {
    version: "v1.9.9",
    date: "2026-09-26",
    title: "Scheduled reboots and a more personal desktop",
    summary:
      "Maintenance scheduling, persistent AI summaries, and a set of improvements to everyday server management.",
    groups: [
      {
        name: "Added",
        items: [
          "Scheduled server reboots with staged in-game countdown warnings.",
          "Built-in Ollama model management and cached AI session summaries.",
          "A dedicated Playit console and customizable Discord Rich Presence.",
        ],
      },
      {
        name: "Improved",
        items: [
          "Add-on context menus and direct access to configuration folders.",
          "Wallpaper blur and dimming controls, window restoration, and console concurrency.",
        ],
      },
    ],
  },
  {
    version: "v1.9.8",
    date: "2026-08-21",
    title: "Safer add-on management",
    summary:
      "More control over add-on inventory and clearer upload diagnostics.",
    groups: [
      {
        name: "Improved",
        items: [
          "Removed background auto-deletion from add-on inventory management.",
          "Local add-on upload diagnostics with explicit user-choice overrides.",
          "Clearer warning badges and more accurate delta-update download sizes.",
        ],
      },
      {
        name: "Fixed",
        items: ["Windows auto-hide taskbar reveal when the app is maximized."],
      },
    ],
  },
];
export function ChangelogPage() {
  return (
    <Section>
      <div className="page standalone changelog-page">
        <PageHeading
          label="Changelog"
          title="What’s new in PocketMC"
          description="Updates, improvements, and fixes from the Windows project changelog."
        />
        <p className="release-source">
          Selected release notes.{" "}
          <a href={`${repo}/releases`}>See all releases on GitHub ↗</a>
          <br />
          <a href={`${unixRepo}/releases`}>Linux & macOS release history ↗</a>
        </p>
        <div className="releases">
          {releases.map((release) => (
            <article
              id={release.version}
              className="release"
              key={release.version}
            >
              <div className="release-meta">
                <div className="sticky-rail">
                  <a className="release-version" href={`#${release.version}`}>
                    {release.version}
                  </a>
                  <time dateTime={release.date}>
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                      timeZone: "UTC",
                    }).format(new Date(`${release.date}T00:00:00Z`))}
                  </time>
                  <span>Windows</span>
                  <a href={`${repo}/releases/tag/${release.version}`}>
                    Release notes ↗
                  </a>
                </div>
              </div>
              <div className="prose release-body">
                <h2>{release.title}</h2>
                <p>{release.summary}</p>
                {release.groups.map((group) => (
                  <div key={group.name}>
                    <h3>
                      <Icon
                        name={
                          group.name === "Fixed"
                            ? "settings"
                            : group.name === "Added"
                              ? "grid"
                              : "arrow"
                        }
                      />
                      {group.name}
                    </h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <a
          className="button secondary"
          href={`${repo}/blob/master/CHANGELOG.md`}
        >
          Read the full changelog <Icon name="external" />
        </a>
      </div>
    </Section>
  );
}
