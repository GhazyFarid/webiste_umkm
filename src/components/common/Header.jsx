import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X, PlusCircle, MessageSquareMore } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { storeName, whatsappNumber } = useSelector(state => state.settings);

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass border-b border-primary/5">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold text-primary group">
          {/* <div className="p-1.5 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
            <PlusCircle size={28} />
          </div> */}
          <span>{storeName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-primary transition-colors font-semibold text-slate-600">Beranda</Link>
          <Link to="/store" className="hover:text-primary transition-colors font-semibold text-slate-600">Katalog Obat</Link>
          <Link to="/about" className="hover:text-primary transition-colors font-semibold text-slate-600">Profil</Link>
          <Link to="/contact" className="hover:text-primary transition-colors font-semibold text-slate-600">Kontak</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-6">

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-colors">
              <ShoppingCart size={22} className="text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              <MessageSquareMore size={18} />
              <span className="text-sm">Konsultasi</span>
            </a>

            <button 
              className="lg:hidden p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
