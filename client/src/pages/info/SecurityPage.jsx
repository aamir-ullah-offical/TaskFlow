import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const practices = [
  { icon: Lock, color: '#8b5cf6', title: 'End-to-End Encryption', desc: 'All data in transit is encrypted with TLS 1.3. Sensitive fields at rest are encrypted with AES-256.' },
  { icon: Server, color: '#3b82f6', title: 'SOC 2 Type II Compliant', desc: 'Our infrastructure and processes have been independently audited and certified SOC 2 Type II.' },
  { icon: Shield, color: '#10b981', title: 'Regular Pen Testing', desc: 'We commission third-party penetration tests quarterly and address all critical findings within 24 hours.' },
  { icon: Eye, color: '#f59e0b', title: 'Zero Data Selling', desc: 'We never sell, rent, or share your personal data with advertisers or third parties for marketing.' },
  { icon: AlertTriangle, color: '#ef4444', title: 'Incident Response', desc: 'Documented incident response plan with 72-hour maximum notification window for data breaches.' },
  { icon: CheckCircle, color: '#06b6d4', title: 'GDPR & CCPA Ready', desc: 'Full compliance with GDPR, CCPA, and other major data protection regulations worldwide.' },
];

const SecurityPage = () => (
  <InfoPageLayout
    badge="Security"
    title="Your data is safe with us"
    subtitle="Security isn't an afterthought at Task Flow â€” it's part of our foundation."
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 64 }}>
      {practices.map(p => (
        <div key={p.title} style={{ padding: '28px', borderRadius: 18, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <p.icon size={22} color={p.color} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ maxWidth: 600, margin: '0 auto', padding: '36px', borderRadius: 20, background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
      <Shield size={32} color="var(--accent)" style={{ marginBottom: 14 }} />
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Found a vulnerability?</h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
        We run a responsible disclosure program. If you discover a security issue, please email us before making it public. We'll respond within 24 hours.
      </p>
      <a href="mailto:security@taskflow.app" style={{ display: 'inline-block', color: 'var(--accent)', fontSize: 14, fontWeight: 600 }}>security@taskflow.app</a>
    </div>
  </InfoPageLayout>
);

export default SecurityPage;

