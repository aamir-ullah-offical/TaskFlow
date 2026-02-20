import axios from 'axios';
import { authRef } from './authRef';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach JWT token from localStorage on every request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 Unauthorized globally.
// Clears BOTH localStorage AND React auth state to prevent the UI
// from remaining "authenticated" after the token is removed or expires.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Avoid redirect loop if already on login page
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Clear React auth state so ProtectedRoute immediately redirects.
        authRef.setUser?.(null);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
