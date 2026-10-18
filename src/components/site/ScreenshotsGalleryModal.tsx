import { useState, useEffect, useRef } from "react";
import { galleryScreenshots, type GalleryItem } from "../../data/site";
import { getAssetUrl } from "../../utils/getAssetUrl";
import { Icon } from "./Primitives";

interface ScreenshotsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenshotsGalleryModal({
  isOpen,
  onClose,
}: ScreenshotsGalleryModalProps) {
  const [filter, setFilter] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeItem) {
          setActiveItem(null);
        } else {
          onClose();
        }
        return;
      }

      if (activeItem) {
        const filtered =
          filter === "All"
            ? galleryScreenshots
            : galleryScreenshots.filter((item) => item.category === filter);
        const currentIndex = filtered.findIndex((item) => item.id === activeItem.id);

        if (e.key === "ArrowRight") {
          const nextIndex = (currentIndex + 1) % filtered.length;
          setActiveItem(filtered[nextIndex]);
        } else if (e.key === "ArrowLeft") {
          const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
          setActiveItem(filtered[prevIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeItem, filter, onClose]);

  if (!isOpen) return null;

  const filteredScreenshots =
    filter === "All"
      ? galleryScreenshots
      : galleryScreenshots.filter((item) => item.category === filter);

  const categories = ["All", "Desktop", "Management", "Remote Mobile"] as const;

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!activeItem) return;
    const currentIndex = filteredScreenshots.findIndex(
      (item) => item.id === activeItem.id
    );
    if (currentIndex === -1) return;

    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % filteredScreenshots.length;
      setActiveItem(filteredScreenshots[nextIndex]);
    } else {
      const prevIndex =
        (currentIndex - 1 + filteredScreenshots.length) %
        filteredScreenshots.length;
      setActiveItem(filteredScreenshots[prevIndex]);
    }
  };

  return (
    <div
      className="gallery-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="PocketMC Screenshots Gallery"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="gallery-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery Header */}
        <div className="gallery-header">
          <div className="gallery-header-left">
            <span className="kicker">Gallery</span>
            <h2>PocketMC Screenshots ({galleryScreenshots.length})</h2>
          </div>

          <div className="gallery-header-right">
            {/* Filter Tabs */}
            <div className="gallery-category-tabs" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={filter === cat}
                  className={`gallery-cat-btn ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              className="icon-button dialog-close"
              aria-label="Close gallery"
              onClick={onClose}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredScreenshots.map((item) => (
            <button
              key={item.id}
              className="gallery-card"
              onClick={() => setActiveItem(item)}
              aria-label={`View ${item.label}`}
            >
              <div className="gallery-card-thumb">
                <img
                  src={getAssetUrl(`screenshots/${item.file}`)}
                  alt={item.label}
                  loading="lazy"
                  width="600"
                  height="340"
                />
                <span className="gallery-zoom-badge font-mono">
                  <Icon name="search" size={13} /> Enlarge
                </span>
              </div>
              <div className="gallery-card-info">
                <div className="gallery-card-header">
                  <h3>{item.label}</h3>
                  <span className="gallery-tag font-mono">{item.category}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Full Image Lightbox Overlay */}
        {activeItem && (
          <div
            className="gallery-lightbox-overlay"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="gallery-lightbox-box"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setActiveItem(null)}
                aria-label="Close image preview"
              >
                <Icon name="close" size={18} />
              </button>

              <button
                className="gallery-lightbox-nav prev"
                onClick={() => navigateLightbox("prev")}
                aria-label="Previous screenshot"
              >
                <Icon name="arrow" size={18} />
              </button>

              <button
                className="gallery-lightbox-nav next"
                onClick={() => navigateLightbox("next")}
                aria-label="Next screenshot"
              >
                <Icon name="arrow" size={18} />
              </button>

              <div className="gallery-lightbox-image-wrap">
                <img
                  src={getAssetUrl(`screenshots/${activeItem.file}`)}
                  alt={activeItem.label}
                />
              </div>

              <div className="gallery-lightbox-caption">
                <div className="gallery-caption-title">
                  <span className="kicker">{activeItem.category}</span>
                  <h3>{activeItem.label}</h3>
                </div>
                <p>{activeItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
