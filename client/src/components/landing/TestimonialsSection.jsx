import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from '../../pages/LandingPage.module.css';

/**
 * TestimonialsSection — full-width auto-advancing slider.
 * - One card visible at a time, centered, with peek of adjacent cards
 * - Keyboard-accessible (arrow keys)
 * - Auto-advances every 5s, pauses on hover
 * - Prev/Next arrow buttons + dot indicators
 */
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Stripe',
    quote: 'Task Flow completely changed how I manage my team\'s workload. The AI coach surfaces blockers before they become problems — I\'ve never felt more in control.',
    rating: 5,
    avatar: 'SC',
    color: '#8b5cf6',
  },
  {
    name: 'Marcus Rivera',
    role: 'Senior Engineer at Vercel',
    quote: 'I tried every todo app out there. Task Flow is the first one I\'ve actually stuck with for longer than a week. The habit tracker is indispensable.',
    rating: 5,
    avatar: 'MR',
    color: '#3b82f6',
  },
  {
    name: 'Priya Patel',
    role: 'Founder at BuildWithAI',
    quote: 'The analytics section alone is worth it. I can finally see my productivity trends and optimize my schedule around my peak hours.',
    rating: 5,
    avatar: 'PP',
    color: '#10b981',
  },
  {
    name: 'James Wu',
    role: 'UX Designer at Figma',
    quote: 'Beautifully designed and lightning fast. Task Flow feels like it was built specifically for me. The dark theme is absolutely gorgeous.',
    rating: 5,
    avatar: 'JW',
    color: '#ec4899',
  },
  {
    name: 'Aisha Okonkwo',
    role: 'Data Scientist at Anthropic',
    quote: 'I use Task Flow to manage both personal projects and work sprints. The real-time sync across devices is seamless and the UI is unmatched.',
    rating: 5,
    avatar: 'AO',
    color: '#f59e0b',
  },
  {
    name: 'Leo Dupont',
    role: 'Freelance Developer',
    quote: 'As a solo developer juggling multiple clients, Task Flow keeps me sane. The AI suggestions for task prioritization are scarily accurate.',
    rating: 5,
    avatar: 'LD',
    color: '#06b6d4',
  },
];

const TOTAL = testimonials.length;

const TestimonialsSection = () => {
  const sectionRef = useScrollReveal();
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [animDir, setAnimDir]   = useState('next'); // 'next' | 'prev'
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = 'next') => {
    setAnimDir(dir);
    setActive((TOTAL + idx) % TOTAL);
  }, []);

  const next = useCallback(() => goTo(active + 1, 'next'), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, 'prev'), [active, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      className={styles.testimonialsSection}
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient blobs */}
      <div className={styles.testimonialsBlobLeft} />
      <div className={styles.testimonialsBlobRight} />

      {/* Header */}
      <div className={styles.sectionHeader} data-reveal>
        <div className={styles.sectionBadge}>
          <Star size={14} fill="currentColor" />
          <span>Testimonials</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Loved by <span className={styles.heroAccent}>12,000+</span> teams
        </h2>
        <p className={styles.sectionSubtitle}>
          Real stories from real people who've transformed their productivity with Task Flow.
        </p>
      </div>

      {/* Slider */}
      <div className={styles.sliderWrapper} data-reveal>
        {/* Prev button */}
        <button
          className={styles.sliderBtn}
          onClick={prev}
          aria-label="Previous testimonial"
          data-cursor-hover
        >
          <ChevronLeft size={22} />
        </button>

        {/* Card */}
        <div
          className={`${styles.sliderCard} ${animDir === 'prev' ? styles.sliderCardPrev : ''}`}
          key={active}
          style={{ borderColor: `${t.color}30` }}
          data-cursor-hover
        >
          {/* Top glow */}
          <div
            className={styles.sliderCardGlow}
            style={{ background: `radial-gradient(ellipse at top, ${t.color}18, transparent 70%)` }}
          />

          {/* Quote icon */}
          <div className={styles.sliderQuoteIcon} style={{ color: t.color }}>
            <Quote size={32} />
          </div>

          {/* Stars */}
          <div className={styles.sliderStars}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>

          {/* Quote text */}
          <p className={styles.sliderQuoteText}>"{t.quote}"</p>

          {/* Author row */}
          <div className={styles.sliderAuthor}>
            <div
              className={styles.sliderAvatar}
              style={{ background: `${t.color}22`, border: `2px solid ${t.color}55` }}
            >
              <span style={{ color: t.color, fontWeight: 700, fontSize: '16px' }}>{t.avatar}</span>
            </div>
            <div>
              <div className={styles.sliderName}>{t.name}</div>
              <div className={styles.sliderRole}>{t.role}</div>
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          className={styles.sliderBtn}
          onClick={next}
          aria-label="Next testimonial"
          data-cursor-hover
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className={styles.sliderDots} data-reveal>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.sliderDot} ${i === active ? styles.sliderDotActive : ''}`}
            style={i === active ? { background: t.color, boxShadow: `0 0 8px ${t.color}80` } : {}}
            onClick={() => goTo(i, i > active ? 'next' : 'prev')}
            aria-label={`Go to testimonial ${i + 1}`}
            data-cursor-hover
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.sliderProgress}>
        <div
          className={styles.sliderProgressBar}
          style={{
            width: `${((active + 1) / TOTAL) * 100}%`,
            background: t.color,
          }}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
