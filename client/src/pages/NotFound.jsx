import { useNavigate } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import FooterSection from '../components/landing/FooterSection';

/* ─── 404 Page ────────────────────────────────────── */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      <LandingNavbar theme="dark" toggleTheme={() => {}} /> 
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '120px 24px' }}>
        
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: 600, position: 'relative', zIndex: 10 }}>
            
            <div style={{ marginBottom: 32, position: 'relative', display: 'inline-block' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}>
                    <Ghost size={64} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 48, transform: 'rotate(20deg)' }}>❓</div>
            </div>

            <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, margin: 0, lineHeight: 1, color: 'var(--text-primary)', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                404
            </h1>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 24 }}>
                Page Not Found (Obviously)
            </h2>
            
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40 }}>
                Oops! It seems you've ventured into the void. Even our AI Coach can't find this page. It might have been deleted, moved, or maybe it never existed in this timeline.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <ArrowLeft size={18} /> Go Back
                </button>
                <button 
                    onClick={() => navigate('/')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(139,92,246,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Home size={18} /> Return Home
                </button>
            </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default NotFound;
