import { Link } from 'react-router-dom';
import { CheckSquare, ArrowLeft } from 'lucide-react';

/**
 * Shared layout wrapper for all marketing/info pages (About, Features, etc.)
 * Provides: top navbar bar with back link, centered content area, footer strip.
 */
const InfoPageLayout = ({ title, subtitle, badge, children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
    {/* Slim top bar */}
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckSquare size={17} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Task Flow</span>
        </Link>

        {/* Back link */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }} className="auth-back-btn" data-cursor-hover>
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </header>

    {/* Page hero */}
    <div style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', borderBottom: '1px solid var(--border)', padding: '64px 24px 56px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        {badge && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 50, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: 'var(--accent)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
            {badge}
          </div>
        )}
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {/* Content */}
    <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '64px 24px' }}>
      {children}
    </main>

    {/* Mini footer */}
    <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
      © 2026 Task Flow · <Link to="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy</Link> · <Link to="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</Link>
    </footer>
  </div>
);

export default InfoPageLayout;
