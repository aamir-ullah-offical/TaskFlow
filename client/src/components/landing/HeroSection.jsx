import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import styles from '../../pages/LandingPage.module.css';

/**
 * HeroSection – full-viewport hero with:
 * - Animated gradient background blobs
 * - Floating badge
 * - "Task Flow" headline with gradient text
 * - Two CTA buttons (primary + ghost)
 * - Interactive 3D dashboard mockup (parallax tilt on mouse move)
 */
const HeroSection = () => {
  const mockupRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 2, ry: 0 });

  // Parallax tilt on mouse move
  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -4;
      const ry = ((e.clientX - cx) / cx) * 4;
      setTilt({ rx, ry });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className={styles.heroSection} id="hero">
      {/* Animated gradient blobs */}
      <div className={styles.heroBlobPurple} />
      <div className={styles.heroBlobBlue} />
      <div className={styles.heroBlobGreen} />

      {/* Grid overlay */}
      <div className={styles.heroGrid} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* Badge */}
        <div className={styles.heroBadge} data-reveal>
          <Sparkles size={14} />
          <span>AI-Powered Productivity — Reimagined</span>
        </div>

        {/* Headline */}
        <h1 className={styles.heroHeadline} data-reveal>
          Organize. Focus.
          <br />
          <span className={styles.heroAccent}>Task Flow.</span>
        </h1>

        {/* Subheadline */}
        <p className={styles.heroSubheadline} data-reveal>
          The intelligent workspace that turns chaos into clarity. Manage tasks,
          build habits, and unlock your peak productivity — effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className={styles.heroButtons} data-reveal>
          <button
            className={`${styles.heroPrimaryBtn} btn-primary`}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
          >
            Start for Free <ArrowRight size={18} />
          </button>
          <Link to="/login" className={styles.heroGhostBtn} data-cursor-hover>
            <Play size={16} fill="currentColor" />
            Live Demo
          </Link>
        </div>

        {/* Social proof strip */}
        <div className={styles.socialProof} data-reveal>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={styles.starIcon}>★</span>
          ))}
          <span className={styles.socialProofText}>
            Loved by <strong>12,000+</strong> productive teams worldwide
          </span>
        </div>
      </div>

      {/* 3D Dashboard Mockup */}
      <div
        ref={mockupRef}
        className={styles.mockupWrapper}
        data-reveal
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div className={styles.mockupInner}>
          {/* Mock toolbar */}
          <div className={styles.mockupToolbar}>
            <div className={styles.mockupDots}>
              <span style={{ background: '#ef4444' }} />
              <span style={{ background: '#f59e0b' }} />
              <span style={{ background: '#10b981' }} />
            </div>
            <span className={styles.mockupTitle}>Task Flow — Dashboard</span>
          </div>

          {/* Mock body */}
          <div className={styles.mockupBody}>
            {/* Sidebar */}
            <div className={styles.mockupSidebar}>
              {['Dashboard', 'Tasks', 'Habits', 'Analytics', 'Profile'].map((item, i) => (
                <div
                  key={item}
                  className={`${styles.mockupSidebarItem} ${i === 0 ? styles.mockupSidebarActive : ''}`}
                >
                  <div className={styles.mockupSidebarDot} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className={styles.mockupMain}>
              {/* Stats row */}
              <div className={styles.mockupStats}>
                {[
                  { label: 'Tasks Done', color: '#8b5cf6', val: '24' },
                  { label: 'Streak', color: '#10b981', val: '7d' },
                  { label: 'Focus Time', color: '#3b82f6', val: '4h' },
                  { label: 'Habits', color: '#f59e0b', val: '5/6' },
                ].map((s) => (
                  <div key={s.label} className={styles.mockupStatCard}>
                    <div className={styles.mockupStatVal} style={{ color: s.color }}>{s.val}</div>
                    <div className={styles.mockupStatLabel}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Task list preview */}
              <div className={styles.mockupTaskList}>
                {[
                  { text: 'Design landing hero section', done: true },
                  { text: 'Review Q4 roadmap', done: true },
                  { text: 'Write sprint retrospective', done: false },
                  { text: 'Prepare demo for stakeholders', done: false },
                ].map((t) => (
                  <div key={t.text} className={styles.mockupTaskRow}>
                    <div
                      className={styles.mockupCheckbox}
                      style={{ borderColor: t.done ? '#8b5cf6' : 'rgba(255,255,255,0.2)', background: t.done ? '#8b5cf6' : 'transparent' }}
                    >
                      {t.done && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                    </div>
                    <span className={styles.mockupTaskText} style={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect under mockup */}
        <div className={styles.mockupGlow} />
      </div>
    </section>
  );
};

export default HeroSection;
