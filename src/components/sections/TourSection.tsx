import { useState } from "react";
import type { TouchEvent } from "react";
import { Skeleton } from "../ui/skeleton";
import { tourTabs } from "../../data/tourTabs";
import { getAssetUrl } from "../../utils/getAssetUrl";
import Dock from "../Dock";
import type { LightboxData } from "../../types";

interface TourSectionProps {
  isLoading: boolean;
  onOpenLightbox: (data: LightboxData) => void;
}

export default function TourSection({ isLoading, onOpenLightbox }: TourSectionProps) {
  const [activeTourTab, setActiveTourTab] = useState("dashboard");

  // Swipe controls for mobile screenshots
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handlePrevTab = () => {
    const currentIndex = tourTabs.findIndex((t) => t.id === activeTourTab);
    const prevIndex = (currentIndex - 1 + tourTabs.length) % tourTabs.length;
    setActiveTourTab(tourTabs[prevIndex].id);
  };

  const handleNextTab = () => {
    const currentIndex = tourTabs.findIndex((t) => t.id === activeTourTab);
    const nextIndex = (currentIndex + 1) % tourTabs.length;
    setActiveTourTab(tourTabs[nextIndex].id);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      e.stopPropagation();
      if (isLeftSwipe) {
        handleNextTab();
      } else {
        handlePrevTab();
      }
    }
  };

  const activeTabDetails =
    tourTabs.find((t) => t.id === activeTourTab) || tourTabs[0];

  const openLightboxForTab = (tabId: string, imageIndex: number = 0) => {
    const currentTab = tourTabs.find((t) => t.id === tabId) || tourTabs[0];
    
    const src =
      currentTab.images && currentTab.images.length > 0
        ? currentTab.images[imageIndex]
        : currentTab.image || "";

    const currentTabIdx = tourTabs.findIndex((t) => t.id === tabId);

    const onPrev = () => {
      if (currentTab.images && currentTab.images.length > 0 && imageIndex > 0) {
        openLightboxForTab(tabId, imageIndex - 1);
      } else {
        const prevTabIdx = (currentTabIdx - 1 + tourTabs.length) % tourTabs.length;
        const prevTab = tourTabs[prevTabIdx];
        const prevImgIdx = prevTab.images ? prevTab.images.length - 1 : 0;
        setActiveTourTab(prevTab.id);
        openLightboxForTab(prevTab.id, prevImgIdx);
      }
    };

    const onNext = () => {
      if (currentTab.images && currentTab.images.length > 0 && imageIndex < currentTab.images.length - 1) {
        openLightboxForTab(tabId, imageIndex + 1);
      } else {
        const nextTabIdx = (currentTabIdx + 1) % tourTabs.length;
        const nextTab = tourTabs[nextTabIdx];
        setActiveTourTab(nextTab.id);
        openLightboxForTab(nextTab.id, 0);
      }
    };

    onOpenLightbox({
      src,
      label: currentTab.label,
      title: currentTab.title,
      alt: currentTab.images ? `${currentTab.alt} ${imageIndex + 1}` : currentTab.alt,
      onPrev,
      onNext,
    });
  };

  const dockItems = tourTabs.map((tab) => {
    const isActive = activeTourTab === tab.id;
    const tabIcon = {
      dashboard: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      console: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
      tunnels: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      plugins: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      backups: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      runtimes: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      remote: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      mobile: (
        <svg
          className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-main-muted group-hover:text-accent"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    }[tab.id] || <span>🔍</span>;

    return {
      icon: tabIcon,
      label: tab.label,
      onClick: () => setActiveTourTab(tab.id),
      className: isActive
        ? "!border-main border-b-2 font-bold !text-main"
        : "border-b-2 border-transparent",
    };
  });

  return (
    <section
      id="servers"
      className="relative z-10 border-y border-divider bg-base-muted/20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest bg-base-muted/60 px-3 py-1 rounded inline-block">
            APPLICATION TOUR
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
            Inspect every interface.
          </h2>
          <p
            className="mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl"
            style={{ color: "var(--main-muted)" }}
          >
            Explore the actual WPF app views. Each screen was crafted from
            the ground up for Windows, delivering a clean desktop
            experience.
          </p>
        </div>

        {/* Display active screenshot mock with details */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {isLoading ? (
            <>
              {/* Screenshot Skeleton */}
              <div className="border border-divider bg-base-card rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl">
                <div className="h-7 border-b border-divider bg-base-muted/40 px-4 flex items-center gap-1.5">
                  <Skeleton className="w-3.5 h-3.5 rounded-full" />
                  <Skeleton className="w-3.5 h-3.5 rounded-full" />
                  <Skeleton className="w-3.5 h-3.5 rounded-full" />
                  <Skeleton className="h-3 w-40 rounded ml-2" />
                </div>
                <Skeleton className="w-full aspect-[16/10] rounded-none" />
              </div>

              {/* Details Card Skeleton */}
              <div className="mt-8 border border-divider bg-base-card/60 backdrop-blur p-8 rounded-xl shadow-sm">
                <Skeleton className="h-6 w-48 rounded mb-4" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-5/6 rounded mb-6" />

                <div className="grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Skeleton className="w-4 h-4 rounded flex-shrink-0 mt-0.5" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border border-divider bg-base-card rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl glow-shadow-accent group relative theme-transition">
                <div className="h-7 border-b border-divider bg-base-muted/40 px-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-divider dark:bg-divider"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-divider dark:bg-divider"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-divider dark:bg-divider"></span>
                    <span className="text-[10px] font-mono text-main-muted ml-2">
                      {activeTabDetails.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono border border-divider px-1.5 py-0.5 rounded bg-base-muted/20 text-main-muted/80">
                    WPF View
                  </span>
                </div>
                <div
                  className="relative bg-base-muted/10 overflow-hidden w-full"
                  onTouchStart={activeTabDetails.images ? undefined : onTouchStart}
                  onTouchMove={activeTabDetails.images ? undefined : onTouchMove}
                  onTouchEnd={activeTabDetails.images ? undefined : onTouchEnd}
                >
                  {activeTabDetails.images ? (
                    <div className={`w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 p-4 sm:p-6 md:grid ${
                      activeTabDetails.images.length === 4 ? 'md:grid-cols-4' : 
                      activeTabDetails.images.length === 3 ? 'md:grid-cols-3' : 
                      'md:grid-cols-2'
                    }`}>
                      {activeTabDetails.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="relative group/screen cursor-zoom-in overflow-hidden rounded-md border border-divider/50 shadow-sm flex-shrink-0 w-[85%] sm:w-[65%] md:w-full snap-center bg-base-muted/5 flex items-center justify-center"
                          onClick={() => openLightboxForTab(activeTourTab, idx)}
                        >
                          <img
                            src={getAssetUrl(img)}
                            alt={`${activeTabDetails.alt} ${idx + 1}`}
                            className="w-full h-auto block transition-all duration-700 group-hover/screen:brightness-[0.95] select-none"
                            loading="lazy"
                          />
                          {/* Zoom Indicator */}
                          <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 bg-base-card/95 backdrop-blur-sm border border-divider p-1.5 rounded-md shadow-lg pointer-events-none">
                            <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div 
                      className="relative cursor-zoom-in group/screen w-full"
                      onClick={() => openLightboxForTab(activeTourTab, 0)}
                    >
                      <img
                        src={getAssetUrl(activeTabDetails.image || "")}
                        alt={activeTabDetails.alt}
                        className="w-full h-auto block transition-all duration-700 group-hover/screen:brightness-[0.98] select-none"
                        key={activeTourTab} // forces element reload for animation
                      />
                      {/* Zoom Indicator Badge in Bottom-Right */}
                      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 bg-base-card/95 backdrop-blur-sm border border-divider px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-none select-none">
                        <svg
                          className="w-3.5 h-3.5 text-accent animate-pulse"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                        <span className="text-[10px] font-mono font-bold text-main">
                          Click to view full size
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Prev/Next buttons overlay for mobile devices */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevTab();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-base-card/85 backdrop-blur-sm text-main hover:bg-base-muted/80 transition-all shadow-md active:scale-95 md:hidden"
                    aria-label="Previous screenshot"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextTab();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-base-card/85 backdrop-blur-sm text-main hover:bg-base-muted/80 transition-all shadow-md active:scale-95 md:hidden"
                    aria-label="Next screenshot"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Floating Application Navigation Dock (Desktop Only) */}
              <div
                className="hidden md:flex relative mt-6 justify-center"
                style={{ minHeight: "80px" }}
              >
                <Dock items={dockItems} />
              </div>

              {/* Normal Screenshot Changing Navigation for Mobile Devices */}
              <div className="flex md:hidden flex-col gap-3 mt-4">
                {/* Horizontal Scrollable Tabs */}
                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none mask-fade-edges px-1">
                  {tourTabs.map((tab) => {
                    const isActive = activeTourTab === tab.id;
                    const tabIcon = {
                      dashboard: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                      ),
                      console: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="4 17 10 11 4 5" />
                          <line x1="12" y1="19" x2="20" y2="19" />
                        </svg>
                      ),
                      tunnels: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ),
                      plugins: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      ),
                      backups: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      ),
                      runtimes: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      ),
                      remote: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      ),
                      mobile: (
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-accent" : "text-main-muted"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      ),
                    }[tab.id] || <span>🔍</span>;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTourTab(tab.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? "border-b-2 border-main text-main font-bold"
                            : "border-b-2 border-transparent text-main-muted active:bg-base-muted/40"
                        }`}
                      >
                        {tabIcon}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dot Page Indicator for mobile */}
                <div className="flex justify-center gap-2 mt-1">
                  {tourTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTourTab(tab.id)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTourTab === tab.id
                          ? "w-6 bg-accent"
                          : "w-2 bg-divider hover:bg-main-muted/50"
                      }`}
                      aria-label={`Go to ${tab.label} screenshot`}
                    />
                  ))}
                </div>
              </div>

              {/* Screenshot Details Info Card */}
              <div className="w-full">
                <div className="border border-divider bg-base-card/65 backdrop-blur-md p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-black text-main flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    {activeTabDetails.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-main-muted">
                    {activeTabDetails.description}
                  </p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {activeTabDetails.bullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs font-mono text-main-muted"
                      >
                        <svg
                          className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
