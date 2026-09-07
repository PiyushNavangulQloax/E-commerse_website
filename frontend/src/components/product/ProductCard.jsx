import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const primaryImage = product.images?.[0] || product.image;
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div 
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface mb-5 rounded-2xl">
        <Link to={`/product/${product.slug || product._id}`}>
          <motion.img
            src={primaryImage}
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            initial={false}
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              opacity: isHovered && secondaryImage !== primaryImage ? 0 : 1 
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {secondaryImage !== primaryImage && (
            <motion.img
              src={secondaryImage}
              alt={`${product.name} alternate`}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-background/90 backdrop-blur-sm text-text text-[10px] tracking-widest px-3 py-1 rounded-full shadow-sm uppercase font-medium">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] tracking-widest px-3 py-1 rounded-full shadow-sm uppercase font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 p-2.5 bg-background/80 backdrop-blur-md rounded-full text-text hover:text-accent transition-colors z-10 shadow-sm"
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart size={16} className={isWishlisted ? "fill-accent stroke-accent" : ""} />
          </motion.div>
        </button>

        {/* Quick Add Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-6 left-0 w-full px-6 hidden md:block"
            >
              <Button variant="secondary" className="w-full bg-background/95 backdrop-blur-md text-xs tracking-widest hover:bg-background">
                Quick View
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.slug || product._id}`} className="flex flex-col px-1">
        <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2 font-medium">
          {product.category?.name || product.category}
        </span>
        <h3 className="text-base text-text font-serif leading-snug mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium text-text">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-text-muted line-through text-xs">₹{product.originalPrice}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
