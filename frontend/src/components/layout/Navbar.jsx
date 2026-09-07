import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '../search/SearchModal';
import AnnouncementBar from '../home/AnnouncementBar';
import { SocialMediaBar } from '../common/SocialIcons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems, openCart } = useCart();
  const { wishlistItems, openWishlist } = useWishlist();
  const location = useLocation();

  // If we are on the homepage, the navbar should start transparent
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Sarees', path: '/category/sarees' },
    { name: 'Women', path: '/category/women' },
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Ethnic Wear', path: '/category/ethnic' },
    { name: 'Baby & Kids', path: '/category/kids' },
    { name: 'Collections', path: '/collections' }
  ];

  // Determine styling based on scroll state and route
  const navClasses = isHome 
    ? (isScrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border text-text shadow-sm" 
        : "bg-black/25 backdrop-blur-[2px] text-white border-b border-white/10")
    : "bg-background/95 backdrop-blur-md border-b border-border text-text shadow-sm";

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* 1. Announcement Bar is strictly at top of header */}
      <AnnouncementBar />
      
      {/* 2. Main Navigation Bar sits directly beneath without overlapping */}
      <div className={`transition-all duration-300 ${navClasses}`}>
        <div className={`max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled || !isHome ? 'py-3.5' : 'py-5'}`}>
          <div className="flex justify-between items-center h-full">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Left - Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start lg:w-1/4">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link 
                to="/" 
                onClick={handleHomeClick}
                className="text-2xl font-serif tracking-wide leading-none inline-block"
              >
                ANVIKA
              </Link>
            </motion.div>
          </div>

          {/* Center - Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 w-2/4">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
              >
                <Link 
                  to={link.path}
                  onClick={link.path === '/' ? handleHomeClick : undefined}
                  className="text-[11px] font-medium tracking-[0.2em] uppercase transition-colors hover:text-accent block py-1 px-1"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right - Icons */}
          <div className="flex items-center justify-end gap-4 lg:gap-6 lg:w-1/4">
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-accent transition-colors" 
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Link to="/login" className="p-1 hover:text-accent transition-colors hidden sm:block" aria-label="Account">
                <User size={20} strokeWidth={1.5} />
              </Link>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onClick={openWishlist}
              className="p-1 hover:text-accent transition-colors hidden sm:block relative group" 
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-colors bg-red-500 text-white`}>
                  {wishlistItems.length}
                </span>
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onClick={openCart}
              className="p-1 hover:text-accent transition-colors relative group" 
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-colors ${isHome && !isScrolled ? 'bg-white text-black' : 'bg-primary text-background'}`}>
                  {cartItems.reduce((total, i) => total + (i.qty || 1), 0)}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-background text-text z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <Link 
                  to="/" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleHomeClick();
                  }}
                  className="text-xl font-serif"
                >
                  ANVIKA
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col p-6 overflow-y-auto">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link 
                      to={link.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (link.path === '/') handleHomeClick();
                      }}
                      className="block py-4 text-sm font-medium tracking-[0.15em] uppercase border-b border-border/50"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="mt-8 flex flex-col gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-sm tracking-widest uppercase">
                    <User size={18} strokeWidth={1.5} /> Account
                  </Link>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openWishlist();
                    }} 
                    className="flex items-center gap-3 py-2 text-sm tracking-widest uppercase text-left"
                  >
                    <Heart size={18} strokeWidth={1.5} /> Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-medium block mb-4">
                    Follow Our Journey
                  </span>
                  <SocialMediaBar size={18} className="flex items-center gap-4" itemClassName="text-text hover:text-accent transition-colors" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
