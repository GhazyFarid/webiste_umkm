import { Trash2, Pencil, ImageOff } from "lucide-react";
import { motion } from "framer-motion";

const BannerCard = ({ banner, index, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.88 }}
    transition={{ duration: 0.2 }}
    className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md transition-shadow"
  >
    {/* Image preview */}
    <div className="aspect-video w-full bg-slate-100 overflow-hidden">
      {banner.image ? (
        <img
          src={banner.image}
          alt={banner.title || `Banner ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
          <ImageOff size={28} />
          <span className="text-xs font-medium">No image</span>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="px-3 py-2.5 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          Banner #{index + 1}
        </p>
        <p className="text-sm font-semibold text-slate-700 truncate">
          {banner.title || (
            <span className="text-slate-300 font-normal italic">No title</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onEdit(index)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
          aria-label="Edit banner"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          aria-label="Delete banner"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  </motion.div>
);

export default BannerCard;
