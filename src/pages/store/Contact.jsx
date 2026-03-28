import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { storeName, whatsappNumber, address, contactInfo } = useSelector(
    (state) => state.settings,
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Punya pertanyaan atau ingin diskusi lebih lanjut? Kami siap membantu
            Anda kapanpun dibutuhkan.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                  Konsultasi obat & cek stok via WA.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="text-primary font-bold hover:underline"
                >
                  +{whatsappNumber}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                  Pemesanan resep atau kerjasama instansi.
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary font-bold hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Lokasi</h3>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                  Kunjungi apotik kami di alamat ini.
                </p>
                <p className="text-slate-900 font-medium">{address}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-display font-bold mb-8">
                Kirim Pesan
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Nama
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Alamat Email"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                    Subjek
                  </label>
                  <input
                    type="text"
                    placeholder="Apa yang ingin Anda tanyakan?"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Tuliskan pesan Anda di sini..."
                    rows={5}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none"
                  />
                </div>
                <button className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3">
                  Kirim Sekarang <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
