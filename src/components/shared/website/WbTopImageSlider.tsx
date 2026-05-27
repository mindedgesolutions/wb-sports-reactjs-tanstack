import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { titles } from '@/constants';

const WbTopImageSlider = ({
  slides,
}: {
  slides: { id: number; path: string }[];
}) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-60 md:h-125 overflow-visible mb-20">
      <div className="relative h-60 md:h-125 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[current].id}
            src={`${titles.BASE_URL}${slides[current].path}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </AnimatePresence>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-secondary-foreground/60 " />
        {/* This part is for animated quotation and custom buttons - don't delete */}

        {/* <div className="relative  flex flex-col items-center justify-center h-full text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              {slides[current].title && (
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-5xl font-bold text-primary-foreground mb-2 md:mb-6"
                >
                  {slides[current].title}
                </motion.h1>
              )}

              {slides[current].description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-lg text-gray-200 mb-4 md:mb-8"
                >
                  {slides[current].description}
                </motion.p>
              )}

              {slides[current].buttonText && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease: 'easeOut',
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs tracking-wider px-2.5 md:px-4 py-1.5 md:py-2 rounded-xs transition-colors transform-gpu will-change-transform cursor-pointer"
                >
                  {slides[current].buttonText}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div> */}

        {/* This part is for animated quotation and custom buttons - don't delete */}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2  bg-white/20 hover:bg-white/30 p-1 md:p-3 rounded-full backdrop-blur"
      >
        <ChevronLeft className="text-primary-foreground w-4 md:w-8 h-4 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2  bg-white/20 hover:bg-white/30 p-1 md:p-3 rounded-full backdrop-blur"
      >
        <ChevronRight className="text-primary-foreground w-4 md:w-8 h-4 md:h-8" />
      </button>
      {/* Thumbnails */}
      <div className="flex absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2  gap-2 md:gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.path}
            onClick={() => setCurrent(index)}
            className={`w-14 md:w-28 h-8 md:h-16 overflow-hidden border-2 shadow-xl transition-all duration-300 backdrop-blur-sm ${
              current === index
                ? 'border-primary scale-105'
                : 'border-white/40 opacity-100'
            }`}
          >
            <img
              src={`${titles.BASE_URL}${slide.path}`}
              alt={String(slide.id)}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};
export default WbTopImageSlider;
