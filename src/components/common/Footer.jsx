import { useSelector } from 'react-redux';
import { Mail, Phone, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';

const Footer = () => {
  const { storeName, whatsappNumber, address, contactInfo } = useSelector(state => state.settings);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Store Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white">{storeName}</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Apotek resmi dan terpercaya. Kami menyediakan obat-obatan asli dengan pengawasan apoteker profesional untuk kesehatan keluarga Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs">
                <ShieldCheck size={14} className="text-primary" />
                <span>BPOM Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs">
                <ShieldCheck size={14} className="text-primary" />
                <span>SIA Terdaftar</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Layanan & Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/store" className="hover:text-primary transition-colors">Cari Obat</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Tebus Resep</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Konsultasi Apoteker</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Keunggulan Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Truck size={18} />
                </div>
                <div>
                  <p className="font-bold text-white">Pengiriman Cepat</p>
                  <p className="text-xs text-slate-500">Instant & Reguler</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-bold text-white">Buka Tiap Hari</p>
                  <p className="text-xs text-slate-500">08.00 - 22.00 WIB</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+{whatsappNumber}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 uppercase tracking-widest font-medium">
          <span>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
