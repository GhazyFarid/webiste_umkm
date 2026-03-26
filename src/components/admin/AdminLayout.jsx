import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { LayoutDashboard, Package, Tag, Settings, LogOut, Home as HomeIcon, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeName } = useSelector(state => state.settings);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: <Package size={20} />, label: 'Produk' },
    { to: '/admin/categories', icon: <Tag size={20} />, label: 'Kategori' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-40">
        <div className="p-8 pb-12">
          <div className="p-4 bg-primary text-white rounded-3xl mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Admin Panel</p>
              <h1 className="font-display font-bold leading-tight line-clamp-1">{storeName}</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
              >
                {({ isActive }) => (
                  <div
                    className={`
        flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all
        ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
      `}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>

                    <ChevronRight
                      size={16}
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

        <div className="mt-auto p-8 space-y-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-6 py-4 text-slate-500 font-bold hover:text-primary transition-colors"
          >
            <HomeIcon size={20} />
            <span>Lihat Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
