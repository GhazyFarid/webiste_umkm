import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import Hero from '../../components/store/Hero';
import ProductCard from '../../components/store/ProductCard';
import { ArrowRight, MessageSquareMore, ClipboardCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading: pLoading } = useSelector(state => state.products);
  const { banners, whatsappNumber } = useSelector(state => state.settings);

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

      {/* Services Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">Layanan Farmasi Unggulan</h2>
            <p className="text-slate-500 text-lg">Kami memberikan lebih dari sekadar obat. Kami memberikan solusi kesehatan yang menyeluruh dan terpercaya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Konsultasi Gratis',
                desc: 'Tanya jawab langsung dengan apoteker kami melalui WhatsApp.',
                icon: <MessageSquareMore size={32} />,
                color: 'bg-teal-500',
                link: `https://wa.me/${whatsappNumber}`
              },
              {
                title: 'Tebus Resep',
                desc: 'Upload foto resep Anda dan kami akan siapkan obatnya segera.',
                icon: <ClipboardCheck size={32} />,
                color: 'bg-emerald-500',
                link: '/contact'
              },
              {
                title: 'Cek Kesehatan',
                desc: 'Layanan cek tensi, gula darah, dan kolesterol di outlet kami.',
                icon: <Activity size={32} />,
                color: 'bg-sky-500',
                link: '/about'
              }
            ].map((service, i) => (
              <motion.a
                key={i}
                href={service.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
                {/* <div className="flex items-center gap-2 text-primary font-bold">
                  Pelajari Lebih Lanjut <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div> */}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

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
