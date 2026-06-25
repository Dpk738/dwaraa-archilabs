import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Decorative architectural layout line grid */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
        >
          {/* Visual Presentation (Left Side) */}
          <motion.div variants={imageVariants} className="lg:col-span-6 relative">
            {/* Ambient background orange spotlight */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-orange/10 rounded-full blur-[80px]" />
            
            {/* Overlapping Border Accent */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-orange/20 rounded-2xl pointer-events-none" />

            {/* Core Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group">
              <img
                src="/assets/about_design.webp"
                alt="Luxury living space design by Dwaraa Archilabs, Hyderabad"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent opacity-60" />
            </div>

            {/* Small floating badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl glass border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-brand-orange font-heading text-3xl font-bold">100%</p>
                <p className="text-brand-white text-xs font-semibold uppercase tracking-wider">Hassle-Free Build</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <p className="text-brand-white font-heading text-lg font-medium">Hyderabad</p>
                <p className="text-brand-gray text-xs">Primary Execution Hub</p>
              </div>
            </div>
          </motion.div>

          {/* About Editorial Narrative (Right Side) */}
          <motion.div variants={textVariants} className="lg:col-span-6 flex flex-col justify-center">
            {/* Section Tag */}
            <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
              Dwaraa Archilabs
            </span>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white mb-6 leading-tight">
              Thoughtfully Designed.<br />
              Expertly Built.
            </h2>

            {/* Body copy */}
            <p className="text-brand-gray text-sm sm:text-base leading-relaxed mb-6 font-light">
              At Dwaraa Archilabs, we believe that premium architecture is not just about aesthetics—it is about creating spaces that elevate the daily lives of the people who inhabit them. Every detail, from structural efficiency to bespoke cabinet textures, is conceptualized with ultimate functionality and practical luxury.
            </p>

            <p className="text-brand-gray text-sm sm:text-base leading-relaxed mb-8 font-light">
              We eliminate the stress of local build contracts by unifying architectural design, construction execution, complete custom home interiors, municipal compliance, and material procurement under a single, highly reliable studio.
            </p>

            {/* Core Values grid */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              <div>
                <h4 className="text-brand-white font-heading font-semibold text-base mb-2">Practical Luxury</h4>
                <p className="text-brand-gray text-xs font-light">
                  Tailored designs that are gorgeous, yet built for long-term usability.
                </p>
              </div>
              <div>
                <h4 className="text-brand-white font-heading font-semibold text-base mb-2">Single-Point Control</h4>
                <p className="text-brand-gray text-xs font-light">
                  Zero contractor disputes. We manage drawing, permission, and builds.
                </p>
              </div>
              <div>
                <h4 className="text-brand-white font-heading font-semibold text-base mb-2">Transparent Progress</h4>
                <p className="text-brand-gray text-xs font-light">
                  Clear material lists, scheduled handovers, and reliable estimates.
                </p>
              </div>
              <div>
                <h4 className="text-brand-white font-heading font-semibold text-base mb-2">Execution Custody</h4>
                <p className="text-brand-gray text-xs font-light">
                  A specialized team of engineers and decorators oversees each project.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
