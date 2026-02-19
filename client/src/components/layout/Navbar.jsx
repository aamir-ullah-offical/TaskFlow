import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useSocket } from '../../context/SocketContext';
import api from '../../api/axios';
import { formatDistanceToNow } from 'date-fns';

const Navbar = ({ onMenuClick, isMobile }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, resetUnread } = useSocket();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openNotifications = async () => {
    const opening = !notifOpen;
    setNotifOpen(opening);
    if (opening) {
      setNotifLoading(true);
      try {
        const { data } = await api.get('/notifications?limit=10');
        setNotifications(data.notifications);
        // Only mark as read after fetching — user will see the notifications
        await api.put('/notifications/read-all');
        resetUnread();
      } catch { /* silent */ }
      finally { setNotifLoading(false); }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 12px' : '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      {/* Left: Menu + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
        <button
          onClick={onMenuClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', display: isMobile ? 'none' : 'block' }}>
          TaskFlow
        </h1>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'var(--bg-input)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s',
          }}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={openNotifications}
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s',
              position: 'relative',
            }}
            aria-label="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="notification-dot" />
            )}
          </button>

          {notifOpen && (
            <div className="animate-fade-in" style={{
              position: 'absolute', top: '46px', right: 0,
              width: isMobile ? '280px' : '340px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '14px',
              boxShadow: 'var(--shadow-card)', overflow: 'hidden', zIndex: 100,
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>Notifications</p>
                <button onClick={() => { setNotifOpen(false); navigate('/notifications'); }} style={{ fontSize: '12px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
              </div>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                ) : notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No notifications yet</div>
                ) : notifications.map((n) => (
                  <div key={n._id} style={{
                    padding: '12px 16px', borderBottom: '1px solid var(--border)',
                    background: n.isRead ? 'transparent' : 'var(--accent-glow)',
                  }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>{n.message}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '4px 10px 4px 4px',
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
            }}
            aria-label="Profile menu"
          >
            {user?.avatar?.url ? (
              <img src={user.avatar.url} alt={user.name} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '13px',
              }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            {!isMobile && (
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name}
              </span>
            )}
          </button>

          {profileOpen && (
            <div className="animate-fade-in" style={{
              position: 'absolute', top: '46px', right: 0,
              width: '180px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '12px',
              boxShadow: 'var(--shadow-card)', overflow: 'hidden', zIndex: 100,
            }}>
              <button onClick={() => { navigate('/profile'); setProfileOpen(false); }} style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '13px' }}>
                <Settings size={15} /> Profile Settings
              </button>
              <div style={{ height: '1px', background: 'var(--border)' }} />
              <button onClick={handleLogout} style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: '13px' }}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
