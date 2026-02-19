const StatsCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
      </div>
      <div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{title}</p>
        <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
        {subtitle && <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
