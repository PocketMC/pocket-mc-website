import { useEffect, useRef, useState } from "react";
import { docs, developerDocs, faqGroups } from "../../data/site";
import { getAssetUrl as url } from "../../utils/getAssetUrl";
import { Icon } from "./Primitives";

const entries = [
  ...docs.flatMap((doc) => [
    {
      title: doc.title,
      context: doc.group,
      text: doc.description,
      href: `docs/${doc.slug}/`,
    },
    ...doc.sections.map((section, i) => ({
      title: section.title,
      context: doc.title,
      text: `${section.text} ${section.bullets?.join(" ") || ""}`,
      href: `docs/${doc.slug}/#section-${i}`,
    })),
  ]),
  ...developerDocs.map((doc) => ({
    title: doc.title,
    context: doc.group,
    text: doc.title,
    href: `docs/${doc.slug}/`,
  })),
  ...faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      title: item.q,
      context: "FAQ",
      text: item.a,
      href: `faq/#${item.id}`,
    })),
  ),
];
export default function DocSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const results = entries
    .filter((entry) =>
      `${entry.title} ${entry.text}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .slice(0, 12);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else dialog.current?.showModal();
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <>
      <button
        className="search-trigger"
        onClick={() => dialog.current?.showModal()}
      >
        <Icon name="search" size={14} />
        <span>Search docs</span>
        <kbd>Ctrl K</kbd>
      </button>
      <dialog
        className="search-dialog"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="search-input-row">
          <Icon name="search" />
          <input
            autoFocus
            aria-label="Search documentation and FAQ"
            placeholder="Search documentation and FAQ…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="icon-button"
            aria-label="Close search"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="search-results">
          <p className="kicker" role="status">
            {query
              ? `${results.length} matching results`
              : "Explore the documentation"}
          </p>
          {results.length ? (
            results.map((result) => (
              <a key={result.href + result.title} href={url(result.href)}>
                <span>{result.context}</span>
                <strong>{result.title}</strong>
                <p>
                  {result.text.slice(0, 130)}
                  {result.text.length > 130 ? "…" : ""}
                </p>
              </a>
            ))
          ) : (
            <p className="empty-state">
              No results for “{query}”. Try “backups”, “Java”, or “tunnels”.
            </p>
          )}
        </div>
        <div className="search-hint">
          Tab to move between results · Enter to open · Esc to close
        </div>
      </dialog>
    </>
  );
}
