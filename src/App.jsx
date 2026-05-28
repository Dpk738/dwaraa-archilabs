import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-white selection:bg-brand-orange selection:text-brand-bg overflow-x-hidden font-body">
      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main Page Content Sections */}
      <main>
        {/* Cinematic Parallax Hero Section */}
        <Hero />

        {/* Story & Philosophy Section */}
        <About />

        {/* Core Services Section */}
        <Services />

        {/* Trust & Comparison Bento Grid */}
        <WhyChooseUs />

        {/* Selected Portfolio Showcase */}
        <Portfolio />

        {/* Stepper Timeline Workflow */}
        <Process />

        {/* Client Reviews Slider */}
        <Testimonials />

        {/* Call To Action Block */}
        <CTA />

        {/* Proposals Contact Form & Address */}
        <Contact />
      </main>

      {/* Minimal Brand Footer */}
      <Footer />
    </div>
  );
}
