import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ banners }) => {
  const banner = banners[0]; // For now just use the first banner

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Pusat UMKM Terpercaya
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight mb-6">
            Belanja Mudah <br />
            <span className="text-primary italic">Tanpa Ribet</span> <br />
            Hanya di Sini!
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            Temukan koleksi produk pilihan berkualitas terbaik untuk kebutuhan harian Anda. 
            Checkout via WhatsApp, pembayaran aman dan terpercaya.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/store" className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
              Mulai Belanja <ShoppingBag size={20} />
            </Link>
            <Link to="/about" className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all">
              Hubungi Kami <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl z-10">
            <img 
              src={banner?.image} 
              alt={banner?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white text-2xl font-bold font-display">{banner?.title}</h3>
            </div>
          </div>
          {/* Accent circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full -z-0 animate-float" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-8 border-primary/20 rounded-full -z-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
