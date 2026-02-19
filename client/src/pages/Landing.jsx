
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, TrendingUp, Sparkles, Layout, Zap, 
  Shield, ArrowRight, Star
} from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page animate-fade-in" style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
      
      {/* --- Navbar --- */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '20px clamp(20px, 5vw, 60px)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(var(--bg-primary-rgb), 0.6)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
          <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(to right, var(--accent), #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TaskMaster
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {user ? (
             <Link to="/dashboard" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '50px' }}>Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ padding: '10px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Log In</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '50px', boxShadow: '0 10px 30px -10px var(--accent)' }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div style={{ 
        paddingTop: '160px', paddingBottom: '100px', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        paddingLeft: '20px', paddingRight: '20px',
        maxWidth: '1200px', margin: '0 auto', position: 'relative'
      }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '250px', height: '250px', background: '#3b82f6', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />

        <div style={{ zIndex: 1, maxWidth: '800px' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', background: 'rgba(139,92,246,0.1)', borderRadius: '50px', border: '1px solid rgba(139,92,246,0.2)', marginBottom: '24px' }}>
              <Sparkles size={14} className="text-accent" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>AI-Powered Productivity 2.0</span>
           </div>
           
           <h1 style={{ 
             fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px',
             background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
           }}>
             Master Your Day <br />
             <span style={{ background: 'linear-gradient(to right, var(--accent), #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Without The Chaos.</span>
           </h1>
           
           <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
             The all-in-one workspace that combines tasks, habits, and goals with an intelligent AI coach to keep you focused on what matters.
           </p>

           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px', flexWrap: 'wrap' }}>
             <Link to="/register" className="btn-primary" style={{ height: '56px', padding: '0 32px', borderRadius: '50px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               Start for Free <ArrowRight size={18} />
             </Link>
             <Link to="/login" style={{ height: '56px', padding: '0 32px', borderRadius: '50px', fontSize: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
               Live Demo
             </Link>
           </div>
        </div>

        {/* --- 3D Dashboard Mockup --- */}
        <div className="hero-mockup" style={{ 
          width: '100%', maxWidth: '1000px', 
          aspectRatio: '16/9', 
          background: 'var(--bg-card)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
          transform: 'perspective(1000px) rotateX(2deg) translateY(0)',
          transition: 'transform 0.3s ease'
        }}>
           {/* Mock Header */}
           <div style={{ height: '60px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#ef4444' }}/>
                 <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#f59e0b' }}/>
                 <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:'#10b981' }}/>
              </div>
           </div>
           {/* Mock Body */}
           <div style={{ padding: '30px', display: 'flex', gap: '30px', height: 'calc(100% - 60px)' }}>
              <div style={{ width: '240px', background: 'var(--bg-hover)', borderRadius: '16px', opacity: 0.5 }}></div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '20px' }}>
                 {/* Shiny Cards */}
                 <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))', borderRadius: '16px', border: '1px solid var(--accent-glow)' }}></div>
                 <div style={{ background: 'var(--bg-hover)', borderRadius: '16px' }}></div>
                 <div style={{ background: 'var(--bg-hover)', borderRadius: '16px' }}></div>
                 <div style={{ gridColumn: 'span 2', background: 'var(--bg-hover)', borderRadius: '16px' }}></div>
                 <div style={{ background: 'var(--bg-hover)', borderRadius: '16px' }}></div>
              </div>
           </div>
           {/* "Live" Badge */}
           <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: 'white', padding: '8px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: 600 }}>
              Live Preview
           </div>
        </div>
      </div>

      {/* --- Features Grid --- */}
      <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '20px' }}>Everything you need using AI.</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Streamline your workflow with tools designed for high performers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
           <FeatureCard 
             icon={Sparkles} 
             title="AI Productivity Coach" 
             desc="Get personalized daily briefings and actionable insights to improve your workflow."
             gradient="linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.05))"
             color="var(--accent)"
           />
           <FeatureCard 
             icon={TrendingUp} 
             title="Advanced Analytics" 
             desc="Visualize your progress with completion trends, pie charts, and weekly reports."
             gradient="linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))"
             color="#3b82f6"
           />
           <FeatureCard 
             icon={CheckCircle2} 
             title="Smart Tasks & Habits" 
             desc="Manage everything in one place. Break down tasks with AI and track daily habits."
             gradient="linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.05))"
             color="#10b981"
           />
        </div>
      </div>

      {/* --- Footer --- */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 20px', textAlign: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <img src="/logo.svg" alt="Logo" style={{ width: '24px', height: '24px', opacity: 0.8 }} />
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-secondary)' }}>TaskMaster</span>
         </div>
         <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>© 2026 TaskMaster. Built for supreme productivity.</p>
      </footer>

      <style>{`
        .hero-mockup:hover {
           transform: perspective(1000px) rotateX(0deg) translateY(-10px) !important;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, gradient, color }) => (
  <div style={{ 
    padding: '40px', borderRadius: '24px', 
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    transition: 'transform 0.2s', cursor: 'default',
    position: 'relative', overflow: 'hidden'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ position: 'absolute', inset: 0, background: gradient, opacity: 0.5 }}></div>
    <div style={{ position: 'relative', zIndex: 1 }}>
       <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)' }}>
          <Icon size={24} color={color} />
       </div>
       <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{title}</h3>
       <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  </div>
);

export default Landing;
