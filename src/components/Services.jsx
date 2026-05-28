import { motion } from 'framer-motion';
import { 
  Home, 
  Grid, 
  Compass, 
  Hammer, 
  MapPin, 
  Layers, 
  FileCheck, 
  ShieldAlert 
} from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Complete Home Interiors',
    description: 'Bespoke end-to-end interior transformations, mapping design language across living areas, master suites, and bespoke partition systems.',
  },
  {
    icon: Grid,
    title: 'Cupboards & Modular Solutions',
    description: 'Precision-engineered modular kitchens, walkthrough wardrobes, and customized storage solutions that merge luxury finishes with clever space utilities.',
  },
  {
    icon: Compass,
    title: 'Architectural Drawings & Planning',
    description: 'Comprehensive 2D blueprint drafting, 3D spatial models, elevations, structural loading details, and optimized floor layouts.',
  },
  {
    icon: Hammer,
    title: 'Building Construction Works',
    description: 'Turnkey residential and commercial construction executed with premium material standards, strict engineering supervision, and timelines.',
  },
  {
    icon: MapPin,
    title: 'Site Development Services',
    description: 'Full site preparation, boundary layouts, water channel planning, landscape grading, and structural setup alignment.',
  },
  {
    icon: Layers,
    title: 'Land Development',
    description: 'Large-scale layout planning, subdivision grading, internal road layouts, infrastructure planning, and landscaping blueprints.',
  },
  {
    icon: FileCheck,
    title: 'Material Contract Works',
    description: 'Trusted raw material procurement, metal work fabrication, and masonry contracting with premium transparent materials billing.',
  },
  {
    icon: ShieldAlert,
    title: 'Municipal Permission Assistance',
    description: 'Hassle-free document preparation, local regulation compliance checks, and approval coordination with Hyderabad municipality bodies.',
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Subtle orange ambient orb */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Core Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white mb-6">
            Comprehensive Spatial Design & Execution
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-light">
            From initial sketch approvals to modular interior setups, we manage the entire project pipeline. One brand, zero execution disputes.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-orange/20 transition-colors duration-300 flex flex-col justify-between aspect-square md:aspect-auto min-h-[300px]"
              >
                {/* Accent border glow indicator */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-glow-orange pointer-events-none" />

                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/20 transition-all duration-300">
                    <Icon className="text-brand-white group-hover:text-brand-orange transition-colors" size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-brand-white mb-4 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-gray text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subtle bottom detail */}
                <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange">
                    Explore Details
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
