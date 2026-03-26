import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../store/slices/productSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { Plus, Edit, Trash2, Search, ExternalLink, X, Upload, Save, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    featured: false,
    status: 'publish',
    stock: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: categories[0]?.name || '',
      image: '',
      featured: false,
      status: 'publish',
      stock: ''
    });
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    if (editingId) {
      dispatch(updateProduct({ id: editingId, data }));
    } else {
      dispatch(addProduct(data));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Kelola Produk</h1>
          <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-primary">Produk</span>
          </nav>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 self-start"
        >
          <Plus size={20} />
          Tambah Produk
        </button>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama atau kategori..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">Info Produk</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">Kategori</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">Harga</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-8 py-6 h-16 bg-white"></td>
                  </tr>
                ))
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {product.featured && <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded uppercase">Featured</span>}
                          <span className="text-xs text-slate-400">Stok: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">{product.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900 uppercase">Rp {product.price.toLocaleString('id-ID')}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${product.status === 'publish' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                       <span className={`text-xs font-bold uppercase tracking-wider ${product.status === 'publish' ? 'text-emerald-600' : 'text-slate-400'}`}>
                         {product.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal CRUD */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Nama Produk</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Harga (Rp)</label>
                        <input 
                          type="number" 
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Stok</label>
                        <input 
                          type="number" 
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Kategori</label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">URL Gambar</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                        />
                        {formData.image && (
                          <div className="mt-4 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.featured}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-secondary border-secondary text-white' : 'border-slate-200 group-hover:border-secondary'}`}>
                          {formData.featured && <Save size={14} />}
                        </div>
                        <span className="font-bold text-slate-700">Set as Featured Product</span>
                      </label>
                      
                      <div className="flex gap-4">
                        {['publish', 'draft'].map(status => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setFormData({...formData, status})}
                            className={`flex-grow py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] border-2 transition-all ${
                              formData.status === status 
                                ? 'bg-slate-900 border-slate-900 text-white' 
                                : 'bg-white border-slate-100 text-slate-400'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Deskripsi</label>
                  <textarea 
                    rows={4}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                  >
                    <Save size={20} />
                    {editingId ? 'Update Produk' : 'Simpan Produk'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
