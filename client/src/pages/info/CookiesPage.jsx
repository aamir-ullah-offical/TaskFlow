import InfoPageLayout from '../../components/landing/InfoPageLayout';

const cookieTypes = [
  { name: 'Essential', color: '#10b981', required: true,  desc: 'Required for the service to work. Includes session authentication, CSRF protection, and user preferences. Cannot be disabled.' },
  { name: 'Analytics', color: '#3b82f6', required: false, desc: 'Help us understand how users interact with Task Flow so we can improve the product. Includes page views, feature usage, and error tracking. Opt-out available.' },
  { name: 'Preferences', color: '#8b5cf6', required: false, desc: 'Remember your settings like theme (dark/light mode), timezone, and notification preferences across sessions.' },
];

const CookiesPage = () => (
  <InfoPageLayout
    badge="Legal"
    title="Cookie Policy"
    subtitle="Last revised: February 1, 2026. We use cookies to make Task Flow work and to understand how it is used."
  >
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40 }}>
        A cookie is a small text file placed on your device by a website you visit. Cookies allow us to recognise you between visits, remember your preferences, and understand which parts of Task Flow are most useful. Below is a breakdown of the cookies we use.
      </p>

      {/* Cookie types */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
        {cookieTypes.map(c => (
          <div key={c.name} style={{ padding: '24px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 20 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: c.color }}>{c.name}</div>
              <div style={{ marginTop: 4, display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50, background: c.required ? `${c.color}15` : 'var(--bg-secondary)', color: c.required ? c.color : 'var(--text-muted)', textTransform: 'uppercase' }}>
                {c.required ? 'Required' : 'Optional'}
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Managing cookies</h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
        You can control optional cookies from <strong style={{ color: 'var(--text-primary)' }}>Settings â†’ Privacy</strong> in your Task Flow account. You may also clear cookies through your browser settings at any time, though this may affect functionality.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Third-party cookies</h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        We use PostHog for anonymous product analytics. PostHog operates under its own privacy policy. We do not use Google Ads, Facebook Pixel, or any advertising cookies.
      </p>

      <div style={{ marginTop: 40, padding: '18px 20px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 13, color: 'var(--text-secondary)' }}>
        Questions? Email <a href="mailto:privacy@taskflow.app" style={{ color: 'var(--accent)' }}>privacy@taskflow.app</a>
      </div>
    </div>
  </InfoPageLayout>
);

export default CookiesPage;

