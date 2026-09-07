import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-serif tracking-widest uppercase block mb-6">
              ANVIKA
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Discover timeless Indian craftsmanship reimagined for the modern woman. Elegance woven into every moment.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/category/sarees" className="hover:text-accent transition-colors">Sarees</Link></li>
              <li><Link to="/category/women" className="hover:text-accent transition-colors">Women's Wear</Link></li>
              <li><Link to="/category/kids" className="hover:text-accent transition-colors">Baby & Kids</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Help</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="hover:text-accent transition-colors">Sustainability</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} ANVIKA. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Pinterest</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
