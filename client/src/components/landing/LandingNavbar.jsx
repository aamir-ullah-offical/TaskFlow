import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, CheckSquare } from 'lucide-react';
import styles from '../../pages/LandingPage.module.css';

/**
 * LandingNavbar – 5 clean links:
 *   Home · Features · Testimonials · Developers · Contact
 * + active scroll-spy on on-page sections
 * + route-active on /developers
 */
const NAV = [
  { label: 'Home',         type: 'scroll', id: 'hero'         },
  { label: 'Features',     type: 'scroll', id: 'features'     },
  { label: 'Testimonials', type: 'scroll', id: 'testimonials' },
  { label: 'Developers',   type: 'route',  to: '/developers'  },
  { label: 'Contact',      type: 'scroll', id: 'contact'      },
];

const LandingNavbar = ({ theme, toggleTheme }) => {
  const [scrolled,       setScrolled]      = useState(false);
  const [mobileOpen,     setMobileOpen]    = useState(false);
  const [activeSection,  setActiveSection] = useState('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Scrolled shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver scroll-spy (only on landing page)
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV.filter(n => n.type === 'scroll').map(n => n.id);
    const obs = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-25% 0px -65% 0px' }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, [isHome]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (!isHome) { window.location.href = `/#${id}`; return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (link) => {
    if (link.type === 'route') return location.pathname === link.to;
    return isHome && activeSection === link.id;
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navInner}>

        {/* ── Brand ── */}
        <Link to="/" className={styles.navBrand} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
          <div className={styles.navLogoBox}>
            <CheckSquare size={20} color="#fff" />
          </div>
          <span className={styles.navBrandText}>Task Flow</span>
        </Link>

        {/* ── Desktop links ── */}
        <div className={styles.navLinks}>
          {NAV.map((link) => {
            const active = isActive(link);
            if (link.type === 'route') {
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                  data-cursor-hover
                >
                  {link.label}
                  {active && <span className={styles.navLinkIndicator} />}
                </Link>
              );
            }
            return (
              <a
                key={link.label}
                href={isHome ? `#${link.id}` : `/#${link.id}`}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    scrollTo(link.id);
                  }
                }}
                data-cursor-hover
                style={{ position: 'relative', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                {link.label}
                {active && <span className={styles.navLinkIndicator} />}
              </a>
            );
          })}
        </div>

        {/* ── Right actions ── */}
        <div className={styles.navActions}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme" data-cursor-hover>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/login"    className={styles.navLoginBtn} data-cursor-hover>Log In</Link>
          <Link to="/register" className={`${styles.navCtaBtn} btn-primary`} data-cursor-hover>Get Started</Link>

          {/* Mobile hamburger */}
          <button className={styles.hamburger} onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV.map(link => {
            const active = isActive(link);
            if (link.type === 'route') {
              return (
                <Link key={link.label} to={link.to} className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ''}`} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              );
            }
            return (
              <button key={link.label} className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ''}`} onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            );
          })}
          <div className={styles.mobileDivider} />
          <Link to="/login"    className={styles.mobileNavLink}             onClick={() => setMobileOpen(false)}>Log In</Link>
          <Link to="/register" className={`${styles.navCtaBtn} btn-primary`} onClick={() => setMobileOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
