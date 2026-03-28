import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Trash2, X, Save, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addCategory, updateCategory, deleteCategory } from '../../store/slices/categorySlice';
import ConfirmModal from '../../components/common/ConfirmModal';

const Categories = () => {
  const dispatch = useDispatch();
  const { items: categories } = useSelector(state => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const handleOpenAdd = () => {
    setCategoryName('');
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setCategoryName(category.name);
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCategory({ id: editingId, data: { name: categoryName } }));
    } else {
      dispatch(addCategory({ name: categoryName }));
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-1 md:mb-2">Kelola Kategori</h1>
          <p className="text-sm md:text-base text-slate-500 font-medium">Atur kategori untuk mengelompokkan produk Anda.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 w-full sm:w-auto text-sm md:text-base"
        >
          <Plus size={18} className="md:size-5" />
          Tambah Kategori
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary rounded-xl md:rounded-2xl flex items-center justify-center transition-colors">
                <Tag size={18} className="md:size-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base md:text-lg">{category.name}</h3>
            </div>
            <div className="flex items-center gap-1 md:gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleOpenEdit(category)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                <Edit size={16} className="md:size-[18px]" />
              </button>
              <button 
                onClick={() => handleDeleteClick(category)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={16} className="md:size-[18px]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden relative z-10"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">{editingId ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Nama Kategori</label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Kategori"
        message={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"? Produk dalam kategori ini akan kehilangan kategorinya.`}
      />
    </div>
  );
};

export default Categories;
