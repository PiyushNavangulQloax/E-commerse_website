import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Sparkles, ArrowRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 0,
    duration: 3000, // 3 seconds
    tag: "The Art of Drape",
    heading: "Drape your timeless elegance.",
    subheading: "Woven with pure Banarasi zari & centuries of artisan mastery.",
    showCta: false
  },
  {
    id: 1,
    duration: 3000, // 3 seconds
    tag: "Artisanal Heritage",
    heading: "Made to drape, made to remember.",
    subheading: "Royal silhouettes crafted for life's most unforgettable celebrations.",
    showCta: false
  },
  {
    id: 2,
    duration: 5500, // 5.5 seconds (5 to 6 sec)
    tag: "Luxury Indian Fashion",
    heading: "ANVIKA",
    isBrandLogo: true,
    subheading: "Pure Silk • Handcrafted Grace • Timeless Silhouettes",
    showCta: true
  }
];

const HeroVideo = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Text transition timer based on each slide's specific duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, currentSlide.duration);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, currentSlide.duration]);

  // Ensure videos autoplay reliably without requiring any user click
  useEffect(() => {
    const startAutoplay = (videoEl) => {
      if (!videoEl) return;
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('autoplay', '');
      
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser policy deferred it, re-trigger muted on any interaction
            const unlockPlay = () => {
              videoEl.muted = true;
              videoEl.play().catch(() => {});
              window.removeEventListener('click', unlockPlay);
              window.removeEventListener('touchstart', unlockPlay);
              window.removeEventListener('scroll', unlockPlay);
            };
            window.addEventListener('click', unlockPlay, { once: true });
            window.addEventListener('touchstart', unlockPlay, { once: true });
            window.addEventListener('scroll', unlockPlay, { once: true });
          });
      }
    };

    startAutoplay(videoRef1.current);
    startAutoplay(videoRef2.current);
  }, []);

  const toggleSound = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (videoRef1.current) videoRef1.current.muted = newMuteState;
    if (videoRef2.current) videoRef2.current.muted = newMuteState;
  };

  const togglePlay = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);
    const activeRef = activeVideoIndex === 0 ? videoRef1.current : videoRef2.current;
    if (activeRef) {
      if (nextPlayState) {
        activeRef.play().catch(() => {});
      } else {
        activeRef.pause();
      }
    }
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById('featured-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white select-none">
      
      {/* Background Video Layer with Seamless Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Video 1 */}
        <video
          ref={videoRef1}
          src="/videos/hero-video-1.mp4"
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideoIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Video 2 (Crossfade switchable) */}
        <video
          ref={videoRef2}
          src="/videos/hero-video-2.mp4"
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideoIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Cinematic Gradient Overlays for High Legibility & Luxury Contrast */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-radial-vignette opacity-60 pointer-events-none" />
      </div>

      {/* Main Centered Content Animation */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gold-300 font-medium mb-5 shadow-lg"
            >
              <Sparkles size={13} className="text-gold-400" />
              <span>{currentSlide.tag}</span>
            </motion.div>

            {/* Main Headline */}
            {currentSlide.isBrandLogo ? (
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-serif font-light tracking-[0.16em] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] my-2">
                {currentSlide.heading}
              </h1>
            ) : (
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] max-w-4xl my-2">
                {currentSlide.heading}
              </h2>
            )}

            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl font-light tracking-wide leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {currentSlide.subheading}
            </p>

            {/* Action Buttons (Appears on ANVIKA Slide) */}
            {currentSlide.showCta && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  to="/shop"
                  className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-gold-300 transition-all duration-300 text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/category/sarees"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all duration-300 text-xs font-semibold tracking-[0.2em] uppercase text-white hover:scale-105 active:scale-95"
                >
                  Bridal & Sarees
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Interface Controls & Story Progress Bar */}
      <div className="absolute bottom-8 left-0 w-full z-30 px-6 sm:px-12 flex items-center justify-between">
        
        {/* Story Slide Indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: currentSlideIndex === idx ? '36px' : '14px',
                backgroundColor: 'rgba(255,255,255,0.25)'
              }}
              aria-label={`Slide ${idx + 1}`}
            >
              {currentSlideIndex === idx && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: slide.duration / 1000, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-gold-400 to-amber-200"
                />
              )}
            </button>
          ))}
        </div>

        {/* Center Scroll Prompt */}
        <button
          onClick={scrollToContent}
          className="hidden sm:flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-light group-hover:tracking-[0.35em] transition-all">
            Discover
          </span>
          <ChevronDown size={18} className="animate-bounce text-gold-400" />
        </button>

        {/* Media Controls (Sound & Play/Pause & Dual Video Switcher) */}
        <div className="flex items-center gap-3">
          {/* Dual video toggle if 2 videos available */}
          <button
            onClick={() => setActiveVideoIndex((prev) => (prev === 0 ? 1 : 0))}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider text-white/80 hover:text-white transition-all"
            title="Switch Video View"
          >
            <span>Angle {activeVideoIndex + 1}</span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-gold-400" />}
          </button>
        </div>

      </div>

    </section>
  );
};

export default HeroVideo;
