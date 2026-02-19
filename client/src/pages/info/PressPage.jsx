import { Download, Globe, Award } from 'lucide-react';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const PressPage = () => (
  <InfoPageLayout
    badge="Press"
    title="Task Flow in the news"
    subtitle="Resources for press, journalists and analysts covering Task Flow."
  >
    {/* Stats */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 64 }}>
      {[
        { value: '12,000+', label: 'Active users' },
        { value: '2.4M', label: 'Tasks completed' },
        { value: '40+', label: 'Countries' },
        { value: '2024', label: 'Founded' },
      ].map(s => (
        <div key={s.label} style={{ padding: '28px 20px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-1px', color: 'var(--accent)' }}>{s.value}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Press mentions */}
    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Recent coverage</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 64 }}>
      {[
        { pub: 'TechCrunch', date: 'Jan 2026', headline: '"Task Flow is the productivity app we\'ve been waiting for"', link: '#' },
        { pub: 'Product Hunt', date: 'Dec 2025', headline: '#1 Product of the Day â€” Task Flow launches AI Coach v2', link: '#' },
        { pub: 'The Verge', date: 'Nov 2025', headline: 'How Task Flow is using AI to actually make todo lists useful', link: '#' },
        { pub: 'Hacker News', date: 'Oct 2025', headline: '"Show HN: We built an AI task manager and got to 10k users"', link: '#' },
      ].map(m => (
        <div key={m.headline} style={{ padding: '18px 22px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Globe size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.pub} Â· {m.date}</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', marginTop: 3, fontStyle: 'italic' }}>{m.headline}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Brand assets */}
    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Brand assets</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
      {['Logo Pack (SVG/PNG)', 'Brand Guidelines PDF', 'Product Screenshots', 'Founder Headshots'].map(asset => (
        <div key={asset} style={{ padding: '20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={15} color="var(--accent)" />
            <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{asset}</span>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Download size={13} /> Download
          </button>
        </div>
      ))}
    </div>

    <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
      Press enquiries: <a href="mailto:press@taskflow.app" style={{ color: 'var(--accent)' }}>press@taskflow.app</a>
    </p>
  </InfoPageLayout>
);

export default PressPage;

