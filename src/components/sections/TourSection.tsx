import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Preload all screenshot images on mount for instant switching without flickering
  useEffect(() => {
    const imagesToPreload: string[] = [];
    tourTabs.forEach((tab) => {
      if (tab.image) imagesToPreload.push(tab.image);
      if (tab.images) imagesToPreload.push(...tab.images);
    });

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = getAssetUrl(src);
    });
  }, []);

  // Swipe controls for mobile screenshots
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handlePrevTab = useCallback(() => {
    setActiveTourTab((current) => {
      const currentIndex = tourTabs.findIndex((t) => t.id === current);
      const prevIndex = (currentIndex - 1 + tourTabs.length) % tourTabs.length;
      return tourTabs[prevIndex].id;
    });
  }, []);

  const handleNextTab = useCallback(() => {
    setActiveTourTab((current) => {
      const currentIndex = tourTabs.findIndex((t) => t.id === current);
      const nextIndex = (currentIndex + 1) % tourTabs.length;
      return tourTabs[nextIndex].id;
    });
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
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

  const activeTabDetails = useMemo(() => {
    return tourTabs.find((t) => t.id === activeTourTab) || tourTabs[0];
  }, [activeTourTab]);

  const openLightboxForTab = useCallback((tabId: string, imageIndex: number = 0) => {
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
  }, [onOpenLightbox]);

  const dockItems = useMemo(() => {
    return tourTabs.map((tab) => {
      const isActive = activeTourTab === tab.id;
      const tabIcon = {
        dashboard: (
          <svg
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        ),
        tunnels: (
          <svg
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        ),
        themes: (
          <svg
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879a1.002 1.002 0 0 0 1.062-.731c.214-.77.828-1.378 1.604-1.579a3.003 3.003 0 0 1 3.483 1.944.999.999 0 0 0 .972.7c3.551-.518 6.441-3.414 6.441-7.213 0-5.523-4.477-10-10-10z" />
          </svg>
        ),
        settings: (
          <svg
            className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted group-hover:text-main"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      }[tab.id] || (
        <svg
          className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-main" : "text-main-muted"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
        </svg>
      );

      return {
        icon: tabIcon,
        label: tab.label,
        onClick: () => setActiveTourTab(tab.id),
        className: isActive
          ? "!border-main !bg-base-card shadow-sm font-bold !text-main"
          : "border-transparent text-main-muted",
      };
    });
  }, [activeTourTab]);

  return (
    <section
      id="screenshots"
      className="relative z-10 border-y border-divider bg-base-muted/20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-main">
            Explore every screen.
          </h2>
        </div>

        {/* Display active screenshot mock with details */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {isLoading ? (
            <>
              {/* Screenshot Skeleton */}
              <div className="border border-divider bg-base-card rounded-xl overflow-hidden shadow-lg">
                <div className="h-8 border-b border-divider bg-base-muted/40 px-4 flex items-center gap-1.5">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-3 w-40 rounded ml-2" />
                </div>
                <Skeleton className="w-full aspect-[16/9] rounded-none" />
              </div>

              {/* Details Card Skeleton */}
              <div className="mt-6 border border-divider bg-base-card p-8 rounded-xl shadow-sm">
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
              <div className="border border-divider bg-base-card rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group relative">
                {/* Title Bar with controls for multi-image tabs */}
                <div className="h-8 border-b border-divider bg-base-muted/50 px-3 sm:px-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-divider"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-divider"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-divider"></span>
                    <span className="text-[11px] font-mono text-main-muted ml-2 font-medium truncate max-w-[180px] sm:max-w-none">
                      {activeTabDetails.title}
                    </span>
                  </div>

                  {activeTabDetails.images && (
                    <div className="flex items-center gap-2 font-mono text-[11px] text-main-muted">
                      <span className="hidden sm:inline text-[10px] opacity-75">
                        {activeTabDetails.images.length} screens
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={scrollLeft}
                          className="h-5 w-5 rounded flex items-center justify-center bg-base-muted border border-divider text-main-muted hover:text-main transition-colors cursor-pointer"
                          aria-label="Scroll gallery left"
                          title="Scroll left"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={scrollRight}
                          className="h-5 w-5 rounded flex items-center justify-center bg-base-muted border border-divider text-main-muted hover:text-main transition-colors cursor-pointer"
                          aria-label="Scroll gallery right"
                          title="Scroll right"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Fixed 16:9 Viewport Canvas - Theme Adaptive */}
                <div
                  className="relative bg-base-muted/30 dark:bg-black/60 w-full aspect-[16/9] overflow-hidden flex items-center justify-center select-none"
                  onTouchStart={activeTabDetails.images ? undefined : onTouchStart}
                  onTouchMove={activeTabDetails.images ? undefined : onTouchMove}
                  onTouchEnd={activeTabDetails.images ? undefined : onTouchEnd}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {activeTabDetails.images ? (
                      <motion.div
                        key={activeTourTab}
                        ref={scrollContainerRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden gallery-scroll gap-3 sm:gap-4 p-3 sm:p-4 pb-4 snap-x snap-mandatory"
                      >
                        {activeTabDetails.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="relative group/screen cursor-zoom-in overflow-hidden rounded-lg sm:rounded-xl border border-divider dark:border-white/10 shadow-sm dark:shadow-xl flex-shrink-0 h-full max-h-full flex items-center justify-center snap-center bg-base-card dark:bg-black"
                            onClick={() => openLightboxForTab(activeTourTab, idx)}
                          >
                            <img
                              src={getAssetUrl(img)}
                              alt={`${activeTabDetails.alt} ${idx + 1}`}
                              className="h-full w-auto max-h-full object-contain block transition-transform duration-200 group-hover/screen:scale-[1.01] select-none"
                              decoding="async"
                              loading="eager"
                            />
                            {/* Zoom Indicator */}
                            <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-150 bg-base-card/90 dark:bg-black/80 backdrop-blur-md border border-divider dark:border-white/15 p-1.5 rounded-md shadow-md pointer-events-none">
                              <svg className="w-3 h-3 text-main dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key={activeTourTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="relative cursor-zoom-in group/screen w-full h-full flex items-center justify-center p-2.5 sm:p-4 overflow-hidden"
                        onClick={() => openLightboxForTab(activeTourTab, 0)}
                      >
                        <div className="relative h-full max-h-full flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl border border-divider dark:border-white/10 shadow-sm dark:shadow-xl bg-base-card dark:bg-black">
                          <img
                            src={getAssetUrl(activeTabDetails.image || "")}
                            alt={activeTabDetails.alt}
                            className="max-w-full max-h-full w-auto h-auto object-contain block select-none"
                            decoding="async"
                            loading="eager"
                          />
                        </div>
                        {/* Zoom Indicator Badge in Bottom-Right */}
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-150 bg-base-card/95 dark:bg-black/85 backdrop-blur-md border border-divider dark:border-white/15 text-main dark:text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 pointer-events-none select-none">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                            />
                          </svg>
                          <span className="text-[10px] font-mono font-bold">
                            Click to view full size
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Floating Left/Right Arrow Buttons for Multi-image Galleries */}
                  {activeTabDetails.images && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollLeft();
                        }}
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-divider dark:border-white/20 bg-base-card/90 dark:bg-black/75 backdrop-blur-md text-main dark:text-white hover:bg-base-muted dark:hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                        aria-label="Scroll left"
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
                          scrollRight();
                        }}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-divider dark:border-white/20 bg-base-card/90 dark:bg-black/75 backdrop-blur-md text-main dark:text-white hover:bg-base-muted dark:hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                        aria-label="Scroll right"
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
                    </>
                  )}

                  {/* Prev/Next buttons overlay for mobile tab switching on single screens */}
                  {!activeTabDetails.images && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevTab();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-divider dark:border-white/10 bg-base-card/90 dark:bg-black/80 backdrop-blur-md text-main dark:text-white hover:bg-base-muted dark:hover:bg-black transition-all shadow-md active:scale-95 md:hidden"
                        aria-label="Previous screenshot"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-divider dark:border-white/10 bg-base-card/90 dark:bg-black/80 backdrop-blur-md text-main dark:text-white hover:bg-base-muted dark:hover:bg-black transition-all shadow-md active:scale-95 md:hidden"
                        aria-label="Next screenshot"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Floating Application Navigation Dock (Desktop Only) */}
              <div
                className="hidden md:flex relative mt-4 justify-center"
                style={{ minHeight: "75px" }}
              >
                <Dock items={dockItems} />
              </div>

              {/* Mobile Tab Selector */}
              <div className="flex md:hidden flex-col gap-3 mt-4">
                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none px-1">
                  {tourTabs.map((tab) => {
                    const isActive = activeTourTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTourTab(tab.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                          isActive
                            ? "border-main bg-base-card text-main font-bold shadow-xs"
                            : "border-divider bg-base-card/40 text-main-muted"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dot Page Indicator for mobile */}
                <div className="flex justify-center gap-1.5 mt-1">
                  {tourTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTourTab(tab.id)}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeTourTab === tab.id
                          ? "w-5 bg-main"
                          : "w-1.5 bg-divider"
                      }`}
                      aria-label={`Go to ${tab.label} screenshot`}
                    />
                  ))}
                </div>
              </div>

              {/* Screenshot Details Info Card */}
              <div className="w-full">
                <div className="border border-divider bg-base-card p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold text-main flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-main"></span>
                    {activeTabDetails.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-main-muted whitespace-pre-line">
                    {activeTabDetails.description}
                  </p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                    {activeTabDetails.bullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs font-mono text-main-muted"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-main mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
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
