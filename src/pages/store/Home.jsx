import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import Hero from '../../components/store/Hero';
import ProductCard from '../../components/store/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading: pLoading } = useSelector(state => state.products);
  const { banners } = useSelector(state => state.settings);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.filter(p => p.featured && p.status === 'publish').slice(0, 4);
  const filteredProducts = products.filter(p => p.status === 'publish').slice(0, 8);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero banners={banners} />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-2">Pilihan Terbaik</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 border-l-4 border-primary pl-4">Produk Unggulan</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pLoading ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-100" />
                ))
              ) : (
                featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Catalog Snippet */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest block mb-2">Katalog Kami</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
                Produk Terbaru
              </h2>
            </div>
            <Link to="/store" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Lihat Semua <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pLoading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-100" />
              ))
            ) : (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>

          {filteredProducts.length === 0 && !pLoading && (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Belum ada produk untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
