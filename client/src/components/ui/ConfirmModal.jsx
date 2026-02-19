import { AlertTriangle, Trash2, X, Loader } from 'lucide-react';

const ConfirmModal = ({ title, message, onConfirm, onCancel, loading, confirmText = 'Delete', danger = true }) => {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-content" style={{ maxWidth: '420px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: danger ? 'rgba(239,68,68,0.12)' : 'var(--accent-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {danger
                ? <AlertTriangle size={18} color="var(--danger)" />
                : <Trash2 size={18} color="var(--accent)" />}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{title}</h3>
          </div>
          <button onClick={onCancel} className="btn-icon" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{message}</p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
        }}>
          <button onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} className={danger ? 'btn-danger' : 'btn-primary'} disabled={loading}>
            {loading
              ? <><Loader size={14} className="animate-spin" /> Processing...</>
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
