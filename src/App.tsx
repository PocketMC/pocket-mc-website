import { useEffect } from "react";
import { SiteFooter, SiteHeader } from "./components/site/SiteLayout";
import { PageHeading, Section } from "./components/site/Primitives";
import {
  CommunityPage,
  FeaturesPage,
  Home,
  InstallPage,
} from "./pages/ProductPages";
import { ChangelogPage, FaqPage } from "./pages/HelpPages";
import GalleryPage from "./pages/GalleryPage";
import DocumentationPage from "./pages/DocumentationPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import { routes } from "./data/routes";
import { getAssetUrl as url } from "./utils/getAssetUrl";

export default function App({ pathname }: { pathname?: string }) {
  let raw =
    pathname ??
    (typeof window === "undefined" ? "/" : window.location.pathname);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && (raw === base || raw.startsWith(`${base}/`)))
    raw = raw.slice(base.length);
  raw = raw
    .replace(/\/index\.html$/, "/")
    .replace(/^\/docs-(api|auth|mcp|webhooks)\/?$/, "/docs/$1/");
  const path = `/${raw.split("/").filter(Boolean).join("/")}${raw.split("/").filter(Boolean).length ? "/" : ""}`;
  const route = routes.find((item) => item.path === path);
  useEffect(() => {
    document.title = route?.title || "Page not found · PocketMC";
  }, [route]);
  let content;
  if (path === "/") content = <Home />;
  else if (path === "/install/") content = <InstallPage />;
  else if (path === "/features/") content = <FeaturesPage />;
  else if (path === "/gallery/") content = <GalleryPage />;
  else if (path === "/community/") content = <CommunityPage />;
  else if (path === "/faq/") content = <FaqPage />;
  else if (path === "/changelog/") content = <ChangelogPage />;
  else if (route && path.startsWith("/docs/"))
    content = <DocumentationPage slug={path.split("/")[2] || "introduction"} />;
  else if (["/about/", "/contact/", "/privacy/", "/terms/"].includes(path))
    content = (
      <Section>
        <div className="page standalone legacy-page">
          <span className="kicker">{path.replaceAll("/", "")}</span>
          <div className="legacy-prose">
            {path === "/about/" ? (
              <AboutPage />
            ) : path === "/contact/" ? (
              <ContactPage />
            ) : path === "/privacy/" ? (
              <PrivacyPage />
            ) : (
              <TermsPage />
            )}
          </div>
        </div>
      </Section>
    );
  else
    content = (
      <Section>
        <div className="page standalone not-found">
          <PageHeading
            label="404"
            title="This world hasn’t been generated."
            description="The page you’re looking for doesn’t exist. Let’s get you back to familiar ground."
          />
          <div className="button-row">
            <a className="button primary" href={url("")}>
              Back to home
            </a>
            <a className="button secondary" href={url("docs/")}>
              Read the docs
            </a>
          </div>
          <p className="recovery-index">
            404 Recovery Index: <a href={url("llms.txt")}>Markdown guide</a> ·{" "}
            <a href={url("sitemap.xml")}>Sitemap</a>
          </p>
        </div>
      </Section>
    );
  return (
    <>
      <SiteHeader path={path} />
      <div className="page-column">
        <main id="main" tabIndex={-1}>
          {content}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
