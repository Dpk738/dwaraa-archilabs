import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const projects = [
  {
    id: 1,
    name: 'The Kingston Lounge',
    location: 'Nallagandla, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'A sophisticated modern living space featuring a textured accent wall with vertical slot patterns, custom leather sectional seating, and custom ceiling-recessed climate control.',
    image: '/assets/vertex_kingston.webp',
  },
  {
    id: 2,
    name: 'The Vasanth Nagar Suite',
    location: 'Vasanth Nagar, Bengaluru',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'A contemporary apartment hall in Bengaluru combining fluted wooden paneling, a minimalist wash alcove, custom art inserts, and elegant neutral-toned furniture.',
    image: '/assets/vasanth_nagar.webp',
  },
  {
    id: 3,
    name: 'The Zen Living Room',
    location: 'Gachibowli, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'A minimalist residential lounge layout incorporating a custom modular tufted sofa, Japanese-inspired vertical landscape artwork, and marble flooring.',
    image: '/assets/block_renders.webp',
  },
  {
    id: 4,
    name: 'The Sage Sanctuary Bed',
    location: 'HITEC City, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'A bespoke master bedroom detailed with a curved plaster corner, a custom olive-green geometric panel wall, cylindrical brass pendants, and minimalist study seating.',
    image: '/assets/bespoke_bedroom.webp',
  },
  {
    id: 5,
    name: 'The Urban Retreat Bedroom',
    location: 'Financial District, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'A modern bedroom layout maximizing utility with an integrated window daybed, custom fluted-glass wardrobes with integrated warm lighting, and a personal hobby corner.',
    image: '/assets/bedroom_renders.webp',
  },
  {
    id: 6,
    name: 'The Grand Atrium Living',
    location: 'Kokapet, Hyderabad',
    category: 'Interiors',
    subCategories: ['Interiors', 'Residential'],
    description: 'An ultra-luxury apartment lounge defined by a golden rippled water-effect ceiling panel, curved boucle seating, and a full-height bookmatched marble media wall with an integrated hearth.',
    image: '/assets/apartment_interiors.webp',
  },
];

export default function Portfolio() {
  const scrollContainerRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Monitor screen size to enable looping mode only on mobile viewports
  useEffect(() => {
    const handleResize = () => {
      const isMobileWidth = window.innerWidth < 768;
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsMobile(isMobileWidth || !hasHover);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup virtual looping array (duplicate elements at start/end) strictly for mobile slideshow
  const loopingProjects = useMemo(() => {
    return isMobile && projects.length > 1
      ? [
          { ...projects[projects.length - 1], id: `start-dup-${projects[projects.length - 1].id}`, isDuplicate: true },
          ...projects.map(p => ({ ...p, isDuplicate: false })),
          { ...projects[0], id: `end-dup-${projects[0].id}`, isDuplicate: true }
        ]
      : projects.map(p => ({ ...p, isDuplicate: false }));
  }, [isMobile]);

  // Jump scrollLeft to the first original card on list changes or view initialization
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    const resetScroll = () => {
      const cards = Array.from(container.querySelectorAll('.snap-start')).filter(card => {
        const cardId = card.getAttribute('data-id');
        return loopingProjects.some(p => String(p.id) === cardId);
      });

      if (cards.length > 2 && cards[1]) {
        container.scrollLeft = cards[1].offsetLeft;
      } else {
        container.scrollLeft = 0;
      }
      setActiveSlideIndex(0);
    };

    const timer = setTimeout(resetScroll, 50);
    return () => clearTimeout(timer);
  }, [loopingProjects, isMobile]);

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

    // Helper to get active cards, filtering out exiting elements
    const getActiveCards = () => {
      return Array.from(container.querySelectorAll('.snap-start')).filter(card => {
        const cardId = card.getAttribute('data-id');
        return loopingProjects.some(p => String(p.id) === cardId);
      });
    };

    const scheduleNextSlide = (delay) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        const cards = getActiveCards();
        if (cards.length <= 1) return;

        // Find the card closest to the current scroll position
        let currentIdx = 1;
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

    // Loop scroller boundaries invisibly
    const handleScrollBoundary = () => {
      const cards = getActiveCards();
      if (cards.length <= 2) return;

      const scrollLeft = container.scrollLeft;
      const firstOriginal = cards[1];
      const lastOriginal = cards[cards.length - 2];
      const startDuplicate = cards[0];
      const endDuplicate = cards[cards.length - 1];

      if (!firstOriginal || !lastOriginal || !startDuplicate || !endDuplicate) return;

      // Jump from right duplicate to first original card
      if (scrollLeft >= endDuplicate.offsetLeft - 10) {
        container.scrollLeft = firstOriginal.offsetLeft;
        setActiveSlideIndex(0);
      }
      // Jump from left duplicate to last original card
      else if (scrollLeft <= startDuplicate.offsetLeft + 10) {
        container.scrollLeft = lastOriginal.offsetLeft;
        setActiveSlideIndex(projects.length - 1);
      } else {
        // Calculate closest card to set active dot
        let closestIdx = 1;
        let minDiff = Infinity;
        cards.forEach((card, idx) => {
          const diff = Math.abs(card.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        const totalOriginals = projects.length;
        let mappedIdx = closestIdx - 1;
        if (closestIdx === 0) {
          mappedIdx = totalOriginals - 1;
        } else if (closestIdx === cards.length - 1) {
          mappedIdx = 0;
        }
        
        setActiveSlideIndex(mappedIdx);
      }
    };

    container.addEventListener('touchstart', handleInteraction, { passive: true });
    container.addEventListener('mousedown', handleInteraction);
    container.addEventListener('scroll', handleScrollBoundary, { passive: true });

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('mousedown', handleInteraction);
      container.removeEventListener('scroll', handleScrollBoundary);
    };
  }, [loopingProjects]);


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
          className="mb-16 md:mb-24"
        >
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white">
            Selected Commissions
          </h2>
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
            {loopingProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                key={project.id}
                data-id={project.id}
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

        {/* Mobile Pagination Dots */}
        {isMobile && projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (!container) return;
                  const cards = container.querySelectorAll('.snap-start');
                  const targetCard = cards[idx + 1];
                  if (targetCard) {
                    container.scrollTo({
                      left: targetCard.offsetLeft,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSlideIndex === idx
                    ? 'bg-brand-orange w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
