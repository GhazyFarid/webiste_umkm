import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X, PlusCircle, MessageSquareMore } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/',        label: 'Beranda' },
  { to: '/store',   label: 'Katalog Obat' },
  { to: '/about',   label: 'Profil' },
  { to: '/contact', label: 'Kontak' },
  { to: '/faq',     label: 'FAQ' },
];

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
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="hover:text-primary transition-colors font-semibold text-slate-600">
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-colors">
              <ShoppingCart size={22} className="text-slate-700" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
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

            {/* Hamburger — animated icon swap */}
            <button
              className="lg:hidden p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-700"
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — full-screen overlay style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            {/* WhatsApp CTA — visible only on xs screens */}
            <div className="sm:hidden px-4 pt-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20"
              >
                <MessageSquareMore size={18} />
                <span className="text-sm">Konsultasi via WhatsApp</span>
              </a>
            </div>

            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                >
                  <Link
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-base font-semibold text-slate-700 px-3 py-3.5 rounded-xl hover:bg-primary/5 hover:text-primary active:scale-[0.98] transition-all"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom safe-area padding for mobile browsers */}
            <div className="h-safe-bottom" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;