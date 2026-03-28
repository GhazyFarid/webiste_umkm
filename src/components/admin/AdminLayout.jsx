import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarContent from './SidebarContent';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { storeName } = useSelector(state => state.settings);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Mobile Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:hidden z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
            <Package size={18} />
          </div>
          <h1 className="font-display font-bold text-slate-900 truncate max-w-[150px]">{storeName}</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar (Static) */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col fixed h-full z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Animated Drawer) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent onClose={() => setIsSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-6 lg:p-12 pt-24 lg:pt-12 min-w-0">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
