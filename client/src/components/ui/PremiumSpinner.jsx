
import React from 'react';

const PremiumSpinner = ({ size = 40, color = 'var(--accent)' }) => {
  return (
    <div className="premium-spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', minHeight: '100px' }}>
      <div className="premium-spinner" style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid transparent',
        borderTopColor: color,
        borderRightColor: color,
        animation: 'spin 1s ease-in-out infinite',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: 'var(--text-muted)',
          opacity: 0.2,
          animation: 'spin 2s linear infinite reverse'
        }} />
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PremiumSpinner;
