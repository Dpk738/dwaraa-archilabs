import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Consultation & Discovery',
    description: 'We meet on-site or at our studio to map out your structural goals, stylistic preferences (luxury, minimal, modern), functional desires, and budget bounds.',
  },
  {
    num: '02',
    title: 'Planning & Layout Concept',
    description: 'Our design office maps initial 2D space layouts and architectural planning options. We review local municipal regulations to set up approval strategies.',
  },
  {
    num: '03',
    title: 'Design Development & 3D Render',
    description: 'We translate approved layouts into highly detailed 3D spatial models. You see photorealistic versions of your modular kitchen, living panels, and facade options.',
  },
  {
    num: '04',
    title: 'Material & Fitting Selection',
    description: 'We visit material hubs to finalize precise finishes: timber selection, laminates, countertop marbles, sanitary fittings, and light setups, finalizing direct item BOQs.',
  },
  {
    num: '05',
    title: 'Engineering & Construction Execution',
    description: 'Our structural engineers and interior carpenters start site development. We control quality standards at every layer, from foundation concrete to wardrobe alignment.',
  },
  {
    num: '06',
    title: 'Quality Audit & Key Handover',
    description: 'We conduct a thorough final inspection audit covering plumbing pressure, drawer alignments, paint finishes, and custom wiring. Your move-in-ready keys are delivered.',
  },
];

export default function Process() {
  const leftItemVariants = {
    hidden: { opacity: 0, x: -40, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 16 },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 40, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 16 },
    },
  };

  return (
    <section id="process" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Dynamic light spot */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Our Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white mb-6">
            From Vision to Handovers
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-light">
            We operate under a transparent, 6-stage structured framework to ensure execution precision without communication gaps.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Centered vertical line on desktop, left line on mobile */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  variants={isEven ? leftItemVariants : rightItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`flex flex-col md:flex-row items-start relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* central pointer circle */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-brand-orange border-4 border-brand-bg shadow-glow-orange z-10 -translate-x-1/2 top-1.5" />

                  {/* Spacer pane to push text to respective side */}
                  <div className="hidden md:block w-1/2" />

                  {/* Actual Text Box */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 flex flex-col items-start">
                    <div className="p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-orange/10 transition-colors duration-300 w-full relative">
                      
                      {/* Step Number Badge */}
                      <span className="absolute top-6 right-6 font-heading font-bold text-3xl md:text-4xl text-white/5 group-hover:text-brand-orange/10 transition-colors select-none">
                        {step.num}
                      </span>

                      <h3 className="text-lg md:text-xl font-heading font-bold text-brand-white mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
