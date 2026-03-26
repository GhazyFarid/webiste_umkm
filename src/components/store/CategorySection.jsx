import { motion } from 'framer-motion';

const CategorySection = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">Kategori</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Cari Berdasarkan Minat</h2>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
              !selectedCategory 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 transform scale-105' 
                : 'bg-white border-slate-100 text-slate-500 hover:border-primary/30'
            }`}
          >
            Semua Produk
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-8 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                selectedCategory === cat.name
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 transform scale-105'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-primary/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
