import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../store/slices/settingsSlice";
import {
  Save,
  Store,
  Smartphone,
  MapPin,
  CreditCard,
  Loader2,
} from "lucide-react";
import BannerSection from "../../components/admin/Settings/BannerSection";

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      dispatch(updateSettings(formData));
      setIsSaving(false);
      alert("Pengaturan Berhasil Disimpan!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 lg:space-y-12">
      <header>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-1 md:mb-2">
          Pengaturan Toko
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Kelola identitas bisnis dan informasi operasional toko Anda.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Identitas Bisnis */}
        <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Store size={18} className="md:size-5" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">
              Identitas Bisnis
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                Nama Toko
              </label>
              <input
                type="text"
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.storeName}
                onChange={(e) =>
                  setFormData({ ...formData, storeName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                No. WhatsApp
              </label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-[18px] md:size-5" />
                <input
                  type="text"
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                />
              </div>
              <p className="text-[8px] md:text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">
                Gunakan Kode Negara (Contoh: 62812...)
              </p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                Alamat Toko
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 text-slate-400 size-[18px] md:size-5" />
                <textarea
                  rows={2}
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none text-sm md:text-base"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Pembayaran */}
        <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
              <CreditCard size={18} className="md:size-5" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">
              Informasi Pembayaran
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                Nama Bank
              </label>
              <input
                type="text"
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.bankAccount.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankAccount: {
                      ...formData.bankAccount,
                      bankName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                No. Rekening
              </label>
              <input
                type="text"
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                value={formData.bankAccount.accountNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankAccount: {
                      ...formData.bankAccount,
                      accountNumber: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Banner */}
        <BannerSection formData={formData} setFormData={setFormData} />

        {/* Save Button */}
        <div className="flex justify-end pt-4 pb-8 md:pb-12">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-primary text-white font-bold rounded-xl md:rounded-[22px] hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-2xl shadow-primary/20 disabled:opacity-70 w-full sm:w-auto text-sm md:text-base"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} className="md:size-6" />
            )}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
