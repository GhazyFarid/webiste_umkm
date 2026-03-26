import { useDispatch, useSelector } from 'react-redux';
import { Package, Tag, ShoppingBag, ArrowUpRight, Clock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { deleteProduct } from '../../store/slices/productSlice';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useState } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const stats = [
    { label: 'Total Produk', value: products.length, icon: <Package size={24} />, color: 'bg-primary' },
    { label: 'Kategori', value: categories.length, icon: <Tag size={24} />, color: 'bg-secondary' },
    { label: 'Produk Unggulan', value: products.filter(p => p.featured).length, icon: <ArrowUpRight size={24} />, color: 'bg-accent' },
    { label: 'Draft', value: products.filter(p => p.status === 'draft').length, icon: <Clock size={24} />, color: 'bg-slate-400' },
  ];

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <header>
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Ringkasan Toko</h1>
        <p className="text-slate-500 font-medium">Selamat datang kembali! Berikut adalah statistik terbaru toko Anda.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-slate-200/50 group"
          >
            <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-bold text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Products - Full Width */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900">Produk Terbaru</h3>
            <p className="text-xs text-slate-400 mt-1">5 produk terakhir yang Anda tambahkan</p>
          </div>
          <a href="/admin/products" className="flex items-center gap-2 px-6 py-2.5 bg-white text-primary font-bold text-sm border border-slate-200 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all">
            Lihat Semua <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="divide-y divide-slate-50">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors group">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform" />
              <div className="flex-grow">
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{product.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">{product.category}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-sm text-slate-400">Stok: {product.stock || 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-bold text-primary text-xl">Rp {product.price.toLocaleString('id-ID')}</p>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${product.status === 'publish' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {product.status}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                  title="Hapus Produk"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="p-20 text-center">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">Belum ada produk</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus produk "${productToDelete?.name}"? Data ini akan dihapus permanen.`}
      />
    </div>
  );
};

export default Dashboard;
