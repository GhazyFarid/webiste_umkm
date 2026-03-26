import { useSelector } from "react-redux";
import { ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Featured
          </span>
        )}
        <div className="absolute inset-0 pointer-events-none">
          <Link
            to={`/product/${product.id}`}
            className="absolute top-3 right-3 p-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white pointer-events-auto"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2 font-display">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-primary font-bold whitespace-nowrap ml-2">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-primary hover:text-white transition-all group-hover:bg-primary group-hover:text-white"
        >
          <ShoppingCart size={18} />
          Tambah
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
