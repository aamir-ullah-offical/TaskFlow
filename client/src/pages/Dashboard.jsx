import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { dailySummary, getProductivityInsights } from '../services/puterAI';
import WeeklyChart from '../components/analytics/WeeklyChart';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import PremiumSpinner from '../components/ui/PremiumSpinner';
import { format } from 'date-fns';
import {
  CheckSquare, CheckCircle2, Clock, AlertTriangle,
  CalendarDays, Bell, TrendingUp, RefreshCw, Sparkles, Loader,
  Lightbulb, Trophy, AlertOctagon, ArrowRight, Target, Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const BentoCard = ({ children, className = '', style = {}, title, icon: Icon, action }) => (
  <div className={`glass-panel ${className}`} style={{ 
    padding: 'clamp(16px, 3vw, 24px)', display: 'flex', flexDirection: 'column', ...style 
  }}>
    {(title || Icon) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <div className="icon-box"><Icon size={16} /></div>}
          {title && <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>}
        </div>
        {action}
      </div>
    )}
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const StatValue = ({ value, label, sub, color }) => (
  <div>
    <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: color || 'var(--text-primary)', lineHeight: 1, letterSpacing: '-1px' }}>
      {value ?? '-'}
    </div>
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 500 }}>{label}</div>
    {sub && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{sub}</div>}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(false);

  const loadStats = useCallback(() => {
    setLoading(true);
    setError(null);
    api.get('/analytics/dashboard')
      .then(({ data }) => setStats(data.stats))
      .catch(() => setError('Failed to load stats.'))
      .finally(() => setLoading(false));
  }, []);

  const fetchAISummary = useCallback(async (statsData) => {
    if (!statsData) return;
    setAiLoading(true);
    setAiError('');
    try {
      setInsightsLoading(true);
      const [summary, newInsights] = await Promise.all([
        dailySummary(statsData),
        getProductivityInsights(statsData)
      ]);
      setAiSummary(summary);
      setInsights(newInsights);
    } catch (err) {
      setAiError(err?.message || 'AI summary unavailable right now.');
      setTimeout(() => setAiError(''), 30000);
    } finally {
      setAiLoading(false);
      setInsightsLoading(false);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Bento Grid Layout
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            {format(new Date(), 'EEEE, MMMM d')}
          </p>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {greeting}, {user?.name?.split(' ')[0]}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={loadStats}
            className="glass-panel icon-btn"
            style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'spin' : ''} />
          </button>
        </div>
      </div>

      {loading ? (
        <PremiumSpinner size={60} />
      ) : error ? (
        <div className="error-banner"><AlertTriangle size={18} /> {error}</div>
      ) : (
        <div className="bento-grid">
          {/* 1. Hero / Focus Stat (Span 4) */}
          <BentoCard className="span-4" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))', borderColor: 'rgba(139,92,246,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-accent">Focus</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tasks for Today</span>
                </div>
                <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-2px', color: 'var(--text-primary)' }}>
                  {stats?.todayTasks || 0}
                </div>
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                   <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Clock size={14} className="text-blue" />
                      <span style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>{stats?.pending} Pending</span>
                   </div>
                   <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <AlertTriangle size={14} className="text-red" />
                      <span style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>{stats?.overdue} Overdue</span>
                   </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* 2. Merged Performance Card (Span 4) - Green/Emerald Theme */}
          <BentoCard className="span-4" title="Performance" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,95,70,0.05))', borderColor: 'rgba(16,185,129,0.2)' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                {/* Left: Completed Count & Trend */}
                <div>
                   <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Completed Tasks</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      {stats?.completed || 0}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', padding: '4px 8px', background: stats?.weeklyGrowth >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '6px', width: 'fit-content' }}>
                      <TrendingUp size={12} color={stats?.weeklyGrowth >= 0 ? '#10b981' : '#ef4444'} style={{ transform: stats?.weeklyGrowth < 0 ? 'rotate(180deg)' : 'none' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: stats?.weeklyGrowth >= 0 ? '#10b981' : '#ef4444' }}>
                        {stats?.weeklyGrowth > 0 ? '+' : ''}{stats?.weeklyGrowth || 0}% this week
                      </span>
                   </div>
                </div>

                {/* Right: Divider & Circular Goal */}
                <div style={{ width: '1px', height: '60px', background: 'var(--border)', margin: '0 16px', opacity: 0.5 }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                        <circle
                          cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - (stats?.weeklyCompletionRate || 0) / 100)}`}
                        />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats?.weeklyCompletionRate || 0}%</span>
                      </div>
                   </div>
                   <span style={{ fontSize: '10px', fontWeight: 600, marginTop: '6px', color: 'var(--text-muted)' }}>Weekly Goal</span>
                </div>
             </div>
          </BentoCard>

          {/* 3. Status Pie Chart (Span 4) - Amber/Orange Theme */}
          <BentoCard className="span-4" title="Status" icon={Zap} style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(180,83,9,0.05))', borderColor: 'rgba(245,158,11,0.2)' }}>
             <div style={{ position: 'relative', width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Done', value: stats?.completed || 0, color: '#10b981' },
                        { name: 'Pending', value: stats?.pending || 0, color: '#f59e0b' },
                        { name: 'Overdue', value: stats?.overdue || 0, color: '#ef4444' }
                      ].filter(d => d.value > 0)}
                      cx="50%" cy="50%"
                      innerRadius={38} outerRadius={56}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        { name: 'Done', value: stats?.completed || 0, color: '#10b981' },
                        { name: 'Pending', value: stats?.pending || 0, color: '#f59e0b' },
                        { name: 'Overdue', value: stats?.overdue || 0, color: '#ef4444' }
                      ].filter(d => d.value > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Label – overlaid via absolute positioning */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{stats?.total || 0}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tasks</div>
                   </div>
                </div>
             </div>
          </BentoCard>


          {/* 4. Weekly Activity Chart (Span 12) - Blue Theme */}
          <BentoCard className="span-12" title="Weekly Activity" icon={TrendingUp} style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(30,58,138,0.02))', borderColor: 'rgba(59,130,246,0.15)' }}>
            <div style={{ height: '240px', width: '100%' }}>
              <WeeklyChart data={stats?.weeklyProgress || []} />
            </div>
          </BentoCard>

          {/* 5. AI Insights (Span 12) - Purple Theme */}
          <BentoCard className="span-12" title="AI Coach & Insights" icon={Sparkles} style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(124,58,237,0.02))', borderColor: 'rgba(139,92,246,0.15)' }}
            action={
              <button 
                onClick={() => fetchAISummary(stats)} 
                disabled={aiLoading} 
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {aiLoading ? 'Analyzing...' : 'Refresh Analysis'}
              </button>
            }
          >
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Daily Summary Left */}
                <div style={{ background: 'rgba(139,92,246,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.1)' }}>
                   <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lightbulb size={16} /> Daily Briefing
                   </h4>
                   <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {aiSummary || "Get your daily productivity briefing by clicking Refresh."}
                   </p>
                </div>
                
                {/* Insights List Right */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {insights.length > 0 ? insights.map((insight, i) => (
                    <div key={i} style={{ 
                      display: 'flex', gap: '12px', padding: '14px', borderRadius: '12px',
                      background: 'var(--bg-input)', border: '1px solid var(--border)'
                    }}>
                       {insight.type === 'warning' ? <AlertOctagon size={18} className="text-red" style={{ flexShrink: 0 }} /> : 
                        insight.type === 'kudos' ? <Trophy size={18} className="text-accent" style={{ flexShrink: 0 }} /> : 
                        <Lightbulb size={18} className="text-amber" style={{ flexShrink: 0 }} />}
                       <span style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{insight.text}</span>
                    </div>
                  )) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                      No granular insights available yet.
                    </div>
                  )}
                </div>
             </div>
          </BentoCard>
        </div>
      )}

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
          grid-auto-rows: minmax(140px, auto);
        }
        .span-2 { grid-column: span 2; }
        .span-3 { grid-column: span 3; }
        .span-4 { grid-column: span 4; }
        .span-6 { grid-column: span 6; }
        .span-8 { grid-column: span 8; }
        .span-12 { grid-column: span 12; }
        
        @media (max-width: 1024px) {
          .span-4, .span-6, .span-8 { grid-column: span 6; }
          .span-2 { grid-column: span 3; }
        }
        @media (max-width: 768px) {
          .bento-grid { display: flex; flexDirection: column; }
          .span-2, .span-3, .span-4, .span-6, .span-8, .span-12 { width: 100%; }
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dark .glass-panel {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-panel:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
        }

        .icon-box {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--bg-hover); color: var(--text-secondary);
          display: flex; alignItems: center; justifyContent: center;
        }
        .badge {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          padding: 2px 6px; border-radius: 6px; letter-spacing: 0.5px;
        }
        .badge-accent { background: rgba(139,92,246,0.15); color: var(--accent); }
        .text-btn { background: none; border: none; cursor: pointer; color: var(--accent); font-size: 12px; font-weight: 600; }
        .text-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .text-red { color: #ef4444; }
        .text-blue { color: #3b82f6; }
        .text-amber { color: #f59e0b; }
        .text-accent { color: var(--accent); }
        .spin { animation: spin 1s linear infinite; }
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .span-4, .span-6, .span-8 { grid-column: span 1; }
          .span-2 { grid-column: span 1; }
          .span-12 { grid-column: span 2; }
          /* Reset spans */
          .glass-panel { padding: 20px; }
          h1 { font-size: 28px !important; }
        }
        @media (max-width: 768px) {
          .bento-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
          .span-2, .span-3, .span-4, .span-6, .span-8, .span-12 { grid-column: 1 / -1 !important; width: 100% !important; }
          .glass-panel { padding: 16px; }
          h1 { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
