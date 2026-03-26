import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products } = useSelector(state => state.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id) || p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Produk tidak ditemukan</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-primary font-bold hover:underline"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="p-8 lg:p-12 bg-slate-50 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square w-full max-w-md"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                {product.featured && (
                  <span className="absolute top-6 left-6 bg-secondary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    Featured Product
                  </span>
                )}
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 space-y-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-xs bg-primary/10 px-3 py-1.5 rounded-lg mb-4 inline-block">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <span className="text-slate-400 text-sm font-medium">(4.8/5.0 - 124 Review)</span>
                </div>
                <p className="text-4xl font-display font-bold text-primary">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900">Deskripsi Produk</h3>
                <p className="text-slate-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-slate-100">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Original 100%</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                    <Truck size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Gratis Ongkir</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                    <RefreshCw size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Retur 7 Hari</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 py-4 hover:bg-slate-200 transition-colors font-bold text-slate-600"
                  >
                    -
                  </button>
                  <span className="px-6 py-4 font-bold text-slate-900 min-w-[64px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-6 py-4 hover:bg-slate-200 transition-colors font-bold text-slate-600"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-bold rounded-[20px] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCart size={20} />
                  Tambah ke Keranjang
                </button>
              </div>
              
              <p className="text-slate-400 text-xs text-center sm:text-left italic">
                *Stok tersedia: {product.stock || 20} unit. Pesanan akan diproses dalam 24 jam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
