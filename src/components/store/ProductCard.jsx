import { useSelector } from 'react-redux';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
            <Eye size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2 font-display">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-primary font-bold whitespace-nowrap ml-2">
            Rp {product.price.toLocaleString('id-ID')}
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
