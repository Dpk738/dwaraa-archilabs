import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, Send, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Interiors',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Local validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setStatus('submitting');

    // Simulate API submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Interiors',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-white/[0.02]" />
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-white">
            Let's Discuss Your Project
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Contact Details & Map (Left Column - 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="lg:col-span-5 flex flex-col justify-between gap-12"
          >
            
            {/* Info Cards List */}
            <div className="space-y-8">
              {/* Phone Card */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="text-brand-orange" size={20} />
                </div>
                <div>
                  <p className="text-brand-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Call Representative</p>
                  <a href="tel:+919059919196" className="text-lg font-heading font-medium text-brand-white hover:text-brand-orange transition-colors">
                    +91 90599 19196
                  </a>
                  <p className="text-brand-gray text-xs mt-1">Direct project coordinator helpline</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-orange" size={20} />
                </div>
                <div>
                  <p className="text-brand-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Office Address</p>
                  <p className="text-brand-white text-base font-medium leading-relaxed">
                    Sangareddy Bypass Road,<br />
                    Opposite BSNL Office,<br />
                    Sangareddy, Telangana
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Clock className="text-brand-orange" size={20} />
                </div>
                <div>
                  <p className="text-brand-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Business Hours</p>
                  <p className="text-brand-white text-base font-medium">
                    Monday – Saturday
                  </p>
                  <p className="text-brand-gray text-xs">10:00 AM – 08:00 PM</p>
                </div>
              </div>
            </div>

            {/* Custom Styled Maps Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-brand-card aspect-[16/9] lg:aspect-auto lg:h-[220px] flex items-center justify-center group">
              <div className="absolute inset-0 bg-neutral-900 flex flex-col justify-center items-center p-6 text-center select-none">
                {/* Abstract grid texture */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mapgrid)" />
                  </svg>
                </div>
                <MapPin className="text-brand-orange mb-3 animate-bounce" size={28} />
                <h4 className="text-brand-white font-heading font-semibold text-sm">Dwaraa Archilabs Location</h4>
                <p className="text-brand-gray text-xs max-w-xs mt-1">Opposite BSNL Office, Sangareddy Bypass Road</p>
                
                <a
                  href="https://maps.google.com/?q=BSNL+Office+Sangareddy+Telangana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-brand-bg border border-white/10 text-brand-white rounded-lg text-xs font-medium hover:border-brand-orange/40 hover:text-brand-orange transition-colors"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

          </motion.div>

          {/* Form (Right Column - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="lg:col-span-7 p-8 md:p-12 rounded-3xl bg-brand-card border border-white/5 relative"
          >
            <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-white mb-8">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2 font-medium">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-brand-bg/60 border border-white/5 focus:border-brand-orange/40 rounded-xl px-4 py-3 text-brand-white placeholder-brand-gray/30 text-sm outline-none transition-colors"
                />
              </div>

              {/* Grid: Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-brand-bg/60 border border-white/5 focus:border-brand-orange/40 rounded-xl px-4 py-3 text-brand-white placeholder-brand-gray/30 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-brand-bg/60 border border-white/5 focus:border-brand-orange/40 rounded-xl px-4 py-3 text-brand-white placeholder-brand-gray/30 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Select Dropdown */}
              <div>
                <label htmlFor="service" className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2 font-medium">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-brand-bg/60 border border-white/5 focus:border-brand-orange/40 rounded-xl px-4 py-3 text-brand-white text-sm outline-none transition-colors cursor-pointer"
                >
                  <option value="Interiors">Complete Home Interiors</option>
                  <option value="Cupboards">Modular Cupboards & Wardrobes</option>
                  <option value="Architecture">Architectural Planning & Drawings</option>
                  <option value="Construction">Building Construction Works</option>
                  <option value="Permissions">Municipal Permissions Support</option>
                  <option value="Materials">Material Sourcing Contract</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2 font-medium">Describe Your Project *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your requirements (e.g. 3BHK villa construction, wardrobes planning...)"
                  className="w-full bg-brand-bg/60 border border-white/5 focus:border-brand-orange/40 rounded-xl px-4 py-3 text-brand-white placeholder-brand-gray/30 text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Error/Success Feedbacks */}
              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs"
                  >
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-950/20 border border-green-900/30 text-green-400 text-xs"
                  >
                    <CheckCircle size={16} />
                    <span>Thank you! Your message was sent successfully. We will get back to you shortly.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-brand-orange text-brand-bg font-semibold rounded-xl hover:bg-brand-orange/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    Submitting Proposal...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Proposal Request
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Floating WhatsApp CTA Indicator bottom right */}
      <a
        href="https://wa.me/919059919196"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-110 active:scale-95 group md:hidden"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="group-hover:rotate-12 transition-transform" />
      </a>
    </section>
  );
}
