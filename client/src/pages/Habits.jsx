import { useState, useEffect, useCallback } from 'react';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import { Plus, Flame, Trash2, Check, X, Palette, Type, Archive, RefreshCcw, AlertTriangle } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const colors = [
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ef4444', label: 'Red' },
    { value: '#10b981', label: 'Emerald' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#6366f1', label: 'Indigo' },
    { value: '#14b8a6', label: 'Teal' },
];

const HabitCard = ({ habit, onToggle, onArchive, onRestore, onDeletePermanent, isArchived }) => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const isCompletedToday = habit.completedDates.includes(todayStr);

  // Generate last 14 days for heatmap
  const history = Array.from({ length: 14 }).map((_, i) => {
    const d = subDays(today, 13 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    return {
      date: d,
      completed: habit.completedDates.includes(dateStr),
      isToday: dateStr === todayStr,
    };
  });

  return (
    <div className="glass-panel habit-card" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background Gradient for flair */}
        <div style={{
            position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
            background: habit.color, filter: 'blur(80px)', opacity: 0.1, pointerEvents: 'none'
        }} />

        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
            {isArchived ? (
                <>
                    <button 
                        onClick={() => onRestore(habit)}
                        className="btn-icon restore-btn"
                        title="Restore Habit"
                        style={{ color: 'var(--accent)' }}
                    >
                        <RefreshCcw size={16} />
                    </button>
                    <button 
                        onClick={() => onDeletePermanent(habit)}
                        className="btn-icon delete-btn"
                        title="Delete Permanently"
                        style={{ color: '#ef4444' }}
                    >
                        <Trash2 size={16} />
                    </button>
                </>
            ) : (
                <button 
                    onClick={() => onArchive(habit)}
                    className="btn-icon archive-btn"
                    title="Archive Habit"
                >
                    <Archive size={16} />
                </button>
            )}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ 
                width: '52px', height: '52px', borderRadius: '16px', 
                background: `linear-gradient(135deg, ${habit.color}20, ${habit.color}10)`,
                border: `1px solid ${habit.color}30`,
                color: habit.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: 700,
                boxShadow: `0 8px 16px ${habit.color}15`
            }}>
                {habit.title.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{habit.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <Flame size={14} className={habit.streak > 0 ? 'text-orange animate-pulse' : 'text-muted'} />
                    <span style={{ fontWeight: 600 }}>{habit.streak} day streak</span>
                </div>
            </div>
        </div>

        {/* Heatmap */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'space-between', marginBottom: '20px' }}>
            {history.map((day, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <div 
                        title={format(day.date, 'MMM d')}
                        style={{
                            width: '100%', aspectRatio: '1/1', borderRadius: '6px',
                            background: day.completed ? habit.color : 'var(--bg-secondary)',
                            border: day.isToday ? '1px solid var(--text-primary)' : `1px solid ${day.completed ? habit.color : 'transparent'}`,
                            opacity: day.completed ? 1 : 0.4,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: day.completed ? 'scale(1)' : 'scale(0.9)',
                            boxShadow: day.completed ? `0 2px 8px ${habit.color}40` : 'none'
                        }}
                    />
                </div>
            ))}
        </div>

        {/* Action Button */}
        {!isArchived && (
            <button
                onClick={() => onToggle(habit)}
                className={`btn-action ${isCompletedToday ? 'completed' : ''}`}
                style={{ 
                    '--habit-color': habit.color,
                    width: '100%', marginTop: 'auto',
                    padding: '12px', borderRadius: '12px',
                    fontWeight: 600, fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.3s ease'
                }}
            >
                {isCompletedToday ? (
                    <> <Check size={18} /> Completed </>
                ) : (
                    'Mark Complete'
                )}
            </button>
        )}
        {isArchived && (
            <div style={{ 
                width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '12px',
                background: 'var(--bg-secondary)', color: 'var(--text-muted)',
                fontSize: '13px', textAlign: 'center', fontStyle: 'italic'
            }}>
                Archived
            </div>
        )}
    </div>
  );
};

const Habits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [tab, setTab] = useState('active'); // 'active' | 'archived'
    const [newHabit, setNewHabit] = useState({ title: '', color: '#8b5cf6' });

    const fetchHabits = useCallback(async () => {
        setLoading(true);
        try {
            const endpoint = tab === 'active' ? '/habits' : '/habits/archived';
            const { data } = await api.get(endpoint);
            setHabits(data.habits);
        } catch (err) {
            toast.error('Failed to load habits');
        } finally {
            setLoading(false);
        }
    }, [tab]);

    useEffect(() => { fetchHabits(); }, [fetchHabits]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newHabit.title.trim()) return;
        try {
            await api.post('/habits', newHabit);
            toast.success('Habit created successfully! 🎉');
            setShowForm(false);
            setNewHabit({ title: '', color: '#8b5cf6' });
            if (tab === 'active') fetchHabits();
        } catch (err) {
            toast.error('Failed to create habit');
        }
    };

    const handleToggle = async (habit) => {
        try {
            const todayStr = format(new Date(), 'yyyy-MM-dd');
            const isCompleted = habit.completedDates.includes(todayStr);
            
            setHabits(prev => prev.map(h => {
                if (h._id === habit._id) {
                    const newDates = isCompleted 
                        ? h.completedDates.filter(d => d !== todayStr)
                        : [...h.completedDates, todayStr];
                    const newStreak = isCompleted ? Math.max(0, h.streak - 1) : h.streak + 1; 
                    return { ...h, completedDates: newDates, streak: newStreak };
                }
                return h;
            }));

            const { data } = await api.put(`/habits/${habit._id}/toggle`);
            setHabits(prev => prev.map(h => h._id === habit._id ? data.habit : h));
            
            if (!isCompleted) toast.success('Streak extended! 🔥');
        } catch (err) {
            toast.error('Failed to update habit');
            fetchHabits();
        }
    };

    const handleArchive = (habit) => {
        toast((t) => (
            <div style={{ minWidth: '240px' }}>
                <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Archive <b>{habit.title}</b>?
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.patch(`/habits/${habit._id}/archive`);
                                toast.success('Habit archived');
                                setHabits(prev => prev.filter(h => h._id !== habit._id));
                            } catch (err) {
                                toast.error('Failed to archive');
                            }
                        }}
                        style={{ 
                            background: 'var(--text-secondary)', color: '#fff', border: 'none', 
                            padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' 
                        }}
                    >
                        Archive
                    </button>
                </div>
            </div>
        ), { 
            duration: 6000, 
            style: { 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            } 
        });
    };

    const handleRestore = async (habit) => {
        try {
            await api.patch(`/habits/${habit._id}/restore`);
            toast.success('Habit restored');
            setHabits(prev => prev.filter(h => h._id !== habit._id));
        } catch (err) {
            toast.error('Failed to restore');
        }
    };

    const handleDeletePermanent = (habit) => {
        toast((t) => (
            <div style={{ minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#ef4444' }}>
                   <AlertTriangle size={18} />
                   <span style={{ fontWeight: 700, fontSize: '14px' }}>Permanently Delete?</span>
                </div>
                <p style={{ fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <b>{habit.title}</b> will be gone forever. This cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/habits/${habit._id}`);
                                toast.success('Habit deleted permanently');
                                setHabits(prev => prev.filter(h => h._id !== habit._id));
                            } catch (err) {
                                toast.error('Failed to delete');
                            }
                        }}
                        style={{ 
                            background: '#ef4444', color: '#fff', border: 'none', 
                            padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' 
                        }}
                    >
                        Delete Forever
                    </button>
                </div>
            </div>
        ), { 
            duration: 6000, 
            style: { 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            } 
        });
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
            <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px',
                flexWrap: 'wrap', gap: '16px'
            }}>
                <div>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 800, letterSpacing: '-1px' }}>Habit Tracker</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '4px' }}>
                        Build consistency, one day at a time.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                     <div className="segmented-control">
                        <button 
                            className={`segmented-btn ${tab === 'active' ? 'active' : ''}`}
                            onClick={() => setTab('active')}
                        >
                            Active
                        </button>
                        <button 
                            className={`segmented-btn ${tab === 'archived' ? 'active' : ''}`}
                            onClick={() => setTab('archived')}
                        >
                            Archived
                        </button>
                     </div>
                    <button onClick={() => setShowForm(true)} className="btn-primary" style={{ padding: '10px 20px' }}>
                        <Plus size={20} /> <span style={{ fontWeight: 600 }}>New Habit</span>
                    </button>
                </div>
            </div>

            {loading ? <SkeletonLoader count={3} type="block" /> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {habits.map(habit => (
                        <HabitCard 
                            key={habit._id} 
                            habit={habit} 
                            onToggle={handleToggle} 
                            onArchive={handleArchive}
                            onRestore={handleRestore}
                            onDeletePermanent={handleDeletePermanent}
                            isArchived={tab === 'archived'}
                        />
                    ))}
                    {habits.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                            <div style={{ 
                                width: '80px', height: '80px', borderRadius: 'full', margin: '0 auto 20px',
                                background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {tab === 'active' ? <Flame size={40} style={{ opacity: 0.3 }} /> : <Archive size={40} style={{ opacity: 0.3 }} />}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                {tab === 'active' ? 'No active habits' : 'No archived habits'}
                            </h3>
                            {tab === 'active' && <p style={{ maxWidth: '300px', margin: '0 auto' }}>Start your journey by creating your first habit today.</p>}
                        </div>
                    )}
                </div>
            )}

            {/* Premium Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="glass-card modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Create New Habit</h2>
                            <button onClick={() => setShowForm(false)} className="btn-icon">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreate}>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                    <Type size={16} className="text-muted" /> Habit Title
                                </label>
                                <input 
                                    className="glass-input" 
                                    value={newHabit.title}
                                    onChange={e => setNewHabit({...newHabit, title: e.target.value})}
                                    placeholder="e.g., Read 30 mins, Drink Water"
                                    required
                                    autoFocus
                                />
                            </div>
                            
                            <div className="form-group" style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 600 }}>
                                    <Palette size={16} className="text-muted" /> Color Theme
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))', gap: '12px' }}>
                                    {colors.map(c => (
                                        <div 
                                            key={c.value}
                                            onClick={() => setNewHabit({...newHabit, color: c.value})}
                                            title={c.label}
                                            style={{ 
                                                aspectRatio: '1/1', borderRadius: '12px', background: c.value, cursor: 'pointer',
                                                border: newHabit.color === c.value ? '3px solid var(--bg-card)' : 'none',
                                                boxShadow: newHabit.color === c.value ? `0 0 0 2px ${c.value}` : 'none',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                transition: 'transform 0.2s',
                                                transform: newHabit.color === c.value ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                        >
                                            {newHabit.color === c.value && <Check size={16} color="#fff" strokeWidth={3} />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button type="button" onClick={() => setShowForm(false)} className="btn-text" style={{ padding: '12px 24px' }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ padding: '12px 32px' }}>Create Habit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
             
            <style>{`
                .glass-panel { padding: 24px; }
                .habit-card button.archive-btn, .habit-card button.restore-btn, .habit-card button.delete-btn { opacity: 0; transition: opacity 0.2s; }
                .habit-card:hover button.archive-btn, .habit-card:hover button.restore-btn, .habit-card:hover button.delete-btn { opacity: 1; }
                
                .btn-action { background: var(--habit-color); color: #fff; border: none; }
                .btn-action.completed { background: var(--bg-secondary); color: var(--text-secondary); border: 1px solid var(--border); }
                .btn-action:hover { opacity: 0.9; transform: translateY(-1px); }
                .btn-action:active { transform: translateY(0); }

                .glass-input {
                    width: 100%; padding: 16px; border-radius: 12px;
                    border: 1px solid var(--border); background: var(--bg-input);
                    color: var(--text-primary); font-size: 16px; transition: all 0.2s;
                }
                .glass-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); outline: none; }

                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
                    display: flex; alignItems: center; justifyContent: center; z-index: 1000; padding: 20px;
                }
                .modal-content { width: 100%; max-width: 500px; padding: 32px; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
                
                .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                .text-orange { color: #f97316; }
                .text-muted { color: var(--text-muted); }

                @media (max-width: 640px) {
                   .glass-panel { padding: 16px; } 
                }
            `}</style>
        </div>
    );
};

export default Habits;
