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
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 h-full flex flex-col"
    >
      <div className="relative aspect-[3/2] sm:aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product.featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] bg-secondary text-white font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}

        <Link
          to={`/product/${product.id}`}
          className="
            hidden sm:flex
            absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm
            opacity-0 group-hover:opacity-100
            transform translate-y-2 group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <Eye size={16} />
        </Link>
      </div>

      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold line-clamp-1">
            {product.name}
          </h3>
          <span className="text-primary text-sm sm:text-base font-bold ml-2">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>

        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="
            mt-auto
            w-full flex items-center justify-center gap-1 sm:gap-2
            py-2 sm:py-2.5 lg:py-3
            text-xs sm:text-sm font-bold
            bg-slate-50 rounded-xl
            hover:bg-primary hover:text-white transition-all
          "
        >
          <ShoppingCart size={16} />
          Tambah
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
