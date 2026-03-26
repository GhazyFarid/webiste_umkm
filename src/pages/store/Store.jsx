import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/store/ProductCard';
import { Search, SlidersHorizontal, PackageX } from 'lucide-react';

const Store = () => {
  const dispatch = useDispatch();
  const { items: products, loading: pLoading } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory && product.status === 'publish';
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      {/* Header Store */}
      <section className="bg-white border-b border-slate-100 py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-display font-extrabold mb-2">Katalog Produk</h1>
              <p className="text-slate-500">Temukan koleksi lengkap produk pilihan berkualitas kami.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Cari produk..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-bold font-display uppercase tracking-wider text-sm">Filter Kategori</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
                      !selectedCategory ? 'bg-primary text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    Semua Kategori
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
                        selectedCategory === cat.name ? 'bg-primary text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {pLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
                <PackageX size={64} className="mx-auto text-slate-200 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Produk Tidak Ditemukan</h3>
                <p className="text-slate-500">Coba gunakan kata kunci lain atau ubah filter kategori.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Store;
