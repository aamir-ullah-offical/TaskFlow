import { Zap, Rocket, Building2, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from '../../pages/LandingPage.module.css';

/**
 * ServicesSection – three service/plan tiers displayed as polished cards.
 * Each card has an icon, feature list, and a CTA.
 * Uses the same glassmorphism card pattern + scroll-reveal as FeaturesSection.
 */
const services = [
  {
    icon: Zap,
    tier: 'Starter',
    tagline: 'Perfect for individuals',
    price: 'Free',
    period: 'forever',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    features: [
      'Up to 50 tasks per project',
      'Basic habit tracking',
      '7-day analytics history',
      'Mobile & desktop apps',
      'Community support',
    ],
    cta: 'Get started free',
    ctaTo: '/register',
    highlight: false,
  },
  {
    icon: Rocket,
    tier: 'Pro',
    tagline: 'For power users & teams',
    price: '$9',
    period: 'per month',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.2)',
    features: [
      'Unlimited tasks & projects',
      'AI Productivity Coach',
      'Advanced analytics & reports',
      'Habit streaks & reminders',
      'Real-time collaboration',
      'Priority email support',
    ],
    cta: 'Start Pro trial',
    ctaTo: '/register',
    highlight: true, // Featured / most popular
  },
  {
    icon: Building2,
    tier: 'Enterprise',
    tagline: 'For large organisations',
    price: 'Custom',
    period: 'contact us',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
    features: [
      'Everything in Pro',
      'SSO & advanced security',
      'Custom integrations & API',
      'Dedicated success manager',
      'SLA & uptime guarantees',
      'Usage analytics dashboard',
    ],
    cta: 'Contact sales',
    ctaTo: '/contact',
    highlight: false,
  },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      {/* Ambient blobs */}
      <div className={styles.servicesBlobLeft} />
      <div className={styles.servicesBlobRight} />

      {/* Section header */}
      <div className={styles.sectionHeader} data-reveal>
        <div className={styles.sectionBadge}>
          <Rocket size={14} />
          <span>Plans &amp; Pricing</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Choose your <span className={styles.heroAccent}>flow</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Start free, upgrade when you're ready. No hidden fees, no
          long-term contracts — just pure productivity.
        </p>
      </div>

      {/* Cards grid */}
      <div className={styles.servicesGrid} data-reveal>
        {services.map((svc, i) => (
          <div
            key={svc.tier}
            className={`${styles.serviceCard} ${svc.highlight ? styles.serviceCardHighlight : ''}`}
            style={{ transitionDelay: `${i * 90}ms` }}
            data-cursor-hover
          >
            {/* Background glow layer */}
            <div
              className={styles.serviceCardGlow}
              style={{
                background: `radial-gradient(ellipse at top left, ${svc.glow}, transparent 65%)`,
              }}
            />

            {/* Popular badge */}
            {svc.highlight && (
              <div className={styles.servicePopularBadge}>⚡ Most Popular</div>
            )}

            {/* Icon + tier */}
            <div className={styles.serviceIconBox} style={{ boxShadow: `0 4px 20px ${svc.glow}` }}>
              <svc.icon size={22} color={svc.color} />
            </div>

            <div className={styles.serviceTier}>{svc.tier}</div>
            <div className={styles.serviceTagline}>{svc.tagline}</div>

            {/* Price */}
            <div className={styles.servicePriceRow}>
              <span className={styles.servicePrice} style={{ color: svc.color }}>
                {svc.price}
              </span>
              <span className={styles.servicePeriod}>/{svc.period}</span>
            </div>

            {/* Divider */}
            <div className={styles.serviceDivider} />

            {/* Feature list */}
            <ul className={styles.serviceFeatures}>
              {svc.features.map((f) => (
                <li key={f} className={styles.serviceFeatureItem}>
                  <Check size={14} color={svc.color} style={{ flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to={svc.ctaTo}
              className={`${styles.serviceCtaBtn} ${svc.highlight ? 'btn-primary' : ''}`}
              style={
                !svc.highlight
                  ? {
                      borderColor: svc.color + '44',
                      color: svc.color,
                    }
                  : {}
              }
              data-cursor-hover
            >
              {svc.cta}
              <ArrowRight size={15} />
            </Link>

            {/* Bottom accent line */}
            <div className={styles.serviceAccentLine} style={{ background: svc.color }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
