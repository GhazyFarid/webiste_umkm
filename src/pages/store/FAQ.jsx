import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  ChevronRight,
  CheckCircle2,
  Smartphone,
  Info
} from 'lucide-react';

const FAQ = () => {
  const { bankAccount, storeName } = useSelector(state => state.settings);

  const sections = [
    {
      id: 'ordering',
      title: 'Cara Pemesanan',
      icon: <ShoppingBag className="text-primary" />,
      steps: [
        'Pilih produk yang Anda inginkan dari katalog kami.',
        'Klik tombol "Tambah ke Keranjang" atau "Beli Sekarang".',
        'Buka halaman keranjang dan periksa kembali pesanan Anda.',
        'Isi detail pengiriman (Nama, No. WhatsApp, Alamat).',
        'Klik "Checkout ke WhatsApp" untuk mengirim pesanan Anda.',
        'Admin kami akan mengonfirmasi total biaya termasuk ongkos kirim.'
      ]
    },
    {
      id: 'payment',
      title: 'Metode Pembayaran',
      icon: <CreditCard className="text-secondary" />,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed">
            Saat ini kami menerima pembayaran melalui transfer bank manual. Silakan lakukan transfer ke rekening resmi kami di bawah ini:
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Official Account
                </div>
                <div>
                  <h4 className="text-2xl font-display font-black text-slate-900 mb-1">{bankAccount.bankName}</h4>
                  <p className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">
                    {bankAccount.accountNumber}
                  </p>
                  <p className="text-slate-500 font-medium mt-2">a.n. {storeName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>Verifikasi Manual</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>Aman & Terpercaya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Penting:</strong> Mohon kirimkan bukti transfer melalui chat WhatsApp setelah melakukan pembayaran agar pesanan Anda dapat segera kami proses.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'Pengiriman',
      icon: <Truck className="text-accent" />,
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>Kami menyediakan beberapa pilihan pengiriman:</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-primary" />
              <span><strong>Kurir Instant:</strong> Pengiriman di hari yang sama khusus area sekitar apotek.</span>
            </li>
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-primary" />
              <span><strong>Ekspedisi (JNE/J&T):</strong> Pengiriman ke seluruh wilayah Indonesia.</span>
            </li>
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-primary" />
              <span><strong>Ambil di Toko:</strong> Gratis biaya kirim dengan mengambil langsung di lokasi kami.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight"
          >
            Pertanyaan Umum & <br className="hidden md:block" />
            <span className="text-primary italic">Panduan Belanja</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Temukan informasi lengkap mengenai cara memesan, metode pembayaran, dan kebijakan pengiriman kami.
          </motion.p>
        </header>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900">{section.title}</h2>
              </div>

              {section.steps ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {sIdx + 1}
                      </div>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                section.content
              )}
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary rounded-[40px] p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-bold leading-tight">Masih punya pertanyaan lainnya?</h2>
            <p className="opacity-90 leading-relaxed">
              Tim layanan pelanggan kami siap membantu Anda memberikan informasi lebih lanjut mengenai produk, pengiriman, atau konsultasi kesehatan.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl shadow-black/10"
              >
                Hubungi Kami <Smartphone size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
