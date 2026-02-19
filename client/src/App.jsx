import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import DashboardLayout from './components/layout/DashboardLayout';
import CursorEffect from './components/landing/CursorEffect';

// Route-level code splitting for faster initial load
const LandingPage    = lazy(() => import('./pages/LandingPage'));
const Dashboard      = lazy(() => import('./pages/Dashboard'));
const Tasks          = lazy(() => import('./pages/Tasks'));
const Profile        = lazy(() => import('./pages/Profile'));
const Notifications  = lazy(() => import('./pages/Notifications'));
const Login          = lazy(() => import('./pages/auth/Login'));
const Register       = lazy(() => import('./pages/auth/Register'));
const Habits         = lazy(() => import('./pages/Habits'));

// Info / Marketing pages (kept for potential direct-URL access)
const FeaturesPage   = lazy(() => import('./pages/info/FeaturesPage'));
const PricingPage    = lazy(() => import('./pages/info/PricingPage'));
const ChangelogPage  = lazy(() => import('./pages/info/ChangelogPage'));
const RoadmapPage    = lazy(() => import('./pages/info/RoadmapPage'));
const AboutPage      = lazy(() => import('./pages/info/AboutPage'));
const BlogPage       = lazy(() => import('./pages/info/BlogPage'));
const CareersPage    = lazy(() => import('./pages/info/CareersPage'));
const PressPage      = lazy(() => import('./pages/info/PressPage'));
const PrivacyPage    = lazy(() => import('./pages/info/PrivacyPage'));
const TermsPage      = lazy(() => import('./pages/info/TermsPage'));
const SecurityPage   = lazy(() => import('./pages/info/SecurityPage'));
const CookiesPage    = lazy(() => import('./pages/info/CookiesPage'));
const DeveloperPage  = lazy(() => import('./pages/info/DeveloperPage'));
const NotFound       = lazy(() => import('./pages/NotFound'));

// Full-page loading spinner
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
    <div style={{ textAlign: 'center' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 16px' }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading...</p>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? children : <Navigate to="/login" replace />;
};

// Public route wrapper (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Info / Marketing pages */}
      <Route path="/features"   element={<FeaturesPage />} />
      <Route path="/pricing"    element={<PricingPage />} />
      <Route path="/changelog"  element={<ChangelogPage />} />
      <Route path="/roadmap"    element={<RoadmapPage />} />
      <Route path="/about"      element={<AboutPage />} />
      <Route path="/blog"       element={<BlogPage />} />
      <Route path="/careers"    element={<CareersPage />} />
      <Route path="/press"      element={<PressPage />} />
      <Route path="/privacy"    element={<PrivacyPage />} />
      <Route path="/terms"      element={<TermsPage />} />
      <Route path="/security"   element={<SecurityPage />} />
      <Route path="/cookies"    element={<CookiesPage />} />
      <Route path="/developers" element={<DeveloperPage />} />

      {/* Protected Dashboard Layout */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard"     element={<Dashboard />} />
        <Route path="tasks"         element={<Tasks />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="habits"        element={<Habits />} />
        <Route path="profile"       element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <SocketProvider>
          <CursorEffect />
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </SocketProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
