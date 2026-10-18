import type { ReactNode } from "react";
import { docs, developerDocs, repo } from "../data/site";
import {
  CodeBlock,
  Icon,
  Screenshot,
  Section,
} from "../components/site/Primitives";
import DocSearch from "../components/site/DocSearch";
import { getAssetUrl as url } from "../utils/getAssetUrl";
import ApiDocsPage from "./docs/ApiDocsPage";
import AuthDocsPage from "./docs/AuthDocsPage";
import McpDocsPage from "./docs/McpDocsPage";
import WebhooksDocsPage from "./docs/WebhooksDocsPage";

const allDocs = [...docs, ...developerDocs];
const groups = [...new Set(allDocs.map((doc) => doc.group))];
function Sidebar({ slug }: { slug: string }) {
  return (
    <>
      {groups.map((group) => (
        <div className="docs-group" key={group}>
          <span className="kicker">{group}</span>
          {allDocs
            .filter((doc) => doc.group === group)
            .map((doc) => (
              <a
                key={doc.slug}
                href={url(`docs/${doc.slug}/`)}
                aria-current={doc.slug === slug ? "page" : undefined}
              >
                {doc.title}
              </a>
            ))}
        </div>
      ))}
    </>
  );
}
export default function DocumentationPage({ slug }: { slug: string }) {
  const doc = docs.find((item) => item.slug === slug);
  const current = allDocs.find((item) => item.slug === slug)!;
  const index = allDocs.findIndex((item) => item.slug === slug);
  const references: Record<string, ReactNode> = {
    api: <ApiDocsPage />,
    auth: <AuthDocsPage />,
    mcp: <McpDocsPage />,
    webhooks: <WebhooksDocsPage />,
  };
  return (
    <Section>
      <div className="page docs-layout">
        <aside className="docs-sidebar">
          <div className="sticky-rail">
            <DocSearch />
            <nav className="docs-desktop-nav" aria-label="Documentation">
              <Sidebar slug={slug} />
            </nav>
            <details className="docs-picker">
              <summary>
                {current.group}
                <span>/</span>
                <strong>{current.title}</strong>
                <Icon name="chevron" />
              </summary>
              <nav aria-label="Documentation pages">
                <Sidebar slug={slug} />
              </nav>
            </details>
          </div>
        </aside>
        <div className="docs-main">
          {doc ? (
            <article className="prose">
              <header>
                <h1>{doc.title}</h1>
                <p className="summary">{doc.description}</p>
              </header>
              {doc.sections.map((section, i) => (
                <section key={section.title} id={`section-${i}`}>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.code && <CodeBlock code={section.code} />}
                  {section.image && (
                    <Screenshot
                      file={section.image}
                      alt={`PocketMC - ${section.title}`}
                    />
                  )}
                </section>
              ))}
              {slug === "introduction" && (
                <section>
                  <h2>What’s in the docs</h2>
                  <div className="docs-directory">
                    {docs.slice(1).map((item) => (
                      <a href={url(`docs/${item.slug}/`)} key={item.slug}>
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                        <Icon name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </article>
          ) : (
            <article className="legacy-prose">{references[slug]}</article>
          )}
          <a className="source-link" href={`${repo}/blob/master/README.md`}>
            <Icon name="book" size={14} />
            Read the product documentation on GitHub
          </a>
          <nav
            className="docs-pager"
            aria-label="Previous and next documentation pages"
          >
            {index > 0 && (
              <a href={url(`docs/${allDocs[index - 1].slug}/`)}>
                <span className="kicker">Previous</span>
                {allDocs[index - 1].title}
              </a>
            )}
            {index < allDocs.length - 1 && (
              <a
                className="next"
                href={url(`docs/${allDocs[index + 1].slug}/`)}
              >
                <span className="kicker">Next</span>
                {allDocs[index + 1].title}
              </a>
            )}
          </nav>
        </div>
        <aside className="docs-outline">
          <div className="sticky-rail">
            <span className="kicker">On this page</span>
            {doc ? (
              doc.sections.map((section, i) => (
                <a key={section.title} href={`#section-${i}`}>
                  {section.title}
                </a>
              ))
            ) : (
              <>
                <a href={url("docs/")}>Documentation home</a>
                <a href={url("docs/help/")}>Get help</a>
              </>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}
