import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const AddBannerCard = ({ onClick }) => (
  <motion.button
    layout
    type="button"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
  >
    <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
      <Plus size={18} />
    </div>
    <span className="text-xs font-semibold">Tambah Banner</span>
  </motion.button>
);

export default AddBannerCard;
