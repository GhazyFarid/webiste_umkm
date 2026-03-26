import { useSelector } from 'react-redux';
import { Package, Tag, ShoppingBag, ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { items: products } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);
  
  const stats = [
    { label: 'Total Produk', value: products.length, icon: <Package size={24} />, color: 'bg-primary' },
    { label: 'Kategori', value: categories.length, icon: <Tag size={24} />, color: 'bg-secondary' },
    { label: 'Produk Unggulan', value: products.filter(p => p.featured).length, icon: <ArrowUpRight size={24} />, color: 'bg-accent' },
    { label: 'Draft', value: products.filter(p => p.status === 'draft').length, icon: <Clock size={24} />, color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Ringkasan Toko</h1>
        <p className="text-slate-500">Selamat datang kembali! Berikut adalah statistik terbaru toko Anda.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-bold text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Products */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Produk Terbaru</h3>
            <a href="/admin/products" className="text-primary font-bold text-sm hover:underline">Lihat Semua</a>
          </div>
          <div className="divide-y divide-slate-50 text-sm">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900">{product.name}</h4>
                  <p className="text-slate-400">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    product.status === 'publish' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Help */}
        <div className="bg-primary text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold mb-6">Butuh Bantuan?</h3>
            <p className="text-primary-100 text-lg leading-relaxed mb-8 opacity-80">
              Jika Anda mengalami kesulitan dalam mengelola produk atau pesanan, 
              jangan ragu untuk menghubungi tim teknis kami.
            </p>
            <button className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-primary-50 transition-all shadow-xl shadow-black/10">
              Hubungi Support
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary rounded-full -ml-10 -mb-10 blur-2xl opacity-40 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
