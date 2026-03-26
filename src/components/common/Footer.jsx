import { useSelector } from 'react-redux';
import { Mail, Phone, MapPin, } from 'lucide-react';

const Footer = () => {
  const { storeName, whatsappNumber, address, contactInfo } = useSelector(state => state.settings);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Store Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-bold text-white">{storeName}</h3>
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            Pusat produk berkualitas tinggi dengan pelayanan prima untuk kepuasan pelanggan setia kami.
          </p>
          <div className="flex gap-4">
            <a href={`https://instagram.com/${contactInfo.instagram}`} className="hover:text-primary transition-colors">
              <MapPin size={20} />
              {/* <Instagram size={20} /> */}
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Menu Cepat</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/store" className="hover:text-primary transition-colors">Katalog Produk</a></li>
            <li><a href="/about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Hubungi Kami</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Kontak</h4>
          <ul className="space-y-3 text-sm">
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

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 uppercase tracking-widest font-medium">
        &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
