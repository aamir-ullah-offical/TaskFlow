import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Trash2, Clock, Zap, CheckCircle2, AlertTriangle, FilePlus, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSocket } from '../context/SocketContext';

const typeConfig = {
  reminder:       { Icon: Clock,         color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Reminder'   },
  system:         { Icon: Zap,           color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', label: 'System'     },
  task_created:   { Icon: FilePlus,      color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: 'Created'    },
  task_completed: { Icon: CheckCircle2,  color: '#10b981', bg: 'rgba(16,185,129,0.12)', label: 'Completed'  },
  task_overdue:   { Icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  label: 'Overdue'    },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { resetUnread, notifications: socketNotifications } = useSocket();
  const hasMarkedRead = useRef(false);

  useEffect(() => {
    fetchNotifications();
    return () => {
      if (!hasMarkedRead.current) {
        api.put('/notifications/read-all').catch(() => {});
        resetUnread();
        hasMarkedRead.current = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepend any new real-time notifications that arrive while on this page
  useEffect(() => {
    if (socketNotifications.length > 0) {
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n._id));
        const newOnes = socketNotifications.filter((n) => !existingIds.has(n._id));
        return newOnes.length > 0 ? [...newOnes, ...prev] : prev;
      });
    }
  }, [socketNotifications]);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications?limit=50');
      setNotifications(data.notifications);
    } catch {
      toast.error('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {
      toast.error('Failed to delete notification.');
    }
  };

  // Single bulk DELETE call — no more N individual requests
  const handleClearAll = async () => {
    try {
      await api.delete('/notifications');
      setNotifications([]);
      resetUnread();
      toast.success('All notifications cleared.');
    } catch {
      toast.error('Failed to clear notifications.');
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>Notifications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px' }}>
            {notifications.length} total
            {unreadCount > 0 && <span style={{ color: 'var(--accent)', fontWeight: 600 }}> · {unreadCount} unread</span>}
          </p>
        </div>
        {notifications.length > 0 && (
          <button onClick={handleClearAll} className="btn-secondary" style={{ fontSize: '13px', padding: '8px 14px', gap: '6px' }}>
            <CheckCheck size={14} /> Clear all
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '14px' }} />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '80px 40px', textAlign: 'center',
        }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Bell size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>All caught up!</p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '320px', margin: '0 auto', lineHeight: 1.6 }}>
            No notifications yet. Set reminders on your tasks to get notified here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((n) => {
            const cfg = typeConfig[n.type] || typeConfig.system;
            const { Icon } = cfg;
            return (
              <div
                key={n._id}
                className="animate-fade-in"
                style={{
                  background:   'var(--bg-card)',
                  border:       `1px solid ${n.isRead ? 'var(--border)' : 'rgba(139,92,246,0.3)'}`,
                  borderLeft:   `4px solid ${n.isRead ? 'var(--border)' : cfg.color}`,
                  borderRadius: '14px',
                  padding:      '16px 20px',
                  display:      'flex',
                  alignItems:   'flex-start',
                  gap:          '14px',
                  transition:   'all 0.2s',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: cfg.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color={cfg.color} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.5px', color: cfg.color,
                    }}>{cfg.label}</span>
                    {!n.isRead && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                    )}
                  </div>
                  <p style={{
                    fontSize: '14px', color: 'var(--text-primary)',
                    fontWeight: n.isRead ? 400 : 600,
                    lineHeight: 1.5, marginBottom: '4px',
                  }}>
                    {n.message}
                  </p>
                  {n.task && (
                    <p style={{ fontSize: '12px', color: 'var(--accent)', marginBottom: '4px', fontWeight: 500 }}>
                      Task: {n.task.title}
                    </p>
                  )}
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(n._id)}
                  className="btn-icon"
                  title="Delete"
                  style={{ flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
