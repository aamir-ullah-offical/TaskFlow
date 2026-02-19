import {
  Sparkles, TrendingUp, CheckCircle2, Zap, Shield, Layout,
  Target, BarChart2,
} from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from '../../pages/LandingPage.module.css';

/**
 * FeaturesSection – 6 feature cards with glassmorphism styling,
 * accent glow on hover, and staggered scroll-reveal animations.
 */
const features = [
  {
    icon: Sparkles,
    title: 'AI Productivity Coach',
    desc: 'Get personalized daily briefings, smart suggestions, and actionable insights powered by cutting-edge AI.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: CheckCircle2,
    title: 'Smart Task Management',
    desc: 'Create, prioritize, and organize tasks effortlessly. Break down complex goals into manageable steps.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    icon: TrendingUp,
    title: 'Habit Tracking',
    desc: 'Build powerful daily rituals. Visual streaks, reminders, and statistical breakdowns keep you on track.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    icon: BarChart2,
    title: 'Advanced Analytics',
    desc: 'Visualize your performance with completion trends, heat maps, and weekly productivity reports.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Real-time sync across all your devices. Changes appear instantly — no page reloads, no delays.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your data stays yours. End-to-end encrypted sessions, role-based access, and SOC 2 compliant.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
  },
];

const FeaturesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="features" className={styles.featuresSection} ref={sectionRef}>
      {/* Section header */}
      <div className={styles.sectionHeader} data-reveal>
        <div className={styles.sectionBadge}>
          <Layout size={14} />
          <span>Features</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Everything you need to <span className={styles.heroAccent}>flow</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Task Flow brings together all the tools high-performers need — in one beautiful,
          intelligent workspace.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className={styles.featuresGrid}>
        {features.map((feat, i) => (
          <div
            key={feat.title}
            className={styles.featureCard}
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            data-cursor-hover
          >
            {/* Background glow layer */}
            <div
              className={styles.featureCardGlow}
              style={{ background: `radial-gradient(ellipse at top left, ${feat.glow}, transparent 70%)` }}
            />

            {/* Icon box */}
            <div className={styles.featureIconBox} style={{ boxShadow: `0 4px 20px ${feat.glow}` }}>
              <feat.icon size={22} color={feat.color} />
            </div>

            <h3 className={styles.featureTitle}>{feat.title}</h3>
            <p className={styles.featureDesc}>{feat.desc}</p>

            {/* Bottom accent line */}
            <div className={styles.featureAccentLine} style={{ background: feat.color }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
