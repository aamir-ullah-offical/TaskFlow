import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import {
  LayoutDashboard, CheckSquare, Bell, User, LogOut, Zap, X, Target, Flame
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'My Tasks' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/habits', icon: Flame, label: 'Habits' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const Sidebar = ({ collapsed, isMobile, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useSocket();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const width = isMobile ? 240 : (collapsed ? 68 : 240);
  const showLabels = isMobile ? true : !collapsed;

  const sidebarStyle = {
    width: `${width}px`,
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 50,
    transition: 'width 0.3s ease, transform 0.3s ease',
    overflowX: 'hidden',
    overflowY: 'auto',
    transform: isMobile && !mobileOpen ? 'translateX(-100%)' : 'translateX(0)',
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <aside style={sidebarStyle}>
        {/* Logo */}
        <div style={{
          padding: collapsed && !isMobile ? '20px 0' : '20px 18px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'space-between',
          minHeight: '65px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px var(--accent-glow)', flexShrink: 0,
            }}>
              <Zap size={18} color="#fff" />
            </div>
            {showLabels && (
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <p style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.2 }}>TaskFlow</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>Pro</p>
              </div>
            )}
          </div>
          {isMobile && (
            <button
              onClick={onMobileClose}
              style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* User info — only when expanded */}
        {showLabels && (
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--accent)' }}
                />
              ) : (
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '14px',
                }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed: avatar only */}
        {!showLabels && (
          <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            {user?.avatar?.url ? (
              <img src={user.avatar.url} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
            ) : (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: collapsed && !isMobile ? '12px 0' : '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          alignItems: collapsed && !isMobile ? 'center' : 'stretch',
        }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={isMobile ? onMobileClose : undefined}
              title={collapsed && !isMobile ? label : undefined}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              style={collapsed && !isMobile ? {
                width: '44px', height: '44px',
                padding: 0, justifyContent: 'center',
                borderRadius: '10px',
                position: 'relative',
              } : { position: 'relative' }}
            >
              <Icon size={18} />
              {showLabels && label}
              {to === '/notifications' && unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: collapsed && !isMobile ? '8px' : '10px',
                  right: collapsed && !isMobile ? '8px' : '12px',
                  background: 'var(--danger)',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 700,
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 5px rgba(239,68,68,0.4)',
                  border: '2px solid var(--bg-secondary)', // Cutout effect
                }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{
          padding: collapsed && !isMobile ? '12px 0' : '12px 10px',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: collapsed && !isMobile ? 'center' : 'stretch',
        }}>
          <button
            onClick={handleLogout}
            className="sidebar-link"
            title={collapsed && !isMobile ? 'Logout' : undefined}
            style={{
              color: 'var(--danger)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              ...(collapsed && !isMobile ? {
                width: '44px', height: '44px',
                padding: 0, justifyContent: 'center',
                borderRadius: '10px',
              } : { width: '100%' }),
            }}
          >
            <LogOut size={18} />
            {showLabels && 'Logout'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
