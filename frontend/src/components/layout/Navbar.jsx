import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
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

  const navLinks = [
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
        ? "bg-background/90 backdrop-blur-md border-b border-border text-text shadow-sm" 
        : "bg-transparent text-white border-transparent")
    : "bg-background/90 backdrop-blur-md border-b border-border text-text";

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${navClasses}`}>
      {/* If there's an announcement bar, it will push this down. Let's assume this sits below it. */}
      {/* However, the user wants the announcement bar AT THE VERY TOP. We will place it in App.jsx or above Navbar */}
      
      <div className={`max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isScrolled || !isHome ? 'py-4' : 'py-6'}`}>
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
            <Link to="/" className="text-2xl font-serif tracking-wide leading-none">
              ANVIKA
            </Link>
          </div>

          {/* Center - Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 w-2/4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-[11px] font-medium transition-opacity hover:opacity-70 relative group uppercase tracking-[0.2em]"
              >
                {link.name}
                <span className={`absolute -bottom-2 left-1/2 w-0 h-[1px] transition-all duration-500 group-hover:w-full group-hover:left-0 ${isHome && !isScrolled ? 'bg-white' : 'bg-primary'}`} />
              </Link>
            ))}
          </nav>

          {/* Right - Icons */}
          <div className="flex items-center justify-end gap-4 lg:gap-6 lg:w-1/4">
            <button className="p-1 hover:opacity-70 transition-opacity" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/login" className="p-1 hover:opacity-70 transition-opacity hidden sm:block" aria-label="Account">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" className="p-1 hover:opacity-70 transition-opacity hidden sm:block" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="p-1 hover:opacity-70 transition-opacity relative group" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-colors ${isHome && !isScrolled ? 'bg-white text-black' : 'bg-primary text-background'}`}>
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

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
                <span className="text-xl font-serif">ANVIKA</span>
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
                      onClick={() => setIsMobileMenuOpen(false)}
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
                  <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-sm tracking-widest uppercase">
                    <Heart size={18} strokeWidth={1.5} /> Wishlist
                  </Link>
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
