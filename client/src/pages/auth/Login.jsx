import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, CheckSquare, ArrowRight, Loader, ArrowLeft, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Login page – with:
 *  - Custom cursor (same as landing page)
 *  - Back button (top-left) → navigates to '/'
 *  - Theme toggle (top-right) → syncs with landing page localStorage key
 */
const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }     = useAuth();
  const navigate      = useNavigate();

  // ─── Local theme (mirrors landing-theme key) ──────────────────────────────
  const [theme, setTheme] = useState(
    () => localStorage.getItem('landing-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('landing-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // ─── Form submission ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        {/* ── Back button (top-left) ── */}
        <Link to="/" className="auth-back-btn" aria-label="Back to home">
          <ArrowLeft size={15} />
          Home
        </Link>

        {/* ── Theme toggle (top-right) ── */}
        <button
          className="auth-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* ── Auth card ── */}
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <CheckSquare size={20} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Task Flow
              </p>
              <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>Pro</p>
            </div>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <span className="input-icon"><Mail size={16} /></span>
                <input
                  id="email"
                  type="email"
                  className="form-input has-icon-left"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={16} /></span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input has-icon-left has-icon-right"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              data-cursor-hover
              style={{ width: '100%', marginTop: '8px', padding: '13px' }}
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            Don&apos;t have an account?{' '}
            <Link to="/register">Create one free</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
