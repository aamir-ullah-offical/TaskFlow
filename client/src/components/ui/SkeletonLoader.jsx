const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  if (type === 'stat') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '28px', width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <div className="skeleton" style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '14px', width: '70%', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '12px', width: '90%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="skeleton" style={{ height: '20px', width: '60px', borderRadius: '20px' }} />
            <div className="skeleton" style={{ height: '20px', width: '70px', borderRadius: '20px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
