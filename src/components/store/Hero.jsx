import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavButton from '../common/NavButton';
import Dots from '../common/Dots';

const SLIDE_OFFSET = 60; // px, lebih kecil = lebih subtle

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? -SLIDE_OFFSET : SLIDE_OFFSET,
    opacity: 0,
    scale: 0.97,
  }),
};

const slideTransition = {
  x:       { type: 'spring', stiffness: 260, damping: 30 },
  opacity: { duration: 0.25 },
  scale:   { duration: 0.3 },
};


// Wrap helper — garantee consistent direction even at loop boundaries
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Hero = ({ banners = [] }) => {
  // [[page, direction]] — direction: +1 = next, -1 = prev
  const [[page, direction], setPage] = useState([0, 0]);

  const index = banners.length > 0 ? wrap(0, banners.length, page) : 0;

  const paginate = useCallback((dir) => {
    setPage(([p]) => [p + dir, dir]);
  }, []);

  const jumpTo = useCallback((targetIndex) => {
    setPage(([p]) => {
      const currentIndex = wrap(0, banners.length, p);
      const dir = targetIndex > currentIndex ? 1 : -1;
      // edge-case: jumping across loop boundary
      return [p + (targetIndex - currentIndex), dir];
    });
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[index];

  return (
    <section className="relative pt-20 md:pt-28 overflow-hidden
      min-h-120 md:min-h-150 lg:min-h-175 flex items-center">

      {/* Background decor — subtle, not competing */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 origin-top-right -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/8 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full
              text-xs font-bold uppercase tracking-widest mb-5">
              Apotik & Solusi Kesehatan Terpercaya
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              font-display font-extrabold leading-tight tracking-tight mb-5">
              Kesehatan Keluarga <br />
              <span className="text-primary italic">Adalah Prioritas</span> <br />
              Kami!
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Temukan berbagai jenis obat, vitamin, dan alat kesehatan berkualitas
              dengan harga terjangkau. Konsultasi mudah dan belanja aman via WhatsApp.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/store"
                className="flex items-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4
                  bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark
                  transition-all hover:scale-105 shadow-lg shadow-primary/20 text-sm md:text-base"
              >
                Mulai Belanja <ShoppingBag size={18} />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4
                  bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl
                  hover:bg-slate-50 transition-all text-sm md:text-base"
              >
                Hubungi Kami <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Slider ── */}
          <div className="order-1 lg:order-2 relative">

            {/* Accent circles — behind card */}
            <div className="absolute -top-5 -right-5 w-20 h-20 md:w-28 md:h-28
              bg-secondary rounded-full -z-10 opacity-60" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 md:w-44 md:h-44
              border-8 border-primary/20 rounded-full -z-10" />

            {/* Slide card */}
            <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden
              shadow-2xl bg-slate-100">

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  {/* Image */}
                  <img
                    src={banner?.image}
                    alt={banner?.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t
                    from-black/75 via-black/20 to-transparent" />

                  {/* Title */}
                  {banner?.title && (
                    <motion.div
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.18, duration: 0.35 }}
                      className="absolute bottom-0 inset-x-0 p-5 md:p-8"
                    >
                      <h3 className="text-white text-lg md:text-2xl font-bold font-display
                        leading-snug drop-shadow-sm">
                        {banner.title}
                      </h3>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next — overlaid on card corners, visible on all screens */}
              {banners.length > 1 && (
                <>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
                    <NavButton onClick={() => paginate(-1)} aria-label="Previous slide">
                      <ChevronLeft size={18} />
                    </NavButton>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                    <NavButton onClick={() => paginate(1)} aria-label="Next slide">
                      <ChevronRight size={18} />
                    </NavButton>
                  </div>
                </>
              )}
            </div>

            {/* Dots — below card, clearly visible */}
            {banners.length > 1 && (
              <div className="flex justify-center mt-5">
                <Dots total={banners.length} current={index} onSelect={jumpTo} />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;