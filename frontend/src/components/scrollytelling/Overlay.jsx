import { motion, useScroll, useTransform } from 'framer-motion';

const Overlay = ({ scrollYProgress: externalProgress }) => {
  const { scrollYProgress: fallbackProgress } = useScroll();
  const scrollYProgress = externalProgress || fallbackProgress;

  // Section 1: "Anvika / Creative Fashion" (Visible 0% - 12%, fully fades out by 20%, strictly clamped to 0 afterwards)
  const opacity1 = useTransform(scrollYProgress, [0, 0.10, 0.20, 1], [1, 1, 0, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.20, 1], [0, -50, -50], { clamp: true });
  const display1 = useTransform(scrollYProgress, (v) => (v <= 0.22 ? 'flex' : 'none'));

  // Section 2: "I build digital experiences." (Visible 28% - 55%, strictly 0 outside this window)
  const opacity2 = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.50, 0.60, 1], [0, 0, 1, 1, 0, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.50, 0.60, 1], [40, 40, 0, 0, -40, -40], { clamp: true });
  const display2 = useTransform(scrollYProgress, (v) => (v >= 0.24 && v <= 0.62 ? 'flex' : 'none'));

  // Section 3: "Bridging design and engineering." (Visible 65% - 90%, strictly 0 outside this window)
  const opacity3 = useTransform(scrollYProgress, [0, 0.65, 0.75, 0.88, 0.96, 1], [0, 0, 1, 1, 0, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0, 0.65, 0.75, 0.88, 0.96, 1], [40, 40, 0, 0, -40, -40], { clamp: true });
  const display3 = useTransform(scrollYProgress, (v) => (v >= 0.63 && v <= 0.98 ? 'flex' : 'none'));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans text-white">
      
      {/* Section 1 - 0% */}
      <motion.div 
        style={{ opacity: opacity1, y: y1, display: display1 }}
        className="absolute inset-0 flex-col items-center justify-center text-center px-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/80 mb-3 block">Haute Couture & Heritage</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide drop-shadow-lg">Anvika</h1>
        <p className="text-sm md:text-base mt-4 tracking-[0.25em] uppercase font-light text-white/80 max-w-md">
          Timeless Indian Drapes & Contemporary Silhouettes
        </p>
        <div className="flex items-center gap-4 mt-8 pointer-events-auto">
          <a 
            href="#new-arrivals" 
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-white/90 transition-colors shadow-lg"
          >
            New Arrivals
          </a>
          <a 
            href="#sarees" 
            className="px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/40 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/20 transition-colors"
          >
            Explore Sarees
          </a>
        </div>
      </motion.div>

      {/* Section 2 - 30% */}
      <motion.div 
        style={{ opacity: opacity2, y: y2, display: display2 }}
        className="absolute inset-0 flex-col items-start justify-center px-8 md:px-24"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-accent mb-3 block">01 / The Handloom Craft</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light max-w-2xl leading-tight drop-shadow-lg">
          Drape your story <br/> in pure silk.
        </h2>
        <p className="text-white/80 text-sm max-w-md mt-4 font-light leading-relaxed">
          Woven with timeless motifs by generational master artisans across Varanasi, Chanderi, and Kanchipuram.
        </p>
        <div className="mt-8 pointer-events-auto">
          <a 
            href="#sarees" 
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white border-b border-white/60 pb-1 hover:border-white hover:text-accent transition-colors"
          >
            Discover Handloom Weaves →
          </a>
        </div>
      </motion.div>

      {/* Section 3 - 65% to 90% */}
      <motion.div 
        style={{ opacity: opacity3, y: y3, display: display3 }}
        className="absolute inset-0 flex-col items-end justify-center px-8 md:px-24 text-right"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-accent mb-3 block">02 / Festive Majesty</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light max-w-2xl leading-tight drop-shadow-lg">
          Where heritage <br/> meets modernity.
        </h2>
        <p className="text-white/80 text-sm max-w-md mt-4 font-light leading-relaxed">
          Bespoke silhouettes tailored with exacting finesse for weddings, festivals, and unforgettable milestones.
        </p>
        <div className="mt-8 pointer-events-auto">
          <a 
            href="#ethnic-wear" 
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white border-b border-white/60 pb-1 hover:border-white hover:text-accent transition-colors"
          >
            Explore Celebration Edit →
          </a>
        </div>
      </motion.div>

    </div>
  );
};

export default Overlay;
