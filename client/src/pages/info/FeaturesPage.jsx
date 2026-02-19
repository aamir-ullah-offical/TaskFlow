import { Zap, Shield, BarChart2, Users, Brain, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const features = [
  {
    icon: Brain,
    color: '#8b5cf6',
    title: 'AI Productivity Coach',
    description: 'Our AI analyzes your work patterns, identifies blockers, and surfaces prioritized recommendations every morning â€” so you start each day focused and confident.',
    bullets: ['Daily AI briefing', 'Smart task ranking', 'Workload predictions'],
  },
  {
    icon: BarChart2,
    color: '#3b82f6',
    title: 'Advanced Analytics',
    description: 'Understand your productivity through rich charts and heatmaps. See peak hours, completion trends, and habit streaks to make data-driven improvements.',
    bullets: ['Weekly trend reports', 'Peak hour heatmap', 'Habit streak tracking'],
  },
  {
    icon: Zap,
    color: '#f59e0b',
    title: 'Lightning Fast Interface',
    description: 'Sub-200ms responses, offline support, and instant sync across all your devices. Task Flow feels as fast as your thoughts.',
    bullets: ['Offline-first PWA', 'Real-time sync', 'Keyboard shortcuts'],
  },
  {
    icon: Users,
    color: '#10b981',
    title: 'Team Collaboration',
    description: 'Share projects, assign tasks, and track team progress in real time. Live presence indicators show exactly who\'s working on what.',
    bullets: ['Live collaboration', 'Role-based access', 'Activity feed'],
  },
  {
    icon: Shield,
    color: '#ec4899',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant, end-to-end encrypted, and deployable on-premise. Your data stays yours â€” always.',
    bullets: ['E2E encryption', 'SSO / SAML support', 'Audit logs'],
  },
  {
    icon: Bell,
    color: '#06b6d4',
    title: 'Smart Reminders',
    description: 'Contextual nudges based on your calendar, location, and current task load. Never miss a deadline again.',
    bullets: ['Calendar integration', 'Priority-based alerts', 'Snooze & reschedule'],
  },
];

const FeaturesPage = () => (
  <InfoPageLayout
    badge="Features"
    title="Everything you need to reach peak productivity"
    subtitle="A full suite of powerful tools designed to help you capture, organize, and accomplish more â€” every single day."
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
      {features.map((f) => (
        <div
          key={f.title}
          style={{
            padding: '32px 28px',
            borderRadius: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
        >
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 1px ${f.color}30` }}>
            <f.icon size={24} color={f.color} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{f.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.description}</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {f.bullets.map(b => (
              <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <CheckCircle size={14} color={f.color} /> {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div style={{ marginTop: 72, textAlign: 'center', padding: '52px 32px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05))', border: '1px solid rgba(139,92,246,0.15)' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: 12 }}>Ready to try it yourself?</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>Start free â€” no credit card required.</p>
      <Link to="/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
        Get started free <ArrowRight size={16} />
      </Link>
    </div>
  </InfoPageLayout>
);

export default FeaturesPage;

