import { useState, useEffect } from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactSection from '../components/landing/ContactSection';
import FooterSection from '../components/landing/FooterSection';
import StatsSection from '../components/landing/StatsSection';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * LandingPage – main assembly:
 *  ① Navbar  ② Hero  ③ Features  ④ Stats/Social Proof  ⑤ Testimonials  ⑥ Contact  ⑦ Footer
 * CursorEffect is now global in App.jsx – no need to include it here.
 */
const LandingPage = () => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('landing-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('landing-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const heroRef = useScrollReveal({ threshold: 0.05 });

  // Handle hash scrolling on mount (e.g. coming from /developers)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden', fontFamily: 'var(--font-sans)' }}>
      {/* ① Navbar */}
      <LandingNavbar theme={theme} toggleTheme={toggleTheme} />

      {/* ② Hero */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* ③ Features */}
      <FeaturesSection />

      {/* ④ Stats / Social Proof */}
      <StatsSection />

      {/* ⑤ Testimonials Slider */}
      <TestimonialsSection />

      {/* ⑥ Contact / CTA */}
      <ContactSection />

      {/* ⑦ Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
