import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
      }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: 'var(--accent)', fontWeight: 700 }}>{payload[0].value} tasks</p>
      </div>
    );
  }
  return null;
};

const WeeklyChart = ({ data = [] }) => {
  // Build last 7 days with defaults
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const key = format(date, 'yyyy-MM-dd');
    const found = data.find((d) => d._id === key);
    return { day: format(date, 'EEE'), count: found ? found.count : 0 };
  });

  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '16px' }}>
        Weekly Progress
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={last7Days} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--accent-glow)' }} />
          <Bar dataKey="count" fill="var(--accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
