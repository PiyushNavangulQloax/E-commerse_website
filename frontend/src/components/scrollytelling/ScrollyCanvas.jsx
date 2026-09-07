import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 150;

const ScrollyCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits e.g. 001
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/indiansarii/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Render frame
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    const index = Math.round(latest);
    const img = images[index];

    if (img) {
      const canvas = canvasRef.current;
      const ctx = context;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Object fit cover logic
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (isLoaded && images.length > 0) {
          const index = Math.min(Math.max(Math.round(frameIndex.get()), 0), FRAME_COUNT - 1);
          const img = images[index];
          if (img) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const hRatio = canvasRef.current.width / img.width;
            const vRatio = canvasRef.current.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvasRef.current.width - img.width * ratio) / 2;
            const centerShift_y = (canvasRef.current.height - img.height * ratio) / 2;
            ctx.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
          }
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial set
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images, frameIndex]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded && canvasRef.current && images[0]) {
      const index = Math.round(frameIndex.get());
      if (index === 0) {
        const context = canvasRef.current.getContext('2d');
        const img = images[0];
        const canvas = canvasRef.current;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    }
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh', backgroundColor: '#121212' }}>
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full block"
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
};

export default ScrollyCanvas;
