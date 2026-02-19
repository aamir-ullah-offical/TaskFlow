import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, CheckSquare, ArrowRight, Loader, Camera, ArrowLeft, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Register page – with:
 *  - Custom cursor (same as landing page)
 *  - Back button (top-left) → navigates to '/'
 *  - Theme toggle (top-right) → syncs with landing page localStorage key
 */
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', cls: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { label: 'Weak',   cls: 'weak'   },
    { label: 'Fair',   cls: 'fair'   },
    { label: 'Good',   cls: 'good'   },
    { label: 'Strong', cls: 'strong' },
  ];
  return { score, ...levels[Math.min(score - 1, 3)] };
};

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [avatar, setAvatar]               = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [loading, setLoading]             = useState(false);
  const { register }  = useAuth();
  const navigate      = useNavigate();
  const strength      = getPasswordStrength(form.password);

  // ─── Local theme (mirrors landing-theme key) ──────────────────────────────
  const [theme, setTheme] = useState(
    () => localStorage.getItem('landing-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('landing-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB.'); return; }
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k !== 'confirmPassword') formData.append(k, v); });
      if (avatar) formData.append('avatar', avatar);
      await register(formData);
      toast.success('Account created! Welcome aboard 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
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
        <div className="auth-card" style={{ maxWidth: '460px' }}>
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

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start organizing your work in seconds</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Avatar Upload */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
              <label htmlFor="avatar-input" className="avatar-upload-zone" title="Upload avatar">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)' }}
                  />
                ) : (
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--bg-input)', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}>
                    <Camera size={20} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 500 }}>PHOTO</span>
                  </div>
                )}
                <div className="avatar-upload-overlay">
                  <Camera size={18} color="#fff" />
                </div>
                <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name <span className="required">*</span></label>
              <div className="input-wrapper">
                <span className="input-icon"><User size={16} /></span>
                <input id="name" name="name" type="text" className="form-input has-icon-left" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address <span className="required">*</span></label>
              <div className="input-wrapper">
                <span className="input-icon"><Mail size={16} /></span>
                <input id="email" name="email" type="email" className="form-input has-icon-left" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" required />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password <span className="required">*</span></label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={16} /></span>
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input has-icon-left has-icon-right"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button type="button" className="input-icon-right" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`strength-bar ${i <= strength.score ? `active-${strength.cls}` : ''}`} />
                    ))}
                  </div>
                  <span className={`strength-label ${strength.cls}`}>{strength.label}</span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm password <span className="required">*</span></label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={16} /></span>
                <input
                  id="confirmPassword" name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className={`form-input has-icon-left has-icon-right ${form.confirmPassword && form.confirmPassword !== form.password ? 'error' : ''}`}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button type="button" className="input-icon-right" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <span className="form-error">Passwords do not match</span>
              )}
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
                <><Loader size={16} className="animate-spin" /> Creating account…</>
              ) : (
                <>Create account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
