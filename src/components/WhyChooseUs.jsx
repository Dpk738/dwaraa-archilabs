import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle, HelpCircle, PenTool, Sparkles, Layers, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 18 },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Visual background lines */}
      <div className="absolute top-0 right-10 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title Block */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            The Dwaraa Edge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white leading-tight">
            Why Discerning Clients Choose Our Studio Over Traditional Contractors
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {/* Bento Card 1: End-to-End Execution (Large, spans 3 cols, 2 rows equivalent or large layout block) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 p-8 md:p-12 rounded-3xl bg-brand-card border border-white/5 flex flex-col justify-between group hover:border-brand-orange/10 transition-colors duration-300"
          >
            <div>
              <Award className="text-brand-orange mb-8" size={32} />
              <h3 className="text-2xl font-heading font-bold text-brand-white mb-4">
                Unified End-to-End Custody
              </h3>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed">
                Typically, homeowners run back and forth between independent architects, modular kitchen vendors, structural engineers, and brick contractors. This creates massive coordination delays and budget overflows. 
              </p>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed mt-4">
                Dwaraa Archilabs integrates **all these services** under one project manager. We draft the plans, secure permissions, build the core brick structure, and hand over fully furnished interiors.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-xs uppercase font-semibold text-brand-white">One Studio. Absolute Responsibility.</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Functional Luxury (Spans 3 cols) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 p-8 md:p-12 rounded-3xl bg-brand-card border border-white/5 flex flex-col justify-between group hover:border-brand-orange/10 transition-colors duration-300"
          >
            <div>
              <Sparkles className="text-brand-orange mb-8" size={32} />
              <h3 className="text-2xl font-heading font-bold text-brand-white mb-4">
                Tailored Functional Luxury
              </h3>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed">
                A gorgeous home is useless if it is difficult to live in. We avoid templated designs. We model custom woodwork, wardrobe configurations, electrical layouts, and lighting fixtures specifically around your daily family habits.
              </p>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed mt-4">
                Our materials are curated for high-traffic residential durability: high-density moisture-resistant (HDMR) board panels, soft-close hardware, premium matte acrylic surfaces, and structural concrete framing.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-xs uppercase font-semibold text-brand-white">Crafted for Families & Villa Owners</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Transparent Billing (Spans 2 cols) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 p-8 rounded-3xl bg-brand-card border border-white/5 flex flex-col justify-between group hover:border-brand-orange/10 transition-colors duration-300"
          >
            <div>
              <ShieldCheck className="text-brand-orange mb-6" size={24} />
              <h4 className="text-lg font-heading font-bold text-brand-white mb-3">
                Transparent Estimates
              </h4>
              <p className="text-brand-gray text-xs md:text-sm font-light leading-relaxed">
                No hidden costs. We provide completely transparent bills of quantities (BOQ) with specific material grades, lumber types, paint specs, and thickness listings before contract signing.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 4: Timely Delivery (Spans 2 cols) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 p-8 rounded-3xl bg-brand-card border border-white/5 flex flex-col justify-between group hover:border-brand-orange/10 transition-colors duration-300"
          >
            <div>
              <Clock className="text-brand-orange mb-6" size={24} />
              <h4 className="text-lg font-heading font-bold text-brand-white mb-3">
                On-Time Handover
              </h4>
              <p className="text-brand-gray text-xs md:text-sm font-light leading-relaxed">
                We design and follow modular milestone charts. Our execution teams are trained to coordinate layouts alongside masonry schedules to guarantee delivery timelines.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 5: Engineering Supervision (Spans 2 cols) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 p-8 rounded-3xl bg-brand-card border border-white/5 flex flex-col justify-between group hover:border-brand-orange/10 transition-colors duration-300"
          >
            <div>
              <Layers className="text-brand-orange mb-6" size={24} />
              <h4 className="text-lg font-heading font-bold text-brand-white mb-3">
                Engineering Supervision
              </h4>
              <p className="text-brand-gray text-xs md:text-sm font-light leading-relaxed">
                All structural works, building permissions, and material contract layers are overseen directly by qualified site engineers to ensure exact execution standard compliance.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
