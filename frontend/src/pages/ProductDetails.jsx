import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Truck, RefreshCw, ChevronDown, Check } from 'lucide-react';
import Button from '../components/common/Button';
import { FadeIn, RevealOnScroll } from '../components/animations/RevealOnScroll';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const images = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585465223062-8ce8a9cbbe9b?q=80&w=1200&auto=format&fit=crop'
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      // Trigger cart drawer or toast here later
      setTimeout(() => setIsAdded(false), 3000);
    }, 800);
  };

  return (
    <div className="w-full pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-text-muted mb-8 uppercase tracking-wider">
          Home / Sarees / Rosewood Banarasi Silk Saree
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4 h-[60vh] lg:h-[80vh]">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-auto md:w-24 flex-shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden rounded-sm border-2 transition-colors ${
                    selectedImage === idx ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="relative flex-grow bg-surface rounded-sm overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={images[selectedImage]}
                  alt="Product Main"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col py-4">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-serif text-text mb-4">Rosewood Banarasi Silk Saree</h1>
              <p className="text-2xl text-text font-medium mb-6">₹12,500</p>
              
              <div className="prose prose-sm text-text-muted mb-8 line-clamp-3">
                <p>
                  Hand-finished silk saree created for celebrations that deserve to be remembered. 
                  Woven with intricate zari work, this timeless piece celebrates the heritage of Indian craftsmanship.
                </p>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-sm bg-surface">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-text hover:text-accent transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 flex items-center justify-center text-text hover:text-accent transition-colors"
                  >
                    +
                  </button>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  isLoading={isAdding}
                  className={`flex-grow h-12 ${isAdded ? 'bg-green-600 text-white' : ''}`}
                >
                  {isAdded ? (
                    <span className="flex items-center gap-2"><Check size={18} /> Added ✓</span>
                  ) : (
                    "Add to Bag"
                  )}
                </Button>

                <button className="w-12 h-12 flex items-center justify-center border border-border rounded-sm hover:bg-surface text-text transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border mb-8 text-sm text-text-muted">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-accent" />
                  <span>Free shipping over ₹5000</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw size={18} className="text-accent" />
                  <span>14-day easy returns</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="flex flex-col">
                {['Description', 'Fabric & Care', 'Shipping'].map((title, i) => (
                  <div key={title} className="border-b border-border py-4">
                    <button className="flex items-center justify-between w-full text-left font-medium text-text group">
                      {title}
                      <ChevronDown size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
