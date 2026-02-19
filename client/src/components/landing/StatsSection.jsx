import { Users, CheckCircle2, TrendingUp, Award, Zap, Globe } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from '../../pages/LandingPage.module.css';

/**
 * StatsSection – social proof / numbers section.
 * Replaces the old ServicesSection with a more visual impact row.
 */
const stats = [
  { icon: Users,        value: '12,000+', label: 'Active users',        color: '#8b5cf6' },
  { icon: CheckCircle2, value: '2.4M',    label: 'Tasks completed',     color: '#10b981' },
  { icon: TrendingUp,   value: '89%',     label: 'Productivity boost',  color: '#3b82f6' },
  { icon: Award,        value: '4.9★',    label: 'Average rating',      color: '#f59e0b' },
  { icon: Zap,          value: '< 2s',    label: 'Avg. response time',  color: '#ec4899' },
  { icon: Globe,        value: '40+',     label: 'Countries served',    color: '#06b6d4' },
];

const StatsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className={styles.statsSection} ref={sectionRef}>
      {/* Horizontal gradient line top */}
      <div className={styles.statsLine} />

      <div className={styles.statsInner} data-reveal>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={styles.statItem}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Icon */}
            <div
              className={styles.statIconBox}
              style={{
                background: `${s.color}18`,
                boxShadow: `0 0 0 1px ${s.color}30`,
              }}
            >
              <s.icon size={18} color={s.color} />
            </div>

            {/* Value */}
            <div className={styles.statValue} style={{ color: s.color }}>
              {s.value}
            </div>

            {/* Label */}
            <div className={styles.statLabel}>{s.label}</div>

            {/* Vertical divider (between items, not after last) */}
            {i < stats.length - 1 && (
              <div className={styles.statDivider} />
            )}
          </div>
        ))}
      </div>

      {/* Horizontal gradient line bottom */}
      <div className={styles.statsLine} />
    </section>
  );
};

export default StatsSection;
