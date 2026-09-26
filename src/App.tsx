import { useState, useEffect, useCallback } from "react";
import type { ProofModalData, LightboxData } from "./types";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import DocsPage from "./pages/DocsPage";
import ApiDocsPage from "./pages/docs/ApiDocsPage";
import AuthDocsPage from "./pages/docs/AuthDocsPage";
import McpDocsPage from "./pages/docs/McpDocsPage";
import WebhooksDocsPage from "./pages/docs/WebhooksDocsPage";
import LightboxModal from "./components/ui/LightboxModal";
import ProofModal from "./components/ui/ProofModal";

export type RouteName =
  | "home"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "docs"
  | "docs-api"
  | "docs-auth"
  | "docs-mcp"
  | "docs-webhooks";

function getRouteFromPath(pathname: string): RouteName {
  const clean = pathname
    .replace(/^\/pocket-mc-website\/?/, "")
    .replace(/^\//, "")
    .replace(/\/$/, "");

  if (clean === "about") return "about";
  if (clean === "contact") return "contact";
  if (clean === "privacy") return "privacy";
  if (clean === "terms") return "terms";
  if (clean === "docs/api" || clean === "docs-api") return "docs-api";
  if (clean === "docs/auth" || clean === "docs-auth") return "docs-auth";
  if (clean === "docs/mcp" || clean === "docs-mcp") return "docs-mcp";
  if (clean === "docs/webhooks" || clean === "docs-webhooks") return "docs-webhooks";
  if (clean === "docs" || clean.startsWith("docs/")) return "docs";
  return "home";
}

function getPathFromRoute(route: RouteName): string {
  switch (route) {
    case "home":
      return "/pocket-mc-website/";
    case "docs-api":
      return "/pocket-mc-website/docs/api/";
    case "docs-auth":
      return "/pocket-mc-website/docs/auth/";
    case "docs-mcp":
      return "/pocket-mc-website/docs/mcp/";
    case "docs-webhooks":
      return "/pocket-mc-website/docs/webhooks/";
    default:
      return `/pocket-mc-website/${route}/`;
  }
}

const PAGE_TITLES: Record<RouteName, string> = {
  home: "PocketMC - The #1 Free Local Minecraft Server Manager for Windows, Linux & Mac",
  about: "About PocketMC - Free & Open Source Local Minecraft Server Manager",
  contact: "Contact & Support - PocketMC",
  privacy: "Privacy & Security Policy - PocketMC",
  terms: "Terms of Service - PocketMC",
  docs: "PocketMC Developer Portal - API, Auth, Webhooks & MCP",
  "docs-api": "REST API Reference - PocketMC Developer Portal",
  "docs-auth": "Authentication & Security - PocketMC Developer Portal",
  "docs-mcp": "Model Context Protocol (MCP) - PocketMC Developer Portal",
  "docs-webhooks": "Webhooks & Events - PocketMC Developer Portal",
};

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [currentRoute, setCurrentRoute] = useState<RouteName>(() => {
    if (typeof window !== "undefined") {
      return getRouteFromPath(window.location.pathname);
    }
    return "home";
  });

  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [proofModalData, setProofModalData] = useState<ProofModalData | null>(null);

  // Sync theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync route and document title
  useEffect(() => {
    document.title = PAGE_TITLES[currentRoute] || PAGE_TITLES.home;
  }, [currentRoute]);

  // Navigation function
  const navigate = useCallback((routeInput: string) => {
    const route = getRouteFromPath(
      routeInput.startsWith("/") ? routeInput : `/pocket-mc-website/${routeInput}`
    );
    const targetPath = getPathFromRoute(route);

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen text-main relative z-0 bg-base">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentRoute={currentRoute}
        onNavigate={navigate}
      />
      <div className="h-14 sm:h-16" aria-hidden="true" />

      {currentRoute === "home" && (
        <HomePage
          onOpenLightbox={(data) => setLightboxData(data)}
          onOpenProofModal={(data) => setProofModalData(data)}
        />
      )}

      {currentRoute === "about" && <AboutPage navigate={navigate} />}
      {currentRoute === "contact" && <ContactPage navigate={navigate} />}
      {currentRoute === "privacy" && <PrivacyPage navigate={navigate} />}
      {currentRoute === "terms" && <TermsPage navigate={navigate} />}
      {currentRoute === "docs" && <DocsPage navigate={navigate} />}
      {currentRoute === "docs-api" && <ApiDocsPage navigate={navigate} />}
      {currentRoute === "docs-auth" && <AuthDocsPage navigate={navigate} />}
      {currentRoute === "docs-mcp" && <McpDocsPage navigate={navigate} />}
      {currentRoute === "docs-webhooks" && <WebhooksDocsPage navigate={navigate} />}

      <Footer
        onOpenTerms={() => navigate("terms")}
        onOpenPrivacy={() => navigate("privacy")}
        onNavigate={navigate}
      />

      {/* Global Modals */}
      <LightboxModal
        lightboxData={lightboxData}
        onClose={() => setLightboxData(null)}
      />

      <ProofModal
        proofModalData={proofModalData}
        onClose={() => setProofModalData(null)}
      />
    </div>
  );
}

export default App;
