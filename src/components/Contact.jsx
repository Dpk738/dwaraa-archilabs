import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Interiors',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function validate(fields) {
    const errs = {}
    if (!fields.name.trim())
      errs.name = 'Name is required'
    if (!fields.phone.trim())
      errs.phone = 'Phone number is required'
    if (fields.phone.trim() && !/^[0-9+\s\-]{7,15}$/.test(fields.phone.trim()))
      errs.phone = 'Enter a valid phone number'
    if (!fields.message.trim())
      errs.message = 'Please describe your project'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const fields = {
      name: e.target.name.value.trim(),
      phone: e.target.phone.value.trim(),
      email: e.target.email.value.trim(),
      service: e.target.service.value,
      message: e.target.message.value.trim(),
    }

    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setStatus('submitting')
    setSubmittedName(fields.name)

    const emailPayload = {
      from_name: fields.name,
      from_phone: fields.phone,
      from_email: fields.email || 'Not provided',
      service_needed: fields.service,
      message: fields.message,
      submitted_at: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    }

    try {
      // 1. Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailPayload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // 2. Log to Supabase — non-blocking, failure does not
      //    affect the user experience
      try {
        const { error: dbError } = await supabase
          .from('leads')
          .insert([{
            name: fields.name,
            phone: fields.phone,
            email: fields.email || null,
            service_needed: fields.service,
            message: fields.message,
            submitted_at: new Date().toISOString(),
          }])
        if (dbError) console.warn('Supabase insert failed:', dbError.message)
      } catch (dbErr) {
        console.warn('Supabase error:', dbErr)
      }

      // 3. Show success
      setStatus('success')

      // 4. Open WhatsApp with all form details pre-filled
      const waMessage = encodeURIComponent(
        `Hi, I'm ${fields.name}. I just submitted an inquiry on dwaraa.in.\n\n` +
        `Service Needed: ${fields.service}\n` +
        `My Phone: ${fields.phone}\n` +
        `Email: ${fields.email || 'Not provided'}\n\n` +
        `Project Details:\n${fields.message}\n\n` +
        `Looking forward to connecting.`
      )
      window.open(
        `https://wa.me/${import.meta.env.VITE_CLIENT_WHATSAPP}?text=${waMessage}`,
        '_blank'
      )

    } catch (err) {
      console.error('Form submission failed:', err)
      setStatus('error')
    }
  }

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
                  <a href="tel:+916303858512" className="text-lg font-heading font-medium text-brand-white hover:text-brand-orange transition-colors">
                    +91 63038 58512
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
                    Sangareddy Bypass Rd,<br />
                    opp. Tara Degree College,<br />
                    Marepally, Ahmed Nagar,<br />
                    Sangareddy, Telangana 502001
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
                <p className="text-brand-gray text-xs max-w-xs mt-1">opp. Tara Degree College, Sangareddy Bypass Rd</p>
                
                <a
                  href="https://maps.google.com/?q=Sangareddy+Bypass+Rd,+opp.+Tara+Degree+College,+Marepally,+Ahmed+Nagar,+Sangareddy,+Telangana+502001"
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
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="text-brand-orange">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-brand-white mb-2">
                    Thank you, {submittedName}.
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed max-w-sm">
                    Your inquiry has been received. We'll be in touch shortly.
                    <br/>
                    A WhatsApp tab has opened — tap Send to connect instantly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setSubmittedName('');
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      service: 'Interiors',
                      message: ''
                    });
                  }}
                  className="text-brand-orange text-sm underline underline-offset-4 hover:text-brand-orange/80 transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <>
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
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
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
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                      )}
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
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-brand-orange text-brand-bg font-semibold rounded-xl hover:bg-brand-orange/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10"
                                  stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Proposal Request
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center mt-4 leading-relaxed">
                      Something went wrong. Please call us at{' '}
                      <a href="tel:+916303858512"
                         className="underline hover:text-red-300">
                        +91 63038 58512
                      </a>{' '}
                      or{' '}
                      <a href="https://wa.me/916303858512"
                         target="_blank" rel="noopener noreferrer"
                         className="underline hover:text-red-300">
                        message on WhatsApp
                      </a>.
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>

    </section>
  );
}

