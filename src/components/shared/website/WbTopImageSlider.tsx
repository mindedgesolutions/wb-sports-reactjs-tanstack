import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  id: number;
  image: string;
  title?: string;
  description?: string;
  buttonText?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://swiperjs.com/demos/images/abstract-1.jpg',
    title: 'Banner 1',
    description: 'This is banner 1',
    buttonText: 'Read More ...',
  },
  {
    id: 2,
    image: 'https://swiperjs.com/demos/images/abstract-2.jpg',
    title: 'Banner 2',
    description: 'This is banner 2',
    buttonText: 'Read More ...',
  },
  {
    id: 3,
    image: 'https://swiperjs.com/demos/images/abstract-3.jpg',
    title: 'Banner 3',
    description: 'This is banner 3',
    buttonText: 'Read More ...',
  },
  {
    id: 4,
    image: 'https://swiperjs.com/demos/images/abstract-4.jpg',
    title: 'Banner 4',
    description: 'This is banner 4',
    buttonText: 'Read More ...',
  },
  {
    id: 5,
    image: 'https://swiperjs.com/demos/images/abstract-5.jpg',
    title: 'Banner 5',
    description: 'This is banner 5',
    buttonText: 'Read More ...',
  },
];

const WbTopImageSlider = () => {
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
    <section className="relative w-full h-75 md:h-150 overflow-visible">
      <div className="relative h-75 md:h-150 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[current].id}
            src={slides[current].image}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
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
                  className="text-lg md:text-5xl font-bold text-white mb-2 md:mb-6"
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
                  className="bg-primary hover:bg-primary/90 text-white text-xs tracking-wider px-2.5 md:px-4 py-1.5 md:py-2 rounded-xs transition-colors transform-gpu will-change-transform cursor-pointer"
                >
                  {slides[current].buttonText}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-secondary-foreground/60 z-10" />
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-1 md:p-3 rounded-full backdrop-blur"
      >
        <ChevronLeft className="text-white w-4 md:w-8 h-4 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-1 md:p-3 rounded-full backdrop-blur"
      >
        <ChevronRight className="text-white w-4 md:w-8 h-4 md:h-8" />
      </button>
      {/* Thumbnails */}
      <div className="flex absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-30 gap-2 md:gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-14 md:w-28 h-8 md:h-16 overflow-hidden border-2 shadow-xl transition-all duration-300 backdrop-blur-sm ${
              current === index
                ? 'border-primary scale-105'
                : 'border-white/40 opacity-100'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};
export default WbTopImageSlider;
