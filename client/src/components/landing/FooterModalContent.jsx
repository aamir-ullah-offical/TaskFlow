/**
 * FooterModalContent – all content for the 12 footer modal pages.
 * Each named export is a pure content component (no layout wrapper).
 * Rendered inside <InfoModal> by FooterSection.
 */
import { Check, Zap, Rocket, Building2, ArrowRight, CheckCircle, Shield, Lock, Eye, Server, AlertTriangle, Code2, Palette, TrendingUp, Users, Sparkles, Globe, Clock, Hourglass, Download, Award, MessageSquare, Brain, BarChart2, Bell, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────── SHARED ────────────────────────────── */
const Card = ({ children, style }) => (
  <div style={{ padding: '24px 20px', borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', marginBottom: 20 }}>{children}</h3>
);

/* ─────────────────────────────── FEATURES ──────────────────────────── */
export const FeaturesContent = () => {
  const features = [
    { icon: Brain,       color: '#8b5cf6', title: 'AI Productivity Coach',   desc: 'Daily briefings, smart task ranking, and workload predictions powered by context-aware AI.' },
    { icon: BarChart2,   color: '#3b82f6', title: 'Advanced Analytics',      desc: 'Peak hour heatmaps, completion trends, and habit streak charts to optimize your workflow.' },
    { icon: Zap,         color: '#f59e0b', title: 'Lightning Fast',           desc: 'Sub-200ms responses, offline-first PWA, real-time sync, and full keyboard shortcut support.' },
    { icon: Users,       color: '#10b981', title: 'Team Collaboration',      desc: 'Live presence, shared projects, role-based access, and a team activity feed.' },
    { icon: Shield,      color: '#ec4899', title: 'Enterprise Security',     desc: 'SOC 2 compliant, E2E encrypted, SSO/SAML, audit logs, and on-premise deployment.' },
    { icon: Bell,        color: '#06b6d4', title: 'Smart Reminders',         desc: 'Context-aware nudges based on your calendar, location, and current task load.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      {features.map(f => (
        <Card key={f.title} style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 0 1px ${f.color}25` }}>
            <f.icon size={20} color={f.color} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 5 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

/* ─────────────────────────────── PRICING ───────────────────────────── */
export const PricingContent = () => {
  const plans = [
    { icon: Zap,       name: 'Starter',    price: 'Free',  period: 'forever',  color: '#10b981', highlight: false, features: ['Up to 50 tasks', 'Basic habit tracking', '7-day analytics', 'Mobile & desktop apps'] },
    { icon: Rocket,    name: 'Pro',        price: '$9',    period: '/mo',      color: '#8b5cf6', highlight: true,  features: ['Unlimited tasks', 'AI Productivity Coach', 'Advanced analytics', 'Real-time collaboration', 'Priority support'] },
    { icon: Building2, name: 'Enterprise', price: 'Custom', period: '',        color: '#3b82f6', highlight: false, features: ['Everything in Pro', 'SSO & security', 'Custom integrations', 'Dedicated manager', 'SLA guarantee'] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, alignItems: 'start' }}>
      {plans.map(p => (
        <div key={p.name} style={{ padding: '28px 22px', borderRadius: 18, background: 'var(--bg-secondary)', border: `1px solid ${p.highlight ? 'rgba(139,92,246,0.45)' : 'var(--border)'}`, transform: p.highlight ? 'scale(1.02)' : 'none', boxShadow: p.highlight ? '0 0 32px rgba(139,92,246,0.1)' : 'none', position: 'relative' }}>
          {p.highlight && <div style={{ position: 'absolute', top: 14, right: 14, padding: '3px 10px', borderRadius: 50, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', color: '#fff', fontSize: 10, fontWeight: 700 }}>POPULAR</div>}
          <div style={{ width: 40, height: 40, borderRadius: 11, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><p.icon size={18} color={p.color} /></div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: p.color, letterSpacing: '-1px', margin: '10px 0 4px' }}>{p.price}<span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{p.period}</span></div>
          <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
          {p.features.map(f => <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 7 }}><Check size={13} color={p.color} />{f}</div>)}
          <Link to="/register" className={p.highlight ? 'btn-primary' : ''} style={p.highlight ? { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 10, marginTop: 18, textDecoration: 'none', fontSize: 13, fontWeight: 600 } : { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 10, marginTop: 18, textDecoration: 'none', fontSize: 13, fontWeight: 600, border: `1px solid ${p.color}40`, color: p.color }}>Get started <ArrowRight size={13} /></Link>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────── CHANGELOG ─────────────────────────── */
export const ChangelogContent = () => {
  const entries = [
    { version: 'v2.4.0', date: 'Feb 2026', type: 'feature', color: '#8b5cf6', items: ['AI Coach v2 with context-aware briefings', 'Footer pages as beautiful modal overlays', 'Global cursor effect across all routes'] },
    { version: 'v2.3.0', date: 'Jan 2026', type: 'feature', color: '#3b82f6', items: ['Testimonials rebuilt as full-width auto-advancing slider', 'Stats social proof section replacing pricing on landing', 'IntersectionObserver-based navbar scroll-spy'] },
    { version: 'v2.2.0', date: 'Dec 2025', type: 'feature', color: '#10b981', items: ['Dark/light theme with localStorage persistence', 'Dashboard bento grid with glassmorphism cards', 'Real-time socket collaboration'] },
    { version: 'v2.1.2', date: 'Nov 2025', type: 'fix', color: '#f59e0b', items: ['Fixed CSS Modules scoping on scroll-reveal animations', 'Resolved Recharts height=-1 warning in Dashboard charts'] },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {entries.map(e => (
        <div key={e.version} style={{ display: 'flex', gap: 20 }}>
          <div style={{ flexShrink: 0, textAlign: 'right', width: 90 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{e.version}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{e.date}</div>
            <div style={{ display: 'inline-block', marginTop: 6, padding: '2px 8px', borderRadius: 50, background: `${e.color}18`, color: e.color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{e.type}</div>
          </div>
          <div style={{ flex: 1, borderLeft: `2px solid ${e.color}40`, paddingLeft: 20 }}>
            {e.items.map(item => <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}><CheckCircle size={13} color={e.color} style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span></div>)}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────── ROADMAP ───────────────────────────── */
export const RoadmapContent = () => {
  const quarters = [
    { label: '🟢 Q1 2026 — Now', color: '#10b981', items: ['Footer modal system', 'Developer API page', 'Global cursor across all pages'] },
    { label: '🔵 Q2 2026 — Soon', color: '#3b82f6', items: ['Google Calendar integration', 'iOS & Android native apps', 'AI-powered daily scheduling'] },
    { label: '⚪ Q3 2026 — Planned', color: '#8b5cf6', items: ['White-label & custom domains', 'Zapier & Notion integrations', 'Team reporting dashboards'] },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {quarters.map(q => (
        <div key={q.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: q.color }}>{q.label}</span>
            <div style={{ flex: 1, height: 1, background: `${q.color}25` }} />
          </div>
          {q.items.map(item => <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><Hourglass size={13} color={q.color} style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span></div>)}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────── ABOUT ─────────────────────────────── */
export const AboutContent = () => {
  const team = [
    { name: 'Alex Morgan',  role: 'CEO & Co-founder',  avatar: 'AM', color: '#8b5cf6', bio: 'Former PM at Notion. Obsessed with productivity systems.' },
    { name: 'Jordan Lee',   role: 'CTO & Co-founder',  avatar: 'JL', color: '#3b82f6', bio: '10+ years building developer tools at scale.' },
    { name: 'Sam Patel',    role: 'Head of Design',    avatar: 'SP', color: '#ec4899', bio: 'Ex-Figma. Believes great software should feel magical.' },
    { name: 'Chris Wu',     role: 'Head of AI',        avatar: 'CW', color: '#10b981', bio: 'ML researcher turned product builder.' },
    { name: 'Maya Okafor',  role: 'Head of Growth',    avatar: 'MO', color: '#f59e0b', bio: 'Grew products from 0→100k users at two startups.' },
    { name: 'Tom Dupont',   role: 'Lead Engineer',     avatar: 'TD', color: '#06b6d4', bio: 'Full-stack wizard, pixel-perfect interfaces.' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 640 }}>
        Task Flow started in 2024 with one question: why do productivity tools feel like chores? We're a remote-first team of 14 across 6 countries — united by the belief that everyone deserves software that helps them do their best work.
      </p>
      <div>
        <SectionTitle>The team</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
          {team.map(m => (
            <div key={m.name} style={{ display: 'flex', gap: 12, padding: '16px', borderRadius: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${m.color}18`, border: `2px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: m.color, fontWeight: 700, fontSize: 14 }}>{m.avatar}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginBottom: 3 }}>{m.role}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{m.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────── BLOG ──────────────────────────────── */
export const BlogContent = () => {
  const posts = [
    { category: 'Product', date: 'Feb 14', color: '#8b5cf6', title: 'Introducing AI Coach v2', excerpt: 'We rebuilt the AI coach from scratch. Context-aware briefings, predictive task suggestions, and smarter prioritization.' },
    { category: 'Tips', date: 'Feb 7', color: '#3b82f6', title: 'The Science of Deep Work', excerpt: 'Cal Newport\'s framework meets modern tooling — how Task Flow is designed around focused work.' },
    { category: 'Productivity', date: 'Jan 30', color: '#10b981', title: '5 Habit Templates That Actually Stick', excerpt: 'After analyzing 2M+ tracked habits, these five templates have the highest long-term completion rates.' },
    { category: 'Teams', date: 'Jan 23', color: '#f59e0b', title: 'Async-First Teams Stay Aligned', excerpt: 'Our playbook for running a 14-person remote team across 6 time zones — and the workflows behind it.' },
    { category: 'Design', date: 'Jan 16', color: '#ec4899', title: 'The Psychology of Dark Mode', excerpt: 'We dug into the research and redesigned Task Flow\'s theme system from scratch.' },
    { category: 'Company', date: 'Jan 2', color: '#06b6d4', title: '2025 Year in Review: 0 to 12k Users', excerpt: 'How Task Flow went from a side project to a product trusted by thousands.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {posts.map(p => (
        <div key={p.title} style={{ borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ height: 3, background: p.color }} />
          <div style={{ padding: '18px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: p.color, background: `${p.color}15`, padding: '2px 8px', borderRadius: 50, textTransform: 'uppercase' }}>{p.category}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{p.date}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.excerpt}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────── CAREERS ───────────────────────────── */
export const CareersContent = () => {
  const roles = [
    { dept: 'Engineering', color: '#3b82f6', icon: Code2, title: 'Senior Frontend Engineer', type: 'Full-time · Remote' },
    { dept: 'Engineering', color: '#3b82f6', icon: Code2, title: 'Backend Engineer (Node.js)', type: 'Full-time · Remote' },
    { dept: 'Design', color: '#ec4899', icon: Palette, title: 'Product Designer', type: 'Full-time · Remote' },
    { dept: 'Growth', color: '#10b981', icon: TrendingUp, title: 'Content Marketer', type: 'Part-time · Remote' },
    { dept: 'Success', color: '#f59e0b', icon: Users, title: 'Customer Success Manager', type: 'Full-time · Remote' },
  ];
  return (
    <div>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>Fully remote, async-first, equity for everyone. We hire people who care deeply about craft, users, and each other.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {roles.map(r => (
          <div key={r.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', borderRadius: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border)', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${r.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><r.icon size={16} color={r.color} /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{r.title}</div>
                <div style={{ fontSize: 11, color: r.color, fontWeight: 600 }}>{r.type}</div>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 600 }}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────── PRESS ──────────────────────────────── */
export const PressContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
      {[{ v: '12,000+', l: 'Active users', c: '#8b5cf6' }, { v: '2.4M', l: 'Tasks done', c: '#3b82f6' }, { v: '40+', l: 'Countries', c: '#10b981' }, { v: '4.9★', l: 'Avg rating', c: '#f59e0b' }].map(s => (
        <div key={s.l} style={{ padding: '20px 14px', borderRadius: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: s.c }}>{s.v}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{s.l}</div>
        </div>
      ))}
    </div>
    <SectionTitle>Press mentions</SectionTitle>
    {[
      { pub: 'TechCrunch', headline: '"Task Flow is the productivity app we\'ve been waiting for"' },
      { pub: 'Product Hunt', headline: '#1 Product of the Day — Task Flow launches AI Coach v2' },
      { pub: 'The Verge', headline: 'How Task Flow is using AI to actually make todo lists useful' },
    ].map(m => (
      <div key={m.headline} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <Globe size={15} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 3 }}>{m.pub}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{m.headline}</div>
        </div>
      </div>
    ))}
    <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>Press: <a href="mailto:press@taskflow.app" style={{ color: 'var(--accent)' }}>press@taskflow.app</a></p>
  </div>
);

/* ─────────────────────────────── PRIVACY ───────────────────────────── */
export const PrivacyContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 680 }}>
    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last revised: February 1, 2026</p>
    {[
      ['Information We Collect', 'We collect information you provide (name, email, task data), usage logs, device info, and data from integrations you connect. We never sell your personal data.'],
      ['How We Use It', 'To provide and improve the service, send opt-in product updates, generate AI insights within your account, and troubleshoot issues. We do not use your task data to train our models without explicit opt-in.'],
      ['Data Storage & Security', 'Data is stored on EU/USA servers (AWS) with AES-256 encryption at rest and TLS 1.3 in transit. Penetration tests are conducted quarterly.'],
      ['Sharing Your Data', 'We share data only with service providers who help operate the service (payment processors, hosting). Never with advertisers.'],
      ['Your Rights', 'Access, export, or delete your data from Settings → Account. EU residents have additional GDPR rights. Contact privacy@taskflow.app.'],
      ['Cookies', 'We use essential authentication cookies and optional anonymous analytics cookies (with your consent). See Cookie Policy for details.'],
    ].map(([title, body]) => (
      <div key={title}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{body}</div>
      </div>
    ))}
    <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>Contact: <a href="mailto:privacy@taskflow.app" style={{ color: 'var(--accent)' }}>privacy@taskflow.app</a></div>
  </div>
);

/* ─────────────────────────────── TERMS ─────────────────────────────── */
export const TermsContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 680 }}>
    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last revised: February 1, 2026</p>
    {[
      ['Acceptance', 'By using Task Flow, you agree to these Terms and our Privacy Policy.'],
      ['Your Account', 'You are responsible for maintaining credential confidentiality. You must be 13+.'],
      ['Acceptable Use', 'No illegal use, no IP infringement, no spam/malware, no unauthorized system access.'],
      ['Intellectual Property', 'Task Flow content is owned by Task Flow Inc. Your content remains yours — you grant us a limited license to provide the service.'],
      ['Payments', 'Paid plans are billed in advance. Fees are non-refundable except where required by law. 30-day notice for price changes.'],
      ['Termination', 'We may suspend accounts that violate Terms. You may cancel anytime from Settings → Account.'],
      ['Liability', 'Task Flow is provided "as is". To the fullest extent permitted by law, we are not liable for indirect or consequential damages.'],
      ['Governing Law', 'California law applies. Disputes resolved through binding arbitration in San Francisco, CA.'],
    ].map(([title, body]) => (
      <div key={title}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{body}</div>
      </div>
    ))}
    <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>Questions: <a href="mailto:legal@taskflow.app" style={{ color: 'var(--accent)' }}>legal@taskflow.app</a></div>
  </div>
);

/* ─────────────────────────────── SECURITY ──────────────────────────── */
export const SecurityContent = () => {
  const practices = [
    { icon: Lock,          color: '#8b5cf6', title: 'E2E Encryption',         desc: 'TLS 1.3 in transit, AES-256 at rest on all sensitive fields.' },
    { icon: Server,        color: '#3b82f6', title: 'SOC 2 Type II',          desc: 'Independently audited and certified annually.' },
    { icon: Shield,        color: '#10b981', title: 'Quarterly Pen Tests',    desc: 'Third-party penetration tests — criticals fixed within 24h.' },
    { icon: Eye,           color: '#f59e0b', title: 'Zero Data Selling',      desc: 'We never sell or share your data with advertisers.' },
    { icon: AlertTriangle, color: '#ef4444', title: 'Incident Response',      desc: '72-hour maximum notification window for data breaches.' },
    { icon: CheckCircle,   color: '#06b6d4', title: 'GDPR & CCPA Ready',     desc: 'Full compliance with major data protection regulations.' },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 28 }}>
        {practices.map(p => (
          <div key={p.title} style={{ display: 'flex', gap: 12, padding: '18px', borderRadius: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><p.icon size={18} color={p.color} /></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
        <Shield size={22} color="var(--accent)" style={{ marginBottom: 8 }} />
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 5 }}>Found a vulnerability?</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Email <a href="mailto:security@taskflow.app" style={{ color: 'var(--accent)' }}>security@taskflow.app</a> — we respond within 24h.</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────── COOKIES ───────────────────────────── */
export const CookiesContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680 }}>
    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>We use cookies to make Task Flow work and to understand how it is used. Below is a breakdown of the cookies we set.</p>
    {[
      { name: 'Essential', color: '#10b981', required: true,  desc: 'Session authentication, CSRF protection, user preferences. Cannot be disabled.' },
      { name: 'Analytics', color: '#3b82f6', required: false, desc: 'Anonymous product analytics via PostHog — page views, feature usage, error tracking. Opt-out available.' },
      { name: 'Preferences', color: '#8b5cf6', required: false, desc: 'Remembers your theme (dark/light), timezone, and notification preferences across sessions.' },
    ].map(c => (
      <div key={c.name} style={{ display: 'flex', gap: 16, padding: '18px', borderRadius: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: c.color }}>{c.name}</div>
          <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 50, background: c.required ? `${c.color}15` : 'var(--bg-primary)', color: c.required ? c.color : 'var(--text-muted)', textTransform: 'uppercase' }}>{c.required ? 'Required' : 'Optional'}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{c.desc}</p>
      </div>
    ))}
    <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>Manage optional cookies from <strong style={{ color: 'var(--text-primary)' }}>Settings → Privacy</strong> · Questions: <a href="mailto:privacy@taskflow.app" style={{ color: 'var(--accent)' }}>privacy@taskflow.app</a></div>
  </div>
);

/* ─────────────────────────────── REGISTRY ──────────────────────────── */
export const MODAL_CONFIGS = {
  features:  { title: 'Features',           badge: 'Product',  Content: FeaturesContent },
  pricing:   { title: 'Pricing',            badge: 'Plans',    Content: PricingContent },
  changelog: { title: 'Changelog',          badge: 'Updates',  Content: ChangelogContent },
  roadmap:   { title: 'Roadmap',            badge: 'Future',   Content: RoadmapContent },
  about:     { title: 'About Task Flow',    badge: 'Company',  Content: AboutContent },
  blog:      { title: 'Blog',               badge: 'Articles', Content: BlogContent },
  careers:   { title: 'Careers',            badge: 'Hiring',   Content: CareersContent },
  press:     { title: 'Press',              badge: 'Media',    Content: PressContent },
  privacy:   { title: 'Privacy Policy',     badge: 'Legal',    Content: PrivacyContent },
  terms:     { title: 'Terms of Service',   badge: 'Legal',    Content: TermsContent },
  security:  { title: 'Security',           badge: 'Legal',    Content: SecurityContent },
  cookies:   { title: 'Cookie Policy',      badge: 'Legal',    Content: CookiesContent },
};
