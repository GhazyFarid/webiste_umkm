import { useState, useCallback } from "react";
import { Image as ImageIcon, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BannerCard from "./BannerCard";
import AddBannerCard from "./AddBannerCard";
import BannerModal from "./BannerModal";

const EMPTY_BANNER = { image: "", title: "" };

const BannerSection = ({ formData, setFormData }) => {
  // modal state: null = closed, -1 = add new, 0..n = edit index
  const [modalIndex, setModalIndex] = useState(null);

  const openAdd = () => setModalIndex(-1);
  const openEdit = (i) => setModalIndex(i);
  const closeModal = () => setModalIndex(null);

  const handleSave = useCallback(
    (draft) => {
      const banners = [...formData.banners];
      if (modalIndex === -1) {
        banners.push(draft);
      } else {
        banners[modalIndex] = draft;
      }
      setFormData({ ...formData, banners });
    },
    [formData, modalIndex, setFormData],
  );

  const handleDelete = useCallback(
    (i) => {
      setFormData({
        ...formData,
        banners: formData.banners.filter((_, idx) => idx !== i),
      });
    },
    [formData, setFormData],
  );

  const activeBanner =
    modalIndex === null
      ? null
      : modalIndex === -1
        ? { ...EMPTY_BANNER }
        : { ...formData.banners[modalIndex] };

  return (
    <section className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-100 shadow-sm">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
            <ImageIcon size={18} className="md:size-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-display font-bold leading-none">
              Homepage Banners
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {formData.banners.length} banner aktif
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-xl font-bold text-xs transition-all"
        >
          <Plus size={14} />
          Tambah
        </button>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {formData.banners.map((banner, i) => (
            <BannerCard
              key={`banner-${i}`}
              banner={banner}
              index={i}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>

        {/* Ghost "Add" card */}
        <AddBannerCard onClick={openAdd} />
      </motion.div>

      {/* Empty state */}
      {formData.banners.length === 0 && (
        <p className="text-center text-sm text-slate-400 mt-4">
          Belum ada banner. Klik <strong>Tambah</strong> untuk menambahkan.
        </p>
      )}

      {/* Modal */}
      {activeBanner !== null && (
        <BannerModal
          banner={activeBanner}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default BannerSection;