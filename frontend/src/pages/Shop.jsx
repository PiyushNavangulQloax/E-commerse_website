import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import { FadeIn, RevealOnScroll } from '../components/animations/RevealOnScroll';

// Mock Data
const products = Array(12).fill(null).map((_, i) => ({
  _id: `prod_${i}`,
  name: `Premium Indian Wear ${i + 1}`,
  price: 5000 + (i * 1000),
  category: i % 2 === 0 ? 'Sarees' : 'Women\'s Wear',
  image: i % 2 === 0 
    ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1583391733959-b202242138bc?q=80&w=600&auto=format&fit=crop',
}));

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn>
          <div className="text-sm text-text-muted mb-4 uppercase tracking-wider">
            Home / Shop
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-text mb-6">Shop the Collection</h1>
          <p className="text-text-muted max-w-2xl">
            Explore our thoughtfully curated collection of timeless Indian wear. Each piece is crafted with intention and designed to elevate your everyday elegance.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="font-serif text-2xl mb-6 border-b border-border pb-4 text-text">Filters</h3>
            
            <div className="mb-8">
              <h4 className="font-medium text-text mb-4">Categories</h4>
              <div className="flex flex-col gap-3 text-text-muted">
                <label className="flex items-center gap-3 cursor-pointer hover:text-text transition-colors">
                  <input type="checkbox" className="accent-accent w-4 h-4" /> All
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-text transition-colors">
                  <input type="checkbox" className="accent-accent w-4 h-4" /> Sarees
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-text transition-colors">
                  <input type="checkbox" className="accent-accent w-4 h-4" /> Women's Wear
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-text transition-colors">
                  <input type="checkbox" className="accent-accent w-4 h-4" /> Baby & Kids
                </label>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium text-text mb-4">Price Range</h4>
              <div className="flex items-center gap-4">
                <input type="number" placeholder="Min" className="w-full border border-border bg-surface rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent" />
                <span className="text-text-muted">-</span>
                <input type="number" placeholder="Max" className="w-full border border-border bg-surface rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent" />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow">
          {/* Mobile Filter Toggle & Sort */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <button 
              className="lg:hidden flex items-center gap-2 text-text font-medium"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
            <div className="hidden lg:block text-text-muted text-sm">
              Showing {products.length} results
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-text font-medium">Sort by: Featured</span>
              <ChevronDown size={16} className="text-text-muted group-hover:text-text transition-colors" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <RevealOnScroll key={product._id} delay={(idx % 4) * 0.1}>
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center border border-border rounded-sm hover:bg-surface text-text transition-colors">1</button>
            <button className="w-10 h-10 flex items-center justify-center border border-accent bg-accent text-background rounded-sm">2</button>
            <button className="w-10 h-10 flex items-center justify-center border border-border rounded-sm hover:bg-surface text-text transition-colors">3</button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-text/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background z-50 p-6 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h3 className="font-serif text-2xl text-text">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-text-muted hover:text-text">
                  <X size={20} />
                </button>
              </div>
              
              {/* Filter Content (same as desktop) */}
              <div className="flex-grow overflow-y-auto">
                 <div className="mb-8">
                  <h4 className="font-medium text-text mb-4">Categories</h4>
                  <div className="flex flex-col gap-4 text-text-muted">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="accent-accent w-5 h-5" /> All
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="accent-accent w-5 h-5" /> Sarees
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border mt-auto flex gap-4">
                <Button variant="outline" className="w-full" onClick={() => setIsFilterOpen(false)}>Clear</Button>
                <Button className="w-full" onClick={() => setIsFilterOpen(false)}>Apply</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
