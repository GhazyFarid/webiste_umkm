import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Settings, LogOut, Home as HomeIcon, ChevronRight, X } from 'lucide-react';

const SidebarContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeName } = useSelector(state => state.settings);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
    if (onClose) onClose();
  };

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: <Package size={20} />, label: 'Produk' },
    { to: '/admin/categories', icon: <Tag size={20} />, label: 'Kategori' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 pb-10">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 bg-primary text-white rounded-2xl flex items-center gap-3 flex-grow">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Package size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-widest font-bold opacity-70">Admin Panel</p>
              <h1 className="font-display font-bold leading-tight truncate text-sm">{storeName}</h1>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors ml-2"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => onClose && onClose()}
            >
              {({ isActive }) => (
                <div
                  className={`
                    flex items-center justify-between px-5 py-3.5 rounded-xl font-bold transition-all
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>

                  <ChevronRight
                    size={14}
                    className={`
                      transition-all duration-200
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                    `}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2 border-t border-slate-50">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-5 py-3 text-slate-500 font-bold hover:text-primary transition-colors text-sm"
        >
          <HomeIcon size={18} />
          <span>Lihat Website</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all text-sm"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarContent;
