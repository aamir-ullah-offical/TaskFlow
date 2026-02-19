import { Rocket, Zap, Bug, Sparkles } from 'lucide-react';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const entries = [
  {
    version: 'v2.4.0',
    date: 'February 2026',
    type: 'feature',
    items: [
      { icon: Sparkles, label: 'AI Coach v2', desc: 'Completely rebuilt AI coach with context-aware daily briefings and predictive task suggestions.' },
      { icon: Rocket, label: 'Services Section', desc: 'New landing page section showcasing plan details with animated cards.' },
    ],
  },
  {
    version: 'v2.3.2',
    date: 'January 2026',
    type: 'fix',
    items: [
      { icon: Bug, label: 'Scroll reveal fix', desc: 'Fixed CSS Modules scoping bug that prevented landing page sections from animating into view.' },
      { icon: Bug, label: 'Recharts height fix', desc: 'Resolved width/height=-1 console warning in Dashboard pie chart.' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'December 2025',
    type: 'feature',
    items: [
      { icon: Zap, label: 'Global custom cursor', desc: 'Custom dot + ring cursor effect now appears on every page including dashboard and auth.' },
      { icon: Sparkles, label: 'Testimonials slider', desc: 'Testimonials rebuilt as a full-width auto-advancing slider with direction-aware animations.' },
    ],
  },
  {
    version: 'v2.2.0',
    date: 'November 2025',
    type: 'feature',
    items: [
      { icon: Rocket, label: 'Dark / Light theme', desc: 'Persistent theme toggle across landing, login, and register â€” all synced via localStorage.' },
      { icon: Sparkles, label: 'Bento dashboard', desc: 'Dashboard rebuilt with a 12-column bento grid, glassmorphism cards, and AI insights panel.' },
    ],
  },
];

const typeColor = { feature: '#8b5cf6', fix: '#10b981', improvement: '#3b82f6' };

const ChangelogPage = () => (
  <InfoPageLayout
    badge="Changelog"
    title="What's new in Task Flow"
    subtitle="We ship improvements every week. Here's what's changed recently."
  >
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
      {entries.map((e) => (
        <div key={e.version} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0 32px', alignItems: 'start' }}>
          {/* Left: version + date */}
          <div style={{ textAlign: 'right', paddingTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{e.version}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{e.date}</div>
            <div style={{ display: 'inline-block', marginTop: 8, padding: '2px 10px', borderRadius: 50, background: `${typeColor[e.type]}18`, color: typeColor[e.type], fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
              {e.type}
            </div>
          </div>

          {/* Right: change items */}
          <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {e.items.map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${typeColor[e.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <item.icon size={17} color={typeColor[e.type]} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 3 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </InfoPageLayout>
);

export default ChangelogPage;

