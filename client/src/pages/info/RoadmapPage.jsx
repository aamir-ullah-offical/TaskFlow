import { Rocket, Clock, CheckCircle2, Hourglass } from 'lucide-react';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const quarters = [
  {
    label: 'Q1 2026 â€” In Progress',
    status: 'now',
    color: '#8b5cf6',
    items: [
      { icon: Rocket, title: 'Footer pages & nav links', desc: 'Full information architecture: Features, Pricing, About, Blog, Changelog, and Legal pages.' },
      { icon: Rocket, title: 'Global cursor effect', desc: 'Custom cursor now active across all routes including dashboard and auth pages.' },
    ],
  },
  {
    label: 'Q2 2026 â€” Coming Soon',
    status: 'soon',
    color: '#3b82f6',
    items: [
      { icon: Clock, title: 'Calendar integration', desc: 'Two-way sync with Google Calendar and Outlook â€” see tasks and meetings in one unified view.' },
      { icon: Clock, title: 'Mobile apps (iOS & Android)', desc: 'Native apps with push notifications, widgets, and offline task management.' },
      { icon: Clock, title: 'AI-powered scheduling', desc: 'Let the AI coach create an optimized daily schedule based on deadlines and energy levels.' },
    ],
  },
  {
    label: 'Q3 2026 â€” Planned',
    status: 'planned',
    color: '#10b981',
    items: [
      { icon: Hourglass, title: 'White-label & custom domains', desc: 'Let enterprise clients host Task Flow under their own brand and domain.' },
      { icon: Hourglass, title: 'Zapier & Notion integrations', desc: 'Connect Task Flow with your existing tool stack via Zapier, Notion, Slack, and more.' },
      { icon: Hourglass, title: 'Advanced reporting suite', desc: 'Team-level analytics dashboards with exportable PDF/CSV reports for leadership.' },
    ],
  },
  {
    label: 'Backlog â€” Future',
    status: 'future',
    color: '#f59e0b',
    items: [
      { icon: Hourglass, title: 'Voice input', desc: 'Create and manage tasks hands-free with voice commands on mobile and desktop.' },
      { icon: Hourglass, title: 'Marketplace & plugins', desc: 'Third-party extensions and custom automations via a public plugin marketplace.' },
    ],
  },
];

const statusIcon = { now: 'ðŸŸ¢', soon: 'ðŸ”µ', planned: 'âšª', future: 'ðŸŸ¡' };

const RoadmapPage = () => (
  <InfoPageLayout
    badge="Roadmap"
    title="Where Task Flow is headed"
    subtitle="Our public roadmap â€” built in the open, shaped by our community."
  >
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
      {quarters.map((q) => (
        <div key={q.label}>
          {/* Quarter header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 18 }}>{statusIcon[q.status]}</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: q.color, textTransform: 'uppercase', letterSpacing: 1 }}>{q.label}</h3>
            <div style={{ flex: 1, height: 1, background: `${q.color}30` }} />
          </div>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {q.items.map((item) => (
              <div
                key={item.title}
                style={{ display: 'flex', gap: 16, padding: '20px 24px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${q.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={19} color={q.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 3 }}>{item.desc}</div>
                </div>
                {q.status === 'now' && <CheckCircle2 size={18} color={q.color} style={{ marginLeft: 'auto', flexShrink: 0, alignSelf: 'center' }} />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </InfoPageLayout>
);

export default RoadmapPage;

