import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import FloatingAIChat from '../ai/FloatingAIChat';
import { Outlet } from 'react-router-dom';

const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 68;

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mobileOpen, setMobileOpen] = useState(false);   // mobile overlay
  const [collapsed, setCollapsed] = useState(false);      // desktop icon-only mode

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content — shifts right by sidebar width on desktop */}
      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 0,
        transition: 'margin-left 0.3s ease',
      }}>
        <Navbar
          onMenuClick={() => isMobile ? setMobileOpen(true) : setCollapsed(v => !v)}
          collapsed={collapsed}
          isMobile={isMobile}
        />
        <main style={{
          flex: 1,
          padding: '28px 32px',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <Outlet />
        </main>
      </div>
      <FloatingAIChat />
    </div>
  );
};

export default DashboardLayout;
