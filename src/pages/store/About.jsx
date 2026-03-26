import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Package, Award, Sparkles, Heart } from 'lucide-react';

const About = () => {
  const { storeName, aboutContent } = useSelector(state => state.settings);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Hero About */}
      <section className="bg-primary text-white py-20 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-display font-extrabold mb-6"
          >
            Tentang Kami
          </motion.h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto opacity-80">
            Mengenal lebih dekat {storeName} dan visi kami dalam melayani pelanggan.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-8 border-l-8 border-secondary pl-6">Cerita Kami</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>{aboutContent}</p>
                <p>
                  Berawal dari semangat untuk menghadirkan produk berkualitas dengan harga yang kompetitif, 
                  kami terus bertumbuh dan berinovasi untuk memenuhi kebutuhan pasar yang dinamis.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800" 
                alt="Business Profile" 
                className="rounded-[40px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-3xl -z-0" />
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Package className="text-primary" />, title: 'Produk Pilihan', desc: 'Hanya menghadirkan kualitas terbaik.' },
              { icon: <Award className="text-secondary" />, title: 'Kualitas Premium', desc: 'Standar tinggi untuk setiap produk.' },
              { icon: <Sparkles className="text-accent" />, title: 'Inovasi', desc: 'Terus update dengan tren terbaru.' },
              { icon: <Heart className="text-red-500" />, title: 'Pelayanan Hati', desc: 'Ramah dan responsif kepada pelanggan.' }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center card-hover"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
