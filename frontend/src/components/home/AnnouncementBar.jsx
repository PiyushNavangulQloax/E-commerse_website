import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "FREE SHIPPING ON ALL ORDERS ABOVE ₹1999",
  "NEW SEASON | THE FESTIVE EDIT IS LIVE",
  "DISCOVER THE ART OF INDIAN DRESSING"
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-primary text-background py-2 px-4 relative overflow-hidden z-50 text-center flex items-center justify-center min-h-[36px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium absolute"
        >
          {messages[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;
