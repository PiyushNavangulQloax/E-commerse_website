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
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">Anvika</h1>
        <p className="text-xl md:text-2xl mt-4 tracking-widest uppercase font-medium text-white/70">Creative Fashion</p>
      </motion.div>

      {/* Section 2 - 30% */}
      <motion.div 
        style={{ opacity: opacity2, y: y2, display: display2 }}
        className="absolute inset-0 flex-col items-start justify-center px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-7xl font-light max-w-2xl leading-tight drop-shadow-lg">
          I build digital <br/> experiences.
        </h2>
      </motion.div>

      {/* Section 3 - 65% to 90% */}
      <motion.div 
        style={{ opacity: opacity3, y: y3, display: display3 }}
        className="absolute inset-0 flex-col items-end justify-center px-8 md:px-24 text-right"
      >
        <h2 className="text-4xl md:text-7xl font-light max-w-2xl leading-tight drop-shadow-lg">
          Bridging design <br/> and engineering.
        </h2>
      </motion.div>

    </div>
  );
};

export default Overlay;
