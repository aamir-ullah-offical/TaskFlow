import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

// Notification type → display config
const TYPE_ICONS = {
  reminder:       '⏰',
  task_created:   '📝',
  task_completed: '🎉',
  task_overdue:   '⚠️',
  system:         '🔔',
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Expose addNotification so external pages can prepend real-time items
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // If no user, ensure disconnected
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Debounce connection to prevent Strict Mode double-mount race
    const timer = setTimeout(() => {
      // If already connected/connecting with same token, skip
      if (socketRef.current?.connected) return;

      const token = localStorage.getItem('token');

      // Initialize new connection
      // Initialize new connection
      // Fix: Connect directly to backend port to avoid Vite proxy WS issues
      const SOCKET_URL = import.meta.env.VITE_API_URL 
        ? new URL(import.meta.env.VITE_API_URL).origin 
        : 'http://localhost:5000';

      const socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'], // Try websocket first
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        autoConnect: true,
      });

      socketRef.current = socket;

      socket.on('connect_error', (err) => {
        console.warn('Socket connect error:', err.message);
      });

      socket.on('new_notification', ({ notification }) => {
        addNotification(notification);

        const icon = TYPE_ICONS[notification.type] || '🔔';
        toast.custom((t) => (
          <div
            className={`${t.visible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{
              background:   'var(--bg-card)',
              border:       '1px solid var(--border-focus)',
              borderRadius: '12px',
              padding:      '14px 18px',
              boxShadow:    'var(--shadow-card)',
              display:      'flex',
              alignItems:   'center',
              gap:          '12px',
              maxWidth:     '360px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{icon}</span>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                {notification.type === 'task_completed' ? 'Task Completed!' :
                 notification.type === 'task_created'   ? 'Task Created'    :
                 notification.type === 'task_overdue'   ? 'Task Overdue'    :
                 notification.type === 'reminder'       ? 'Reminder'        : 'Notification'}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                {notification.message}
              </p>
            </div>
          </div>
        ), { duration: 5000 });
      });
    }, 100);

    // Cleanup on unmount or user change
    return () => {
      clearTimeout(timer);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, addNotification]);

  // Fetch initial unread count on login
  useEffect(() => {
    if (user) {
      api.get('/notifications?limit=1')
        .then(({ data }) => setUnreadCount(data.unreadCount || 0))
        .catch(() => {});
    }
  }, [user]);

  const decrementUnread = () => setUnreadCount((prev) => Math.max(0, prev - 1));
  const resetUnread     = () => setUnreadCount(0);

  return (
    <SocketContext.Provider value={{
      notifications, unreadCount,
      setNotifications, setUnreadCount,
      addNotification, decrementUnread, resetUnread,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
};
