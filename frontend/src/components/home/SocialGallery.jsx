import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const images = [
  "/demo-saree.jpg",
  "/demo-saree.jpg",
  "/demo-saree.jpg",
  "/demo-saree.jpg",
  "/demo-saree.jpg",
  "/demo-saree.jpg"
];

const SocialGallery = () => {
  return (
    <section className="py-24 bg-surface">
      <RevealOnScroll>
        <div className="text-center mb-16 flex flex-col items-center px-4">
          <span className="text-accent text-[10px] tracking-[0.25em] uppercase mb-4 block font-medium">@ANVIKABOUTIQUE</span>
          <h2 className="text-4xl md:text-5xl font-serif text-text font-light tracking-wide mb-4">Follow Our Story</h2>
          <p className="text-text-muted text-sm font-light">See how our community wears the collection.</p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {images.map((src, idx) => (
          <RevealOnScroll key={idx} delay={idx * 0.1} className="relative aspect-square group overflow-hidden cursor-pointer bg-background">
            <motion.img 
              src={src} 
              alt="Social Post"
              className="w-full h-full object-cover transition-transform duration-700 ease-[0.25,0.1,0.25,1] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
              <Heart size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-50 group-hover:scale-100" />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default SocialGallery;
