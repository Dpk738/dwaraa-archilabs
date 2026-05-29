import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0.3]);
  const scaleBg = useTransform(scrollY, [0, 500], [1, 1.1]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-bg select-none">
      {/* Background Image Container with Parallax Parabolic Motion */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src="/assets/hero_background.png"
          alt="Dwaraa Archilabs Modern Architecture Showcase"
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/85 via-transparent to-brand-bg/20" />
      </motion.div>

      {/* Main Content Pane */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-20 md:mt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start text-left"
        >
          {/* Subtitle tag */}
          <motion.div
            variants={itemVariants}
            className="order-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs md:text-sm font-semibold tracking-wider uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
            Every home tells a story. We write yours.
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="order-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-white leading-[1.1] mb-6"
          >
            Designing Spaces <br className="hidden md:inline" />
            That Feel Like <span className="text-brand-orange">Home.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="order-3 text-brand-gray text-base sm:text-lg md:text-xl font-light max-w-xl leading-relaxed mb-4 md:mb-8"
          >
            Architecture, interiors, and construction crafted with precision, elegance, and purpose. We transform your raw visions into premium living experiences.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="order-5 md:order-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-12 md:mt-0"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-8 py-4 bg-brand-orange text-brand-bg hover:bg-brand-orange/95 font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 hover:translate-y-[-2px] transition-all duration-300 group"
            >
              Book Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="px-8 py-4 border border-brand-white/20 text-brand-white hover:border-brand-orange/60 hover:text-brand-orange font-semibold rounded-full flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all duration-300"
            >
              View Projects
            </a>
          </motion.div>

          {/* Floating Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="order-4 md:order-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 md:mt-12 w-full border-t border-white/5 pt-4 md:pt-8"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
              <div>
                <p className="text-brand-white text-xs font-semibold uppercase tracking-wider">End-to-End Solutions</p>
                <p className="text-brand-gray text-xs">Concept to Final Keys</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
              <div>
                <p className="text-brand-white text-xs font-semibold uppercase tracking-wider">Architecture + Build</p>
                <p className="text-brand-gray text-xs">Seamless Project Cohesion</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
              <div>
                <p className="text-brand-white text-xs font-semibold uppercase tracking-wider">Personalized Design</p>
                <p className="text-brand-gray text-xs">Crafted Around You</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth scroll hint indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 cursor-pointer"
        onClick={(e) => handleScrollTo(e, '#about')}
      >
        <span className="text-brand-white/40 text-[10px] tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="text-brand-orange" size={20} />
      </motion.div>
    </section>
  );
}
