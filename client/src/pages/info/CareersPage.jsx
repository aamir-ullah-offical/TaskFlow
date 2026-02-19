import { Code2, Palette, TrendingUp, Users, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const openings = [
  { dept: 'Engineering', color: '#3b82f6', icon: Code2, roles: [
    { title: 'Senior Frontend Engineer', type: 'Full-time Â· Remote', description: 'Lead UI development for our web app using React, TypeScript, and Vite. Own the design system and performance budget.' },
    { title: 'Backend Engineer (Node.js)', type: 'Full-time Â· Remote', description: 'Build the APIs, real-time sync, and AI integrations that power Task Flow. Experience with PostgreSQL a plus.' },
  ]},
  { dept: 'Design', color: '#ec4899', icon: Palette, roles: [
    { title: 'Product Designer', type: 'Full-time Â· Remote', description: 'Own the full design process â€” research, wireframes, high-fidelity UI, and developer handoff. Figma expert required.' },
  ]},
  { dept: 'Growth', color: '#10b981', icon: TrendingUp, roles: [
    { title: 'Content Marketer', type: 'Part-time Â· Remote', description: 'Write insightful articles, case studies, and product emails that resonate with productivity-minded professionals.' },
    { title: 'Head of Partnerships', type: 'Full-time Â· Remote', description: 'Develop strategic integrations and co-marketing relationships with tools in the productivity ecosystem.' },
  ]},
  { dept: 'Customer Success', color: '#f59e0b', icon: Users, roles: [
    { title: 'Customer Success Manager', type: 'Full-time Â· Remote', description: 'Be the voice of our users. Onboard, support, and advocate for the customers who rely on Task Flow every day.' },
  ]},
];

const perks = [
  { icon: Sparkles, label: 'Fully remote', desc: 'Work from anywhere in the world' },
  { icon: TrendingUp, label: 'Equity', desc: 'Meaningful ownership at an early-stage startup' },
  { icon: MessageSquare, label: 'â‚¬1,000 learning budget', desc: 'Annual budget for books, courses & conferences' },
  { icon: Users, label: 'Health coverage', desc: 'Comprehensive health, dental & vision' },
];

const CareersPage = () => (
  <InfoPageLayout
    badge="Careers"
    title="Help us build the future of productivity"
    subtitle="We hire exceptional people who care deeply about craft, users, and each other. Fully remote, async-first."
  >
    {/* Perks */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 64 }}>
      {perks.map(p => (
        <div key={p.label} style={{ padding: '20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <p.icon size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{p.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{p.desc}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Open roles */}
    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 32 }}>Open roles</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {openings.map(dept => (
        <div key={dept.dept}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <dept.icon size={16} color={dept.color} />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: dept.color }}>{dept.dept}</span>
            <div style={{ flex: 1, height: 1, background: `${dept.color}25` }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dept.roles.map(role => (
              <div key={role.title} style={{ padding: '20px 24px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{role.title}</div>
                  <div style={{ fontSize: 12, color: dept.color, fontWeight: 600, marginBottom: 6 }}>{role.type}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.55 }}>{role.description}</div>
                </div>
                <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: 11, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Apply <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </InfoPageLayout>
);

export default CareersPage;

