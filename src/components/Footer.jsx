import { ArrowUp } from 'lucide-react';

const Instagram = ({ size = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = ({ size = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-bg border-t border-white/5 py-12 md:py-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Logo & About summary (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <img 
              src="/assets/logo.webp" 
              alt="Dwaraa Archilabs premium architecture and interior design studio logo" 
              className="h-10 w-auto object-contain"
            />
            <p className="text-brand-gray text-xs md:text-sm font-light max-w-sm leading-relaxed">
              Every home tells a story. We write yours. Hyderabad-based studio combining architectural planning, custom home interiors, building permissions, and execution.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/dwaraa.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange/40 text-brand-gray hover:text-brand-orange flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange/40 text-brand-gray hover:text-brand-orange flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange/40 text-brand-gray hover:text-brand-orange flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick links indexes (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-brand-white text-xs uppercase tracking-wider font-semibold">Studio Index</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="text-brand-gray hover:text-brand-orange text-sm font-light transition-colors w-fit">About Story</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="text-brand-gray hover:text-brand-orange text-sm font-light transition-colors w-fit">Our Services</a>
              <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="text-brand-gray hover:text-brand-orange text-sm font-light transition-colors w-fit">Commissions Portfolio</a>
              <a href="#process" onClick={(e) => handleLinkClick(e, '#process')} className="text-brand-gray hover:text-brand-orange text-sm font-light transition-colors w-fit">Execution Timeline</a>
            </div>
          </div>

          {/* Contact Details quick links (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-brand-white text-xs uppercase tracking-wider font-semibold">Representative Contacts</h4>
            <div className="flex flex-col gap-2.5 text-sm font-light text-brand-gray">
              <p>
                <strong className="text-brand-white font-medium">Phone: </strong>
                <a href="tel:+916303858512" className="hover:text-brand-orange transition-colors">+91 63038 58512</a>
              </p>
              <p>
                <strong className="text-brand-white font-medium">Location: </strong>
                Sangareddy Bypass Rd, opp. Tara Degree College, Marepally, Ahmed Nagar, Sangareddy, Telangana 502001
              </p>
              <p>
                <strong className="text-brand-white font-medium">Domain: </strong>
                <a href="https://dwaraa.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">dwaraa.in</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-brand-gray text-xs font-light text-center sm:text-left">
            &copy; {new Date().getFullYear()} Dwaraa Archilabs. All Rights Reserved. Designed by Dpk.
          </p>

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-brand-card border border-white/10 hover:border-brand-orange text-brand-white hover:text-brand-orange flex items-center justify-center transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
