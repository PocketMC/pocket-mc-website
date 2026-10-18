import { useState, useMemo, useEffect, useCallback } from "react";
import {
  categories,
  galleryItems,
  type CategoryId,
  type GalleryItem,
} from "../data/galleryData";
import { getAssetUrl as url } from "../utils/getAssetUrl";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory]);

  const sections = useMemo(() => {
    const distinct = categories.filter((c) => c.id !== "all");
    return distinct
      .map((cat) => ({
        ...cat,
        items: galleryItems.filter((i) => i.categoryId === cat.id),
      }))
      .filter((sec) => sec.items.length > 0);
  }, []);

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  const nextLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const list = visibleItems;
    const idx = list.findIndex((i) => i.id === lightboxItem.id);
    if (idx !== -1) setLightboxItem(list[(idx + 1) % list.length]);
  }, [lightboxItem, visibleItems]);

  const prevLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const list = visibleItems;
    const idx = list.findIndex((i) => i.id === lightboxItem.id);
    if (idx !== -1) setLightboxItem(list[(idx - 1 + list.length) % list.length]);
  }, [lightboxItem, visibleItems]);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextLightbox();
      else if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxItem, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <div className="gallery-page">
      {/* Clean Header */}
      <header className="section gallery-hero">
        <span className="cross start"></span>
        <span className="cross end"></span>

        <div className="page hero-content">
          <h1>Gallery</h1>
          <p className="subtitle">
            A visual tour of PocketMC across desktop and mobile.
          </p>

          {/* Category pill switcher */}
          <div className="category-bar">
            <div className="switch" role="tablist" aria-label="Screenshot categories">
              {categories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    className={`switch-btn ${activeCategory === cat.id ? "on" : ""}`}
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    {(cat.id === "all" || cat.id === "mobile") && (
                      <span className="count">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Gallery Content: Natural page scroll, organized category-wise */}
      <main className="section gallery-content">
        <span className="cross start"></span>
        <span className="cross end"></span>

        <div className="page content-container">
          {activeCategory === "all" ? (
            /* When viewing "All", render categorized sections with clear headers */
            sections.map((sec) => (
              <section key={sec.id} className="category-block" id={`sec-${sec.id}`}>
                <div className="section-heading">
                  <h2>{sec.label}</h2>
                  <p>{sec.description}</p>
                </div>

                {sec.id === "mobile" ? (
                  /* Dedicated portrait phone grid: perfectly fits 9:19.5 aspect ratio */
                  <div className="mobile-grid">
                    {sec.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="phone-card"
                        onClick={() => openLightbox(item)}
                        aria-label={`View ${item.title} full size`}
                      >
                        <div className="phone-frame">
                          <img
                            src={url(item.src)}
                            alt={item.title}
                            loading="lazy"
                            className="phone-img"
                          />
                        </div>
                        <div className="card-caption">
                          <span className="card-title">{item.title}</span>
                          <p className="card-desc">{item.caption}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Desktop landscape grid: perfectly fits 16:10 / 16:9 aspect ratio */
                  <div className="desktop-grid">
                    {sec.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`desktop-card ${item.width > 3000 ? "wide-card" : ""}`}
                        onClick={() => openLightbox(item)}
                        aria-label={`View ${item.title} full size`}
                      >
                        <div
                          className={`desktop-frame ${item.width > 3000 ? "wide-frame" : ""}`}
                        >
                          <img
                            src={url(item.src)}
                            alt={item.title}
                            loading="lazy"
                            className="desktop-img"
                          />
                        </div>
                        <div className="card-caption">
                          <span className="card-title">{item.title}</span>
                          <p className="card-desc">{item.caption}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            ))
          ) : (
            /* Filtered single-category view */
            <section className="category-block">
              <div className="section-heading">
                <h2>{categories.find((c) => c.id === activeCategory)?.label}</h2>
                <p>
                  {categories.find((c) => c.id === activeCategory)?.description}
                </p>
              </div>

              {activeCategory === "mobile" ? (
                <div className="mobile-grid">
                  {visibleItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="phone-card"
                      onClick={() => openLightbox(item)}
                      aria-label={`View ${item.title} full size`}
                    >
                      <div className="phone-frame">
                        <img
                          src={url(item.src)}
                          alt={item.title}
                          loading="lazy"
                          className="phone-img"
                        />
                      </div>
                      <div className="card-caption">
                        <span className="card-title">{item.title}</span>
                        <p className="card-desc">{item.caption}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="desktop-grid">
                  {visibleItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`desktop-card ${item.width > 3000 ? "wide-card" : ""}`}
                      onClick={() => openLightbox(item)}
                      aria-label={`View ${item.title} full size`}
                    >
                      <div
                        className={`desktop-frame ${item.width > 3000 ? "wide-frame" : ""}`}
                      >
                        <img
                          src={url(item.src)}
                          alt={item.title}
                          loading="lazy"
                          className="desktop-img"
                        />
                      </div>
                      <div className="card-caption">
                        <span className="card-title">{item.title}</span>
                        <p className="card-desc">{item.caption}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="lb-bar">
            <div className="lb-title-wrap">
              <span className="lb-cat font-mono">{lightboxItem.categoryLabel}</span>
              <span className="lb-sep">·</span>
              <span className="lb-title">{lightboxItem.title}</span>
              <span className="lb-caption">{lightboxItem.caption}</span>
            </div>

            <button
              type="button"
              className="lb-close"
              aria-label="Close"
              onClick={closeLightbox}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="lb-stage" onClick={closeLightbox}>
            <img
              src={url(lightboxItem.src)}
              alt={lightboxItem.title}
              className={`lb-img ${lightboxItem.orientation === "portrait" ? "portrait" : ""}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="lb-nav-wrap">
            <button
              type="button"
              className="lb-arrow prev"
              aria-label="Previous image"
              onClick={prevLightbox}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="lb-arrow next"
              aria-label="Next image"
              onClick={nextLightbox}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
