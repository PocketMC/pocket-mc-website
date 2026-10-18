export default function HeroVideoPlayer() {
  return (
    <div className="hero-video-container">
      {/* Ambient Backlight Glow */}
      <div className="hero-video-glow" aria-hidden="true" />

      {/* Video Window Mockup */}
      <div className="video-mockup">
        {/* Window Chrome Header with macOS dots */}
        <div className="video-window-header">
          <div className="video-window-controls">
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
          </div>
        </div>

        {/* Video Viewport with YouTube Embed */}
        <div className="video-viewport">
          <iframe
            src="https://www.youtube.com/embed/MDifFWF7Rgk?si=8d5QAE1VUsi2_HA3"
            title="PocketMC YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="video-iframe"
          />
        </div>
      </div>
    </div>
  );
}
