import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../store/slices/settingsSlice';
import { Save, Store, Smartphone, MapPin, CreditCard, Image as ImageIcon, Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      dispatch(updateSettings(formData));
      setIsSaving(false);
      alert('Pengaturan Berhasil Disimpan!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 lg:space-y-12">
      <header>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-1 md:mb-2">Pengaturan Toko</h1>
        <p className="text-sm md:text-base text-slate-500">Kelola identitas bisnis dan informasi operasional toko Anda.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Basic Info */}
        <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Store size={18} className="md:size-5" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">Identitas Bisnis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">Nama Toko</label>
              <input 
                type="text" 
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.storeName}
                onChange={(e) => setFormData({...formData, storeName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">No. WhatsApp</label>
              <div className="relative">
                 <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-[18px] md:size-5" />
                 <input 
                  type="text" 
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                />
              </div>
              <p className="text-[8px] md:text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Gunakan Kode Negara (Contoh: 62812...)</p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">Alamat Toko</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 text-slate-400 size-[18px] md:size-5" />
                <textarea 
                  rows={2}
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none text-sm md:text-base"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Info */}
        <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
              <CreditCard size={18} className="md:size-5" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">Informasi Pembayaran</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">Nama Bank</label>
              <input 
                type="text" 
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.bankAccount.bankName}
                onChange={(e) => setFormData({
                  ...formData, 
                  bankAccount: {...formData.bankAccount, bankName: e.target.value}
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">No. Rekening</label>
              <input 
                type="text" 
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.bankAccount.accountNumber}
                onChange={(e) => setFormData({
                  ...formData, 
                  bankAccount: {...formData.bankAccount, accountNumber: e.target.value}
                })}
              />
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
              <ImageIcon size={18} className="md:size-5" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">Homepage Banner</h3>
          </div>

          <div className="space-y-6">
            <div className="p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 relative group">
              <img 
                src={formData.banners[0].image} 
                className="w-full h-32 md:h-48 object-cover rounded-xl md:rounded-2xl mb-4"
                alt="Banner Preview" 
              />
              <div className="space-y-3 md:space-y-4">
                <input 
                  type="text"
                  placeholder="URL Gambar Banner"
                  className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  value={formData.banners[0].image}
                  onChange={(e) => {
                    const newBanners = [...formData.banners];
                    newBanners[0] = { ...newBanners[0], image: e.target.value };
                    setFormData({...formData, banners: newBanners});
                  }}
                />
                <input 
                  type="text"
                  placeholder="Judul Banner"
                  className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-primary outline-none italic text-sm md:text-base"
                  value={formData.banners[0].title}
                  onChange={(e) => {
                    const newBanners = [...formData.banners];
                    newBanners[0] = { ...newBanners[0], title: e.target.value };
                    setFormData({...formData, banners: newBanners});
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4 pb-8 md:pb-12">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-primary text-white font-bold rounded-xl md:rounded-[22px] hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-2xl shadow-primary/20 disabled:opacity-70 w-full sm:w-auto text-sm md:text-base"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} className="md:size-6" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
