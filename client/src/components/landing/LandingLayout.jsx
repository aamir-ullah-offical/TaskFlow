import { useState, useEffect } from 'react';
import LandingNavbar from './LandingNavbar';
import FooterSection from './FooterSection';

/**
 * LandingLayout – shared wrapper for pages accessible from the landing navbar.
 * Provides: consistent navbar + theme toggle + footer.
 * Pages wrapped here do NOT need their own back button or theme logic.
 */
const LandingLayout = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('landing-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('landing-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar theme={theme} toggleTheme={toggleTheme} />
      {/* Offset for fixed navbar */}
      <main style={{ flex: 1, paddingTop: '72px' }}>
        {children}
      </main>
      <FooterSection />
    </div>
  );
};

export default LandingLayout;
