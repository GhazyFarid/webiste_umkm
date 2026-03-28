import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Package, Award, Sparkles, Heart } from "lucide-react";

const About = () => {
  const { storeName, aboutContent } = useSelector((state) => state.settings);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <header className="text-center mb-16 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight"
        >
          Tentang Kami
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-xl mx-auto leading-relaxed"
        >
          Mengenal lebih dekat {storeName} dan visi kami dalam melayani
          pelanggan.
        </motion.p>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-8 border-l-8 border-secondary pl-6">
                Dedikasi Kami
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>{aboutContent}</p>
                <p>
                  Kami memahami bahwa kesehatan adalah aset terpenting. Oleh
                  karena itu, kami hadir untuk memberikan akses mudah terhadap
                  produk kesehatan asli, berkualitas, dan terpercaya bagi Anda
                  dan keluarga.
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
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
                alt="Pharmacy Profile"
                className="rounded-[40px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-3xl -z-0" />
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Package className="text-primary" />,
                title: "Obat Terjamin",
                desc: "Produk 100% asli dan memiliki izin resmi.",
              },
              {
                icon: <Award className="text-secondary" />,
                title: "Resmi & Aman",
                desc: "Standar penyimpanan obat sesuai protokol kesehatan.",
              },
              {
                icon: <Sparkles className="text-accent" />,
                title: "Pelayanan Cepat",
                desc: "Proses pesanan kilat via WhatsApp.",
              },
              {
                icon: <Heart className="text-red-500" />,
                title: "Konsultasi Gratis",
                desc: "Tanya obat dan dosis kepada tim profesional kami.",
              },
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
                <h3 className="font-display font-bold text-lg mb-2">
                  {v.title}
                </h3>
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
