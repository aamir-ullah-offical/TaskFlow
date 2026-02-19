import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import toast from 'react-hot-toast';
import {
  User, Mail, Camera, Lock, Eye, EyeOff, Save,
  Shield, Loader, Info, CalendarDays, Crown, Palette
} from 'lucide-react';
import { format } from 'date-fns';

const SectionCard = ({ icon: Icon, title, children, style = {} }) => (
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    ...style,
  }}>
    <div style={{
      padding: '14px 24px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 100%)',
      borderLeft: '3px solid var(--accent)',
      flexShrink: 0,
    }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '8px',
        background: 'rgba(139,92,246,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={15} color="var(--accent)" />
      </div>
      <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.01em' }}>{title}</h2>
    </div>
    <div style={{ padding: '24px', flex: 1 }}>{children}</div>
  </div>
);


const Profile = () => {
  const { user, updateUser, updatePassword } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const { register: regPassword, handleSubmit: handlePasswordSubmit, formState: { errors: pwErrors }, watch, reset: resetPw } = useForm();
  const newPw = watch('newPassword', '');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB.'); return; }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onProfileSubmit = async (values) => {
    setProfileLoading(true);
    try {
      const formData = new FormData();
      if (values.name !== user.name) formData.append('name', values.name);
      if (values.email !== user.email) formData.append('email', values.email);
      if (avatarFile) formData.append('avatar', avatarFile);
      const { data } = await api.put('/users/me', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      updateUser(data.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (values) => {
    setPasswordLoading(true);
    try {
      await updatePassword(values.currentPassword, values.newPassword, values.confirmPassword);
      toast.success('Password changed successfully!');
      resetPw();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const EyeBtn = ({ show, onToggle }) => (
    <button type="button" className="input-icon-right" onClick={onToggle} aria-label="Toggle visibility">
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>Profile Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px' }}>
          Manage your account information and security preferences.
        </p>
      </div>

      {/* ── Top Row: Avatar card + Account Info ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'start' }}>
        <div style={{ flex: '1 1 350px' }}>

        {/* Avatar + Name/Email */}
        <SectionCard icon={User} title="Personal Information">
          <form onSubmit={handleProfile(onProfileSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              <label htmlFor="avatar-input" className="avatar-upload-zone" title="Change photo" style={{ cursor: 'pointer' }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', display: 'block' }} />
                ) : (
                  <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '36px', border: '3px solid var(--accent)' }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="avatar-upload-overlay">
                  <Camera size={22} color="#fff" />
                </div>
                <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
              </label>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{user?.email}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>JPG, PNG, GIF · Max 5MB</p>
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name</label>
              <div className="input-wrapper">
                <span className="input-icon"><User size={15} /></span>
                <input id="name" type="text"
                  className={`form-input has-icon-left ${profileErrors.name ? 'error' : ''}`}
                  placeholder="Your full name"
                  {...regProfile('name', { required: 'Name is required', maxLength: { value: 50, message: 'Max 50 characters' } })}
                />
              </div>
              {profileErrors.name && <span className="form-error">{profileErrors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <span className="input-icon"><Mail size={15} /></span>
                <input id="email" type="email"
                  className={`form-input has-icon-left ${profileErrors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  {...regProfile('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                />
              </div>
              {profileErrors.email && <span className="form-error">{profileErrors.email.message}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={profileLoading} style={{ width: '100%' }}>
              {profileLoading ? <><Loader size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save changes</>}
            </button>
          </form>
        </SectionCard>
        </div>
        <div style={{ flex: '1 1 350px' }}>
          {/* Account Info */}
          <SectionCard icon={Info} title="Account Information">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Role', value: user?.role || 'user', Icon: Crown, color: '#f59e0b' },
                { label: 'Theme', value: user?.theme || 'dark', Icon: Palette, color: '#8b5cf6' },
                { label: 'Member since', value: user?.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : '—', Icon: CalendarDays, color: '#10b981' },
                { label: 'Last login', value: user?.lastLogin ? format(new Date(user.lastLogin), 'MMM d, yyyy · h:mm a') : '—', Icon: CalendarDays, color: '#3b82f6' },
              ].map(({ label, value, Icon: ItemIcon, color }) => (
                <div key={label} style={{
                  padding: '14px 16px',
                  background: 'var(--bg-input)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ItemIcon size={16} color={color} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>{label}</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600, textTransform: 'capitalize' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Bottom: Change Password (full width) ── */}
      <SectionCard icon={Shield} title="Change Password">
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'start' }}>
            {/* Current */}
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label className="form-label" htmlFor="currentPassword">Current password</label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={15} /></span>
                <input id="currentPassword" type={showCurrent ? 'text' : 'password'}
                  className={`form-input has-icon-left has-icon-right ${pwErrors.currentPassword ? 'error' : ''}`}
                  placeholder="Current password"
                  {...regPassword('currentPassword', { required: 'Required' })}
                />
                <EyeBtn show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
              </div>
              {pwErrors.currentPassword && <span className="form-error">{pwErrors.currentPassword.message}</span>}
            </div>

            {/* New */}
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label className="form-label" htmlFor="newPassword">New password</label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={15} /></span>
                <input id="newPassword" type={showNew ? 'text' : 'password'}
                  className={`form-input has-icon-left has-icon-right ${pwErrors.newPassword ? 'error' : ''}`}
                  placeholder="Min. 8 characters"
                  {...regPassword('newPassword', {
                    required: 'Required',
                    minLength: { value: 8, message: 'At least 8 characters' },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Needs uppercase, lowercase & number' },
                  })}
                />
                <EyeBtn show={showNew} onToggle={() => setShowNew(v => !v)} />
              </div>
              {pwErrors.newPassword && <span className="form-error">{pwErrors.newPassword.message}</span>}
            </div>

            {/* Confirm */}
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
              <div className="input-wrapper">
                <span className="input-icon"><Lock size={15} /></span>
                <input id="confirmPassword" type={showConfirm ? 'text' : 'password'}
                  className={`form-input has-icon-left has-icon-right ${pwErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat new password"
                  {...regPassword('confirmPassword', {
                    required: 'Required',
                    validate: v => v === newPw || 'Passwords do not match',
                  })}
                />
                <EyeBtn show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
              </div>
              {pwErrors.confirmPassword && <span className="form-error">{pwErrors.confirmPassword.message}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" className="btn-primary" disabled={passwordLoading} style={{ minWidth: '160px' }}>
              {passwordLoading ? <><Loader size={15} className="animate-spin" /> Updating...</> : <><Shield size={15} /> Update password</>}
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
};

export default Profile;
