import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Interiors', 'Architecture', 'Construction', 'Residential', 'Commercial'];

const projects = [
  {
    id: 1,
    name: 'The Obsidian Villa',
    location: 'Jubilee Hills, Hyderabad',
    category: 'Architecture',
    subCategories: ['Architecture', 'Residential'],
    description: 'A minimal concrete and glass architectural villa showcasing dramatic floating volumes and linear lighting.',
    image: '/assets/project_architecture.png',
  },
  {
    id: 2,
    name: 'Bespoke Modular Living',
    location: 'Gachibowli, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'Custom HDMR kitchen cabinets and modular walkthrough wardrobes featuring premium wood and copper hardware.',
    image: '/assets/project_interior.png',
  },
  {
    id: 3,
    name: 'The Archilabs Structural Build',
    location: 'Sangareddy, Telangana',
    category: 'Construction',
    subCategories: ['Construction', 'Residential'],
    description: 'Structural concrete framework and foundation slab development for a modern luxury multi-family residence.',
    image: '/assets/project_construction.png',
  },
  {
    id: 4,
    name: 'Veloce Commercial Lobby',
    location: 'HITEC City, Hyderabad',
    category: 'Commercial',
    subCategories: ['Commercial'],
    description: 'An architectural design studio and lobby layout prioritizing raw microconcrete walls and matte black accent slats.',
    image: '/assets/project_commercial.png',
  },
  {
    id: 5,
    name: 'The Concrete Canopy',
    location: 'Kokapet, Hyderabad',
    category: 'Architecture',
    subCategories: ['Architecture', 'Residential'],
    description: 'A premium villa featuring expansive raw concrete overhangs, double-height glazing, and custom steel frames.',
    image: '/assets/hero_background.png',
  },
  {
    id: 6,
    name: 'Aura Master Bedroom Suite',
    location: 'Financial District, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'Luxury master suite details with floor-to-ceiling wardrobe fittings, hidden hardware, and warm LED profile bands.',
    image: '/assets/about_design.png',
  },
];

export default function Portfolio() {
  const [activeFilters, setActiveFilters] = useState(['All']);
  const scrollContainerRef = useRef(null);
  const timeoutIdRef = useRef(null);

  const filteredProjects = activeFilters.includes('All') || activeFilters.length === 0
    ? projects
    : projects.filter(p => p.subCategories.some(cat => activeFilters.includes(cat)));

  useEffect(() => {
    // Only run auto-scroll slideshow on mobile
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      return isMobileWidth || !hasHover;
    };

    if (!checkMobile()) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const scheduleNextSlide = (delay) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        const cards = container.querySelectorAll('.snap-start');
        if (cards.length <= 1) return;

        // Find the card closest to the current scroll position
        let currentIdx = 0;
        let minDiff = Infinity;
        const scrollLeft = container.scrollLeft;

        cards.forEach((card, idx) => {
          const diff = Math.abs(card.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            currentIdx = idx;
          }
        });

        // Calculate next index
        const nextIdx = (currentIdx + 1) % cards.length;
        const targetCard = cards[nextIdx];

        if (targetCard) {
          container.scrollTo({
            left: targetCard.offsetLeft,
            behavior: 'smooth',
          });
        }

        // Schedule the next one with default 2.5s delay
        scheduleNextSlide(2500);
      }, delay);
    };

    // Start auto-swiping with initial 2.5s delay
    scheduleNextSlide(2500);

    const handleInteraction = () => {
      // User manual interaction detected. Reset and delay the next swipe by 6 seconds.
      scheduleNextSlide(6000);
    };

    container.addEventListener('touchstart', handleInteraction, { passive: true });
    container.addEventListener('mousedown', handleInteraction);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('mousedown', handleInteraction);
    };
  }, [filteredProjects]);

  const handleFilterClick = (cat) => {
    if (cat === 'All') {
      setActiveFilters(['All']);
    } else {
      let newFilters = activeFilters.filter(f => f !== 'All');
      if (newFilters.includes(cat)) {
        newFilters = newFilters.filter(f => f !== cat);
      } else {
        newFilters = [...newFilters, cat];
      }
      if (newFilters.length === 0) {
        newFilters = ['All'];
      }
      setActiveFilters(newFilters);
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Structural layout lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div>
            <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white">
              Selected Commissions
            </h2>
          </div>

          {/* Filtering Buttons */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2 md:gap-3 max-w-full">
            {categories.map((cat) => {
              const isActive = activeFilters.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleFilterClick(cat)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-brand-orange text-brand-bg border-brand-orange'
                      : 'bg-brand-card border-white/5 text-brand-gray hover:text-brand-white hover:border-white/10'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && isActive && (
                    <span className="text-[10px] font-bold leading-none select-none">✕</span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          ref={scrollContainerRef}
          layout
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="relative flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-4 md:pb-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                key={project.id}
                className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col justify-end aspect-[4/5] shadow-xl snap-start snap-always shrink-0 w-[85vw] sm:w-[450px] md:w-auto"
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent group-hover:via-brand-bg/50 transition-all duration-300 pointer-events-none" />

                {/* Content Pane */}
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  
                  {/* Category + Location tags */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange px-2 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/10">
                      {project.category}
                    </span>
                    <span className="text-brand-gray text-[10px] uppercase tracking-widest font-semibold">
                      {project.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-white mb-2 group-hover:text-brand-orange transition-colors">
                    {project.name}
                  </h3>

                  {/* Hover description sliding panel */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                    <p className="text-brand-gray text-xs md:text-sm font-light overflow-hidden leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Outer frame border */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-brand-orange/20 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
