import { Search, Filter, X } from 'lucide-react';

const CATEGORIES = ['', 'General', 'Work', 'Personal', 'Health', 'Finance', 'Learning', 'Shopping', 'Other'];

const TaskFilters = ({ filters, onChange, onReset }) => {
  const inputStyle = {
    padding: '8px 12px', background: 'var(--bg-input)',
    border: '1px solid var(--border)', borderRadius: '8px',
    color: 'var(--text-primary)', fontSize: '13px',
    fontFamily: 'var(--font-sans)', outline: 'none',
  };

  return (
    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
      {/* Search */}
      <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '180px' }}>
        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          style={{ ...inputStyle, width: '100%', paddingLeft: '32px' }}
        />
      </div>

      {/* Status */}
      <select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })} style={inputStyle}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority */}
      <select value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value })} style={inputStyle}>
        <option value="">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Category */}
      <select value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })} style={inputStyle}>
        <option value="">All Categories</option>
        {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Archived toggle */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={filters.isArchived === 'true'}
          onChange={(e) => onChange({ ...filters, isArchived: e.target.checked ? 'true' : '' })}
          style={{ accentColor: 'var(--accent)' }}
        />
        Archived
      </label>

      {/* Reset */}
      <button onClick={onReset} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }}>
        <X size={14} /> Reset
      </button>
    </div>
  );
};

export default TaskFilters;
