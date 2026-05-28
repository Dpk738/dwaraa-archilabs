import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function CTA() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background architectural mesh lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radiant Orange glow backlighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="p-12 md:p-20 rounded-3xl bg-brand-card border border-white/5 relative overflow-hidden"
        >
          {/* Top orange detail line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[3px] bg-brand-orange" />

          {/* Section Subhead */}
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Start Your Transformation
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white mb-6 leading-tight max-w-2xl mx-auto">
            Let’s Build Your Dream Space.
          </h2>

          {/* Brief Text */}
          <p className="text-brand-gray text-sm sm:text-base font-light max-w-xl mx-auto mb-10 leading-relaxed">
            From design concepts to municipal permissions and final structural handovers, Dwaraa Archilabs delivers spaces crafted to inspire. Let us write your home story.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-brand-bg hover:bg-brand-orange/95 font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 transition-all duration-300 group"
            >
              Schedule Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="https://wa.me/919059919196"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 text-brand-white hover:border-brand-orange/40 hover:text-brand-orange font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MessageSquare size={18} />
              WhatsApp Direct
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
