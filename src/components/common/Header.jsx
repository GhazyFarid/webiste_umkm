import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { storeName } = useSelector(state => state.settings);

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-display font-bold text-primary">
          {storeName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <Link to="/store" className="hover:text-primary transition-colors font-medium">Store</Link>
          <Link to="/about" className="hover:text-primary transition-colors font-medium">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors font-medium">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
            <Search size={22} />
          </button>
          <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded">Home</Link>
            <Link to="/store" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded">Store</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-slate-50 rounded">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
