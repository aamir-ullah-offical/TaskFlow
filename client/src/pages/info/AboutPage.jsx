import { Users, Target, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const team = [
  { name: 'Alex Morgan', role: 'CEO & Co-founder', avatar: 'AM', color: '#8b5cf6', bio: 'Former PM at Notion. Obsessed with productivity systems and helping people do their best work.' },
  { name: 'Jordan Lee', role: 'CTO & Co-founder', avatar: 'JL', color: '#3b82f6', bio: '10+ years building developer tools. Led engineering at three successful startups before Task Flow.' },
  { name: 'Sam Patel', role: 'Head of Design', avatar: 'SP', color: '#ec4899', bio: 'Ex-Figma designer who believes great software should feel magical. Obsesses over every pixel.' },
  { name: 'Chris Wu', role: 'Head of AI', avatar: 'CW', color: '#10b981', bio: 'Machine learning researcher turned product builder. Drives the AI Coach and smart scheduling features.' },
  { name: 'Maya Okafor', role: 'Head of Growth', avatar: 'MO', color: '#f59e0b', bio: 'Grew products from 0 â†’ 100k users at two startups. Passionate about community-led growth.' },
  { name: 'Tom Dupont', role: 'Lead Engineer', avatar: 'TD', color: '#06b6d4', bio: 'Full-stack wizard who turns design ideas into pixel-perfect, blazing-fast interfaces.' },
];

const values = [
  { icon: Target, color: '#8b5cf6', title: 'Focus first', desc: 'We build tools that help people protect their attention, not fragment it.' },
  { icon: Users, color: '#3b82f6', title: 'Community shaped', desc: 'Every major feature ships after listening deeply to our users.' },
  { icon: Heart, color: '#ec4899', title: 'Care in the details', desc: 'The micro-animation, the empty state copy, the error message â€” they all matter.' },
  { icon: Globe, color: '#10b981', title: 'Built for everyone', desc: 'Accessibility, internationalisation, and fairness are baked in from day one.' },
];

const AboutPage = () => (
  <InfoPageLayout
    badge="About Us"
    title="Built by people who love productive work"
    subtitle="Task Flow started in 2024 with one question: why do productivity tools feel like chores? We're building the answer."
  >
    {/* Mission */}
    <div style={{ maxWidth: 640, margin: '0 auto 64px', textAlign: 'center' }}>
      <div style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        We are a remote-first team of 14 across 6 countries, united by the belief that everyone deserves software that helps them do their best work â€” not just manage it.
      </div>
    </div>

    {/* Values */}
    <div style={{ marginBottom: 72 }}>
      <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32, letterSpacing: '-0.5px' }}>What we stand for</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {values.map(v => (
          <div key={v.title} style={{ padding: '24px 20px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: `${v.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <v.icon size={20} color={v.color} />
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15 }}>{v.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Team */}
    <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32, letterSpacing: '-0.5px' }}>Meet the team</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 64 }}>
      {team.map(m => (
        <div key={m.name} style={{ padding: '24px', borderRadius: 18, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${m.color}20`, border: `2px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: m.color, fontWeight: 700, fontSize: 16 }}>{m.avatar}</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{m.name}</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>{m.role}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{m.bio}</div>
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div style={{ textAlign: 'center', padding: '48px 32px', borderRadius: 20, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05))', border: '1px solid rgba(139,92,246,0.15)' }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Want to join us?</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>We're always looking for exceptional people.</p>
      <Link to="/careers" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 11, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
        View open roles <ArrowRight size={15} />
      </Link>
    </div>
  </InfoPageLayout>
);

export default AboutPage;

