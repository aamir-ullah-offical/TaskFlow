import { Check, Zap, Rocket, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    color: '#10b981',
    description: 'Perfect for individuals getting started with productivity.',
    features: ['Up to 50 tasks per project', 'Basic habit tracking', '7-day analytics history', 'Mobile & desktop apps', 'Community support'],
    cta: 'Get started free',
    to: '/register',
    highlight: false,
  },
  {
    icon: Rocket,
    name: 'Pro',
    price: '$9',
    period: '/month',
    color: '#8b5cf6',
    description: 'For power users and small teams who need the full toolkit.',
    features: ['Unlimited tasks & projects', 'AI Productivity Coach', 'Advanced analytics & reports', 'Habit streaks & reminders', 'Real-time collaboration', 'Priority email support'],
    cta: 'Start Pro trial',
    to: '/register',
    highlight: true,
  },
  {
    icon: Building2,
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    color: '#3b82f6',
    description: 'For large organisations with security and compliance needs.',
    features: ['Everything in Pro', 'SSO & advanced security', 'Custom integrations & API', 'Dedicated success manager', 'SLA & uptime guarantees', 'Usage analytics dashboard'],
    cta: 'Contact sales',
    to: '/contact',
    highlight: false,
  },
];

const PricingPage = () => (
  <InfoPageLayout
    badge="Pricing"
    title="Simple, transparent pricing"
    subtitle="Start free, upgrade when you're ready. No hidden fees, no long-term contracts."
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 960, margin: '0 auto' }}>
      {plans.map((p) => (
        <div
          key={p.name}
          style={{
            padding: '36px 28px',
            borderRadius: 24,
            background: 'var(--bg-card)',
            border: `1px solid ${p.highlight ? 'rgba(139,92,246,0.4)' : 'var(--border)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'relative',
            boxShadow: p.highlight ? '0 0 40px rgba(139,92,246,0.12)' : 'none',
            transform: p.highlight ? 'translateY(-8px)' : 'none',
          }}
        >
          {p.highlight && (
            <div style={{ position: 'absolute', top: 20, right: 20, padding: '3px 12px', borderRadius: 50, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: '#fff', fontSize: 11, fontWeight: 700 }}>
              âš¡ Most Popular
            </div>
          )}
          <div style={{ width: 48, height: 48, borderRadius: 13, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p.icon size={22} color={p.color} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{p.description}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-1.5px', color: p.color }}>{p.price}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.period}</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
            {p.features.map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Check size={14} color={p.color} style={{ flexShrink: 0 }} /> {f}
              </li>
            ))}
          </ul>
          <Link
            to={p.to}
            className={p.highlight ? 'btn-primary' : ''}
            style={p.highlight
              ? { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 600 }
              : { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 600, border: `1px solid ${p.color}44`, color: p.color }
            }
          >
            {p.cta} <ArrowRight size={15} />
          </Link>
        </div>
      ))}
    </div>

    {/* FAQ strip */}
    <div style={{ marginTop: 72, maxWidth: 640, margin: '72px auto 0' }}>
      <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: 36 }}>Frequently asked</h2>
      {[
        ['Can I switch plans anytime?', 'Yes, upgrade or downgrade at any time. Changes take effect at the next billing cycle.'],
        ['Is there a free trial for Pro?', 'Absolutely â€” every new account gets 14 days of Pro access free, no card required.'],
        ['What payment methods do you accept?', 'Visa, Mastercard, Amex, and PayPal. Enterprise plans support invoicing.'],
        ['Can I cancel anytime?', 'Yes. Cancel from your account settings. You keep access until the period ends.'],
      ].map(([q, a]) => (
        <div key={q} style={{ padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, fontSize: 15 }}>{q}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{a}</div>
        </div>
      ))}
    </div>
  </InfoPageLayout>
);

export default PricingPage;

