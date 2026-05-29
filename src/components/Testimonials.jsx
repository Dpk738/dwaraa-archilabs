import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const reviews = [
  {
    quote: "Building a home in Hyderabad is usually filled with subcontractor delays and local authority hurdles. Dwaraa Archilabs changed that narrative completely. They managed our municipal drawings, structural execution, and custom interior woodwork. The G+2 villa handover was seamless.",
    author: "Karan & Sneha Reddy",
    role: "Villa Owners, Kokapet",
    rating: 5,
  },
  {
    quote: "We wanted a minimal, luxury interior layout that felt cozy. The design team paired warm timber grains with matte charcoal acrylic panels beautifully. Their engineering discipline was noticeable—every electrical conduit and cabinetry soft-close hinge was aligned to perfection.",
    author: "Dr. Srinivas Rao",
    role: "Residential Client, Jubilee Hills",
    rating: 5,
  },
  {
    quote: "Their material procurement contract management is completely transparent. Every wood thickness grade and cement brand matched the initial bills of quantities. Our new boutique agency workspace matches their initial 3D renderings to the millimeter.",
    author: "Rohan K.",
    role: "Director, Veloce Ventures",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden select-none">
      {/* Decorative orange highlights */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-[90px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Carousel Outer frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          className="relative max-w-4xl mx-auto bg-brand-card rounded-3xl border border-white/5 p-8 sm:p-12 md:p-16 overflow-hidden"
        >
          
          {/* Decorative Quote Icon */}
          <div className="absolute top-8 left-8 text-brand-orange/10">
            <Quote size={80} strokeWidth={1} />
          </div>

          <div className="relative z-10 min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-brand-white text-base sm:text-lg md:text-xl font-light italic leading-relaxed">
                  "{reviews[activeIndex].quote}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-brand-white font-heading font-bold text-base md:text-lg">
                    {reviews[activeIndex].author}
                  </h4>
                  <p className="text-brand-gray text-xs md:text-sm">
                    {reviews[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between mt-12 border-t border-white/5 pt-8">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'bg-brand-orange w-8'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-brand-orange/40 text-brand-white hover:text-brand-orange flex items-center justify-center transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-brand-orange/40 text-brand-white hover:text-brand-orange flex items-center justify-center transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
